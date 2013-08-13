jQuery Tristate
===============
Version 0

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
Current version: https://github.com/vanderlee/tristate/archive/master.zip

Quick start
-----------
	<input type="checkbox" class="tristate"/>
	<input type="checkbox" class="tristate" checked="checked"/>
	<input type="checkbox" class="tristate" indeterminate="indeterminate"/>

	<script>
		$(function() {
			$('.tristate').tristate();

			$('.tristate').click(function() {
				console.log('Is determinate?', $(this).is(':determinate'));
				console.log('Is indeterminate?', $(this).is(':indeterminate'));
				console.log('Is checked?', $(this).is(':checked'));
			});
		});
	</script>

Documentation/API
-----------------
### `.tristate(options)`
>	Turn a normal `checkbox` input into a tristate input.

>	**Options**

> -	`state`

>	`true` for checked, `false` for unchecked or `null` for undeterminate.

> -	`checked`

>	The value to return for checked state. If not specified, the value in the
	`value` attribute is returned.

> -	`unchecked`

>	The value to return for unchecked state. If not specified, the value in the
	`value` attribute is returned.

> -	`indeterminate`

>	The value to return for indeterminate state. If not specified, the value in
	the	`value` attribute is returned.

###	`.val()`
>	By default, returns the value as if it were a plain checkbox; the state is
	ignored and the `value` attribute.

###	`:tristate` pseudo selector
>	Selects only tristate inputs

### `:determinate` pseudo selector
>	Selects only those tristate inputs with a determinate (either checked or
	unchecked) state.

###	`:indeterminate` pseudo selector
>	Selects only those tristate inputs with an indeterminate (neither checked
	nor unchecked) state.

HTML attributes
---------------
You can use a `determinate` attribute to specify the default state as such.

Use `checkedvalue`, `uncheckedvalue` and/or `indeterminatevalue` to set
alternative return values for the related state.

Usage Notes
-----------
-	To set and read the state easily, `null` is used as the value for
	indeterminate tristate inputs in various options, names and functions.

-	The `:checked` pseudo selector works on tristate inputs.

	The indeterminate is treated as unchecked, so will return a `false` result
	when using the `:checked` pseudo selector.
	state is