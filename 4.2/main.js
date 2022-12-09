import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString()
const jobPairs = input.split('\n').map(jobPair => jobPair.split(','))
console.log(jobPairs)

const r = _.sumBy(jobPairs, jobPair => {
  const jobA = jobPair[0].split('-').map(_.toInteger)
  const jobB = jobPair[1].split('-').map(_.toInteger)
  
  const intersection = _.intersection(_.range(jobA[0], jobA[1]+1),_.range(jobB[0], jobB[1]+1))
  return intersection.length > 0 ? 1 : 0
})

console.log(r)