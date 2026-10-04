#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const DSH_ROOT_CANDIDATES = [
  process.env.DSH_DIR,
  '/usr/lib/deepseek-harness/resources/app/dsh',
  '/home/debian/.npm-global/lib/node_modules/@deepseek-ai/dsh',
].filter(Boolean)
const DSH_ROOT = DSH_ROOT_CANDIDATES.find((path) => existsSync(join(path, 'node_modules/@deepseek-ai/dsh-web-app/presets/standard.patch.yml')))
const STANDARD = DSH_ROOT && join(DSH_ROOT, 'node_modules/@deepseek-ai/dsh-web-app/presets/standard.patch.yml')
const fail = (message) => { console.error(`ERROR: ${message}`); process.exit(1) }
const read = (path) => readFileSync(path, 'utf8')

if (!STANDARD) fail(`找不到当前 DSH 的 standard.patch.yml；请设置 DSH_DIR。已检查:\n  ${DSH_ROOT_CANDIDATES.join('\n  ')}`)

const preset = JSON.parse(read(join(ROOT, 'preset.json')))
if (!/^[a-z0-9][a-z0-9-]*$/.test(preset.id)) fail(`非法预设 id: ${preset.id}`)
for (const key of ['name', 'description', 'order']) if (preset[key] === undefined) fail(`preset.json 缺少 ${key}`)

const persona = read(join(ROOT, 'persona.md')).replace(/\n+$/, '')
if (/\{\{/.test(persona)) fail('persona.md 中不能出现 {{...}}，它会被 DSH 当作模板变量')
for (const required of ['Evidence before action', "User's maintenance boundaries", 'Configuration ownership', 'User-executed handover']) {
  if (!persona.includes(required)) fail(`persona.md 缺少关键段落: ${required}`)
}

const lines = read(STANDARD).split('\n')
const pluginKey = lines.findIndex((line) => line === '        plugins:')
if (pluginKey < 0) fail(`${STANDARD} 中找不到 plugins 列表`)
let rowsEnd = pluginKey + 1
while (rowsEnd < lines.length && (lines[rowsEnd] === '' || /^ {10,}\S/.test(lines[rowsEnd]))) rowsEnd++
while (rowsEnd > pluginKey + 1 && lines[rowsEnd - 1] === '') rowsEnd--
const rows = lines.slice(pluginKey + 1, rowsEnd).map((line) => line.startsWith('          ') ? line.slice(10) : line)
const prefixIndex = rows.findIndex((line) => /^ {4}prefix: /.test(line))
if (prefixIndex < 0) fail('当前 standard persona 行中找不到 prefix')
rows.splice(prefixIndex, 1, '    prefix: |-', ...persona.split('\n').map((line) => line ? `      ${line}` : ''))

const packageNames = [...new Set(rows
  .map((line) => /^\s*name:\s*['"]?(@[^'"]+)['"]?\s*$/.exec(line)?.[1])
  .filter(Boolean))]
const missing = packageNames.filter((name) => {
  const [scope, rest] = name.split('/')
  return !existsSync(join(DSH_ROOT, 'node_modules', scope, rest.split('/')[0]))
})
if (missing.length) fail(`当前 standard 引用但安装目录中缺失的包:\n  ${missing.join('\n  ')}`)

const out = [
  '# BEGIN dsh-safe-maintenance-preset-v2 — generated; do not edit inside this block',
  '# Generated from the current desktop preset-standard. Only the persona prefix is replaced.',
  '- insert:',
  `    - id: preset-${preset.id}`,
  "      name: '@deepseek-ai/dsh-agent-preset'",
  '      config:',
  `        id: ${preset.id}`,
  `        name: ${JSON.stringify(preset.name)}`,
  `        description: ${JSON.stringify(preset.description)}`,
  `        order: ${preset.order}`,
  '        plugins:',
  ...rows.map((row) => row ? `          ${row}` : ''),
  '# END dsh-safe-maintenance-preset-v2',
]

mkdirSync(join(ROOT, 'dist'), { recursive: true })
writeFileSync(join(ROOT, 'dist', 'desktop-preset.patch.yml'), `${out.join('\n')}\n`)
console.log(`已从 ${STANDARD} 继承 standard 工具组合。`)
console.log(`已验证 ${packageNames.length} 个 @scope 插件引用。`)
console.log(`已生成 preset-${preset.id}，包含 ${rows.filter((line) => line.startsWith('- id: ')).length} 个顶层插件。`)
