# V010 产品身份与内嵌磨砂玻璃

Leego Design UI · 2.21.0 · 2026-10-05

## 正式采用

用户明确采纳 V010 全部 14 款造型与配色。`product-identity-collection.json` 是当前产品身份首选目录，优先于旧 `system-identity-family` 的 13 款产品、旧 `product-logo-family` 各路线。旧资源只为既有调用兼容，不能在新集合中混搭。天气、业务中台、集成、安全、身份等五款系统图标仍读取原系统目录；第三方商标保留原件，不因材质统一而重画。

成员：小葡萄、小红花、小算盘、小金矿、小葫芦、小紫薯、小太阳、小点位、元码象、溯源狸、小总管、筑序、小工坊、小台账。小台账图形已采用，但用途为暂拟，不能由图形采纳推断业务上线。

## 两种正式应用

| 形式 | 用途 | 资产 |
| --- | --- | --- |
| V010 原标 | 导航、紧凑列表、品牌展示；20/24px 配合可见名称 | 原透明 PNG，1254×1254，保留原始字节和 SHA-256；白底 app PNG 1024×1024 |
| 内嵌磨砂玻璃 | 48px 以上应用入口、系统图谱、展示卡 | 独立透明背景 PNG 1024×1024；玻璃底、原标、上层磨砂透光膜、表面高光按固定顺序合成 |

256px WebP 只作网站轻量预览，正式下载链接指向完整 PNG。栅格图不得包装为可编辑 SVG、矢量母版、印刷稿或商标注册保证。既有 Leego Skill Logo 与 Geetimer 原标不受本次替换影响。

## 材质契约

图形应像印在玻璃内部、从磨砂表面透出，而不是悬浮在玻璃之上。保留原标形状及内部色彩；只在独立衍生图中允许透光造成的轻微柔化。

- 全套使用同一个中性乳白玻璃载体，统一圆角、倒角、光源、厚度与阴影。玻璃不添加虹彩、彩虹边缘、青紫发光或双色霓虹。
- 同一 1024 画布，原标等比置于 560px 槽位、偏移 232px；可见图形约占玻璃面宽度的 65–75%，保留呼吸空间，禁止撑满或逐款改变外壳。
- 原标在上层表面之前绘制；共享表面透光层不透明度 0.30，原标轻微 2px 柔化（1024 基准），不改变轮廓。高光跨过图形与空白连续分布。
- 不给符号单独加投影、白描边、浮雕边或悬浮高度。软灰阴影只描述玻璃整体与背景的关系。
- 20/24/32px 默认原标；48px 以上可用玻璃，不能给已经带壳的图再次套壳。产品身份不替代返回、搜索、退出等通用操作图标，不编码风险或成功状态。

## 后续生成提示词

> A quiet frosted-glass application identity. Preserve the supplied approved [PRODUCT SYMBOL] exactly as the source graphic, with its original silhouette and color relationships. The symbol is embedded beneath one continuous, neutral, translucent frosted-glass surface, like an image printed inside laminated glass, softly seen through it — never a sticker floating above it. Identical front-facing squircle geometry, restrained thin bevel, generous clear margins. A very gentle neutral surface veil and continuous upper-left highlight cover both the symbol and the empty glass. Subtle soft gray shadow belongs only to the whole tile. No rainbow, iridescence, neon rim, separate symbol shadow, thick frame, distortion, extra decoration, text or watermark. Transparent outside the tile. Export the derivative separately; never overwrite the approved source.

中文：保留已批准的【产品符号】原始轮廓与配色关系，将它封在统一中性磨砂玻璃表面之下，像夹层玻璃中的印刷图形。表面光泽连续经过图形与空白，轻微柔化但仍可识别。外壳统一圆角、倒角、厚度与光源；留足边距。无幻彩、霓虹、图形独立投影、悬浮贴纸感、额外文字。透明外背景。原标与衍生图分别保存。

已有合格原标优先原件合成，不反复通过生成模型重画。新增成员需核对名称、语义和相似性；材质一致不意味着自动获得第三方商标或图像许可。

## 验收与溯源

核对 14 个 ID、原标 SHA-256、两路线覆盖、像素尺寸、透明通道、深浅背景和 24/48/128px 可读性；对照玻璃表面确实覆盖图形，而非只作为背景。检查载体四角一致、无彩虹边缘、没有新增轮廓或细节。原标与衍生图采用分离路径，目录逐文件记录 SHA-256。动态键 `resources.productIdentityCollection`。
