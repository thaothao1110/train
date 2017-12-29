
;(function($, window, Unibail, undefined) {
  'use strict';

  var pluginName = 'tabs';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
          that.tabFunction();

    },
    tabFunction: function() {
      var that = this,
          element = that.element,
          elTab = element.find('[data-tab]'),
          elContent = element.find('[data-content]');

      elTab.on('click', function(){
        var tabClicked = $(this);
        if (tabClicked.hasClass('active')) {
          return; 
        }
        else {
          elTab.removeClass('active');
          tabClicked.addClass('active');
          var dataAttr = tabClicked.data('tab');
          elContent.removeClass('active').hide();
          $('[data-content=' + dataAttr +']').addClass('active').fadeIn();
        }         
      });    
    },
    destroy: function() {
      // remove events
      // deinitialize
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

  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(window.jQuery, window));
