/**
 * 日本語コピー。Claude Design の「Arclin Homepage」テンプレートの COPY.ja を正とする。
 * [PLACEHOLDER] は登記情報・連絡先が確定次第差し替えること。
 */
export const ja = {
  metaTitle: "株式会社智渡仁 / Arclin K.K. — ロボットを、日本の介護の力へ。",
  metaDesc:
    "智渡仁（Arclin K.K.）は、ロボティクス企業と日本の介護現場をつなぎ、現場理解・ローカライズ・安全検証・導入までを支援するローカライズ・導入パートナーです。",
  ogTitle: "ロボットを、日本の介護の力へ。— Arclin K.K.",
  ogDesc: "ロボティクス企業と日本の介護現場をつなぐ、ローカライズ・導入パートナー。",
  skip: "本文へスキップ",

  announce: "介護施設向けパイロットプログラム、受付中。",
  announceCta: "詳しく見る",

  navContact: "お問い合わせ",
  nav: ["Mimamori", "CareOS", "導入プロセス", "パートナー"],

  heroTagline: "Care first. Technology follows.",
  heroH1a: "ロボットを、",
  heroH1b: "日本の介護の力へ。",
  heroSub: "智渡仁は、ロボティクス企業と日本の介護現場をつなぎ、現場理解・ローカライズ・安全検証・導入までを支援します。",
  heroCta1: "介護施設の方へ",
  heroCta2: "ロボティクス企業の方へ",
  heroAlt: "起立の瞬間にロボットが高齢者のバランスを支える線画",
  heroCaption: "起立時のバランス支援 — 概念図",

  statementA: "ロボットそのものを作り替えるのではなく、",
  statementB: "日本の介護現場へ適応するためのレイヤーをつくる。それが智渡仁の仕事です。",

  productsKicker: "二つの柱",
  products: [
    {
      id: "mimamori",
      name: "Mimamori",
      sub: "見守り支援",
      body: "見守り支援ロボットは、介護スタッフに代わるものではありません。日中・夕方・夜間、それぞれの時間帯で、人の目が届きにくい瞬間を補います。起立の瞬間にバランスを支え、飲水・食事を記録し、会話パターンの変化に気づきます。",
      note: "搬送・抱き上げは行いません。診断ではなく、専門職による確認のきっかけです。",
      cta: "Mimamori を見る",
    },
    {
      id: "careos",
      name: "CareOS",
      sub: "適応・運用基盤",
      body: "ロボット1台では、導入は成功しません。介護の体験から、適応、ロボットの知能、運用のインフラまで。ローカライズ、介護ワークフロー、対話設計、安全ポリシー、機器管理、ログ、プライバシー、更新、稼働監視——そのすべてを CareOS と呼びます。",
      note: "ロボットの中核技術はパートナーの知財。適応・統合レイヤーが智渡仁の知財です。",
      cta: "CareOS を見る",
    },
  ],

  demo: "演示データ／概念図",
  source: "出典・性質",

  statsKicker: "なぜ日本か",
  statsH2: "日本の介護は、大きな転換点にあります。",
  stats: [
    { value: 29.3, decimals: 1, unit: "%", label: "高齢化率", sub: "65歳以上が総人口に占める割合", source: "総務省統計局「人口推計」（2024年）。掲載前に最新値を確認。" },
    { value: 57, decimals: 0, unit: "万人", label: "介護職員の不足見込み", sub: "2040年度に必要な人数との差", source: "厚生労働省「第9期介護保険事業計画に基づく介護職員の必要数」。掲載前に確認。" },
    { value: 14, decimals: 0, unit: "兆円", label: "介護費用（年間）", sub: "介護保険給付の総費用規模", source: "厚生労働省「介護保険事業状況報告」。概算値、掲載前に確認。" },
  ],
  trendTitle: "高齢化率の推移（65歳以上人口割合）",
  trendNote: "2020年以降は推計",
  trendSource: "出典：総務省「人口推計」／国立社会保障・人口問題研究所「日本の将来推計人口」。掲載前に最新値を確認してください。",
  quoteA: "ロボットから考えるのではなく、",
  quoteB: "介護の現場から考える。",
  quoteBy: "株式会社智渡仁",
  kpiTitle: "受入指標の例",
  kpis: [
    { value: 0, fraction: 0, unit: "dB", label: "[GAP: night-time noise dB]" },
    { value: 0, fraction: 0, unit: "%", label: "[GAP: stand-up detection accuracy]" },
  ],
  kpiNote: "表示は概念例です。実際の受入指標はパイロット設計時に施設と合意して定めます。実績値ではありません。",

  processKicker: "導入プロセス",
  processH2: "導入は、一緒に現場を理解するところから。",
  processCta: "相談する",
  steps: [
    {
      id: "s1",
      title: "現場理解",
      body: "施設を訪ね、動線・業務・夜勤体制・既存設備を把握します。食事・排泄・夜間巡視など、介護の一日には固有のリズムがあります。技術はそのリズムに合わせる必要があります。",
      walls: ["現場観察と業務フロー分析", "入居者の動線", "スタッフの日課", "夜勤の体制"],
    },
    {
      id: "s2",
      title: "ローカライズ開発",
      body: "日本語UI、介護ワークフロー、安全ポリシーへの適応を進めます。翻訳だけでは足りません。高齢者・スタッフが自然に使える言葉、表示、音声の設計が必要です。",
      walls: ["介護向けの日本語UI・音声", "安全基準への適合と検証計画", "同意・保存・削除の運用設計"],
    },
    {
      id: "s3",
      title: "現場検証",
      body: "限定したエリアでパイロットを行い、指標で効果と課題を確かめます。施設ごとの動線、設備、Wi-Fi、夜勤体制。導入は「置くだけ」では終わりません。",
      walls: ["施設ごとの導入計画", "受入指標の合意", "限定エリアでのパイロット"],
    },
    {
      id: "s4",
      title: "本導入",
      body: "運用体制を整え、継続的な改善サイクルへ移行します。導入後の問い合わせ、更新、機器管理。継続する体制がなければ現場に定着しません。",
      walls: ["運用支援と改善サイクル", "機器管理・更新・稼働監視", "データ所在と権限の文書化"],
    },
  ],

  contactH2a: "まずはメールで。",
  contactH2b: "次の一歩を返します。",
  contactBody: "施設の状況か、製品の段階をお聞かせください。それに合わせた次の一歩をご提案します。",
  contactCare: "介護施設の方はこちら",
  contactRobot: "ロボティクス企業の方はこちら",

  partnerKicker: "パートナーシップ",
  partnerH2: "介護施設と、ロボティクス企業と組みます。",
  fitKicker: "こんな方と",
  partners: [
    { kicker: "介護施設の方へ", title: "介護施設の方へ", body: "ロボットを検討したいが、何が現場で本当に機能するのか分からない。そんな段階からご一緒します。", cta: "導入について相談する", fit: ["新しい介護テクノロジーの探索に前向き", "パイロットを実施できる環境がある", "成果を測ることに意欲がある", "スタッフの参加が得られる", "中長期的な導入に関心がある"], subject: "導入についての相談" },
    { kicker: "ロボティクス企業の方へ", title: "ロボティクス企業の方へ", body: "技術はある。日本市場に入りたい。デモから実際の介護運用へ、その距離を一緒に縮めます。", cta: "日本展開について相談する", fit: ["実用段階にあるロボティクス製品", "日本市場への関心", "ローカライズへの意欲", "API・連携への対応", "長期的な市場コミットメント"], subject: "日本展開についての相談" },
  ],
  trust: [
    { title: "安全", body: "適用される安全基準・法規制を踏まえて設計・検証します。身体接触を伴う支援は、リスクアセスメントを前提とします。" },
    { title: "プライバシー", body: "映像・音声・生活データは必要最小限に。保存期間と削除の仕組みを明確にします。" },
    { title: "人の判断", body: "最終的な判断は常に介護スタッフが行います。技術は確認を促すものであり、診断や決定を下しません。" },
  ],
  trustNote: "認証・基準への適合状況は、確定した内容のみを掲載します。",

  companyKicker: "会社概要",
  companyTagline: "Technology becomes meaningful only when it works in everyday life.",
  company: [
    { k: "会社名", v: "株式会社智渡仁 / Arclin K.K." },
    { k: "所在地", v: "[PLACEHOLDER]", ph: true },
    { k: "事業内容", v: "介護ロボティクスの日本市場向けローカライズ、安全検証、導入・運用支援" },
  ],
  footerName: "株式会社智渡仁 / Arclin K.K.",
  privacy: "プライバシーポリシー",
  otherLang: "中文",
  disclaimer:
    "具体的な見積り・料率はプロジェクト範囲、協議内容、正式契約書に基づきます。私たちが提供するのは「汎用製品」ではなく「汎用的な適応能力」です。登記情報は国税庁法人番号公表サイトで確認できます。",

  privacyPage: {
    kicker: "法的情報",
    title: "プライバシーポリシー",
    updated: "最終更新：[PLACEHOLDER]",
    back: "トップへ戻る",
    other: "中文",
    intro: "株式会社智渡仁（以下「当社」）は、当社ウェブサイトおよびサービスにおける個人情報の取り扱いについて、以下のとおり定めます。",
    sections: [
      { h: "1. 取得する情報", b: "[PLACEHOLDER — 法務確認後に確定] お問い合わせ時にいただく氏名・所属・メールアドレス等。" },
      { h: "2. 利用目的", b: "[PLACEHOLDER] お問い合わせへの対応、サービスのご案内。" },
      { h: "3. 第三者提供", b: "[PLACEHOLDER] 法令に基づく場合を除き、本人の同意なく第三者に提供しません。" },
      { h: "4. 保存期間と削除", b: "[PLACEHOLDER] 目的達成後、適切な期間で削除します。" },
      { h: "5. 安全管理", b: "[PLACEHOLDER] アクセス権限の管理等、適切な安全管理措置を講じます。" },
      { h: "6. 開示・訂正・削除の請求", b: "[PLACEHOLDER] ご本人からの請求には、法令に従い対応します。" },
      { h: "7. お問い合わせ窓口", b: "[PLACEHOLDER] 連絡先メールアドレス。" },
    ],
    note: "本ページの各条項は法務レビュー前のプレースホルダーです。公開前に確定してください。",
  },

  // ---- v3 (brief v3 IA). 角括弧の [GAP: …] は未確定の事実。確定次第差し替える。 ----
  common: {
    siteName: "Arclin",
    skip: "本文へスキップ",
    navLabels: ["ロボット", "介護施設の方へ", "ご家族の方へ", "安全性", "お問い合わせ"],
    menuOpen: "メニューを開く",
    menuClose: "メニューを閉じる",
    dismiss: "閉じる",
    footerColumns: { product: "製品と導入", company: "会社" },
    pageLabels: {
      robot: "ロボット",
      careHomes: "介護施設の方へ",
      families: "ご家族の方へ",
      safety: "安全性",
      deployment: "導入の流れ",
      newsroom: "お知らせ",
      careers: "採用",
      contact: "お問い合わせ",
      privacy: "プライバシーポリシー",
      terms: "利用規約",
    },
    legal: { privacy: "プライバシーポリシー", terms: "利用規約" },
    entity: "株式会社智渡仁 / Arclin K.K.",
    socials: { heading: "SNS", x: "X", linkedin: "LinkedIn", youtube: "YouTube" },
    localeNames: { ja: "日本語", en: "English", zh: "中文" },
    localeSwitch: "言語",
    gapNotice: "角括弧の [GAP: …] は、まだ確定していない事実の置き場所です。確定した値に順次差し替えます。",
    talkToUs: "相談する",
  },

  home: {
    meta: {
      title: "Arclin — 介護の現場に置く、コンパニオンロボット",
      description:
        "株式会社智渡仁は、介護施設、デイサービス、自宅で入居者のそばにいるコンパニオンロボットを提供しています。仕様、安全性、導入の流れを掲載しています。",
    },
    announce: { text: "介護施設向けパイロットプログラム、受付中。", cta: "お問い合わせ" },
    hero: {
      line: "A companion robot, built for elder care.",
      cjkLine: "介護の現場に置く、コンパニオンロボット。",
      cta: "ロボットを見る",
      videoLabel: "フロアで動くロボットの映像",
    },
    trustedBy: {
      eyebrow: "導入先",
      facilities: ["[GAP: pilot facility 1 name]", "[GAP: pilot facility 2 name]", "[GAP: pilot facility 3 name]"],
      sentence: "[GAP: prefectures] の [GAP: number of pilot facilities] 施設で、[GAP: residents served] 人の入居者のそばで動いています。",
      cta: "導入の相談をする",
    },
    robot: {
      eyebrow: "介護向けコンパニオンロボット",
      name: "Mimamori",
      sentences: [
        "高さ [GAP: robot height] cm、重さ [GAP: robot weight] kg。",
        "1回の充電で [GAP: battery life] 時間動き、日本語のほか [GAP: languages and dialects] を聞き取ります。",
      ] as [string, string],
      cta: "仕様を見る",
    },
    scale: {
      figures: [
        { value: "[GAP: number of facilities running]", label: "稼働中の施設" },
        { value: "[GAP: total hours logged on floors]", label: "累計稼働時間" },
        { value: "[GAP: residents served]", label: "そばにいる入居者" },
      ],
    },
    founder: {
      quote: "[GAP: founder quote — one or two factual sentences]",
      name: "[GAP: founder name]",
      title: "[GAP: founder title]",
    },
    safety: {
      sentences: [
        "記録するのは [GAP: what it records — e.g. audio, video, movement events] です。",
        "データは [GAP: where data is stored] に置かれ、見られるのは [GAP: who can see the data] だけです。",
      ] as [string, string],
      cta: "安全とプライバシーを読む",
    },
    markets: {
      eyebrow: "使われる場所",
      rows: [
        {
          title: "介護施設",
          sentences: [
            "フロアに置き、入居者のそばにいます。",
            "職員の動きがどう変わるかは、導入先の数字で示します：[GAP: measured change in staff routine at pilot sites]。",
          ] as [string, string],
          href: "/care-homes/",
          cta: "介護施設の方へ",
        },
        {
          title: "デイサービス",
          sentences: [
            "通所の時間帯だけ動かします。",
            "持ち込みと片付けにかかる時間は [GAP: setup and teardown time at a day service] です。",
          ] as [string, string],
          href: "/care-homes/",
          cta: "導入の相談をする",
        },
        {
          title: "ご自宅",
          sentences: [
            "自宅では [GAP: what it does at home] 。",
            "ご家族に知らされること、知らされないことは、ご家族向けのページに書いています。",
          ] as [string, string],
          href: "/families/",
          cta: "ご家族の方へ",
        },
      ],
    },
    interlude: {
      line: "1台の裏に、ネットワークと、更新と、支える人がいます。",
      cta: "導入の流れを見る",
    },
    closing: {
      line: "導入の話は、現場を見るところから始めます。",
      cta: "相談する",
    },
  },

  robot: {
    meta: {
      title: "ロボット — Arclin",
      description: "Mimamori の仕様。高さ、重さ、連続稼働時間、充電時間、センサー、速度、動作音、対応言語、オフライン時の動作。",
    },
    hero: {
      eyebrow: "介護向けコンパニオンロボット",
      line: "フロアに置く、コンパニオンロボット。",
      highlight: "1回の充電で [GAP: battery life] 時間",
    },
    specsTitle: "仕様",
    specs: [
      { label: "高さ", value: "[GAP: robot height] cm" },
      { label: "重さ", value: "[GAP: robot weight] kg" },
      { label: "連続稼働時間", value: "[GAP: battery life] 時間" },
      { label: "充電時間", value: "[GAP: charging time] 時間" },
      { label: "センサー", value: "[GAP: sensor suite]" },
      { label: "移動速度", value: "最大 [GAP: max speed] km/h" },
      { label: "動作音", value: "[GAP: noise level] dB" },
      { label: "対応言語と方言", value: "[GAP: languages and dialects]" },
      { label: "オフライン時の動作", value: "[GAP: offline capability]" },
    ],
    whatItDoesTitle: "何をするか",
    blocks: [
      {
        title: "そばにいる",
        body: "フロアの決まった場所で待ち、入居者のそばにいます。話しかけられれば [GAP: languages and dialects] で答えます。",
      },
      {
        title: "日常の手助け",
        body: "日課の時刻を伝えます。何をどこまで手伝うかは [GAP: daily tasks it performs, and their limits] 。",
      },
      {
        title: "安全に動く",
        body: "最大 [GAP: max speed] km/h で動き、障害物の手前 [GAP: obstacle stop distance] cm で止まります。人が倒れたときは [GAP: what it does when someone falls] 。",
      },
      {
        title: "連絡をつなぐ",
        body: "職員とご家族に、[GAP: how it notifies — app, message, call] で知らせます。知らせる内容と知らせない内容は、ご家族向けのページに書いています。",
      },
    ],
    safetySummary: {
      title: "安全性の要点",
      body: "認証の状況：[GAP: ISO 13482 status]。記録するもの、データの置き場所、保存期間は安全性のページにまとめています。",
      cta: "安全性を読む",
    },
    inBox: {
      title: "箱に入っているもの",
      items: ["ロボット本体", "[GAP: remaining box contents — charger or dock, cables, printed guide]"],
    },
    facilityProvides: {
      title: "施設側で用意するもの",
      items: [
        "[GAP: network requirement — Wi-Fi band and bandwidth]",
        "[GAP: power outlet requirement]",
        "[GAP: floor space for charging]",
      ],
    },
    closing: { line: "フロアで見てください。", cta: "相談する" },
  },

  careHomes: {
    meta: {
      title: "介護施設の方へ — Arclin",
      description: "フロアでの動き、職員の業務の変化、運用にかかる職員の時間、パイロットの始め方。",
    },
    hero: { eyebrow: "介護施設の方へ", line: "フロアに1台。職員の仕事がどう変わるか。" },
    blocks: [
      {
        title: "フロアで何をするか",
        body: "フロアの決まった場所で待ち、入居者のそばにいます。夜間は [GAP: night-time behaviour — patrol, stationary, off] 。",
      },
      {
        title: "職員の仕事はどう変わるか",
        body: "職員が手放す作業と、新しく増える作業を、導入先の記録から示します：[GAP: measured change in staff routine at pilot sites]。",
      },
      {
        title: "運用にかかる職員の時間",
        body: "1日あたり [GAP: staff minutes per day to run it — charging, checks, log review] 分です。内訳は導入の流れのページに書いています。",
      },
      {
        title: "パイロットの始め方",
        body: "現地調査、職員研修、稼働の順に進みます。発注から稼働までは [GAP: time from order to running] です。",
      },
    ],
    closing: { line: "図面と夜勤の体制を見せてください。そこから始めます。", cta: "相談する" },
  },

  families: {
    meta: {
      title: "ご家族の方へ — Arclin",
      description: "ロボットと過ごす1日、ご家族に知らされることと知らされないこと、人に連絡する方法。",
    },
    hero: { eyebrow: "ご家族の方へ", line: "親のそばに、ロボットが1台いるということ。" },
    day: {
      title: "1日の様子",
      body: "朝は [GAP: morning behaviour] 。日中は入居者のそばにいます。夜は [GAP: night behaviour] 。",
    },
    told: {
      title: "知らされること、知らされないこと",
      will: ["[GAP: what families are notified of — e.g. falls, missed meals]", "[GAP: how often a summary is sent]"],
      willNot: ["[GAP: what is not shared — e.g. audio, video, conversation content]"],
    },
    reach: {
      title: "人に連絡するには",
      body: "施設の職員には [GAP: how families reach staff] 。Arclin には [GAP: support contact and hours] 。",
    },
    closing: { line: "聞きたいことがあれば、人が答えます。", cta: "お問い合わせ" },
  },

  safety: {
    meta: {
      title: "安全性 — Arclin",
      description:
        "認証の状況、記録するもの、データの保存場所と管理者、保存期間、同意の撤回、身体的な安全、ネットワークが切れたときの動作。",
    },
    hero: { eyebrow: "安全とプライバシー", line: "何を記録し、どこに置き、誰が見るか。" },
    summaryTitle: "要点",
    summary: [
      { label: "認証の状況", value: "[GAP: ISO 13482 status and Japanese regulatory position]" },
      { label: "記録するもの", value: "[GAP: what it records]" },
      { label: "記録しないもの", value: "[GAP: what it does not record]" },
      { label: "データの保存場所と管理者", value: "[GAP: where data is stored and under whose control]" },
      { label: "保存期間", value: "[GAP: retention period]" },
      { label: "同意の撤回", value: "[GAP: how consent is withdrawn and what happens to the data]" },
      {
        label: "身体的な安全",
        value: "最大 [GAP: max speed] km/h。障害物の手前 [GAP: obstacle stop distance] cm で停止。転倒時は [GAP: what it does if someone falls] 。",
      },
      { label: "ネットワークが切れたとき", value: "[GAP: behaviour when the network drops]" },
    ],
    detailTitle: "詳細",
    details: [
      {
        title: "認証の状況",
        body: "ISO 13482 は [GAP: ISO 13482 status] 。日本国内の規制上の位置づけは [GAP: Japanese regulatory position] 。保険と責任の範囲は [GAP: insurance and liability model] 。",
      },
      {
        title: "記録するもの、しないもの",
        body: "記録するのは [GAP: what it records] 。記録しないのは [GAP: what it does not record] 。",
      },
      {
        title: "データの保存場所と管理者",
        body: "データは [GAP: where data is stored] に置かれます。管理者は [GAP: who controls the data] 。閲覧できるのは [GAP: who can see the data] 。",
      },
      { title: "保存期間", body: "[GAP: retention period] で削除します。削除の方法は [GAP: deletion method] 。" },
      {
        title: "同意の撤回",
        body: "同意は [GAP: how consent is withdrawn] で撤回できます。撤回後、データは [GAP: what happens to data after withdrawal] 。",
      },
      {
        title: "身体的な安全",
        body: "最大 [GAP: max speed] km/h で動き、障害物の手前 [GAP: obstacle stop distance] cm で止まります。人が倒れたときは [GAP: what it does if someone falls] 。",
      },
      {
        title: "ネットワークが切れたとき",
        body: "ネットワークが切れると [GAP: behaviour when the network drops] 。復帰後は [GAP: what happens after reconnection] 。",
      },
    ],
    closing: { line: "ここに書いていないことは、聞いてください。", cta: "お問い合わせ" },
  },

  deployment: {
    meta: {
      title: "導入の流れ — Arclin",
      description: "発注から稼働までの期間、現地調査、職員研修、サポート体制、ネットワーク要件、更新。",
    },
    hero: { eyebrow: "導入の流れ", line: "発注から稼働まで、[GAP: time from order to running]。" },
    blocks: [
      {
        title: "発注から稼働まで",
        body: "発注から稼働までは [GAP: time from order to running] です。その間に現地調査と職員研修を行います。",
      },
      {
        title: "現地調査",
        body: "フロアの動線、充電場所、ネットワークの状態を確認します。所要時間は [GAP: site survey duration] 。",
      },
      { title: "職員研修", body: "[GAP: training duration and format] 。対象は [GAP: which staff are trained] 。" },
      {
        title: "サポート体制",
        body: "問い合わせ先は [GAP: support channel] 、対応時間は [GAP: support hours] 。現地対応が必要なときは [GAP: on-site response time] 。",
      },
      {
        title: "ネットワーク要件",
        body: "[GAP: Wi-Fi band, bandwidth, ports] 。ネットワークが切れたときの動作は安全性のページに書いています。",
      },
      {
        title: "更新",
        body: "ソフトウェアは [GAP: update cadence] で更新します。更新の時間帯は [GAP: when updates are applied — e.g. at night while charging] 。",
      },
    ],
    closing: { line: "現地調査から始めます。", cta: "相談する" },
  },

  newsroom: {
    meta: { title: "お知らせ — Arclin", description: "株式会社智渡仁からのお知らせ。" },
    hero: { eyebrow: "お知らせ", line: "会社と製品についての発表。" },
    intro: "発表があるときに、ここに載せます。",
    entries: [] as { date: string; title: string; body: string; href?: string }[],
    empty: "お知らせはまだありません。",
  },

  careers: {
    meta: { title: "採用 — Arclin", description: "Arclin での仕事、募集中の職種、応募方法。" },
    hero: { eyebrow: "採用", line: "介護の現場に置くロボットをつくる仕事。" },
    about:
      "介護施設のフロアで動くロボットと、その裏のネットワーク、更新、サポートをつくります。勤務地は [GAP: office location] 、働き方は [GAP: remote or on-site policy] です。",
    rolesTitle: "募集中の職種",
    roles: [] as { title: string; location: string; href?: string }[],
    rolesEmpty: "現在、募集中の職種はありません。",
    apply: {
      title: "応募の方法",
      body: "メールで、経歴と、どの仕事に関心があるかを送ってください。返信までの期間は [GAP: response time] です。",
      cta: "メールを送る",
      subject: "応募について",
    },
  },

  contact: {
    meta: { title: "お問い合わせ — Arclin", description: "メールでのお問い合わせ。書いていただきたい内容と、返信までの期間。" },
    hero: { eyebrow: "お問い合わせ", line: "メールで送ってください。人が読みます。" },
    emailLabel: "メール",
    subject: "お問い合わせ",
    include: { title: "書いていただきたいこと", items: ["施設名または所在地", "施設の種類と入居者の人数", "聞きたいこと"] },
    responseTime: "返信までの期間：[GAP: response time]",
    cta: "メールを送る",
  },

  terms: {
    meta: { title: "利用規約 — Arclin", description: "株式会社智渡仁のウェブサイト利用規約。" },
    kicker: "法的情報",
    title: "利用規約",
    updated: "最終更新：[PLACEHOLDER]",
    back: "トップへ戻る",
    intro: "本規約は、株式会社智渡仁（以下「当社」）のウェブサイトの利用条件を定めるものです。",
    sections: [
      { h: "1. 適用", b: "[PLACEHOLDER — 法務確認後に確定] 本規約は、当社ウェブサイトの利用に関わる一切の関係に適用されます。" },
      { h: "2. 禁止事項", b: "[PLACEHOLDER] 法令または公序良俗に反する行為、当社のサービスの運営を妨げる行為。" },
      { h: "3. 知的財産", b: "[PLACEHOLDER] 本ウェブサイトの文章、画像、映像の権利は当社または権利者に帰属します。" },
      { h: "4. 免責", b: "[PLACEHOLDER] 掲載内容の正確性について、当社は保証しません。" },
      { h: "5. 準拠法と管轄", b: "[PLACEHOLDER] 日本法に準拠し、[PLACEHOLDER] 地方裁判所を第一審の専属的合意管轄裁判所とします。" },
      { h: "6. お問い合わせ窓口", b: "[PLACEHOLDER] 連絡先メールアドレス。" },
    ],
    note: "本ページの各条項は法務レビュー前のプレースホルダーです。公開前に確定してください。",
  },
};

export type Messages = typeof ja;
