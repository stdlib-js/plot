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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Returns a function to get a label.
*
* @private
* @returns {Function} label accessor
*/
function get() {
	/* eslint-disable no-invalid-this */
	var self = this;
	if ( isString( this._label ) ) {
		return label;
	}
	return this._label;

	/**
	* Returns a label.
	*
	* @private
	* @returns {string} label
	*/
	function label() {
		return self._label; // eslint-disable-line no-underscore-dangle
	}
}


// EXPORTS //

module.exports = get;
