# Physics Research Agent Kit

面向理论物理研究与保守系统维护的可复用 Agent 技能、DSH Desktop 预设和项目模板。

> Reusable agent skills, DSH Desktop presets, and project templates for rigorous theoretical-physics research and conservative system maintenance.

本项目把原本集中在 DSH 大型 persona 中的科研工作流，重写为职责清晰、可独立发现的 Codex 技能；同时提供适配当前 DeepSeek Harness Desktop 的动态预设生成器。核心目标是让文献、推导、数值结果和论文主张保持可核验、可复现、可交接。

## 功能概览

### Codex 技能

| 技能 | 用途 |
|---|---|
| [`physics-research-explore`](skills/physics-research-explore/SKILL.md) | 文献核验、概念讲解、理论推导、结果复现、想法评估与研究问题设计。 |
| [`physics-research-numerics`](skills/physics-research-numerics/SKILL.md) | 模拟、数据分析、绘图、收敛与误差验证、可复现性和结果索引。 |
| [`physics-paper-writing`](skills/physics-paper-writing/SKILL.md) | 论文起草与编辑、投稿要求核验、术语和风格一致性、主张追溯及审稿人检查。 |
| [`safe-system-maintenance`](skills/safe-system-maintenance/SKILL.md) | Linux 系统诊断、维护规划、配置所有权判断、风险审查和用户执行步骤。 |

### DSH Desktop 预设

| 目录 | 内容 |
|---|---|
| [`dsh-research-preset-v2/`](dsh-research-preset-v2/README.md) | 科研通用、调研、模拟和写作四个预设。 |
| [`dsh-safe-maintenance-preset-v2/`](dsh-safe-maintenance-preset-v2/README.md) | 安全维护预设。 |

两套 DSH 预设都会从当前桌面版的 `preset-standard` 动态继承工具组合，只替换 persona。安装器采用带首尾标记的受管理补丁块，写入前创建备份，支持幂等更新、检查和卸载。

## 设计原则

- 将主张分为 `established`、`verified numerically`、`plausible`、`conjecture` 和 `unknown`。
- 引用不仅要真实存在，还必须支持其所附着的具体陈述。
- 推导、代码、数值结果与文献之间的不一致是需要调查的发现，不能隐藏或调参消除。
- 定量主张必须能追溯到结果条目、记录推导或经核验的外部来源。
- 数值工作保留代码、原始数据、参数、命令、随机种子、不确定度和验证方法。
- `Results.md` 按物理问题组织，使用指向图、数据、代码和参数的相对链接。
- 论文写作维护投稿来源、术语台账、风格台账、黑话检查和审稿人式异议清单。
- 系统维护先诊断再修改，识别配置所有者，优先可逆、可观察、可回滚的步骤。
- 环境、版本、路径、硬件和权限均在使用时检查，不把历史快照写成永久事实。

## 快速开始

### 安装 Codex 技能

克隆仓库后，在仓库根目录执行：

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
cp -a skills/physics-research-explore "${CODEX_HOME:-$HOME/.codex}/skills/"
cp -a skills/physics-research-numerics "${CODEX_HOME:-$HOME/.codex}/skills/"
cp -a skills/physics-paper-writing "${CODEX_HOME:-$HOME/.codex}/skills/"
cp -a skills/safe-system-maintenance "${CODEX_HOME:-$HOME/.codex}/skills/"
```

重新打开 Codex 会话以刷新技能发现。也可以只复制需要的技能；每个技能均为自包含目录。

显式调用示例：

```text
使用 $physics-research-explore，核验现有文献并把这个想法整理成可证伪的研究问题。
```

```text
使用 $physics-research-numerics，检查有限尺寸收敛并更新 Results.md。
```

```text
使用 $physics-paper-writing，核验投稿要求并对稿件做一次怀疑性的审稿人检查。
```

```text
使用 $safe-system-maintenance，只做只读诊断，不要修改系统；如需系统级操作，请整理为可验证、可回滚的用户执行步骤。
```

完整示例和触发边界见 [`docs/使用指南.md`](docs/使用指南.md)。

### 安装 DSH 科研预设

完全退出 DeepSeek Harness Desktop，然后运行：

```bash
cd dsh-research-preset-v2
npm run generate
less dist/desktop-preset.patch.yml
npm run install
```

重新启动桌面版，新建会话，并在“设置 → Agent 预设”中选择对应科研阶段。安装后检查：

```bash
npm run check
```

### 安装 DSH 安全维护预设

完全退出 DeepSeek Harness Desktop，然后运行：

```bash
cd dsh-safe-maintenance-preset-v2
npm run generate
less dist/desktop-preset.patch.yml
npm run install
```

重新启动桌面版，新建会话并选择“安全维护模式”。安装后检查：

```bash
npm run check
```

上述安装脚本默认写入用户的 `~/.dsh/profiles/desktop/cordis.patch.yml`，不需要也不应使用 root。执行前请审查生成补丁。卸载和回滚方法见各自目录的 README。

## 项目文档约定

研究项目建议使用：

| 文件 | 用途 |
|---|---|
| `AGENTS.md` | 稳定、简洁的 Codex 仓库指令。 |
| `RESEARCH-STATE.md` | 经常更新的研究交接、证据状态、决定和下一步。 |
| `README.md` | 面向人的研究概览、前人工作、创新点、toy model 和计划。 |
| `Results.md` | 按物理问题组织的数值结果总索引。 |
| `Writing-Guide.md` | 单篇论文的投稿、术语、符号和风格契约。 |

可复用模板位于：

- [`templates/theoretical-physics-research/`](templates/theoretical-physics-research/)
- [`templates/safe-system-maintenance/`](templates/safe-system-maintenance/)

模板目录故意不包含 `SKILL.md`，不会被技能发现机制加载。

## 仓库结构

```text
physics-research-agent-kit/
├── skills/                          # 四个可安装 Codex 技能
├── templates/                       # 不参与发现的内部设计与项目模板
├── docs/                            # 中文指南、迁移映射和验证报告
├── dsh-research-preset-v2/          # DSH 科研预设生成与安装
├── dsh-safe-maintenance-preset-v2/  # DSH 安全维护预设生成与安装
└── AGENTS.md                        # 本仓库的迁移与维护约束
```

## 验证

每个 Codex 技能都应通过内置 `skill-creator` validator。当前验证记录：

- [`docs/validation-report.md`](docs/validation-report.md)
- [`docs/safe-maintenance-validation-report.md`](docs/safe-maintenance-validation-report.md)

迁移映射：

- [`docs/migration-map.md`](docs/migration-map.md)
- [`docs/safe-maintenance-migration-map.md`](docs/safe-maintenance-migration-map.md)

DSH 预设应分别运行：

```bash
npm run generate
npm run check
```

生成器会验证当前标准预设结构和插件引用。安装器已经过临时 profile 的安装、重复安装、卸载及原文件哈希恢复测试。

## 贡献

提交修改前请：

1. 阅读 [`AGENTS.md`](AGENTS.md)。
2. 保持技能目标和触发边界清晰，不把所有科研或维护规则合并成一个大型技能。
3. 将条件性细节放进 `references/`，将可复用输出放进 `assets/`。
4. 验证所有 `SKILL.md` 引用可达，模板目录没有可发现的 `SKILL.md`。
5. 对直接、间接、不完整、非触发和边缘请求进行测试。
6. 若修改 DSH persona，重新生成并审查完整补丁，再用临时 profile 测试安装生命周期。

## 安全边界

技能和 persona 是工作流指导，不会授予权限，也不能替代 Codex 或 DSH 自身的沙箱、审批和安全机制。请把第三方技能与预设视为能够影响规划和工具使用的代码与指令，在安装前完整审查。

本仓库不会自动修改你的 Codex 配置或 DSH profile。只有显式执行安装命令才会复制技能或写入用户配置。
