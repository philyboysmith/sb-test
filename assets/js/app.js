//--------------------------
// Static Config Vars

var config = {
    scrollThrottle: 200,
    resizeThrottle: 200,
    debounceDelay: 400,
    speeds: {
        fast: 0.2,
        mid: 0.4
    },
    tracking: {
        google: 'UA-4874781-3'
    },
    panels: [],
}




//--------------------------
// Dynamic contnet object

var app = {
    // Size Vars
    windowWidth: false,
    windowHeight: false,
    docHeight: false,
    // Scroll Vars
    curScrollTop: false,
    prevScrollTop: false,
    scrollDirection: false,
    history: []
};

//--------------------------

requirejs.config({
    urlArgs: "v=" + (new Date()).getTime(), // Cache bustin'
    baseUrl: "/assets/js",
    enforceDefine: false,
    config: {
        'GA': {
            'id': 'UA-4874781-3'
        }
    },
    paths: {
        modernizr: 'libs/modernizr-custom',
        jquery: "libs/jquery-3.0.0.min",
        underscore: "libs/underscore-min.1.8.3",
        swiper: "libs/swiper.min.3.3.1",
        TweenMax: "libs/gsap/src/uncompressed/TweenMax",
        TweenLite: 'libs/gsap/src/uncompressed/TweenLite',
        lazyload: 'libs/jquery.lazyload.min',
        masonry: 'libs/masonry.pkgd.min',
        bxslider: 'libs/jquery.bxslider',
		imagesloaded: 'libs/imagesloaded.pkgd.min',
        magnific: 'libs/magnific.min'
    },
    shim: {
        'jQuery': {
            exports: 'jQuery'
        },
        'underscore': {
            exports: 'underscore'
        },
        'TweenMax': {
            exports: 'TweenMax'
        },
        'swiper': {
            deps: ['jquery'],
            exports: 'swiper'
        },
        'lazyload': {
            deps: ['jquery'],
            exports: 'swiper'
        },
        'magnific': ['jquery'],
        'masonry': ['jquery']
    }
});

require(["jquery",
 "underscore",
 "modernizr",
 "TweenMax",
 "lazyload",
 "masonry",
 "bxslider",
 "imagesloaded",
 "magnific",
 "modules/starter",
 "modules/set_size_parameters",
 "modules/set_scroll_parameters",
 "modules/build_swipers",
 "modules/bind_ajax_load_entry",
 "modules/show_overlay",
 "modules/hide_overlay",
 "modules/videos",
 "modules/bind_scroll_to_links",
 "modules/character_animation",
 "modules/expanding_blocks",
 "modules/model",
 "modules/ajax_filter",
 "modules/booking_link",
 "modules/mob_menu",
 "modules/flag-seqence",
 "modules/updates"
 ], function($, _, modernizr, TweenMax, lazyload, Masonry, bxslider, imagesLoaded, magnific, starter, setSizeParameters, setScrollParameters, buildSwipers, bindAjaxLoadEntry, showOverlay, hideOverlay, videos, bindScrollToLinks, characterAnimation, expandingBlocks, model, ajaxFilter, bookingLink, mobMenu, flagSequence, updates) {
    "use strict";

    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });

    // Single time fires and on load fires
    $(document).ready(function() {

        // add first page as hisotry
        var url = window.location.href;
        var sectionName = url.substr(url.lastIndexOf('/') + 1);

        app.history.push([sectionName, url]);


        if ($('.panel').hasClass('open')) {
            url = '/';
            sectionName = 'home';
            app.history.unshift([sectionName, url]);
        }


        // set the global params each load
        bookingLink.init();
        setSizeParameters.init();
        setScrollParameters.init();
        starter.init();

        $("img.lazy").lazyload({
            effect: "fadeIn",
            threshold: 500,
        }).removeClass("lazy");

        $(".panel img.lazy").lazyload({
            container: $('.panel')
        }).removeClass("lazy");

        // fire once on page load
        buildSwipers.init();
        bindAjaxLoadEntry.init();
        ajaxFilter.init();
        bindScrollToLinks.init();
        videos.init();
        expandingBlocks.init();
        model.init();
        mobMenu.init();
        flagSequence.init();
        // updates.init();


        // Animations module
        characterAnimation.init();

    });

    // Delayed & Trottled resize events
    function throttledResizeEvents() {

    };

    function debouncedResizeEvents() {
        // console.log('Resize Over');
    };


    // Delayed & Trottled scroll events
    function throttledScrollEvents() {

    };

    function debouncedScrollEvents() {
        // console.log('Scroll Over');
    };


    // underscore events
    var throttledResize = _.throttle(throttledResizeEvents, config.resizeThrottle);
    var debouncedResize = _.debounce(debouncedResizeEvents, config.debounceDelay);
    var throttledScroll = _.throttle(throttledScrollEvents, config.scrollThrottle);
    var debouncedScroll = _.debounce(debouncedScrollEvents, config.debounceDelay);

    $(document).on('scroll', function() {
        // console.log('Scroll', app);

        // un-trottled trigger to get the most acurate vars.
        setScrollParameters.init();

        // debounce all other events to save some mem
        throttledScroll();
        debouncedScroll();

    });

    $(window).on('resize', function() {
        // console.log('Resize', app);

        // un-trottled trigger to get the most acurate vars.
        setSizeParameters.init();

        // debounce all other events to save some mem
        throttledResize();
        debouncedResize();

        $('.flexible-flag').each(function() {

            var parentSize = $(this).parent().width();

            $(this).css({
                'transform': 'scale(1)'
            });

            var scale = parentSize / $(this).width();

            $(this).css({
                'transform': 'scale(' + scale + ')'
            });

        });

    });

    $(window).on('ajaxLoad', function(e, data) {
        bindAjaxLoadEntry.init(data);
    });
	
	
	// 2018 JS
	
	$(document).ready(function(){
		
		
		var parentLI,
			slider1,
			slider2,
			slider3,
			slider4,
			slides,
			slideWidth,
			sliderOptions,
			windowWidth,
			touch;
		
		// Mobile nav expansion
		$('nav ul li div.expand a').click(function() {
			parentLI = $(this).parent('div.expand').parent('li');
			if (parentLI.hasClass('expanded')) {
				$(this).empty();
				$(this).prepend( "<span>+</span>" );
				parentLI.removeClass('expanded');
			} else {
				$(this).empty();
				$(this).prepend( "<span>-</span>" );
				parentLI.addClass('expanded');
			}
		});

		// Secondary navigation highlighting
		$(".links-block .link a").each(function(){
			$(this).click(function(){
				$(".links-block .link a").removeClass('active-section');
				$(this).addClass('active-section');	
			});
		});
		
		// Add 'odd' class to every other Split Text Block
        $(".split-text-block:odd").addClass('odd');
		
		// bx-slider
		$(".bxslider").each(function(i) {
        	$(this).attr('id', "slider" + (i + 1));
		});
    	windowWidth = $(window).width();
		if (windowWidth < 868) {slides = 1;slideWidth = 500;touch = true;} else {slides = 4;slideWidth = 350;touch = false;}
		sliderOptions = {minSlides: slides,maxSlides: slides,slideWidth: slideWidth,slideMargin: 30,moveSlides: 1,touchEnabled:touch};
		slider1 = $('#slider1').bxSlider(sliderOptions);
		slider2 = $('#slider2').bxSlider(sliderOptions);
		slider3 = $('#slider3').bxSlider(sliderOptions);
		slider4 = $('#slider4').bxSlider(sliderOptions);
		$('.bx-viewport').addClass('hey');
		
		// Tile grid bottom margins
		// $('section').each(function(){
			// $(this).children('.info-tile-grid').first().css('margin-bottom','6rem');
			// $(this).children('.info-tile-grid').last().css('margin-bottom','0');
		//});
		// $('body .info-tile-grid').last().css('margin-bottom','6rem');
		
		function matchSlideHeight() {
			$('.bxslider').each(function(){  
				$(this).children('.item').each(function(){
					if (!$(this).children('.tileContent').children('.call-to-action').length) {
						$(this).children('.tileContent').css('padding-bottom','25px');
					}
				});
				// Cache the highest
				var highestBox = 0;
				// Select and loop the elements you want to equalise
				$('.item', this).each(function(){
					// If this box is higher than the cached highest then store it
					if($(this).height() > highestBox) {
						highestBox = $(this).height(); 
					}
				});  
				// Set the height of all those children to whichever was highest 
				$('.item',this).height(highestBox);  
				$(this).parent('.bx-viewport').height(highestBox);
			}); 
		}
		
		// Vertical centering of full width Split Text Block text on Window load
		function stbValign() {
			$(".split-text-block.fullWidth .valign").each(function(){
				var height = $(this).outerHeight();
				var margin = height / 2;
				var rightHeight = $(this).parent('.right').siblings('.left').children('img').height();
				if (height > rightHeight) {
					// $(this).css({"position": "relative", "margin-top": "inherit", "top": "inherit", "left":"inherit", "right":"inherit", "padding-bottom":"6rem"});
					$(this).parent('.right').siblings('.left').height(height);
				} else {
					$(this).parent('.right').height(rightHeight).css('position','relative');
					$(this).css({"position": "absolute", "margin-top": "-"+margin+"px", "top": "50%", "left":"0", "right":"0", "padding-bottom":"0"});
				}
				if ($(window).width() < '868') {
					$(this).attr('style', '');
					$(this).parent('.right').siblings('.left').attr('style', '');
				}
			});
		}
		stbValign();
		matchSlideHeight();
	
		$(window).on('load', function() {
			stbValign();
			setTimeout(function () {
				matchSlideHeight();
			}, 500);
		});

		$(window).on('resize', function() {
 			if($(this).width() !== windowWidth) {
				windowWidth = $(window).width();
				setTimeout(function () {
					if (windowWidth < 868) {slides = 1;slideWidth = 500;touch = true;} else {slides = 4;slideWidth = 350;touch = false;}
					sliderOptions = {minSlides: slides,maxSlides: slides,slideWidth: slideWidth,slideMargin: 30,moveSlides: 1,touchEnabled:touch};
					slider1.reloadSlider(sliderOptions);
					slider2.reloadSlider(sliderOptions);
					slider3.reloadSlider(sliderOptions);
					slider4.reloadSlider(sliderOptions);
				}, 50);
				setTimeout(function () {
					$('.bx-viewport').addClass('hey');
					matchSlideHeight();
				}, 100);
				
		 		stbValign(); 
				
			}
		});

        $(window).bind("scroll load", function() {
            $(".main-nav, .store-nav, .header-flag, nav ul li a, nav ul ul, .marnage-booking, .promo-block").toggleClass("shrink", $(this).scrollTop() > 70);
        
            var parallax = $(".parallax");
            var speed = 0.025;

            [].slice.call(parallax).forEach(function(el,i){
                var windowYOffset = window.pageYOffset;
                var elBackgrounPos = "50% " + (windowYOffset * speed) + "px";
                el.style.backgroundPosition = elBackgrounPos;
            });
        });

        var slantedLlink = $('.slanted-link');

        $('.slanted-link').click(function(){
            $(this).toggleClass('active');
            if ($(this).hasClass('active')) {
                $('.slanted-link').removeClass('active');
                $(this).addClass('active');
                $('.slanted-link').addClass('shrink');
                $(this).removeClass('shrink');
            } else {
                $('.slanted-link').removeClass('shrink');
                $('.slanted-link').removeClass('active');
            }
        });

        $(document).ready(function(){
            $(window).scroll(function(){
                if ($(this).scrollTop() > 100) {
                    $('#scrollToTop').fadeIn();
                } else {
                    $('#scrollToTop').fadeOut();
                }
            });
            $('#scrollToTop').click(function(){
                $('html, body').animate({scrollTop : 0},1000);
                return false;
            });
        });

        $('#viewMore').click(function(){
            $('.tile-block').removeClass('hidden');
            $('.tile-block').addClass('visible');
        });

	});


});