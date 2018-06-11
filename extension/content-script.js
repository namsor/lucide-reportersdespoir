$(document).ready(function(){
  var div = "";
  var css = "\
    display: inline-block; \
    position: absolute; \
    width: 100%; \
    text-align: center; \
    z-index: 99998; \
    height: 60px; \
    background-color: ghostwhite; \
    padding-top: 8px;";

    var css2 = "\
    display: inline-block; \
    position: absolute; \
    text-align: center; \
    right: 20px; \
    top: 15px;\
    z-index: 99999; \
    height: 20px; \
    border: none; \
    background-color: #f912379c; \
    font-weight: bold; \
    font-size: 60%; \
    outline:none; \
    padding: 4px 6px\
    color: white;\
    ";

    var css3 = "\
    display: inline-block; \
    position: absolute; \
    max-width: 20px; \
    ";

  $("html").prepend("<div id='ext' style='" + css + "'> \
  <p>\
    Vous voulez nous aider ? \
    Confirmez qu'il s'agit d'un article de journalisme de solution et validez l'impact \
  </p>\
  <img src='https://image.flaticon.com/icons/svg/535/535190.svg' style='" + css3 + "'></img>\
  <button id='close' style='" + css2 + "'>X</button>\
  </div>");

  $("#close").click(function() {
    console.log('destroying')
    $("#ext").remove();
  });
});

