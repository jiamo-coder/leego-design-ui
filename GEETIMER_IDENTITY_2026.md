# Geetimer · V5.0 品牌资产选型

2026-10-02 收录；随 Leego Design UI 2.17.0 打包，品牌资产版本仍为 V5.0。源包 `brand-identity/geetimer/v005` 只读，SVG/PNG 原件按 SHA-256 原样收录。源记录确认单 G 轮廓；全称字标仍标记为深化候选，不把入库解释为商标、字体或平台认证。

## 仅在相关项目读取

当用户指定 Geetimer（检索别名 GitTimer）时使用本参考与 `assets/icons/geetimer/catalog.json`。正式显示名固定为 **Geetimer**，不可写成 GitTimer、GeeTimer 或加空格。标识不替代 Leego Design UI 自身 Logo，也不加入小字辈 R01/R02/R03 家族或通用操作图标。

## 固定场景选择

资产相对路径均基于 Skill 的 `assets/icons/geetimer/v005/`。

| 场景 | 默认文件 | 使用边界 |
|---|---|---|
| 浅色导航、favicon、16–48px 紧凑入口 | `web/G-solid-purple.svg` | 保留单 G 轮廓；同时提供 16/24/32/48/64/128/256px PNG。图标链接须有 Geetimer 可访问名称。 |
| 深色导航或品牌入口 | `web/G-gradient.svg` 或 `web/G-white.svg` | 使用已登记的渐变/白色源稿，不用 CSS filter 生成。 |
| 官网页眉、文档横向品牌位 | `web/Geetimer-black.svg`；深色用 `web/Geetimer-white.svg` | 不在全称前再放第二个 G。不挤压字标，空间不足改为单 G。 |
| 品牌展示与大尺寸画面 | `logo/Geetimer-gradient-transparent.svg` | 按原比例展示；渐变只属于该品牌身份，不覆盖通用 UI 状态色。 |
| App / 系统切换入口 | `app/G-purple.png`，另有白/黑底 | 1024×1024 不透明完整正方形；圆角仅由承载平台裁切，不烘焙进原件。 |
| 大尺寸全称应用入口 | `app/Geetimer-purple.png` 或横排备选 | Gee / timer 仅为换行；小于 64px 高频入口优先单 G，全称 48px 不作为等效可读方案。 |
| 抖音、小红书头像 | `social/douyin/G-purple.png` / `social/xiaohongshu/G-purple.png` | 分别提供单 G、全称、三组配色；保留完整方形源图，圆形仅作预览蒙版。 |

## 不可变与可选

- 保留所有路径、G 开口、右侧收笔、宽高比、透明度和内边距；不以字体 G 重建，不添加时钟、箭头、阴影或描边。
- V5 全称 e 可见高度为 G 的 50%，后半段底边对齐 G 的平直收笔；相邻字形可见边界间距 5 源单位。直接用成品源图，不用 CSS 重排字符。
- 只选现成渐变、白、黑或深紫版本。渐变 `#A09CF0 → #857CEB → #7B70E9`，近黑 `#0C0C0C`，白 `#FFFFFF`。它们是项目规范化色值，不宣称第三方官方色值。
- 白底功能文字用 `#5644C6`；黑底强调用 `#A09CF0`；渐变底功能文字用近黑。Logo 配色不能当成正文对比度达标证明，风险/成功仍用独立状态语义。
- 旧版对比稿、展示板、示例 HTML、生成脚本和 ZIP 不作为运行时资产；不复制其中的小字号或模拟按钮。图库不代表已开发对应产品。
- 本地可直接复制适用资产，不需要外联、远程字体或新增依赖。跨项目或对外使用须符合权利与业务范围，不暗示商业授权。

## 验收

核对名称、场景、原件哈希与背景版本；检查 16/24/32/48/64px 单 G、全称宽度、圆形裁切及无障碍名称。保持 Geetimer 配色局部作用域，不改变全局令牌。原始包与既有其他品牌素材均保留。
