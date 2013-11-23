/*jslint devel: true, bitwise: true, regexp: true, browser: true, confusion: true, unparam: true, eqeq: true, white: true, nomen: true, plusplus: true, maxerr: 50, indent: 4 */
/*globals jQuery */

/*!
 * Tristate
 *
 * Copyright (c) 2013 Martijn W. van der Lee
 * Licensed under the MIT.
 */
/* Based on work by:
 *  Chris Coyier (http://css-tricks.com/indeterminate-checkboxes/)
 *
 * Tristate checkbox with support features
 * pseudo selectors
 * val() overwrite
 */

;(function($){
	'use strict';

    var pluginName	= 'vanderlee.tristate',
		tristates	= [],
		originalVal = $.fn.val,
		widget		= function(element) {
			return {
				element: $(element),

				_options: {
					state:				undefined,
					value:				undefined,	// one-way only!
					checked:			undefined,
					unchecked:			undefined,
					indeterminate:		undefined,

					change:				undefined,
					init:				undefined
				},

				_setOptions: function(options) {
					$.extend(this._options, options);
				},

				_create: function() {
					var that = this,
						state;

					that.element.click(function(e) {
						switch (that._options.state) {
							case true:  that._options.state = null; break;
							case false: that._options.state = true; break;
							default:    that._options.state = false; break;
						}
						that._refresh(that._options.change);
					});

					that._options.checked		= that.element.attr('checkedvalue')		  || that._options.checked;
					that._options.unchecked		= that.element.attr('uncheckedvalue')	  || that._options.unchecked;
					that._options.indeterminate	= that.element.attr('indeterminatevalue') || that._options.indeterminate;

					// Initially, set state based on option state or attributes
					if (typeof that._options.state === 'undefined') {
						that._options.state		= typeof that.element.attr('indeterminate') !== 'undefined'? null : that.element.is(':checked');
					}
					// If value specified, overwrite with value
					if (typeof that._options.value !== 'undefined') {
						state = that._parseValue(that._options.value);
						if (typeof state !== 'undefined') {
							that._options.state = state;
						}
					}

					that._refresh(that._options.init);

					return this;
				},

				_refresh: function(callback) {
					var that	= this,
						value	= this.value();

					that.element.data(pluginName, value);

					if (that._options.state === null) {
						that.element.attr('indeterminate', 'indeterminate');
						that.element.prop('indeterminate', true);
					} else {
						that.element.removeAttr('indeterminate');
						that.element.prop('indeterminate', false);
					}

					that.element.attr('checked', that._options.state);


					if ($.isFunction(callback)) {
						callback.call(that.element, that._options.state, that.value());
					}
				},

				state: function(value) {
					if (typeof value === 'undefined') {
						return this._options.state;
					} else if (value === true || value === false || value === null) {
						this._options.state = value;

						this._refresh(this._options.change);
					}
					return this;
				},

				_parseValue: function(value) {
					if (value === this._options.checked) {
						return true;
					} else if (value === this._options.unchecked) {
						return false;
					} else if (value === this._options.indeterminate) {
						return null;
					}
				},

				value: function(value) {
					if (typeof value === 'undefined') {
						var value;
						switch (this._options.state) {
							case true:
								value = this._options.checked;
								break;

							case false:
								value = this._options.unchecked;
								break;

							case null:
								value = this._options.indeterminate;
								break;
						}
						return typeof value === 'undefined'? this.element.attr('value') : value;
					} else {
						var state = this._parseValue(value);
						if (typeof state !== 'undefined') {
							this._options.state = state;
							this._refresh(this._options.change);
						}
					}
				}
			};
		};

    $.fn.tristate = function(operation, value) {
		if (typeof operation === 'undefined' || $.isPlainObject(operation)) {
			return this.each(function() {
				var that		= this,
					tristate,
					result;

				tristate = widget(this);
				tristate._setOptions(operation);
				tristate._create.apply(tristate);
				tristates.push(tristate);
			});
		} else {
			var that	= this,
				tristate,
				result;

			$.each(tristates, function() {
				if (this.element.is(that)) {
					result = this[operation].call(this, value);
					return false;
				}
			});

			return result;
		}
    };

	// Overwrite fn.val
    $.fn.val = function(value) {
        var data = this.data(pluginName);
        if (typeof data === 'undefined') {
	        if (typeof value === 'undefined') {
	            return originalVal.call(this);
			} else {
				return originalVal.call(this, value);
			}
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
		return typeof $(element).data(pluginName) !== 'undefined';
    };
}(jQuery));