# range-seq

A sequence like range generator object that supports functional style processing.

# Installation

```
npm install range-seq

```

## Dependencies

If you don't want to run the tests, no external dependencies are required.
To run the tests you will need mocha and chai.

## Running the tests

If you make any changes run the tests by

```
npm run test
```

# Usage

## Overview

The purpose of the module is to create a sequence of numbers in some given range. The range can be then further processed by using funcions map, filter etc.

## Examples

```javascript
// import the module
const rangeSeq = require("range-seq")

// create a range
const range = rangeSeq(10)

range.forEach(console.log) // will print numbers 0 through 9 to the console

range.map(x => x * 2).filter(x => x > 10).toArray() // will return the array [12, 14, 16, 18]

range.count(x => x % 3 == 0) // will return the number 4

// You can also use the iterator protocol
for(const day of range.map(x =>	`Day ${x}`)){
	console.log(day)
}
```
### Note

The numbers are of the sequence will not be generated until the moment they are used. This means that the membesr of the sequence are not computed
until either toArray() is called or the range is iterated over.
(Implementation note: when the range objects needs to give a new element, it calls an internal transformation function to transform , or skip and return some subsequent value. This way when calling for example map, no values are computed, rather the range's internal function get wrapped.)

### methods

#### range(start, end, step)

Will return a range object, with its range specified as [start, end[ (the end value is not included).
The range values start from	`start` and are each time incremented by the value of step, until they reach or surpass the value of end.
The step can be both a positive or negative number, but not zero (there is no point in a range sequence that will generate the same number to infinity).

There are three different ways to create a range:

```
range(limit)            // same as range(0, limit, 1)
range(start, end)       // same as range(start, end, 1)
range(start, end, step)
```

Note: If you want a range with a negative step, it is necessary to specify all three arguments.

#### container functions

The following functions behave just like they would for arrays

* ```range.forEach(callback)```
* ```range.filter(condition_func)```
* ```range.map(callback)```
* ```range.reduce(callback[, initial_value])```
* ```range.reduceRight(callback[, initial_value])```
* ```range.reverse()```
* ```range.every(condition_func)```
* ```range.some(condition_func)```
* ```range.count(condition_func)```
Note that you can chain any of the methods, except for those that return a single value e.g. every or reduce

#### range.toArray()

Returns the elements of a range as an array

