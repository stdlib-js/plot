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

var indexOf = require( '@stdlib/utils/index-of' );
var format = require( '@stdlib/string/format' );
var ORIENTATIONS = require( './../etc/orientations.json' );


// MAIN //

/**
* Validates `orientation`.
*
* @private
* @param {*} v - value to test
* @returns {(Error|null)} error object or null
*/
function test( v ) {
	if ( indexOf( ORIENTATIONS, v ) === -1 ) {
		return new TypeError( format( 'invalid assignment. `%s` must be one of the following: "%s". Value: `%s`.', 'orientation', ORIENTATIONS.join( '", "' ), v ) );
	}
	return null;
}


// EXPORTS //

module.exports = test;
