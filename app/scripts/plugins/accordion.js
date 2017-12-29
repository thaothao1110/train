/**
 *  @name plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'accordion';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

   function findAccContent(acc){
    return $(('[data-acc-content=' + acc.data('acc-title') + ']'));
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      this.vars = {
        content: this.element.find('[data-acc-content]'),
        title: this.element.find('[data-acc-title]'),
        currentActive: this.element.find('[data-acc-title].active'),
      };
      this.vars.content.each(function() {
        if(this.vars.currentActive.index() === $(this).index()) {
          $(this).addClass('active');
        }
      });
      this.vars.title.on('click', function(e){
        e.preventDefault();
        that.activeAcc($(this));
      });

    },

    activeAcc: function(el){
      if (el.hasClass('active')){
        el.removeClass('active');
        findAccContent(el).removeClass('active').slideUp(350);
      }
      else{
        this.vars.currentActive.removeClass('active');
        findAccContent(this.vars.currentActive).removeClass('active').slideUp(350);
        el.addClass('active');
        findAccContent(el).addClass('active').slideDown(350);
        this.vars.currentActive = el;
      }
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
    key: 'value',
    onCallback: null
  };

  $(function() {
    $('[data-' + pluginName + ']').on('customEvent', function() {
      // to do
    });

    $('[data-' + pluginName + ']')[pluginName]({
      key: 'custom'
    });
  });

}(jQuery, window));
