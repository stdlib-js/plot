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

var inherit = require( '@stdlib/utils/inherit' );
var Sparkline = require( './../../../../sparklines/base/ctor' );


// MAIN //

/**
* Unicode sparkline up/down chart constructor.
*
* @constructor
* @param {(ArrayLike|ndarrayLike)} [data] - chart data
* @param {Options} [options] - chart options
* @param {boolean} [options.autoRender=false] - indicates whether to re-render on a `change` event
* @param {(PositiveInteger|null)} [options.bufferSize] - data buffer size
* @param {(ArrayLikeObject|ndarrayLike)} [options.data] - data
* @param {string} [options.description=''] - chart description
* @param {Function} [options.isDefined] - accessor indicating whether a datum is defined
* @param {string} [options.label] - data label
* @throws {TypeError} must provide valid options
* @returns {UpDownChart} chart instance
*
* @example
* var data = [ -1, 1, 1, 1, 1, -1, -1, 1 ];
*
* var chart = new UpDownChart( data );
*
* var str = chart.render();
* // returns '↓↑↑↑↑↓↓↑'
*
* @example
* var data = [ -1, 1, 1, 1, 1, -1, -1, 1 ];
* var opts = {
*     'data': data
* };
* var chart = new UpDownChart( opts );
*
* var str = chart.render();
* // returns '↓↑↑↑↑↓↓↑'
*/
function UpDownChart() {
	var nargs;

	nargs = arguments.length;
	if ( !(this instanceof UpDownChart) ) {
		if ( nargs === 0 ) {
			return new UpDownChart();
		}
		if ( nargs === 1 ) {
			return new UpDownChart( arguments[ 0 ] );
		}
		return new UpDownChart( arguments[ 0 ], arguments[ 1 ] );
	}
	// Invoke parent constructor...
	if ( nargs === 0 ) {
		Sparkline.call( this );
	} else if ( nargs === 1 ) {
		Sparkline.call( this, arguments[ 0 ] );
	} else {
		Sparkline.call( this, arguments[ 0 ], arguments[ 1 ] );
	}
	return this;
}

/*
* Inherit from the `Sparkline` prototype.
*/
inherit( UpDownChart, Sparkline );

/**
* Renders a sparkline up/down chart.
*
* @private
* @name _render
* @memberof UpDownChart.prototype
* @type {Function}
* @returns {string} rendered sparkline up/down chart
*
* @example
* var data = [ -1, 1, 1, 1, 1, -1, -1, 1 ];
*
* var chart = new UpDownChart( data );
*
* var str = chart.render();
* // returns '↓↑↑↑↑↓↓↑'
*/
UpDownChart.prototype._render = require( './render.js' ); // eslint-disable-line no-underscore-dangle


// EXPORTS //

module.exports = UpDownChart;
