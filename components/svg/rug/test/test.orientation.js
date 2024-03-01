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
var VTREE_ORIENTATION_TOP = require( './fixtures/vtree.orientation_top.js' );
var VTREE_ORIENTATION_RIGHT = require( './fixtures/vtree.orientation_right.js' );
var VTREE_ORIENTATION_LEFT = require( './fixtures/vtree.orientation_left.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof ctor, 'function', 'main export is a function' );
	t.end();
});

tape( 'an instance throws an error if provided an invalid `orientation` value', function test( t ) {
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
			var node = ctor();
			node.orientation = value;
		};
	}
});

tape( 'an instance supports setting and getting the property value', function test( t ) {
	var node;

	node = ctor({
		'autoRender': false,
		'orientation': 'bottom'
	});
	t.strictEqual( node.orientation, 'bottom', 'returns expected value' );

	node.orientation = 'left';
	t.strictEqual( node.orientation, 'left', 'returns expected value' );

	node.orientation = 'right';
	t.strictEqual( node.orientation, 'right', 'returns expected value' );

	node.orientation = 'top';
	t.strictEqual( node.orientation, 'top', 'returns expected value' );

	t.end();
});

tape( 'setting the `orientation` property triggers a `change` event', function test( t ) {
	var node = ctor({
		'orientation': 'bottom'
	});
	node.on( 'change', onChange );
	node.orientation = 'right';

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `orientation` property to an existing value does not trigger a `change` event', function test( t ) {
	var node = ctor({
		'orientation': 'bottom'
	});
	node.on( 'change', onChange );
	node.orientation = 'bottom';
	t.pass( 'is ok' );
	t.end();

	function onChange() {
		t.fail( 'should never be called' );
	}
});

tape( 'the value of the `orientation` property determines the tick (tassel) orientation (top)', function test( t ) {
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

	node.orientation = 'top';
	vtree = node.render();

	t.deepEqual( vtree, VTREE_ORIENTATION_TOP, 'expected virtual tree' );
	t.end();
});

tape( 'the value of the `orientation` property determines the tick (tassel) orientation (right)', function test( t ) {
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

	node.orientation = 'right';
	vtree = node.render();

	t.deepEqual( vtree, VTREE_ORIENTATION_RIGHT, 'expected virtual tree' );
	t.end();
});

tape( 'the value of the `orientation` property determines the tick (tassel) orientation (left)', function test( t ) {
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

	node.orientation = 'left';
	vtree = node.render();

	t.deepEqual( vtree, VTREE_ORIENTATION_LEFT, 'expected virtual tree' );
	t.end();
});

tape( 'the value of the `orientation` property determines the tick (tassel) orientation (bottom)', function test( t ) {
	var vtree;
	var node;

	node = ctor({
		'autoRender': false,
		'color': '#aaa',
		'data': [ 0.10, 0.50, 0.90 ],
		'label': '',
		'opacity': 0.9,
		'orientation': 'top',
		'size': 6
	});
	vtree = node.render();

	t.deepEqual( vtree, VTREE_ORIENTATION_TOP, 'default behavior' );

	node.orientation = 'bottom';
	vtree = node.render();

	t.deepEqual( vtree, VTREE, 'expected virtual tree' );
	t.end();
});
