import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString()
const packs = input.split('\n').map(round => round.split(''))

const groups = _.chunk(packs, 3)
console.log(groups)

const badges = _.map(groups, group => _.intersection(...group))
console.log(badges)

const prio = c => {
  const ascii = c.charCodeAt(0)
  if(ascii >= 97) return ascii -96
  else return ascii - 64 + 26
}

console.log(_.sumBy(badges, ([badge]) => prio(badge)))