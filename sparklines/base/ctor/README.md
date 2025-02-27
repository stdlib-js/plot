<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

# Sparkline

> Base class for sparklines.

<section class="usage">

## Usage

```javascript
var Sparkline = require( '@stdlib/plot/sparklines/base/ctor' );
```

#### Sparkline( \[data,] \[options] )

Returns a `sparkline` instance.

```javascript
var sparkline = new Sparkline();
// returns <Sparkline>
```

The constructor accepts the following `options`:

-   **autoRender**: `boolean` indicating whether to re-render on a `change` event.
-   **bufferSize**: data buffer size. If provided, data is kept in a first-in first-out (FIFO) buffer which cannot exceed the buffer size. Default: `+infinity`.
-   **data**: sparkline data.
-   **description**: sparkline description.
-   **isDefined**: accessor `function` indicating whether a datum is defined.
-   **label**: data label.

* * *

### Writable Properties

<a name="prop-auto-render"></a>

#### Sparkline.prototype.autoRender

Rendering mode. If `true`, an instance renders on each `'change'` event; otherwise, rendering must be triggered manually.

```javascript
var sparkline = new Sparkline();

// Set:
sparkline.autoRender = false;

// Get:
var mode = sparkline.autoRender;
// returns false
```

<a name="prop-buffer-size"></a>

#### Sparkline.prototype.bufferSize

Data buffer size. If set, this specifies the maximum number of data elements which can be rendered. Once the data buffer is full, each new datum results in the oldest datum being removed.

```javascript
var sparkline = new Sparkline();

// Set:
sparkline.bufferSize = 3;

// Get:
var size = sparkline.bufferSize;
// returns 3

sparkline.data = [ 1, 2, 3 ];

var data = sparkline.data;
// returns [ 1, 2, 3 ]

sparkline.push( 4 );

data = sparkline.data;
// returns [ 2, 3, 4 ]
```

Setting a data buffer size is useful when rendering data streams.

<a name="prop-data"></a>

#### Sparkline.prototype.data

Sparkline data. When set, the value must be either `array`-like or an [ndarray][@stdlib/ndarray/ctor] and cannot exceed the `bufferSize`.

```javascript
var Float32Array = require( '@stdlib/array/float32' );

var sparkline = new Sparkline();

// Set:
sparkline.data = new Float32Array( [ 3.14, 5.0, -3.14, -1.0 ] );

// Get:
var data = sparkline.data;
// returns [ ~3.14, 5.0, ~-3.14, -1.0 ]
```

Note that data is **copied** to an internal data buffer.

<a name="prop-description"></a>

#### Sparkline.prototype.description

Sparkline description.

```javascript
var sparkline = new Sparkline();

// Set:
sparkline.description = 'Daily stock prices for the past 30 days.';

// Get:
var desc = sparkline.description;
// returns 'Daily stock prices for the past 30 days.'
```

<a name="prop-is-defined"></a>

#### Sparkline.prototype.isDefined( d, i )

An accessor `function` which defines whether a datum is defined. This accessor is used to define how missing values are encoded. When invoked, the function is provided two arguments:

-   **d**: datum.
-   **i**: datum index.

```javascript
function isDefined( d ) {
    return ( d !== null );
}

var sparkline = new Sparkline();

// Set:
sparkline.isDefined = isDefined;

// Get:
var fcn = sparkline.isDefined;
// returns <Function>
```

The default behavior is to ignore values which are `NaN`.

<a name="prop-label"></a>

#### Sparkline.prototype.label

Data label.

```javascript
var sparkline = new Sparkline();

// Set:
sparkline.label = 'beep';

// Get:
var label = sparkline.label;
// returns 'beep'
```

* * *

### Methods

<a name="method-push"></a>

#### Sparkline.prototype.push( datum )

Appends data to a sparkline.

```javascript
var sparkline = new Sparkline();

// Set:
sparkline.data = [ 1, 2, 3 ];

// Get:
var data = sparkline.data;
// returns [ 1, 2, 3 ]

sparkline.push( 4 );

data = sparkline.data;
// returns [ 1, 2, 3, 4 ]
```

<a name="method-render-private"></a>

#### Sparkline.prototype.\_render()

Private method for rendering a sparkline. This method **should be** implemented by `Sparkline` descendants.

<!-- eslint-disable no-underscore-dangle -->

```javascript
function render() {
    return '▁█▅▃▆▆▅';
}

var sparkline = new Sparkline();

sparkline._render = render;
```

<a name="method-render"></a>

#### Sparkline.prototype.render()

Public method for rendering a sparkline which internally invokes the private `_render()` method.

<!-- eslint-disable no-underscore-dangle -->

```javascript
function render() {
    return '▁█▅▃▆▆▅';
}

var sparkline = new Sparkline();

sparkline._render = render;

var str = sparkline.render();
// returns '▁█▅▃▆▆▅'
```

<a name="method-tostring"></a>

#### Sparkline.prototype.toString()

Serializes a sparkline as a `string` by calling the public `render()` method.

<!-- run-disable -->

<!-- eslint-disable no-underscore-dangle -->

```javascript
function render() {
    return '▁█▅▃▆▆▅';
}

var sparkline = new Sparkline();

sparkline._render = render;

var str = sparkline.toString();
// returns '▁█▅▃▆▆▅'
```

* * *

### Events

#### 'change'

Emitted whenever a property value changes.

```javascript
var sparkline = new Sparkline();

sparkline.on( 'change', onChange );

function onChange() {
    console.log( 'A property was updated.' );
}
```

#### 'render'

Emitted whenever a sparkline is rendered.

```javascript
var sparkline = new Sparkline();

sparkline.on( 'render', onRender );

function onRender( str ) {
    console.log( 'Rendered sparkline: %s', str );
}
```

</section>

<!-- /.usage -->

<section class="examples">

* * *

## Examples

<!-- eslint-disable no-restricted-syntax, no-underscore-dangle -->

<!-- eslint no-undef: "error" -->

```javascript
var inherit = require( '@stdlib/utils/inherit' );
var Sparkline = require( '@stdlib/plot/sparklines/base/ctor' );

// Define a chart constructor:
function Chart( opts ) {
    if ( opts === void 0 ) {
        opts = {};
    }
    // Call the parent constructor:
    Sparkline.call( this, opts );

    return this;
}

// Inherit from the Sparkline constructor:
inherit( Chart, Sparkline );

// Implement a custom render method:
Chart.prototype._render = function render() {
    var str;
    var i;

    str = '';
    for ( i = 0; i < this._data.length; i++ ) {
        if ( this._data[ i ] > 0 ) {
            str += '↑';
        } else {
            str += '↓';
        }
    }
    return str;
};

// Create a new chart instance:
var chart = new Chart();

// Set chart data:
chart.data = [ 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0 ];

// Render the chart:
console.log( chart.render() );
// => '↑↓↓↑↓↑↑↑↓↑↑↓↓'
```

</section>

<!-- /.examples -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/plot`][@stdlib/plot]</span><span class="delimiter">: </span><span class="description">plotting.</span>
-   <span class="package-name">[`@stdlib/plot/ctor`][@stdlib/plot/ctor]</span><span class="delimiter">: </span><span class="description">2-dimensional plot constructor.</span>
-   <span class="package-name">[`@stdlib/plot/sparklines/unicode/column`][@stdlib/plot/sparklines/unicode/column]</span><span class="delimiter">: </span><span class="description">create a Unicode sparkline column chart.</span>
-   <span class="package-name">[`@stdlib/plot/sparklines/unicode/line`][@stdlib/plot/sparklines/unicode/line]</span><span class="delimiter">: </span><span class="description">create a Unicode sparkline line chart.</span>
-   <span class="package-name">[`@stdlib/plot/sparklines/unicode/tristate`][@stdlib/plot/sparklines/unicode/tristate]</span><span class="delimiter">: </span><span class="description">create a Unicode sparkline tristate chart.</span>
-   <span class="package-name">[`@stdlib/plot/sparklines/unicode/win-loss`][@stdlib/plot/sparklines/unicode/win-loss]</span><span class="delimiter">: </span><span class="description">create a Unicode sparkline win/loss chart.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[@stdlib/ndarray/ctor]: https://github.com/stdlib-js/ndarray-ctor

<!-- <related-links> -->

[@stdlib/plot]: https://github.com/stdlib-js/plot/tree/main

[@stdlib/plot/ctor]: https://github.com/stdlib-js/plot/tree/main/ctor

[@stdlib/plot/sparklines/unicode/column]: https://github.com/stdlib-js/plot/tree/main/sparklines/unicode/column

[@stdlib/plot/sparklines/unicode/line]: https://github.com/stdlib-js/plot/tree/main/sparklines/unicode/line

[@stdlib/plot/sparklines/unicode/tristate]: https://github.com/stdlib-js/plot/tree/main/sparklines/unicode/tristate

[@stdlib/plot/sparklines/unicode/win-loss]: https://github.com/stdlib-js/plot/tree/main/sparklines/unicode/win-loss

<!-- </related-links> -->

</section>

<!-- /.links -->
