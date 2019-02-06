/*global alert: false, confirm: false, console: false, Debug: false, $*/

//------------------------------------------------------------
// description of: set_size_parameters.js
//
// This module updates the global variables for sizes
// window height and width as well as doc height.
//
//------------------------------------------------------------

define(['jquery'], function ($) {
  "use strict";


  // set size related variables.
  function setSizeParameters(){

    // window
    app.windowWidth = $(window).width();
    app.windowHeight = $(window).height();

    // document
    app.docHeight = $(document).height();

  }

  function init() {
    setSizeParameters();
  }

  return {
    init: init
  };

});
