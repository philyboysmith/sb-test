/*global alert: false, confirm: false, console: false, Debug: false, $*/

//------------------------------------------------------------
// description of:
//
//
//
//------------------------------------------------------------

define(['jquery','imagesloaded', 'masonry', 'magnific'
  ], function ($, imagesLoaded, Masonry, magnificPopup ) {
  "use strict";

  var s = {

  };

  function layout(){

    var container = document.querySelector('.updates-grid');
    var msnry;
    // initialize Masonry after all images have loaded
    imagesLoaded( container, function() {
        var msnry = new Masonry( container, {
            itemSelector: '.update',
            isAnimated: true
        });
    });

  };

  function gallery(){
    $('.update').each( function() {
      if ($(this).find('img').length >= 2) {
        $(this).find('img:not(:first-of-type)').wrapAll('<div class="gallery"></div>').closest('.update').addClass('update--gallery');
        $(this).find('img').nextUntil('img','br').remove();
        $(this).find('img:last').next().addClass('clear');
      }
    });


    $('.update').magnificPopup({
      delegate: 'img',
      type: 'image',
      closeOnContentClick: true,
      callbacks: {
        elementParse: function(item) { item.src = item.el.attr('src'); }
      },
      disableOn: function() {
        if( $(window).width() <  820 ) {
          return false;
        }
        return true;
      }
    });

    $('.update--gallery').magnificPopup({
      delegate: 'img',
      type: 'image',
      gallery: {enabled:true},
      closeOnContentClick: true,
      callbacks: {
        elementParse: function(item) { item.src = item.el.attr('src'); }
      },
      disableOn: function() {
        if( $(window).width() <  820 ) {
          return false;
        }
        return true;
      }
    });

  };

  function init() {
    layout();
    gallery();
  }

  return {
    init: init
  };

});
