import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString().split("\n")
const moves = input.map(line => {
  const [dir,n] = line.split(" ")
  return {dir, n: parseInt(n)}
})

console.log(moves)

const visited = {}

const h = {x:0, y:0}
const t = {x:0, y:0}

_.each(moves, move => {
  _.each(_.range(move.n), idx => {
    if(move.dir == 'R') h.x++
    if(move.dir == 'L') h.x--
    if(move.dir == 'U') h.y++
    if(move.dir == 'D') h.y--

    if(Math.abs(h.x-t.x) < 2 && Math.abs(h.y-t.y) < 2) {}
    else if(t.x == h.x || t.y == h.y) {
      if(t.x < h.x-1) t.x++
      if(t.x > h.x+1) t.x--
      if(t.y < h.y-1) t.y++
      if(t.y > h.y+1) t.y--
    } else {
      if(t.x < h.x) t.x++
      if(t.x > h.x) t.x--
      if(t.y < h.y) t.y++
      if(t.y > h.y) t.y--
    }


    visited[`${t.x},${t.y}`] = true
  })
})

console.log(_.keys(visited).length)