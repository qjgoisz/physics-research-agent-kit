#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const PROFILE = process.env.DSH_PROFILE || 'desktop'
const DSH_HOME = process.env.DSH_HOME || join(homedir(), '.dsh')
const PROFILE_ROOT = join(DSH_HOME, 'profiles', PROFILE)
const DSH_ROOT_CANDIDATES = [
  process.env.DSH_DIR,
  '/usr/lib/deepseek-harness/resources/app/dsh',
  '/home/debian/.npm-global/lib/node_modules/@deepseek-ai/dsh',
].filter(Boolean)
const DSH_ROOT = DSH_ROOT_CANDIDATES.find((path) => existsSync(join(path, 'node_modules/@deepseek-ai/dsh-web-app/presets/standard.patch.yml')))
const STANDARD = DSH_ROOT && join(DSH_ROOT, 'node_modules/@deepseek-ai/dsh-web-app/presets/standard.patch.yml')
const PHASE_MARK = '<<PHASE_SECTION>>'

const read = (path) => readFileSync(path, 'utf8')
const fail = (message) => { console.error(`ERROR: ${message}`); process.exit(1) }

if (!STANDARD) fail(`找不到当前 DSH 的 standard.patch.yml；请设置 DSH_DIR。已检查:\n  ${DSH_ROOT_CANDIDATES.join('\n  ')}`)

const presets = JSON.parse(read(join(ROOT, 'presets.json')))
const base = read(join(ROOT, 'persona', 'base.md')).replace(/\n+$/, '')
if (!base.includes(PHASE_MARK)) fail(`persona/base.md 缺少 ${PHASE_MARK}`)

const ids = new Set()
for (const preset of presets) {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(preset.id)) fail(`非法预设 id: ${preset.id}`)
  if (ids.has(preset.id)) fail(`重复预设 id: ${preset.id}`)
  ids.add(preset.id)
  if (!preset.phase || !existsSync(join(ROOT, 'persona', preset.phase))) fail(`缺少阶段文件: ${preset.phase}`)
}

// 从当前桌面安装包的 standard 预设继承插件组合，避免复制旧版本工具行。
const lines = read(STANDARD).split('\n')
const pluginKey = lines.findIndex((line) => line === '        plugins:')
if (pluginKey < 0) fail(`${STANDARD} 中找不到 plugins 列表`)
let rowsEnd = pluginKey + 1
while (rowsEnd < lines.length && (lines[rowsEnd] === '' || /^ {10,}\S/.test(lines[rowsEnd]))) rowsEnd++
while (rowsEnd > pluginKey + 1 && lines[rowsEnd - 1] === '') rowsEnd--
const standardRows = lines.slice(pluginKey + 1, rowsEnd)
  .map((line) => line.startsWith('          ') ? line.slice(10) : line)

const prefixIndex = standardRows.findIndex((line) => /^ {4}prefix: /.test(line))
if (prefixIndex < 0) fail('当前 standard persona 行中找不到 prefix')

const packageNames = [...new Set(standardRows
  .map((line) => /^\s*name:\s*['"]?(@[^'"]+)['"]?\s*$/.exec(line)?.[1])
  .filter(Boolean))]
const missing = packageNames.filter((name) => {
  const [scope, rest] = name.split('/')
  const pkg = rest.split('/')[0]
  return !existsSync(join(DSH_ROOT, 'node_modules', scope, pkg))
})
if (missing.length) fail(`当前 standard 引用但 profile 中缺失的包:\n  ${missing.join('\n  ')}`)

const out = [
  '# BEGIN dsh-research-preset-v2 — generated; do not edit inside this block',
  '# Generated from the current desktop profile preset-standard. Only the persona prefix is replaced.',
  '- insert:',
]

for (const preset of presets) {
  const phase = read(join(ROOT, 'persona', preset.phase)).replace(/\n+$/, '')
  const persona = base.replace(PHASE_MARK, phase)
  if (persona.includes(PHASE_MARK)) fail(`${preset.id}: 阶段占位符未完全替换`)
  if (/\{\{/.test(persona)) fail(`${preset.id}: persona 中不能出现 {{...}}，它会被 DSH 当作模板变量`)

  const rows = [...standardRows]
  rows.splice(prefixIndex, 1, '    prefix: |-', ...persona.split('\n').map((line) => line ? `      ${line}` : ''))
  out.push(
    `    - id: preset-${preset.id}`,
    "      name: '@deepseek-ai/dsh-agent-preset'",
    '      config:',
    `        id: ${preset.id}`,
    `        name: ${JSON.stringify(preset.name)}`,
    `        description: ${JSON.stringify(preset.description)}`,
    `        order: ${preset.order}`,
    '        plugins:',
  )
  for (const row of rows) out.push(row ? `          ${row}` : '')
}

out.push('# END dsh-research-preset-v2')
const bundle = join(ROOT, 'dist', 'bundle')
mkdirSync(bundle, { recursive: true })
writeFileSync(join(bundle, 'cordis.patch.yml'), `${out.join('\n')}\n`)
const version = JSON.parse(read(join(DSH_ROOT, 'node_modules/@deepseek-ai/dsh/package.json'))).version
writeFileSync(join(bundle, 'package.json'), JSON.stringify({
  name: '@local/dsh-research-preset-v2', version: '1.0.0', private: true,
  description: 'Locally generated DSH preset bundle',
  peerDependencies: { '@deepseek-ai/dsh': version },
  dsh: { engines: { dsh: version }, bundle: { patch: './cordis.patch.yml' } },
}, null, 2) + '\n')
console.log(`已生成 dist/bundle；继承 ${STANDARD}，适配 DSH ${version}。`)
