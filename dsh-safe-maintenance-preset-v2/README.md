# DSH 安全维护预设 v2

本目录提供独立的本地 bundle 插件。生成器继承当前桌面版 standard 的工具组合，仅替换 persona；不再通过用户 profile 补丁安装。

## 安装

先启动一次桌面版初始化 profile，然后完全退出。在本目录执行：

```bash
npm run generate
less dist/bundle/cordis.patch.yml
npm run install
npm run check
```

安装器将 bundle 复制到 `~/.dsh/local-bundles/dsh-safe-maintenance-preset-v2/`，通过桌面版自带 CLI 执行 `plugin --profile desktop add <绝对路径>`。依赖、锁文件及 `dsh.profile.bundles` 由 DSH 插件管理器维护；安装可能需要联网。正常安装和卸载不写 `cordis.patch.yml`。请普通用户执行，不要使用 root。

也可以运行生成命令后，在桌面侧栏 **Plugins** 页面输入 `dist/bundle` 的绝对路径，检查并安装、启用 bundle（不是只读 Settings 插件列表）。GUI 安装依赖源目录持续存在；建议使用稳定路径。若从 GUI 安装，静态检查同样适用。

重启桌面版并新建会话，在 Agent 预设中选择安全维护模式。科研 bundle 包含通用、调研、模拟、写作四种预设；维护 bundle 包含安全维护预设。静态检查只能证明登记与启用，不能证明工具加载或人格运行成功。

## 从旧补丁迁移

若之前安装过本仓库的受管理区块，先完全退出桌面版，再运行：

```bash
node scripts/migrate-legacy.mjs
npm run install
npm run check
```

迁移命令是唯一主动修改 profile 补丁的脚本：先创建时间戳备份，只删除本预设完整标记区块，保留其余内容。缺失或重复标记会停止；未带本仓库标记的手工预设不会自动删除，请先人工备份并处理重复 ID。迁移后安装若失败，不要把它视为完成：修正原因后重试，或在应用退出时恢复脚本打印的备份。

## 更新、卸载和回滚

修改 persona 后重新运行 `npm run install`（会重新生成）。DSH 升级后也应重新生成并安装：bundle 不是跨版本兼容保证。生成包声明生成时的精确 DSH 版本；不兼容时不要绕过检查，应重新生成。标准预设结构变化导致生成失败时，先修订生成器。

卸载：

```bash
npm run uninstall
```

依赖和 bundle 登记由插件管理器移除，本地源文件保留。重启后确认预设消失。回滚人格版本时恢复仓库中先前的 persona，再重新生成安装；不要覆盖整个 profile 或锁文件。仅回滚旧补丁迁移时，使用迁移脚本打印的备份路径复制回原文件（先卸载新 bundle，避免重复注册）。

## 路径与边界

桌面内置包管理器目录可通过 `DSH_SUPPORT_DIR` 指定，默认根据 DSH runtime 根目录定位同一 resources 下的 `runtime/`。安装器显式传入此目录，并在调用前确认 `pnpm/bin/pnpm.mjs` 存在，避免桌面 standalone CLI 将其误定位到 `app/runtime/`。路径错误时停止，不修改应用安装文件。

默认 profile 为 `desktop`，配置目录为 `~/.dsh`；可用 `DSH_PROFILE`、`DSH_HOME` 指定。生成器用 `DSH_DIR` 指定含 `node_modules` 的 DSH runtime 根目录。默认 CLI 使用 Linux 桌面安装包的专用 desktop-host 入口和 Electron Node 模式，不会启动 GUI。非默认安装可设置 `DSH_DESKTOP_EXECUTABLE`，或通过 `DSH_CLI` 指定支持 desktop profile 的 CLI 可执行文件（不是含参数的命令字符串）。找不到入口时停止，不退回补丁写入。

`dist/bundle/package.json` 是插件清单，`dist/bundle/cordis.patch.yml` 是插件自身的配置层；此文件不同于用户 profile 的补丁。无需发布 npm 包即可本地安装。脚本不读取凭据，不安装 Codex skills，也不修改原 DSH 预设。人格规则不会改变 DSH 权限或沙箱。

本仓库验证生成物与隔离迁移行为；真实 profile 安装及重启后功能验证需要你执行。
