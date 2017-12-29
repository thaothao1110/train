;(function($, window, undefined) {
  'use strict';

  var pluginName = 'validate-custom';

  var LIST_VALIDATE = {
    'select-activities': {
      'down': 'checkbox-1'
    },
    'checkbox-1': {
      'up': 'select-activities',
      'down': 'check-conditions'
    },
    'check-conditions': {
      'up': 'checkbox-1'
    }
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      this.onChangeInput();
      this.formValidate();
    },

    onChangeInput: function() {
      var that = this,
          el = that.element,
          opt = that.options,
          inputEle = el.find('[data-input-parsley]');

      inputEle.on('focusin.form-item focusout.form-item', function(evt) {
        var input = $(this),
            wrapInput= input.closest('[data-wrap-input]');

        wrapInput.toggleClass(opt.focusClass, evt.type === 'focusin');
      });
    },

    formValidate: function() {
      var that = this,
          el = that.element,
          opt = that.options,
          inputEle = el.find('[data-input-parsley]');

      el
        .parsley({
          errorsContainer: function () {
            var current = this.$element;
            if (!current.attr('data-parsley-errors-container')) {
              return this.$element.closest(opt.dataWrapInput);
            }
          }
        })
        .on('field:validated', function() {
          var target = this.$element,
              targetID = target.attr('id'),
              obj, errorEl;

          if (!target.prop('disabled')) {
            if (this.validationResult === true) {
              target.closest(opt.dataWrapInput)
                .addClass(opt.successClass)
                .removeClass(opt.errorClass);

              obj = LIST_VALIDATE[targetID];

              if (!obj) {
                return;
              }

              if (obj.down) {
                var checkDownEl = $('#' + obj.down),
                    isDownFalse = checkDownEl.parsley().validationResult !== true;

                errorEl = checkDownEl.closest(opt.dataWrapInput);

                errorEl.toggleClass(opt.focusClass, isDownFalse);
              }

            } else {
              target.closest(opt.dataWrapInput)
                .addClass(opt.errorClass)
                .removeClass(opt.successClass);

              obj = LIST_VALIDATE[targetID];

              if (!obj) {
                return;
              }

              if (obj.down) {
                var downEl = $('#' + obj.down);

                downEl
                  .closest(opt.dataWrapInput)
                    .removeClass(opt.focusClass);
              }

              if (obj.up) {
                var checkUpElement = $('#' + obj.up),
                    isUpTrue = checkUpElement.parsley().validationResult === true;

                errorEl = target.closest(opt.dataWrapInput);

                errorEl.toggleClass(opt.focusClass, isUpTrue);
              }

            }
          } else {
            target.closest(opt.dataWrapInput).addClass(opt.disabledClass);
          }
        });


      inputEle.each(function(index, input) {
        var inputItem = $(input);
        if (inputItem.val()) {
          inputItem.trigger('change');
        }
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
    dataWrapInput: '[data-wrap-input]',
    successClass: 'valid-success',
    errorClass: 'valid-error',
    focusClass: 'focusing',
    disabledClass: 'disabled',
    hiddenClass: 'hidden'
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });
}(jQuery, window));
