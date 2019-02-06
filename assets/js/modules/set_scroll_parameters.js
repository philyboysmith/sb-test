/*global alert: false, confirm: false, console: false, Debug: false, $*/

//------------------------------------------------------------
// description of: set_scroll_parameters.js
//
// This module updates the global variables for scroll
// scroll top and scroll direction.
//
//------------------------------------------------------------

define(['jquery'], function ($) {
  "use strict";


  // set scroll related variables.
  function setScrollParameters(){
    app.curScrollTop = $(document).scrollTop();

    if( app.curScrollTop < app.prevScrollTop ){
      app.scrollDirection = 'up';
    }else{
      app.scrollDirection = 'down';
    }

    app.prevScrollTop = app.curScrollTop;
  }

  function init() {
    setScrollParameters();
  }

  return {
    init: init
  };

});
