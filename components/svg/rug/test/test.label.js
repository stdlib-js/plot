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
var VTREE_LABEL_STRING = require( './fixtures/vtree.label_string.js' );
var VTREE_LABEL_FCN = require( './fixtures/vtree.label_function.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof ctor, 'function', 'main export is a function' );
	t.end();
});

tape( 'an instance throws an error if provided an invalid `label` value', function test( t ) {
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
			node.label = value;
		};
	}
});

tape( 'an instance supports setting and getting the property value (string)', function test( t ) {
	var node;

	node = ctor({
		'autoRender': false,
		'label': 'beep'
	});
	t.strictEqual( node.label(), 'beep', 'returns expected value' );

	node.label = 'boop';
	t.strictEqual( node.label(), 'boop', 'returns expected value' );

	t.end();
});

tape( 'an instance supports setting and getting the property value (function)', function test( t ) {
	var node;

	node = ctor({
		'autoRender': false,
		'label': label1
	});
	t.strictEqual( node.label, label1, 'returns expected value' );

	node.label = label2;
	t.strictEqual( node.label, label2, 'returns expected value' );

	t.end();

	function label1() {
		// no-op...
	}

	function label2() {
		// no-op...
	}
});

tape( 'a label function is provided two arguments: datum and index', function test( t ) {
	var expected;
	var actual;
	var node;

	node = ctor({
		'data': [ 0.10, 0.50, 0.90 ],
		'label': label,
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

	function label( d, i ) {
		actual.push( [ d, i ] );
	}
});

tape( 'setting the `label` property triggers a `change` event', function test( t ) {
	var node = ctor({
		'label': 'beep'
	});
	node.on( 'change', onChange );
	node.label = 'boop';

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `label` property triggers a `change` event', function test( t ) {
	var node = ctor({
		'label': 'beep'
	});
	node.on( 'change', onChange );
	node.label = label;

	function label() {
		return 'boop';
	}

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `label` property triggers a `change` event', function test( t ) {
	var node = ctor({
		'label': label
	});
	node.on( 'change', onChange );
	node.label = 'boop';

	function label() {
		return 'beep';
	}

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `label` property triggers a `change` event', function test( t ) {
	var node = ctor({
		'label': label1
	});
	node.on( 'change', onChange );
	node.label = label2;

	function label1() {
		return 'beep';
	}

	function label2() {
		return 'boop';
	}

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `label` property to an existing value does not trigger a `change` event', function test( t ) {
	var node = ctor({
		'label': 'beep'
	});
	node.on( 'change', onChange );
	node.label = 'beep';
	t.pass( 'is ok' );
	t.end();

	function onChange() {
		t.fail( 'should never be called' );
	}
});

tape( 'setting the `label` property to an existing value does not trigger a `change` event', function test( t ) {
	var node = ctor({
		'label': label
	});
	node.on( 'change', onChange );
	node.label = label;
	t.pass( 'is ok' );
	t.end();

	function label() {
		return 'beep';
	}

	function onChange() {
		t.fail( 'should never be called' );
	}
});

tape( 'the value of the label property determines the tick data label (string)', function test( t ) {
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

	node.label = 'beep';
	vtree = node.render();

	t.deepEqual( vtree, VTREE_LABEL_STRING, 'expected virtual tree' );
	t.end();
});

tape( 'the value of the label property determines the tick data label (function)', function test( t ) {
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

	node.label = label;
	vtree = node.render();

	t.deepEqual( vtree, VTREE_LABEL_FCN, 'expected virtual tree' );
	t.end();

	function label( d ) {
		if ( d === 0.10 ) {
			return 'beep';
		}
		if ( d === 0.50 ) {
			return 'boop';
		}
		return 'bop';
	}
});
