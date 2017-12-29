;(function($, window, document, undefined) {
  'use strict';

  var pluginName = 'modal';
  var win = $(window);
  var body = $('body');
  var btnShowModal = $('[data-modal]');

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      
      btnShowModal.on('click.showModal', function() {
        var _this = $(this);
        var modal = $('#' + _this.data('id'));
        var close = modal.find('[data-md-close]');

        body.addClass('md-open');
        modal.addClass('md-show');

        // for scrolling long content (inside)
        var mdDialog = modal.find('.md-dialog');
        var mdContent = modal.find('.md-content');
        var mdInner = modal.find('.md-inner');
        if(modal.find('.custom-scroll').length && win.width() >= 1200) {
          modal.addClass('has-scroll');
          mdDialog.css('height', 'calc(100% - ' + mdDialog.css('margin-top') + ')');
          mdContent.css('height', 'calc(100% - ' + mdDialog.css('margin-top') + ')');
          mdInner.css('height', mdContent.height() - modal.find('.title').innerHeight());
          modal.find('.custom-scroll').css('height', '100%');

          // add plugin custom scroll if need
          // ...
        }

        close.on('click.hideModal', function(e) {
          e.stopPropagation();
          that.removeModal(modal);
        });

        modal.off('click.hideModal').on('click.hideModal', function(e) {
          if($(e.target).is('#' + _this.data('id'))) {
            that.removeModal(modal);
          }
        });
      });
    },

    removeModal: function(modal) {
      body.removeClass('md-open');
      modal.removeClass('md-show has-scroll'); // remove class has-scroll if no using scrolling content
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

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });
}(jQuery, window));
