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

var EventEmitter = require( 'events' ).EventEmitter;
var tape = require( 'tape' );
var instanceOf = require( '@stdlib/assert/instance-of' );
var Defs = require( './../lib' );


// FIXTURES //

var VTREE = require( './fixtures/vtree.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof Defs, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function is a constructor', function test( t ) {
	var node = new Defs();
	t.strictEqual( instanceOf( node, Defs ), true, 'is an instance' );
	t.end();
});

tape( 'the constructor does not require the `new` operator', function test( t ) {
	var ctor;
	var node;

	ctor = Defs;
	node = ctor();

	t.strictEqual( instanceOf( node, Defs ), true, 'is an instance' );
	t.end();
});

tape( 'the constructor returns an event emitter', function test( t ) {
	var node = new Defs();
	t.strictEqual( instanceOf( node, EventEmitter ), true, 'is an event emitter' );
	t.end();
});

tape( 'when a returned instance receives a `change` event, it re-renders and emits a `render` event', function test( t ) {
	var node = new Defs();
	node.on( 'render', onRender );
	node.emit( 'change' );

	function onRender( obj ) {
		t.ok( true, 'emits a render event' );
		t.deepEqual( obj, VTREE, 'provides virtual tree' );
		t.end();
	}
});

tape( 'the `render` method returns a rendered virtual tree', function test( t ) {
	var vtree;
	var node;

	node = new Defs();
	vtree = node.render();

	t.deepEqual( vtree, VTREE, 'returns a virtual tree' );
	t.end();
});
