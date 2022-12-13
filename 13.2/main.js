import fs from 'fs'
import _ from 'lodash'

const input = _.map(_.flatten(_.map(fs.readFileSync('input.txt').toString().split("\n\n").map(pair => pair.split("\n")))),JSON.parse);
console.log(input)
input.push([[2]])
input.push([[6]])

function compare(a,b) {
  // console.log(a,b)
  if(_.isNumber(a) && _.isNumber(b)) {
    if(a < b) return -1
    if(a > b) return 1
    return 0
  }
  if(_.isArray(a) && _.isArray(b)) {
    let result = 0
    for(let i = 0; i <= Math.min(a.length,b.length);i++) {
      if(a.length == i && b.length == i) return 0
      if(a.length == i) return -1
      if(b.length == i) return 1
      result = compare(a[i],b[i])
      if(result != 0) return result
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

input.sort(compare)
console.log(_.map(input,JSON.stringify))

const open = _.indexOf(_.map(input,JSON.stringify),'[[2]]') + 1
const close = _.indexOf(_.map(input,JSON.stringify),'[[6]]') + 1

console.log(open*close)