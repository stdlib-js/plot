/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var noop = require( '@stdlib/utils/noop' );
var ctor = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof ctor, 'function', 'main export is a function' );
	t.end();
});

tape( 'an instance throws an error if provided an invalid `description` value', function test( t ) {
	var values;
	var i;

	values = [
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			var sparkline = ctor();
			sparkline.description = value;
		};
	}
});

tape( 'an instance supports setting and getting the property value', function test( t ) {
	var sparkline;

	sparkline = ctor({
		'description': 'beep'
	});
	sparkline._render = noop; // eslint-disable-line no-underscore-dangle
	t.strictEqual( sparkline.description, 'beep', 'returns expected value' );

	sparkline.description = 'boop';
	t.strictEqual( sparkline.description, 'boop', 'returns expected value' );

	sparkline.description = 'foo';
	t.strictEqual( sparkline.description, 'foo', 'returns expected value' );

	t.end();
});

tape( 'setting the `description` property to a new value triggers a `change` event', function test( t ) {
	var sparkline;

	sparkline = ctor({
		'description': 'beep'
	});
	sparkline._render = noop; // eslint-disable-line no-underscore-dangle

	sparkline.on( 'change', onChange );
	sparkline.description = 'boop';

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `description` property to its current value does not trigger a `change` event', function test( t ) {
	var sparkline;

	sparkline = ctor({
		'description': 'beep'
	});
	sparkline._render = noop; // eslint-disable-line no-underscore-dangle

	sparkline.on( 'change', onChange );
	sparkline.description = 'beep';

	t.ok( true, 'does not trigger event' );
	t.end();

	function onChange() {
		t.ok( false, 'should not trigger event' );
	}
});
