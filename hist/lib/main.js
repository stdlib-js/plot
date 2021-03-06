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
var objectKeys = require( '@stdlib/utils/keys' );
var inherit = require( '@stdlib/utils/inherit' );
var format = require( '@stdlib/string/format' );
var copy = require( '@stdlib/utils/copy' );
var mergeFcn = require( '@stdlib/utils/merge' ).factory;
var defineProperty = require( '@stdlib/utils/define-property' );
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isObject = require( '@stdlib/assert/is-plain-object' );
var Plot = require( './../../base/ctor' );
var defaults = require( './defaults.js' );
var setIsDefined = require( './props/is-defined/set.js' );
var getIsDefined = require( './props/is-defined/get.js' );
var setYLabel = require( './props/y-label/set.js' );
var getYLabel = require( './props/y-label/get.js' );
var render = require( './render' );


// VARIABLES //

var debug = logger( 'hist:main' );
var PRIVATE_PROPS = [
	'_barColors',
	'_barOpacity',
	'_binCounts',
	'_binMethod',
	'_binWidth',
	'_edgeMax',
	'_edgeMin',
	'_edges',
	'_lineColors',
	'_nbins',
	'_normalization',
	'_orientation',
	'_xData',
	'_xMax',
	'_xMin',
	'_xScale',
	'_yData',
	'_yLabel',
	'_yMax',
	'_yMin',
	'_yScale'
];


// FUNCTIONS //

var merge = mergeFcn({
	'extend': false
});


// MAIN //

/**
* Histogram constructor.
*
* @constructor
* @param {Array} [x] - values to bin
* @param {Array} [bins] - edges and/or number of bins
* @param {Options} [options] - constructor options
* @param {boolean} [options.autoRender=false] - indicates whether to re-render on a change event
* @param {boolean} [options.autoView=false] - indicates whether to generate an updated view on a render event
* @param {(string|StringArray)} [options.barColors='category10'] - bar face color(s)
* @param {(number|NumberArray)} [options.barOpacity=0.9] - bar face opacity
* @param {(null|string|Array)} [options.binMethod=null] - binning algorithm
* @param {Array} [options.bins=[]] - edges and/or number of bins
* @param {(null|number|NumberArray)} [options.binWidth=null] - bin width
* @param {string} [options.description=''] - description
* @param {(null|number|Array)} [options.edgeMax=null] - maximum bin edge value
* @param {(null|number|Array)} [options.edgeMin=null] - minimum bin edge value
* @param {Array} [options.edges] - bin edges
* @param {string} [options.engine='svg'] - render engine
* @param {PositiveNumber} [options.height=400] - plot height
* @param {Function} [options.isDefined] - accessor indicating whether a datum is defined
* @param {(StringArray|EmptyArray)} [options.labels] - data labels
* @param {(string|StringArray)} [options.lineColors='#000'] - line color(s)
* @param {(number|NumberArray)} [options.lineOpacity=0.9] - line opacity
* @param {(string|StringArray)} [options.lineStyle='-'] - line style(s)
* @param {(NonNegativeInteger|Array<NonNegativeInteger>)} [options.lineWidth=2] - line width(s)
* @param {(null|number|Array)} [options.nbins] - number of bins
* @param {(string|StringArray)} [options.normalization='count'] - histogram normalization
* @param {string} [options.orientation='vertical'] - histogram orientation
* @param {NonNegativeInteger} [options.paddingBottom=80] - bottom padding
* @param {NonNegativeInteger} [options.paddingLeft=90] - left padding
* @param {NonNegativeInteger} [options.paddingRight=20] - right padding
* @param {NonNegativeInteger} [options.paddingTop=80] - top padding
* @param {string} [options.renderFormat='vdom'] - render format
* @param {string} [options.title=''] - title
* @param {string} [options.viewer='none'] - viewer
* @param {PositiveNumber} [options.width=400] - plot width
* @param {Array} [options.x=[]] - values to bin
* @param {string} [options.xAxisOrient='bottom'] - x-axis orientation
* @param {string} [options.xLabel='x'] - x-axis label
* @param {(Date|FiniteNumber|null)} [options.xMax=null] - maximum value of x-axis domain
* @param {(Date|FiniteNumber|null)} [options.xMin=null] - minimum value of x-axis domain
* @param {(NonNegativeInteger|null)} [options.xNumTicks=5] - number of x-axis tick marks
* @param {(string|null)} [options.xTickFormat=null] - x-axis tick format
* @param {string} [options.yAxisOrient='left'] - y-axis orientation
* @param {(null|string)} [options.yLabel=null] - y-axis label
* @param {(FiniteNumber|null)} [options.yMax=null] - maximum value of y-axis domain
* @param {(FiniteNumber|null)} [options.yMin=null] - minimum value of y-axis domain
* @param {(NonNegativeInteger|null)} [options.yNumTicks=5] - number of y-axis tick marks
* @param {(string|null)} [options.yTickFormat=null] - y-axis tick format
* @throws {TypeError} must provide valid options
* @returns {Histogram} Histogram instance
*
* @example
* var hist = new Histogram();
*/
function Histogram() {
	var options;
	var nargs;
	var keys;
	var opts;
	var key;
	var i;

	nargs = arguments.length;
	if ( !(this instanceof Histogram) ) {
		if ( nargs === 0 ) {
			return new Histogram();
		}
		if ( nargs === 1 ) {
			return new Histogram( arguments[0] );
		}
		if ( nargs === 2 ) {
			return new Histogram( arguments[0], arguments[1] );
		}
		return new Histogram( arguments[0], arguments[1], arguments[2] );
	}
	opts = defaults();
	if ( nargs === 0 ) {
		options = {};
	} else if ( nargs === 1 ) {
		options = arguments[ 0 ];
		if ( !isObject( options ) ) {
			throw new TypeError( format( 'invalid argument. Options argument must be an object. Value: `%s`.', options ) );
		}
	} else if ( nargs === 2 ) {
		options = {};
		options.x = arguments[ 0 ];
		options.bins = arguments[ 1 ];
	} else if ( nargs > 2 ) {
		if ( !isObject( arguments[ 2 ] ) ) {
			throw new TypeError( format( 'invalid argument. Options argument must be an object. Value: `%s`.', arguments[2] ) );
		}
		options = copy( arguments[ 2 ] ); // avoid mutation
		options.x = arguments[ 0 ];
		options.bins = arguments[ 1 ];
	}
	opts = merge( opts, options );

	debug( 'Creating an instance with the following configuration: %s.', JSON.stringify( opts ) );
	Plot.call( this, opts );

	for ( i = 0; i < PRIVATE_PROPS.length; i++ ) {
		defineProperty( this, PRIVATE_PROPS[i], {
			'configurable': false,
			'enumerable': false,
			'writable': true,
			'value': null
		});
	}

	// Set options...
	keys = objectKeys( opts );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		this[ key ] = opts[ key ];
	}

	return this;
}

/*
* Inherit from the `Plot` prototype.
*/
inherit( Histogram, Plot );

/**
* Accessor which defines whether a datum is defined.
*
* ## Notes
*
* -   This accessor is used to define how missing values are encoded.
* -   The default behavior is to ignore values which are `NaN`.
*
* @name isDefined
* @memberof Histogram.prototype
* @type {Function}
* @param {*} d - datum
* @param {integer} i - index
* @throws {TypeError} must be a function
*
* @example
* function isDefined( d ) {
*     // Check for `NaN`:
*     return ( d === d );
* }
*
* var hist = new Histogram();
* hist.isDefined = isDefined;
*
* @example
* function isDefined( d ) {
*     // Check for `NaN`:
*     return ( d === d );
* }
*
* var hist = new Histogram({
*     'isDefined': isDefined
* });
* var fcn = hist.isDefined;
* // returns <Function>
*/
defineProperty( Histogram.prototype, 'isDefined', {
	'configurable': false,
	'enumerable': true,
	'set': setIsDefined,
	'get': getIsDefined
});

/**
* y-axis label.
*
* @name yLabel
* @memberof Histogram.prototype
* @type {(string|null)}
* @throws {TypeError} must be a string or null
* @default null
*
* @example
* var hist = new Histogram();
* hist.yLabel = 'value';
*
* @example
* var hist = new Histogram({
*     'yLabel': 'value'
* });
* var yLabel = hist.yLabel;
* // returns 'value'
*/
defineProperty( Histogram.prototype, 'yLabel', {
	'configurable': false,
	'enumerable': true,
	'set': setYLabel,
	'get': getYLabel
});

/**
* Renders a histogram.
*
* @private
* @name _render
* @memberof Histogram.prototype
* @type {Function}
* @param {string} format - render format
* @returns {(VTree|string)} rendered histogram
*/
setReadOnly( Histogram.prototype, '_render', render );


// EXPORTS //

module.exports = Histogram;
