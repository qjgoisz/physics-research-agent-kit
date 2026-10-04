import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync, chmodSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

for (const id of ['dsh-research-preset-v2', 'dsh-safe-maintenance-preset-v2']) {
  test(id + ': explicit desktop support path', async () => {
    const { desktopCliInvocation } = await import('../' + id + '/scripts/desktop-cli.mjs')
    const call = desktopCliInvocation(['--help'])
    assert.ok(call.args.at(-1).includes('/resources/runtime'))
    assert.ok(!call.args.at(-1).includes('/resources/app/runtime'))
    const result = spawnSync(call.executable, call.args, { env: call.env, encoding: 'utf8' })
    assert.equal(result.status, 0, result.stderr)
    assert.match(result.stdout, /plugin/)
    const version = spawnSync(call.executable, ['--expose-internals', '/usr/lib/deepseek-harness/resources/runtime/pnpm/bin/pnpm.mjs', '--version'], { env: call.env, encoding: 'utf8' })
    assert.equal(version.status, 0, version.stderr)
    assert.match(version.stdout, /\d+\.\d+/)
    assert.throws(() => desktopCliInvocation([], { DSH_SUPPORT_DIR: '/nonexistent-support' }), /找不到桌面运行时/)
  })
  test(id + ': isolated migration and plugin CLI delegation', () => {
    const home = mkdtempSync(resolve('tests/.dsh-test-'))
    const profile = join(home, 'profiles/desktop')
    mkdirSync(profile, { recursive: true })
    writeFileSync(join(profile, 'package.json'), '{}')
    const target = join(profile, 'cordis.patch.yml')
    const retained = '# user config\n- unrelated: true\n'
    writeFileSync(target, retained + '# BEGIN ' + id + ' — generated\n- insert: []\n# END ' + id + '\n')
    const cli = join(home, 'mock-cli.mjs')
    writeFileSync(cli, '#!/usr/bin/env node\nimport {writeFileSync} from "node:fs";writeFileSync(process.env.DSH_HOME+"/args.json",JSON.stringify(process.argv.slice(2)));')
    chmodSync(cli, 0o755)
    const run = (script, args = []) => spawnSync(process.execPath, [resolve(id, 'scripts', script), ...args], {
      env: { ...process.env, DSH_HOME: home, DSH_PROFILE: 'desktop', DSH_CLI: cli }, encoding: 'utf8',
    })
    assert.notEqual(run('install.mjs').status, 0)
    assert.equal(run('migrate-legacy.mjs').status, 0)
    assert.equal(readFileSync(target, 'utf8'), retained)
    assert.equal(readdirSync(profile).filter(x => x.endsWith('.bak')).length, 1)
    assert.equal(run('migrate-legacy.mjs').status, 0)
    assert.equal(readdirSync(profile).filter(x => x.endsWith('.bak')).length, 1)
    assert.equal(run('install.mjs').status, 0)
    assert.deepEqual(JSON.parse(readFileSync(join(home, 'args.json'))), ['plugin', '--profile', 'desktop', 'add', join(home, 'local-bundles', id)])
    const pkg = JSON.parse(readFileSync(join(home, 'local-bundles', id, 'package.json')))
    assert.equal(pkg.name, '@local/' + id)
    assert.equal(pkg.dsh.bundle.patch, './cordis.patch.yml')
    assert.equal(readFileSync(target, 'utf8'), retained)
    writeFileSync(join(profile, 'package.json'), JSON.stringify({ dependencies: { [pkg.name]: 'file:test' }, dsh: { profile: { bundles: [pkg.name] } } }))
    assert.equal(run('check.mjs').status, 0)
    assert.equal(run('install.mjs', ['--uninstall']).status, 0)
    assert.deepEqual(JSON.parse(readFileSync(join(home, 'args.json'))), ['plugin', '--profile', 'desktop', 'remove', pkg.name])
    assert.equal(readFileSync(target, 'utf8'), retained)
    writeFileSync(target, retained + '# BEGIN ' + id + '\n')
    assert.notEqual(run('migrate-legacy.mjs').status, 0)
    assert.equal(readFileSync(target, 'utf8'), retained + '# BEGIN ' + id + '\n')
  })
}
