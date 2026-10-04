#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const PROFILE = process.env.DSH_PROFILE || 'desktop'
const DSH_HOME = process.env.DSH_HOME || join(homedir(), '.dsh')
const patch = join(DSH_HOME, 'profiles', PROFILE, 'cordis.patch.yml')
const generated = join(ROOT, 'dist', 'desktop-preset.patch.yml')
const expected = ['research', 'research-explore', 'research-numerics', 'research-writing']

let failed = false
for (const file of [patch, generated]) {
  if (!existsSync(file)) { console.error(`MISSING ${file}`); failed = true; continue }
  const text = readFileSync(file, 'utf8')
  console.log(file)
  for (const id of expected) {
    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const count = [...text.matchAll(new RegExp(`^\\s*- id: preset-${escaped}\\s*$`, 'gm'))].length
    console.log(`  preset-${id}: ${count}`)
    const wanted = file === patch ? 1 : 1
    if (count !== wanted) failed = true
  }
}
if (existsSync(patch)) {
  const text = readFileSync(patch, 'utf8')
  const begins = text.split('# BEGIN dsh-research-preset-v2').length - 1
  const ends = text.split('# END dsh-research-preset-v2').length - 1
  console.log(`managed markers: begin=${begins}, end=${ends}`)
  if (begins !== 1 || ends !== 1) failed = true
}
process.exit(failed ? 1 : 0)
