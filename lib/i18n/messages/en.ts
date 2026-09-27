/**
 * English copy. Written in its own register, not translated word for word from ja.
 * [PLACEHOLDER] is swapped once registration and contact details are confirmed.
 * A bracketed GAP marker stands for a fact that is not yet known. The site renders it as-is.
 */
import type { Messages } from "./ja";

export const en: Messages = {
  metaTitle: "Arclin K.K. (株式会社智渡仁) — Chinese robots, made to work on Japanese care floors",
  metaDesc:
    "Arclin K.K. is the operations layer between Chinese robot makers and Japanese care homes: requirement definition, Japanese adaptation and secondary development, safety acceptance, system connection and on-site operations.",
  ogTitle: "Chinese robots, made to work on Japanese care floors — Arclin K.K.",
  ogDesc: "The operations layer between Chinese robot makers and Japanese care homes.",
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
  statsH2: "Japanese elder care is entering the steep part of its staffing gap.",
  stats: [
    {
      value: 29.4,
      decimals: 1,
      unit: "%",
      label: "Share of the population aged 65 and over. The highest in the world",
      sub: "People aged 65 and over as a share of the total population",
      source: "Ministry of Internal Affairs and Communications",
    },
    {
      value: 2.4,
      decimals: 1,
      unit: "million",
      label: "Care workers needed in fiscal 2026. The 2022 count was 2.15 million",
      sub: "Care workers required in fiscal 2026",
      source: "Ministry of Health, Labour and Welfare",
    },
    {
      value: 11.94,
      decimals: 2,
      unit: "trillion yen",
      label: "Long-term care benefit costs in fiscal 2024, up 3.7% on the year",
      sub: "Long-term care benefit costs",
      source: "Ministry of Health, Labour and Welfare",
    },
  ],
  trendTitle: "Share of population aged 65 and over",
  trendNote: "Projected from 2020",
  trendSource: "Sources: Statistics Bureau of Japan, Population Estimates; National Institute of Population and Social Security Research, Population Projections for Japan",
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
  partnersLegacy: [
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

  // ---- v3 (2026-09-28: the bridge company). An early-stage company: no number appears here that has not been measured. ----
  common: {
    siteName: "Arclin",
    skip: "Skip to content",
    navLabels: ["How we work", "Who we work with", "Contact"],
    menuOpen: "Open menu",
    menuClose: "Close menu",
    dismiss: "Dismiss",
    footerColumns: { site: "Site", legal: "Legal" },
    pageLabels: {
      approach: "How we work",
      partners: "Who we work with",
      contact: "Contact",
      privacy: "Privacy policy",
      terms: "Terms",
    },
    entity: "Arclin K.K. (株式会社智渡仁)",
    founded: "Founded in Tokyo, September 2026",
    localeNames: { ja: "日本語", en: "English", zh: "中文" },
    localeSwitch: "Language",
    talkToUs: "Talk to us",
    tagline: "A warmer tomorrow",
    contactCare: "Care operators: write here",
    contactRobot: "Robot makers: write here",
  },

  home: {
    meta: {
      title: "Arclin — Chinese robots, made to work on Japanese care floors",
      description:
        "Arclin K.K. is the operations layer between Chinese robot makers and Japanese care homes: requirement definition, Japanese adaptation and secondary development, safety acceptance, system connection and on-site operations.",
    },
    hero: {
      line: "Chinese robots, made to work on Japanese care floors.",
      altLine: "中国のロボットを、日本の介護現場で使えるかたちに。",
      sub: "Arclin is the operations layer between Chinese robot makers and Japanese care homes. Requirement definition, Japanese adaptation and secondary development, safety acceptance, connection to existing systems, and the operations that keep a robot on the floor.",
      cta: "How we work",
      ctaSecondary: "Who we work with",
      videoLabel: "Video of a robot moving along a care-home corridor",
    },
    stage: {
      sentence: "Founded in Tokyo in September 2026. Site visits at Tokyo care homes are done, and the first task set and test framework for our first product, Mimamori, are written. Next: a framework agreement with one robot maker and proofs of concept at two facilities.",
      cta: "Talk to us",
    },
    statement: {
      a: "We do not build the robot.",
      b: "We own everything between its arrival in Japan and a care home signing it off. That is Arclin's work.",
    },
    pillars: {
      kicker: "Two pillars",
      mimamori: {
        name: "Mimamori",
        tagline: "The first product. It starts with watching over",
        body: ["Daytime company, evening watch, night patrol. It begins with the frequent, low-contact tasks.", "The robot does not touch anyone. It recognises, notifies and delivers."],
        cta: "See Mimamori",
      },
      careos: {
        name: "CareOS",
        tagline: "The adaptation and operations layer",
        body: ["Japanese dialogue, task orchestration, safety policy, facility maps, device adapters and an operations data dictionary. Connection to nurse call and care records, and the operations on the floor."],
        note: "The body, base control and base algorithms are the maker's IP. The Japanese care requirements, the scene behaviour, the acceptance method and the operations data taxonomy are Arclin's.",
        cta: "How we work",
      },
    },
    day: {
      eyebrow: "A day with Mimamori",
      rows: [
        { time: "09:00–17:00", title: "Daytime company", sentences: ["In the activity room it talks in Japanese and stays close.", "It prompts people to drink, delivers cups, and tells staff when someone has left their seat."] },
        { time: "17:00–22:00", title: "Evening watch", sentences: ["Dining room, corridor, outside the rooms. It watches people move after meals.", "It does a round before bedtime and reports anything unusual."] },
        { time: "22:00–05:00", title: "Night patrol", sentences: ["It patrols the shared corridors and detects wandering and anomalies.", "It works with the night staff. It does not replace them."] },
      ],
      cta: "See Mimamori",
    },
    audiences: {
      careOperators: { title: "For care operators", descriptor: "You know you are short of people. You cannot write a robot spec.", line: "Homes with heavy night shifts, high agency costs, and a nurse-call or care-record system already in place. That is where we start." },
      robotMakers: { title: "For robot makers", descriptor: "You have the technology. You want Japan.", line: "You have the body and the base technology and want to enter Japan. We close the distance between a demo and a care home's sign-off." },
    },
    interlude: {
      line: "Between a Chinese factory and a Japanese care floor there are six walls. We take all six.",
      cta: "How we work",
    },
    closing: { line: "It starts with a floor plan and a night-shift roster." },
  },

  approach: {
    meta: {
      title: "How we work — Arclin",
      description: "Arrival is only the beginning. The six walls between a Chinese robot and a Japanese care home's sign-off, the CareOS layers, a gated proof of concept, the first product Mimamori, and compliance.",
    },
    hero: { eyebrow: "How we work", line: "Arrival is only the beginning. A care home buys a result, not a robot." },
    walls: {
      title: "The six walls",
      lead: "The Chinese side brings the body, perception and motion, a supply chain and fast iteration. A Japanese care home asks for lighter workloads and safety, clear acceptance metrics, connection to its existing systems, and local service it can trust. Between the two stand six walls. Arclin takes all six.",
      items: [
        { title: "Size and space", body: "Corridor widths, room doorways, dining-room routes. We fit the dimensions and the movement to a Japanese facility." },
        { title: "Japanese interaction", body: "Not translation. Words, displays and a voice that residents and staff can use without thinking about them." },
        { title: "Safety and regulation", body: "Risk assessment against international and Japanese standards, emergency stop, speed and zone limits, radio and electrical certification checks." },
        { title: "Data and systems", body: "Nurse call, care records, alerts, event export. We connect to the facility's systems." },
        { title: "Acceptance and delivery", body: "Metrics agreed first, then proven on a single floor with a single task before handover." },
        { title: "After-sales service", body: "Remote monitoring, service levels, incident response, updates. A local team keeps going." },
      ],
    },
    layers: {
      title: "The CareOS layers",
      lead: "We do not rewrite the bottom layers. We own the scene layer and the operations loop, with a clear line between the two.",
      items: [
        { name: "Japanese on-site operations", items: "Deployment, training, remote monitoring, service levels, incident response", owner: "arclin" },
        { name: "CareBridge connection module", items: "Nurse call, care records, alerts, event export, subsidy requirements", owner: "arclin" },
        { name: "CareOS core", items: "Japanese dialogue, task orchestration, safety policy, facility maps, device adapters, operations data dictionary", owner: "arclin" },
        { name: "Chinese robot platform", items: "Body, motion control, sensors, base models, SDK / API / ROS 2", owner: "oem" },
      ],
      owners: { arclin: "Arclin owns", oem: "The maker owns" },
    },
    gates: {
      title: "A gated proof of concept",
      lead: "Gates instead of open-ended customisation. About 10 to 11 months from platform selection to the first robot running in a facility.",
      items: [
        { gate: "Gate 0", title: "Platform selection", weeks: "3 weeks", body: "Interfaces, noise and low-light recognition checked up front. If any one misses the bar, we keep improving or switch platform." },
        { gate: "Gate 1", title: "Requirements frozen", weeks: "4 weeks", body: "Scenes, boundaries, metrics and the responsibility matrix, fixed." },
        { gate: "Gate 2", title: "Local development", weeks: "16 weeks", body: "Secondary development of Japanese dialogue, tasks, safety and connections. Compliance pre-checks and the facility's workflow mapping run alongside." },
        { gate: "Gate 3", title: "On-site proof of concept", weeks: "12 weeks", body: "One floor, one task, tested across shifts." },
        { gate: "Gate 4", title: "Ready to run", weeks: "10–12 weeks", body: "Service levels, training, review, and the next floor." },
      ],
    },
    mimamori: {
      eyebrow: "The first product",
      title: "Mimamori. It starts with the frequent, low-contact work of watching over.",
      boundary: { title: "The safety boundary", body: "The robot does not touch residents. It recognises, notifies and delivers. It does not lift, feed or diagnose. The final call always belongs to staff." },
      day: [
        { time: "09:00–17:00", place: "Activity room", title: "Daytime company", items: ["Japanese conversation and company", "Drink reminders and delivery", "Seat-leaving detection and staff notification"] },
        { time: "17:00–22:00", place: "Dining room, corridor, outside rooms", title: "Evening watch", items: ["Watching movement after meals", "A round before bedtime", "Reporting anomalies"] },
        { time: "22:00–05:00", place: "Shared corridors", title: "Night patrol", items: ["Corridor patrol", "Wandering and anomaly detection", "Working with night staff"] },
      ],
      acceptance: {
        title: "The proof-of-concept acceptance line",
        lead: "A proof of concept is signed off against five metrics. The targets are Arclin's requirement specification, set from the conditions of Japanese care floors. They are not an industry standard, and each facility confirms them at requirement definition.",
        items: [
          { value: "≤40 dBA", label: "Walking noise at night, measured at 1 m" },
          { value: "≤5 lux", label: "Human detection in low light" },
          { value: "≥95%", label: "Battery availability" },
          { value: "100%", label: "Event records exportable" },
          { value: "0", label: "Collisions and safety incidents" },
        ],
      },
      scopeNote: "The feature scope is fixed at proof-of-concept acceptance.",
    },
    compliance: {
      title: "Safety and compliance",
      lead: "Compliance is a product capability, not homework before launch.",
      items: [
        { title: "Privacy and data", body: "Privacy by design. Cross-border transfer and subcontractor management, minimal collection, stated retention periods." },
        { title: "Human-robot safety", body: "International and Japanese safety standards as reference. Risk assessment, emergency stop, speed and zone limits." },
        { title: "Radio and electrical", body: "Radio certification checked per product; electrical safety certification judged by scope of application." },
        { title: "Subsidies and registration", body: "Eligibility checked per product and per region. A subsidy is never counted as automatic revenue." },
        { title: "Network and operations", body: "Local logs, permissions and update management. Incident grading, response service levels, insurance." },
      ],
      note: "The regulatory path is confirmed per product with Japanese counsel, certification bodies and insurers. Certification and compliance status is published only once confirmed.",
    },
    closing: { line: "Elder care is where we prove the method first. The method carries to other highly institutional Japanese industries.", cta: "Talk to us" },
  },

  partners: {
    meta: {
      title: "Who we work with — Arclin",
      description: "Care operators with heavy night shifts, and Chinese robot makers who want Japan. What we take on for each, what we ask, the commercial principles and the IP boundary.",
    },
    hero: { eyebrow: "Who we work with", line: "One layer, two partners: care operators and robot makers." },
    lead: "Demand first, supply second. We start from a facility's requirements, and we never serve too many makers at once.",
    careOperators: {
      title: "For care operators",
      line: "You know you are short of people. You cannot write a robot spec. That is where we start.",
      lead: "A facility usually knows it is short-staffed but finds it hard to write down what a robot should do. Arclin turns the pain points into tasks that can be accepted.",
      fitTitle: "The facilities we want to start with",
      fit: ["A private care home with 60 or more beds", "24-hour operation with heavy night-shift pressure", "High temporary-staff costs", "A nurse-call or care-record system already in place", "A director or owner who can decide directly"],
      pocTitle: "How a proof of concept runs",
      poc: [
        { title: "Requirements, together", body: "From the floor plan and the night roster we fix the scenes, the boundaries, the metrics and who is responsible for what." },
        { title: "One floor, one task", body: "One job on one floor, tested across shifts for 12 weeks." },
        { title: "Signed off on five metrics", body: "Noise, low-light detection, battery availability, exportable records, zero incidents. Judged on the agreed numbers." },
        { title: "The next floor", body: "With the acceptance data as evidence, the deployment extends to the operator's other facilities." },
      ],
      termsTitle: "Commercial principles",
      terms: ["A framework agreement with the operating entity first, then facility by facility.", "Robots are bought outright by default; leasing is an option.", "A proof of concept is paid. We do not take on open-ended free customisation.", "Subsidy eligibility is checked per product and per region. It is never assumed."],
      cta: "Care operators: write here",
    },
    robotMakers: {
      title: "For robot makers",
      line: "You have the technology. You want Japan. We close the distance between a demo and a sign-off.",
      lead: "Chinese robots and their supply chain lead on manufacturing cost and speed of iteration. What is missing is not the body. It is requirement definition, Japanese interaction, safety acceptance, system connection and on-site service.",
      weDoTitle: "What we take on",
      weDo: [
        { title: "Secondary development for Japan", body: "Japanese dialogue, scene behaviour, safety policy, connection to the facility's systems." },
        { title: "Compliance pre-checks", body: "Radio certification, electrical safety, privacy, subsidy and registration requirements, confirmed per product with Japanese specialists." },
        { title: "On-site proof and operations", body: "The facility proof of concept, acceptance sign-off, then remote monitoring, service levels and incident response." },
        { title: "Compatibility over time", body: "With every update, we keep checking how the robot behaves in Japanese scenes." },
      ],
      weNeedTitle: "What we ask",
      weNeed: ["Key APIs, telemetry and remote-operations access", "An SDK, or a ROS 2 connection", "Readiness for the up-front checks on noise, low-light recognition and interfaces", "A long-term commitment to the Japanese market"],
      ipTitle: "The IP boundary",
      ip: [
        { who: "The maker owns", items: "The body, base control, base algorithms and platform-native capabilities" },
        { who: "Arclin owns", items: "The Japanese care requirement specifications, scene behaviour adapters, acceptance methods and the operations data taxonomy" },
      ],
      cta: "Robot makers: write here",
    },
    closing: { line: "A floor plan and a night roster, or a platform overview and API documentation. Either is a start." },
  },

  contact: {
    meta: { title: "Contact — Arclin", description: "Contact by email. What care operators and robot makers should include." },
    hero: { eyebrow: "Contact", line: "Send an email. A person reads it." },
    emailLabel: "Email",
    subject: "Inquiry",
    include: {
      title: "What to include",
      groups: [
        { who: "Care operators", items: ["Facility type and number of beds", "Night-shift structure", "Existing systems, such as nurse call or care records"] },
        { who: "Robot makers", items: ["A platform overview", "API, SDK or ROS 2 availability", "Your target timing for Japan"] },
      ],
    },
    responseTime: "We are a small team at the start of the company. A reply can take a few days.",
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
