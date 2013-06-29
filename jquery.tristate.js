/*jslint devel: true, bitwise: true, regexp: true, browser: true, confusion: true, unparam: true, eqeq: true, white: true, nomen: true, plusplus: true, maxerr: 50, indent: 4 */
/*globals jQuery */

/*
 * Tristate
 *
 * Copyright (c) 2013 Martijn W. van der Lee
 * Licensed under the MIT.
 *
 * Based on work by:
 *  Chris Coyier (http://css-tricks.com/indeterminate-checkboxes/)
 *
 * Tristate checkbox with support features
 * pseudo selectors
 * val() overwrite
 * Requires jQuery.
 */

;(function($){
    var pluginName	= 'vanderlee.tristate',
		tristates	= [],
		widget = function(element) {
			return {
				element: $(element),

				options: {
					state:			undefined,
					trueValue:		undefined,
					falseValue:		undefined,
					nullValue:		undefined
				},

				_setOptions: function(options) {
					$.extend(this.options, options);
				},

				_create: function() {
					var that		= this;

					that.element.change(function(e) {
						switch (that.options.state) {
							case true:  that.options.state = null; break;
							case false: that.options.state = true; break;
							default:    that.options.state = false; break;
						}
						that._refresh();
					});

					that.options.state = that.element.attr('indeterminate') !== undefined? null : that.element.is(':checked');
					that._refresh();

					return this;
				},

				_refresh: function() {
					this.element.data(pluginName, this.value());
					this.element.prop('indeterminate', this.options.state === null);
					this.element.prop('checked', this.options.state);
				},

				state: function(value) {
					if (typeof value === 'undefined') {
						return this.options.state;
					} else {
						this.options.state = value;
						this._refresh();
					}
					return this;
				},

				value: function() {
					//@todo support SET by value
					var value = undefined;
					switch (this.options.state) {
						case true:	value = this.options.trueValue;				break;
						case false: value = this.options.falseValue;			break;
						case null:	value = this.options.indeterminateValue;	break;
					}
					return typeof value === 'undefined'? this.element.val() : value;
				}
			};
		};

    $.fn.tristate = function(operation, value) {
        return this.each(function() {
			var that		= this,
				tristate	= undefined,
				result		= undefined;

            if (typeof operation === 'undefined' || $.isPlainObject(operation)) {
				tristate = widget(this);
				tristate._create.apply(tristate);
				tristate._setOptions(operation);
				tristates.push(tristate);
				result = tristate;
            } else {
				$.each(tristates, function() {
					if (this.element.is(that)) {						
						result = this[operation].apply(this, [value]);
						return false;
					}
				});
			}
			return result;
        });
    };

	// Overwrite fn.val
    var originalVal = $.fn.val;
    $.fn.val = function(value) {
        var data = $(this).data(pluginName);
        if (typeof value === 'undefined') {
            if (typeof data !== 'undefined') {
                return data;
            }
            return originalVal.call(this);
        }
        else {
            if (typeof data !== 'undefined') {
                  $(this).data(pluginName, value);
            }
            return originalVal.call(this, value);
        }
    };

	// :indeterminate pseudo selector
    $.expr.filters.indeterminate = function(element) {
      return $(element).data(pluginName) === null;
    };

	// :determinate pseudo selector
    $.expr.filters.determinate = function(element) {
      return $(element).data(pluginName) !== null;
    };
})(jQuery);