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


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof ctor, 'function', 'main export is a function' );
	t.end();
});

tape( 'an instance throws an error if provided an invalid `autoRender` value', function test( t ) {
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
			var node = ctor();
			node.autoRender = value;
		};
	}
});

tape( 'an instance supports setting and getting the property value', function test( t ) {
	var node;

	node = ctor({
		'autoRender': false
	});
	t.strictEqual( node.autoRender, false, 'returns expected value' );

	node.autoRender = true;
	t.strictEqual( node.autoRender, true, 'returns expected value' );

	node.autoRender = false;
	t.strictEqual( node.autoRender, false, 'returns expected value' );

	t.end();
});

tape( 'if `autoRender` is `true`, when a returned instance receives a `change` event, it re-renders and emits a `render` event', function test( t ) {
	var node = ctor({
		'autoRender': true,
		'color': '#aaa',
		'data': [ 0.10, 0.50, 0.90 ],
		'label': '',
		'opacity': 0.9,
		'orientation': 'bottom',
		'size': 6
	});
	node.on( 'render', onRender );
	node.emit( 'change' );

	function onRender( obj ) {
		t.ok( true, 'emits a render event' );
		t.deepEqual( obj, VTREE, 'provides virtual tree' );
		t.end();
	}
});

tape( 'if `autoRender` is `false`, when a returned instance receives a `change` event, it does not re-render or emit a `render` event', function test( t ) {
	var node = ctor({
		'data': [ 0.10, 0.50, 0.90 ],
		'autoRender': false
	});
	node.on( 'render', onRender );
	node.emit( 'change' );
	t.pass( 'is ok' );
	t.end();

	function onRender() {
		t.fail( 'should never be invoked' );
	}
});

tape( 'setting the `autoRender` property triggers a `change` event', function test( t ) {
	var node = ctor({
		'autoRender': true
	});
	node.on( 'change', onChange );
	node.autoRender = false;

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `autoRender` property triggers a `change` event', function test( t ) {
	var node = ctor({
		'autoRender': false
	});
	node.on( 'change', onChange );
	node.autoRender = true;

	function onChange() {
		t.ok( true, 'triggers event' );
		t.end();
	}
});

tape( 'setting the `autoRender` property to an existing value does not trigger a `change` event', function test( t ) {
	var node = ctor({
		'autoRender': true
	});
	node.on( 'change', onChange );
	node.autoRender = true;
	t.pass( 'is ok' );
	t.end();

	function onChange() {
		t.fail( 'should never be called' );
	}
});

tape( 'setting the `autoRender` property to an existing value does not trigger a `change` event', function test( t ) {
	var node = ctor({
		'autoRender': false
	});
	node.on( 'change', onChange );
	node.autoRender = false;
	t.pass( 'is ok' );
	t.end();

	function onChange() {
		t.fail( 'should never be called' );
	}
});
