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
Note that the numbers are of the sequence will not be generated until the moment they are used.

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

## Docs

### range(start, end, step)


