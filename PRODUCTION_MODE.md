# 生产方式图标与标签 · 1.0

本组是产品/生产方式分类，不是生命周期状态；与启用、停用、归档独立显示。2026-10-17 用户确认语音中的“资产”指“自产”。

| 显示简称 | 中文 | 含义 | 稳定 ID |
|---|---|---|---|
| ODM | 委托设计生产 | 受托方提供设计与生产，具体责任以合同为准 | production.odm |
| OEM | 委托加工 | 按委托方设计或规格加工，具体责任以合同为准 | production.oem |
| IHM | 自产 | In-House Manufacturing，本企业自行生产 | production.ihm |

IHM 是 Leego 内部 UI 显示简称，不宣称为行业统一编码。OBM 表示自有品牌模式，不能当“自产”替代。OEM/ODM 概念参考[香港教育局设计教材](https://www.edb.gov.hk/attachment/tc/curriculum-development/kla/arts-edu/resources/va-curri/designbook2022.pdf)，具体业务以合同与已核验字段为准，不从品牌、供应商或图标猜测。

## 视觉与复用

- 16px 网格，1.5px 圆头线条。ODM 为设计定位菱形，OEM 为加工压合结构，IHM 为厂房轮廓。无 App 底座，不在微型 SVG 内刻字。
- 默认图标14px＋MiSans Regular 12px文字，间距5px；普通密度16px＋14px，间距6px。文字是可访问的真实文本。
- 表格默认只显示“图标＋英文简称”（IHM/OEM/ODM），不紧跟可见中文。中文保留在悬浮提示和无障碍说明；说明页可显式用 format="full"，完整图例用于解释简称。
- 提供透明/浅底和明暗主题。图形、简称共同区分，颜色不代表成功/失败或业务优劣。标签只读，不绘制成可点击按钮。
- 组件：[ProductionModeBadge.tsx](../assets/production-mode/ProductionModeBadge.tsx)，样式：[production-mode.css](../assets/production-mode/production-mode.css)，目录：[catalog.json](../assets/production-mode/catalog.json)。SVG 有 color、mono、mono-light 三版。mono 外链 img 使用固定深色；需要随文字变色时使用本地组件。

```tsx
<ProductionModeBadge mode="ihm" />
<ProductionModeBadge mode="odm" format="code" tone="soft" />
// 深色容器：data-leego-status-theme="dark"
```

## 映射边界

由消费系统按“系统＋对象＋字段＋原始值”显式映射到 odm/oem/ihm。商品中心现有 SELF_PRODUCED 可在确认该字段语义后映射 ihm；不改变后端枚举。PURCHASED/外购不自动映射 OEM/ODM，UNSPECIFIED/空值/未知值显示待确认。一个产品多种方式时按已核实记录逐个显示，不强制覆盖成一个值。

本次只新增资产与 UI 适配器，不修改业务数据、流程或 API。发布核验正式目录、稳定 ID 和 SVG 哈希；消费端接入另行验收，不把库上线当所有业务页面已更新。
