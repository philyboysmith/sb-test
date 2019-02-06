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

  function filterPosts() {

    $('.js-ajax-filter').on('click', function(e){

        e.preventDefault();

        $('.button').removeClass('button').addClass('gost-button');
        $(this).removeClass('gost-button').addClass('button');

        var url = $(this).attr('href');
        var sectionName = url.substr(url.lastIndexOf('/') + 1);
        window.history.replaceState({},sectionName, url);

        app.history.push([sectionName,url]);

        loadContent(url + '?v=ajax');


    });
  }

  function loadContent(entry){
    $.get(entry, function( data ) {

      var $filterWrap = $('.filter-wrap');

      // create a new div to start adding content in to.
      $filterWrap.html(data);
       $("img.lazy").lazyload({
            effect: "fadeIn",
            threshold: 500,
        }).removeClass("lazy");

        $(".panel img.lazy").lazyload({
            container: $('.panel')
        }).removeClass("lazy");

    });

  };

  function init() {
    filterPosts();
  }

  return {
    init: init
  };

});
