import fs from 'fs'
import _ from 'lodash'
import { exit } from 'process'

const input = fs.readFileSync('input.txt').toString()

const allDifferent = s => {
  for(let i = 0; i < 14; i++) {
    for(let j = i+1; j < 14; j++) {
      if(s[i] == s[j]) return false;
    }
  }
  
  return true
}

_.each(input.split(''), (_c, idx, arr) => {
  if(allDifferent(arr.slice(idx))) {
    console.log("Done.", idx+14);
    exit();
  }
})