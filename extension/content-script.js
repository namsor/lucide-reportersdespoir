$(document).ready(function(){
  var div = "";
  var css = "\
    display: inline-block; \
    position: absolute; \
    width: 100%; \
    text-align: center; \
    z-index: 99998; \
    height: 50px; \
    background-color: ghostwhite; \
    padding-top: 8px;";

    var css2 = "\
    display: inline-block; \
    position: absolute; \
    text-align: center; \
    right: 2%;\
    top: 15%; \
    z-index: 99999; \
    height: 20px; \
    border: none; \
    border-radius: 50%; \
    background-color: #f7bec7; \
    font-width: bold; \
    outline:none; \
    ";

  $("html").prepend("<div id='ext' style='" + css + "'> \
  <p>\
    Vous voulez nous aider ? \
    Confirmez qu'il s'agit d'un article de journalisme de solution et notez l'impact \
  </p>\
  <button id='close' style='" + css2 + "'>X</button>\
  </div>");

  $("#close").click(function() {
    console.log('destroying')
    $("#ext").remove();
  });
});

