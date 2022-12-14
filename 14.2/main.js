import fs from 'fs'
import _ from 'lodash'

const input = _.map(fs.readFileSync('input.txt').toString().split("\n"))
const lines = _.map(input, row => _.map(row.split(" -> "),pair => _.map(pair.split(','), n => parseInt(n,10))))
// console.log(lines)

const space = _.map(Array(600), y => Array(1000).fill(true))
_.each(lines, line => {
  for(let i = 1; i < line.length; i++) {
    const a = line[i-1]
    const b = line[i]
    for(let x = Math.min(a[0],b[0]); x <= Math.max(a[0],b[0]); x++) {
      for(let y = Math.min(a[1],b[1]); y <= Math.max(a[1],b[1]); y++) {
        //stops.push([x,y])
        space[y][x] = false;
      }
    }
  }
})

const minX = _.minBy(_.flatten(lines), ([x,y]) => x)[0]
const maxX = _.maxBy(_.flatten(lines), ([x,y]) => x)[0]
const minY = _.minBy(_.flatten(lines), ([x,y]) => y)[1]
let maxY = _.maxBy(_.flatten(lines), ([x,y]) => y)[1]

space[maxY+2].fill(false)
maxY = maxY+2

console.log([minX,maxX],[minY,maxY])

function d(){
  console.log(`- ${sandDrops} -`)
  console.log(
    _.map(space.slice(0,10+2), row => {
      return _.map(row.slice(485,520), b => b ? '.' : '#').join('')
    }).join("\n")
  )
}

let sandDrops = 0
let stopSimulation = false;
while(!stopSimulation) {
  const sand = {
    x: 500,
    y: 0
  }
  
  while(!stopSimulation) {
    if(sand.y > maxY) {
      stopSimulation = true // fell off the bottom
      break
    }
    if(space[sand.y][sand.x] == false) {
      stopSimulation = true; // filled up!
      break
    }
    else if(space[sand.y+1][sand.x] == true) {
      sand.y++;
    }
    else if(space[sand.y+1][sand.x-1] == true) {
      sand.y++;
      sand.x--;
    }
    else if(space[sand.y+1][sand.x+1] == true){
      sand.y++;
      sand.x++;
    } else {
      space[sand.y][sand.x] = false
      sandDrops++
      //d()
      break
    }
  }
}

console.log(sandDrops)