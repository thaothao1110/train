;(function($, window, undefined) {
  'use strict';

  var pluginName = 'tooltip',
      win = $(window);

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;

      win.on('resize.' + pluginName, function() {
        that.displayTooltip();
        that.hideTooltip();
      }).trigger('resize.' + pluginName);
    },

    displayTooltip: function() {
      var that = this,
          el = that.element,
          opt = that.options,
          tooltipPos = el.data('position'),
          tooltipContent = el.find(opt.dataTooltipContent),
          tooltipControl = el.find(opt.dataTooltipControl),
          closeTooltip = el.find(opt.dataClose),
          timer, checkTimeout;

      var controlPos = tooltipControl.offset(),
          arrow = tooltipContent.find('.tooltip__arrow'),
          halfContent = tooltipContent.outerWidth() / 2;

      closeTooltip
        .off('click.' + pluginName)
        .on('click.' + pluginName, function() {
          that.hideTooltip();
        });

      function checkPosTooltip() {
        if (controlPos.left < halfContent) {
          if (tooltipPos === 'top') {
            tooltipContent.addClass(opt.topLeftClass);
          } else {
            tooltipContent.addClass(opt.bottomLeftClass);
          }
          arrow.css({
            'left': tooltipControl.outerWidth() / 2
          });
          tooltipContent.css({
            'left': 0
          });
        } else if (win.width() - controlPos.left + tooltipControl.outerWidth() < halfContent) {
          if (tooltipPos === 'top') {
            tooltipContent.addClass(opt.topRightClass);
          } else {
            tooltipContent.addClass(opt.bottomRightClass);
          }
          arrow.css({
            'left': tooltipContent.outerWidth() - arrow.outerWidth() - (tooltipControl.outerWidth() / 2)
          });
          tooltipContent.css({
            'left': -(tooltipContent.outerWidth() - tooltipControl.outerWidth())
          });
        } else {
          if (tooltipPos === 'top') {
            tooltipContent.addClass(opt.topCenterClass);
          } else {
            tooltipContent.addClass(opt.bottomCenterClass);
          }
          arrow.css({
            'left': halfContent - (tooltipControl.outerWidth() / 2)
          });
          tooltipContent.css({
            'left': -halfContent + (tooltipControl.outerWidth() / 2)
          });
        }
      }

      tooltipControl
        .off('click.' + pluginName)
        .on('click.' + pluginName, function() {
          if (el.hasClass(opt.showClass)) {
            el.removeClass(opt.showClass);
          } else {
            el.addClass(opt.showClass);
          }
          if (tooltipPos === 'bottom' || tooltipPos === 'top') {
            checkPosTooltip();
          } else if (tooltipPos === 'left' || tooltipPos === 'right') {
            clearTimeout(timer);
            checkTimeout = setTimeout(function() {
              var contentPos = tooltipContent.offset();
              if (contentPos.left < 0) {
                checkPosTooltip();
                tooltipContent.css ({
                  'margin-top': 10,
                  'margin-right': 0,
                  'right': 'auto',
                  'top': '100%',
                  'transform': 'translateY(0)'
                });
                arrow.css({
                  'top': 0,
                  'margin-left': arrow.outerWidth() / 2
                });
              } else if (contentPos.left + tooltipContent.outerWidth() > win.width()) {
                checkPosTooltip();
                tooltipContent.css ({
                  'margin-top': 10,
                  'margin-left': 0,
                  'top': '100%',
                  'transform': 'translateY(0)'
                });
                arrow.css({
                  'top': 0,
                  'margin-left': arrow.outerWidth() / 2
                });
              }
            }, opt.durationDelay);
          }
        });
    },

    hideTooltip: function() {
      var that = this,
          el = that.element,
          opt = that.options;

      el.removeClass(opt.showClass);
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
    dataTooltipContent: '[data-tooltip-content]',
    dataTooltipControl: '[data-tooltip-control]',
    dataClose: '[data-close]',
    topLeftClass: 'top-left-transform',
    topRightClass: 'top-right-transform',
    topCenterClass: 'top-center-transform',
    bottomCenterClass: 'bottom-center-transform',
    bottomLeftClass: 'bottom-left-transform',
    bottomRightClass: 'bottom-right-transform',
    leftClass: 'left-transform',
    rightClass: 'right-transform',
    spacingBorder: 5,
    showClass: 'show',
    durationDelay: 1000
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });
}(jQuery, window));
