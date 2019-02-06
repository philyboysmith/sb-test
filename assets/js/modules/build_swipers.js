/*global alert: false, confirm: false, console: false, Debug: false, $*/

//------------------------------------------------------------
// description of: build_swipers.js
//
// In this module we are going to check for any unbuilt swipers
// then build them if they dont exist.
//
// I'm then going to add them temporaraly to the global config
// so we have a record and can controll each indavidualy.
//
// Ideas could be that we pause on scroll, or some other nice things.
//
//------------------------------------------------------------

define(['jquery', 'swiper',
  ], function ($, swiper) {
  "use strict";

  var def = {
    speed: 400,
    spaceBetween: 100,
    slidesPerView: 1,
    paginationClickable: true,
    loop: false
  };

  function buildSwipers() {

    var swipers = [];

    $('.swiper-container-inline').each(function(index){

      // console.log(index);

      var pagination = $(this).children('.pagination');

      swipers[index] = new Swiper($(this), {
          speed: def.speed,
          slidesPerView: def.slidesPerView,
          paginationClickable: def.paginationClickable,
          loop: def.loop,
          keyboardControl: true,
          pagination:'.swiper-pagination',
          grabCursor: true,
          lazyLoading: true,
          preloadImages: false,
          onSlideChangeEnd: function(){
          }
      });

    });

    $('.swiper-container-packages').each(function(index){

      // console.log(index);

      var pagination = $(this).children('.pagination');
      var slidesPerView = 3;

      if(app.windowWidth < 1000 ){
        slidesPerView = 2;
      }
      if(app.windowWidth < 768 ){
        slidesPerView = 1;
      }

      swipers[index] = new Swiper($(this), {
          speed: def.speed,
          loop: def.loop,
          keyboardControl: true,
          slidesPerView: 3,
          spaceBetweenSlides: 30,
          grabCursor: true,
          nextButton: '.swipe-next-button',
          prevButton: '.swipe-prev-button',
          centeredSlides: true,
          lazyLoading: true,
          preloadImages: false,
          breakpoints: {
            768: {
              slidesPerView: 1,
              spaceBetweenSlides: 30
            },
            1000: {
              slidesPerView: 2,
              spaceBetweenSlides: 30
            }
          }
      });

    });

  }

  function init() {
    buildSwipers();
  }

  return {
    init: init
  };

});
