import fs from 'fs'
import _ from 'lodash'

const puz = _.map(fs.readFileSync('input.txt').toString().split("\n"),row => row.split(''))

const startY = _.findIndex(puz, row => _.findIndex(row, c => c == 'S') >= 0)
const startX = _.findIndex(puz[startY], c => c == 'S')

const endY = _.findIndex(puz, row => _.findIndex(row, c => c == 'E') >= 0)
const endX = _.findIndex(puz[endY], c => c == 'E')

const scores = _.map(puz, row => Array(row.length).fill(Infinity))
let prio = [
  {
    x: startX,
    y: startY,
    steps: 0
  }
]

function v(c) {
  return c.charCodeAt(0)
}
function walkable(from,to) {
  if(from == 'S') from = 'a'
  if(to == 'E') to = 'z'
  return v(to) <= v(from)+1
}
function xCheck(x) {
  return x >= 0 && x < puz[0].length
}
function yCheck(y) {
  return y >= 0 && y < puz.length
}

function d(grid){
  console.log(
    _.map(grid, row => _.map(row, v => v == Infinity ? 'x' : '.').join('')).join("\n")
  )
}

let t = 0
while(prio.length > 0) {
  t++
  const {x,y,steps} = prio.pop()

  if(x < 0 || y < 0) throw("Bounds")
  if(y >= puz.length) throw("Bounds")
  if(x >= puz[y].length) throw("Bounds")

  if(scores[y][x] <= steps) continue // already a faster way to get here.
  
  scores[y][x] = steps

  if( xCheck(x-1) && walkable(puz[y][x],puz[y][x-1]) ) {
    prio.push({x:x-1,y,steps:steps+1})
  }
  if( xCheck(x+1) && walkable(puz[y][x],puz[y][x+1]) ) {
    prio.push({x:x+1,y,steps:steps+1})
  }
  if( yCheck(y-1) && walkable(puz[y][x],puz[y-1][x]) ) {
    prio.push({x,y:y-1,steps:steps+1})
  }
  if( yCheck(y+1) && walkable(puz[y][x],puz[y+1][x]) ) {
    prio.push({x,y:y+1,steps:steps+1})
  }

  prio = _.sortBy(prio, p => -p.steps)
}

d(scores)
console.log("Final:",scores[endY][endX])