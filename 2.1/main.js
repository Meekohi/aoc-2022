import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString()
const rounds = input.split('\n').map(round => round.split(' '))

console.log(rounds)

const winner = (a,b) => {
  if(a == 'A') {
    if(b == 'X') return 3
    if(b == 'Y') return 6
    if(b == 'Z') return 0
  }
  if(a == 'B') {
    if(b == 'X') return 0
    if(b == 'Y') return 3
    if(b == 'Z') return 6  
  }
  if(a == 'C') {
    if(b == 'X') return 6
    if(b == 'Y') return 0
    if(b == 'Z') return 3
  }
  
  throw Error("no.")
}

const played = b => {
  return b == 'X' ? 1 :
         b == 'Y' ? 2 : 3
}


const total = _.sumBy(rounds, ([a,b]) => {
  return winner(a,b) + played(b)
});

console.log(total)