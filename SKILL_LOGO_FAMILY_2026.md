# Leego Skill · V006 积木家族

Leego Design UI 2.25.0 · 用户已采纳 V006 全套。旧 V001–V005 和原 Skill R01/R02/R03 全面停用，不保留旧图作为回退。这里不指产品 Logo 的同名历史路线。

## 按技术 ID 直接取原件

| Skill 调用名 | 成员 ID | 语义 |
| --- | --- | --- |
| leego-design-prd | prd | 需求层级与决策 |
| leego-design-ui | ui | 分栏模块 |
| leego-design-vi | vi | 开合色片 |
| leego-design-ppt | ppt | 叙事推进 |
| leego-design-space | space | 围合转角 |
| leego-proposal-law | law | 权利与义务对等 |

完整映射与 SHA-256 见 `assets/skill-logo-family.json`。安装 Skill 后，相对 Skill 根目录使用：

```text
assets/skill-logo/app/{成员ID}.svg    默认彩色积木
assets/skill-logo/white/{成员ID}.svg  浅色积木
assets/skill-logo/mono/{成员ID}.svg   单色输出
```

复制选定 SVG 到使用方的同源静态目录，不依赖设计者电脑路径或预览端口。例如复制 `assets/skill-logo/app/vi.svg` 后，在网页用 `<img src="/assets/skill-vi.svg" alt="Leego Design VI" width="40" height="40">`；若相邻已有同名文字则 `alt=""`，避免读屏重复。原生不支持 SVG 时使用导出的 PNG，不能用 emoji 或通用图标代替。

## 固定设计

- 六个成员共用64×64网格、双凸点积木、柔和边角、实心几何和负形留白；不再添加右上角点。
- 直接使用原件，不改凸点位置、内符号、比例、色值，不加滤镜、玻璃、渐变或额外投影。
- 默认彩色版，深色底可使用浅色版；同一列表使用同一配色模式，不随机混搭。
- 列表建议32–48px，周围至少4px保护空间；24px为常规下限，16px仅作favicon或压力预览，不作唯一识别入口。交互热区按所在平台规范，不由图标尺寸决定。
- 图形配合正式专业名称；抽象符号不承诺脱离文字即可识别。不修改调用名、产品品牌和业务图标。

## 验证边界

用户已认可视觉方案；SVG 哈希、渲染、尺寸及本地安装与共享包需分别核验。视觉采纳不等于商标检索或注册；不使用 LEGO 字标或暗示品牌授权。此轮不修改字体、权限与业务逻辑。
