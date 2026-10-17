# 数据来源角标 · 1.0

两个符号只说明生产来源，不表示可信度、权限、实时同步或质量。

| 编码 / 稳定 ID | 图形 | 唯一含义 |
|---|---|---|
| SPC / `data.spc` | 实心圆角块内的源点 | 源数据生产方，本单位生产并维护 |
| REF / `data.ref` | 向容器内部进入的箭头 | 引用数据，来自上游或外部，本页面不生产 |

## 尺寸与使用

- 密集 Web 表格默认 10px；普通页面 12px，低分辨率或辨识困难时 16px。10px 是经过简化的几何符号，不是缩小的 SPC/REF 字母。正文、提示与图例仍至少 12px。
- 符号在数据右侧垂直居中，间距 4px，不作为上标脚注，不覆盖金额、小数位、状态或排序按钮。整列同源时优先只在列标题标一次，减少重复。
- 单色与背景至少 3:1；推荐浅底 #334155、深底 #cbd5e1。透明底、无动画、无渐变、无 App 外壳；不用红绿区分。
- 初次展示和帮助中必须有“本单位生产 / 外部引用”图例；不要期待用户自行理解抽象符号。无来源证据时不猜测 SPC，详情显示“来源待确认”。混合来源在字段详情分别说明，不新增第三种含混标记。
- 每个可读字段应有完整无障碍来源描述；大量行不要产生大量 Tab 停靠点。非交互 `SourceBadge` 提供 accessible name，配合共享图例；需逐项查看时用 interactive 模式，24px 桌面、44px 触屏热区，点击/键盘 Enter 打开、Escape/失焦关闭说明。热区不许互相覆盖。
- 原生 App 需按 dp 与平台触控规范适配；本次 Web 预览不等于原生实机验收。允许系统字体放大，说明不可截断。

## 引用

远程图标入口：`https://smalltypeui.qiaokiai.com/skills/leego-design-ui/site/icon-api/v1/icons/data.spc/micro`，将 `data.spc` 换成 `data.ref` 得到引用符号。`micro` 是默认 10 网格，`mono-light` 是深底浅色版；CSS mask 可用 currentColor。遵循 `icon-service.md` 的 stable 快照与哈希校验，不执行远程代码。

React 示例源码在 `assets/data-source/SourceBadge.tsx`，同时复制同目录 JSON 与 CSS 到业务项目；源码组件是本地代码，不会自动热更新。若需资产同步，使用已有 LeegoIcon 服务适配器引用上述稳定 ID，保留本例的可访问语义与交互。不得将来源类型推导为 disabled/readOnly。

```tsx
<span style={{display:'inline-flex',alignItems:'center',gap:4}}>
  128.00 <SourceBadge source="REF" />
</span>
```

验收：10/12/16px、深浅底、200% 缩放、键盘/触屏说明、表格列对齐；SPC/REF 意义由数据模型提供，UI 不从字段是否可编辑反推。
