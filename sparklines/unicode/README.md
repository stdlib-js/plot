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

# Unicode Sparkline

> Create a Unicode sparkline.

<section class="usage">

## Usage

```javascript
var UnicodeSparkline = require( '@stdlib/plot/sparklines/unicode' );
```

#### UnicodeSparkline( \[data,] \[options] )

Returns a chart instance.

```javascript
var chart = new UnicodeSparkline();
```

The constructor accepts the following `options`:

-   **autoRender**: `boolean` indicating whether to re-render on a `change` event.
-   **bufferSize**: data buffer size. If provided, data is kept in a first-in first-out (FIFO) buffer which cannot exceed the buffer size. Default: `+infinity`.
-   **data**: chart data.
-   **description**: chart description.
-   **infinities**: `boolean` flag indicating whether to encode infinite values. Default: `false`.
-   **isDefined**: accessor `function` indicating whether a datum is defined.
-   **label**: data label.
-   **type**: chart type. Default: `'column'`.
-   **yMax**: maximum value of the y-axis domain. If set to `null`, the maximum value is computed from the data.
-   **yMin**: minimum value of the y-axis domain. If set to `null`, the minimum value is computed from the data.

* * *

### Writable Properties

<a name="prop-auto-render"></a>

#### UnicodeSparkline.prototype.autoRender

Rendering mode. If `true`, an instance renders on each `'change'` event; otherwise, rendering must be triggered manually.

```javascript
var chart = new UnicodeSparkline();

// Set:
chart.autoRender = false;

// Get:
var mode = chart.autoRender;
// returns false
```

<a name="prop-buffer-size"></a>

#### UnicodeSparkline.prototype.bufferSize

Data buffer size. If set, this specifies the maximum number of data elements which can be rendered. Once the data buffer is full, each new datum results in the oldest datum being removed.

```javascript
var chart = new UnicodeSparkline();

// Set:
chart.bufferSize = 3;

// Get:
var size = chart.bufferSize;
// returns 3

chart.data = [ 1, 2, 3 ];

var data = chart.data;
// returns [ 1, 2, 3 ]

chart.push( 4 );

data = chart.data;
// returns [ 2, 3, 4 ]
```

Setting a data buffer size is useful when rendering data streams.

<a name="prop-data"></a>

#### UnicodeSparkline.prototype.data

Chart data. When set, the value must be either `array`-like or an [ndarray][@stdlib/ndarray/ctor] and cannot exceed the `bufferSize`.

```javascript
var Float64Array = require( '@stdlib/array/float64' );

var chart = new UnicodeSparkline();

// Set:
chart.data = new Float64Array( [ 3.14, 5.0, -3.14, -1.0 ] );

// Get:
var data = chart.data;
// returns [ 3.14, 5.0, -3.14, -1.0 ]
```

Note that data is **copied** to an internal data buffer.

<a name="prop-description"></a>

#### UnicodeSparkline.prototype.description

Chart description.

```javascript
var chart = new UnicodeSparkline();

// Set:
chart.description = 'Daily stock prices for the past 30 days.';

// Get:
var desc = chart.description;
// returns 'Daily stock prices for the past 30 days.'
```

<a name="prop-infinities"></a>

#### UnicodeSparkline.prototype.infinities

`Boolean` flag indicating whether to render infinite values. For certain chart types, when set to `false`, infinite values are considered missing values. Otherwise, for those same chart types, both positive and negative infinity are encoded as `∞`.

```javascript
var chart = new UnicodeSparkline();

chart.infinities = true;

chart.data = [
    1.0,
    5.0,
    NaN,
    Infinity,
    4.0,
    -Infinity,
    3.0
];

var str = chart.render();
// returns '▁█ ∞▆∞▅'
```

<a name="prop-is-defined"></a>

#### UnicodeSparkline.prototype.isDefined( d, i )

An accessor `function` which defines whether a datum is defined. This accessor is used to define how missing values are encoded. When invoked, the function is provided two arguments:

-   **d**: datum.
-   **i**: datum index.

```javascript
function isDefined( d ) {
    return ( d !== null );
}

var chart = new UnicodeSparkline();

// Set:
chart.isDefined = isDefined;

// Get:
var fcn = chart.isDefined;
// returns <Function>
```

The default behavior is **dependent** on the chart type.

<a name="prop-label"></a>

#### UnicodeSparkline.prototype.label

Data label.

```javascript
var chart = new UnicodeSparkline();

// Set:
chart.label = 'beep';

// Get:
var label = chart.label;
// returns 'beep'
```

<a name="prop-type"></a>

#### UnicodeSparkline.prototype.type

Chart type.

```javascript
var chart = new UnicodeSparkline();

// Set:
chart.type = 'line';

// Get:
var type = chart.type;
// returns 'line'
```

The following chart types are supported:

-   [`'column'`][@stdlib/plot/sparklines/unicode/column]: column chart (e.g., `▃▆▂▄▁▅▅`).
-   [`'line'`][@stdlib/plot/sparklines/unicode/line]: line chart (e.g., `⡈⠑⠢⠔⠒⠒⠒`).
-   [`'tristate'`][@stdlib/plot/sparklines/unicode/tristate]: tristate chart (e.g., `▄▀──▀▄▄▀`).
-   [`'up-down'`][@stdlib/plot/sparklines/unicode/up-down]: up/down chart (e.g., `↓↑↑↑↑↓↓↑`).
-   [`'win-loss'`][@stdlib/plot/sparklines/unicode/win-loss]: win/loss chart (e.g., `┌╵└┴╵╷╷╵`).

<a name="prop-y-min"></a>

#### UnicodeSparkline.prototype.yMin

Minimum value of the y-axis domain. If this value is set to a value other than `null`, the y-axis lower bound is fixed; otherwise, the minimum value is computed from the chart data.

```javascript
var chart = new UnicodeSparkline( [ -1.0, 5.0, -3.0, 2.0, -4.0, 4.0, 3.0 ] );

chart.yMin = 0.0;

var str = chart.render();
// returns '▁█▁▄▁▇▅'
```

<a name="prop-y-max"></a>

#### UnicodeSparkline.prototype.yMax

Maximum value of the y-axis domain. If this value is set to a value other than `null`, the y-axis upper bound is fixed; otherwise, the maximum value is computed based on the chart data.

```javascript
var chart = new UnicodeSparkline( [ -1.0, 5.0, -3.0, 2.0, -4.0, 4.0, 3.0 ] );

chart.yMax = 10.0;

var str = chart.render();
// returns '▃▆▂▄▁▅▅'
```

* * *

### Methods

<a name="method-push"></a>

#### UnicodeSparkline.prototype.push( datum )

Appends data to a chart.

```javascript
var chart = new UnicodeSparkline( [ 1, 2, 3 ] );

var data = chart.data;
// returns [ 1, 2, 3 ]

chart.push( 4 );

data = chart.data;
// returns [ 1, 2, 3, 4 ]
```

<a name="method-render"></a>

#### UnicodeSparkline.prototype.render()

Renders a Unicode sparkline.

```javascript
var chart = new UnicodeSparkline( [ 1.0, 5.0, 3.0, 2.0, 4.0, 4.0, 3.0 ] );

var str = chart.render();
// returns '▁█▅▃▆▆▅'

// Render a line chart from the same data:
chart.type = 'line';

str = chart.render();
// returns '⡈⠑⠢⠔⠒⠒⠒'
```

<a name="method-tostring"></a>

#### UnicodeSparkline.prototype.toString()

Serializes a Unicode sparkline as a `string` by calling the `render()` method.

```javascript
var chart = new UnicodeSparkline( [ 1.0, 5.0, 3.0, 2.0, 4.0, 4.0, 3.0 ] );

var str = chart.toString();
// returns '▁█▅▃▆▆▅'
```

* * *

### Events

#### 'change'

Emitted whenever a property value changes.

```javascript
var chart = new UnicodeSparkline();

chart.on( 'change', onChange );

function onChange() {
    console.log( 'A property was updated.' );
}
```

#### 'render'

Emitted whenever a sparkline is rendered.

```javascript
var chart = new UnicodeSparkline();

chart.on( 'render', onRender );

function onRender( str ) {
    console.log( 'Rendered sparkline: %s', str );
}
```

</section>

<!-- /.usage -->

<section class="notes">

</section>

<!-- /.notes -->

<section class="examples">

* * *

## Examples

<!-- eslint-disable stdlib/no-redeclare -->

<!-- eslint no-undef: "error" -->

```javascript
var stdout = require( '@stdlib/streams/node/stdout' );
var randu = require( '@stdlib/random/base/randu' );
var Float64Array = require( '@stdlib/array/float64' );
var sparkline = require( '@stdlib/plot/sparklines/unicode' );

var chart;
var data;
var id;
var i;

// Generate some random data...
data = new Float64Array( 50 );
for ( i = 0; i < data.length; i++ ) {
    data[ i ] = randu() * 100.0;
}

// Create a sparkline chart:
chart = sparkline( data );

// Hide the terminal cursor:
stdout.write( '\u001b[?25l' );

// Render the chart in the terminal:
stdout.write( chart.render() );

// Configure the chart to support streaming data:
chart.bufferSize = data.length;
chart.yMin = 0.0;
chart.yMax = 100.0;

// Update the terminal chart with new data every second:
id = setInterval( update, 1000 );

// After some time, stop updating and close:
setTimeout( stop, 20000 );

function update() {
    // Update the chart with new data:
    chart.push( randu()*100.0 );

    // Clear the terminal line and render the chart:
    stdout.write( '\r\u001b[2K' + chart.render() );
}

function stop() { // eslint-disable-line stdlib/no-redeclare
    clearInterval( id );

    // Restore the terminal cursor:
    stdout.write( '\u001b[?25h' );

    stdout.write( '\n' );
}
```

</section>

<!-- /.examples -->

* * *

<section class="cli">

## CLI

<section class="usage">

### Usage

```text
Usage: sparkline [options] <number> <number> ...

Options:

  -h, --help             Print this message.
  -V, --version          Print the package version.
      --split sep        Separator used to split stdin data. Default: /\\r?\\n/.
      --type type        Chart type. Default: column.
      --ymin min         Minimum value of y-axis domain.
      --ymax max         Maximum value of y-axis domain.
      --infinities       Encode infinite values.
```

</section>

<!-- /.usage -->

<section class="notes">

### Notes

-   If the split separator is a [regular expression][mdn-regexp], ensure that the `split` option is properly **escaped**.

    ```bash
    # Not escaped...
    $ echo -n $'1\n2\n3\n' | sparkline --split /\r?\n/

    # Escaped...
    $ echo -n $'1\n2\n3\n' | sparkline --split /\\r?\\n/
    ```

</section>

<!-- /.notes -->

<section class="examples">

### Examples

```bash
$ sparkline 1 2 3 4 5 6
▁▂▄▅▇█
```

```bash
$ echo -n $'1\n2\n3\n4\n5\n6\n' | sparkline --ymax 3
▁▅████
```

</section>

<!-- /.examples -->

</section>

<!-- /.cli -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/plot`][@stdlib/plot]</span><span class="delimiter">: </span><span class="description">plotting.</span>
-   <span class="package-name">[`@stdlib/plot/ctor`][@stdlib/plot/ctor]</span><span class="delimiter">: </span><span class="description">2-dimensional plot constructor.</span>
-   <span class="package-name">[`@stdlib/plot/sparklines/unicode/column`][@stdlib/plot/sparklines/unicode/column]</span><span class="delimiter">: </span><span class="description">create a Unicode sparkline column chart.</span>
-   <span class="package-name">[`@stdlib/plot/sparklines/unicode/line`][@stdlib/plot/sparklines/unicode/line]</span><span class="delimiter">: </span><span class="description">create a Unicode sparkline line chart.</span>
-   <span class="package-name">[`@stdlib/plot/sparklines/unicode/tristate`][@stdlib/plot/sparklines/unicode/tristate]</span><span class="delimiter">: </span><span class="description">create a Unicode sparkline tristate chart.</span>
-   <span class="package-name">[`@stdlib/plot/sparklines/unicode/up-down`][@stdlib/plot/sparklines/unicode/up-down]</span><span class="delimiter">: </span><span class="description">create a Unicode sparkline up/down chart.</span>
-   <span class="package-name">[`@stdlib/plot/sparklines/unicode/win-loss`][@stdlib/plot/sparklines/unicode/win-loss]</span><span class="delimiter">: </span><span class="description">create a Unicode sparkline win/loss chart.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[mdn-regexp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

[@stdlib/ndarray/ctor]: https://github.com/stdlib-js/ndarray-ctor

<!-- <related-links> -->

[@stdlib/plot]: https://github.com/stdlib-js/plot/tree/main

[@stdlib/plot/ctor]: https://github.com/stdlib-js/plot/tree/main/ctor

[@stdlib/plot/sparklines/unicode/column]: https://github.com/stdlib-js/plot/tree/main/sparklines/unicode/column

[@stdlib/plot/sparklines/unicode/line]: https://github.com/stdlib-js/plot/tree/main/sparklines/unicode/line

[@stdlib/plot/sparklines/unicode/tristate]: https://github.com/stdlib-js/plot/tree/main/sparklines/unicode/tristate

[@stdlib/plot/sparklines/unicode/up-down]: https://github.com/stdlib-js/plot/tree/main/sparklines/unicode/up-down

[@stdlib/plot/sparklines/unicode/win-loss]: https://github.com/stdlib-js/plot/tree/main/sparklines/unicode/win-loss

<!-- </related-links> -->

</section>

<!-- /.links -->
