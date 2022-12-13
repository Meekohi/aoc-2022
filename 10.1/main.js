import fs from 'fs'
import _ from 'lodash'

const instructions = fs.readFileSync('input.txt').toString().split("\n")

let t = 0
let register = 1
let totalSum = 0
function p(){
  if(t == 20 || t == 60 || t == 100 || t == 140 || t == 180 || t == 220) {
    console.log(t, register, t * register)
    totalSum += t * register
  }
}

_.each(instructions, instruction => {
  if(instruction == 'noop') {
    t++; p();
    return
  }

  const [cmd,xStr] = instruction.split(" ")
  const x = parseInt(xStr,10)
  console.log(" - ",cmd,x)
  t++; p();
  t++; p();
  register += x
})

console.log(totalSum)