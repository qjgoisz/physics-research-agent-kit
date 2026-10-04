#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'
const root = dirname(dirname(fileURLToPath(import.meta.url)))
const bundle = JSON.parse(readFileSync(join(root, 'dist/bundle/package.json')))
const profile = process.env.DSH_PROFILE || 'desktop'
if (!/^[a-zA-Z0-9_-]+$/.test(profile)) throw new Error('非法 profile')
const dir = join(process.env.DSH_HOME || join(homedir(), '.dsh'), 'profiles', profile)
const manifest = JSON.parse(readFileSync(join(dir, 'package.json')))
if (!manifest.dependencies?.[bundle.name] || !manifest.dsh?.profile?.bundles?.includes(bundle.name)) throw new Error('插件未同时登记依赖并启用')
const patch = join(dir, 'cordis.patch.yml')
if (existsSync(patch) && readFileSync(patch, 'utf8').includes('# BEGIN ' + bundle.name.slice(7))) throw new Error('仍存在旧补丁')
console.log('已登记并启用：' + bundle.name + '；静态检查不代表加载成功，请新建会话验证。')
