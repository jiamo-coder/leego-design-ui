// Generated from design-system/tokens.json.
// Design Standard: Leego Design UI
// Standard ID: leego-design-ui
// Version: 2.14.0
export type UiDesignRead = {
  mode: 'new-design' | 'audit' | 'implementation';
  platform: 'web' | 'mobile' | 'tablet' | 'website';
  primaryUser: string;
  primaryTask: string;
  successCriteria: string[];
  templateIds: string[];
  protectedElements: string[];
  subtractionTargets: string[];
  openDecisions: string[];
};
export type UiQualityRule = {
  id: string;
  category: 'intake' | 'redundancy' | 'typography' | 'icon' | 'shell' | 'interaction' | 'accessibility';
  severity: 'P0' | 'P1' | 'P2';
  automated: boolean;
  message: string;
};
export const uiQualityCatalog = {
  "standard": "leego-design-ui",
  "version": "2.14.0",
  "updated": "2026-08-30",
  "designReadRequiredFields": [
    "mode",
    "platform",
    "primaryUser",
    "primaryTask",
    "successCriteria",
    "templateIds",
    "protectedElements",
    "subtractionTargets",
    "openDecisions"
  ],
  "elementPurposes": [
    "context",
    "decision",
    "action",
    "state-risk",
    "evidence",
    "accessibility"
  ],
  "protectedContent": [
    "object-identity",
    "scope-and-time",
    "risk-conclusion",
    "data-freshness",
    "permission-context",
    "evidence-source",
    "error-recovery",
    "required-help",
    "legal-and-safety"
  ],
  "rules": [
    {
      "id": "UI-SESSION-001",
      "category": "interaction",
      "severity": "P0",
      "automated": false,
      "message": "退出与会话过期必须映射真实能力，覆盖成功、失败重试和安全返回；不把 toast 或前端布尔值当认证。"
    },
    {
      "id": "UI-SESSION-002",
      "category": "redundancy",
      "severity": "P1",
      "automated": false,
      "message": "账号与全局操作单点归属；Web 顶栏不与侧栏重复身份，Mobile 在我的页，Pad 使用专用账号入口。"
    },
    {
      "id": "UI-SESSION-003",
      "category": "shell",
      "severity": "P1",
      "automated": true,
      "message": "登录表单400px上限、48px控件、16px字段间距；演示状态不连接真实后台。"
    },
    {
      "id": "UI-INTAKE-001",
      "category": "intake",
      "severity": "P0",
      "automated": false,
      "message": "进入设计前必须完成 UI-ready 判断；不得询问仓库中可发现的事实。"
    },
    {
      "id": "UI-INTAKE-002",
      "category": "intake",
      "severity": "P1",
      "automated": false,
      "message": "缺少关键决策时每轮只询问 1–3 个问题，并给出推荐答案。"
    },
    {
      "id": "UI-REDUNDANCY-001",
      "category": "redundancy",
      "severity": "P0",
      "automated": true,
      "message": "固定工作顶栏下不得出现重复 PageHeader、英文眉题、大标题和用途介绍。"
    },
    {
      "id": "UI-REDUNDANCY-002",
      "category": "redundancy",
      "severity": "P1",
      "automated": false,
      "message": "同一 KPI、全局操作或筛选不得在同一视觉路径重复表达。"
    },
    {
      "id": "UI-REDUNDANCY-003",
      "category": "redundancy",
      "severity": "P1",
      "automated": false,
      "message": "没有独立层级作用的嵌套卡片、边框、背景和阴影应删除或合并。"
    },
    {
      "id": "UI-TYPOGRAPHY-001",
      "category": "typography",
      "severity": "P0",
      "automated": true,
      "message": "所有可见文字不得低于 12px。"
    },
    {
      "id": "UI-TYPOGRAPHY-002",
      "category": "typography",
      "severity": "P0",
      "automated": true,
      "message": "字重只允许 400、500、600、700。"
    },
    {
      "id": "UI-ICON-001",
      "category": "icon",
      "severity": "P1",
      "automated": true,
      "message": "全局导航不得使用未登记的 Unicode 或 Emoji 字符代替通用图标。"
    },
    {
      "id": "UI-ICON-002",
      "category": "icon",
      "severity": "P1",
      "automated": false,
      "message": "图标必须遵循 24×24 网格、1.75px 线宽、规定尺寸和所在表面颜色。"
    },
    {
      "id": "UI-SHELL-001",
      "category": "shell",
      "severity": "P0",
      "automated": true,
      "message": "企业 Web 工作台侧栏、顶栏和内容间距必须匹配固定令牌。"
    },
    {
      "id": "UI-INTERACTION-001",
      "category": "interaction",
      "severity": "P0",
      "automated": false,
      "message": "启用状态的控件必须有真实行为或明确原型反馈。"
    },
    {
      "id": "UI-INTERACTION-002",
      "category": "interaction",
      "severity": "P1",
      "automated": true,
      "message": "禁止 transition: all；只声明实际发生变化的属性。"
    },
    {
      "id": "UI-INTERACTION-003",
      "category": "interaction",
      "severity": "P1",
      "automated": false,
      "message": "可复用组件应覆盖 Default、Hover、Focus-visible、Active、Disabled、Loading、Error、Success。"
    },
    {
      "id": "UI-ACCESSIBILITY-001",
      "category": "accessibility",
      "severity": "P0",
      "automated": false,
      "message": "纯图标按钮必须有可访问名称和至少 44px 的触控热区。"
    },
    {
      "id": "UI-ACCESSIBILITY-002",
      "category": "accessibility",
      "severity": "P0",
      "automated": false,
      "message": "简化不得删除风险、权限、数据新鲜度、错误恢复和必要帮助。"
    }
  ]
} as const;
export const uiQualityRules = uiQualityCatalog.rules as readonly UiQualityRule[];
