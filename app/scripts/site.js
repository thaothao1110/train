/**
 * @name Site
 * @description Global variables and functions
 * @version 1.0
 */
var Site = (function($, window) {
  'use strict';

  var win = $(window),
    body = $('body'),
    html = $('html');

  function isLess600() {
    return window.Modernizr.mq('(max-width: '+ 599 +'px)');
  }

  function isGreater600() {
    return window.Modernizr.mq('(max-width: '+ 1023 +'px)');
  }

  function isGreater1024() {
    return window.Modernizr.mq('(min-width: '+ 1024 +'px)');
  }

  function isDesktop() {
    return html.hasClass('desktop');
  }

  return {
    win: win,
    html: html,
    body: body,
    isLess600: isLess600,
    isGreater600: isGreater600,
    isGreater1024: isGreater1024,
    isDesktop: isDesktop
  };

})(jQuery, window);
