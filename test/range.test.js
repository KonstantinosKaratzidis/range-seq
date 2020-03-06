const expect = require("chai").expect
const range = require("..")

suite("range", function(){
	suite("constructor", function(){
		test("Fail when given step = 0", function(){
			expect(() => range(10, 100, 0)).to.throw()
		})

		const var_args_tests = [
			{
				name: "Correct with one arg",
				args: [10],
				expected: {start: 0, end: 10, step: 1},
			},
			{
				name: "Correct with two args",
				args: [5, 10],
				expected: {start: 5, end: 10, step: 1},
			},
			{
				name: "Correct with three args",
				args: [0, 20, 5],
				expected: {start: 0, end: 20, step: 5},
			}
		]

		var_args_tests.forEach(({name, args, expected}) => {
			test(name, function(){
				expect(range.apply(range, args)).to.include(expected)
			})
		})
	})

	suite("iteration and toArray", function(){
		test("be an iterator", function(){
			expect(range(10)).to.have.property(Symbol.iterator)
		})

		suite("#toArray", function(){
			test("returns an array", function(){
				const arr = range(10).toArray()
				expect(Array.isArray(arr)).to.be.true
			})

			test("to be empty when initial value out of range", function(){
				expect(range(2, 1, 1).toArray).to.have.lengthOf(0)
			})

			test("correct length with step 1", function(){
				expect(range(10).toArray()).to.have.lengthOf(10)
			})

			test("correct length with step 1 and start != 0", function(){
				expect(range(8, 9).toArray()).to.have.lengthOf(1)
			})

			test("correct length with step -1", function(){
				expect(range(5, -5, -1).toArray()).to.have.lengthOf(10)
			})
		})
	})

	suite("container methods", function(){
		let arr, r;
		setup(function(){
			arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
			r = range(10)
		})

		test("reduce", function(){
			const reduce = (x) => x.reduce((acc, val) => acc + val, 0)
			expect(reduce(r)).to.be.equal(reduce(arr))
		})

		test("map", function(){
			const map = (x) => x.map(i => i % 2 == 0)
			expect(map(r).toArray()).to.be.deep.equal(map(arr))
		})

		test("filter", function(){
			const filter = (x) => x.filter(i => i % 2 == 0)
			expect(filter(r).toArray()).to.be.deep.equal(filter(arr))
		})

		test("every", function(){
			expect(range(0, 10, 2).every(x => x % 2 == 0)).to.be.true
		})

		test("some", function(){
			const some = (x) => x.some(i => i == 8)
			expect(some(r)).to.be.true
		})

		test("reverse 1", function(){
			const range1 = range(10, 20, 3)
			const range2 = range1.reverse()
			expect(range2.toArray()).to.be.deep.equal(range1.toArray().reverse())
		})

		test("reverse 2", function(){
			const range1 = range(50, 10, -5)
			const range2 = range1.reverse()
			expect(range2.toArray()).to.be.deep.equal(range1.toArray().reverse())
		})

		test("reduceRight", function(){
			const str1 = range(10).reduce((acc, val) => acc + val, "")
			const str2 = range(10).reduceRight((acc, val) => acc + val, "")

			let str2_reversed = ""
			for(let i = str2.length - 1; i >= 0; i--)
				str2_reversed += str2.charAt(i)

			expect(str1).to.be.equal(str2_reversed)
		})

		test("count", function(){
			expect(range(10, 20, 2).count(x => x % 2 == 0)).to.be.equal(5)
		})
	})
})
