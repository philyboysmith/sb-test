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

  function bindMobMenu() {
    $('.mob-menu-2018 .hamburger').on('click', function(){
      if($('.main-nav').hasClass('open')){
        $('.main-nav').removeClass('open');
      }else{
        $('.main-nav').addClass('open');
      }
	  if ($(this).hasClass('is-active')) {
		$(this).removeClass('is-active');
	  } else {
		$(this).addClass('is-active');
	}
    });
  }

  function init() {
    bindMobMenu();    
  }

  return {
    init: init
  };

});
