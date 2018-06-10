$(document).ready(function(){
  var div = "";
  var css = "\
    display: inline-block; \
    position: absolute; \
    width: 100%; \
    text-align: center; \
    z-index: 99999; \
    height: 50px; \
    background-color: ghostwhite; \
    padding-top: 8px;";
  $("html").prepend("<div style='" + css + "'> \
  <p>Vous voulez nous aider ? \
  Confirmez qu'il s'agit d'un article de journalisme de solution et notez l'impact \
  </p></div>");
});
