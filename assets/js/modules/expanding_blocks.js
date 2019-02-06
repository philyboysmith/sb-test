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

  function firstBind(){

    bindExpandingBloks($('body'));

  };

  function bindExpandingBloks($parent) {

    $parent.find('.expanding-block').each(function(){
      bindExpand($(this));
    });

    function bindExpand($elm){

      $elm.children('.title').on('click', function(e){
        e.preventDefault();
        var $box = $(this).parents('.expanding-block');

        if($box.hasClass('open')){
          $box.removeClass('open');
        }else{
          	$('.expanding-block').removeClass('open');
			$box.addClass('open');
        }

      });

    };

  };

  function init() {
    firstBind();
  }

  return {
    init: init
  };

});
