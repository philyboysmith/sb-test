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

  function startFlag($elm) {

    var data = $elm.attr('data-json');

    if(data){
      loadJSON(data, jsonReady);
    }

    function jsonReady(data){

        $elm.css({
          'background-image': 'url(' + $elm.attr('data-animation') + ')'
        });

        $elm.addClass('animated');

        if( $elm.hasClass('flexible-flag') ){

            var parentSize = $elm.parent().width();

            $elm.css({
                'transform': 'scale(1)'
            });

            var scale = parentSize / $elm.width();

            $elm.css({
                'transform': 'scale(' + scale + ')'
            });

        }

        var i = 0;

        data = JSON.parse(data);

        var frames = data.frames;
        var meta = data.meta;

        var spriteSheetSize = meta.size;

        var spriteSize = {
          w: frames[0].frame.w,
          h: frames[0].frame.h,
        };

        var elmSize = {
          w: $elm.width(),
          h: $elm.height()
        };

        var ratioWidth = (spriteSize.w / spriteSheetSize.w);
        var ratioHeight = (spriteSize.h / spriteSheetSize.h);

        function playAnimation(){

          setTimeout(function(){

            var spritePos = frames[i].frame;

            var newPosX = spritePos.x * -1;
            var newPosY = spritePos.y * -1;
            var newPos = newPosX + 'px ' + newPosY + 'px';

            $elm.css('background-position', newPos);

            i++;

            if(i > 192 - 1){
              i = 0;
            }

            playAnimation();

          }, 40);

        };

        playAnimation();

    };

  };

  function loadJSON(data, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', data, true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
    };

    xobj.send(null);

  };

  function init() {
    $('.flag').each(function(){
        startFlag($(this));
    });
  };

  return {
    init: init
  };

});
