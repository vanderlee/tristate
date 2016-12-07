/*jslint devel: true, bitwise: true, regexp: true, browser: true, confusion: true, unparam: true, eqeq: true, white: true, nomen: true, plusplus: true, maxerr: 50, indent: 4 */
/*globals jQuery:true, $:true, QUnit, module, test, asyncTest */

QUnit.jqui = {
	_QUnit$:	null,
	_iframe:	null,
	_iframe$:	null,

	module:		function(name, testEnvironment) {
		'use strict';

		testEnvironment = testEnvironment || {};

		var that		= this,
			setup		= testEnvironment.setup,
			teardown	= testEnvironment.teardown;

		$ = jQuery = that._QUnit$	= jQuery.noConflict(true);
		that._iframe				= that._QUnit$('#QUnit-fixture-iframe');

		that._QUnit$(function() {
			that._iframe.load(function() {
				that._iframe$	= that._iframe.get(0).contentWindow.jQuery;
			});
		});

		that._QUnit$.extend(testEnvironment, {
			setup: function() {				
				$ = jQuery = that._iframe$;

				that._iframe$('body').empty();
			},

			teardown: function() {
				that._iframe$('body').empty();

				$ = jQuery = that._QUnit$;
			}
		});

		module.call(this, name, testEnvironment);

		return;
	},

	tests:		function(tests) {
		'use strict';

		var that = this;

		that._QUnit$(function() {
			that._iframe.load(function() {
				that._QUnit$.each(tests, function(name, testCase) {
					if ($.isFunction(testCase)) {
						test(name, testCase);
					} else if ($.isPlainObject(testCase)) {
						if (testCase.type === 'async') {
							asyncTest(name, testCase.test);
						} else {
							test(name, testCase.test);
						}
					}
				});
			});
		});
	}
};