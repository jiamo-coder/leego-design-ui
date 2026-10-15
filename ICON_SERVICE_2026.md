# Leego Icon Service · 2.25.4

接入前先请求下述 stable 地址，确认可用版本与目录哈希。2.25.0 的本地实现/安装不等于公网已发布；发布未完成或端点不可达时使用已校验的本地资产，不把计划中的生产地址当已可用服务。

六款 `system.*` 使用 V018 家族（产品中心为 V019 扩展）。将远端条目的 variant SHA-256 与 `assets/system-identity-family.json` 对照；若远端仍是旧版，不用旧图替代，使用本地 `assets/icons/system-identities/` 已校验文件。当前目录快照另见 `assets/icon-library.json`。2.25.4 修复目录绑定漏更新，是否上线仍须核验公网实际哈希。

## 选择与复用

官网图标库： https://smalltypeui.qiaokiai.com/skills/leego-design-ui/site/icons

接入文档： https://smalltypeui.qiaokiai.com/skills/leego-design-ui/site/icons/docs

先按语义查询目录与稳定 ID，使用真实存在的版本，不重画已采纳品牌，不为每个业务项目复制整套资产。兼容的历史 Skill 资产暂保留；新项目首选远程图像与本地小适配器。没有远程能力时使用关键本地回退，不阻塞主要任务。

API 根地址：`https://smalltypeui.qiaokiai.com/skills/leego-design-ui/site/icon-api/v1`。

| GET 路径 | 结果与缓存 |
|---|---|
| `/channels/stable.json` | 当前版本、目录 URL、SHA-256；60秒后重新验证 |
| `/releases/2.25.0.json` | 固定目录快照；一年 immutable |
| `/icons/skill.leego-ui/app` | 307 到当前原件；60秒缓存；适合独立图片 |
| `/assets/{sha256}.{svg\|png\|webp}` | 不可变原件；一年缓存，ETag |

支持 GET/HEAD/OPTIONS、匿名跨域 CORS、If-None-Match → 304；无凭证、无遥测。未知 ID/版本/格式为404，参考素材为403，不存在的变体为404；响应 JSON `{error: "..."}`。错误不缓存。API v1 是协议版本，不是设计资产版本。

目录包含 `schemaVersion/version/base/categories/entries`。每项包括 `id/label/aliases/category/source/rights/defaultVariant/variants`；变体包含相对 `url/sha256/format/bytes`。`reference-only` 条目没有可调用资产，不允许用官网参考原图绕过此限制。

## Web

单张静态 HTML 可用稳定链接：

```html
<img src="https://smalltypeui.qiaokiai.com/skills/leego-design-ui/site/icon-api/v1/icons/skill.leego-ui/app"
     width="40" height="40" alt="Leego UI" />
```

整套系统使用 [client.ts](../assets/icon-service/client.ts) 与 [LeegoIcon.tsx](../assets/icon-service/LeegoIcon.tsx) 本地审阅后随应用打包，不从 stable 下载执行 JS。并非已发布 npm 包。

```tsx
import {loadIconSnapshot} from './icons/client';
import {LeegoIcon, LeegoIconContext} from './icons/LeegoIcon';
// 浏览器启动阶段，只加载一次；SSR 阶段使用已固定的初始目录或关键本地回退。
const {snapshot, fromCache} = await loadIconSnapshot({storage: localStorage});
// 在应用入口提供同一 snapshot；不要让每个图标单独拉目录。
<LeegoIconContext.Provider value={{snapshot}}>
  <LeegoIcon name="skill.leego-ui" variant="app" size={40} label="界面设计" />
  <LeegoIcon name="ui.search" variant="mono" size={20} />
</LeegoIconContext.Provider>
```

快照按启动/刷新/用户允许的安全边界更换，不能在操作中热替换品牌家族。`fromCache` 表示最近一次验证成功的目录；它不保证此前从未加载过的图片离线可用。适配器校验目录哈希和资产URL，目录缓存失败则保留内存；原件依赖浏览器 HTTP 缓存。关键导航传入本地 `fallback`。固定版本传 `{version:'2.25.0'}`。

品牌用 `<img>` 保真。通用单色图标可通过受信来源的 CSS mask 使用 `currentColor`；不要依赖跨域 SVG `<use>`，也不把任意远程 SVG 字符串注入 HTML。允许域配置 CSP `img-src` 到此主机，fetch目录配置 `connect-src`；按实际项目验证 mask 的 CSP。

## 原生 Android

企迈、金蝶、飞书、美团与美团收银 ERP 已登记的托管集成图标见 [生态 App 图标](external-app-icons.md)。目录中的 `usageScope` / `permission` 是对 `project-reuse` 的具体范围限制，不可把它理解成无条件商标授权；其余 `reference-only` 项仍不开放引用。

采用同一目录协议，不把 Web 验收当 App 验收：

1. INTERNET 权限；使用项目已有 HTTP 客户端，在 IO 线程获取 stable → 校验目录SHA → 解析完整快照 → 原子保存应用私有目录。
2. 从 `entries` 按准确 ID/variant 取 URL；只允许 API 根下 `/assets/{sha256}.{format}`。先查 `rights`，不以 label 当键。后台刷新但在下一安全生命周期点提交快照。
3. PNG/WebP 可用原生解码；SVG 使用项目已审 SVG 解码器。没有解码器时优先选真实存在的 PNG 变体，不假称所有图标有 PNG，也不把 SMIL 当原生动画。
4. 下载校验资产 SHA-256，通过后原子落盘；失败保留上次成功文件，首次失败使用关键本地图标。缓存保留当前及上次快照引用的文件，磁盘上限由产品指定。
5. 应用内图片可以远程更新；Launcher 图标仍按平台打包/切换机制，不能承诺只更新服务器即可更换桌面图标。

示例：[AndroidIconRepository.kt](../assets/icon-service/AndroidIconRepository.kt)，仅依赖 Android SDK/org.json，网络在工作线程执行。UI 负责生命周期、解码和尺寸（sp/dp），不在主线程下载。

## 动效

图标库只在用户点击播放时预览；列表静态。React组件 `variant="animated" active={true}` 仅在可见、前台且未要求减少动态时加载动画；暂停退静态，卸载清理观察器。SMIL恢复会从头播放；需要精确暂停/续播用已收录本地运行器，详见 [motion-icons.md](motion-icons.md)。原生默认静态，另行实现验证动画。

## 发布、兼容与回滚

先生成并测试完整目录与全部原件，发布哈希文件和固定快照，逐个校验 HTTP/CORS/hash；最后原子切换 stable 指针。保留已发布的哈希文件与旧快照，不能用新版本清理旧版本所需文件。回滚只切 stable 到既有完整快照，不覆盖同名 release JSON。迁移或删除 ID 要显式登记 replacement/deprecation，不把一个旧 ID 偷换为另一品牌。尚未有跨版本迁移实例，勿宣称所有历史 URL 都兼容。

发布门禁区分：源/安装/ZIP一致、浏览器可用、线上可用、Android编译、真机与TalkBack；无法执行的检查标未验证。服务不可达不应阻止登录、导航和退出等关键业务。
