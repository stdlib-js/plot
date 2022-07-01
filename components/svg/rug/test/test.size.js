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
var VTREE_SIZE = require( './fixtures/vtree.size.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof ctor, 'function', 'main export is a function' );
	t.end();
});

tape( 'an instance throws an error if provided an invalid `size` value', function test( t ) {
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
			var node = ctor();
			node.size = value;
		};
	}
});

tape( 'an instance supports setting and getting the property value', function test( t ) {
	var node;

	node = ctor({
		'autoRender': false,
		'size': 6
	});
	t.strictEqual( node.size, 6, 'returns expected value' );

	node.size = 12;
	t.strictEqual( node.size, 12, 'returns expected value' );

	t.end();
});

tape( 'setting the `size` property triggers a `change` event', function test( t ) {
	var node = ctor({
		'size': 6
	});
	node.on( 'change', onChange );
	node.size = 12;

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `size` property to an existing value does not trigger a `change` event', function test( t ) {
	var node = ctor({
		'size': 6
	});
	node.on( 'change', onChange );
	node.size = 6;
	t.pass( 'is ok' );
	t.end();

	function onChange() {
		t.fail( 'should never be called' );
	}
});

tape( 'the value of the `size` property determines the tick (tassel) size', function test( t ) {
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

	node.size = 12;
	vtree = node.render();

	t.deepEqual( vtree, VTREE_SIZE, 'expected virtual tree' );
	t.end();
});
