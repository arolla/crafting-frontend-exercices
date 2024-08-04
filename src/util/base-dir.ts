import { relative, resolve } from 'node:path'

const relativeBaseDir = '../..'
const thisScriptDir = __dirname
const currentDir = process.cwd()
const absoluteBaseDir = resolve(thisScriptDir, relativeBaseDir)

export const baseDir = relative(currentDir, absoluteBaseDir)
