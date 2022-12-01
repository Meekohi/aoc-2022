import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString()
const elves = input.split('\n\n').map(elfString => elfString.split('\n').map(cal => parseInt(cal)))
const totals = elves.map(_.sum)
console.log(_.max(totals))