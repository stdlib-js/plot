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

var logger = require( 'debug' );
var defineProperty = require( '@stdlib/utils/define-property' );
var Annotations = require( './../../../../components/svg/annotations' );
var ClipPath = require( './../../../../components/svg/clip-path' );
var Canvas = require( './../../../../components/svg/canvas' );
var Graph = require( './../../../../components/svg/graph' );
var Title = require( './../../../../components/svg/title' );
var Marks = require( './../../../../components/svg/marks' );
var Bkgd = require( './../../../../components/svg/background' );
var Defs = require( './../../../../components/svg/defs' );
var Axis = require( './../../../../components/svg/axis' );
var Path = require( './../../../../components/svg/path' );
var Symbols = require( './../../../../components/svg/symbols' );
var Rug = require( './../../../../components/svg/rug' );


// VARIABLES //

var debug = logger( 'plot:render:svg:init' );


// MAIN //

/**
* Initializes SVG components.
*
* @private
* @param {Object} state - state
*/
function init( state ) {
	var svg = state.$.svg;

	debug( 'Initializing components...' );

	debug( 'Initializing canvas component...' );
	defineProperty( svg, 'canvas', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Canvas({
			'autoRender': false
		})
	});

	debug( 'Initializing definitions component...' );
	defineProperty( svg, 'defs', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Defs({
			'autoRender': false
		})
	});

	debug( 'Initializing clipping path component...' );
	defineProperty( svg, 'clipPath', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new ClipPath({
			'autoRender': false,
			'id': state._clipPathId // eslint-disable-line no-underscore-dangle
		})
	});

	debug( 'Initializing graph component...' );
	defineProperty( svg, 'graph', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Graph({
			'autoRender': false
		})
	});

	debug( 'Initializing annotations component...' );
	defineProperty( svg, 'annotations', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Annotations({
			'autoRender': false
		})
	});

	debug( 'Initializing title component...' );
	defineProperty( svg, 'title', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Title({
			'autoRender': false
		})
	});

	debug( 'Initializing background component...' );
	defineProperty( svg, 'bkgd', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Bkgd({
			'autoRender': false
		})
	});

	debug( 'Initializing marks component...' );
	defineProperty( svg, 'marks', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Marks({
			'autoRender': false,
			'clipPathId': state._clipPathId // eslint-disable-line no-underscore-dangle
		})
	});

	debug( 'Initializing path component...' );
	defineProperty( svg, 'path', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Path({
			'autoRender': false
		})
	});

	debug( 'Initializing symbols component...' );
	defineProperty( svg, 'symbols', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Symbols({
			'autoRender': false
		})
	});

	debug( 'Initializing x-axis rug component...' );
	defineProperty( svg, 'xRug', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Rug({
			'autoRender': false
		})
	});

	debug( 'Initializing y-axis rug component...' );
	defineProperty( svg, 'yRug', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Rug({
			'autoRender': false
		})
	});

	debug( 'Initializing x-axis component...' );
	defineProperty( svg, 'xAxis', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Axis({
			'autoRender': false
		})
	});

	debug( 'Initializing y-axis component...' );
	defineProperty( svg, 'yAxis', {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': new Axis({
			'autoRender': false
		})
	});

	debug( 'All components initialized.' );
}


// EXPORTS //

module.exports = init;
