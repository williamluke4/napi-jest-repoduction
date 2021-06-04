#!/usr/bin/env ts-node

import fs from 'fs'
import path from 'path'

import resolveFrom from 'resolve-from'

const unpatch = 'globalObject.process = (0, _createProcessObject.default)();'
const patch = '  globalObject.process = process'
const type = process.argv[2]
const jestPath = require.resolve('jest')
const jestCliPath = resolveFrom(jestPath, 'jest-cli')
const jestUtilPath = resolveFrom(jestCliPath, 'jest-util')
const patchFilePath = path.resolve(path.dirname(jestUtilPath), 'installCommonGlobals.js')
const lines = fs.readFileSync(patchFilePath, 'utf-8').split('\n')
if (type === 'unpatch') {
  console.log('Removing Jest Patch')
  lines[78] = unpatch
} else {
  console.log('Patching Jest')
  lines[78] = patch
}

const result = lines.join('\n')
fs.writeFileSync(patchFilePath, result)
