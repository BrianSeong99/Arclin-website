/**
 * English copy. Written in its own register, not translated word for word from ja.
 * [PLACEHOLDER] is swapped once registration and contact details are confirmed.
 * A bracketed GAP marker stands for a fact that is not yet known. The site renders it as-is.
 */
import type { Messages } from "./ja";

export const en: Messages = {
  metaTitle: "Arclin K.K. (株式会社智渡仁) — Robots for Japanese elder care.",
  metaDesc:
    "Arclin K.K. connects robotics companies with Japanese care facilities. Site understanding, localization, safety verification and deployment.",
  ogTitle: "Robots for Japanese elder care — Arclin K.K.",
  ogDesc: "A localization and deployment partner between robotics companies and Japanese care facilities.",
  skip: "Skip to content",

  announce: "Pilot program for care facilities: applications open.",
  announceCta: "Read more",

  navContact: "Contact",
  nav: ["Mimamori", "CareOS", "Deployment", "Partners"],

  heroTagline: "Care first. Technology follows.",
  heroH1a: "Robots,",
  heroH1b: "for Japanese elder care.",
  heroSub:
    "Arclin connects robotics companies with Japanese care facilities and handles site understanding, localization, safety verification and deployment.",
  heroCta1: "For care facilities",
  heroCta2: "For robotics companies",
  heroAlt: "Line drawing of a robot steadying an older person at the moment of standing up",
  heroCaption: "Balance support while standing — concept drawing",

  statementA: "We do not rebuild the robot.",
  statementB: "We build the layer that adapts it to a Japanese care floor. That is Arclin's work.",

  productsKicker: "Two pillars",
  products: [
    {
      id: "mimamori",
      name: "Mimamori",
      sub: "Watch-over support",
      body: "A watch-over robot does not replace care staff. In the day, the evening and at night, it covers the moments no one can see. It steadies a person at the moment of standing, records drinking and meals, and notices when conversation patterns change.",
      note: "It does not carry or lift. It does not diagnose; it prompts a professional to check.",
      cta: "See Mimamori",
    },
    {
      id: "careos",
      name: "CareOS",
      sub: "Adaptation and operations platform",
      body: "One robot on its own does not make a deployment. From the care experience to adaptation, robot intelligence and operations infrastructure: localization, care workflows, dialogue design, safety policy, device management, logs, privacy, updates and uptime monitoring. All of it is CareOS.",
      note: "The robot's core technology is the partner's IP. The adaptation and integration layer is Arclin's.",
      cta: "See CareOS",
    },
  ],

  demo: "Demo data / concept",
  source: "Source and nature",

  statsKicker: "Why Japan",
  statsH2: "Japanese elder care is at a turning point.",
  stats: [
    {
      value: 29.3,
      decimals: 1,
      unit: "%",
      label: "Share of population aged 65+",
      sub: "People aged 65 and over as a share of the total population",
      source: "Statistics Bureau of Japan, Population Estimates (2024). Confirm the latest figure before publishing.",
    },
    {
      value: 570,
      decimals: 0,
      unit: "thousand",
      label: "Projected care worker shortfall",
      sub: "Gap against the number needed in fiscal 2040",
      source:
        "Ministry of Health, Labour and Welfare, care workers required under the 9th long-term care insurance plan. Confirm before publishing.",
    },
    {
      value: 14,
      decimals: 0,
      unit: "trillion yen",
      label: "Annual long-term care cost",
      sub: "Total long-term care insurance benefits",
      source: "Ministry of Health, Labour and Welfare, Long-Term Care Insurance Status Report. Approximate; confirm before publishing.",
    },
  ],
  trendTitle: "Share of population aged 65 and over",
  trendNote: "Projected from 2020",
  trendSource:
    "Sources: Statistics Bureau of Japan, Population Estimates; National Institute of Population and Social Security Research, Population Projections for Japan. Confirm the latest figures before publishing.",
  quoteA: "Start from the care floor,",
  quoteB: "not from the robot.",
  quoteBy: "Arclin K.K.",
  kpiTitle: "Example acceptance metrics",
  kpis: [
    { value: 0, fraction: 0, unit: "dB", label: "[GAP: night-time noise dB]" },
    { value: 0, fraction: 0, unit: "%", label: "[GAP: stand-up detection accuracy]" },
  ],
  kpiNote: "These are concept examples. Actual acceptance metrics are agreed with each facility when the pilot is designed. They are not measured results.",

  processKicker: "Deployment",
  processH2: "Deployment starts with understanding the floor together.",
  processCta: "Talk to us",
  steps: [
    {
      id: "s1",
      title: "Site understanding",
      body: "We visit the facility and map its walking routes, tasks, night-shift structure and existing equipment. Meals, toileting, night rounds: a care day has its own rhythm, and the technology has to fit it.",
      walls: ["Floor observation and workflow analysis", "Resident walking routes", "Staff daily routine", "Night-shift structure"],
    },
    {
      id: "s2",
      title: "Localization",
      body: "We adapt the Japanese UI, the care workflows and the safety policy. Translation is not enough. Residents and staff need words, displays and voices they can use without thinking about them.",
      walls: ["Japanese UI and voice for care settings", "Safety standard compliance and verification plan", "Consent, retention and deletion procedures"],
    },
    {
      id: "s3",
      title: "On-site verification",
      body: "We run a pilot in one limited area and check results and problems against agreed metrics. Every facility has its own routes, equipment, Wi-Fi and night shifts. Deployment is not finished when the robot is placed.",
      walls: ["A deployment plan per facility", "Agreed acceptance metrics", "A pilot in one limited area"],
    },
    {
      id: "s4",
      title: "Full deployment",
      body: "We set up the operating structure and move to a continuing improvement cycle. Questions after deployment, updates, device management: without a structure that continues, nothing stays on the floor.",
      walls: ["Operations support and improvement cycle", "Device management, updates and uptime monitoring", "Documented data location and access rights"],
    },
  ],

  contactH2a: "Start with an email.",
  contactH2b: "We reply with a next step.",
  contactBody: "Tell us about the facility or the product. The next step we propose fits its situation or its stage.",
  contactCare: "Care facilities: write here",
  contactRobot: "Robotics companies: write here",

  partnerKicker: "Partnership",
  partnerH2: "We work with care facilities and robotics companies.",
  fitKicker: "Who we work with",
  partners: [
    {
      kicker: "For care facilities",
      title: "For care facilities",
      body: "You want to look at robots but do not know what actually works on a floor. We start from there.",
      cta: "Talk about deployment",
      fit: [
        "Open to exploring new care technology",
        "Able to host a pilot",
        "Willing to measure results",
        "Staff who will take part",
        "Interest in medium- to long-term deployment",
      ],
      subject: "Deployment inquiry",
    },
    {
      kicker: "For robotics companies",
      title: "For robotics companies",
      body: "You have the technology and want to enter Japan. We close the distance between a demo and real care operations.",
      cta: "Talk about entering Japan",
      fit: [
        "A robotics product at a practical stage",
        "Interest in the Japanese market",
        "Willingness to localize",
        "API and integration support",
        "A long-term commitment to the market",
      ],
      subject: "Japan market inquiry",
    },
  ],
  trust: [
    {
      title: "Safety",
      body: "We design and verify against the applicable safety standards and regulations. Any support involving physical contact starts with a risk assessment.",
    },
    {
      title: "Privacy",
      body: "Video, audio and daily-life data are kept to the minimum needed. Retention periods and deletion procedures are stated.",
    },
    {
      title: "Human judgment",
      body: "The final decision always rests with care staff. The technology prompts a check. It does not diagnose or decide.",
    },
  ],
  trustNote: "We publish certification and compliance status only once it is confirmed.",

  companyKicker: "Company",
  companyTagline: "Technology becomes meaningful only when it works in everyday life.",
  company: [
    { k: "Company name", v: "Arclin K.K. (株式会社智渡仁)" },
    { k: "Address", v: "[PLACEHOLDER]", ph: true },
    { k: "Business", v: "Localization, safety verification, deployment and operations support for care robotics in the Japanese market" },
  ],
  footerName: "Arclin K.K. (株式会社智渡仁)",
  privacy: "Privacy policy",
  otherLang: "日本語",
  disclaimer:
    "Quotes and rates depend on project scope, discussion and the signed contract. We provide adaptation capability, not a general-purpose product. Registration details can be checked on the National Tax Agency corporate number site.",

  privacyPage: {
    kicker: "Legal",
    title: "Privacy policy",
    updated: "Last updated: [PLACEHOLDER]",
    back: "Back to top",
    other: "日本語",
    intro: "Arclin K.K. (the company) sets out below how it handles personal information on its website and in its services.",
    sections: [
      { h: "1. Information we collect", b: "[PLACEHOLDER — to be confirmed after legal review] Name, organization and email address provided when you contact us." },
      { h: "2. Purpose of use", b: "[PLACEHOLDER] Responding to inquiries and providing information about our services." },
      { h: "3. Disclosure to third parties", b: "[PLACEHOLDER] We do not disclose personal information to third parties without consent, except as required by law." },
      { h: "4. Retention and deletion", b: "[PLACEHOLDER] Deleted within an appropriate period after the purpose is fulfilled." },
      { h: "5. Security", b: "[PLACEHOLDER] Appropriate security measures, including access control." },
      { h: "6. Requests for disclosure, correction or deletion", b: "[PLACEHOLDER] Requests from the individual are handled in accordance with the law." },
      { h: "7. Contact", b: "[PLACEHOLDER] Contact email address." },
    ],
    note: "Every section on this page is a placeholder pending legal review. Confirm before publishing.",
  },

  // ---- v3 (brief v3 IA). [GAP: …] marks a fact not yet known. Replace once confirmed. ----
  common: {
    siteName: "Arclin",
    skip: "Skip to content",
    navLabels: ["The robot", "Care homes", "Families", "Safety", "Contact"],
    menuOpen: "Open menu",
    menuClose: "Close menu",
    dismiss: "Dismiss",
    footerColumns: { product: "Product and deployment", company: "Company" },
    pageLabels: {
      robot: "The robot",
      careHomes: "Care homes",
      families: "Families",
      safety: "Safety",
      deployment: "Deployment",
      newsroom: "Newsroom",
      careers: "Careers",
      contact: "Contact",
      privacy: "Privacy policy",
      terms: "Terms",
    },
    legal: { privacy: "Privacy policy", terms: "Terms" },
    entity: "Arclin K.K. (株式会社智渡仁)",
    socials: { heading: "Social", x: "X", linkedin: "LinkedIn", youtube: "YouTube" },
    localeNames: { ja: "日本語", en: "English", zh: "中文" },
    localeSwitch: "Language",
    gapNotice: "A bracketed [GAP: …] marks a fact that is not yet confirmed. Each one is replaced with the confirmed value.",
    talkToUs: "Talk to us",
    tagline: "A warmer tomorrow",
  },

  home: {
    meta: {
      title: "Arclin — A companion robot for elder care",
      description:
        "Arclin K.K. makes a companion robot that stays beside residents in care homes, day services and at home. Specifications, safety and how deployment works.",
    },
    announce: { text: "Pilot program for care facilities: applications open.", cta: "Contact" },
    hero: {
      line: "A companion robot, built for elder care.",
      cjkLine: "介護の現場に置く、コンパニオンロボット。",
      cta: "See the robot",
      videoLabel: "Video of the robot moving on a care floor",
    },
    trustedBy: {
      eyebrow: "Where it runs",
      facilities: ["[GAP: pilot facility 1 name]", "[GAP: pilot facility 2 name]", "[GAP: pilot facility 3 name]"],
      sentence: "It runs in [GAP: number of pilot facilities] facilities in [GAP: prefectures], beside [GAP: residents served] residents.",
      cta: "Talk about a deployment",
    },
    robot: {
      eyebrow: "Companion robot for elder care",
      name: "Mimamori",
      sentences: [
        "[GAP: robot height] cm tall, [GAP: robot weight] kg.",
        "It runs [GAP: battery life] hours on one charge and understands Japanese and [GAP: languages and dialects].",
      ],
      cta: "See the specifications",
    },
    scale: {
      figures: [
        { value: "[GAP: number of facilities running]", label: "Facilities running" },
        { value: "[GAP: total hours logged on floors]", label: "Hours logged on floors" },
        { value: "[GAP: residents served]", label: "Residents it stays beside" },
      ],
    },
    founder: {
      quote: "[GAP: founder quote — one or two factual sentences]",
      name: "[GAP: founder name]",
      title: "[GAP: founder title]",
    },
    safety: {
      sentences: [
        "It records [GAP: what it records — e.g. audio, video, movement events].",
        "The data stays in [GAP: where data is stored], and only [GAP: who can see the data] can see it.",
      ],
      cta: "Read about safety and privacy",
    },
    markets: {
      eyebrow: "Where it is used",
      rows: [
        {
          title: "Care homes",
          sentences: [
            "It stays on the floor, beside residents.",
            "How staff routines change is shown with numbers from pilot sites: [GAP: measured change in staff routine at pilot sites].",
          ],
          href: "/care-homes/",
          cta: "For care homes",
        },
        {
          title: "Day services",
          sentences: [
            "It runs only during attendance hours.",
            "Bringing it in and packing it away takes [GAP: setup and teardown time at a day service].",
          ],
          href: "/care-homes/",
          cta: "Talk about a deployment",
        },
        {
          title: "At home",
          sentences: [
            "At home it [GAP: what it does at home].",
            "What families are told, and what they are not, is on the families page.",
          ],
          href: "/families/",
          cta: "For families",
        },
      ],
    },
    interlude: {
      line: "Behind one robot: a network, updates, and people who keep it running.",
      cta: "See how deployment works",
    },
    closing: {
      line: "A deployment starts with a look at your floor.",
      cta: "Talk to us",
    },
  },

  robot: {
    meta: {
      title: "The robot — Arclin",
      description:
        "Mimamori specifications: height, weight, battery life, charging time, sensors, speed, noise level, languages, and what it does offline.",
    },
    hero: {
      eyebrow: "Companion robot for elder care",
      line: "A companion robot for the care floor.",
      highlight: "[GAP: battery life] hours on one charge",
    },
    specsTitle: "Specifications",
    specs: [
      { label: "Height", value: "[GAP: robot height] cm" },
      { label: "Weight", value: "[GAP: robot weight] kg" },
      { label: "Battery life", value: "[GAP: battery life] hours" },
      { label: "Charging time", value: "[GAP: charging time] hours" },
      { label: "Sensors", value: "[GAP: sensor suite]" },
      { label: "Speed", value: "Up to [GAP: max speed] km/h" },
      { label: "Noise level", value: "[GAP: noise level] dB" },
      { label: "Languages and dialects", value: "[GAP: languages and dialects]" },
      { label: "Offline capability", value: "[GAP: offline capability]" },
    ],
    whatItDoesTitle: "What it does",
    blocks: [
      {
        title: "Company",
        body: "It waits at a fixed place on the floor and stays beside residents. When spoken to, it answers in [GAP: languages and dialects].",
      },
      {
        title: "Daily help",
        body: "It tells residents the time of each routine. What it helps with, and how far, is [GAP: daily tasks it performs, and their limits].",
      },
      {
        title: "Moving safely",
        body: "It moves at up to [GAP: max speed] km/h and stops [GAP: obstacle stop distance] cm before an obstacle. If someone falls, it [GAP: what it does when someone falls].",
      },
      {
        title: "Staying in touch",
        body: "It notifies staff and families by [GAP: how it notifies — app, message, call]. What it tells them, and what it does not, is on the families page.",
      },
    ],
    safetySummary: {
      title: "Safety in brief",
      body: "Certification status: [GAP: ISO 13482 status]. What it records, where the data lives and how long it is kept are on the safety page.",
      cta: "Read about safety",
    },
    inBox: {
      title: "What is in the box",
      items: ["The robot", "[GAP: remaining box contents — charger or dock, cables, printed guide]"],
    },
    facilityProvides: {
      title: "What the facility provides",
      items: [
        "[GAP: network requirement — Wi-Fi band and bandwidth]",
        "[GAP: power outlet requirement]",
        "[GAP: floor space for charging]",
      ],
    },
    closing: { line: "See it on a floor.", cta: "Talk to us" },
  },

  careHomes: {
    meta: {
      title: "Care homes — Arclin",
      description: "What it does on a floor, what staff do differently, the staff time it takes to run, and how a pilot starts.",
    },
    hero: { eyebrow: "For care homes", line: "One robot on the floor. What changes for staff." },
    blocks: [
      {
        title: "What it does on the floor",
        body: "It waits at a fixed place on the floor and stays beside residents. At night it [GAP: night-time behaviour — patrol, stationary, off].",
      },
      {
        title: "What staff do differently",
        body: "The tasks staff hand over, and the tasks that are new, are shown from pilot-site records: [GAP: measured change in staff routine at pilot sites].",
      },
      {
        title: "Staff time to run it",
        body: "[GAP: staff minutes per day to run it — charging, checks, log review] minutes a day. The breakdown is on the deployment page.",
      },
      {
        title: "How a pilot starts",
        body: "Site survey, then staff training, then it runs. From order to running takes [GAP: time from order to running].",
      },
    ],
    closing: { line: "Show us the floor plan and the night-shift roster. We start there.", cta: "Talk to us" },
  },

  families: {
    meta: {
      title: "Families — Arclin",
      description: "What a day with it looks like, what you will and will not be told about your parent, and how to reach a person.",
    },
    hero: { eyebrow: "For families", line: "What it means to have a robot beside your parent." },
    day: {
      title: "A day with it",
      body: "In the morning it [GAP: morning behaviour]. During the day it stays beside residents. At night it [GAP: night behaviour].",
    },
    told: {
      title: "What you will be told, and what you will not",
      will: ["[GAP: what families are notified of — e.g. falls, missed meals]", "[GAP: how often a summary is sent]"],
      willNot: ["[GAP: what is not shared — e.g. audio, video, conversation content]"],
    },
    reach: {
      title: "How to reach a person",
      body: "To reach facility staff: [GAP: how families reach staff]. To reach Arclin: [GAP: support contact and hours].",
    },
    closing: { line: "If you have a question, a person answers it.", cta: "Contact" },
  },

  safety: {
    meta: {
      title: "Safety — Arclin",
      description:
        "Certification status, what it records, where data is stored and who controls it, retention, consent withdrawal, physical safety, and what happens when the network drops.",
    },
    hero: { eyebrow: "Safety and privacy", line: "What it records, where it goes, and who sees it." },
    summaryTitle: "In brief",
    summary: [
      { label: "Certification status", value: "[GAP: ISO 13482 status and Japanese regulatory position]" },
      { label: "What it records", value: "[GAP: what it records]" },
      { label: "What it does not record", value: "[GAP: what it does not record]" },
      { label: "Where data is stored and who controls it", value: "[GAP: where data is stored and under whose control]" },
      { label: "Retention", value: "[GAP: retention period]" },
      { label: "Consent withdrawal", value: "[GAP: how consent is withdrawn and what happens to the data]" },
      {
        label: "Physical safety",
        value: "Up to [GAP: max speed] km/h. Stops [GAP: obstacle stop distance] cm before an obstacle. If someone falls, it [GAP: what it does if someone falls].",
      },
      { label: "When the network drops", value: "[GAP: behaviour when the network drops]" },
    ],
    detailTitle: "In detail",
    details: [
      {
        title: "Certification status",
        body: "ISO 13482: [GAP: ISO 13482 status]. Position under Japanese regulation: [GAP: Japanese regulatory position]. Insurance and liability: [GAP: insurance and liability model].",
      },
      {
        title: "What it records, and what it does not",
        body: "It records [GAP: what it records]. It does not record [GAP: what it does not record].",
      },
      {
        title: "Where data is stored and who controls it",
        body: "Data is stored in [GAP: where data is stored]. It is controlled by [GAP: who controls the data]. It can be seen by [GAP: who can see the data].",
      },
      { title: "Retention", body: "Deleted after [GAP: retention period]. Deletion method: [GAP: deletion method]." },
      {
        title: "Consent withdrawal",
        body: "Consent is withdrawn by [GAP: how consent is withdrawn]. After withdrawal, the data [GAP: what happens to data after withdrawal].",
      },
      {
        title: "Physical safety",
        body: "It moves at up to [GAP: max speed] km/h and stops [GAP: obstacle stop distance] cm before an obstacle. If someone falls, it [GAP: what it does if someone falls].",
      },
      {
        title: "When the network drops",
        body: "When the network drops, it [GAP: behaviour when the network drops]. After reconnection, [GAP: what happens after reconnection].",
      },
    ],
    closing: { line: "If it is not written here, ask.", cta: "Contact" },
  },

  deployment: {
    meta: {
      title: "Deployment — Arclin",
      description: "Time from order to running, site survey, staff training, support model, network requirements and updates.",
    },
    hero: { eyebrow: "Deployment", line: "From order to running: [GAP: time from order to running]." },
    blocks: [
      {
        title: "From order to running",
        body: "From order to running takes [GAP: time from order to running]. The site survey and staff training happen in that period.",
      },
      {
        title: "Site survey",
        body: "We check the floor's walking routes, the charging location and the state of the network. It takes [GAP: site survey duration].",
      },
      { title: "Staff training", body: "[GAP: training duration and format]. It is for [GAP: which staff are trained]." },
      {
        title: "Support",
        body: "Contact is by [GAP: support channel], during [GAP: support hours]. When someone has to come on site, that takes [GAP: on-site response time].",
      },
      {
        title: "Network requirements",
        body: "[GAP: Wi-Fi band, bandwidth, ports]. What it does when the network drops is on the safety page.",
      },
      {
        title: "Updates",
        body: "Software is updated [GAP: update cadence]. Updates are applied [GAP: when updates are applied — e.g. at night while charging].",
      },
    ],
    closing: { line: "It starts with a site survey.", cta: "Talk to us" },
  },

  newsroom: {
    meta: { title: "Newsroom — Arclin", description: "Announcements from Arclin K.K." },
    hero: { eyebrow: "Newsroom", line: "Announcements about the company and the product." },
    intro: "When there is something to announce, it is posted here.",
    entries: [],
    empty: "No announcements yet.",
  },

  careers: {
    meta: { title: "Careers — Arclin", description: "The work at Arclin, open roles, and how to apply." },
    hero: { eyebrow: "Careers", line: "Building a robot that lives on a care floor." },
    about:
      "We build a robot that moves on care-home floors, and the network, updates and support behind it. The office is in [GAP: office location]. Working arrangements: [GAP: remote or on-site policy].",
    rolesTitle: "Open roles",
    roles: [],
    rolesEmpty: "There are no open roles at the moment.",
    apply: {
      title: "How to apply",
      body: "Email us your background and which part of the work interests you. We reply within [GAP: response time].",
      cta: "Send an email",
      subject: "Application",
    },
  },

  contact: {
    meta: { title: "Contact — Arclin", description: "Contact by email. What to include, and how long a reply takes." },
    hero: { eyebrow: "Contact", line: "Send an email. A person reads it." },
    emailLabel: "Email",
    subject: "Inquiry",
    include: { title: "What to include", items: ["Facility name or location", "Facility type and number of residents", "What you want to know"] },
    responseTime: "Reply time: [GAP: response time]",
    cta: "Send an email",
  },

  terms: {
    meta: { title: "Terms — Arclin", description: "Terms of use for the Arclin K.K. website." },
    kicker: "Legal",
    title: "Terms of use",
    updated: "Last updated: [PLACEHOLDER]",
    back: "Back to top",
    intro: "These terms set out the conditions for using the website of Arclin K.K. (the company).",
    sections: [
      { h: "1. Scope", b: "[PLACEHOLDER — to be confirmed after legal review] These terms apply to all use of the company's website." },
      { h: "2. Prohibited conduct", b: "[PLACEHOLDER] Conduct that breaks the law or public order, or interferes with the operation of the company's services." },
      { h: "3. Intellectual property", b: "[PLACEHOLDER] Rights to the text, images and video on this website belong to the company or their rights holders." },
      { h: "4. Disclaimer", b: "[PLACEHOLDER] The company does not guarantee the accuracy of the content published here." },
      { h: "5. Governing law and jurisdiction", b: "[PLACEHOLDER] Governed by Japanese law, with the [PLACEHOLDER] District Court as the exclusive court of first instance." },
      { h: "6. Contact", b: "[PLACEHOLDER] Contact email address." },
    ],
    note: "Every section on this page is a placeholder pending legal review. Confirm before publishing.",
  },
};
