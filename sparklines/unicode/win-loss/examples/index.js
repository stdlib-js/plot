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

var randu = require( '@stdlib/random/base/randu' );
var Int8Array = require( '@stdlib/array/int8' );
var winloss = require( './../lib' );

var chart;
var data;
var str;
var d;
var i;

// Generate some random data (based on GS Warriors 2015-2016)...
data = new Int8Array( 50 );
for ( i = 0; i < data.length; i++ ) {
	d = randu();
	if ( d > 0.5 ) {       // home
		d = randu();
		if ( d < 0.057 ) { // loss
			d = -2;
		} else {           // win
			d = 2;
		}
	} else {               // away
		d = randu();
		if ( d < 0.229 ) { // loss
			d = -1;
		} else {           // win
			d = 1;
		}
	}
	data[ i ] = d;
}

// Create a new win/loss chart:
chart = winloss( data );

// Render the chart as a string:
str = chart.render();

console.log( str );
// => '...'
