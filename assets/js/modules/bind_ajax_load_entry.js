/*global alert: false, confirm: false, console: false, Debug: false, $*/

//------------------------------------------------------------
// description of:
//
//
//
//------------------------------------------------------------

define(['jquery', 'TweenMax', 'modules/show_overlay','modules/hide_overlay'
  ], function ($, TweenMax, showOverlay, hideOverlay) {
  "use strict";

  var s = {

  };

  var overlay = '.overlay';

  function firstBind(){

    $('.panel').on('click', function(event){
      event.stopPropagation();
    });

    bindAjaxLoadEntry('body');

    $(overlay).on('click', function(){
      hideAllPanels();
    });

    if( $('.panel').length > 0){

      var $panel = $('.panel');
      var title = $panel.find('.title').attr('data');

      $panel.attr('data-pos', config.panels.length);

      var panelObject = {
        elm: $panel,
        title: title
      }

      config.panels.push(panelObject);

    }

    function hideAllPanels(){
      var x = 0;
      $('.panel').each(function(){
        hidePanel($(this), x);
        x++;
      });
    };

  };

  function closePanelAbove($panel){
      var pos = parseInt($panel.attr('data-pos'));
      var abovePos = parseInt($panel.attr('data-pos')) + 1;

      hideSinglePanel(config.panels[abovePos].elm);

      setTimeout(function(){
        config.panels[pos].elm.removeClass('background');
        TweenMax.to( config.panels[pos].elm, config.speeds.mid, {
          ease: Circ.easeOut,
          x : 0,
          onComplete: function(){

          }
        });
      }, 100);
  };

  function bindAjaxLoadEntry(parent) {

    $(parent).find('.js-ajax-entry-link').each(function(){
      bindInternalLinks($(this));
    });

  };

  function bindInternalLinks($elm){

      $elm.off('click');
      $elm.parents('.panel').find('.darken').first().off('click');

      $elm.parents('.panel').find('.darken').first().on('click', function(event){
        event.stopPropagation();

        closePanelAbove($(this).parents('.panel'));
      });

      $elm.on('click', function(e){
        e.preventDefault();

        $(this).parents('.panel').addClass('background');
        showOverlay.init();

        var url = $(this).attr('href');

        var url = url.replace(/^.*\/\/[^\/]+/, '');

        var sectionName = url.substr(url.lastIndexOf('/') + 1);
        window.history.replaceState({},sectionName, url);

        app.history.push([sectionName,url]);
        loadContent(url);

        


      });

  };

  function loadContent(entry){
    var url = entry + '?v=ajax'
    $.get(url, function( data ) {

      // create a new div to start adding content in to.
      var panel = document.createElement('div');

      // create a new div to start adding content in to.
      $(panel).addClass('panel off-screen');
      $(panel).html(data);
      $(panel).attr('data-pos', config.panels.length);
      $(overlay).append(panel);

      $(panel).on('click', function(event){
        event.stopPropagation();
      });

      var title = $(panel).find('.title').attr('data');

      var panelObject = {
        elm: $(panel),
        title: title
      }

      config.panels.push(panelObject);

      setTimeout(function(){
        showPanel($(panel));
      }, 1000);

    });

  };

  function showPanel($panel){

    // animate the panel in once it has loaded
    TweenMax.to( $panel, config.speeds.mid, {
      ease: Circ.easeOut,
      x : '0%',
      onComplete: function(){
        $panel.removeClass('off-screen');
        $('body').addClass('locked');
        $panel.attr('style','');
        $(window).trigger('ajaxLoad', $panel[0]);
      }
    });

    if(config.panels.length > 1){

      var $below = config.panels[config.panels.length - 2].elm;

      var right = '6rem';
      // var opacity =  1 - (i / 2);

      TweenMax.to( $below, config.speeds.mid, {
        ease: Circ.easeOut,
        x : -40,
        onComplete: function(){
          $below.scrollTop(0);
        }
      });

    }

  };

  function hidePanel($panel, x){

    setTimeout(function(){
      // animate the panel out one at a time
      $('body').removeClass('locked');
      TweenMax.to( $panel, config.speeds.mid, {
        ease: Circ.easeOut,
        x: '100%',
        onComplete:function(){
          $panel.remove();
          hideOverlay.init();
        }
      });

      config.panels.pop();
      app.history.pop();
      var back = app.history[app.history.length - 1]
      window.history.replaceState({},back[0], back[1]);
      window.ga('create', 'UA-4874781-3', 'auto');
      window.ga('send', 'pageview', location.pathname);


    }, x * 100);

  };

  function hideSinglePanel($panel){

      TweenMax.to( $panel, config.speeds.mid, {
        ease: Circ.easeOut,
        x: '100%',
        onComplete:function(){
          $panel.remove();
        }
      });

      config.panels.pop();
      app.history.pop();
      var back = app.history[app.history.length - 1]
      window.history.replaceState({},back[0], back[1]);
      window.ga('create', 'UA-4874781-3', 'auto');
      window.ga('send', 'pageview', location.pathname);

  };


  function init(data) {
    if(typeof data == 'undefined'){
      firstBind();
    }else{
      bindAjaxLoadEntry(data);
    }

  }


  return {
    init: init
  };

});
