import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

// Use the exported host entry with explicit paths. Its standalone entry infers
// resources/app/runtime for this unpacked Linux layout, but support lives in
// resources/runtime. Do not modify the installed application to correct it.
export function desktopCliInvocation(args, env = process.env) {
  const runtime = env.DSH_DIR || '/usr/lib/deepseek-harness/resources/app/dsh'
  const support = env.DSH_SUPPORT_DIR || join(dirname(dirname(runtime)), 'runtime')
  const cli = join(runtime, 'node_modules/@deepseek-ai/dsh-desktop-host/lib/cli.js')
  const electron = env.DSH_DESKTOP_EXECUTABLE || '/usr/lib/deepseek-harness/deepseek-harness'
  const pnpm = join(support, 'pnpm/bin/pnpm.mjs')
  for (const path of [cli, electron, pnpm]) {
    if (!existsSync(path)) throw new Error('找不到桌面运行时文件：' + path + '；请检查 DSH_DIR、DSH_SUPPORT_DIR、DSH_DESKTOP_EXECUTABLE，或使用 Plugins 页面。')
  }
  const code = 'const {runDesktopCli} = await import(' + JSON.stringify(pathToFileURL(cli).href) + ');'
    + 'process.argv = ' + JSON.stringify([electron, cli, ...args]) + ';'
    + 'await runDesktopCli(' + JSON.stringify(runtime) + ',' + JSON.stringify(support) + ');'
  return { executable: electron, args: ['--expose-internals', '--input-type=module', '--eval', code],
    env: { ...env, ELECTRON_RUN_AS_NODE: '1' } }
}
