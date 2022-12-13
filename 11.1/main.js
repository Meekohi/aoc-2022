import fs from 'fs'
import _ from 'lodash'

const monkeyStrings = fs.readFileSync('input.txt').toString().split("\n\n")
console.log(monkeyStrings)

const monkeys = _.map(monkeyStrings, monkeyString => {
  const [monkeyStr, startingItemsStr, operationStr, testStr, iftrueStr, iffalseStr]
    = monkeyString.split("\n")

  const monkeyId = parseInt(monkeyString.slice(7,-1),10)
  const startingItems = startingItemsStr.slice(18).split(", ").map(s => parseInt(s,10))
  const operation = operationStr.slice(19)
  const test = testStr.slice(8)
  const iftrue = parseInt(iftrueStr.slice(29),10)
  const iffalse = parseInt(iffalseStr.slice(30),10)

  const operationFn = (old) => {
    return eval(operation)
  }
  const testFn = (n) => {
    const d = parseInt(_.last(test.split(' ')))
    return n%d==0
  }

  return {
    monkeyId,
    items: startingItems,
    operation,
    operationFn,
    test,
    testFn,
    iftrue,
    iffalse,
    inspectCount: 0
  }
})

for(let round = 1; round <= 20; round++) {
  _.each(monkeys, monkey => {
    _.each(monkey.items, item => {
      monkey.inspectCount++
      const worryLevel = Math.floor(monkey.operationFn(item) / 3)
      if(monkey.testFn(worryLevel)) {
        monkeys[monkey.iftrue].items.push(worryLevel)
      } else {
        monkeys[monkey.iffalse].items.push(worryLevel)
      }
    })
    monkey.items = []
  })

  console.log(`End of Round ${round}`)
  _.each(monkeys,monkey => {
    console.log(`Monkey ${monkey.monkeyId}: ${monkey.items.join(", ")}`)
  })
}

const topTwo = _.sortBy(monkeys, m => -m.inspectCount)
console.log(topTwo)
console.log(topTwo[0].inspectCount * topTwo[1].inspectCount)