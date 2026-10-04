#!/usr/bin/env node
import { existsSync, readFileSync, copyFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'
const root = dirname(dirname(fileURLToPath(import.meta.url)))
const id = JSON.parse(readFileSync(join(root, 'package.json'))).name
const profile = process.env.DSH_PROFILE || 'desktop'
if (!/^[a-zA-Z0-9_-]+$/.test(profile)) throw new Error('非法 profile')
const target = join(process.env.DSH_HOME || join(homedir(), '.dsh'), 'profiles', profile, 'cordis.patch.yml')
if (!existsSync(target)) { console.log('无需迁移。'); process.exit(0) }
const original = readFileSync(target, 'utf8')
const lines = original.split(/(?<=\n)/)
const begin = '# BEGIN ' + id
const end = '# END ' + id
const starts = lines.flatMap((line, i) => line.trimEnd() === begin || line.startsWith(begin + ' —') ? [i] : [])
const ends = lines.flatMap((line, i) => line.trimEnd() === end ? [i] : [])
if (!starts.length && !ends.length) { console.log('无需迁移。'); process.exit(0) }
if (starts.length !== 1 || ends.length !== 1 || starts[0] >= ends[0]) throw new Error('标记异常，未修改；请人工检查。')
const backup = target + '.' + id + '.' + Date.now() + '.bak'
copyFileSync(target, backup)
writeFileSync(target, lines.slice(0, starts[0]).concat(lines.slice(ends[0] + 1)).join(''))
console.log('仅删除本预设旧区块；备份：' + backup)
