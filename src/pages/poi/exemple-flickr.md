---
templateKey: poi
title: '[Exemple] Galerie Flickr'
description: >
  Nous proposons l'utilisation du service gratuit https://flickrembed.com. Le
  layout à utiliser doit être "Responsive" et il est nécessaire de supprimer
  l'attribut "style" et son contenu. Nous conseillons de mettre l'url de l'album
  flickr dans le lien "En savoir +".
lat: .nan
lng: .nan
picture: /img/ancenis.jpg
iframe: >-
  <iframe
  src="https://flickrembed.com/cms_embed.php?source=flickr&layout=responsive&input=72157665811134782&sort=0&by=album&theme=default&scale=fill&limit=10&skin=default&autoplay=true"
  scrolling="no" frameborder="0" allowFullScreen="true"
  webkitallowfullscreen="true" mozallowfullscreen="true"><p><a 
  href="http://www.embedgooglemap.co.uk">http://www.embedgooglemap.co.uk/</a></p><small>Powered
  by <a href="https://flickrembed.com">flickr embed</a>.</small></iframe><script
  type="text/javascript">function showpics(){var
  a=$("#box").val();$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags="+a+"&tagmode=any&format=json&jsoncallback=?",function(a){$("#images").hide().html(a).fadeIn("fast"),$.each(a.items,function(a,e){$("<img/>").attr("src",e.media.m).appendTo("#images")})})}</script>
promote: false
link: 'https://www.flickr.com/photos/loireatlantique/albums/72157665811134782'
marker_type: violet
media_type: photo
---

