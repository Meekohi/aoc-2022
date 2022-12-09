import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString().split("\n")
const lines = input.slice(1)

const root = {
  name: '/',
  parent : null,
  dirs : [],
  size: 0
}
let cd = root;

function parseLine(line) {
  if(line[0] == '$') parseCmd(line)
  else if(line[0] == 'd') parseDir(line)
  else parseFile(line)
}

function parseCmd(line) {
  const [prompt, cmd, arg] = line.split(" ")
  if(cmd == 'cd') {
    if(arg == '..') {
      cd = cd.parent
    } else {
      cd = _.find(cd.dirs, dir => dir.name == arg)
      if(cd == null) throw "Fuck"
    }
  }
}

function parseDir(line) {
  const [cmd, n] = line.split(' ')
  cd.dirs.push({
    name: n,
    parent: cd,
    dirs: [],
    size: 0
  })
}

function parseFile(line) {
  const [size, filename] = line.split(' ')
  console.log(size)
  cd.size += parseInt(size)
}

_.each(lines, parseLine)

function totalSize(dir) {
  return dir.size + _.sumBy(dir.dirs, totalSize);
}

function debug(d) {
  const t = totalSize(d)
  if(t <= 100000) {
    bigT += t
    console.log(d.name, t)
  }
  _.each(d.dirs, debug)
}

let bigT = 0;
debug(root)
console.log(bigT)

