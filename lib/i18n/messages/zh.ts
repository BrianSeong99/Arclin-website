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
    { value: 0, fraction: 0, unit: "dB", label: "[GAP: night-time noise dB]" },
    { value: 0, fraction: 0, unit: "%", label: "[GAP: stand-up detection accuracy]" },
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

  contactH2a: "先发一封邮件。",
  contactH2b: "我们回复下一步。",
  contactBody: "告诉我们机构的状况，或产品所处的阶段。我们据此提出下一步。",
  contactCare: "介护机构由此联系",
  contactRobot: "机器人企业由此联系",

  partnerKicker: "合作方式",
  partnerH2: "我们与介护机构和机器人企业合作。",
  fitKicker: "适合的伙伴",
  partners: [
    { kicker: "介护机构", title: "介护机构", body: "想尝试机器人，却不知道什么在现场真正有效。我们从这个阶段起与您同行。", cta: "咨询导入事宜", fit: ["愿意探索新的介护技术", "具备可开展试点的环境", "有衡量成果的意愿", "能够获得员工参与", "对中长期导入有兴趣"], subject: "导入咨询" },
    { kicker: "机器人企业", title: "机器人企业", body: "技术已经有了，想进入日本市场。从演示到真实介护运营，我们一起缩短这段距离。", cta: "咨询日本市场拓展", fit: ["处于可实用阶段的机器人产品", "对日本市场有兴趣", "有本地化意愿", "具备API・集成能力", "长期的市场承诺"], subject: "日本市场拓展咨询" },
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
    kicker: "法律信息",
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

  // ---- v3（brief v3 IA）。方括号中的 [GAP: …] 是尚未确定的事实，确定后替换。 ----
  common: {
    siteName: "Arclin",
    skip: "跳到正文",
    navLabels: ["机器人", "介护机构", "家属", "安全", "联系我们"],
    menuOpen: "打开菜单",
    menuClose: "关闭菜单",
    dismiss: "关闭",
    footerColumns: { product: "产品与部署", company: "公司" },
    pageLabels: {
      robot: "机器人",
      careHomes: "介护机构",
      families: "家属",
      safety: "安全",
      deployment: "部署流程",
      newsroom: "新闻",
      careers: "招聘",
      contact: "联系我们",
      privacy: "隐私政策",
      terms: "使用条款",
    },
    legal: { privacy: "隐私政策", terms: "使用条款" },
    entity: "株式会社智渡仁 / Arclin K.K.",
    socials: { heading: "社交媒体", x: "X", linkedin: "LinkedIn", youtube: "YouTube" },
    localeNames: { ja: "日本語", en: "English", zh: "中文" },
    localeSwitch: "语言",
    gapNotice: "方括号中的 [GAP: …] 是尚未确定的事实的占位。确定后逐一替换为实际数值。",
    talkToUs: "和我们谈谈",
  },

  home: {
    meta: {
      title: "Arclin — 放在介护现场的陪伴机器人",
      description:
        "株式会社智渡仁提供在介护机构、日间照护中心和家中陪在老人身边的陪伴机器人。这里有规格、安全和部署流程。",
    },
    announce: { text: "面向介护机构的试点项目，正在受理。", cta: "联系我们" },
    hero: {
      line: "A companion robot, built for elder care.",
      cjkLine: "放在介护现场的陪伴机器人。",
      cta: "了解机器人",
      videoLabel: "机器人在楼层上活动的视频",
    },
    trustedBy: {
      eyebrow: "部署机构",
      facilities: ["[GAP: pilot facility 1 name]", "[GAP: pilot facility 2 name]", "[GAP: pilot facility 3 name]"],
      sentence: "在 [GAP: prefectures] 的 [GAP: number of pilot facilities] 家机构里，它陪在 [GAP: residents served] 位老人身边。",
      cta: "咨询部署",
    },
    robot: {
      eyebrow: "介护陪伴机器人",
      name: "Mimamori",
      sentences: [
        "高 [GAP: robot height] cm，重 [GAP: robot weight] kg。",
        "充一次电可运行 [GAP: battery life] 小时，除日语外还能听懂 [GAP: languages and dialects]。",
      ] as [string, string],
      cta: "查看规格",
    },
    scale: {
      figures: [
        { value: "[GAP: number of facilities running]", label: "运行中的机构" },
        { value: "[GAP: total hours logged on floors]", label: "累计运行小时" },
        { value: "[GAP: residents served]", label: "陪伴的老人" },
      ],
    },
    founder: {
      quote: "[GAP: founder quote — one or two factual sentences]",
      name: "[GAP: founder name]",
      title: "[GAP: founder title]",
    },
    safety: {
      sentences: [
        "它记录的是 [GAP: what it records — e.g. audio, video, movement events]。",
        "数据存放在 [GAP: where data is stored]，只有 [GAP: who can see the data] 能看到。",
      ] as [string, string],
      cta: "阅读安全与隐私",
    },
    markets: {
      eyebrow: "使用场所",
      rows: [
        {
          title: "介护机构",
          sentences: [
            "放在楼层里，陪在老人身边。",
            "员工的工作有什么变化，用部署机构的数字来说明：[GAP: measured change in staff routine at pilot sites]。",
          ] as [string, string],
          href: "/care-homes/",
          cta: "介护机构",
        },
        {
          title: "日间照护",
          sentences: [
            "只在日间服务时段运行。",
            "搬入和收纳需要 [GAP: setup and teardown time at a day service]。",
          ] as [string, string],
          href: "/care-homes/",
          cta: "咨询部署",
        },
        {
          title: "家中",
          sentences: [
            "在家里，它 [GAP: what it does at home]。",
            "家属会被告知什么、不会被告知什么，写在家属页面上。",
          ] as [string, string],
          href: "/families/",
          cta: "家属",
        },
      ],
    },
    interlude: {
      line: "一台机器人背后，有网络、更新和支持它的人。",
      cta: "查看部署流程",
    },
    closing: {
      line: "关于部署的谈话，从看现场开始。",
      cta: "和我们谈谈",
    },
  },

  robot: {
    meta: {
      title: "机器人 — Arclin",
      description: "Mimamori 的规格。高度、重量、续航时间、充电时间、传感器、速度、噪音、支持的语言、离线时的行为。",
    },
    hero: {
      eyebrow: "介护陪伴机器人",
      line: "放在楼层里的陪伴机器人。",
      highlight: "充一次电运行 [GAP: battery life] 小时",
    },
    specsTitle: "规格",
    specs: [
      { label: "高度", value: "[GAP: robot height] cm" },
      { label: "重量", value: "[GAP: robot weight] kg" },
      { label: "续航时间", value: "[GAP: battery life] 小时" },
      { label: "充电时间", value: "[GAP: charging time] 小时" },
      { label: "传感器", value: "[GAP: sensor suite]" },
      { label: "移动速度", value: "最高 [GAP: max speed] km/h" },
      { label: "噪音", value: "[GAP: noise level] dB" },
      { label: "支持的语言和方言", value: "[GAP: languages and dialects]" },
      { label: "离线时的行为", value: "[GAP: offline capability]" },
    ],
    whatItDoesTitle: "它做什么",
    blocks: [
      {
        title: "陪伴",
        body: "在楼层的固定位置等候，陪在老人身边。有人跟它说话，它用 [GAP: languages and dialects] 回答。",
      },
      {
        title: "日常帮助",
        body: "提醒日常安排的时间。帮什么、帮到哪一步：[GAP: daily tasks it performs, and their limits]。",
      },
      {
        title: "安全移动",
        body: "以最高 [GAP: max speed] km/h 移动，在障碍物前 [GAP: obstacle stop distance] cm 停下。有人摔倒时，它 [GAP: what it does when someone falls]。",
      },
      {
        title: "保持联系",
        body: "通过 [GAP: how it notifies — app, message, call] 通知员工和家属。通知什么、不通知什么，写在家属页面上。",
      },
    ],
    safetySummary: {
      title: "安全要点",
      body: "认证状态：[GAP: ISO 13482 status]。记录什么、数据放在哪里、保存多久，汇总在安全页面。",
      cta: "阅读安全",
    },
    inBox: {
      title: "箱内物品",
      items: ["机器人本体", "[GAP: remaining box contents — charger or dock, cables, printed guide]"],
    },
    facilityProvides: {
      title: "机构需要准备的",
      items: [
        "[GAP: network requirement — Wi-Fi band and bandwidth]",
        "[GAP: power outlet requirement]",
        "[GAP: floor space for charging]",
      ],
    },
    closing: { line: "到楼层上看看它。", cta: "和我们谈谈" },
  },

  careHomes: {
    meta: {
      title: "介护机构 — Arclin",
      description: "它在楼层上做什么，员工的工作有什么变化，运行它需要多少员工时间，试点如何开始。",
    },
    hero: { eyebrow: "介护机构", line: "楼层上放一台。员工的工作会怎样变。" },
    blocks: [
      {
        title: "在楼层上做什么",
        body: "在楼层的固定位置等候，陪在老人身边。夜间 [GAP: night-time behaviour — patrol, stationary, off]。",
      },
      {
        title: "员工的工作有什么变化",
        body: "员工放下的工作和新增的工作，用部署机构的记录来说明：[GAP: measured change in staff routine at pilot sites]。",
      },
      {
        title: "运行它需要的员工时间",
        body: "每天 [GAP: staff minutes per day to run it — charging, checks, log review] 分钟。明细写在部署流程页面。",
      },
      {
        title: "试点如何开始",
        body: "按现场勘查、员工培训、上线运行的顺序进行。从下单到运行需要 [GAP: time from order to running]。",
      },
    ],
    closing: { line: "把平面图和夜班安排给我们看。从那里开始。", cta: "和我们谈谈" },
  },

  families: {
    meta: {
      title: "家属 — Arclin",
      description: "和机器人在一起的一天，家属会被告知什么、不会被告知什么，如何联系到人。",
    },
    hero: { eyebrow: "家属", line: "父母身边，有一台机器人。" },
    day: {
      title: "一天的样子",
      body: "早上 [GAP: morning behaviour]。白天它陪在老人身边。晚上 [GAP: night behaviour]。",
    },
    told: {
      title: "会被告知的，不会被告知的",
      will: ["[GAP: what families are notified of — e.g. falls, missed meals]", "[GAP: how often a summary is sent]"],
      willNot: ["[GAP: what is not shared — e.g. audio, video, conversation content]"],
    },
    reach: {
      title: "联系到人",
      body: "联系机构员工：[GAP: how families reach staff]。联系 Arclin：[GAP: support contact and hours]。",
    },
    closing: { line: "有想问的，由人来回答。", cta: "联系我们" },
  },

  safety: {
    meta: {
      title: "安全 — Arclin",
      description:
        "认证状态、记录什么、数据存放在哪里、由谁管理、保存期限、撤回同意、身体安全、网络断开时的行为。",
    },
    hero: { eyebrow: "安全与隐私", line: "记录什么，放在哪里，谁能看。" },
    summaryTitle: "要点",
    summary: [
      { label: "认证状态", value: "[GAP: ISO 13482 status and Japanese regulatory position]" },
      { label: "记录什么", value: "[GAP: what it records]" },
      { label: "不记录什么", value: "[GAP: what it does not record]" },
      { label: "数据存放地点与管理方", value: "[GAP: where data is stored and under whose control]" },
      { label: "保存期限", value: "[GAP: retention period]" },
      { label: "撤回同意", value: "[GAP: how consent is withdrawn and what happens to the data]" },
      {
        label: "身体安全",
        value: "最高 [GAP: max speed] km/h。在障碍物前 [GAP: obstacle stop distance] cm 停止。有人摔倒时 [GAP: what it does if someone falls]。",
      },
      { label: "网络断开时", value: "[GAP: behaviour when the network drops]" },
    ],
    detailTitle: "详细",
    details: [
      {
        title: "认证状态",
        body: "ISO 13482：[GAP: ISO 13482 status]。在日本的监管定位：[GAP: Japanese regulatory position]。保险与责任范围：[GAP: insurance and liability model]。",
      },
      {
        title: "记录什么，不记录什么",
        body: "记录的是 [GAP: what it records]。不记录的是 [GAP: what it does not record]。",
      },
      {
        title: "数据存放地点与管理方",
        body: "数据存放在 [GAP: where data is stored]。管理方是 [GAP: who controls the data]。能查看的是 [GAP: who can see the data]。",
      },
      { title: "保存期限", body: "[GAP: retention period] 后删除。删除方式：[GAP: deletion method]。" },
      {
        title: "撤回同意",
        body: "通过 [GAP: how consent is withdrawn] 撤回同意。撤回后，数据 [GAP: what happens to data after withdrawal]。",
      },
      {
        title: "身体安全",
        body: "以最高 [GAP: max speed] km/h 移动，在障碍物前 [GAP: obstacle stop distance] cm 停下。有人摔倒时，它 [GAP: what it does if someone falls]。",
      },
      {
        title: "网络断开时",
        body: "网络断开后，它 [GAP: behaviour when the network drops]。恢复后 [GAP: what happens after reconnection]。",
      },
    ],
    closing: { line: "这里没写的，请问我们。", cta: "联系我们" },
  },

  deployment: {
    meta: {
      title: "部署流程 — Arclin",
      description: "从下单到运行的时间、现场勘查、员工培训、支持体制、网络要求、更新。",
    },
    hero: { eyebrow: "部署流程", line: "从下单到运行，[GAP: time from order to running]。" },
    blocks: [
      {
        title: "从下单到运行",
        body: "从下单到运行需要 [GAP: time from order to running]。这期间进行现场勘查和员工培训。",
      },
      {
        title: "现场勘查",
        body: "确认楼层动线、充电位置和网络状况。所需时间：[GAP: site survey duration]。",
      },
      { title: "员工培训", body: "[GAP: training duration and format]。培训对象：[GAP: which staff are trained]。" },
      {
        title: "支持体制",
        body: "联系渠道：[GAP: support channel]。响应时间：[GAP: support hours]。需要到现场时：[GAP: on-site response time]。",
      },
      {
        title: "网络要求",
        body: "[GAP: Wi-Fi band, bandwidth, ports]。网络断开时的行为写在安全页面。",
      },
      {
        title: "更新",
        body: "软件按 [GAP: update cadence] 更新。更新时段：[GAP: when updates are applied — e.g. at night while charging]。",
      },
    ],
    closing: { line: "从现场勘查开始。", cta: "和我们谈谈" },
  },

  newsroom: {
    meta: { title: "新闻 — Arclin", description: "株式会社智渡仁的公告。" },
    hero: { eyebrow: "新闻", line: "关于公司和产品的公告。" },
    intro: "有公告时，会发在这里。",
    entries: [] as { date: string; title: string; body: string; href?: string }[],
    empty: "暂无公告。",
  },

  careers: {
    meta: { title: "招聘 — Arclin", description: "在 Arclin 的工作、在招职位、申请方式。" },
    hero: { eyebrow: "招聘", line: "做放在介护现场的机器人。" },
    about:
      "我们做在介护机构楼层上运行的机器人，以及它背后的网络、更新和支持。工作地点在 [GAP: office location]，工作方式是 [GAP: remote or on-site policy]。",
    rolesTitle: "在招职位",
    roles: [] as { title: string; location: string; href?: string }[],
    rolesEmpty: "目前没有在招职位。",
    apply: {
      title: "申请方式",
      body: "发邮件告诉我们你的经历，以及对哪项工作感兴趣。回复需要 [GAP: response time]。",
      cta: "发送邮件",
      subject: "求职申请",
    },
  },

  contact: {
    meta: { title: "联系我们 — Arclin", description: "通过邮件联系。希望你写明的内容，以及回复所需的时间。" },
    hero: { eyebrow: "联系我们", line: "发邮件给我们。由人来读。" },
    emailLabel: "邮箱",
    subject: "咨询",
    include: { title: "希望你写明的", items: ["机构名称或所在地", "机构类型和入住人数", "想问的问题"] },
    responseTime: "回复所需时间：[GAP: response time]",
    cta: "发送邮件",
  },

  terms: {
    meta: { title: "使用条款 — Arclin", description: "株式会社智渡仁网站使用条款。" },
    kicker: "法律信息",
    title: "使用条款",
    updated: "最后更新：[PLACEHOLDER]",
    back: "返回首页",
    intro: "本条款规定株式会社智渡仁（以下简称“本公司”）网站的使用条件。",
    sections: [
      { h: "1. 适用范围", b: "[PLACEHOLDER — 法务确认后确定] 本条款适用于与本公司网站使用相关的一切关系。" },
      { h: "2. 禁止事项", b: "[PLACEHOLDER] 违反法律或公序良俗的行为，妨碍本公司服务运营的行为。" },
      { h: "3. 知识产权", b: "[PLACEHOLDER] 本网站的文字、图片、视频的权利归本公司或权利人所有。" },
      { h: "4. 免责", b: "[PLACEHOLDER] 本公司不对刊载内容的准确性作出保证。" },
      { h: "5. 适用法律与管辖", b: "[PLACEHOLDER] 适用日本法律，以 [PLACEHOLDER] 地方法院为第一审专属合意管辖法院。" },
      { h: "6. 咨询窗口", b: "[PLACEHOLDER] 联系邮箱。" },
    ],
    note: "本页各条款为法务审阅前的占位内容，上线前请确定。",
  },
};
