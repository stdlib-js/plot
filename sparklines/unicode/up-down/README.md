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

# Up/Down Chart

> Create a Unicode sparkline up/down chart.

<section class="usage">

## Usage

```javascript
var UpDownChart = require( '@stdlib/plot/sparklines/unicode/up-down' );
```

#### UpDownChart( \[data,] \[options] )

Returns a chart instance.

```javascript
var chart = new UpDownChart();
```

The constructor accepts the following `options`:

-   **autoRender**: `boolean` indicating whether to re-render on a `change` event.
-   **bufferSize**: data buffer size. If provided, data is kept in a first-in first-out (FIFO) buffer which cannot exceed the buffer size. Default: `+infinity`.
-   **data**: chart data.
-   **description**: chart description.
-   **isDefined**: accessor `function` indicating whether a datum is defined.
-   **label**: data label.

* * *

### Writable Properties

<a name="prop-auto-render"></a>

#### UpDownChart.prototype.autoRender

Rendering mode. If `true`, an instance renders on each `'change'` event; otherwise, rendering must be triggered manually.

```javascript
var chart = new UpDownChart();

// Set:
chart.autoRender = false;

// Get:
var mode = chart.autoRender;
// returns false
```

<a name="prop-buffer-size"></a>

#### UpDownChart.prototype.bufferSize

Data buffer size. If set, this specifies the maximum number of data elements which can be rendered. Once the data buffer is full, each new datum results in the oldest datum being removed.

```javascript
var chart = new UpDownChart();

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

#### UpDownChart.prototype.data

Chart data. When set, the value must be either `array`-like or an [ndarray][@stdlib/ndarray/ctor] and cannot exceed the `bufferSize`.

```javascript
var Int8Array = require( '@stdlib/array/int8' );

var chart = new UpDownChart();

// Set:
chart.data = new Int8Array( [ -1, 1, 1, 1, 1, -1, -1, 1 ] );

// Get:
var data = chart.data;
// returns [ -1, 1, 1, 1, 1, -1, -1, 1 ]
```

Note that data is **copied** to an internal data buffer.

<a name="prop-description"></a>

#### UpDownChart.prototype.description

Chart description.

```javascript
var chart = new UpDownChart();

// Set:
chart.description = 'Wins and losses for the past 30 days.';

// Get:
var desc = chart.description;
// returns 'Wins and losses for the past 30 days.'
```

<a name="prop-is-defined"></a>

#### UpDownChart.prototype.isDefined( d, i )

An accessor `function` which defines whether a datum is defined. This accessor is used to define how missing values are encoded. When invoked, the function is provided two arguments:

-   **d**: datum.
-   **i**: datum index.

```javascript
function isDefined( d ) {
    // Only consider "wins" as defined:
    return ( d === 1 );
}

var chart = new UpDownChart();

// Set:
chart.isDefined = isDefined;

// Get:
var fcn = chart.isDefined;
// returns <Function>
```

The default behavior is to ignore any values which are not `1` or `-1`.

<a name="prop-label"></a>

#### UpDownChart.prototype.label

Data label.

```javascript
var chart = new UpDownChart();

// Set:
chart.label = 'beep';

// Get:
var label = chart.label;
// returns 'beep'
```

* * *

### Methods

<a name="method-push"></a>

#### UpDownChart.prototype.push( datum )

Appends data to a chart.

```javascript
var chart = new UpDownChart( [ 1, 2, 3 ] );

var data = chart.data;
// returns [ 1, 2, 3 ]

chart.push( 4 );

data = chart.data;
// returns [ 1, 2, 3, 4 ]
```

<a name="method-render"></a>

#### UpDownChart.prototype.render()

Renders an up/down chart sparkline.

```javascript
var chart = new UpDownChart( [ -1, 1, 1, 1, 1, -1, -1, 1 ] );

var str = chart.render();
// returns '↓↑↑↑↑↓↓↑'
```

Glyphs:

| Value | Glyph |
| :---: | :---: |
|   1   |   ↑   |
|   -1  |   ↓   |

If provided any other value other than `1` or `-1`, the value is encoded as a missing value.

<a name="method-tostring"></a>

#### UpDownChart.prototype.toString()

Serializes an up/down chart sparkline as a `string` by calling the `render()` method.

```javascript
var chart = new UpDownChart( [ -1, 1, 1, 1, 1, -1, -1, 1 ] );

var str = chart.toString();
// returns '↓↑↑↑↑↓↓↑'
```

* * *

### Events

#### 'change'

Emitted whenever a property value changes.

```javascript
var chart = new UpDownChart();

chart.on( 'change', onChange );

function onChange() {
    console.log( 'A property was updated.' );
}
```

#### 'render'

Emitted whenever a sparkline is rendered.

```javascript
var chart = new UpDownChart();

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
var randu = require( '@stdlib/random/base/randu' );
var Int8Array = require( '@stdlib/array/int8' );
var stdout = require( '@stdlib/streams/node/stdout' );
var updownChart = require( '@stdlib/plot/sparklines/unicode/up-down' );

var chart;
var data;
var id;
var i;

function datum() {
    var d = randu();
    if ( d > 0.75 ) {
        d = 1;
    } else {
        d = -1;
    }
    return d;
}

// Generate some random data...
data = new Int8Array( 50 );
for ( i = 0; i < data.length; i++ ) {
    data[ i ] = datum();
}

// Create a new up/down chart:
chart = updownChart( data );

// Hide the terminal cursor:
stdout.write( '\u001b[?25l' );

// Render the chart in the terminal:
stdout.write( chart.render() );

// Configure the chart to support streaming data:
chart.bufferSize = data.length;

// Update the terminal chart with new data every second:
id = setInterval( update, 1000 );

// After some time, stop updating and close:
setTimeout( stop, 20000 );

function update() {
    // Update the chart with new data:
    chart.push( datum() );

    // Clear the terminal line and render the chart:
    stdout.write( '\r\u001b[2K' + chart.render() );
}

function stop() {
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
Usage: sparkline-updown [options] <number> <number> ...

Options:

  -h, --help             Print this message.
  -V, --version          Print the package version.
      --split sep        Separator used to split stdin data. Default: /\\r?\\n/.
```

</section>

<!-- /.usage -->

<section class="notes">

### Notes

-   If the split separator is a [regular expression][mdn-regexp], ensure that the `split` option is properly **escaped**.

    ```bash
    # Not escaped...
    $ echo -n $'1\n2\n3\n' | sparkline-updown --split /\r?\n/

    # Escaped...
    $ echo -n $'1\n2\n3\n' | sparkline-updown --split /\\r?\\n/
    ```

</section>

<!-- /.notes -->

<section class="examples">

### Examples

```bash
$ sparkline-updown -- -1 1 1 1 1 -1 -1 1
↓↑↑↑↑↓↓↑
```

```bash
$ echo -n $'-1\n1\n1\n1\n1\n-1\n-1\n1\n' | sparkline-updown
↓↑↑↑↑↓↓↑
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
-   <span class="package-name">[`@stdlib/plot/sparklines/unicode`][@stdlib/plot/sparklines/unicode]</span><span class="delimiter">: </span><span class="description">create a Unicode sparkline.</span>
-   <span class="package-name">[`@stdlib/plot/sparklines/unicode/column`][@stdlib/plot/sparklines/unicode/column]</span><span class="delimiter">: </span><span class="description">create a Unicode sparkline column chart.</span>
-   <span class="package-name">[`@stdlib/plot/sparklines/unicode/line`][@stdlib/plot/sparklines/unicode/line]</span><span class="delimiter">: </span><span class="description">create a Unicode sparkline line chart.</span>
-   <span class="package-name">[`@stdlib/plot/sparklines/unicode/tristate`][@stdlib/plot/sparklines/unicode/tristate]</span><span class="delimiter">: </span><span class="description">create a Unicode sparkline tristate chart.</span>
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

[@stdlib/plot/sparklines/unicode]: https://github.com/stdlib-js/plot/tree/main/sparklines/unicode

[@stdlib/plot/sparklines/unicode/column]: https://github.com/stdlib-js/plot/tree/main/sparklines/unicode/column

[@stdlib/plot/sparklines/unicode/line]: https://github.com/stdlib-js/plot/tree/main/sparklines/unicode/line

[@stdlib/plot/sparklines/unicode/tristate]: https://github.com/stdlib-js/plot/tree/main/sparklines/unicode/tristate

[@stdlib/plot/sparklines/unicode/win-loss]: https://github.com/stdlib-js/plot/tree/main/sparklines/unicode/win-loss

<!-- </related-links> -->

</section>

<!-- /.links -->
