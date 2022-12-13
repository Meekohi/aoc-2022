import fs from 'fs'
import _ from 'lodash'

const monkeyStrings = fs.readFileSync('input.txt').toString().split("\n\n")
console.log(monkeyStrings)

const monkeys = _.map(monkeyStrings, monkeyString => {
  const [monkeyStr, startingItemsStr, operationStr, testStr, iftrueStr, iffalseStr]
    = monkeyString.split("\n")

  const monkeyId = parseInt(monkeyString.slice(7,-1),10)
  const startingItems = startingItemsStr.slice(18).split(", ").map(n => parseInt(n,10))
  const operation = operationStr.slice(19)
  const divisor = parseInt(testStr.slice(21))
  const iftrue = parseInt(iftrueStr.slice(29),10)
  const iffalse = parseInt(iffalseStr.slice(30),10)

  const operationFn = (old) => {
    return eval(operation)
  }

  return {
    monkeyId,
    items: startingItems,
    operation,
    operationFn,
    divisor,
    iftrue,
    iffalse,
    inspectCount: 0
  }
})

// Now we need to build something to keep track of divisibility of each item for ALL divisors...
_.each(monkeys, monkey => {
  // Update items with their "set of divisors" equivalent
  monkey.items = _.map(monkey.items, item => {
    return _.map(monkeys, otherMonkey => { // does include "this monkey" too just to be clear
      return {
        // k*d+n = whatever
        divisor: otherMonkey.divisor,
        n: item % otherMonkey.divisor
      }
    })
  })
})

for(let round = 1; round <= 10000; round++) {
  _.each(monkeys, monkey => {
    _.each(monkey.items, item => {
      // Inspect
      monkey.inspectCount++

      // Apply the operation
      _.each(item, dInfo => {
        dInfo.n = monkey.operationFn(dInfo.n) % dInfo.divisor
      })

      // Check your own test...
      const myDivisor = _.find(item, dInfo => dInfo.divisor == monkey.divisor)

      if(myDivisor.n == 0) { // you're divisble by this monkey's test!
        monkeys[monkey.iftrue].items.push(item)
      } else {
        monkeys[monkey.iffalse].items.push(item)
      }
    })
    monkey.items = []
  })

  console.log(`End of Round ${round}`)
  _.each(monkeys,monkey => {
    //console.log(`Monkey ${monkey.monkeyId}: ${monkey.items.join(", ")}`)
  })
}

const topTwo = _.sortBy(monkeys, m => -m.inspectCount)
console.log(topTwo)
console.log(topTwo[0].inspectCount * topTwo[1].inspectCount)