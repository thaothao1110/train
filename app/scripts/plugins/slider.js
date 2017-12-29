;(function($, window, undefined) {
  'use strict';

  var pluginName = 'slider';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      this.initSlider();
    },

    initSlider: function() {
      var that = this,
        el = that.element,
        options = that.options,
        duration = 400,
        timer,
        eventName;

      if(options.onMobile) {
        if(Site.isLess600()) {
          el.slick(that.options);
        }
        Site.isDesktop() ? eventName = 'resize.' : eventName = 'orientationchange.';
        Site.win.on(eventName + pluginName, function() {
          clearTimeout(timer);
          timer = setTimeout(function() {
            if(!Site.isLess600()) {
              if(el.hasClass('slick-slider')) {
                el.slick('unslick');
              }
            } else {
              el.slick(that.options);
            }
          }, duration);
        });
      } else {
        el.slick(that.options);
      }
    },

    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    autoplay: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });
}(jQuery, window));
