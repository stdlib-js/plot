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

var randn = require( '@stdlib/random/base/box-muller' );
var Float64Array = require( '@stdlib/array/float64' );
var Float32Array = require( '@stdlib/array/float32' );
var Plot = require( './../../../../../ctor' );


// MAIN //

/**
* Generates a plot.
*
* @private
*/
function main() {
	var html;
	var plot;
	var opts;
	var x1;
	var x2;
	var y1;
	var y2;
	var i;

	// Create some data...
	x1 = new Float64Array( 1000 );
	x2 = new Float64Array( x1.length );
	y1 = new Float64Array( x1.length );
	y2 = new Float32Array( x1.length );
	for ( i = 0; i < x1.length; i++ ) {
		x1[ i ] = 30.0 + (7.5*randn());
		x2[ i ] = 40.0 + (12.5*randn());
		y1[ i ] = 50.0 + (10.0*randn());
		y2[ i ] = 30.0 + (5.0*randn());
	}

	// Define the plot options:
	opts = {
		'width': 600,
		'height': 480,
		'xMin': 0.0,
		'xMax': 100.0,
		'yMin': 0.0,
		'yMax': 100.0,
		'lineStyle': 'none',
		'symbols': 'closed-circle',
		'symbolsSize': 6,
		'symbolsOpacity': 0.2,
		'xRug': true,
		'yRug': true,
		'xRugOrient': 'top',
		'yRugOrient': 'right'
	};

	// Create a new plot:
	plot = new Plot( [ x1, x2 ], [ y1, y2 ], opts );

	// Render as HTML/SVG:
	html = plot.render( 'html' );

	// Write to `stdout`:
	console.log( html );
}

main();
