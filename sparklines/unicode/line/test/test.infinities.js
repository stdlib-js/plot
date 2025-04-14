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
var ctor = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof ctor, 'function', 'main export is a function' );
	t.end();
});

tape( 'an instance throws an error if provided an invalid `infinities` value', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
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
			var chart = ctor();
			chart.infinities = value;
		};
	}
});

tape( 'an instance supports setting and getting the property value', function test( t ) {
	var chart;

	chart = ctor({
		'infinities': false
	});
	t.strictEqual( chart.infinities, false, 'returns expected value' );

	chart.infinities = true;
	t.strictEqual( chart.infinities, true, 'returns expected value' );

	chart.infinities = false;
	t.strictEqual( chart.infinities, false, 'returns expected value' );

	t.end();
});

tape( 'setting the `infinities` property to a new value triggers a `change` event', function test( t ) {
	var chart;

	chart = ctor({
		'infinities': true
	});

	chart.on( 'change', onChange );
	chart.infinities = false;

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `infinities` property to a new value triggers a `change` event', function test( t ) {
	var chart;

	chart = ctor({
		'infinities': false
	});

	chart.on( 'change', onChange );
	chart.infinities = true;

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `infinities` property to its current value does not trigger a `change` event', function test( t ) {
	var chart;

	chart = ctor({
		'infinities': true
	});

	chart.on( 'change', onChange );
	chart.infinities = true;

	t.ok( true, 'does not trigger event' );
	t.end();

	function onChange() {
		t.ok( false, 'should not trigger event' );
	}
});
