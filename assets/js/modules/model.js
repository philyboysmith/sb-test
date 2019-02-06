/*global alert: false, confirm: false, console: false, Debug: false, $*/

//------------------------------------------------------------
// description of:
//
//
//
//------------------------------------------------------------

define(['jquery','TweenMax'
  ], function ($,TweenMax) {
  "use strict";

  var s = {

  };

  function bindmodel() {

    var model = '.model';


    $('.model').children().on('scroll', function(event){
      event.stopPropagation();
    });

    $('.entry-model').children().on('scroll', function(event){
      event.stopPropagation();
    });

    $('.model').children().on('scroll', function(event){
      event.preventDefault();
    });

    $('.vertical-align').children().on('click', function(event){
      event.stopPropagation();
    });

    $('.model').children().on('click', function(event){
      event.stopPropagation();
    });

    $('.model').children().on('gesturestart', function(event){
      alert('start');
      event.stopPropagation();
    });

    $('.entry-model').find('iframe').on('click', function(event){
      event.stopPropagation();
    });

    $('.entry-model').find('.media-wrap').on('click', function(event){
      event.stopPropagation();
    });

    $('.entry-model').find('img').on('gesturestart', function(event){
      event.stopPropagation();
      event.preventDefault();
    });


    $('.entry-model').find('img').on('gesturechange', function(event){

      event.stopPropagation();
      event.preventDefault();

      var newScale = event.originalEvent.scale;
      console.log(newScale);
      // event.stopPropagation();
      // event.preventDefault();

      var model = $(this).parents('.entry-model');

      if( newScale > 1.2){
        $(model).addClass('zoomed');
      }
      if( newScale < 0.9){
        $(model).removeClass('zoomed');
      }

      // $(this).css({
      //   transform: 'scale('+ event.originalEvent.scale +')'
      // });

    });

    $('.model').on('click', function(e){
      e.preventDefault();
      event.stopPropagation();
      hideModel(this);
    });

    $('.model').on('touchmove', function(e){
      // e.preventDefault();
      event.stopPropagation();
    });

    $('.close-model').on('click', function(e){
      e.preventDefault();
      hideModel('.model');
    });

    $('.entry-model').on('touchmove', function(e){
      // e.preventDefault();
      event.stopPropagation();
    });

    $('.entry-model').on('click', function(e){
      e.preventDefault();
      hideModel(this);
    });

    $('.js-show-model').on('click', function(e){
      e.preventDefault();
      showModel('.model');
    });

    $('.js-model-entry-link').on('click', function(e){
      e.preventDefault();

      var modelClass = '.' + $(this).attr('data');

      if($(modelClass).find('.model-autoplay-video').length > 0){
        $(modelClass).find('.js-play-video').click();
      }

      showModel(modelClass);

    });


    function hideModel(model){

      $('body').removeClass('locked');

      var $zoom = $(model).find('.js-zoom');

      $(model).removeClass('zoomed');
      $zoom.off('click');

      TweenMax.to( $(model), config.speeds.fast, {
        opacity : 0,
        ease: Power1.easeOut,
        onComplete: function(){
          $(model).removeClass('visable');
          if($(model).find('iframe').length > 0){
            var iframeSrc = $(model).find('iframe').attr('src');
            console.log(iframeSrc);
            $(model).find('iframe').attr('src', iframeSrc);
          }

          if($(model).find('video').length > 0){
             $(model).find('video').click();
          }

        }
      });

    };

    function showModel(model){

      $(model).addClass('visable');

      $('body').addClass('locked');

      TweenMax.to( $(model), config.speeds.fast, {
        opacity : 1,
        ease: Power1.easeOut,
        onComplete: function(){
        }
      });

      var $zoom = $(model).find('.js-zoom');

      $zoom.on('click', function() {

        if($(model).hasClass('zoomed')){

          $(model).removeClass('zoomed');

        }else{

          $(model).addClass('zoomed');

        }

      });

    };

  }

  function init() {
    bindmodel();
  }

  return {
    init: init
  };

});
