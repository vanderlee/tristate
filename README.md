jQuery Tristate
===============
Version v1.0.3

By Martijn van der Lee (http://martijn.vanderlee.com)

Based on work by Chris Coyier (http://css-tricks.com/indeterminate-checkboxes/)

jQuery tristate (indeterminate) checkbox with pseudo selectors and optional
value modification and .val() overwrite.

Features
--------
-	Simple syntax: `.tristate()`
-	Options to set alternative values for true, false and null state.
-	Access using `val()` (when alternative values specified).
-	Set state using widget-like syntax `.tristate('state', true/false/null)`;
-	`:tristate`, `:indeterminate` and `:determinate` pseudo selectors included.
-	Indeterminate state can be set using `indeterminate="indeterminate"`
	attribute.
-	Alternative values can be set using `checkedvalue`, `uncheckedvalue` and
	`indeterminatevalue` attributes or options.
-	HTML attributes modified by the plugin.
-	Should support every major browser, including IE6.

Download
--------
jQuery v1.6.2 or higher required. (Will not work with v1.6.1 or before).

Current version: https://github.com/vanderlee/tristate/archive/master.zip

Sourcecode on Github: https://github.com/vanderlee/tristate

Quick start
-----------
The following code quickly shows you how to use the tristate plugins.

There are multiple ways to use tristate, you should look at the included
examples to learn the way you prefer.

	<input type="checkbox" class="tristate"/>
	<input type="checkbox" class="tristate" checked="checked"/>
	<input type="checkbox" class="tristate" indeterminate="1"/>

	<script>
		$(function() {
			$('.tristate').tristate({
				change: function(state, value) {
					console.log('Input:', this);
					console.log('Unknown?', state === null);
					console.log('Known?', state !== null);
					console.log('Checked?', state === true);
					console.log('Unhecked?', state === false);
				}
			});
		});
	</script>

Usage Notes
-----------
-	To set and read the state easily, `null` is used as the value for
	indeterminate tristate inputs in various options, names and functions.

-	The `:checked` pseudo selector works on tristate inputs.

	The indeterminate is treated as unchecked, so will return a `false` result
	when using the `:checked` pseudo selector.
	state is

Documentation
=============
`.tristate(options)`
--------------------
Turn a normal `checkbox` input into a tristate input.

### Options

-	`state`

>	`true` for checked, `false` for unchecked or `null` for undeterminate.

-	`value`

>	Set the value in order to set the state. Only works if values are specified
	for `checked`, `unchecked` and/or `indeterminate`.

-	`checked`

>	The value to return for checked state. If not specified, the value in the
	`value` attribute is returned.

-	`unchecked`

>	The value to return for unchecked state. If not specified, the value in the
	`value` attribute is returned.

-	`indeterminate`

>	The value to return for indeterminate state. If not specified, the value in
	the	`value` attribute is returned.


### Events

-	`init(state, value)`

>	Triggered upon initialization.
	State can be `true`, `false` or `null`. Value is the value as it would be
	returned from `.val()`.

-	`change(state, value)`

>	Triggered whenever the state changes.
	State can be `true`, `false` or `null`. Value is the value as it would be
	returned from `.val()`.


###	Methods

-	`state`

>	Either get or set the state of the checkbox. Uses `true` for checked,
	`false` for unchecked or `null` for indeterminate state.

-	`value`

>	Get the current value or set the state by specifying the value.
	Setting the value only works if you have specified values (either using
	expando attributes or options) for the different states.

`.val()`
--------
Overwrites the normal `val()` method for tristate controls. Returns the value
or the value connected to the state if specified.
Behaviour for controls other that tristate controls is unmodified.

`:tristate` pseudo selector
---------------------------
Selects only tristate inputs

`:determinate` pseudo selector
------------------------------
Selects only those tristate inputs with a determinate (either checked or
unchecked) state.

`:indeterminate` pseudo selector
--------------------------------
Selects only those tristate inputs with an indeterminate (neither checked
nor unchecked) state.

HTML attributes
---------------
You can control the behaviour of the tristate input using HTML expando (non-
standard) attributes. Any current browser will handle these perfectly well.

	<input type="checkbox" indeterminate="indeterminate"
							checkedvalue="Yes"
							uncheckedvalue="No"
							indeterminatevalue="Maybe"/>

### `indeterminate="indeterminate"`
>	You can use a `indeterminate` attribute to specify the default state as such.

>	The plugin itself may set and remove this attribute as the state changes.

### `checkedvalue`
>	Sets the value returned if checked.

### `uncheckedvalue`
>	Sets the value returned if unchecked.

### `indeterminatevalue`
>	Sets the value returned if indeterminate.