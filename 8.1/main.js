import fs from 'fs'
import _ from 'lodash'

const puz = fs.readFileSync('input.txt').toString().split("\n").map(line => line.split('').map(d => parseInt(d,10)))
const N = puz.length

console.log(puz)
console.log("!!!")
const L = puz.map(row => row.map(t => t))
const R = puz.map(row => row.map(t => t))
const U = puz.map(row => row.map(t => t))
const D = puz.map(row => row.map(t => t))

for(let t = 1; t < puz.length - 1; t++) {
  for(let s = 1; s < puz.length - 1; s++) {
    // console.log(s,t,' -> ', L[s][t], L[s][t-1], '=' , Math.max(L[s][t], L[s][t-1]))
    // console.log(L)
    L[s][t] = Math.max(L[s][t], L[s][t-1])
    U[s][t] = Math.max(U[s][t], U[s-1][t])
    const m = N-s-1
    const n = N-t-1
    R[m][n] = Math.max(R[m][n], R[m][n+1])
    D[m][n] = Math.max(D[m][n], D[m+1][n])
  }
}

let viz = 0
for(let t = 0; t < puz.length; t++) {
  for(let s = 0; s < puz.length; s++) {
    if(s == 0 || t == 0) { viz++; continue }
    if(s == puz.length - 1) { viz++; continue }
    if(t == puz.length - 1) { viz++; continue }

    if(t == 1 && s == 1) {
      console.log(L,R,U,D)
      console.log(`[${s},${t}] = ${puz[s][t]}`)
      console.log(`L ${L[s][t]}`)
      console.log(`R ${R[s][t]}`)
      console.log(`U ${U[s][t]}`)
      console.log(`D ${D[s][t]}`)
    }
    if(Math.min(L[s][t-1],R[s][t+1],U[s-1][t],D[s+1][t]) < puz[s][t]) {
      viz++
    }
  }
}

console.log(viz)