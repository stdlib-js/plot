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

tape( 'the constructor throws an error if provided an `options` argument which is not an object', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			var node = ctor( value );
			return node;
		};
	}
});

tape( 'the constructor throws an error if provided an invalid `autoRender` option', function test( t ) {
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
			var node = ctor({
				'autoRender': value
			});
			return node;
		};
	}
});

tape( 'the constructor throws an error if provided an invalid `color` option', function test( t ) {
	var values;
	var i;

	values = [
		5,
		NaN,
		-3.14,
		3.14,
		true,
		false,
		null,
		void 0,
		{},
		[]
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			var node = ctor({
				'color': value
			});
			return node;
		};
	}
});

tape( 'the constructor throws an error if provided an invalid `data` option', function test( t ) {
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
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			var node = ctor({
				'data': value
			});
			return node;
		};
	}
});

tape( 'the constructor throws an error if provided an invalid `isDefined` option', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		{},
		[]
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			var node = ctor({
				'isDefined': value
			});
			return node;
		};
	}
});

tape( 'the constructor throws an error if provided an invalid `label` option', function test( t ) {
	var values;
	var i;

	values = [
		5,
		NaN,
		-3.14,
		3.14,
		true,
		false,
		null,
		void 0,
		{},
		[]
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			var node = ctor({
				'label': value
			});
			return node;
		};
	}
});

tape( 'the constructor throws an error if provided an invalid `opacity` option', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		true,
		false,
		null,
		void 0,
		{},
		[]
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			var node = ctor({
				'opacity': value
			});
			return node;
		};
	}
});

tape( 'the constructor throws a range error if provided an `opacity` option which is not on the interval `[0,1]`', function test( t ) {
	var values;
	var i;

	values = [
		-3.14,
		3.14,
		NaN
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), RangeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			var node = ctor({
				'opacity': value
			});
			return node;
		};
	}
});

tape( 'the constructor throws an error if provided an invalid `orientation` option', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		'beep',
		'toppy',
		'lefty',
		'righty',
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
		t.throws( badValue( values[i] ), Error, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			var node = ctor({
				'orientation': value
			});
			return node;
		};
	}
});

tape( 'the constructor throws an error if provided an invalid `scale` option', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		{},
		[]
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			var node = ctor({
				'scale': value
			});
			return node;
		};
	}
});

tape( 'the constructor throws an error if provided an invalid `size` option', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		NaN,
		-3.14,
		3.14,
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
			var node = ctor({
				'size': value
			});
			return node;
		};
	}
});
