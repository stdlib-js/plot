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
var ColumnChart = require( './../../../sparklines/unicode/column' );
var LineChart = require( './../../../sparklines/unicode/line' );
var TristateChart = require( './../../../sparklines/unicode/tristate' );
var UpDownChart = require( './../../../sparklines/unicode/up-down' );
var WinLossChart = require( './../../../sparklines/unicode/win-loss' );


// VARIABLES //

var debug = logger( 'sparkline:unicode:render' );


// MAIN //

/**
* Renders a chart.
*
* @private
* @returns {string} rendered chart
*/
function render() {
	/* eslint-disable no-invalid-this */
	var out;

	debug( 'Rendering...' );

	switch ( this._type ) { // eslint-disable-line default-case
	case 'column':
		out = ColumnChart.prototype._render.call( this ); // eslint-disable-line no-underscore-dangle
		break;
	case 'line':
		out = LineChart.prototype._render.call( this ); // eslint-disable-line no-underscore-dangle
		break;
	case 'tristate':
		out = TristateChart.prototype._render.call( this ); // eslint-disable-line no-underscore-dangle
		break;
	case 'up-down':
		out = UpDownChart.prototype._render.call( this ); // eslint-disable-line no-underscore-dangle
		break;
	case 'win-loss':
		out = WinLossChart.prototype._render.call( this ); // eslint-disable-line no-underscore-dangle
		break;
	}

	this.emit( 'render', out );
	return out;
}


// EXPORTS //

module.exports = render;
