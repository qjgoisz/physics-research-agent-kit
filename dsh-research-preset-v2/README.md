# DSH 理论物理科研预设 v2

这是一套为当前 DeepSeek Harness Desktop 重写的四预设家族。它保留原配置中真正影响科研质量的规则，同时移除过时的固定插件清单、版本、硬件和路径断言。

## 四个预设

| ID | 显示名 | 用途 |
|---|---|---|
| `research` | 科研模式 | 日常通用科研协作，根据当前交付物选择适当纪律。 |
| `research-explore` | 科研 · 调研模式 | 文献、讲解、推导、复现、想法评估和研究问题设计。 |
| `research-numerics` | 科研 · 模拟模式 | 模拟、数据、绘图、收敛与误差、`Results.md`。 |
| `research-writing` | 科研 · 写作模式 | 论文写作、投稿要求、术语与风格、主张追溯和审稿检查。 |

## 相比旧版的改进

- 每次生成都从当前 desktop profile 的 `preset-standard` 继承完整工具组合，不再复制旧插件行。
- 只替换 persona，保留当前版本的计划模式、压缩、子 Agent、Web、文件和其他工具设置。
- 环境依赖全部改为运行时检查，不再声称固定 Python、TeX、Wolfram、MATLAB、GPU 或版本一定存在。
- 采用 `AGENTS.md` / `RESEARCH-STATE.md` 分工，避免仓库指令与频繁研究交接混在一个文件。
- 保留五类证据状态、引用支持核验、矛盾调查、数值可复现、结果索引、术语与风格台账和审稿人检查。
- 安装器只管理 `cordis.patch.yml` 中带明确首尾标记的一段，更新与卸载均不会覆盖其他配置。
- 每次写入前自动创建带时间戳备份。

## 文件结构

```text
dsh-research-preset-v2/
├── README.md
├── package.json
├── presets.json
├── persona/
│   ├── base.md
│   └── phases/
│       ├── general.md
│       ├── explore.md
│       ├── numerics.md
│       └── writing.md
├── scripts/
│   ├── regenerate.mjs
│   ├── install.mjs
│   └── check.mjs
└── dist/
    └── desktop-preset.patch.yml
```

`dist/` 是生成物；修改人格或阶段说明时编辑 `persona/`，然后重新生成。

## 安装前检查

完全退出 DeepSeek Harness Desktop。确认下面的 profile 文件存在：

```bash
test -f "$HOME/.dsh/profiles/desktop/cordis.yml"
test -f "$HOME/.dsh/profiles/desktop/cordis.patch.yml"
```

如果桌面版使用了不同的 DSH 主目录或 profile，可在后续命令前设置 `DSH_HOME` 或 `DSH_PROFILE`。默认值分别是 `$HOME/.dsh` 和 `desktop`。

## 生成并审查

在本目录运行：

```bash
npm run generate
```

生成器会：

1. 定位当前桌面安装包中的 `dsh-web-app/presets/standard.patch.yml`；
2. 读取当前 `preset-standard`；
3. 复制其实际插件组合；
4. 只替换 persona 的 `prefix`；
5. 验证所引用的 scoped 插件包存在；
6. 生成 `dist/desktop-preset.patch.yml`。

默认会检查桌面安装路径 `/usr/lib/deepseek-harness/resources/app/dsh`，并兼容旧的全局 npm 安装路径。若 DSH 安装在其他位置，可在命令前设置 `DSH_DIR=/实际/dsh/根目录`。

安装前建议先打开生成文件检查：

```bash
less dist/desktop-preset.patch.yml
```

## 安装

安装会写入用户配置目录，因此应由你在普通用户终端执行；不需要也不应使用 root 或 `sudo`：

```bash
npm run install
```

脚本会先重新生成，再备份：

```text
~/.dsh/profiles/desktop/cordis.patch.yml
```

备份名称类似：

```text
cordis.patch.yml.research-preset-v2.2026-10-04_17-30-00-000.bak
```

随后脚本把预设写入一个受管理区块。重复执行会替换该区块，不会重复添加，也不会覆盖区块外已有的模型、MCP 或界面设置。

安装完成后，完全退出并重新启动 DeepSeek Harness Desktop。然后在“设置 → Agent 预设”中检查四个预设是否出现。已有会话的组合不会改变，应新建会话验证。

## 验证

重启后先执行静态检查：

```bash
npm run check
```

正常结果中，每个 ID 都应为 `1`，且受管理标记为 `begin=1, end=1`。

然后在桌面版中新建会话，分别选择预设并做最小测试：

- 调研：要求区分已读来源和未核验背景，并提出一个可证伪问题；
- 模拟：要求先读 `Results.md`，设计一项收敛检查但暂不运行；
- 写作：给一段含未追溯数值的文字，要求指出证据缺口；
- 通用：给一个跨阶段请求，确认它先确定当前交付物而不是一次性扩大任务。

## 更新

编辑 `persona/base.md`、某个阶段文件或 `presets.json` 后运行：

```bash
npm run generate
npm run install
```

每次生成都会重新读取当前 desktop 标准预设，因此 DSH 更新后也应重新执行这两步。若标准预设结构发生不兼容变化，生成器会非零退出，而不是生成一个静默失效的预设。

## 卸载

完全退出桌面版后运行：

```bash
npm run uninstall
```

卸载只删除受管理标记之间的预设区块，并保留 `cordis.patch.yml` 中其他配置；写入前同样会备份。完成后重新启动桌面版。

## 回滚

如安装后桌面版无法启动，完全退出应用，在终端列出最近备份：

```bash
ls -1t "$HOME/.dsh/profiles/desktop/cordis.patch.yml".research-preset-v2.*.bak
```

确认要使用的备份后，将它复制回原文件：

```bash
cp "$HOME/.dsh/profiles/desktop/cordis.patch.yml.research-preset-v2.<时间戳>.bak" "$HOME/.dsh/profiles/desktop/cordis.patch.yml"
```

不要把示例中的 `<时间戳>` 原样复制；应替换为上一条命令列出的实际文件名。恢复后重新启动桌面版。

## 安全说明

- 安装脚本不会修改 `package.json`、安装 npm 包、改动 MCP、模型或凭据。
- 不会读取或输出 `.credentials.yaml`。
- 不会写入系统目录，不需要 root。
- 生成的预设继承当前标准预设的插件组合，因此仍应像审查代码一样审查生成补丁。
- 预设人格不能替代 DSH 自身的权限、沙箱和审批机制；它只提供科研工作流纪律。
