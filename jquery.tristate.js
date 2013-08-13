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
	'use strict';

    var pluginName	= 'vanderlee.tristate',
		tristates	= [],
		originalVal = $.fn.val,
		widget		= function(element) {
			return {
				element: $(element),

				options: {
					state:					null,
					checked:				undefined,
					unchecked:				undefined,
					indeterminate:		undefined
				},

				_setOptions: function(options) {
					$.extend(this.options, options);
				},

				_create: function() {
					var that = this;

					that.element.change(function(e) {
						switch (that.options.state) {
							case true:  that.options.state = null; break;
							case false: that.options.state = true; break;
							default:    that.options.state = false; break;
						}
						that._refresh();
					});

					that.options.checked		= that.element.attr('checkedvalue')	|| that.options.checked;
					that.options.unchecked		= that.element.attr('uncheckedvalue') || that.options.unchecked;
					that.options.indeterminate	= that.element.attr('indeterminatevalue') || that.options.indeterminate;

					that.options.state = typeof that.element.attr('indeterminate') !== 'undefined'? null : that.element.is(':checked');
					that._refresh();

					return this;
				},

				_refresh: function() {
					this.element.data(pluginName, this.value());
					
					if (this.options.state === null) {
						this.element.attr('indeterminate', 'indeterminate');
						this.element.prop('indeterminate', true);
					} else {
						this.element.removeAttr('indeterminate');
						this.element.prop('indeterminate', false);
					}
					
					this.element.attr('checked', this.options.state);
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
					var value;
					switch (this.options.state) {
						case true:	value = this.options.checked;				break;
						case false: value = this.options.unchecked;			break;
						case null:	value = this.options.indeterminate;	break;
					}
					return typeof value === 'undefined'? this.element.attr('value') : value;
				}
			};
		};

    $.fn.tristate = function(operation, value) {
        return this.each(function() {
			var that		= this,
				tristate,
				result;

            if (typeof operation === 'undefined' || $.isPlainObject(operation)) {
				tristate = widget(this);
				tristate._setOptions(operation);
				tristate._create.apply(tristate);
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
    $.fn.val = function(value) {
        var data = this.data(pluginName);
        if (typeof data === 'undefined') {
            return originalVal.call(this, value);
		} else {
	        if (typeof value === 'undefined') {
				return data;
			} else {
				this.data(pluginName, value);
				return this;
			}
		}
    };

	// :indeterminate pseudo selector
    $.expr.filters.indeterminate = function(element) {
		var $element = $(element);
		return typeof $element.data(pluginName) !== 'undefined' && $element.prop('indeterminate');
    };

	// :determinate pseudo selector
    $.expr.filters.determinate = function(element) {
		return !($.expr.filters.indeterminate(element));
    };

	// :tristate selector
    $.expr.filters.tristate = function(element) {
		return $(element).hasData(pluginName);
    };
}(jQuery));