---
templateKey: poi
title: Exemple Flickr
description: >
  Texte de description de l'exemple (pas de poi sur la carte, car pas de
  coordonnées)
picture: /img/products-grid1.jpg
iframe: >-
  <iframe
  src="https://flickrembed.com/cms_embed.php?source=flickr&layout=responsive&input=www.flickr.com/photos/loireatlantique/&sort=0&by=user&theme=slider&scale=fill&limit=10&skin=default&autoplay=true"
  scrolling="no" frameborder="0" allowFullScreen="true"
  webkitallowfullscreen="true" mozallowfullscreen="true"><p><a 
  href="http://www.embedgooglemap.co.uk">Powered by Embed Google
  Map</a></p><small>Powered by <a href="https://flickrembed.com">flickr
  embed</a>.</small></iframe><script type="text/javascript">function
  showpics(){var
  a=$("#box").val();$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags="+a+"&tagmode=any&format=json&jsoncallback=?",function(a){$("#images").hide().html(a).fadeIn("fast"),$.each(a.items,function(a,e){$("<img/>").attr("src",e.media.m).appendTo("#images")})})}</script>
promote: true
link: 'https://www.flickr.com/photos/loireatlantique/'
media_type: photos
---

