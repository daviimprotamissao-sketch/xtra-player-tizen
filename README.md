# xTra Player — Samsung Tizen

Aplicativo web para Smart TVs Samsung, desenvolvido separadamente do APK Android e adaptado ao controle remoto.

## Recursos incluídos nesta primeira integração
- Firebase Authentication com login e criação de conta por e-mail/senha.
- Sincronização em tempo real por usuário no Firebase Realtime Database.
- Cadastro e remoção de playlists M3U e Xtream Codes.
- Catálogos separados para TV ao vivo, filmes e séries.
- Busca e filtros por categoria.
- Perfis, perfil infantil, bloqueio por PIN, favoritos e histórico.
- Reprodução com Samsung AVPlay, quando executado em uma TV Tizen compatível.
- Controles básicos do player e navegação pelo controle remoto.
- GitHub Actions valida JavaScript/XML e gera um ZIP do código-fonte.

## Firebase
O app usa o projeto Firebase configurado para o xTra Player. Os dados deste cliente ficam em `users/{uid}/xtraTizen`. As regras do Realtime Database devem restringir leitura e escrita ao usuário autenticado no próprio nó.

**Atenção:** as credenciais Xtream (servidor, usuário e senha) são armazenadas no nó do próprio usuário para permitir sincronização entre dispositivos. As regras Firebase precisam estar corretamente publicadas; não torne o banco público. Para proteção maior, o ideal é migrar credenciais para um backend com criptografia em repouso.

## Compatibilidade e limitações
- O manifesto solicita Tizen 5.5 como versão mínima. Modelos Samsung de 2020/2021 são alvo de compatibilidade, mas cada modelo e firmware precisa ser testado.
- O navegador integrado da TV pode bloquear chamadas M3U/Xtream por CORS. Se o provedor não liberar CORS, será necessário um proxy HTTPS controlado pelo proprietário.
- AVPlay depende de codecs, contêineres, protocolo e firmware suportados pelo aparelho. Nem todo link IPTV será reproduzível.
- Playlists M3U são classificadas por palavras em nome/grupo. O agrupamento de temporadas/episódios é mais confiável em Xtream Codes.
- Recursos de EPG, metadados completos, legendas avançadas, DRM e retomada de posição ainda precisam de implementação e validação por aparelho.

## Build e instalação
O workflow atual produz um **ZIP de fontes**, não um WGT assinado. Para instalar na TV, abra o projeto no Tizen Studio, empacote como TV Web Application e assine com um certificado Samsung válido. Não envie certificados ou chaves privadas para o repositório nem para o chat.

Documentação oficial:
- [Samsung AVPlay API](https://developer.samsung.com/smarttv/develop/api-references/samsung-product-api-references/avplay-api.html)
- [Playback com AVPlay](https://developer.samsung.com/smarttv/develop/guides/multimedia/media-playback/using-avplay.html)
- [Controle remoto](https://developer.samsung.com/smarttv/develop/guides/user-interaction/remote-control.html)
