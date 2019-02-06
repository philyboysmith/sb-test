/*global alert: false, confirm: false, console: false, Debug: false, $*/

//------------------------------------------------------------
// description of: the three js flag for header and homepage flag
//
//
//
//------------------------------------------------------------

define(['jquery', 'modernizr', 'swiper'
  ], function ($, modernizr, swiper) {
  "use strict";

  var data = {
    swiperSliders: [],
    playingVideos: []
  };

  var def = {
    speed: 400,
    spaceBetween: 100,
    slidesPerView: 1,
    paginationClickable: true,
    loop: true
  };

  function mediaBlock() {

    buildSwipers();

    $('.js-play-video').on('click', function(){

      var $button = $(this);

      var $mediaWrap = $button.closest('.media-wrap');
      var $video = $mediaWrap.find('video');

      playVideo($video);

    });

    $('video').not('.autoplay-video').not('.update video').each(function(){

        var $video = $(this);

        $video.on('click', function(){
          pauseVideo($video);
        });

        $video[0].addEventListener('ended', function(e){
          pauseVideo($video);
          false;
        });

    });


    $('.autoplay-video').each(function(){

        var $video = $(this);
        var $slider = $video.closest(".swiper-slide");

        if($slider.length ) {
          if($slider.hasClass('swiper-slide-active')){
            playVideo($video);
          }
        }else{
          playVideo($video);
        }

    });

  }

  function playVideo($video){

    var $mediaWrap = $video.closest('.media-wrap');
    var $coverImage = $mediaWrap.find('.cover-image');
    var $playButton = $mediaWrap.find('.play-button');
    var $textWrap = $mediaWrap.find('.text-wrap');
    var $gradient = $mediaWrap.find('.gradient');

    if(Modernizr.video && !Modernizr.touchevents){
      $video[0].play();

      if($coverImage.length){
        $coverImage.css({
          'opacity': '0',
          'display': 'none'
        });
      }

      if($playButton.length){
        $playButton.css({
          'opacity': '0',
          'display': 'none'
        });
      }

      if($gradient.length){
        $gradient.css({
          'display': 'none'
        });
      }

      if($textWrap.length){
        $textWrap.css({
          'opacity': '0',
          'display': 'none'
        });
      }

    }

  }

  function pauseVideo($video){

    var $mediaWrap = $video.closest('.media-wrap');
    var $coverImage = $mediaWrap.find('.cover-image');
    var $playButton = $mediaWrap.find('.play-button');
    var $textWrap = $mediaWrap.find('.text-wrap');
    var $gradient = $mediaWrap.find('.gradient');

    if(Modernizr.video){
      $video[0].pause();

      if($playButton.length){
        $playButton.css({
          'opacity': '1',
          'display': 'block'
        });
      }

      if($gradient.length){
        $gradient.css({
          'display': 'block'
        });
      }

      if($textWrap.length){
        $textWrap.css({
          'opacity': '1',
          'display': 'table'
        });
      }

    }

  }

  function buildSwipers() {

    var swipers = [];

    $('.swiper-container-media-block').each(function(index, elm){

      swipers[index] = {
        activeSlide: 1,
        elm: $(elm)
      };

      var pagination = swipers[index].elm.children('.pagination');

      swipers[index].swiper = new Swiper($(elm), {
          objectId: index,
          speed: def.speed,
          slidesPerView: def.slidesPerView,
          loop: def.loop,
          keyboardControl: true,
          grabCursor: true,
          nextButton: '.swipe-next-button',
          prevButton: '.swipe-prev-button',
          runCallbacksOnInit: 0,
          lazyLoading: true,
          preloadImages: false,
          onSlideChangeStart: function (swiper) {

            var swiperObject = swipers[swiper.originalParams.objectId];
            var swiperElm = swiperObject.elm;

            var $activeSlide = swiperElm.find('.swiper-slide').eq(swiperObject.activeSlide);
            var $video = $activeSlide.find('video').first();

            if($video.length){
              pauseVideo($video);
            }

            console.log('heya');

            $(".swiper-slide img.lazy").lazyload({
                effect: "fadeIn",
                threshold: 200,
            }).removeClass("lazy");

            swiperObject.activeSlide = swiper.activeIndex;

          },
          onSlideChangeEnd: function (swiper) {

            var swiperObject = swipers[swiper.originalParams.objectId];
            var swiperElm = swiperObject.elm;

            var $activeSlide = swiperElm.find('.swiper-slide').eq(swiperObject.activeSlide);
            var $video = $activeSlide.find('video.autoplay-video').first();

            if($video.length){
              playVideo($video);
            }

            swiperObject.activeSlide = swiper.activeIndex;
          }
      });

    });

  }

  var InstaVideo = function (el) {
      
      this.$video    = $(el);
      this.$video.wrap('<div class="video-wrapper updates-video-wrapper"></div>');

      this.$wrapper  = $(el).closest('.video-wrapper').addClass('paused');
    
      // remove native controls
      this.$video.removeAttr('controls');

      // loop
      this.$video[0].loop = true;

      //unmute
      this.$video[0].volume = 1;
      this.$video[0].muted = false;

      //wrap and add controls
      this.$wrapper.append('<div class="video-controls video-controls--show"><button data-media="play-pause"></button></button></div>');

      this.$controls = this.$wrapper.find('.video-controls');
      
      // check if video should autoplay
      if(!!this.$video.attr('autoplay')) {
          this.$wrapper.removeClass('paused').addClass('playing');
      }


      
      // check if video is muted
      if(this.$video.attr('muted') === 'true' || this.$video[0].volume === 0) {
          this.$video[0].muted = true;
          this.$wrapper.addClass('muted');
      }
      
      // attach event handlers
      this.attachEvents();
  };

  InstaVideo.prototype.attachEvents = function () {
    
      var self = this,
          _t; // keep track of timeout for controls
      
      // attach handlers to data attributes
      this.$wrapper.on('click', '[data-media]', function () {

          var data = $(this).data('media');

          if(data === 'play-pause') {
              self.playPause();
          }
          if(data === 'mute-unmute') {
              self.muteUnmute();
          }
      });
    
      this.$video.on('click', function () {
          self.playPause();
      });
    
      this.$video.on('play', function () {
          self.$wrapper.removeClass('paused').addClass('playing');
      });
      
      this.$video.on('pause', function () {
          self.$wrapper.removeClass('playing').addClass('paused');
      });
    
      this.$video.on('volumechange', function () {
          if($(this)[0].muted) {
              self.$wrapper.addClass('muted');
          }
          else {
              self.$wrapper.removeClass('muted');
          }
      });
    
      this.$wrapper.on('mousemove', function () {
            
          // show controls
          self.$controls.addClass('video-controls--show');

          // clear original timeout
          clearTimeout(_t);

          // start a new one to hide controls after specified time
          _t = setTimeout(function () {
              self.$controls.removeClass('video-controls--show');
          }, 1500);

      }).on('mouseleave', function () {
          self.$controls.removeClass('video-controls--show');
      });
  };

  InstaVideo.prototype.playPause = function () {
      if (this.$video[0].paused) {
          this.$video[0].play();
      } else { 
          this.$video[0].pause();
      }
  };

  InstaVideo.prototype.muteUnmute = function () {
      if(this.$video[0].muted === false) {
          this.$video[0].muted = true;
      } else {
          this.$video[0].muted = false;
      }
  };
  function defer(method) {
      if (window.jQuery)
          method();
      else
          setTimeout(function() { defer(method) }, 50);
  }
  defer(function () {
    $('.update video').each(function () {
        new InstaVideo(this);
    });
  });

  function init() {
    mediaBlock();
  }

  return {
    init: init
  };

});
