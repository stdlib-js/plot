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

var toHTML = require( 'vdom-to-html' );
var path = require( './../lib' );

// Create a new path:
var node = path({
	'x': [0.10, 0.50, 0.90],
	'y': [0.43, 0.37, 0.53],
	'autoRender': true
});

// Render as a virtual DOM tree:
var vtree = node.render();
console.log( JSON.stringify( vtree ) );

// Transform the virtual DOM tree to HTML:
var html = toHTML( vtree );
console.log( html );

// Listen for 'render' events (e.g., when triggered due to changes in state):
node.on( 'render', onRender );

setTimeout( update, 1000 );

function update() {
	node.y = [0.99, 0.87, 0.92];
}

function onRender( vtree ) {
	console.log( toHTML( vtree ) );
}
