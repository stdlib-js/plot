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
var rug = require( './../lib' );

// Create a new rug component:
var opts = {
	'data': [ 0.10, 0.50, 0.90 ],
	'orientation': 'bottom',
	'autoRender': true
};
var r = rug( opts );

// Render as a virtual DOM tree:
var vtree = r.render();
console.log( JSON.stringify( vtree ) );

// Transform the virtual DOM tree to HTML:
var html = toHTML( vtree );
console.log( html );
// => <g property="rug" class="rug"><line property="rug.tick" class="tick" fill="none" opacity="0.9" stroke="#aaa" stroke-width="1" data-label="" y1="0" y2="-6" x1="0.1" x2="0.1"></line><line property="rug.tick" class="tick" fill="none" opacity="0.9" stroke="#aaa" stroke-width="1" data-label="" y1="0" y2="-6" x1="0.5" x2="0.5"></line><line property="rug.tick" class="tick" fill="none" opacity="0.9" stroke="#aaa" stroke-width="1" data-label="" y1="0" y2="-6" x1="0.9" x2="0.9"></line></g>

// Listen for 'render' events (e.g., when triggered due to changes in state):
r.on( 'render', onRender );

setTimeout( update, 1000 );

function update() {
	r.data = [ 0.99, 0.87, 0.92 ];
}

function onRender( vtree ) {
	console.log( toHTML( vtree ) );
}
