/** 中文文案。以 Claude Design「Arclin Homepage」模板的 COPY.zh 为准。[PLACEHOLDER] 待确认后替换。 */
import type { Messages } from "./ja";

export const zh: Messages = {
  metaTitle: "株式会社智渡仁 / Arclin K.K. — 让机器人成为日本介护的力量",
  metaDesc: "智渡仁（Arclin K.K.）连接机器人企业与日本介护现场，提供现场理解、本地化、安全验证到落地部署的全程支持。",
  ogTitle: "让机器人成为日本介护的力量 — Arclin K.K.",
  ogDesc: "连接机器人企业与日本介护现场的本地化・落地伙伴。",
  skip: "跳到正文",

  announce: "面向介护机构的试点项目，正在受理。",
  announceCta: "了解详情",

  navContact: "联系我们",
  nav: ["Mimamori", "CareOS", "落地流程", "合作方式"],

  heroTagline: "Care first. Technology follows.",
  heroH1a: "让机器人，",
  heroH1b: "成为日本介护的力量。",
  heroSub: "智渡仁连接机器人企业与日本介护现场，提供现场理解、本地化、安全验证到落地部署的全程支持。",
  heroCta1: "介护机构",
  heroCta2: "机器人企业",
  heroAlt: "老人起身瞬间机器人提供平衡支撑的线稿",
  heroCaption: "起身时的平衡支撑 — 概念示意",

  statementA: "不是重造机器人本身，",
  statementB: "而是构建让它适配日本介护现场的那一层。这就是智渡仁的工作。",

  productsKicker: "两大支柱",
  products: [
    {
      id: "mimamori",
      name: "Mimamori",
      sub: "守护支持",
      body: "守护型机器人不是介护人员的替代。白天、傍晚、夜间——在不同时段补上人眼难以顾及的瞬间。起身瞬间提供平衡支撑，记录饮水与用餐，察觉对话模式的变化。",
      note: "不以搬运、抱起为目的。不是诊断，而是交由专业人员复核的契机。",
      cta: "查看 Mimamori",
    },
    {
      id: "careos",
      name: "CareOS",
      sub: "适配・运营基础",
      body: "一台机器人不足以成功落地。从介护体验、适配、机器人智能到运营基础设施——本地化、介护工作流、对话设计、安全策略、设备管理、日志、隐私、更新、运行监控，这整套系统我们称为 CareOS。",
      note: "机器人核心技术属于合作方的知识产权；适配・集成层是智渡仁的知识产权。",
      cta: "查看 CareOS",
    },
  ],

  demo: "演示数据／概念示意",
  source: "出处・性质",

  statsKicker: "为什么是日本",
  statsH2: "日本的介护，正处在重大转折点。",
  stats: [
    { value: 29.3, decimals: 1, unit: "%", label: "老龄化率", sub: "65岁以上人口占总人口比例", source: "日本总务省统计局《人口推计》（2024年）。上线前请核对最新数值。" },
    { value: 57, decimals: 0, unit: "万人", label: "介护人员预计缺口", sub: "与2040年度所需人数之差", source: "日本厚生劳动省《基于第9期介护保险事业计划的介护人员需求数》。上线前请核对。" },
    { value: 14, decimals: 0, unit: "万亿日元", label: "介护费用（年）", sub: "介护保险给付总费用规模", source: "日本厚生劳动省《介护保险事业状况报告》。概算值，上线前请核对。" },
  ],
  trendTitle: "老龄化率变化（65岁以上人口占比）",
  trendNote: "2020年以后为推算值",
  trendSource: "出处：日本总务省《人口推计》／国立社会保障・人口问题研究所《日本未来推算人口》。上线前请核对最新数值。",
  quoteA: "不是从机器人出发，",
  quoteB: "而是从介护现场出发。",
  quoteBy: "株式会社智渡仁",
  kpiTitle: "验收指标示例",
  kpis: [
    { value: 42, fraction: 0.42, unit: "dB", label: "夜间运行噪音" },
    { value: 96, fraction: 0.96, unit: "%", label: "起身检测准确率" },
  ],
  kpiNote: "以上为概念示例。实际验收指标在试点设计阶段与机构共同商定，并非实测结果。",

  processKicker: "落地流程",
  processH2: "落地，从一起理解现场开始。",
  processCta: "咨询",
  steps: [
    {
      id: "s1",
      title: "需求・现场理解",
      body: "走访机构，掌握动线、业务、夜班体制与既有设备。用餐、排泄、夜间巡视——介护的一天有其固有节奏，技术必须顺应这个节奏。",
      walls: ["现场观察与业务流程分析", "入住者动线", "员工日常", "夜班体制"],
    },
    {
      id: "s2",
      title: "本地化开发",
      body: "推进日语UI、介护工作流与安全策略的适配。翻译远远不够。需要老人和员工都能自然使用的措辞、界面与语音设计。",
      walls: ["面向介护场景的日语UI与语音", "安全标准适配与验证计划", "同意、保存与删除的运营机制"],
    },
    {
      id: "s3",
      title: "现场验证",
      body: "在限定区域试点，用指标确认效果与问题。每家机构的动线、设备、Wi-Fi、夜班体制都不同。部署不是“放在那里”就结束。",
      walls: ["逐机构部署计划", "验收指标共识", "限定区域试点"],
    },
    {
      id: "s4",
      title: "正式上线",
      body: "建立运营体制，进入持续改进循环。上线后的咨询、更新、设备管理。没有持续体制，就无法在现场扎根。",
      walls: ["运营支持与改进循环", "设备管理、更新与运行监控", "数据所在与权限文档化"],
    },
  ],

  contactH2a: "介护与机器人的未来，",
  contactH2b: "要不要一起创造？",
  contactBody: "先通过邮件告诉我们。我们会根据机构状况或产品阶段，提出下一步建议。",
  contactCare: "介护机构由此联系",
  contactRobot: "机器人企业由此联系",

  partnerKicker: "合作方式",
  partnerH2: "一起，推动日本介护向前。",
  fitKicker: "适合的伙伴",
  partners: [
    { kicker: "FOR CARE FACILITIES", title: "介护机构", body: "想尝试机器人，却不知道什么在现场真正有效。我们从这个阶段起与您同行。", cta: "咨询导入事宜", fit: ["愿意探索新的介护技术", "具备可开展试点的环境", "有衡量成果的意愿", "能够获得员工参与", "对中长期导入有兴趣"], subject: "导入咨询" },
    { kicker: "FOR ROBOTICS COMPANIES", title: "机器人企业", body: "技术已经有了，想进入日本市场。从演示到真实介护运营，我们一起缩短这段距离。", cta: "咨询日本市场拓展", fit: ["处于可实用阶段的机器人产品", "对日本市场有兴趣", "有本地化意愿", "具备API・集成能力", "长期的市场承诺"], subject: "日本市场拓展咨询" },
  ],
  trust: [
    { title: "安全", body: "依据适用的安全标准与法规进行设计与验证。涉及身体接触的支撑以风险评估为前提。" },
    { title: "隐私", body: "影像、语音、生活数据仅限必要最小范围，明确保存期限与删除机制。" },
    { title: "人的判断", body: "最终判断始终由介护人员做出。技术只是提示复核，不做诊断或决定。" },
  ],
  trustNote: "认证与标准适配状况仅刊载已确定的内容。",

  companyKicker: "公司概要",
  companyTagline: "Technology becomes meaningful only when it works in everyday life.",
  company: [
    { k: "公司名", v: "株式会社智渡仁 / Arclin K.K." },
    { k: "所在地", v: "[PLACEHOLDER]", ph: true },
    { k: "业务内容", v: "介护机器人面向日本市场的本地化、安全验证、部署与运营支持" },
  ],
  footerName: "株式会社智渡仁 / Arclin K.K.",
  privacy: "隐私政策",
  otherLang: "日本語",
  disclaimer: "具体报价与费率以项目范围、双方洽谈结果及正式签署的协议为准。我们卖的不是「通用化产品」，而是「通用化适配能力」。登记信息可通过日本国税厅法人番号公表网站查询。",

  privacyPage: {
    kicker: "PRIVACY",
    title: "隐私政策",
    updated: "最后更新：[PLACEHOLDER]",
    back: "返回首页",
    other: "日本語",
    intro: "株式会社智渡仁（以下简称“本公司”）就本公司网站及服务中个人信息的处理，规定如下。",
    sections: [
      { h: "1. 收集的信息", b: "[PLACEHOLDER — 法务确认后确定] 咨询时提供的姓名、所属、邮箱等。" },
      { h: "2. 使用目的", b: "[PLACEHOLDER] 回复咨询、介绍服务。" },
      { h: "3. 向第三方提供", b: "[PLACEHOLDER] 除法律规定外，未经本人同意不向第三方提供。" },
      { h: "4. 保存期限与删除", b: "[PLACEHOLDER] 目的达成后在适当期限内删除。" },
      { h: "5. 安全管理", b: "[PLACEHOLDER] 采取访问权限管理等适当的安全管理措施。" },
      { h: "6. 披露・更正・删除请求", b: "[PLACEHOLDER] 对本人请求依法处理。" },
      { h: "7. 咨询窗口", b: "[PLACEHOLDER] 联系邮箱。" },
    ],
    note: "本页各条款为法务审阅前的占位内容，上线前请确定。",
  },
};
