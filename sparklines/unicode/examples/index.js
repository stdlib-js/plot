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
var Float64Array = require( '@stdlib/array/float64' );
var sparkline = require( './../lib' );

var chart;
var data;
var str;
var i;

// Generate some random data...
data = new Float64Array( 50 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = randu() * 100.0;
}

// Create a sparkline chart:
chart = sparkline( data );

// Render the chart as a column chart:
chart.type = 'column';
str = chart.render();
console.log( str );
// => '...'

// Render the chart as a line chart:
chart.type = 'line';
str = chart.render();
console.log( str );
// => '...'
