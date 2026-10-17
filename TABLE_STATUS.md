# 表格状态 · 1.0

17类109个业务标签；SVG与组件统一来自 [catalog.json](../assets/table-status/catalog.json)。完整分类见 [分类规则](table-status-taxonomy.md)。按对象/字段/原始值显式映射，不改数据库枚举。

- 默认透明底图标＋真实文字，soft 为可选浅底标签，圆角5px。无渐变、闪烁和 App 壳。
- 紧凑14px图标＋12/20px MiSans Regular，间距5px；普通16px＋14/22px，间距6px。文字至少12px。
- SVG不参与读屏，由文字读出。状态标签只读；官网标签按钮仅用于查看资产，不是业务操作。
- 深色容器：`data-leego-status-theme="dark"`。SVG提供color、mono、mono-light。未知值显示“状态未知”，不默认正常/启用。
- 停用不是控件禁用；归档不是删除；审批通过不代表付款或履约完成；供应方送达不代表收货方确认；入队不代表对端更新。
- StatusFilter 保留四种主档状态的兼容筛选。其他字段按相应分类提供筛选，不把109个标签放入一个业务下拉框。

```tsx
import {StatusBadge} from './table-status/StatusBadge';
<StatusBadge status="approval.approved" />
<StatusBadge status="payable.reported" tone="soft" />
<StatusBadge status="receivable.verified" />
<StatusBadge status="fulfillment.completed" size="regular" />
```

稳定ID是 `status.` 加 catalog的key；旧4态ID不变。远程SVG复用 [图标服务](icon-service.md)，例如 `/icon-api/v1/icons/status.approval.approved/color`。相邻文字不可省略；组件随应用审阅打包，不动态执行远程源码。库上线不代表所有消费系统已接入，App仍需原生尺寸、字体缩放与读屏验收。
