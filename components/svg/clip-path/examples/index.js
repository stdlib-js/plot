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
var clipPath = require( './../lib' );

// Create a new clipPath:
var cp = clipPath({
	'width': 400,
	'height': 400,
	'id': '1234',
	'autoRender': true
});

// Render as a virtual DOM tree:
var vtree = cp.render();
console.log( JSON.stringify( vtree ) );

// Transform the virtual DOM tree to HTML:
var html = toHTML( vtree );
console.log( html );

// Listen for 'render' events (e.g., when triggered due to changes in state):
cp.on( 'render', onRender );

setTimeout( update, 1000 );

function update() {
	cp.id = '4321';
}

function onRender( vtree ) {
	console.log( toHTML( vtree ) );
}
