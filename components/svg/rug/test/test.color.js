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
var VTREE_COLOR_STRING = require( './fixtures/vtree.color_string.js' );
var VTREE_COLOR_FCN = require( './fixtures/vtree.color_function.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof ctor, 'function', 'main export is a function' );
	t.end();
});

tape( 'an instance throws an error if provided an invalid `color` value', function test( t ) {
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
			var node = ctor();
			node.color = value;
		};
	}
});

tape( 'an instance supports setting and getting the property value (string)', function test( t ) {
	var node;

	node = ctor({
		'autoRender': false,
		'color': '#abc'
	});
	t.strictEqual( node.color(), '#abc', 'returns expected value' );

	node.color = '#cba';
	t.strictEqual( node.color(), '#cba', 'returns expected value' );

	t.end();
});

tape( 'an instance supports setting and getting the property value (function)', function test( t ) {
	var node;

	node = ctor({
		'autoRender': false,
		'color': color1
	});
	t.strictEqual( node.color, color1, 'returns expected value' );

	node.color = color2;
	t.strictEqual( node.color, color2, 'returns expected value' );

	t.end();

	function color1() {
		// no-op...
	}

	function color2() {
		// no-op...
	}
});

tape( 'a color function is provided two arguments: datum and index', function test( t ) {
	var expected;
	var actual;
	var node;

	node = ctor({
		'data': [ 0.10, 0.50, 0.90 ],
		'color': color,
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

	function color( d, i ) {
		actual.push( [ d, i ] );
	}
});

tape( 'setting the `color` property triggers a `change` event', function test( t ) {
	var node = ctor({
		'color': '#aaa'
	});
	node.on( 'change', onChange );
	node.color = '#fff';

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `color` property triggers a `change` event', function test( t ) {
	var node = ctor({
		'color': '#aaa'
	});
	node.on( 'change', onChange );
	node.color = color;

	function color() {
		return '#fff';
	}

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `color` property triggers a `change` event', function test( t ) {
	var node = ctor({
		'color': color
	});
	node.on( 'change', onChange );
	node.color = '#aaa';

	function color() {
		return '#fff';
	}

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `color` property triggers a `change` event', function test( t ) {
	var node = ctor({
		'color': color1
	});
	node.on( 'change', onChange );
	node.color = color2;

	function color1() {
		return '#fff';
	}

	function color2() {
		return '#aaa';
	}

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `color` property to an existing value does not trigger a `change` event', function test( t ) {
	var node = ctor({
		'color': '#aaa'
	});
	node.on( 'change', onChange );
	node.color = '#aaa';
	t.pass( 'is ok' );
	t.end();

	function onChange() {
		t.fail( 'should never be called' );
	}
});

tape( 'setting the `color` property to an existing value does not trigger a `change` event', function test( t ) {
	var node = ctor({
		'color': color
	});
	node.on( 'change', onChange );
	node.color = color;
	t.pass( 'is ok' );
	t.end();

	function color() {
		return '#fff';
	}

	function onChange() {
		t.fail( 'should never be called' );
	}
});

tape( 'the value of the color property determines the tick (tassel) color (string)', function test( t ) {
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

	node.color = '#fff';
	vtree = node.render();

	t.deepEqual( vtree, VTREE_COLOR_STRING, 'expected virtual tree' );
	t.end();
});

tape( 'the value of the color property determines the tick (tassel) color (function)', function test( t ) {
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

	node.color = color;
	vtree = node.render();

	t.deepEqual( vtree, VTREE_COLOR_FCN, 'expected virtual tree' );
	t.end();

	function color( d ) {
		if ( d === 0.10 ) {
			return '#ffa';
		}
		if ( d === 0.50 ) {
			return '#ffb';
		}
		return '#ffc';
	}
});
