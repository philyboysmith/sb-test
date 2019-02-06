// r.js -o app.build.js
{
    baseUrl: '.',
    name: 'libs/almond',
    include: ['app'],
    insertRequire: ['app'],
    out: '../../dist/js/main.min.js',
    preserveLicenseComments: false,
    paths: {
      modernizr : 'libs/modernizr-custom',
      jquery : "libs/jquery-3.0.0.min",
      underscore : "libs/underscore-min.1.8.3",
      swiper : "libs/swiper.min.3.3.1",
      TweenMax: 'libs/gsap/src/uncompressed/TweenMax',
      lazyload: 'libs/jquery.lazyload.min',
      masonry: 'libs/masonry.pkgd.min',
      imagesloaded: 'libs/imagesloaded.pkgd.min',
      magnific: 'libs/magnific.min',
      stellar: 'libs/jquery.stellar.min.js',
      flickity: 'libs/flickity.pkgd.min.js',
	  bxslider: 'libs/jquery.bxslider',
	  matchHeight: 'libs/jquery.matchHeight'
    },
    shim: {
      'jQuery': {
        exports: 'jQuery'
      },
      'underscore':{
        exports: 'underscore'
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
      'masonry': ['jquery'],
      'stellar': ['jquery'],
      'flickity': ['jquery'],
	  'bxslider': ['jquery'],
	  'matchHeight': ['jquery']
    }
}