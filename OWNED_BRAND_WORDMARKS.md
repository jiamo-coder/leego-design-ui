# 自有品牌字标与品牌按钮

图标库资产版本 2.25.8；不改变全局 UI 几何、字体或版本接口。

| 品牌 | 稳定 ID | 变体 |
| --- | --- | --- |
| 狗福福 / Gofofo | `brand.gofofo` | `primary`：完整中英组合透明 PNG；`capsule`：静态胶囊展示版 |
| 柏善堂 / BAISENSE | `brand.baisense` | `primary`：完整中英组合；`button`：原中文字形透明紧凑版；`capsule`：静态胶囊展示版 |

依据：用户在 2026-10-15 提供两张品牌原件并要求收录到 UI Skill。只用于其品牌界面、品牌选择与项目呈现；不转授商标权。原文件与处理记录见 `assets/icons/owned-brands/catalog.json`。

两份上传原件本来就带透明通道，本次只无损裁掉多余透明边距，保留每个可见像素。狗福福蓝 `#004882`，柏善堂绿 `#064231`，仅属于各自品牌。保持原字形、颜色、阅读顺序与长宽比；不拿系统字体重打，不套 App 图标底板，不拉伸成扁字。PNG 是栅格资产，不标为可编辑 SVG。白色底板与透明背景必须区分。

## 选择使用形式

- 独立品牌展示、正式标题用 `primary`。柏善堂完整中英组合建议可见宽度至少 144 CSS px；更小字段用 `button`，保留可访问名称“柏善堂”。
- 窄长按键用柏善堂 `button` 中文紧凑版，建议可见宽度 96–112 px、热区至少 144×48 px。完整组合的字距与字形不改变；仅按既定响应式规则省去英文行，不能把它当新的品牌主标。
- 狗福福使用完整组合，建议可见宽度至少 96 px、容器高度至少 72 px。需要更小身份入口时另行设计，不能把整个字标强塞进 20px 导航槽。
- 图片为透明底，按钮的背景、边框、焦点环、选中对勾由真实组件绘制。深色画布可用浅色按钮承载；不要用 CSS filter 随意改变品牌色。
- 互斥品牌切换可使用一组带可访问名称与 `aria-pressed` 的原生按钮；选中不能仅靠颜色，还要有对勾或“当前”文字。Tab / Enter / Space 可操作；焦点不随切换丢失。真业务确认切换成功后再更新状态，不伪造保存或权限变化。
- 同一组按最大高度对齐，遵守 Web 至少44px、原生至少48dp热区；用户文字放大时容器允许增长。
- 胶囊采用 `border-radius:999px`。普通横向按钮建议168×56px，完整中英字标采用196×88px。双品牌切换共用一个淡中性轨道，当前项为白色实面＋对勾；不在 Logo 上叠加指示点，不做不停闪烁。`capsule` 仅用于静态方案/图谱展示，交互场景必须使用实际按钮。
- 可复制的 HTML/CSS/键盘示例位于 `assets/brand-buttons/index.html`，引用随包 `assets/icons/owned-brands/`，无外部依赖。MiSans 由消费者按字体规范接入；本示例只声明回退栈，不代表字库已加载。

## 引用

API 根地址：`https://smalltypeui.qiaokiai.com/skills/leego-design-ui/site/icon-api/v1`。

```html
<button type="button" aria-label="柏善堂" aria-pressed="true">
  <img src="https://smalltypeui.qiaokiai.com/skills/leego-design-ui/site/icon-api/v1/icons/brand.baisense/button"
       alt="" style="width:104px;height:28px;object-fit:contain" />
  <span aria-hidden="true">✓</span>
</button>
```

字标优先 `<img>`，不要使用默认方形 `LeegoIcon size={20}`。长宽由容器控制并 `object-fit:contain`。离线回退位于 `assets/icons/owned-brands/`；不复制整个图标库，不执行远程脚本。按[图标服务](icon-service.md)核验 stable 与文件哈希后引用。

交互示例：`/skills/leego-design-ui/site/brand-buttons/`。这是界面示例，切换只演示视觉状态，不代表真实租户、账号或数据范围切换。
