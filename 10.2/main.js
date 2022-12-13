import fs from 'fs'
import _ from 'lodash'

const instructions = fs.readFileSync('input.txt').toString().split("\n")

let t = 0
let register = 1
let row = []
function p(){
  const crtPosition = (t-1)%40

  if(crtPosition < register+2 && crtPosition > register-2) {
    row.push('#')
  } else {
    row.push('.')
  }

  if(t % 40 == 0) {
    console.log(row.join(''))
    row = []
  }
}

_.each(instructions, instruction => {
  if(instruction == 'noop') {
    t++; p();
    return
  }

  const [cmd,xStr] = instruction.split(" ")
  const x = parseInt(xStr,10)
  t++; p();
  t++; p();
  register += x
})