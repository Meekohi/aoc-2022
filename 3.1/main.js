import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString()
const packs = input.split('\n').map(round => round.split(''))
const comps = _.map(packs, pack => [pack.slice(0,pack.length/2), pack.slice(pack.length/2)])

const overlaps = _.map(comps, ([l,r]) => _.intersection(l,r)[0])
console.log(overlaps)

const prio = _.map(overlaps, c => {
  const ascii = c.charCodeAt(0)
  if(ascii >= 97) return ascii -96
  else return ascii - 64 + 26
})

console.log(prio)
console.log(_.sum(prio))
