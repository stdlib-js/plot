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
var objectKeys = require( '@stdlib/utils/keys' );
var isCollection = require( '@stdlib/assert/is-collection' );
var mergeFcn = require( '@stdlib/utils/merge' ).factory;
var pick = require( '@stdlib/utils/pick' );
var inherit = require( '@stdlib/utils/inherit' );
var Sparkline = require( './../../../../sparklines/base/ctor' );
var defaults = require( './defaults.js' );
var setInfinities = require( './props/infinities/set.js' );
var getInfinities = require( './props/infinities/get.js' );
var setYMax = require( './props/y-max/set.js' );
var getYMax = require( './props/y-max/get.js' );
var setYMin = require( './props/y-min/set.js' );
var getYMin = require( './props/y-min/get.js' );
var render = require( './render.js' );


// VARIABLES //

var debug = logger( 'sparkline:line-chart:unicode:main' );

var merge = mergeFcn({
	'extend': false
});

// List of private properties (note: keep in alphabetical order):
var PRIVATE_PROPS = [
	'_infinities',
	'_yMax',
	'_yMin'
];

// List of options properties (note: keep in alphabetical order):
var OPTIONS_PROPS = [
	'infinities',
	'yMax',
	'yMin'
];


// MAIN //

/**
* Unicode sparkline line chart constructor.
*
* @constructor
* @param {(Collection|ndarrayLike)} [data] - chart data
* @param {Options} [options] - chart options
* @param {boolean} [options.autoRender=false] - indicates whether to re-render on a `change` event
* @param {(PositiveInteger|null)} [options.bufferSize] - data buffer size
* @param {(Collection|ndarrayLike)} [options.data] - data
* @param {string} [options.description=''] - chart description
* @param {boolean} [options.infinities=false] - boolean indicating whether to encode infinite values
* @param {Function} [options.isDefined] - accessor indicating whether a datum is defined
* @param {string} [options.label] - data label
* @param {(FiniteNumber|null)} [options.yMax] - maximum value of the y-axis domain
* @param {(FiniteNumber|null)} [options.yMin] - minimum value of the y-axis domain
* @throws {TypeError} must provide valid options
* @returns {LineChart} chart instance
*
* @example
* var data = [ 1.0, 5.0, 3.0, 2.0, 4.0, 4.0, 3.0 ];
*
* var chart = new LineChart( data );
*
* var str = chart.render();
* // returns '⡈⠑⠢⠔⠒⠒⠒'
*
* @example
* var data = [ 1.0, 5.0, 3.0, 2.0, 4.0, 4.0, 3.0 ];
* var opts = {
*     'data': data
* };
* var chart = new LineChart( opts );
*
* var str = chart.render();
* // returns '⡈⠑⠢⠔⠒⠒⠒'
*/
function LineChart() {
	var options;
	var nargs;
	var opts;
	var keys;
	var key;
	var i;

	nargs = arguments.length;
	if ( !(this instanceof LineChart) ) {
		if ( nargs === 0 ) {
			return new LineChart();
		}
		if ( nargs === 1 ) {
			return new LineChart( arguments[ 0 ] );
		}
		return new LineChart( arguments[ 0 ], arguments[ 1 ] );
	}
	// Invoke parent constructor...
	if ( nargs === 0 ) {
		Sparkline.call( this );
	} else if ( nargs === 1 ) {
		Sparkline.call( this, arguments[ 0 ] );
	} else {
		Sparkline.call( this, arguments[ 0 ], arguments[ 1 ] );
	}
	// Extract chart-specific options...
	opts = defaults();
	if ( nargs === 1 && !isCollection( arguments[ 0 ] ) ) {
		options = arguments[ 0 ];
	} else if ( nargs === 2 ) {
		options = arguments[ 1 ];
	} else {
		options = {};
	}
	opts = merge( opts, pick( options, OPTIONS_PROPS ) );

	debug( 'Creating an instance with the following configuration: %s.', JSON.stringify( options ) );

	// Initialize private chart-specific properties...
	for ( i = 0; i < PRIVATE_PROPS.length; i++ ) {
		defineProperty( this, PRIVATE_PROPS[i], {
			'configurable': false,
			'enumerable': false,
			'writable': true,
			'value': null
		});
	}

	// Set chart-specific properties...
	keys = objectKeys( opts );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		this[ key ] = opts[ key ];
	}
	return this;
}

/*
* Inherit from the `Sparkline` prototype.
*/
inherit( LineChart, Sparkline );

/**
* Boolean indicating whether to encode infinite values.
*
* @name infinities
* @memberof LineChart.prototype
* @type {boolean}
* @throws {TypeError} must be a boolean
* @default false
*
* @example
* var chart = new LineChart();
* chart.infinities = true;
*
* @example
* var chart = new LineChart({
*     'infinities': true
* });
* var bool = chart.infinities;
* // returns true
*/
defineProperty( LineChart.prototype, 'infinities', {
	'configurable': false,
	'enumerable': true,
	'set': setInfinities,
	'get': getInfinities
});

/**
* Maximum value of the y-axis domain.
*
* @name yMax
* @memberof LineChart.prototype
* @type {(FiniteNumber|null)}
* @throws {TypeError} must be a finite number or null
*
* @example
* var chart = new LineChart();
* chart.yMax = 100.0;
*
* @example
* var chart = new LineChart({
*     'yMax': 314.0
* });
* var ymax = chart.yMax;
* // returns 314.0
*/
defineProperty( LineChart.prototype, 'yMax', {
	'configurable': false,
	'enumerable': true,
	'set': setYMax,
	'get': getYMax
});

/**
* Minimum value of the y-axis domain.
*
* @name yMin
* @memberof LineChart.prototype
* @type {(FiniteNumber|null)}
* @throws {TypeError} must be a finite number or null
*
* @example
* var chart = new LineChart();
* chart.yMin = -100.0;
*
* @example
* var chart = new LineChart({
*     'yMin': 3.14
* });
* var ymin = chart.yMin;
* // returns 3.14
*/
defineProperty( LineChart.prototype, 'yMin', {
	'configurable': false,
	'enumerable': true,
	'set': setYMin,
	'get': getYMin
});

/**
* Renders a sparkline line chart.
*
* @private
* @name _render
* @memberof LineChart.prototype
* @type {Function}
* @returns {string} rendered sparkline line chart
*
* @example
* var data = [ 1.0, 5.0, 3.0, 2.0, 4.0, 4.0, 3.0 ];
*
* var chart = new LineChart( data );
*
* var str = chart.render();
* // returns '⡈⠑⠢⠔⠒⠒⠒'
*/
LineChart.prototype._render = render; // eslint-disable-line no-underscore-dangle


// EXPORTS //

module.exports = LineChart;
