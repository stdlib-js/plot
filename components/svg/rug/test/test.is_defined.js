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
var VTREE_IS_DEFINED = require( './fixtures/vtree.is_defined.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof ctor, 'function', 'main export is a function' );
	t.end();
});

tape( 'an instance throws an error if provided an invalid `isDefined` value', function test( t ) {
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
			node.isDefined = value;
		};
	}
});

tape( 'an instance supports setting and getting the property value', function test( t ) {
	var node;

	node = ctor({
		'autoRender': false,
		'isDefined': isDefined1
	});
	t.deepEqual( node.isDefined, isDefined1, 'returns expected value' );

	node.isDefined = isDefined2;
	t.deepEqual( node.isDefined, isDefined2, 'returns expected value' );

	t.end();

	function isDefined1() {
		// no-op...
	}

	function isDefined2() {
		// no-op...
	}
});

tape( 'an accessor function is provided two arguments: datum and index', function test( t ) {
	var expected;
	var actual;
	var node;

	node = ctor({
		'data': [ 0.10, 0.50, 0.90 ],
		'isDefined': isDefined,
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

	function isDefined( d, i ) {
		actual.push( [ d, i ] );
	}
});

tape( 'setting the `isDefined` property triggers a `change` event', function test( t ) {
	var node = ctor({
		'autoRender': false,
		'isDefined': isDefined1
	});
	node.on( 'change', onChange );
	node.isDefined = isDefined2;

	function isDefined1() {
		// no-op...
	}

	function isDefined2() {
		// no-op...
	}

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `isDefined` property to an existing value does not trigger a `change` event', function test( t ) {
	var node = ctor({
		'autoRender': false,
		'isDefined': isDefined
	});
	node.on( 'change', onChange );
	node.isDefined = isDefined;
	t.pass( 'is ok' );
	t.end();

	function isDefined() {
		// no-op...
	}

	function onChange() {
		t.fail( 'should never be called' );
	}
});

tape( 'the value returned by the `isDefined` accessor determines whether a tick is rendered', function test( t ) {
	var vtree;
	var node;

	node = ctor({
		'autoRender': false,
		'color': '#aaa',
		'data': [ 0.10, 0.50, 0.90 ],
		'isDefined': isDefined1,
		'label': '',
		'opacity': 0.9,
		'orientation': 'bottom',
		'size': 6
	});
	vtree = node.render();

	t.deepEqual( vtree, VTREE, 'default behavior' );

	node.isDefined = isDefined2;
	vtree = node.render();

	t.deepEqual( vtree, VTREE_IS_DEFINED, 'expected virtual tree' );
	t.end();

	function isDefined1( d ) {
		return ( d === d );
	}

	function isDefined2( d ) {
		return ( d !== 0.50 );
	}
});
