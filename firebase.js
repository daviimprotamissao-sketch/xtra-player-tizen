/* Firebase Web SDK compat - xTra Player */
(function(){
  "use strict";
  var cfg={
    apiKey:"AIzaSyC4FiwRFfFRtjxxSdgdy3XGNobjs__nsig",
    authDomain:"xtrasoluctions.firebaseapp.com",
    databaseURL:"https://xtrasoluctions-default-rtdb.europe-west1.firebasedatabase.app",
    projectId:"xtrasoluctions",
    storageBucket:"xtrasoluctions.firebasestorage.app",
    messagingSenderId:"296794667697",
    appId:"1:296794667697:web:b539b2ca47621121bc0090",
    measurementId:"G-GP0B47TQDT"
  };
  try{
    if(!firebase.apps.length) firebase.initializeApp(cfg);
    var auth=firebase.auth(), db=firebase.database();
    window.XtraCloud={
      auth:auth,
      current:function(){return auth.currentUser;},
      signIn:function(email,password){return auth.signInWithEmailAndPassword(email,password);},
      signUp:function(email,password){return auth.createUserWithEmailAndPassword(email,password);},
      signOut:function(){return auth.signOut();},
      onAuth:function(fn){return auth.onAuthStateChanged(fn);},
      listen:function(uid,fn){
        var ref=db.ref("users/"+uid+"/xtraTizen");
        ref.on("value",function(s){fn(s.val()||{});});
        return function(){ref.off();};
      },
      save:function(uid,data){return db.ref("users/"+uid+"/xtraTizen").update(data);},
      savePlaylist:function(uid,id,data){return db.ref("users/"+uid+"/xtraTizen/playlists/"+id).set(data);},
      removePlaylist:function(uid,id){return db.ref("users/"+uid+"/xtraTizen/playlists/"+id).remove();}
    };
  }catch(e){console.error("Firebase:",e);window.XtraCloudError=e;}
})();