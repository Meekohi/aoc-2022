import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString().split("\n")
const moves = input.map(line => {
  const [dir,n] = line.split(" ")
  return {dir, n: parseInt(n)}
})

console.log(moves)

const visited = {}

const knots = [
  {x:0, y:0},
  {x:0, y:0},
  {x:0, y:0},
  {x:0, y:0},
  {x:0, y:0},
  {x:0, y:0},
  {x:0, y:0},
  {x:0, y:0},
  {x:0, y:0},
  {x:0, y:0}
]


_.each(moves, move => {
  _.each(_.range(move.n), idx => {
    if(move.dir == 'R') knots[0].x++
    if(move.dir == 'L') knots[0].x--
    if(move.dir == 'U') knots[0].y++
    if(move.dir == 'D') knots[0].y--

    for(let i = 0; i < knots.length - 1; i++) {
      const h = knots[i]
      const t = knots[i+1]
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
    }

    visited[`${knots[9].x},${knots[9].y}`] = true
  })
})

console.log(_.keys(visited).length)