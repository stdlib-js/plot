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

# Win/Loss Chart

> Create a Unicode sparkline win/loss chart.

<section class="usage">

## Usage

```javascript
var WinLossChart = require( '@stdlib/plot/sparklines/unicode/win-loss' );
```

#### WinLossChart( \[data,] \[options] )

Returns a chart instance.

```javascript
var chart = new WinLossChart();
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

#### WinLossChart.prototype.autoRender

Rendering mode. If `true`, an instance renders on each `'change'` event; otherwise, rendering must be triggered manually.

```javascript
var chart = new WinLossChart();

// Set:
chart.autoRender = false;

// Get:
var mode = chart.autoRender;
// returns false
```

<a name="prop-buffer-size"></a>

#### WinLossChart.prototype.bufferSize

Data buffer size. If set, this specifies the maximum number of data elements which can be rendered. Once the data buffer is full, each new datum results in the oldest datum being removed.

```javascript
var chart = new WinLossChart();

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

#### WinLossChart.prototype.data

Chart data. When set, the value must be either `array`-like or an [ndarray][@stdlib/ndarray/ctor] and cannot exceed the `bufferSize`.

```javascript
var Int8Array = require( '@stdlib/array/int8' );

var chart = new WinLossChart();

// Set:
chart.data = new Int8Array( [ -2, 1, 2, 2, 1, -1, -1, 1 ] );

// Get:
var data = chart.data;
// returns [ -2, 1, 2, 2, 1, -1, -1, 1 ]
```

Note that data is **copied** to an internal data buffer.

<a name="prop-description"></a>

#### WinLossChart.prototype.description

Chart description.

```javascript
var chart = new WinLossChart();

// Set:
chart.description = 'Wins and losses for the past 30 days.';

// Get:
var desc = chart.description;
// returns 'Wins and losses for the past 30 days.'
```

<a name="prop-is-defined"></a>

#### WinLossChart.prototype.isDefined( d, i )

An accessor `function` which defines whether a datum is defined. This accessor is used to define how missing values are encoded. When invoked, the function is provided two arguments:

-   **d**: datum.
-   **i**: datum index.

```javascript
function isDefined( d ) {
    // Ignore home losses:
    return ( d !== -2 );
}

var chart = new WinLossChart();

// Set:
chart.isDefined = isDefined;

// Get:
var fcn = chart.isDefined;
// returns <Function>
```

The default behavior is to ignore any values which are not `1`, `-1`, `2`, or `-2`.

<a name="prop-label"></a>

#### WinLossChart.prototype.label

Data label.

```javascript
var chart = new WinLossChart();

// Set:
chart.label = 'beep';

// Get:
var label = chart.label;
// returns 'beep'
```

* * *

### Methods

<a name="method-push"></a>

#### WinLossChart.prototype.push( datum )

Appends data to a chart.

```javascript
var chart = new WinLossChart( [ 1, 2, 3 ] );

var data = chart.data;
// returns [ 1, 2, 3 ]

chart.push( 4 );

data = chart.data;
// returns [ 1, 2, 3, 4 ]
```

<a name="method-render"></a>

#### WinLossChart.prototype.render()

Renders a win/loss chart sparkline.

```javascript
var chart = new WinLossChart( [ -2, 1, 2, 2, 1, -1, -1, 1, -2, -2 ] );

var str = chart.render();
// returns '┌╵└┴╵╷╷╵┌┬'
```

Glyphs:

| Value | Glyph |
| :---: | :---: |
|   1   |   ╵   |
|   -1  |   ╷   |
|   2   |   └   |
|   -2  |   ┌   |

If a `2` or `-2` is preceded by a `2` or `-2`,

| Value | Glyph |
| :---: | :---: |
|   2   |   ┴   |
|   -2  |   ┬   |

Based on the win/loss analogy,

-   `1`: win away
-   `-1`: loss away
-   `2`: win at home
-   `-2`: loss at home

If provided any value other than `1`, `-1`, `2`, or `-2`, the value is encoded as a missing value.

<a name="method-tostring"></a>

#### WinLossChart.prototype.toString()

Serializes a win/loss chart sparkline as a `string` by calling the `render()` method.

```javascript
var chart = new WinLossChart( [ -2, 1, 2, 2, 1, -1, -1, 1, -2, -2 ] );

var str = chart.toString();
// returns '┌╵└┴╵╷╷╵┌┬'
```

* * *

### Events

#### 'change'

Emitted whenever a property value changes.

```javascript
var chart = new WinLossChart();

chart.on( 'change', onChange );

function onChange() {
    console.log( 'A property was updated.' );
}
```

#### 'render'

Emitted whenever a sparkline is rendered.

```javascript
var chart = new WinLossChart();

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
var winlossChart = require( '@stdlib/plot/sparklines/unicode/win-loss' );

var chart;
var data;
var id;
var i;

// Based on GS Warriors winning percentages for 2015-2016...
function datum() {
    var d = randu();
    if ( d > 0.5 ) {       // home
        d = randu();
        if ( d < 0.057 ) { // loss
            d = -2;
        } else {           // win
            d = 2;
        }
    } else {               // away
        d = randu();
        if ( d < 0.229 ) { // loss
            d = -1;
        } else {           // win
            d = 1;
        }
    }
    return d;
}

// Generate some random data...
data = new Int8Array( 50 );
for ( i = 0; i < data.length; i++ ) {
    data[ i ] = datum();
}

// Create a new win/loss chart:
chart = winlossChart( data );

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
Usage: sparkline-winloss [options] <number> <number> ...

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
    $ echo -n $'1\n2\n3\n' | sparkline-winloss --split /\r?\n/

    # Escaped...
    $ echo -n $'1\n2\n3\n' | sparkline-winloss --split /\\r?\\n/
    ```

</section>

<!-- /.notes -->

<section class="examples">

### Examples

```bash
$ sparkline-winloss -- -2 1 2 2 1 -1 -1 1 -2 -2
┌╵└┴╵╷╷╵┌┬
```

```bash
$ echo -n $'-2\n1\n2\n2\n1\n-1\n-1\n1\n-2\n-2\n' | sparkline-winloss
┌╵└┴╵╷╷╵┌┬
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
-   <span class="package-name">[`@stdlib/plot/sparklines/unicode/up-down`][@stdlib/plot/sparklines/unicode/up-down]</span><span class="delimiter">: </span><span class="description">create a Unicode sparkline up/down chart.</span>

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

[@stdlib/plot/sparklines/unicode/up-down]: https://github.com/stdlib-js/plot/tree/main/sparklines/unicode/up-down

<!-- </related-links> -->

</section>

<!-- /.links -->
