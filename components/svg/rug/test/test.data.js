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
var VTREE_DATA = require( './fixtures/vtree.data.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof ctor, 'function', 'main export is a function' );
	t.end();
});

tape( 'an instance throws an error if provided an invalid `data` value', function test( t ) {
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
			var node = ctor();
			node.data = value;
		};
	}
});

tape( 'an instance supports setting and getting the property value', function test( t ) {
	var node;

	node = ctor({
		'autoRender': false,
		'data': [ 0.10, 0.50, 0.90 ]
	});
	t.deepEqual( node.data, [ 0.10, 0.50, 0.90 ], 'returns expected value' );

	node.data = [ 0.15, 0.55, 0.95 ];
	t.deepEqual( node.data, [ 0.15, 0.55, 0.95 ], 'returns expected value' );

	t.end();
});

tape( 'setting the `data` property triggers a `change` event', function test( t ) {
	var node = ctor({
		'autoRender': false,
		'data': [ 0.10, 0.50, 0.90 ]
	});
	node.on( 'change', onChange );
	node.data = [ 0.10, 0.50, 0.90 ]; // new reference

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `data` property to an existing value triggers a `change` event', function test( t ) {
	var node;
	var data;

	data = [ 0.10, 0.50, 0.90 ];
	node = ctor({
		'autoRender': false,
		'data': data
	});
	node.on( 'change', onChange );
	node.data = data;

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'the value of the `data` property determines the tick (tassel) location', function test( t ) {
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

	node.data = [ 0.15, 0.55, 0.95 ];
	vtree = node.render();

	t.deepEqual( vtree, VTREE_DATA, 'expected virtual tree' );
	t.end();
});
