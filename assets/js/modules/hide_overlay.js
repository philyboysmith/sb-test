/*global alert: false, confirm: false, console: false, Debug: false, $*/

//------------------------------------------------------------
// description of:
//
//
//
//------------------------------------------------------------

define(['jquery','TweenMax'
  ], function ($, TweenMax ) {
  "use strict";

  var s = {

  };

  function hideOverlay(){

    var overlay = '.overlay';

    $(overlay).animate({
      opacity:0
    }, function(){
      $(overlay).removeClass('visable');
    });

  };

  function init() {
    hideOverlay();
  }

  return {
    init: init
  };

});
