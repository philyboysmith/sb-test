/*global alert: false, confirm: false, console: false, Debug: false, $*/

//------------------------------------------------------------
// description of:
//
//
//
//------------------------------------------------------------

define(['jquery'], function ($) {
  "use strict";

  var s = {

  };

  function randomAction() {

    var $elem = $('.js-random-action');
    if(!$elem.hasClass('animate')){
      $elem.addClass('animate').addClass('ready');
    }
    var actionLoop = function() {

      // Time of action loop is 0.8s
      var time = 1000;

      // Add the class that sets the css animation...
      $elem.addClass('action');
      $elem.removeClass('animate');

      // After the length of the loop, remove class...
      setTimeout(function () {
        $elem.removeClass('action');
        $elem.addClass('animate');
      }, time);
    };

    // If the element is in the DOM...
    if ($elem){
      setInterval(function () {
        var rand = Math.floor((Math.random() * 10) + 1);
        if (rand === 3) actionLoop();
      }, 1000);
    }

  }

  function init() {
    randomAction();
  }

  return {
    init: init
  };

});
