jQuery Tristate
===============
Version v0.1

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

Documentation/API
-----------------
### `.tristate(options)`
>	Turn a normal `checkbox` input into a tristate input.

>	**Options**

> -	`state`

> >	`true` for checked, `false` for unchecked or `null` for undeterminate.

> -	`checked`

> >	The value to return for checked state. If not specified, the value in the
	`value` attribute is returned.

> -	`unchecked`

> >	The value to return for unchecked state. If not specified, the value in the
	`value` attribute is returned.

> -	`indeterminate`

> >	The value to return for indeterminate state. If not specified, the value in
	the	`value` attribute is returned.


>	**Events**

> -	`init(state, value)`

> > Triggered upon initialization.
	State can be `true`, `false` or `null`. Value is the value as it would be
	returned from `.val()`.

> -	`change(state, value)`

> > Triggered whenever the state changes.
	State can be `true`, `false` or `null`. Value is the value as it would be
	returned from `.val()`.

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