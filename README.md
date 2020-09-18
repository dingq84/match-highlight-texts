[![Build Status](https://travis-ci.org/dingq84/match-highlight-texts.svg?branch=master)](https://travis-ci.org/dingq84/match-highlight-texts)
[![MIT License](https://img.shields.io/npm/l/match-sorter.svg?style=flat-square)](https://github.com/kentcdodds/match-sorter/blob/master/other/LICENSE)
[![codecov](https://codecov.io/gh/dingq84/match-highlight-texts/branch/master/graph/badge.svg)](https://codecov.io/gh/dingq84/match-highlight-texts)
![npm](https://img.shields.io/npm/v/match-highlight-texts)
<div>
<h1>match-highlight-texts</h1>
<p>No matter what JavaScript-based framework you use, you can always use this package to highlight words entered by the user.</p>
</div>

## Installation

```
  npm install --save match-highlight-texts
```

## Usage

```javascript
import { matcher } from "match-highlight-texts";

const list = "Hello world, this is match-highlight-texts";
const query = "world light";
matcher(list, query);
/*
  [
    { item: "Hello ", highlight: false }, 
    { item: "world", highlight: true }, 
    { item: ", this is match-high", highlight: false }, 
    { item: "light", highlight: true },
    { item: "-texts", highlight: false }
  ]
*/
```

## Advanced options

### delimiter: `[string]`

It splits the query string by one space

_Default: ' '_

```javascript
const list = "Hello world, this is match-highlight-texts";
const query = "world;light";
matcher(list, query, { delimiter: ";" });
/*
  [
    { item: "Hello ", highlight: false }, 
    { item: "world", highlight: true }, 
    { item: ", this is match-high", highlight: false }, 
    { item: "light", highlight: true },
    { item: "-texts", highlight: false }
  ]
*/
```

### caseSensitive: `[boolean]`

_Default: false_

```javascript
const list = "Hello world, hello match-highlight-texts";
const query = "hello";
matcher(list, query, { caseSensitive: true });
/*
  [
    { item: "Hello world,  ", highlight: false }, 
    { item: "hello", highlight: true }, 
    { item: " match-highlight-texts", highlight: false }
  ]
*/
```

## LICENSE

MIT
