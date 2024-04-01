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
var VTREE_OPACITY_NUM = require( './fixtures/vtree.opacity_number.js' );
var VTREE_OPACITY_FCN = require( './fixtures/vtree.opacity_function.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof ctor, 'function', 'main export is a function' );
	t.end();
});

tape( 'an instance throws an error if provided an invalid `opacity` value', function test( t ) {
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
			var node = ctor();
			node.opacity = value;
		};
	}
});

tape( 'an instance throws a range error if provided an `opacity` value which is not on the interval `[0,1]`', function test( t ) {
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
			var node = ctor();
			node.opacity = value;
		};
	}
});

tape( 'an instance supports setting and getting the property value (number)', function test( t ) {
	var node;

	node = ctor({
		'autoRender': false,
		'opacity': 0.9
	});
	t.strictEqual( node.opacity(), 0.9, 'returns expected value' );

	node.opacity = 0.5;
	t.strictEqual( node.opacity(), 0.5, 'returns expected value' );

	t.end();
});

tape( 'an instance supports setting and getting the property value (function)', function test( t ) {
	var node;

	node = ctor({
		'autoRender': false,
		'opacity': opacity1
	});
	t.strictEqual( node.opacity, opacity1, 'returns expected value' );

	node.opacity = opacity2;
	t.strictEqual( node.opacity, opacity2, 'returns expected value' );

	t.end();

	function opacity1() {
		// no-op...
	}

	function opacity2() {
		// no-op...
	}
});

tape( 'an opacity function is provided two arguments: datum and index', function test( t ) {
	var expected;
	var actual;
	var node;

	node = ctor({
		'data': [ 0.10, 0.50, 0.90 ],
		'opacity': opacity,
		'autoRender': false
	});

	expected = [
		[ 0.10, 0 ],
		[ 0.50, 1 ],
		[ 0.90, 2 ]
	];
	actual = [];

	node.render();

	t.deepEqual( actual, expected, 'provides expected arguments' );
	t.end();

	function opacity( d, i ) {
		actual.push( [ d, i ] );
	}
});

tape( 'setting the `opacity` property triggers a `change` event', function test( t ) {
	var node = ctor({
		'opacity': 0.9
	});
	node.on( 'change', onChange );
	node.opacity = 0.1;

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `opacity` property triggers a `change` event', function test( t ) {
	var node = ctor({
		'opacity': 0.9
	});
	node.on( 'change', onChange );
	node.opacity = opacity;

	function opacity() {
		return 0.1;
	}

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `opacity` property triggers a `change` event', function test( t ) {
	var node = ctor({
		'opacity': opacity
	});
	node.on( 'change', onChange );
	node.opacity = 0.9;

	function opacity() {
		return 0.1;
	}

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `opacity` property triggers a `change` event', function test( t ) {
	var node = ctor({
		'opacity': opacity1
	});
	node.on( 'change', onChange );
	node.opacity = opacity2;

	function opacity1() {
		return 0.9;
	}

	function opacity2() {
		return 0.1;
	}

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `opacity` property to an existing value does not trigger a `change` event', function test( t ) {
	var node = ctor({
		'opacity': 0.9
	});
	node.on( 'change', onChange );
	node.opacity = 0.9;
	t.pass( 'is ok' );
	t.end();

	function onChange() {
		t.fail( 'should never be called' );
	}
});

tape( 'setting the `opacity` property to an existing value does not trigger a `change` event', function test( t ) {
	var node = ctor({
		'opacity': opacity
	});
	node.on( 'change', onChange );
	node.opacity = opacity;
	t.pass( 'is ok' );
	t.end();

	function opacity() {
		return 0.9;
	}

	function onChange() {
		t.fail( 'should never be called' );
	}
});

tape( 'the value of the `opacity` property determines the tick (tassel) opacity (number)', function test( t ) {
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

	node.opacity = 0.1;
	vtree = node.render();

	t.deepEqual( vtree, VTREE_OPACITY_NUM, 'expected virtual tree' );
	t.end();
});

tape( 'the value of the `opacity` property determines the tick (tassel) opacity (function)', function test( t ) {
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

	node.opacity = opacity;
	vtree = node.render();

	t.deepEqual( vtree, VTREE_OPACITY_FCN, 'expected virtual tree' );
	t.end();

	function opacity( d ) {
		if ( d === 0.10 ) {
			return 0.25;
		}
		if ( d === 0.50 ) {
			return 0.5;
		}
		return 0.75;
	}
});
