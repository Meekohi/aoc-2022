import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString()
const [stacksString, ordersString] = input.split("\n\n")

const stacksStrings = stacksString.split('\n').slice(0,-1).map(s => _.chunk(s,4).map(chars => chars[1]))
const stacks = _.map(_.unzip(stacksStrings), stack => _.without(stack,' '))

console.log(stacks)

const orders = _.map(ordersString.split('\n'), order => {
  const a = order.split(' ')
  return {
    n: a[1],
    from: a[3],
    to: a[5]
  }
})

console.log(orders)

_.each(orders, order => {
  const moving = _.take(stacks[order.from-1], order.n)
  stacks[order.from-1] = stacks[order.from-1].slice(order.n)
  stacks[order.to-1] = [...moving, ...stacks[order.to-1]] // only change from 5.1
})

console.log(_.map(stacks,stack => stack[0]))