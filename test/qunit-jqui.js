/*jslint devel: true, bitwise: true, regexp: true, browser: true, confusion: true, unparam: true, eqeq: true, white: true, nomen: true, plusplus: true, maxerr: 50, indent: 4 */
/*globals jQuery:true, $:true, QUnit, module, test, asyncTest */

QUnit.jqui = {
	_QUnit$:	null,
	_iframe:	null,
	_iframe$:	null,

	module:		function(name, testEnvironment) {
		'use strict';

		testEnvironment = testEnvironment || {};

		var self		= this,
			setup		= testEnvironment.setup,
			teardown	= testEnvironment.teardown;

		$ = jQuery = self._QUnit$	= jQuery.noConflict(true);
		
		self._QUnit$(function() {
			self._iframe				= self._QUnit$('#qunit-fixture-iframe');
			self._iframe.on('load', function() {	
				self._iframe$	= self._iframe.get(0).contentWindow.jQuery;
			});
		});

		self._QUnit$.extend(testEnvironment, {
			setup: function() {				
				$ = jQuery = self._iframe$;

				self._iframe$('body').empty();
			},

			teardown: function() {
				self._iframe$('body').empty();

				$ = jQuery = self._QUnit$;
			}
		});

		module.call(this, name, testEnvironment);

		return;
	},

	tests:		function(tests) {
		'use strict';

		var self = this;
		
		self._QUnit$(function() {
			self._iframe.on('load', function() {
				self._QUnit$.each(tests, function(name, testCase) {
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