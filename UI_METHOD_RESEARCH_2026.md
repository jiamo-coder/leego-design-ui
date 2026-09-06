# Leego Design UI · 设计方法研究记录

```text
Design Standard: Leego Design UI
Standard ID: leego-design-ui
Version: 2.14.0
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
读取事实 → 自适应问诊 → Design Read → 确定性模板 → 减法门禁 → 审计/设计 → 确认实施 → 自动质量检查
```

这套方法优先降低跨系统随机性。固定令牌和已验证模板优先于即时风格探索；只有 Website 的品牌表达保留受控变化。

## 权限与风险

- 不安装外部 Skill，不执行外部检测脚本和示例。
- 不复制外部 HTML、JavaScript、品牌资产、字体或图片。
- 不增加网络请求、遥测、凭证读取、第三方包或后台能力。
- 方法研究属于低风险只读输入；最终 Skill 仍保持审计—确认—实施边界。

