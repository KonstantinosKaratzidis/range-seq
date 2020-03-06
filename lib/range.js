// test if n is in the range specified
function test(n, start, end, step){
	return (n !== end) && (step > 0 ? start < end : start > end)
}

// implementation
// func is used to implement methods such as map or filter
//  func should return {skip: boolean, value: some_value}
//  using skip, one can filter out values
class _Range{
	constructor(start, end, step, func){
		this.start = start
		this.end = end
		this.step = step
		// check if a func arg was passed, otherwise set a default
		this._func = !!func ? func : (n) => ({skip: false, value: n})
	}

	[Symbol.iterator](){
		let index = this.start
		return {
			next: () => {

				while(test(index, this.start, this.end, this.step)){
					const func_res = this._func(index)
					index += this.step
					//if(func_res.skip)
					//continue

					//return {done: false, value: func_res.value}
					if(!func_res.skip)
						return {done: false, value: func_res.value}
				}
				return {done: true}
			}
		}
	}

	// return this with is _fucn wrapped, used to implement the
	// rest of the sequence methods
	_wrap(func){
		const prev_func = this._func
		const new_func = (n) => {
			const prev_ret = prev_func(n)
			if(prev_ret.skip)
				return prev_ret
			else
				return func(prev_ret.value)
		}
		return new _Range(this.start, this.end, new_func)
	}

	filter(callback){
		return this._wrap((n) => ({value: n, skip: !callback(n)}))
	}

	map(callback){
		return this._wrap((n) => ({value: callback(n), skip: false}))
	}

	forEach(callback){
		for(const i of this)
			callback(i)
		return this
	}

	reduce(reducer, initial_value = 0){
		let acc = initial_value;
		for(const i of this)
			acc = reducer(acc, i)
		return acc
	}

	reduceRight(reducer, initial_value = 0){
		return new _Range(this.end, this.start, this._func).reduce(reducer, initial_value)
	}

	every(callback){
		return this.reduce((acc, val) => acc && (!!callback(val)), true)
	}

	// could also implement as reduce using OR and an initial_value of false
	// but if an element is found which satisfies the condition, there is no need to continue
	some(callback){
		for(const i of this)
			if(callback(i))
				return true
		return false
	}

	toArray(){
		return Array.from(this)
	}

}

/**
 * Can be called in three different ways
 *	range(end) => range(0, end, 1)
 *	range(start, end) => range(start, end, 1)
 *	range(start, end, step)
 *
 *	Note: if you want a decreasing range, you need to specify all three arguments
 *	Note: the end value is not included in the range
 */
function range(start, end, step){
	if(arguments.length == 1){
		end = start
		step = 1
		start = 0
	} else if(arguments.length == 2){
		step = 1
	} else if(arguments.length == 3 && step === 0){
		throw Error("a range step cannot be zero")
	}

	return new _Range(start, end, step, null)
}

module.exports = range
