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

/* eslint-disable array-element-newline */

'use strict';

var StemLeaf = require( './../lib' );

var chart;
var x;
var y;

// Data from [RosettaCode]{@link https://www.rosettacode.org/wiki/Stem-and-leaf_plot#Python}
x = [
	12, 127, 28, 42, 39, 113, 42, 18, 44, 118, 44, 37, 113, 124, 37,
	48, 127, 36, 29, 31, 125, 139, 131, 115, 105, 132, 104, 123, 35,
	113, 122, 42, 117, 119, 58, 109, 23, 105, 63, 27, 44, 105, 99,
	41, 128, 121, 116, 125, 32, 61, 37, 127, 29, 113, 121, 58, 114
];
y = [
	126, 53, 114, 96, 25, 109, 7, 31, 141, 46, 13, 27, 43, 117, 116,
	27, 7, 68, 40, 31, 115, 124, 42, 128, 52, 71, 118, 117, 38, 27,
	106, 33, 117, 116, 111, 40, 119, 47, 105, 57, 122, 109, 124, 115,
	43, 120, 43, 27, 27, 18, 28, 48, 125, 107, 114, 34, 133, 45, 120,
	30, 127, 31, 116, 146
];

// Only x values:
chart = new StemLeaf({
	'x': x
});
console.log( chart.render() );

// Only y values:
chart = new StemLeaf({
	'y': y
});
console.log( chart.render() );

// Compare x and y values:
chart = new StemLeaf({
	'x': x,
	'y': y
});
console.log( chart.render() );
