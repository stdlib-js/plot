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


// FIXTURES //

var VTREE = require( './fixtures/vtree.js' );
var VTREE_SCALE = require( './fixtures/vtree.scale.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof ctor, 'function', 'main export is a function' );
	t.end();
});

tape( 'an instance throws an error if provided an invalid `scale` value', function test( t ) {
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
			var node = ctor();
			node.scale = value;
		};
	}
});

tape( 'an instance supports setting and getting the property value', function test( t ) {
	var node;

	node = ctor({
		'autoRender': false,
		'scale': scale1
	});
	t.deepEqual( node.scale, scale1, 'returns expected value' );

	node.scale = scale2;
	t.deepEqual( node.scale, scale2, 'returns expected value' );

	t.end();

	function scale1() {
		// no-op...
	}

	function scale2() {
		// no-op...
	}
});

tape( 'a scale function is provided one argument: datum', function test( t ) {
	var expected;
	var actual;
	var node;

	node = ctor({
		'data': [ 0.10, 0.50, 0.90 ],
		'scale': scale,
		'autoRender': false
	});

	expected = [
		0.10,
		0.50,
		0.90
	];
	actual = [];

	node.render();

	t.deepEqual( actual, expected, 'provides expected arguments' );
	t.end();

	function scale( d ) {
		actual.push( d );
	}
});

tape( 'setting the `scale` property triggers a `change` event', function test( t ) {
	var node = ctor({
		'autoRender': false,
		'scale': scale1
	});
	node.on( 'change', onChange );
	node.scale = scale2;

	function scale1() {
		// no-op...
	}

	function scale2() {
		// no-op...
	}

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `scale` property to an existing value does not trigger a `change` event', function test( t ) {
	var node = ctor({
		'autoRender': false,
		'scale': scale
	});
	node.on( 'change', onChange );
	node.scale = scale;
	t.pass( 'is ok' );
	t.end();

	function scale() {
		// no-op...
	}

	function onChange() {
		t.fail( 'should never be called' );
	}
});

tape( 'a scale function maps each data value to a corresponding coordinate value', function test( t ) {
	var vtree;
	var node;

	node = ctor({
		'autoRender': false,
		'color': '#aaa',
		'data': [ 0.10, 0.50, 0.90 ],
		'label': '',
		'opacity': 0.9,
		'orientation': 'bottom',
		'size': 6
	});
	vtree = node.render();

	t.deepEqual( vtree, VTREE, 'default behavior' );

	node.scale = scale;
	vtree = node.render();

	t.deepEqual( vtree, VTREE_SCALE, 'expected virtual tree' );
	t.end();

	function scale( d ) {
		return d * 10.0;
	}
});
