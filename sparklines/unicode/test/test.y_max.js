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

tape( 'an instance throws an error if provided an invalid `yMax` value', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		NaN,
		void 0,
		true,
		false,
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
			chart.yMax = value;
		};
	}
});

tape( 'an instance supports setting and getting the property value', function test( t ) {
	var chart;

	chart = ctor({
		'data': [ 1, 2, 3 ],
		'yMax': 10.0
	});
	t.strictEqual( chart.yMax, 10.0, 'returns expected value' );

	chart.yMax = 20.0;
	t.strictEqual( chart.yMax, 20.0, 'returns expected value' );

	chart.yMax = 30.0;
	t.strictEqual( chart.yMax, 30.0, 'returns expected value' );

	chart.yMax = null;
	t.strictEqual( chart.yMax, 3, 'returns expected value' );

	t.end();
});

tape( 'setting the `yMax` property to a new value triggers a `change` event', function test( t ) {
	var chart;

	chart = ctor({
		'yMax': 10.0
	});

	chart.on( 'change', onChange );
	chart.yMax = 30.0;

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `yMax` property to its current value does not trigger a `change` event', function test( t ) {
	var chart;

	chart = ctor({
		'yMax': 10.0
	});

	chart.on( 'change', onChange );
	chart.yMax = 10.0;

	t.ok( true, 'does not trigger event' );
	t.end();

	function onChange() {
		t.ok( false, 'should not trigger event' );
	}
});
