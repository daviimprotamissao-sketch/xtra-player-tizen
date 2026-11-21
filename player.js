/* Samsung AVPlay integration */
(function(){
 "use strict";
 var av=null,active=false;
 function api(){return window.webapis&&webapis.avplay?webapis.avplay:null;}
 function state(){try{return api().getState();}catch(e){return "NONE";}}
 function close(){var p=api();if(!p)return;try{var s=state();if(s!=="NONE"&&s!=="IDLE")p.stop();}catch(e){}try{p.close();}catch(e){}active=false;}
 function open(url,meta){
  var p=api();if(!p)throw new Error("AVPlay não está disponível. Abra o app em uma TV Samsung Tizen.");
  close();p.open(url);
  try{p.setListener({
   onbufferingstart:function(){window.dispatchEvent(new CustomEvent("xtra:buffering",{detail:true}));},
   onbufferingcomplete:function(){window.dispatchEvent(new CustomEvent("xtra:buffering",{detail:false}));},
   onstreamcompleted:function(){window.dispatchEvent(new Event("xtra:ended"));},
   onerror:function(err){window.dispatchEvent(new CustomEvent("xtra:playererror",{detail:String(err)}));},
   oncurrentplaytime:function(ms){window.dispatchEvent(new CustomEvent("xtra:time",{detail:ms}));}
  });}catch(e){}
  try{p.setDisplayRect(0,0,1920,1080);}catch(e){}
  try{p.setStreamingProperty("ADAPTIVE_INFO","FIXED_MAX_RESOLUTION=3840X2160");}catch(e){}
  p.prepareAsync(function(){try{p.play();active=true;window.dispatchEvent(new Event("xtra:playing"));}catch(e){window.dispatchEvent(new CustomEvent("xtra:playererror",{detail:e.message}));}},function(err){window.dispatchEvent(new CustomEvent("xtra:playererror",{detail:String(err)}));});
 }
 function pause(){var p=api();if(!p)return;try{if(state()==="PLAYING")p.pause();else if(state()==="PAUSED")p.play();}catch(e){}}
 function seek(delta){var p=api();if(!p)return;try{p.jumpForward(delta*1000);}catch(e){try{p.jumpBackward(Math.abs(delta)*1000);}catch(x){}}}
 function duration(){try{return api().getDuration();}catch(e){return 0;}}
 function current(){try{return api().getCurrentTime();}catch(e){return 0;}}
 window.XtraPlayerEngine={open:open,close:close,pause:pause,seek:seek,state:state,duration:duration,current:current,isActive:function(){return active;}};
 window.addEventListener("pagehide",close);
})();