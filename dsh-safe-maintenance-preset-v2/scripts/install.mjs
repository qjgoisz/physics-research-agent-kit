#!/usr/bin/env node
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'
import { spawnSync } from 'node:child_process'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const PROFILE = process.env.DSH_PROFILE || 'desktop'
const DSH_HOME = process.env.DSH_HOME || join(homedir(), '.dsh')
const TARGET = join(DSH_HOME, 'profiles', PROFILE, 'cordis.patch.yml')
const GENERATED = join(ROOT, 'dist', 'desktop-preset.patch.yml')
const BEGIN = '# BEGIN dsh-safe-maintenance-preset-v2'
const END = '# END dsh-safe-maintenance-preset-v2'
const uninstall = process.argv.includes('--uninstall')
const fail = (message) => { console.error(`ERROR: ${message}`); process.exit(1) }

if (!existsSync(TARGET)) fail(`找不到 ${TARGET}；请确认 desktop profile 已初始化。`)
if (!uninstall) {
  const result = spawnSync(process.execPath, [join(ROOT, 'scripts', 'regenerate.mjs')], { stdio: 'inherit', env: process.env })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

const original = readFileSync(TARGET, 'utf8')
const begin = original.indexOf(BEGIN)
const end = original.indexOf(END)
if ((begin >= 0) !== (end >= 0) || (begin >= 0 && end < begin)) fail('目标补丁中的受管理标记不完整；请人工检查，安装器未写入。')

let base = original
if (begin >= 0) {
  const after = end + END.length
  base = `${original.slice(0, begin).replace(/\n+$/, '')}\n${original.slice(after).replace(/^\n+/, '')}`
}
base = base.replace(/\n+$/, '')
const next = uninstall
  ? `${base}\n`
  : `${base}\n\n${readFileSync(GENERATED, 'utf8').replace(/^\n+|\n+$/g, '')}\n`

if (next === original) {
  console.log(uninstall ? '预设未安装，无需卸载。' : '预设补丁已经是最新版本。')
  process.exit(0)
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').replace('Z', '')
const backup = `${TARGET}.safe-maintenance-v2.${stamp}.bak`
copyFileSync(TARGET, backup)
writeFileSync(TARGET, next)
console.log(`已备份: ${backup}`)
console.log(uninstall ? `已从 ${TARGET} 删除受管理预设块。` : `已把受管理预设块写入 ${TARGET}。`)
console.log('请完全退出并重新启动 DeepSeek Harness Desktop；已有会话不会改变预设。')
