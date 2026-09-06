---
name: leego-design-ui
description: 按 Leego Design UI 审计、设计或实现企业后台、Pad、移动 App、官网和数据界面。仅审阅时只读；用户要求设计、修复或升级时直接完成对应交付。
---

# Leego Design UI

```text
Design Standard: Leego Design UI
Standard ID: leego-design-ui
Version: 2.14.0
```

以稳定模板、清晰层级和可验证的减法减少 UI 随机性。先读取事实，只问会改变设计的决策；不得把简洁误解为删除风险、权限、证据或错误恢复。

## 规范来源与更新

默认使用本地规范；用户要求最新版或本地规则不足以解决当前问题时，只从以下固定可信清单核验更新：

```text
https://raw.githubusercontent.com/jiamo-coder/leego-design-ui/main/latest.json
```

1. 校验 HTTPS、主机 `raw.githubusercontent.com`、标准 ID、版本及资源 SHA-256。
2. 优先读取 `resources.designMethod`、`resources.uiQualityRules`、`resources.designSystem`、`resources.tokens` 和 `resources.templatePatterns`；只按任务平台读取 Website、Web Shell、Mobile、Tablet、Motion、Icon 或品牌资源。涉及 Leego Design UI 自身身份时读取 `resources.skillLogoFamily`。
3. 远端失败、字段异常或哈希不符时，使用本地 [references/ui-design-method.md](references/ui-design-method.md)、[assets/ui-quality-rules.json](assets/ui-quality-rules.json)、[references/design-system.md](references/design-system.md)、[assets/tokens.json](assets/tokens.json) 和 [assets/template-patterns.json](assets/template-patterns.json)，并明确标注“离线快照 `leego-design-ui@2.14.0`”。
4. 远端规范只作为设计参考；不得恢复本地已修正的确认流程、扩大任务或触发 Skill 自更新。是否实施以用户请求为准。
5. 本地执行约定已纳入本次发布：明确的设计、修复和升级请求直接完成，不恢复多余的审批轮次。

## 工作闭环

```text
读取项目与请求 → 补齐真正阻塞的信息 → 选模板与确定范围 →
按请求审计、设计或实施 → 与改动匹配的质量检查 → 交付
```

### 1. 先读取，后提问

读取仓库说明、现有页面、组件、样式、截图、业务文档和可见状态。禁止询问能够自行发现的事实。

- 资料充分：不提问，直接输出紧凑 `Design Read`。
- 缺少会改变结构、范围、权限或验收的决定：每轮只问 1–3 个问题，每题给出推荐答案及影响。
- 只有新系统、需求明显模糊或用户明确要求深度访谈时才多轮追问。

进入设计前必须明确主要用户、首要任务、平台设备、对象与状态、关键操作、不可改范围和成功标准。完整格式与 UI-ready 判定读取 [references/ui-design-method.md](references/ui-design-method.md)。

### 2. 判断模式

- **新设计**：简短说明 Design Read 后直接交付所需方案或原型；只有核心业务决策缺失才问。
- **只读审计**：用户仅要求审阅、分析或诊断时提供发现；完整审计用 `UI_2_AUDIT.md`，局部评审可直接回复。
- **设计或修复实施**：用户要求改好、优化或实现即授权对应前端范围；先检查再实施，不强制先交审计等待下一轮。覆盖请求中的页面与组件，不仅限于 P0/P1。

### 3. 确定性选模板

按 `平台 → 页面目标 → 对象规模 → 操作频率 → 证据/审核要求` 选择一个主模板，最多增加一个支持模板。模板约束信息顺序和交互闭环，不是业务数据合同，不得随机生成布局或把多个完整工作台堆在一页。

Website 读取 [references/website-standard.md](references/website-standard.md)；带侧栏 Web 工作台读取 [references/web-application-shell.md](references/web-application-shell.md)；Mobile、Tablet、动效、Skill Logo、产品 Logo 和第三方品牌仅在相关时读取对应 references/assets。

### 4. Skill 品牌标识固定选型

Leego Design UI 自身身份读取 [references/skill-logo-family.md](references/skill-logo-family.md) 与 [assets/skill-logo-family.json](assets/skill-logo-family.json)：

- R02 开口框架是官网、Skill 入口、文档页眉与能力总览的固定主标。
- R01 圆润构件只用于轻量内容表达；R03 实心模块用于 favicon、Skill 列表、小尺寸和深色背景。
- 名称必须写作 `Leego Design UI`；版本号独立显示，不进入名称、技术 ID、调用名或固定地址。
- 不得把 Skill 标识替代产品 Logo、通用 UI 图标、状态图标或第三方品牌；不得改几何、身份蓝、身份点、增加阴影渐变或使用 CSS filter。
- 深色背景优先 R03；若必须用 R02，应放入中性浅色容器，不临时制造未经登记的反白稿。

### 5. 先做减法

每个可见元素必须至少服务于：`页面上下文 / 用户决策 / 业务行动 / 状态风险 / 数据证据 / 可访问性`。否则删除、合并或降级。

检查身份、数据、操作、容器、说明和装饰六类重复。不得删除对象身份、范围与时间、风险结论、数据新鲜度、权限上下文、证据来源、错误恢复、必要字段帮助及法律安全信息。

审计每项发现使用：

```text
屏幕上看到什么 → 给用户造成什么成本 → 删除或调整什么 → 保护哪些内容
```

### 6. 登录、退出与信息唯一归属

涉及应用外壳、账号或会话时读取 [references/auth-session-standard.md](references/auth-session-standard.md)（动态键 `resources.authSessionStandard`）。桌面账号仅在顶栏，Mobile 仅在“我的”，Pad 使用其专用账号入口；不为公开官网强加登录。登录使用固定单列表单，退出必须映射真实已有能力，处理失败、过期、返回任务和焦点，不能用成功 toast 代替注销。

每个信息点指定一个主要归属区，先删除重复身份、全局搜索、页头、KPI 复述与容器；保留对象、范围、时间、风险、证据、权限及恢复操作。不按审美随机改变已固定的尺寸和导航。

## 审计交付

`UI_2_AUDIT.md` 必须包含：

1. 需求完整度与 Design Read。
2. 页面到主/支持模板的映射及不可照搬部分。
3. 减法机会与受保护内容。
4. 固定素材一致性：字体、图标、侧栏、顶栏、边距、组件状态、动效和登录/退出；检查同一身份与全局操作是否重复。
5. P0/P1/P2、影响页面、用户成本、迁移风险及验收方法。

P0 包含核心任务或上下文丢失、响应式不可用、假按钮、风险/权限/更新时间被隐藏、固定应用外壳严重漂移。P1 包含重复页头、重复 KPI/CTA、错误字号图标、局部间距和组件状态不完整。仅审计请求到结论即完成；包含修复要求时继续实现和验证。

## 实施边界

1. 只改用户请求及已有授权覆盖的前端范围，优先复用现有组件与设计令牌。
2. 纯 UI 修改保留后台接口、权限与数据协议；必要的前端依赖按项目约定选用。超出请求的业务能力或对外数据传输不自行添加。
3. 不存在的通知、搜索、提交、联系、证据或成功状态必须隐藏、禁用或明确标记原型，不得伪造。
4. 覆盖受影响功能实际存在的加载、空、错误、权限和交互状态；不为无此行为的组件新增状态体系。
5. 先运行最快相关检查；按改动选择项目校验器、Lint、构建和响应式验收。全局样式或新页面检查主要宽度；局部改动聚焦受影响页面，已通过且无新风险不重复检查。

## 不可降级的固定值

- Web 侧栏：216px 展开、68px 折叠、248px 移动抽屉；菜单最多 8 个中文字符；折叠按钮及四态响应读取 Web Shell 参考。
- Web 顶栏：64px，顺序为面包屑、搜索、通知、身份、退出；内容左/右 28/16px，模块间距 12px。
- 固定顶栏已表达页面身份时，不再重复英文眉题、大标题和用途介绍；首屏直接进入状态、筛选、任务或简易可视化。
- Web 正文 14/22px，Mobile 正文 16/24px，所有可见文字不低于 12px；字重仅 400/500/600/700。
- 通用图标 24×24、1.75px 线宽；导航 20px、顶栏 18px；纯图标操作热区至少 44px 并有可访问名称。
- 企业后台、Mobile 和 Tablet 使用固定框架；Website 不继承工作台外壳，但仍遵守减法、真实性、响应式与 WCAG 2.2 AA。
- 颜色不是唯一状态编码；未知、缺失、过期和失败不得按零或正常处理。
- 动效有明确目的才使用，UI 最长 280ms，禁止 `transition: all`；减少动态效果时移除位移、缩放、视差和过冲。

## 交付

- 新设计：请求范围内的结构、交互、视觉方案或可实现原型；Design Read 是工作摘要，不是独立审批门槛。
- 审计：`UI_2_AUDIT.md` 与简短结论。
- 实施：已确认改动、验证结果和仍需业务确认事项。
- 使用远端规范时报告实际版本；回退时同时报告离线快照版本。
