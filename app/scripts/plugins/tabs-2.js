
;(function($, window, Unibail, undefined) {
  'use strict';

  var pluginName = 'tabs-2';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  function findTabContent(tab){
    return $(('[data-content=' + tab.data('tab') + ']'));
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      this.vars = {
        elTab: this.element.find('[data-tab]'),
        elContent: this.element.find('[data-content]'),
        currentActive: this.element.find('[data-tab].active')
      };

      this.vars.elTab.on('click.' + pluginName, function(){
        that.activeTab($(this));
      });
    },
    activeTab: function(el){
      if (el.hasClass('active')){ 
        return false;
      }
      el.addClass('active');
      findTabContent(el).addClass('active').show();
      this.vars.currentActive.removeClass('active');
      findTabContent(this.vars.currentActive).removeClass('active').hide();
      this.vars.currentActive = el;
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
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(window.jQuery, window));
