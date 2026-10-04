#!/usr/bin/env node
import { existsSync, readFileSync, mkdirSync, copyFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'
import { spawnSync } from 'node:child_process'
import { desktopCliInvocation } from './desktop-cli.mjs'
const root = dirname(dirname(fileURLToPath(import.meta.url)))
const id = JSON.parse(readFileSync(join(root, 'package.json'))).name
const home = process.env.DSH_HOME || join(homedir(), '.dsh')
const profile = process.env.DSH_PROFILE || 'desktop'
if (!/^[a-zA-Z0-9_-]+$/.test(profile)) throw new Error('非法 profile')
const patch = join(home, 'profiles', profile, 'cordis.patch.yml')
if (existsSync(patch) && readFileSync(patch, 'utf8').includes('# BEGIN ' + id)) throw new Error('发现旧补丁；先执行 node scripts/migrate-legacy.mjs。')
if (!existsSync(join(home, 'profiles', profile, 'package.json'))) throw new Error('请启动桌面版初始化 profile，再完全退出。')
const run = (cmd, args, env = process.env) => {
  const result = spawnSync(cmd, args, { stdio: 'inherit', env })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}
const uninstall = process.argv.includes('--uninstall')
const dest = join(home, 'local-bundles', id)
if (!uninstall) {
  run(process.execPath, [join(root, 'scripts', 'regenerate.mjs')])
  mkdirSync(dest, { recursive: true })
  for (const file of ['package.json', 'cordis.patch.yml']) copyFileSync(join(root, 'dist/bundle', file), join(dest, file))
}
const args = ['plugin', '--profile', profile, uninstall ? 'remove' : 'add', uninstall ? '@local/' + id : dest]
if (process.env.DSH_CLI) run(process.env.DSH_CLI, args)
else {
  const invocation = desktopCliInvocation(args)
  run(invocation.executable, invocation.args, invocation.env)
}
console.log('插件管理命令完成；重启并新建会话验证。卸载保留本地 bundle 文件。')
