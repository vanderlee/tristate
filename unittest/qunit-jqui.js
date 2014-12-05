/*jslint devel: true, bitwise: true, regexp: true, browser: true, confusion: true, unparam: true, eqeq: true, white: true, nomen: true, plusplus: true, maxerr: 50, indent: 4 */
/*globals jQuery:true, $:true, qunit, module, test, asyncTest */

qunit.jqui = {
	_qunit$:	null,
	_iframe:	null,
	_iframe$:	null,

	module:		function(name, testEnvironment) {
		'use strict';

		testEnvironment = testEnvironment || {};

		var that		= this,
			setup		= testEnvironment.setup,
			teardown	= testEnvironment.teardown;

		$ = jQuery = that._qunit$	= jQuery.noConflict(true);
		that._iframe				= that._qunit$('#qunit-fixture-iframe');

		that._qunit$(function() {
			that._iframe.load(function() {
				that._iframe$	= that._iframe.get(0).contentWindow.jQuery;
			});
		});

		that._qunit$.extend(testEnvironment, {
			setup: function() {				
				$ = jQuery = that._iframe$;

				that._iframe$('body').empty();
			},

			teardown: function() {
				that._iframe$('body').empty();

				$ = jQuery = that._qunit$;
			}
		});

		module.call(this, name, testEnvironment);

		return;
	},

	tests:		function(tests) {
		'use strict';

		var that = this;

		that._qunit$(function() {
			that._iframe.load(function() {
				that._qunit$.each(tests, function(name, testCase) {
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