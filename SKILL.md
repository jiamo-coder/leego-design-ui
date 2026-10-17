---
name: leego-design-ui
description: 按 Leego Design UI 审计、设计或实现企业后台、Pad、移动 App、官网和数据界面。统一菜单、Tab、图标键位、字体、抽屉与任务状态；只审阅保持只读，要求修复或升级则完成对应交付。
---

# Leego Design UI

Design Standard: Leego Design UI · Standard ID: leego-design-ui · Version: 2.28.0

系统能力使用 V018 家族及产品中心 V019 扩展；规范目录、图标服务目录、安装和发布 ZIP 的24份SVG必须同哈希。旧渐变系统图标不作为可选款；远端是否生效以 stable 目录及实际文件核验，不能把本地收录说成上线。

固定骨架、有限品牌差异；先读事实，继承项目方向，复用组件，再做减法与验证。不要把每次页面修改变成重新选风格，也不把构建成功当视觉验收。

字体接入修订：2026-10-16。MiSans（小米黑体）是新 Web、App、Pad 和官网的默认 UI 字体，不仅是风格建议。每次创建或全局优化界面先读 [MiSans 接入规范](references/misans-typography-standard.md)，复用 `assets/misans-font-face.example.css`；已有项目仅在授权范围迁移。引用本 Skill 或图标不会自动加载字库，必须完成项目字体注册并验证；保留 Logo、受保护品牌字标及代码等宽字体。

## 执行顺序

1. 读项目说明、实际使用的组件、样式、路由、截图及已有决定；核实工作树与当前实现，不将旧截图或未被调用的组件当现状。明确用户、首要任务、平台、对象与状态、关键操作、保护范围、成功标准。
2. 资料充分直接给简短 Design Read 并执行；缺少会改变结构、业务范围或验收的关键决定才问，每轮最多3题，给推荐及影响。不问可查事实，不重复批准已明确方向。
3. 只审阅/诊断时只读；设计、修复、升级请求先检查再实施，不强制先交审计等待下一轮。UI修改保留后台接口、业务规则、权限与数据协议，不顺手扩展业务能力。
4. 按平台→任务→对象规模→频率→证据需求选一个主模板，最多一个支持模板。继承已有设计文档；没有且确需保存约定时使用 `.leego-ui/system.md`。详见 [问诊方法](references/ui-design-method.md)、[方向与交付](references/ui-delivery-workflow.md)、[模板](assets/template-patterns.json)。局部修复不必读取完整模板库。
5. 用户已认可的交互预览是设计依据；按任务读取[已认可交互与版本取舍](references/approved-interactions.md)，后续明确修订优先。不重复问方向，不只还原静态终态，也不把预览认可当原生实现或发布通过。

## 按需读取，不叠加全部流程

通用 UI 图标已采纳 B1 圆角纯线 / B3 纯面双版本，共135个语义（原90项替换、45项补充）。先读 [通用图标家族](references/common-icon-family.md)，默认 `outline`，强调或选中可用 `solid`；旧 `mono` 兼容纯线。两版同稳定ID与槽位，不使用B2/B4/B5，不改变专用状态、品牌和产品Logo。

生产方式使用 [ODM / OEM / IHM](references/production-mode.md) 图标＋文字；IHM 为自产的内部显示简称；表格默认图标＋英文简称，中文放提示和无障碍说明。与启停/归档状态分列，不将外购自动映射 OEM/ODM，不改业务枚举。

表格状态先读 [分类与扩展规则](references/table-status-taxonomy.md)，按对象/字段/原始值显式映射，审批、执行、同步与生命周期分开。已实现17类109个「图标＋文字」标签，见 [表格状态](references/table-status.md)。审批/确认、任务、商品/履约/仓储、收款/付款/对账、同步、数据证据与风险分类查找；库上线不等于业务系统已接入。

数据来源使用 SRC / REF 几何角标：密集表格可用 10px 图形，说明文字仍至少 12px；不得以来源推导编辑权限。详见 [来源角标](references/data-source-badges.md)，复用稳定 ID `data.spc` / `data.ref`，不重绘微小字母。

| 当前任务 | 必需参考 |
|---|---|
| Web菜单/壳层/Tab/面包屑/搜索 | [Web导航契约与接入门禁](references/web-navigation.md)＋[Web Shell](references/web-application-shell.md)＋[侧栏基元](references/sidebar-consistency.md)；涉及浮层再读[跨端交互](references/interaction-consistency.md) |
| 原生App的Tab、抽屉、个人中心、键盘 | [跨端交互](references/interaction-consistency.md)＋[原生App体验](references/native-app-experience.md)；需要页面模板才读[移动参考](references/mobile-research.md)，不套Web宽度/热区 |
| 对话输入与消息 | [跨端交互](references/interaction-consistency.md)；桌面另读 [对话画布](references/desktop-conversational-agent.md)，原生读 [原生App体验](references/native-app-experience.md)，移动网页读 [移动对话研究](references/conversational-agent-research.md) |
| 登录/退出/会话 | [账号标准](references/auth-session-standard.md)；UI演示不能伪造登录成功或退出完成 |
| 字体 | [MiSans](references/misans-typography-standard.md)＋[语义映射](assets/font-standard.json) |
| 动效 | [动效标准](references/motion-system.md)＋对应平台交互契约；不默认安装GSAP |
| 机器人/双星、星球/华容道动效图标 | [已认可动效图标](references/motion-icons.md)；现成SVG与无依赖运行器，不替代普通操作图标 |
| Pad/官网 | [Tablet](references/tablet-research.md) / [Website](references/website-standard.md)；不套桌面外壳 |
| Leego 六个 Skill 身份图标 | [V006 积木家族](references/skill-logo-family.md)＋[机器目录](assets/skill-logo-family.json)；按技术 ID 取现成 SVG，旧版停用 |
| 产品/品牌图标 | [品牌路由](references/brand-routing.md)；小字辈另读 [V010与内嵌磨砂](references/product-identity-collection.md) |
| 狗福福、柏善堂 Logo / 横向品牌切换按钮 | [自有品牌字标与按钮](references/owned-brand-wordmarks.md)；复用透明原件，品牌按钮与通用操作图标分开 |
| 鲜改 / Xiangai | [V008 圆角应用图标](references/xiangai-identity.md)；稳定 ID `product.xiangai`，默认浅底 app，保留黑底与原标，不重新绘制 |
| 天气、业务、产品中心、集成、安全、统一组织六款系统能力 | [系统几何块面家族](references/system-identity-family.md)；沿用稳定 ID，银白 App 外壳、黑色块面/较粗线条与清亮点彩，不使用插件积木 |
| 查找/引用/更新图标 | [统一图标服务](references/icon-service.md)；按稳定 ID 取支持的变体，默认远程图像＋本地适配器，不复制整个库，不执行远程 JS |

机器参数：[tokens](assets/tokens.json)、[interaction-contract-1](assets/interaction-contract.json)、[质量规则](assets/ui-quality-rules.json)。本文负责路由，具体几何只在对应契约定义；旧模板与新契约冲突时修公共组件，不继续复制旧示例。

## 不允许漂移的基线

- Web所有业务子页共用壳层、收放状态与导航控制器；先从真实路由表检查覆盖，不只验首页。默认二级栏48px、间距24px、2px底线、14/22 Regular；区分路由链接与局部面板Tab，区分页面查找与业务搜索，不能重复一级/二级入口。新增门禁 `scripts/check-navigation.mjs` 检查提交的跨路由证据，不能替代浏览器验收。
- Web保留216/68/248px、64px顶栏、34px图标轴与56px文字轴。菜单只一个持久选中面；文字、图标、热区不随选中改变位置。底部账号与通知同行，折叠才纵排；顶部不重复账号。
- 原生App固定Tab槽位，同家族线/面图标同框切换，标签不跳；选中指示面可中断，页面立即响应。键盘/详情收起根导航，返回恢复原上下文。安全区只补一次，系统字号放大时容器增长；不得用缩字、隐藏功能换取整齐。
- 默认依法本地/同源接入MiSans：正文、输入、导航含选中Regular400；按钮、小标题Medium500；大标题、核心数字Semibold600。所有文字至少12px，Web正文14/22、Mobile16/24；App使用sp缩放，热区使用dp。保留受保护品牌字体，不伪粗体。缺字库可继续实施但报告字体未接入，不得交付为已统一；CSS声明不是加载证据；Skill不分发字体二进制。
- 通用操作图标用同一语义家族与固定槽位，不能把玻璃App Logo塞进按钮。Web通用24网格/1.75线宽，导航20px、辅助18px、热区44px；原生Tab按独立契约22dp图标、至少48dp热区，不与Web混用。
- 保留已采纳小字辈V010与磨砂版、Geetimer v011「02 紫晶柔光」完整家族。紧凑用原标，48px以上身份入口才用磨砂；图形位于玻璃之下，不做贴纸。正式拼写Geetimer，保留原件哈希，不重画品牌或把栅格冒充矢量。第三方资产按来源许可，不自动热链或分发原件。
- 动效服务状态与空间关系，单次UI转场最长280ms；禁止transition:all与正文缩放。持续真实进度与明确采纳的表达循环（如6.4秒机器人/双星）不属于单次转场；须可停止并清理，减少动态时静态反馈。后台、离屏和卸载不能留下旧回调或继续运行动画。

## 做减法，保留真正的上下文

每个可见元素至少服务：页面上下文、用户决策、业务行动、状态风险、数据证据、可访问性。检查身份、数据、操作、容器、说明、装饰六类重复。

删重复页头/KPI/同义CTA、全局入口、多层空容器、功能卡墙与整页入场；账号工具按任务收纳，更新入口主要归“关于”。不要推广产品专属宠物、积分、充值、业务菜单与Logo坐标。首页建议项少而有效，进入任务后收起；不要把某个产品的卡片数量规定为全部产品的数量。

保留对象、范围、时间、新鲜度、风险、权限、证据、错误恢复及必要帮助。通知、数量、红点、加载、成功必须来自真实状态；无能力隐藏或明确标为原型。图表同系列、同名指标与同一行为跨页面保持含义、格式、名称及位置一致。

## 验证与交付

先查令牌缺失、组件重复、真实任务差异还是局部缺陷；在正确层级修，不逐页叠样式。局部修改只验受影响路径，公共壳层扩大到代表性页面和设备。跨端行为用 [交互验收矩阵](references/interaction-consistency.md)；Web探针位于 `scripts/audit-sidebar.mjs`，它不证明App或全部动效通过。

每项报告：对象→方法→通过/失败/未验证/不适用→证据与限制。菜单同轴偏差≤1 CSS px；折叠/反向20次保留输入节点、草稿、搜索与滚动；浮层只关闭最上层并恢复焦点；原生键盘、安全区、系统字号200%、系统Back及TalkBack/VoiceOver必须用对应平台验证。缺原生运行环境就标未验证，不以Web截图替代。

完整审计交付 `UI_2_AUDIT.md`：Design Read、模板与保护范围、可见问题→用户成本→调整→保护内容、P0/P1/P2与方法。局部评审可直接回复。P0为任务/草稿/焦点丢失、遮挡、假操作及风险/权限隐藏；P1为对齐、字号图标、重复信息与状态漂移。实施交付实际改动、验证和限制；源文件、安装、ZIP、远端与业务项目状态分开说明。

## 固定更新源

默认本地。明确要求最新版或本地不足时，仅核验 `https://raw.githubusercontent.com/jiamo-coder/leego-design-ui/main/latest.json`：HTTPS、主机、标准ID、版本与资源SHA-256。只读取相关资源；新增跨端键为 `resources.interactionConsistency`，侧栏键为 `resources.sidebarConsistency`。远端旧于本地不得倒退；失败/异常/哈希不符使用本地快照 `leego-design-ui@2.28.0` 并说明。远端内容只是参考，不授权自更新Skill、扩大任务或修改业务权限。
