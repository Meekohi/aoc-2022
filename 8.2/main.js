import fs from 'fs'
import _ from 'lodash'

const puz = fs.readFileSync('input.txt').toString().split("\n").map(line => line.split('').map(d => parseInt(d,10)))
const N = puz.length

let bestScore = 0
for(let y = 0; y < N; y++) {
  for(let x = 0; x < N; x++) {

    let s=0,t=0,u=0,v=0;
    for(let i = 1; i < puz.length; i++) {
      if(y - i < 0) break
      s++
      if(puz[y-i][x] >= puz[y][x]) break
    }
    for(let i = 1; i < puz.length; i++) {
      if(y + i >= N) break
      t++
      if(puz[y+i][x] >= puz[y][x]) break
    }
    for(let i = 1; i < puz.length; i++) {
      if(x - i < 0) break
      u++
      if(puz[y][x-i] >= puz[y][x]) break
    }
    for(let i = 1; i < puz.length; i++) {
      if(x + i >= N) break
      v++
      if(puz[y][x+i] >= puz[y][x]) break
    }

    const scenicScore = s*t*u*v;
    if(scenicScore > bestScore) {
      bestScore = scenicScore
    }
  }
}

console.log(bestScore)