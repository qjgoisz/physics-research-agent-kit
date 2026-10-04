# DSH bundle 改造验证

两套预设保留原人格；改用本地 bundle 包装，并通过桌面自带插件管理 CLI 登记。用户 profile 补丁仅由显式旧版迁移脚本清理，不用于正常安装。

验证环境：本机安装包 DSH 0.2.0-rc.2。已检查 desktop-host CLI 入口及插件管理器的依赖/bundle 登记实现，并以 Electron Node 模式运行 CLI 帮助（不启动 GUI）。

两套生成物均成功生成，以当前 DSH 使用的 JSON YAML schema 加 !!js 类型解析，分别得到四个科研预设和一个维护预设。生成清单声明精确 DSH peer 版本；升级后须重新生成。

隔离回归测试：

```bash
node --test tests/dsh-bundles.test.mjs
```

覆盖旧补丁安装阻止、备份与精确清理、重复迁移不写入、异常标记拒绝、安装/卸载 CLI 参数、本地 bundle 复制、manifest 静态检查，以及正常安装不改变用户补丁。测试 CLI 是 mock，未进行真实 pnpm 安装或桌面重启验证；临时配置保留在被忽略的 tests/.dsh-test-* 目录。

真实 profile 未修改，未安装插件，未发布 npm 包。最终需要用户安装后新建会话验证预设与工具。bundle 包装不保证未来 DSH API 兼容。

修正首次用户安装暴露的 support 路径错误：使用导出的 runDesktopCli 显式传入 runtime 和 support 目录，而不运行其自动推断路径的 standalone 入口。新增两套入口回归测试，真实运行 CLI 帮助与内置 pnpm --version；四项测试全部通过，仍未对真实 profile 执行安装。
