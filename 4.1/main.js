import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString()
const jobPairs = input.split('\n').map(jobPair => jobPair.split(','))
console.log(jobPairs)

const r = _.sumBy(jobPairs, jobPair => {
  const jobA = jobPair[0].split('-').map(_.toInteger)
  const jobB = jobPair[1].split('-').map(_.toInteger)
  
  console.log(jobA, jobB)
  if(jobA[0] >= jobB[0] && jobA[1] <= jobB[1]) return 1 // jobA inside jobB
  if(jobB[0] >= jobA[0] && jobB[1] <= jobA[1]) return 1
  return 0
})

console.log(r)