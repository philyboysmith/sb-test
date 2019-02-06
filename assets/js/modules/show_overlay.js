/*global alert: false, confirm: false, console: false, Debug: false, $*/

//------------------------------------------------------------
// description of:
//
//
//
//------------------------------------------------------------

define(['jquery','TweenMax'
  ], function ($, TweenMax) {
  "use strict";

  var s = {

  };

  function showOverlay(){

    var overlay = '.overlay';

    $(overlay).addClass('visable');

    TweenMax.to( $(overlay), config.speeds.fast, {
      opacity : 1,
      ease: Power1.easeOut,
      onComplete: function(){
        
      }
    });

  };

  function init() {
    showOverlay();
  }

  return {
    init: init
  };

});
