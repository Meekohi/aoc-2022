import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString()
const rounds = input.split('\n').map(round => round.split(' '))

const winner = (a,b) => {
  if(a == 'A') {
    if(b == 'X') return 0 + played('sci') // lose
    if(b == 'Y') return 3 + played('rock') // tie
    if(b == 'Z') return 6 + played('paper') // win
  }
  if(a == 'B') {
    if(b == 'X') return 0 + played('rock') // lose
    if(b == 'Y') return 3 + played('paper') // tie
    if(b == 'Z') return 6 + played('sci') // win 
  }
  if(a == 'C') {
    if(b == 'X') return 0 + played('paper') // lose
    if(b == 'Y') return 3 + played('sci') // tie
    if(b == 'Z') return 6 + played('rock') // win
  }
  
  throw Error("no.")
}

const played = b => {
  return b == 'rock' ? 1 :
         b == 'paper' ? 2 : 3
}


const total = _.sumBy(rounds, ([a,b]) => winner(a,b));

console.log(total)