/*global alert: false, confirm: false, console: false, Debug: false, $*/

//------------------------------------------------------------
// description of:
//
//
//
//------------------------------------------------------------

define(['jquery',
  ], function ($) {
  "use strict";

  var s = {

  };

  function scrollToLink() {

    if($('.active-section').length > 0){

      var sectionName = $('.active-section').attr('data-section');
      var url =$(this).attr('href');
      var elm = document.getElementById(sectionName);

      $('html, body').scrollTop($(elm).offset().top - 40);

    }

    $('.js-scroll-to-link').on('click', function(e){

        e.preventDefault();

        var sectionName = $(this).attr('data-section');
        var url =$(this).attr('href');
        var elm = document.getElementById(sectionName);

        $('html, body').animate({
            scrollTop: ($(elm).offset().top - 160)
        }, (config.speeds.mid * 1000));

        window.history.replaceState({},sectionName, url);

        return false;

    });

  }

  function init() {
    scrollToLink();
  }

  return {
    init: init
  };

});
