;(function($) {
  'use strict';

  var pluginName = 'custom-select';

  var EVENTS = {
    DISPLAYER_CLICK: 'click.' + pluginName + '-displayer',
    ITEMS_CLICK: 'click.' + pluginName + '-items',
    BODY_CLICK: 'click.' + pluginName + '-body',
  };

  var generateCustomSelect = function (optElement, opt) {
    var selectedOption = optElement.filter(':selected'),
        selectedOptionVal = selectedOption.val();

    return [
      '<div class="custom-select ', opt.additionClass ,'">',
        '<span class="custom-select__displayer">', selectedOption.text(), '</span>',
        '<ul class="custom-select__list" style="display: none">',
          optElement.get().reduce(function (html, dom) {
            var selectedClass = selectedOptionVal === dom.value ? ' selected ' : '';

            return html + '<li class="custom-select__item' + selectedClass + '" data-value="' + dom.value + '">' + dom.innerText + '</li>';
          }, ''),
        '</ul>',
      '</div>'
    ].join('');
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      this.initSelect();
      this.handleEvents();
    },

    initSelect: function () {
      this.element
        .after(generateCustomSelect(this.element.find('option'), this.options))
        .hide();

      this.customSelect = this.element.next('.custom-select');
      this.customSelectDisplayer = this.customSelect.find('.custom-select__displayer');
      this.customSelectList = this.customSelect.find('.custom-select__list');
      this.customSelectList.children().first().css('display', 'none');
    },

    handleEvents: function () {
      var that = this;

      this.customSelect
        .off(EVENTS.DISPLAYER_CLICK, '.custom-select__displayer')
        .on(EVENTS.DISPLAYER_CLICK, '.custom-select__displayer', function (evt) {
          evt.stopPropagation();
          that.customSelectList.toggle();
          that.element.triggerHandler(
            that.customSelectList.is(':visible') ? 'focusin.form-item' : 'focusout.form-item'
          );
        });

      this.customSelect
        .off(EVENTS.ITEMS_CLICK, '.custom-select__item')
        .on(EVENTS.ITEMS_CLICK, '.custom-select__item', function (evt) {
          evt.stopPropagation();
          var currentEl = $(this);

          that.customSelectDisplayer.text(currentEl.text());

          that.element
            .val(currentEl.data('value'))
            .trigger('change');

          that.customSelectList.hide();
          that.element.triggerHandler('focusout.form-item');
        });

      $(document).add($('body>div:not(script)'))
        .on(EVENTS.BODY_CLICK, function () {
          that.customSelectList.hide();
          that.element.triggerHandler('focusout.form-item');
        });
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
    additionClass: ''
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });
} (window.jQuery));
