#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const PROFILE = process.env.DSH_PROFILE || 'desktop'
const DSH_HOME = process.env.DSH_HOME || join(homedir(), '.dsh')
const files = [
  join(DSH_HOME, 'profiles', PROFILE, 'cordis.patch.yml'),
  join(ROOT, 'dist', 'desktop-preset.patch.yml'),
]
let failed = false
for (const file of files) {
  if (!existsSync(file)) { console.error(`MISSING ${file}`); failed = true; continue }
  const text = readFileSync(file, 'utf8')
  const count = [...text.matchAll(/^\s*- id: preset-safe-maintenance\s*$/gm)].length
  console.log(`${file}\n  preset-safe-maintenance: ${count}`)
  if (count !== 1) failed = true
}
if (existsSync(files[0])) {
  const text = readFileSync(files[0], 'utf8')
  const begins = text.split('# BEGIN dsh-safe-maintenance-preset-v2').length - 1
  const ends = text.split('# END dsh-safe-maintenance-preset-v2').length - 1
  console.log(`managed markers: begin=${begins}, end=${ends}`)
  if (begins !== 1 || ends !== 1) failed = true
}
process.exit(failed ? 1 : 0)
