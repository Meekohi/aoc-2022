import fs from 'fs'
import _ from 'lodash'
import { exit } from 'process'

const input = fs.readFileSync('input.txt').toString()

const allDifferent = s => {
  if(s[0] == s[1]) return false
  if(s[0] == s[2]) return false
  if(s[0] == s[3]) return false
  if(s[1] == s[2]) return false
  if(s[1] == s[3]) return false
  if(s[2] == s[3]) return false
  return true
}

_.each(input.split(''), (_c, idx, arr) => {
  if(allDifferent(arr.slice(idx))) {
    console.log("Done.", idx+4);
    exit();
  }
})