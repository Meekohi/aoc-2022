import fs from 'fs'
import _ from 'lodash'

const input = _.map(fs.readFileSync('input.txt').toString().split("\n\n").map(pair => pair.split("\n").map(JSON.parse)));
console.log(input)

function compare(a,b) {
  // console.log(a,b)
  if(_.isNumber(a) && _.isNumber(b)) {
    if(a < b) return true
    if(a > b) return false
    return null
  }
  if(_.isArray(a) && _.isArray(b)) {
    let result = null
    while(result == null){
      if(a.length == 0 && b.length == 0) return null
      if(a.length == 0) return true
      if(b.length == 0) return false
      result = compare(a.shift(),b.shift())
    }
    return result
  }
  if(_.isArray(a)) {
    return compare(a,[b])
  }
  if(_.isArray(b)){
    return compare([a],b)
  }
}

let total = 0
_.each(input, (pair,idx) => {
  const r = compare(pair[0],pair[1])
  if(r) total += (idx+1)
  console.log(idx, r)
})
console.log(total)
