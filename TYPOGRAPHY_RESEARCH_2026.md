# Leego Design UI · 中文字体调研

> 历史调研快照。2.21.0 起字体与字重执行 `MISANS_TYPOGRAPHY_STANDARD_2026.md`：MiSans 400/500/600，选中导航400；以下系统字体优先和700等旧结论不再是当前实施规则。字号、缩放与中文阅读研究仍可参考。

```text
Design Standard: Leego Design UI
Standard ID: leego-design-ui
Version: 2.1.0
Research date: 2026-08-23
```

## 结论

“小字号”继续代表高密度的信息组织，不再代表极小文字。Web 以 14/22px 为正文基线，移动端以 16/24px 为正文基线；所有可见文字至少 12px。密度通过更短的路径、稳定分组、紧凑间距和受控行高获得，而不是压缩文字。

## 调研基准

| 来源 | 可验证要点 | 对 2.1 的影响 |
| --- | --- | --- |
| [Ant Design 字体](https://ant.design/docs/spec/font-cn/) | 中后台主字体从 12px 提升到 14px；主字体建议 14/22px；常规系统控制 3–5 个主要字阶；数字推荐 `tabular-nums` | Web 正文采用 14/22px；保留少量稳定语义字阶；数字不随刷新跳动 |
| [TDesign Design Token](https://tdesign.tencent.com/starter/docs/vue/design-token) | 腾讯企业级设计体系以语义令牌管理字号，正文中号令牌为 14px | 以语义角色迁移，不对全部元素机械加字号 |
| [Apple HIG Typography](https://developer.apple.com/cn/design/human-interface-guidelines/typography) | 移动界面应尊重平台文字样式与动态字体，正文阅读优先于固定像素密度 | iOS / React Native 使用平台默认字体并开启字体缩放；移动正文采用 16/24px 均衡基线 |
| [Android Grids and units](https://developer.android.com/design/ui/mobile/guides/layout-and-content/grids-and-units) | 字体使用可缩放的 `sp`，系统会结合设备与用户字号偏好计算实际大小 | React Native 不锁死 Web 字体串；验收 100%、135%、200% 系统字号 |
| [W3C 中文排版需求](https://www.w3.org/International/clreq/) | 中文字形、标点、混排和换行具有独立排版要求，不能直接套用仅拉丁文字的压缩策略 | 中文正文不使用负字距；长标题自然换行；检查全角标点与中英数字混排 |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | 普通文本至少 4.5:1 对比度；内容在 200% 放大下不应丢失信息或功能 | 禁止用低对比灰字补偿小字号；Web 验收 200% 缩放和重排 |

## 跨端基线

### Web

| 角色 | 字号/行高 | 字重 |
| --- | ---: | ---: |
| 页面标题 | 26/36px | 700 |
| 区块标题 | 20/28px | 600 |
| 卡片标题 | 16/24px | 600 |
| 正文 | 14/22px | 400 |
| 控件文字 | 14/20px | 500 |
| 表头 | 13/20px | 600 |
| 辅助 / 图表标注 | 12/18px | 400 |
| 核心数字 | 24/32px | 700 |

### Mobile

| 角色 | 字号/行高 | 字重 |
| --- | ---: | ---: |
| 页面标题 | 24/32px | 700 |
| 区块标题 | 20/28px | 600 |
| 卡片标题 | 17/24px | 600 |
| 正文 | 16/24px | 400 |
| 控件文字 | 15/22px | 500 |
| 标签文字 | 14/20px | 500 |
| 辅助文字 | 13/20px | 400 |
| 最小标注 | 12/18px | 400 |
| 核心数字 | 24/30px | 700 |

## 字体策略

Web 只使用本地系统字体，不下载或打包字体：

```css
-apple-system, BlinkMacSystemFont, "Segoe UI",
"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
"Noto Sans CJK SC", "Noto Sans SC", Arial, sans-serif
```

React Native 分别使用 iOS、Android、HarmonyOS 平台默认中文字体，不强制注入 Web 字体串。技术代码、哈希和校验值使用系统等宽字体；中文 UI 不使用等宽字体。

## 中文排版决策

- 汉字正文保持自然字距；只有纯英文大写眉题允许正向字距。
- 长中文标题允许换行，标点与标题共同换行；禁止通过缩小到 12px 以下解决溢出。
- 表格确需截断时，元素必须可聚焦或提供 `title` / 详情入口读取全称。
- 数字启用 `font-variant-numeric: tabular-nums`，金额、百分比、日期和负值使用同一数字基线。
- 字重只使用 400、500、600、700；取消跨平台渲染不稳定的 650 与无必要的 800/900。
- 图表坐标、图例和数据标签至少 12/18px；Tooltip 正文为 14/22px，并同时给出单位、口径和时间。

## 场景对照

| 场景 | 2.0 问题 | 2.1 处理 |
| --- | --- | --- |
| 企业后台 | 正文 13px，筛选与状态大量 10–11px | 正文 14px、控件 14px、辅助 12px；表格 44/48px |
| 数据报表 | 图例、刻度和结论文字 9–10px | 图表标注 12px、Tooltip 与结论 14px |
| 移动任务 | 正文 13px、辅助 9–10px、列表 56px | 正文 16px、辅助 13px、标注 12px、列表 60–84px |
| 表单 | 字段名与错误提示偏小 | 标签 14px、控件 15px、错误至少 13px并靠近字段 |
| 预警 | 强语义清晰但说明字过小 | 保留红/绿状态面，标题 14px、说明 16px、时间 13px |
| 图标规范 | 来源、尺寸与权限说明 8–10px | 所有说明至少 12px；长品牌名可换行或显示全称 |

## 验收矩阵

- Web：1440、1024、760、320 CSS px；浏览器缩放 100%、125%、150%、200%。
- Mobile：390×844、430×932；系统字号 100%、135%、200%。
- 字体环境：macOS Safari、Windows Chrome/Edge、iOS、Android、HarmonyOS。
- 内容压力：长中文、中文标点、中英混排、长金额、负值、零值、未知、过期、多行文本。
- 自动门禁：低于 12px 的硬编码字号、未登记字重、中文负字距、令牌版本不一致均阻止交付。
