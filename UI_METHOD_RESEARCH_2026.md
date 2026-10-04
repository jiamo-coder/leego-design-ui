# Leego Design UI · 设计方法研究记录

```text
Design Standard: Leego Design UI
Standard ID: leego-design-ui
Version: 2.19.0
```

本记录说明本次方法升级吸收了什么、拒绝了什么，以及为什么。外部资料只作为研究证据，不进入运行时依赖。

## 来源

### Grill / Grilling

- 来源：本地 `grill-me`、`grilling` 与 `grill-with-docs` Skill。
- 吸收：先自行查找事实；按决策前沿逐层提问；一次只处理当前独立问题；每个问题给出推荐；未知消除后立即停止提问。
- 调整：UI 任务采用自适应深度。资料充分时不强制访谈，只有模糊新系统或用户显式要求时进入多轮 Grill。

### Finesse UI

- 来源：[mouse-lin/finesse-skill](https://github.com/mouse-lin/finesse-skill)，MIT License，审阅日期 2026-08-30。
- 吸收：设计前的 Design Read；审计先写可见问题和用户成本；改版先定义保护规则；组件覆盖完整状态；交付前进行内容、移动、无障碍和运行时检查；报告使用用户可理解的语言。
- 不吸收：随机风格分歧、Style Personas、SPECTACLE 指标、默认 WebGL/Three.js/GSAP、远程字体、外部图片、纹理与暗角、固定纯黑白禁令、负字距和示例页面代码。
- 安全结论：仓库的检测脚本只读取用户指定的本地 HTML/CSS/JS，不联网、不读凭证；示例目录包含远程字体、CDN、外部图片和捆绑的 GSAP/ScrollTrigger，因此不安装、不执行示例、不复制脚本。本规范只用人工复述后的方法结论。

### Apple 设计原则

- 来源：[Apple Design Principles](https://developer.apple.com/design/human-interface-guidelines/design-principles)、[Layout](https://developer.apple.com/design/human-interface-guidelines/layout)、[Typography](https://developer.apple.com/design/human-interface-guidelines/typography) 与 [Icons](https://developer.apple.com/design/human-interface-guidelines/icons)。
- 吸收：元素必须有清晰目的；先建立层级和分组；使用渐进披露降低首屏负担；字体与图标优先保证识别和一致性。
- 边界：“像苹果”指克制、层级和用途明确，不复制 Apple 官网布局、品牌语言、图片或组件外观。

## 形成的方法

```text
读取事实 → 自适应问诊 → 继承方向 → 统一页面 → 做减法 → 分项验证 → 按授权交付
```

这套方法优先降低跨系统随机性。固定令牌和已验证模板优先于即时风格探索；后台仅保留已确认的品牌色、Logo和少量图像差异，Website另按官网规范允许标题气质与主视觉变化。

## 权限与风险

- 不安装外部 Skill，不执行外部检测脚本和示例。
- 不复制外部 HTML、JavaScript、品牌资产、字体或图片。
- 不增加网络请求、遥测、凭证读取、第三方包或后台能力。
- 方法研究属于只读输入；只审阅保持只读，明确设计或修复请求按授权范围完成，不额外添加审批轮次。

## 2.18.0 方法蒸馏

流程：读取项目 → 明确设计方向 → 统一页面与组件 → 做减法 → 视觉与技术检查 → 修复并交付。详见 `UI_DELIVERY_WORKFLOW_2026.md`。以下是方法提炼，不复制源码、资产或安装其运行时。

| 来源与固定提交 | 吸收 | 不吸收 |
| --- | --- | --- |
| [Interface Design](https://github.com/Dammyjay93/interface-design/blob/2f9be3206855bcb2d1d0af262c8bae25cba6658d/.claude/skills/interface-design/SKILL.md)，MIT | 保存项目决策、语义令牌、组件复用、跨页面层级 | 同色侧栏、11px示例、强制每个产品布局不同 |
| [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/09170eec67eefd46a7ae85de61b40c194020f997/.claude/skills/ui-ux-pro-max/SKILL.md)，MIT | 按受众和任务匹配方向、项目总规范、按问题读取 | 用UI方向代替完整品牌定位、页面覆盖固定框架、随机风格参数 |
| [Taste](https://github.com/Leonxlnx/taste-skill/blob/ce26fc25c0e5e8cab638f883de62d9a86ee5e45b/skills/taste-skill/SKILL.md)，MIT | 保留式优化与改版区分、删除同义CTA和装饰、真实文案 | 后台套官网、高动效默认、强制图片字体、配色轮换 |
| [Impeccable](https://github.com/pbakaus/impeccable/blob/e103efe779e2dd01274dabae83531fef00bf2563/skill/SKILL.src.md)，Apache-2.0 | 视觉评审与技术审计分开、完整任务路径、组件漂移根因、减法后可达性 | 主观评分充当验收、每任务全量审计、二进制启动器与自动运行入口 |

安全范围：研究读取入口、相关方法及部分执行入口，未安装或执行外部工具。Impeccable启动器包含下载并运行引擎的路径；本记录不代表其完整安装包已审通过。Leego不新增这些执行路径、依赖或遥测。来源后续变化不自动覆盖已确认规则。
