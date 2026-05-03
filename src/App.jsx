import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  Aperture,
  ArrowUpRight,
  BadgeDollarSign,
  Briefcase,
  ChevronDown,
  CircleDot,
  Film,
  FolderOpen,
  Menu,
  Play,
  Route,
  ScanSearch,
  Sparkles,
  X
} from "lucide-react";

const translations = {
  ENG: {
    nav: [
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Deals", href: "#deals" },
      { label: "Stack", href: "#stack" },
      { label: "Contact", href: "#contact" }
    ],
    languageLabel: "Language",
    menu: {
      button: "MENU",
      close: "Close menu",
      ghost: "NOIRVISION",
      footer: ["Instagram", "Telegram", "Email / Contact"]
    },
    pageTurn: {
      label: "CURRENT PAGE",
      pages: {
        top: "Offer case",
        process: "Investigation",
        path: "Conversion path",
        stack: "Stack dossier",
        directions: "Departments",
        deals: "Case packages",
        contact: "Contact file"
      }
    },
    hero: {
      eyebrow: "NOIRVISION // AI-FIRST CREATIVE STUDIO",
      headlineTop: "You bring the offer.",
      headlineBottom: "We build the funnel.",
      headlineLead: ["You bring", "the offer."],
      headlineSpotlight: ["We build", "the funnel."],
      secondary: "Not clips. Conversion paths.",
      subheadline:
        "NoirVision turns iGaming offers and product ideas into short-form videos, landing pages, UGC campaigns, AI-generated motion visuals, and launch-ready creative systems.",
      bodyStart: "We do not create content just to look good. We create ",
      bodyHighlight: "content that catches attention",
      bodyEnd:
        ", explains value in seconds, and moves users toward action: click, registration, deposit, purchase, or lead.",
      primary: "Launch a campaign",
      secondaryButton: "Open live portfolio",
      trust: "iGaming • UGC • AI visuals • Landing pages • Creative funnels"
    },
    terminal: {
      eyebrow: "LIVE PORTFOLIO TERMINAL",
      title: "Open case files",
      intro: "Click a case. See the raw offer, the creative solution, the video, and the landing.",
      mobileHint: "Tap a case to open video evidence.",
      fileLabel: "Case file",
      rawLabel: "Raw offer",
      outputLabel: "Output",
      resultLabel: "Result",
      clickLabel: "Open file"
    },
    modal: {
      eyebrow: "CASE STUDY",
      rawOffer: "RAW OFFER",
      creativeAngle: "CREATIVE ANGLE",
      videoOutput: "VIDEO OUTPUT",
      landingPreview: "LANDING PREVIEW",
      action: "ACTION",
      clientCameWith: "Client came with",
      weTurnedInto: "We turned it into",
      landingEvidence: "Landing evidence",
      viewLanding: "View landing",
      requestSimilar: "Request similar campaign",
      close: "Close case file",
      videoUrl: "videoUrl",
      screen: "screen"
    },
    process: {
      eyebrow: "The Investigation",
      title: "Every offer is a case. Every case needs a hook.",
      subtitle:
        "Every campaign starts as a raw clue: an offer, a product, or a growth problem. We investigate it, find the hook, build the creative, and turn it into a launch-ready funnel.",
      evidence: "Evidence",
      steps: [
        {
          title: "Raw Offer",
          description:
            "You send the offer, product idea, promo mechanic, audience, brand assets, and campaign goal."
        },
        {
          title: "Find the Hook",
          description:
            "We identify the strongest trigger, the first-second angle, CTA, audience logic, and landing promise."
        },
        {
          title: "Build the Creative",
          description:
            "We generate AI motion scenes, UGC-style content, offer graphics, UI overlays, and short-form video assets."
        },
        {
          title: "Connect the Landing",
          description:
            "The landing page repeats the same promise from the video and makes the next step obvious."
        },
        {
          title: "Launch & Test",
          description:
            "You receive multiple variations for testing: videos, landing, banners, thumbnails, copy, and CTA versions."
        }
      ]
    },
    path: {
      eyebrow: "Conversion path",
      title: "Not a clip. A conversion path.",
      text:
        "A video alone is not the product. The system around it is. We connect the offer, hook, creative, landing page, and test assets into one path built for action.",
      flow: ["Raw Offer", "Hook", "AI Motion / UGC Video", "Landing Page", "Launch Assets", "Test & Iterate"],
      highlight: "Raw offer in. Launch-ready funnel out."
    },
    stack: {
      eyebrow: "AI-first production",
      title: "The Stack Behind the Funnel",
      subtitle: "AI-first production without traditional 40-hour animation timelines.",
      text:
        "NoirVision does not rely on one generator or classic motion-heavy production. We combine the newest AI tools, UGC systems, image models, video models, editing tools, and landing builders to create campaign assets faster.",
      positioning:
        "Motion-design-level visuals without 40-hour animation timelines.",
      flow: ["Strategy", "Styleframes", "AI Motion", "UGC", "UI", "Edit", "Landing", "Test"],
      categories: [
        { title: "Strategy & Scripts", tools: ["GPT-5.5", "Claude Opus 4.7", "Claude Sonnet 4.6"] },
        { title: "Coding / Web Landing", tools: ["Codex", "Claude Code", "Next.js", "React"] },
        { title: "Image / Styleframes", tools: ["Midjourney", "GPT Image 2", "Nano Banana"] },
        { title: "AI Video / Motion", tools: ["Kling", "Higgsfield Cinema Studio", "Higgsfield Marketing Studio", "Runway", "Veo"] },
        { title: "UGC / Creator-style", tools: ["Higgsfield Marketing Studio", "HeyGen", "AI UGC workflows", "Real creators when needed"] },
        { title: "Design / UI", tools: ["Figma"] },
        { title: "Fast Edit / Post", tools: ["CapCut", "DaVinci Resolve"] },
        { title: "Landing / Web", tools: ["Next.js", "React", "Webflow", "Codex", "Claude Code"] }
      ]
    },
    directions: {
      eyebrow: "Departments",
      title: "Two departments. One goal: attention that converts.",
      department: "DEPARTMENT",
      panels: [
        {
          title: "iGaming Division",
          subtitle: "Core direction",
          description:
            "Casino, betting, freebet, referral, bonus, cashback, deposit, tournament, and event-based promo campaigns.",
          tags: [
            "Casino Ads",
            "Betting Promos",
            "Freebet Offers",
            "Referral Funnels",
            "Bonus Campaigns",
            "Deposit Creatives",
            "Promo Landings",
            "UGC Ads"
          ]
        },
        {
          title: "UGC Product Division",
          subtitle: "For brands that need trust",
          description:
            "Creator-style campaigns for cosmetics, apps, e-commerce, fintech, lifestyle, and digital products.",
          tags: ["Beauty", "Apps", "E-commerce", "Fintech", "Lifestyle", "Product Launches", "Creator Ads", "Social Proof"]
        }
      ]
    },
    packages: {
      eyebrow: "Case Packages",
      title: "Case Packages",
      subtitle:
        "Starting points for different levels of production. Final scope depends on campaign volume, creative complexity, and production budget.",
      note:
        "Generation and production material budget is calculated separately depending on the volume and complexity. Typical range: $50–150.",
      bestFor: "Best for",
      labels: {
        caseType: "CASE TYPE",
        priceStamp: "PRICE STAMP",
        mission: "MISSION",
        deliverables: "DELIVERABLES",
        bestFor: "BEST FOR",
        approved: "APPROVED FOR LAUNCH"
      },
      items: [
        {
          title: "Single Case",
          price: "$155",
          stamp: "1 OFFER",
          subtitle: "1 video + 1 landing page",
          includes: [
            "20–30 sec short-form video",
            "offer-based landing page",
            "hook + script",
            "basic storyboard",
            "UI overlays",
            "sound design",
            "CTA screen",
            "format of your choice",
            "2 revision rounds"
          ],
          footer: "testing one clear offer."
        },
        {
          title: "Campaign File",
          price: "$777–$1111",
          stamp: "CORE",
          subtitle: "5–7 videos + campaign system",
          includes: [
            "5–7 short-form videos",
            "multiple hooks and angles",
            "landing page or campaign landing",
            "creative strategy",
            "storyboards",
            "AI-generated motion visuals",
            "UGC-style assets",
            "UI graphics",
            "banners / thumbnails",
            "ad copy suggestions",
            "testing recommendations"
          ],
          footer: "iGaming, promo campaigns, and serious launches."
        },
        {
          title: "Brand Case",
          price: "$555–$777",
          stamp: "UGC",
          subtitle: "5–7 videos + campaign system",
          includes: [
            "UGC-style campaign concept",
            "product-focused videos",
            "creator-style scripts",
            "landing page",
            "content plan",
            "short-form assets",
            "basic campaign structure"
          ],
          footer: "cosmetics, apps, e-commerce, and lifestyle brands."
        },
        {
          title: "Partner File",
          price: "$77/video + 10%",
          stamp: "PARTNER",
          subtitle: "Lower upfront fee + performance share",
          includes: [
            "$77 per video",
            "10% from tracked sales / revenue / traffic value",
            "90-day revenue share window",
            "transparent tracking required",
            "terms discussed individually"
          ],
          footer: "selected long-term partners only."
        }
      ]
    },
    cta: {
      eyebrow: "Open the case",
      title: "Bring the offer. We’ll open the case.",
      text:
        "Send us the raw offer, product idea, or campaign goal. We’ll turn it into a creative direction, AI-motion video concept, UGC angle, landing page, and launch-ready assets.",
      primary: "Start a campaign",
      secondary: "Open live portfolio"
    },
    footer: {
      text: "AI-first creative systems for iGaming and UGC brands."
    }
  },
  RU: {
    nav: [
      { label: "Работы", href: "#work" },
      { label: "Процесс", href: "#process" },
      { label: "Пакеты", href: "#deals" },
      { label: "Стек", href: "#stack" },
      { label: "Контакт", href: "#contact" }
    ],
    languageLabel: "Язык",
    menu: {
      button: "МЕНЮ",
      close: "Закрыть меню",
      ghost: "NOIRVISION",
      footer: ["Instagram", "Telegram", "Email / Contact"]
    },
    pageTurn: {
      label: "ТЕКУЩИЙ ЛИСТ",
      pages: {
        top: "Оффер-кейс",
        process: "Расследование",
        path: "Путь к конверсии",
        stack: "Досье стека",
        directions: "Направления",
        deals: "Пакеты кейсов",
        contact: "Контактный лист"
      }
    },
    hero: {
      eyebrow: "NOIRVISION // AI-FIRST КРЕАТИВНАЯ СТУДИЯ",
      headlineTop: "Вы приносите оффер.",
      headlineBottom: "Мы строим воронку.",
      headlineLead: ["Вы приносите", "оффер."],
      headlineSpotlight: ["Мы строим", "воронку."],
      secondary: "Не клипы. Пути к конверсии.",
      subheadline:
        "NoirVision превращает iGaming-офферы и продуктовые идеи в short-form видео, лендинги, UGC-кампании, AI-generated motion visuals и готовые к запуску креативные системы.",
      bodyStart: "Мы не создаём контент просто ради красивой картинки. Мы создаём ",
      bodyHighlight: "контент, который цепляет внимание",
      bodyEnd:
        ", объясняет ценность за секунды и ведёт пользователя к действию: клику, регистрации, депозиту, покупке или заявке.",
      primary: "Запустить кампанию",
      secondaryButton: "Открыть портфолио",
      trust: "iGaming • UGC • AI-визуалы • Лендинги • Креативные воронки"
    },
    terminal: {
      eyebrow: "LIVE PORTFOLIO TERMINAL",
      title: "Открыть кейсы",
      intro: "Нажмите на кейс. Посмотрите исходный оффер, креативное решение, видео и лендинг.",
      mobileHint: "Нажмите на кейс, чтобы открыть видео-доказательство.",
      fileLabel: "Файл кейса",
      rawLabel: "Сырой оффер",
      outputLabel: "Выход",
      resultLabel: "Результат",
      clickLabel: "Открыть файл"
    },
    modal: {
      eyebrow: "КЕЙС",
      rawOffer: "СЫРОЙ ОФФЕР",
      creativeAngle: "КРЕАТИВНЫЙ УГОЛ",
      videoOutput: "ВИДЕО",
      landingPreview: "ЛЕНДИНГ",
      action: "ДЕЙСТВИЕ",
      clientCameWith: "Клиент пришёл с",
      weTurnedInto: "Мы превратили это в",
      landingEvidence: "Лендинг",
      viewLanding: "Посмотреть лендинг",
      requestSimilar: "Заказать похожую кампанию",
      close: "Закрыть кейс",
      videoUrl: "videoUrl",
      screen: "экран"
    },
    process: {
      eyebrow: "Расследование",
      title: "Каждый оффер — кейс. Каждому кейсу нужен hook.",
      subtitle:
        "Каждая кампания начинается как улика: оффер, продуктовая идея или проблема роста. Мы разбираем её, находим hook, строим креатив и превращаем всё в готовую к запуску воронку.",
      evidence: "Улика",
      steps: [
        {
          title: "Сырой оффер",
          description:
            "Вы присылаете оффер, идею продукта, промо-механику, аудиторию, бренд-материалы и цель кампании."
        },
        {
          title: "Находим hook",
          description:
            "Мы определяем главный триггер, угол первых секунд, CTA, логику аудитории и обещание лендинга."
        },
        {
          title: "Строим креатив",
          description:
            "Мы генерируем AI motion-сцены, UGC-style контент, офферную графику, UI overlays и short-form видео."
        },
        {
          title: "Подключаем лендинг",
          description: "Лендинг повторяет то же обещание из видео и делает следующий шаг очевидным."
        },
        {
          title: "Запуск и тест",
          description:
            "Вы получаете варианты для теста: видео, лендинг, баннеры, thumbnails, тексты и CTA-версии."
        }
      ]
    },
    path: {
      eyebrow: "Путь к конверсии",
      title: "Не клип. Путь к конверсии.",
      text:
        "Само видео — это ещё не продукт. Продукт — это система вокруг него. Мы соединяем оффер, hook, креатив, лендинг и тестовые материалы в один путь, который ведёт к действию.",
      flow: ["Сырой оффер", "Hook", "AI Motion / UGC Video", "Лендинг", "Launch Assets", "Test & Iterate"],
      highlight: "Сырой оффер на входе. Готовая воронка на выходе."
    },
    stack: {
      eyebrow: "AI-first production",
      title: "Стек за воронкой",
      subtitle: "AI-first production без классических 40-часовых циклов анимации.",
      text:
        "NoirVision не зависит от одного генератора или классического motion-heavy production. Мы объединяем новые AI-инструменты, UGC-системы, image models, video models, editing tools и landing builders, чтобы создавать кампейн-ассеты быстрее.",
      positioning:
        "Визуалы уровня motion design без 40 часов ручной анимации.",
      flow: ["Strategy", "Styleframes", "AI Motion", "UGC", "UI", "Edit", "Landing", "Test"],
      categories: [
        { title: "Strategy & Scripts", tools: ["GPT-5.5", "Claude Opus 4.7", "Claude Sonnet 4.6"] },
        { title: "Coding / Web Landing", tools: ["Codex", "Claude Code", "Next.js", "React"] },
        { title: "Image / Styleframes", tools: ["Midjourney", "GPT Image 2", "Nano Banana"] },
        { title: "AI Video / Motion", tools: ["Kling", "Higgsfield Cinema Studio", "Higgsfield Marketing Studio", "Runway", "Veo"] },
        { title: "UGC / Creator-style", tools: ["Higgsfield Marketing Studio", "HeyGen", "AI UGC workflows", "Real creators when needed"] },
        { title: "Design / UI", tools: ["Figma"] },
        { title: "Fast Edit / Post", tools: ["CapCut", "DaVinci Resolve"] },
        { title: "Landing / Web", tools: ["Next.js", "React", "Webflow", "Codex", "Claude Code"] }
      ]
    },
    directions: {
      eyebrow: "Департаменты",
      title: "Два направления. Одна цель: внимание, которое конвертит.",
      department: "ДЕПАРТАМЕНТ",
      panels: [
        {
          title: "iGaming Division",
          subtitle: "Основное направление",
          description:
            "Casino, betting, freebet, referral, bonus, cashback, deposit, tournament и event-based promo campaigns.",
          tags: [
            "Casino Ads",
            "Betting Promos",
            "Freebet Offers",
            "Referral Funnels",
            "Bonus Campaigns",
            "Deposit Creatives",
            "Promo Landings",
            "UGC Ads"
          ]
        },
        {
          title: "UGC Product Division",
          subtitle: "Для брендов, которым нужно доверие",
          description:
            "Creator-style кампании для cosmetics, apps, e-commerce, fintech, lifestyle и digital products.",
          tags: ["Beauty", "Apps", "E-commerce", "Fintech", "Lifestyle", "Product Launches", "Creator Ads", "Social Proof"]
        }
      ]
    },
    packages: {
      eyebrow: "Пакеты кейсов",
      title: "Пакеты кейсов",
      subtitle:
        "Стартовые пакеты для разных уровней продакшна. Финальный scope зависит от объёма кампании, сложности креатива и production budget.",
      note:
        "Бюджет на генерации и production materials считается отдельно в зависимости от объёма и сложности. Ориентир: $50–150.",
      bestFor: "Лучше всего для",
      labels: {
        caseType: "ТИП КЕЙСА",
        priceStamp: "ШТАМП ЦЕНЫ",
        mission: "МИССИЯ",
        deliverables: "МАТЕРИАЛЫ",
        bestFor: "ЛУЧШЕ ДЛЯ",
        approved: "ГОТОВО К ЗАПУСКУ"
      },
      items: [
        {
          title: "Single Case",
          price: "$155",
          stamp: "1 ОФФЕР",
          subtitle: "1 видео + 1 лендинг",
          includes: [
            "20–30 sec short-form видео",
            "офферный лендинг",
            "hook + сценарий",
            "базовый storyboard",
            "UI overlays",
            "sound design",
            "CTA screen",
            "формат на ваш выбор",
            "2 раунда правок"
          ],
          footer: "теста одного понятного оффера."
        },
        {
          title: "Campaign File",
          price: "$777–$1111",
          stamp: "CORE",
          subtitle: "5–7 видео + campaign system",
          includes: [
            "5–7 short-form видео",
            "несколько hooks и angles",
            "лендинг или campaign landing",
            "creative strategy",
            "storyboards",
            "AI-generated motion visuals",
            "UGC-style assets",
            "UI graphics",
            "banners / thumbnails",
            "ad copy suggestions",
            "testing recommendations"
          ],
          footer: "iGaming, promo campaigns и серьёзных запусков."
        },
        {
          title: "Brand Case",
          price: "$555–$777",
          stamp: "UGC",
          subtitle: "Для продуктовых брендов",
          includes: [
            "UGC-style campaign concept",
            "product-focused videos",
            "creator-style scripts",
            "landing page",
            "content plan",
            "short-form assets",
            "basic campaign structure"
          ],
          footer: "cosmetics, apps, e-commerce и lifestyle brands."
        },
        {
          title: "Partner File",
          price: "$77/video + 10%",
          stamp: "PARTNER",
          subtitle: "Ниже upfront fee + performance share",
          includes: [
            "$77 за видео",
            "10% от tracked sales / revenue / traffic value",
            "revenue share window 90 дней",
            "нужен transparent tracking",
            "условия обсуждаются индивидуально"
          ],
          footer: "выбранных долгосрочных партнёров."
        }
      ]
    },
    cta: {
      eyebrow: "Открыть кейс",
      title: "Приносите оффер. Мы откроем кейс.",
      text:
        "Пришлите сырой оффер, идею продукта или цель кампании. Мы превратим это в креативное направление, AI-motion video concept, UGC angle, лендинг и launch-ready assets.",
      primary: "Запустить кампанию",
      secondary: "Открыть портфолио"
    },
    footer: {
      text: "AI-first креативные системы для iGaming и UGC-брендов."
    }
  },
  UA: {
    nav: [
      { label: "Роботи", href: "#work" },
      { label: "Процес", href: "#process" },
      { label: "Пакети", href: "#deals" },
      { label: "Стек", href: "#stack" },
      { label: "Контакт", href: "#contact" }
    ],
    languageLabel: "Мова",
    menu: {
      button: "МЕНЮ",
      close: "Закрити меню",
      ghost: "NOIRVISION",
      footer: ["Instagram", "Telegram", "Email / Contact"]
    },
    pageTurn: {
      label: "ПОТОЧНИЙ ЛИСТ",
      pages: {
        top: "Оффер-кейс",
        process: "Розслідування",
        path: "Шлях до конверсії",
        stack: "Досьє стеку",
        directions: "Напрями",
        deals: "Пакети кейсів",
        contact: "Контактний лист"
      }
    },
    hero: {
      eyebrow: "NOIRVISION // AI-FIRST КРЕАТИВНА СТУДІЯ",
      headlineTop: "Ви приносите оффер.",
      headlineBottom: "Ми будуємо воронку.",
      headlineLead: ["Ви приносите", "оффер."],
      headlineSpotlight: ["Ми будуємо", "воронку."],
      secondary: "Не кліпи. Шляхи до конверсії.",
      subheadline:
        "NoirVision перетворює iGaming-оффери та продуктові ідеї на short-form відео, лендинги, UGC-кампанії, AI-generated motion visuals і готові до запуску креативні системи.",
      bodyStart: "Ми не створюємо контент просто заради красивої картинки. Ми створюємо ",
      bodyHighlight: "контент, який чіпляє увагу",
      bodyEnd:
        ", пояснює цінність за секунди і веде користувача до дії: кліку, реєстрації, депозиту, покупки або заявки.",
      primary: "Запустити кампанію",
      secondaryButton: "Відкрити портфоліо",
      trust: "iGaming • UGC • AI-візуали • Лендинги • Креативні воронки"
    },
    terminal: {
      eyebrow: "LIVE PORTFOLIO TERMINAL",
      title: "Відкрити кейси",
      intro: "Натисніть на кейс. Подивіться початковий оффер, креативне рішення, відео та лендинг.",
      mobileHint: "Натисніть на кейс, щоб відкрити відео-доказ.",
      fileLabel: "Файл кейсу",
      rawLabel: "Сирий оффер",
      outputLabel: "Вихід",
      resultLabel: "Результат",
      clickLabel: "Відкрити файл"
    },
    modal: {
      eyebrow: "КЕЙС",
      rawOffer: "СИРИЙ ОФФЕР",
      creativeAngle: "КРЕАТИВНИЙ КУТ",
      videoOutput: "ВІДЕО",
      landingPreview: "ЛЕНДИНГ",
      action: "ДІЯ",
      clientCameWith: "Клієнт прийшов з",
      weTurnedInto: "Ми перетворили це на",
      landingEvidence: "Лендинг",
      viewLanding: "Подивитися лендинг",
      requestSimilar: "Замовити схожу кампанію",
      close: "Закрити кейс",
      videoUrl: "videoUrl",
      screen: "екран"
    },
    process: {
      eyebrow: "Розслідування",
      title: "Кожен оффер — кейс. Кожному кейсу потрібен hook.",
      subtitle:
        "Кожна кампанія починається як доказ: оффер, продуктова ідея або проблема росту. Ми розбираємо її, знаходимо hook, будуємо креатив і перетворюємо все на готову до запуску воронку.",
      evidence: "Доказ",
      steps: [
        {
          title: "Сирий оффер",
          description:
            "Ви надсилаєте оффер, ідею продукту, промо-механіку, аудиторію, бренд-матеріали та ціль кампанії."
        },
        {
          title: "Знаходимо hook",
          description:
            "Ми визначаємо головний тригер, кут перших секунд, CTA, логіку аудиторії та обіцянку лендинга."
        },
        {
          title: "Будуємо креатив",
          description:
            "Ми генеруємо AI motion-сцени, UGC-style контент, офферну графіку, UI overlays і short-form відео."
        },
        {
          title: "Підключаємо лендинг",
          description: "Лендинг повторює ту саму обіцянку з відео і робить наступний крок очевидним."
        },
        {
          title: "Запуск і тест",
          description:
            "Ви отримуєте варіанти для тесту: відео, лендинг, банери, thumbnails, тексти та CTA-версії."
        }
      ]
    },
    path: {
      eyebrow: "Шлях до конверсії",
      title: "Не кліп. Шлях до конверсії.",
      text:
        "Саме відео — це ще не продукт. Продукт — це система навколо нього. Ми з’єднуємо оффер, hook, креатив, лендинг і тестові матеріали в один шлях, який веде до дії.",
      flow: ["Сирий оффер", "Hook", "AI Motion / UGC Video", "Лендинг", "Launch Assets", "Test & Iterate"],
      highlight: "Сирий оффер на вході. Готова воронка на виході."
    },
    stack: {
      eyebrow: "AI-first production",
      title: "Стек за воронкою",
      subtitle: "AI-first production без класичних 40-годинних циклів анімації.",
      text:
        "NoirVision не залежить від одного генератора або класичного motion-heavy production. Ми об’єднуємо нові AI-інструменти, UGC-системи, image models, video models, editing tools і landing builders, щоб створювати campaign assets швидше.",
      positioning:
        "Візуали рівня motion design без 40 годин ручної анімації.",
      flow: ["Strategy", "Styleframes", "AI Motion", "UGC", "UI", "Edit", "Landing", "Test"],
      categories: [
        { title: "Strategy & Scripts", tools: ["GPT-5.5", "Claude Opus 4.7", "Claude Sonnet 4.6"] },
        { title: "Coding / Web Landing", tools: ["Codex", "Claude Code", "Next.js", "React"] },
        { title: "Image / Styleframes", tools: ["Midjourney", "GPT Image 2", "Nano Banana"] },
        { title: "AI Video / Motion", tools: ["Kling", "Higgsfield Cinema Studio", "Higgsfield Marketing Studio", "Runway", "Veo"] },
        { title: "UGC / Creator-style", tools: ["Higgsfield Marketing Studio", "HeyGen", "AI UGC workflows", "Real creators when needed"] },
        { title: "Design / UI", tools: ["Figma"] },
        { title: "Fast Edit / Post", tools: ["CapCut", "DaVinci Resolve"] },
        { title: "Landing / Web", tools: ["Next.js", "React", "Webflow", "Codex", "Claude Code"] }
      ]
    },
    directions: {
      eyebrow: "Департаменти",
      title: "Два напрями. Одна ціль: увага, яка конвертить.",
      department: "ДЕПАРТАМЕНТ",
      panels: [
        {
          title: "iGaming Division",
          subtitle: "Основний напрям",
          description:
            "Casino, betting, freebet, referral, bonus, cashback, deposit, tournament та event-based promo campaigns.",
          tags: [
            "Casino Ads",
            "Betting Promos",
            "Freebet Offers",
            "Referral Funnels",
            "Bonus Campaigns",
            "Deposit Creatives",
            "Promo Landings",
            "UGC Ads"
          ]
        },
        {
          title: "UGC Product Division",
          subtitle: "Для брендів, яким потрібна довіра",
          description:
            "Creator-style кампанії для cosmetics, apps, e-commerce, fintech, lifestyle та digital products.",
          tags: ["Beauty", "Apps", "E-commerce", "Fintech", "Lifestyle", "Product Launches", "Creator Ads", "Social Proof"]
        }
      ]
    },
    packages: {
      eyebrow: "Пакети кейсів",
      title: "Пакети кейсів",
      subtitle:
        "Стартові пакети для різних рівнів продакшну. Фінальний scope залежить від обсягу кампанії, складності креативу та production budget.",
      note:
        "Бюджет на генерації та production materials рахується окремо залежно від обсягу і складності. Орієнтир: $50–150.",
      bestFor: "Найкраще для",
      labels: {
        caseType: "ТИП КЕЙСУ",
        priceStamp: "ШТАМП ЦІНИ",
        mission: "МІСІЯ",
        deliverables: "МАТЕРІАЛИ",
        bestFor: "НАЙКРАЩЕ ДЛЯ",
        approved: "ГОТОВО ДО ЗАПУСКУ"
      },
      items: [
        {
          title: "Single Case",
          price: "$155",
          stamp: "1 ОФФЕР",
          subtitle: "1 відео + 1 лендинг",
          includes: [
            "20–30 sec short-form відео",
            "офферний лендинг",
            "hook + сценарій",
            "базовий storyboard",
            "UI overlays",
            "sound design",
            "CTA screen",
            "формат на ваш вибір",
            "2 раунди правок"
          ],
          footer: "тесту одного зрозумілого оффера."
        },
        {
          title: "Campaign File",
          price: "$777–$1111",
          stamp: "CORE",
          subtitle: "5–7 відео + campaign system",
          includes: [
            "5–7 short-form відео",
            "кілька hooks і angles",
            "лендинг або campaign landing",
            "creative strategy",
            "storyboards",
            "AI-generated motion visuals",
            "UGC-style assets",
            "UI graphics",
            "banners / thumbnails",
            "ad copy suggestions",
            "testing recommendations"
          ],
          footer: "iGaming, promo campaigns і серйозних запусків."
        },
        {
          title: "Brand Case",
          price: "$555–$777",
          stamp: "UGC",
          subtitle: "Для продуктових брендів",
          includes: [
            "UGC-style campaign concept",
            "product-focused videos",
            "creator-style scripts",
            "landing page",
            "content plan",
            "short-form assets",
            "basic campaign structure"
          ],
          footer: "cosmetics, apps, e-commerce і lifestyle brands."
        },
        {
          title: "Partner File",
          price: "$77/video + 10%",
          stamp: "PARTNER",
          subtitle: "Нижчий upfront fee + performance share",
          includes: [
            "$77 за відео",
            "10% від tracked sales / revenue / traffic value",
            "revenue share window 90 днів",
            "потрібен transparent tracking",
            "умови обговорюються індивідуально"
          ],
          footer: "вибраних довгострокових партнерів."
        }
      ]
    },
    cta: {
      eyebrow: "Відкрити кейс",
      title: "Приносьте оффер. Ми відкриємо кейс.",
      text:
        "Надішліть сирий оффер, ідею продукту або ціль кампанії. Ми перетворимо це на креативний напрям, AI-motion video concept, UGC angle, лендинг і launch-ready assets.",
      primary: "Запустити кампанію",
      secondary: "Відкрити портфоліо"
    },
    footer: {
      text: "AI-first креативні системи для iGaming та UGC-брендів."
    }
  }
};

const localizedCases = {
  ENG: [
    {
      title: "Referral Freebet",
      input: "Invite 10 friends — get 3000 UAH freebet",
      output: "UGC-style video + landing page",
      result: "A raw referral offer turned into a social invite funnel.",
      tags: ["iGaming", "Referral", "Landing"],
      built: ["creative angle", "social invite hook", "script direction", "UGC-style video", "UI overlays", "landing page", "registration CTA"]
    },
    {
      title: "Registration Bonus",
      input: "500 UAH for registration",
      output: "20s promo video + offer landing",
      result: "A fast direct-response bonus creative for cold traffic.",
      tags: ["Casino", "Bonus", "9:16"],
      built: ["bonus-first angle", "first-second hook", "direct script", "20s promo edit", "casino UI overlays", "offer landing", "CTA screen"]
    },
    {
      title: "Betting Event Promo",
      input: "Match-based promo",
      output: "Short-form ad pack + banners",
      result: "A match-based campaign built for quick launch.",
      tags: ["Betting", "Event", "Promo"],
      built: ["match trigger", "event hook", "short-form pack", "banner set", "promo overlays", "landing structure", "test copy"]
    },
    {
      title: "UGC Product Launch",
      input: "Beauty product launch",
      output: "UGC content system + landing",
      result: "Creator-style campaign for product trust.",
      tags: ["UGC", "Beauty", "Product"],
      built: ["creator angle", "trust hook", "product script", "UGC video map", "social proof blocks", "landing page", "CTA variants"]
    }
  ],
  RU: [
    {
      title: "Referral Freebet",
      input: "Пригласи 10 друзей — получи 3000 UAH фрибета",
      output: "UGC-видео + лендинг",
      result: "Реферальный оффер превращён в social invite funnel.",
      tags: ["iGaming", "Referral", "Landing"],
      built: ["креативный угол", "social invite hook", "направление сценария", "UGC-style видео", "UI overlays", "лендинг", "CTA регистрации"]
    },
    {
      title: "Registration Bonus",
      input: "500 UAH за регистрацию",
      output: "20s промо-видео + офферный лендинг",
      result: "Прямой бонусный креатив для холодного трафика.",
      tags: ["Casino", "Bonus", "9:16"],
      built: ["bonus-first angle", "hook первых секунд", "прямой сценарий", "20s promo edit", "casino UI overlays", "офферный лендинг", "CTA screen"]
    },
    {
      title: "Betting Event Promo",
      input: "Промо под матч",
      output: "Short-form ad pack + баннеры",
      result: "Кампания под событие, готовая к быстрому запуску.",
      tags: ["Betting", "Event", "Promo"],
      built: ["match trigger", "event hook", "short-form pack", "баннеры", "promo overlays", "структура лендинга", "тестовые тексты"]
    },
    {
      title: "UGC Product Launch",
      input: "Запуск beauty-продукта",
      output: "UGC content system + лендинг",
      result: "Creator-style кампания для доверия к продукту.",
      tags: ["UGC", "Beauty", "Product"],
      built: ["creator angle", "trust hook", "product script", "UGC video map", "social proof blocks", "лендинг", "CTA variants"]
    }
  ],
  UA: [
    {
      title: "Referral Freebet",
      input: "Запроси 10 друзів — отримай 3000 UAH фрибета",
      output: "UGC-відео + лендинг",
      result: "Реферальний оффер перетворено на social invite funnel.",
      tags: ["iGaming", "Referral", "Landing"],
      built: ["креативний кут", "social invite hook", "напрям сценарію", "UGC-style відео", "UI overlays", "лендинг", "CTA реєстрації"]
    },
    {
      title: "Registration Bonus",
      input: "500 UAH за реєстрацію",
      output: "20s промо-відео + офферний лендинг",
      result: "Прямий бонусний креатив для холодного трафіку.",
      tags: ["Casino", "Bonus", "9:16"],
      built: ["bonus-first angle", "hook перших секунд", "прямий сценарій", "20s promo edit", "casino UI overlays", "офферний лендинг", "CTA screen"]
    },
    {
      title: "Betting Event Promo",
      input: "Промо під матч",
      output: "Short-form ad pack + банери",
      result: "Кампанія під подію, готова до швидкого запуску.",
      tags: ["Betting", "Event", "Promo"],
      built: ["match trigger", "event hook", "short-form pack", "банери", "promo overlays", "структура лендинга", "тестові тексти"]
    },
    {
      title: "UGC Product Launch",
      input: "Запуск beauty-продукту",
      output: "UGC content system + лендинг",
      result: "Creator-style кампанія для довіри до продукту.",
      tags: ["UGC", "Beauty", "Product"],
      built: ["creator angle", "trust hook", "product script", "UGC video map", "social proof blocks", "лендинг", "CTA variants"]
    }
  ]
};

const caseAssets = [
  {
    id: "referral-freebet",
    number: "001",
    videoUrl: "/videos/referral-campaign.mp4",
    landingUrl: "/cases/referral-freebet",
    landingScreens: ["/screens/referral-1.jpg", "/screens/referral-2.jpg", "/screens/referral-3.jpg"]
  },
  {
    id: "registration-bonus",
    number: "002",
    videoUrl: "/videos/registration-bonus.mp4",
    landingUrl: "/cases/registration-bonus",
    landingScreens: ["/screens/bonus-1.jpg", "/screens/bonus-2.jpg", "/screens/bonus-3.jpg"]
  },
  {
    id: "betting-event",
    number: "003",
    videoUrl: "/videos/betting-event.mp4",
    landingUrl: "/cases/betting-event",
    landingScreens: ["/screens/betting-1.jpg", "/screens/betting-2.jpg", "/screens/betting-3.jpg"]
  },
  {
    id: "ugc-product-launch",
    number: "004",
    videoUrl: "/videos/ugc-product-launch.mp4",
    landingUrl: "/cases/ugc-product-launch",
    landingScreens: ["/screens/ugc-1.jpg", "/screens/ugc-2.jpg", "/screens/ugc-3.jpg"]
  }
];

const newspaperStories = {
  ENG: [
    {
      headline: "HOOK FIRST",
      kicker: "Offer intelligence",
      subhead: "A dead first second kills the funnel before the landing ever loads.",
      notesTitle: "Case Notes",
      notes: "Money on screen, a win reaction, or a sharp question. The first 2-3 seconds decide if traffic stays alive.",
      deskTitle: "Creative Desk",
      desk: "We turn the raw offer into a hook, short-form script, landing promise, CTA and test angles."
    },
    {
      headline: "UGC TRUST",
      kicker: "iGaming field note",
      subhead: "Glossy production often feels fake. Native creator footage feels closer to the player.",
      notesTitle: "Audience Signal",
      notes: "UGC style, phone framing, rough edges and human reactions can beat expensive studio polish in cold traffic.",
      deskTitle: "Execution",
      desk: "Creator angle, gameplay clip, reaction beat, UI overlay, bonus message and landing continuation."
    },
    {
      headline: "LOCAL ANGLES",
      kicker: "Market adaptation",
      subhead: "Ukraine, Brazil and India do not need the same rhythm, music, visual proof or CTA.",
      notesTitle: "Local Clues",
      notes: "One offer can become several localized creative files: language, tempo, payment context and trust trigger.",
      deskTitle: "System",
      desk: "We prepare variants for regions, traffic sources, formats, thumbnails and landing copy."
    },
    {
      headline: "FAST ITERATIONS",
      kicker: "Production system",
      subhead: "No magic service. The business needs a repeatable machine for cheap creative tests.",
      notesTitle: "Pipeline",
      notes: "Cheap iterations, best frame selection, control pass, UI polish, motion polish and final edit.",
      deskTitle: "Output",
      desk: "Raw offer in. Script, video, landing, adaptations and testing hypotheses out."
    },
    {
      headline: "DEPOSIT PATH",
      kicker: "Conversion mechanics",
      subhead: "Urgency and exclusivity are not decoration in iGaming. They are part of the offer logic.",
      notesTitle: "Trigger File",
      notes: "Today only, first players, new users, freebet, bonus, cashback and deposit cues must be clear fast.",
      deskTitle: "Funnel",
      desk: "The ad promise repeats on the landing so the user knows exactly what to do next."
    }
  ],
  RU: [
    {
      headline: "ХУК ПЕРВЫМ",
      kicker: "Разбор оффера",
      subhead: "Если первые секунды мертвые, лендинг уже не спасает кампанию.",
      notesTitle: "Заметки",
      notes: "Деньги на экране, эмоция выигрыша или вопрос-провокация. Первые 2-3 секунды решают, живет ли трафик.",
      deskTitle: "Креативный стол",
      desk: "Мы превращаем сырой оффер в hook, сценарий, landing promise, CTA и тестовые углы."
    },
    {
      headline: "UGC ДОВЕРИЕ",
      kicker: "iGaming заметка",
      subhead: "Глянец часто выглядит фейково. Контент от лица игрока вызывает больше доверия.",
      notesTitle: "Сигнал аудитории",
      notes: "UGC-стиль, телефонный кадр, живые реакции и gameplay часто сильнее дорогого продакшна.",
      deskTitle: "Сборка",
      desk: "Creator angle, gameplay, реакция, UI overlay, bonus message и продолжение на лендинге."
    },
    {
      headline: "ЛОКАЛЬНЫЙ УГОЛ",
      kicker: "Адаптация рынка",
      subhead: "Украине, Бразилии и Индии нужны разные темп, музыка, визуал и CTA.",
      notesTitle: "Локальные улики",
      notes: "Один оффер превращается в несколько файлов: язык, ритм, платежный контекст и trust trigger.",
      deskTitle: "Система",
      desk: "Готовим варианты под регионы, traffic sources, форматы, thumbnails и landing copy."
    },
    {
      headline: "БЫСТРЫЕ ТЕСТЫ",
      kicker: "Система продакшна",
      subhead: "Нужен не магический сервис, а повторяемая машина дешевых итераций.",
      notesTitle: "Пайплайн",
      notes: "Дешевые итерации, отбор лучших кадров, control pass, UI polish, motion polish и монтаж.",
      deskTitle: "Выход",
      desk: "Сырой оффер на входе. Сценарий, видео, лендинг, адаптации и тестовые гипотезы на выходе."
    },
    {
      headline: "ПУТЬ К ДЕПОЗИТУ",
      kicker: "Механика конверсии",
      subhead: "Срочность и эксклюзивность в iGaming не декор. Это часть логики оффера.",
      notesTitle: "Триггеры",
      notes: "Только сегодня, первые игроки, новые юзеры, freebet, bonus, cashback и deposit cues должны читаться быстро.",
      deskTitle: "Воронка",
      desk: "Обещание из рекламы повторяется на лендинге, чтобы следующий шаг был очевиден."
    }
  ],
  UA: [
    {
      headline: "ХУК ПЕРШИМ",
      kicker: "Розбір оффера",
      subhead: "Якщо перші секунди мертві, лендинг уже не врятує кампанію.",
      notesTitle: "Нотатки",
      notes: "Гроші на екрані, емоція виграшу або провокаційне питання. Перші 2-3 секунди вирішують, чи живе трафік.",
      deskTitle: "Креативний стіл",
      desk: "Ми перетворюємо сирий оффер на hook, сценарій, landing promise, CTA і тестові кути."
    },
    {
      headline: "UGC ДОВІРА",
      kicker: "iGaming нотатка",
      subhead: "Глянець часто виглядає фейково. Контент від гравця викликає більше довіри.",
      notesTitle: "Сигнал аудиторії",
      notes: "UGC-стиль, телефонний кадр, живі реакції та gameplay часто сильніші за дорогий продакшн.",
      deskTitle: "Збірка",
      desk: "Creator angle, gameplay, реакція, UI overlay, bonus message і продовження на лендингу."
    },
    {
      headline: "ЛОКАЛЬНИЙ КУТ",
      kicker: "Адаптація ринку",
      subhead: "Україні, Бразилії та Індії потрібні різні темп, музика, візуал і CTA.",
      notesTitle: "Локальні докази",
      notes: "Один оффер стає кількома файлами: мова, ритм, платіжний контекст і trust trigger.",
      deskTitle: "Система",
      desk: "Готуємо варіанти під регіони, traffic sources, формати, thumbnails і landing copy."
    },
    {
      headline: "ШВИДКІ ТЕСТИ",
      kicker: "Система продакшну",
      subhead: "Потрібен не магічний сервіс, а повторювана машина дешевих ітерацій.",
      notesTitle: "Пайплайн",
      notes: "Дешеві ітерації, відбір кращих кадрів, control pass, UI polish, motion polish і монтаж.",
      deskTitle: "Вихід",
      desk: "Сирий оффер на вході. Сценарій, відео, лендинг, адаптації та тестові гіпотези на виході."
    },
    {
      headline: "ШЛЯХ ДО ДЕПОЗИТУ",
      kicker: "Механіка конверсії",
      subhead: "Терміновість і ексклюзивність в iGaming не декор. Це частина логіки оффера.",
      notesTitle: "Тригери",
      notes: "Тільки сьогодні, перші гравці, нові юзери, freebet, bonus, cashback і deposit cues мають читатися швидко.",
      deskTitle: "Воронка",
      desk: "Обіцянка з реклами повторюється на лендингу, щоб наступний крок був очевидним."
    }
  ]
};

const languages = ["UA", "RU", "ENG"];

function getCases(language) {
  return localizedCases[language].map((item, index) => ({ ...caseAssets[index], ...item }));
}

function App() {
  const [language, setLanguage] = useState("ENG");
  const [activeCase, setActiveCase] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[language];
  const cases = useMemo(() => getCases(language), [language]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeCase || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCase, menuOpen]);

  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape") {
        setActiveCase(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-noirBlack text-noirPaper">
      <NoirAtmosphere />
      <Header t={t} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <PageTurnOverlay t={t} language={language} />
      <main className="relative z-10">
        <Hero t={t} language={language} cases={cases} setActiveCase={setActiveCase} />
        <InvestigationProcess t={t} />
        <ConversionPathAndStack t={t} />
        <StackBehindFunnel t={t} />
        <CoreDirections t={t} />
        <CasePackages t={t} />
        <FinalCTA t={t} language={language} />
      </main>
      <Footer t={t} />
      <AnimatePresence>
        {menuOpen && (
          <MenuOverlay
            t={t}
            language={language}
            setLanguage={setLanguage}
            onClose={() => setMenuOpen(false)}
          />
        )}
        {activeCase && <CaseModal item={activeCase} t={t} onClose={() => setActiveCase(null)} />}
      </AnimatePresence>
    </div>
  );
}

function Header({ t, menuOpen, setMenuOpen }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 border-t border-white/10 bg-black/52 px-4 py-3 shadow-[0_16px_70px_rgba(0,0,0,0.72)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a href="#top" className="brand-logo min-w-0 truncate font-display text-xl font-black tracking-normal sm:text-2xl md:text-3xl">
          Noir<span>Vision</span>
        </a>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="menu-trigger"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? t.menu.close : t.menu.button}
        >
          <span className="menu-burger" aria-hidden="true" />
          {t.menu.button}
        </button>
      </div>
    </header>
  );
}

function LanguageSwitcher({ t, language, setLanguage, compact = false, order = languages }) {
  return (
    <div className={`flex items-center gap-1 border border-white/10 bg-white/[0.025] p-1 ${compact ? "w-max" : ""}`} aria-label={t.languageLabel}>
      {order.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLanguage(item)}
          className={`px-2 py-1.5 text-[10px] font-black transition md:px-3 md:py-2 md:text-xs ${
            language === item
              ? "bg-goldAccent text-black shadow-[0_0_26px_rgba(212,175,55,0.38)]"
              : "text-noirPaper/55 hover:bg-white/8 hover:text-noirPaper"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

const clampTurn = (value) => Math.min(1, Math.max(0, value));

const mixTurn = (from, to, progress) => from + (to - from) * progress;

const canUseControlledPageTurn = () =>
  typeof window !== "undefined" && window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;

function pageTurnFrame(progress, direction) {
  const points = [
    { at: 0, x: 118, ry: -72, rz: 2.4, skew: -1.1, scale: 1 },
    { at: 0.26, x: 14, ry: -22, rz: 0.7, skew: -0.3, scale: 1 },
    { at: 0.44, x: 0, ry: -2, rz: 0, skew: 0, scale: 0.992 },
    { at: 0.62, x: -3, ry: 4, rz: -0.2, skew: 0, scale: 0.992 },
    { at: 0.82, x: -76, ry: 46, rz: -2.4, skew: 1, scale: 1 },
    { at: 1, x: -126, ry: 76, rz: -4.2, skew: 1.5, scale: 1 }
  ];

  const nextIndex = points.findIndex((point) => progress <= point.at);
  const end = points[Math.max(1, nextIndex)];
  const start = points[Math.max(0, nextIndex - 1)];
  const local = end.at === start.at ? 0 : (progress - start.at) / (end.at - start.at);
  const opacity = progress < 0.08 ? progress / 0.08 : progress > 0.92 ? (1 - progress) / 0.08 : 1;
  const sheetDirection = direction >= 0 ? 1 : -1;

  return {
    opacity: clampTurn(opacity),
    shadowOpacity: Math.sin(progress * Math.PI),
    sheenOpacity: progress > 0.16 && progress < 0.86 ? 0.42 : 0,
    transform: `translateX(${mixTurn(start.x, end.x, local) * sheetDirection}vw) rotateY(${mixTurn(start.ry, end.ry, local) * sheetDirection}deg) rotateZ(${mixTurn(start.rz, end.rz, local) * sheetDirection}deg) skewY(${mixTurn(start.skew, end.skew, local)}deg) scale(${mixTurn(start.scale, end.scale, local)})`,
    transformOrigin: sheetDirection >= 0 ? "left center" : "right center"
  };
}

function PageTurnOverlay({ t, language }) {
  const [page, setPage] = useState("top");
  const [turn, setTurn] = useState({ active: false, progress: 0, direction: 1 });
  const [storyIndex, setStoryIndex] = useState(0);
  const sectionsRef = useRef([]);
  const currentIndex = useRef(0);
  const transitionRef = useRef(null);
  const progressRef = useRef(0);
  const settling = useRef(false);
  const lockedScrollY = useRef(0);
  const mobileAnimationRef = useRef(null);
  const mobileScrollRaf = useRef(null);
  const lastMobileStoryKey = useRef("");
  const lastMobileScrollY = useRef(0);
  const observedReady = useRef(false);
  const mobileReady = useRef(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("[data-page-id]"));
    if (!sections.length) return undefined;
    sectionsRef.current = sections;

    const stopMobileAnimation = () => {
      if (mobileAnimationRef.current) {
        window.cancelAnimationFrame(mobileAnimationRef.current);
        mobileAnimationRef.current = null;
      }
    };

    const getMobileActiveIndex = () => {
      const threshold = Math.min(160, window.innerHeight * 0.26);
      let activeIndex = 0;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= threshold) activeIndex = index;
      });

      return activeIndex;
    };

    const syncMobilePageTurnProgress = () => {
      if (canUseControlledPageTurn() || transitionRef.current) return;

      const scrollY = window.scrollY;
      const scrollDirection = scrollY >= lastMobileScrollY.current ? 1 : -1;
      lastMobileScrollY.current = scrollY;
      const viewport = window.innerHeight;
      let activeBoundary = null;

      for (let index = 0; index < sections.length - 1; index += 1) {
        const boundary = sections[index + 1].offsetTop;
        const zoneStart = boundary - viewport * 0.58;
        const zoneEnd = boundary + viewport * 0.18;

        if (scrollY >= zoneStart && scrollY <= zoneEnd) {
          const raw = clampTurn((scrollY - zoneStart) / (zoneEnd - zoneStart));
          const direction = scrollDirection >= 0 ? 1 : -1;
          const progress = direction >= 0 ? raw : 1 - raw;
          activeBoundary = { index, direction, progress };
          break;
        }
      }

      if (!activeBoundary || activeBoundary.progress <= 0.05 || activeBoundary.progress >= 0.97) {
        lastMobileStoryKey.current = "";
        setTurn((current) => current.active ? { active: false, progress: 0, direction: current.direction || 1 } : current);
        return;
      }

      const targetIndex = activeBoundary.direction >= 0 ? activeBoundary.index + 1 : activeBoundary.index;
      const targetPage = sections[targetIndex]?.getAttribute("data-page-id") || "top";
      const storyKey = `${activeBoundary.index}:${activeBoundary.direction}`;

      if (lastMobileStoryKey.current !== storyKey) {
        lastMobileStoryKey.current = storyKey;
        setStoryIndex((value) => value + 1);
      }

      setPage(targetPage);
      setTurn({
        active: true,
        progress: clampTurn(activeBoundary.progress),
        direction: activeBoundary.direction
      });
    };

    const syncMobilePage = ({ animate = true } = {}) => {
      if (canUseControlledPageTurn()) return;

      const nextIndex = getMobileActiveIndex();
      const targetPage = sections[nextIndex]?.getAttribute("data-page-id") || "top";

      if (!mobileReady.current || !animate) {
        mobileReady.current = true;
        currentIndex.current = nextIndex;
        setPage(targetPage);
        syncMobilePageTurnProgress();
        return;
      }

      if (transitionRef.current) return;

      if (nextIndex !== currentIndex.current && !mobileAnimationRef.current) {
        currentIndex.current = nextIndex;
      }

      if (!mobileAnimationRef.current) {
        setPage(targetPage);
      }
      syncMobilePageTurnProgress();
    };

    const handleMobileScroll = () => {
      if (canUseControlledPageTurn()) return;
      if (mobileScrollRaf.current) return;

      mobileScrollRaf.current = window.requestAnimationFrame(() => {
        mobileScrollRaf.current = null;
        syncMobilePage({ animate: true });
      });
    };

    const resetMobileMode = () => {
      if (canUseControlledPageTurn()) return;
      document.documentElement.classList.remove("is-page-turning");
      transitionRef.current = null;
      progressRef.current = 0;
      stopMobileAnimation();
      setTurn((current) => ({ active: false, progress: 0, direction: current.direction || 1 }));
      syncMobilePage({ animate: false });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const nextPage = visible?.target?.getAttribute("data-page-id");

        if (nextPage && !transitionRef.current) {
          if (!canUseControlledPageTurn()) return;
          const nextIndex = sections.findIndex((section) => section.getAttribute("data-page-id") === nextPage);
          if (!observedReady.current) {
            observedReady.current = true;
            if (nextIndex >= 0) currentIndex.current = nextIndex;
            setPage(nextPage);
            return;
          }

          if (nextIndex >= 0 && nextIndex !== currentIndex.current) {
            currentIndex.current = nextIndex;
          } else if (nextIndex >= 0) {
            currentIndex.current = nextIndex;
          }
          setPage(nextPage);
        }
      },
      { rootMargin: "-38% 0px -42% 0px", threshold: [0.08, 0.22, 0.42, 0.62] }
    );

    sections.forEach((section) => observer.observe(section));
    syncMobilePage({ animate: false });
    lastMobileScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleMobileScroll, { passive: true });
    window.addEventListener("resize", resetMobileMode);

    return () => {
      observer.disconnect();
      if (mobileScrollRaf.current) window.cancelAnimationFrame(mobileScrollRaf.current);
      window.removeEventListener("scroll", handleMobileScroll);
      window.removeEventListener("resize", resetMobileMode);
      stopMobileAnimation();
    };
  }, []);

  useEffect(() => {
    const getClosestIndex = () => {
      const sections = sectionsRef.current;
      if (!sections.length) return 0;
      const viewportCenter = window.innerHeight * 0.5;
      return sections.reduce((closest, section, index) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height * 0.34 - viewportCenter);
        return distance < closest.distance ? { index, distance } : closest;
      }, { index: currentIndex.current, distance: Number.POSITIVE_INFINITY }).index;
    };

    const finishTransition = () => {
      const transition = transitionRef.current;
      if (!transition) return;

      settling.current = true;
      document.documentElement.classList.remove("is-page-turning");
      currentIndex.current = transition.toIndex;
      const target = sectionsRef.current[transition.toIndex];
      target?.scrollIntoView({ behavior: "auto", block: "start" });
      if (target?.id) {
        window.history.replaceState(null, "", `#${target.id}`);
      }
      transitionRef.current = null;
      progressRef.current = 0;
      setTurn({ active: false, progress: 0, direction: transition.direction });
      window.setTimeout(() => {
        settling.current = false;
      }, 520);
    };

    const cancelTransition = () => {
      const transition = transitionRef.current;
      if (!transition) return;

      document.documentElement.classList.remove("is-page-turning");
      window.scrollTo({ top: lockedScrollY.current, behavior: "auto" });
      const current = sectionsRef.current[transition.fromIndex];
      if (current?.id) {
        window.history.replaceState(null, "", `#${current.id}`);
      }
      transitionRef.current = null;
      progressRef.current = 0;
      setTurn({ active: false, progress: 0, direction: transition.direction });
    };

    const holdPageStill = () => {
      window.scrollTo({ top: lockedScrollY.current, behavior: "auto" });
      window.requestAnimationFrame(() => {
        if (transitionRef.current) {
          window.scrollTo({ top: lockedScrollY.current, behavior: "auto" });
        }
      });
    };

    const applyDelta = (deltaY, event) => {
      if (!canUseControlledPageTurn()) return;
      if (settling.current || document.body.style.overflow === "hidden") return;
      if (Math.abs(deltaY) < 3) return;

      const sections = sectionsRef.current;
      if (!sections.length) return;
      let transition = transitionRef.current;
      const rawDirection = deltaY > 0 ? 1 : -1;

      const isAtSectionEdge = (section, direction) => {
        const rect = section.getBoundingClientRect();
        const edgeBuffer = window.innerWidth < 768 ? 42 : 72;

        if (direction > 0) {
          return rect.bottom <= window.innerHeight + edgeBuffer;
        }

        return rect.top >= -edgeBuffer;
      };

      if (!transition) {
        const fromIndex = getClosestIndex();
        const toIndex = fromIndex + rawDirection;
        if (toIndex < 0 || toIndex >= sections.length) return;
        if (!isAtSectionEdge(sections[fromIndex], rawDirection)) return;

        transition = { fromIndex, toIndex, direction: rawDirection };
        transitionRef.current = transition;
        lockedScrollY.current = window.scrollY;
        document.documentElement.classList.add("is-page-turning");
        progressRef.current = 0;
        const targetPage = sections[toIndex]?.getAttribute("data-page-id") || "top";
        setPage(targetPage);
        setStoryIndex((value) => value + 1);
        setTurn({ active: true, progress: 0.01, direction: rawDirection });
      }

      event?.preventDefault();
      holdPageStill();
      const scrollDistance = 980;
      const nextProgress = clampTurn(progressRef.current + (deltaY * transition.direction) / scrollDistance);
      progressRef.current = nextProgress;
      setTurn({ active: true, progress: nextProgress, direction: transition.direction });

      if (nextProgress >= 1) {
        finishTransition();
      } else if (nextProgress <= 0 && deltaY * transition.direction < 0) {
        cancelTransition();
      }
    };

    const handleWheel = (event) => applyDelta(event.deltaY, event);

    const resetLockedTurn = () => {
      if (canUseControlledPageTurn()) return;
      document.documentElement.classList.remove("is-page-turning");
      transitionRef.current = null;
      progressRef.current = 0;
      setTurn((current) => ({ active: false, progress: 0, direction: current.direction || 1 }));
    };

    resetLockedTurn();
    const media = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", resetLockedTurn);
    media.addEventListener?.("change", resetLockedTurn);

    return () => {
      document.documentElement.classList.remove("is-page-turning");
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", resetLockedTurn);
      media.removeEventListener?.("change", resetLockedTurn);
    };
  }, []);

  const pageTitle = t.pageTurn.pages[page] ?? t.pageTurn.pages.top;
  const stories = newspaperStories[language] || newspaperStories.ENG;
  const story = stories[storyIndex % stories.length];
  const turnFrame = pageTurnFrame(turn.progress, turn.direction);

  return (
    <div className={`page-turn-stage lang-${language.toLowerCase()} ${turn.active ? "is-flipping" : ""}`} aria-hidden="true">
      <div className="page-turn-shadow" style={{ opacity: turnFrame.shadowOpacity }} />
      <div className="page-turn-document">
        <div
          className="page-turn-sheet"
          style={{
            opacity: turnFrame.opacity,
            transform: turnFrame.transform,
            transformOrigin: turnFrame.transformOrigin,
            "--turn-sheen": turnFrame.sheenOpacity
          }}
        >
          <div className="newspaper-topline">
            <span>9 AM<br />FINAL</span>
            <strong>NoirVision Inquisitor</strong>
            <span>EXTRA</span>
          </div>
          <div className="newspaper-meta">
            <span>Vol. 001</span>
            <span>NoirVision AI</span>
            <span>AI-FIRST CREATIVE STUDIO</span>
          </div>
          <h2 className="newspaper-headline">{story.headline}</h2>
          <p className="newspaper-subhead">{t.pageTurn.label} // {pageTitle} // {story.kicker}</p>
          <div className="newspaper-grid">
            <div>
              <h3>{story.notesTitle}</h3>
              <p>{story.notes}</p>
            </div>
            <div>
              <h3>{story.deskTitle}</h3>
              <p>{story.desk}</p>
            </div>
            <div className="newspaper-photo">
              <span>NoirVision AI</span>
            </div>
          </div>
          <p className="newspaper-brief">{story.subhead}</p>
          <div className="newspaper-fold" />
          <div className="newspaper-stamp">EXTRA EDITION</div>
        </div>
      </div>
    </div>
  );
}

function MenuOverlay({ t, language, setLanguage, onClose }) {
  const handleJump = (href) => {
    onClose();
    window.setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  return (
    <motion.div
      className="menu-overlay fixed inset-0 z-50 overflow-hidden bg-black text-noirPaper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-goldAccent via-white/40 to-transparent" />
      <div className="menu-ghost">{t.menu.ghost}</div>
      <div className="absolute inset-0 smoke-beams opacity-70" />
      <div className="absolute inset-0 film-grain" />
      <div className="relative z-10 mx-auto flex h-full w-[calc(100%-32px)] max-w-7xl flex-col py-6 md:w-[calc(100%-64px)]">
        <div className="flex items-center justify-between">
          <LanguageSwitcher t={t} language={language} setLanguage={setLanguage} order={["ENG", "UA", "RU"]} />
          <button type="button" onClick={onClose} className="menu-close" aria-label={t.menu.close}>
            ×
          </button>
        </div>
        <nav className="mt-auto grid gap-2 pb-10 md:ml-auto md:w-[72%] md:pb-16" aria-label="Overlay navigation">
          {t.nav.map((item, index) => (
            <button key={item.href} type="button" onClick={() => handleJump(item.href)} className="overlay-link">
              <span>NO — {String(index + 1).padStart(3, "0")}</span>
              <strong>{item.label}</strong>
            </button>
          ))}
        </nav>
        <div className="flex flex-wrap gap-4 border-t border-white/10 py-5 text-xs font-black uppercase tracking-[0.16em] text-noirMuted">
          {t.menu.footer.map((item) => (
            <a key={item} href={item.includes("Email") ? "mailto:hello@noirvision.studio" : "#contact"} onClick={onClose} className="transition hover:text-goldAccent">
              {item}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ScrollSpotlightText({ children, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.7, margin: "-8% 0px -18% 0px" });

  return (
    <span ref={ref} className={`scroll-spotlight-text ${isInView ? "is-lit" : ""} ${className}`}>
      <span className="lamp-hardware" aria-hidden="true" />
      <span className="lamp-cone" aria-hidden="true" />
      <span className="relative z-10">{children}</span>
    </span>
  );
}

function Hero({ t, language, cases, setActiveCase }) {
  const isLongLang = language === "RU" || language === "UA";
  const headlineClass = isLongLang
    ? "text-[clamp(1.82rem,7.8vw,2.72rem)] leading-[0.96] sm:text-[clamp(2.45rem,4vw,4.35rem)]"
    : "text-[clamp(2.35rem,10.5vw,4.2rem)] leading-[0.93] sm:text-[clamp(3.3rem,4.9vw,5.65rem)]";

  return (
    <section id="top" data-page-id="top" className="mx-auto grid min-h-screen w-[calc(100%-32px)] max-w-7xl items-center gap-8 pb-8 pt-24 md:min-h-[100svh] md:w-[calc(100%-48px)] md:pt-24 lg:grid-cols-[0.82fr_1.18fr] xl:gap-12">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="min-w-0 max-w-2xl">
        <p className="case-eyebrow">{t.hero.eyebrow}</p>
        <h1 className={`hero-headline mt-4 break-words font-display font-black tracking-normal text-noirPaper ${headlineClass}`}>
          {t.hero.headlineLead.map((line) => (
            <React.Fragment key={line}>
              <span className="block md:whitespace-nowrap">{line}</span>
            </React.Fragment>
          ))}
          <ScrollSpotlightText className="mt-[0.04em] block">
            {t.hero.headlineSpotlight.map((line) => (
              <span key={line} className="block md:whitespace-nowrap">
                {line}
              </span>
            ))}
          </ScrollSpotlightText>
        </h1>
        <p className="mt-5 max-w-2xl font-display text-xl font-black leading-tight text-noirPaper md:text-3xl">
          <ScrollSpotlightText>{t.hero.secondary}</ScrollSpotlightText>
        </p>
        <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-noirPaper/80 md:text-base md:leading-7">{t.hero.subheadline}</p>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-noirMuted">
          {t.hero.bodyStart}
          <strong className="text-noirPaper">{t.hero.bodyHighlight}</strong>
          {t.hero.bodyEnd}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a className="noir-button primary" href="https://t.me/selfhitaro" target="_blank" rel="noreferrer">
            {t.hero.primary}
            <ArrowUpRight size={18} />
          </a>
          <a className="noir-button ghost" href="#work">
            {t.hero.secondaryButton}
            <FolderOpen size={18} />
          </a>
        </div>
        <p className="mt-4 text-[11px] font-black uppercase tracking-[0.16em] text-noirMuted">{t.hero.trust}</p>
      </motion.div>

      <LivePortfolioTerminal t={t} cases={cases} setActiveCase={setActiveCase} />
    </section>
  );
}

function LivePortfolioTerminal({ t, cases, setActiveCase }) {
  const [mobileCaseListOpen, setMobileCaseListOpen] = useState(false);

  return (
    <motion.aside
      id="work"
      className="case-terminal relative overflow-hidden border border-noirPaper/20 bg-noirPanel/85 p-4 shadow-[0_32px_120px_rgba(0,0,0,0.76)] backdrop-blur-xl md:p-4"
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.72, delay: 0.12 }}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-noirPaper/70 to-transparent" />
      <div className="relative flex items-start justify-between gap-5">
        <div>
          <p className="case-eyebrow">{t.terminal.eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl font-black leading-none text-noirPaper md:text-4xl">{t.terminal.title}</h2>
          <p className="mt-3 max-w-xl text-xs leading-5 text-noirMuted md:text-sm">{t.terminal.intro}</p>
          <MobileCaseHint
            text={t.terminal.mobileHint}
            expanded={mobileCaseListOpen}
            onClick={() => setMobileCaseListOpen((value) => !value)}
          />
        </div>
        <div className="hidden rotate-3 border border-goldAccent/40 bg-goldAccent/10 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-noirPaper shadow-[0_0_34px_rgba(212,175,55,0.25)] sm:block">
          {t.terminal.clickLabel}
        </div>
      </div>
      <div className={`mobile-case-list mt-4 grid gap-2.5 ${mobileCaseListOpen ? "is-open" : ""}`}>
        {cases.map((item, index) => (
          <CaseCard key={item.id} item={item} index={index} labels={t.terminal} onClick={() => setActiveCase(item)} />
        ))}
      </div>
    </motion.aside>
  );
}

function CaseCard({ item, index, labels, onClick }) {
  const [expanded, setExpanded] = useState(false);

  const handleCardClick = () => {
    if (window.matchMedia("(max-width: 900px)").matches) {
      setExpanded((value) => !value);
      return;
    }
    onClick();
  };

  return (
    <motion.article
      whileHover={{ y: -4, rotateZ: index % 2 ? 0.25 : -0.25 }}
      whileTap={{ scale: 0.985 }}
      className={`group relative w-full overflow-hidden break-words border bg-[#141416]/88 text-left transition hover:border-goldAccent/50 hover:bg-[#1a1a1e] ${
        expanded ? "is-expanded border-goldAccent/45 shadow-[0_0_34px_rgba(212,175,55,0.12)]" : "border-white/10"
      }`}
    >
      <div className="absolute -right-16 top-0 h-32 w-32 rounded-full bg-goldAccent/10 blur-3xl opacity-0 transition group-hover:opacity-100" />
      <button type="button" onClick={handleCardClick} className="relative block w-full p-2.5 text-left md:p-3" aria-expanded={expanded}>
        <div className="grid gap-3 lg:grid-cols-[104px_1fr] xl:grid-cols-[116px_1fr]">
          <NoirPreview number={item.number} title={item.title} />
          <div className="relative min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-noirMuted">{labels.fileLabel} {item.number}</p>
                <h3 className="mt-1 font-display text-lg font-black leading-tight text-noirPaper md:text-xl">{item.title}</h3>
              </div>
              <ArrowUpRight className="hidden shrink-0 text-noirMuted transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-goldAccent lg:block" size={20} />
              <ChevronDown className={`shrink-0 text-softGold transition lg:hidden ${expanded ? "rotate-180" : ""}`} size={20} />
            </div>
            <div className="mobile-case-collapsible">
              <div className="mt-2 grid gap-1.5 text-xs leading-5 md:text-sm">
                <p className="text-noirMuted">
                  <span className="case-label">{labels.rawLabel}</span> {item.input}
                </p>
                <p className="text-noirMuted">
                  <span className="case-label">{labels.outputLabel}</span> {item.output}
                </p>
                <p className="text-noirPaper/80">
                  <span className="case-label">{labels.resultLabel}</span> {item.result}
                </p>
              </div>
              <TagRow tags={item.tags} />
            </div>
            <span className="mt-3 inline-flex items-center gap-2 border border-goldAccent/35 bg-goldAccent/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.13em] text-softGold lg:hidden">
              {labels.clickLabel}
              <ChevronDown className={`transition ${expanded ? "rotate-180" : ""}`} size={14} />
            </span>
          </div>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {expanded && <MobileEvidenceDrawer item={item} labels={labels} onOpenCase={onClick} />}
      </AnimatePresence>
    </motion.article>
  );
}

function MobileCaseHint({ text, expanded, onClick }) {
  return (
    <button type="button" className="mobile-case-hint lg:hidden" onClick={onClick} aria-expanded={expanded}>
      <span>{text}</span>
      <div className="mobile-case-briefcase" aria-hidden="true">
        <Briefcase size={30} />
      </div>
      <ChevronDown className={`mobile-case-hint-chevron ${expanded ? "rotate-180" : ""}`} size={18} />
    </button>
  );
}

function MobileEvidenceDrawer({ item, labels, onOpenCase }) {
  return (
    <motion.div
      className="mobile-evidence-drawer"
      initial={{ height: 0, opacity: 0, y: -8 }}
      animate={{ height: "auto", opacity: 1, y: 0 }}
      exit={{ height: 0, opacity: 0, y: -8 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mobile-evidence-video">
        <div className="absolute inset-0 noir-photo-placeholder" />
        <div className="absolute left-3 top-3 border border-white/20 bg-black/55 px-2 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-noirPaper">
          CASE {item.number}
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-14 w-14 place-items-center rounded-full border border-noirPaper/30 bg-black/42 shadow-[0_0_34px_rgba(255,226,150,0.18)]">
            <Play className="ml-1 text-noirPaper" size={22} fill="currentColor" />
          </div>
        </div>
        <p className="absolute bottom-3 left-3 right-3 truncate border border-white/10 bg-black/55 px-2 py-1 text-[10px] font-bold text-noirMuted">
          {item.videoUrl}
        </p>
      </div>
      <button type="button" onClick={onOpenCase} className="mobile-evidence-action">
        {labels.openFullCase || labels.clickLabel}
        <ArrowUpRight size={15} />
      </button>
    </motion.div>
  );
}

function NoirPreview({ number, title }) {
  return (
    <div className="relative hidden min-h-[104px] overflow-hidden border border-noirPaper/15 bg-[#090909] lg:block xl:min-h-[116px]" aria-label={title}>
      <div className="absolute inset-0 noir-photo-placeholder" />
      <div className="absolute left-3 top-3 border border-white/20 bg-black/45 px-2 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-noirPaper">
        CASE {number}
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid h-11 w-11 place-items-center rounded-full border border-noirPaper/30 bg-black/35 shadow-[0_0_32px_rgba(255,255,220,0.16)]">
          <Play className="ml-0.5 text-noirPaper" size={19} fill="currentColor" />
        </div>
      </div>
    </div>
  );
}

function TagRow({ tags }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5 md:gap-2">
      {tags.map((tag) => (
        <span key={tag} className="max-w-full break-words border border-goldAccent/35 bg-goldAccent/10 px-2 py-1 text-[9px] font-black uppercase tracking-[0.11em] text-softGold md:px-2.5 md:py-1.5 md:text-[10px]">
          {tag}
        </span>
      ))}
    </div>
  );
}

function CaseModal({ item, t, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-0 backdrop-blur-xl md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
    >
      <motion.article
        className="case-file-modal relative mx-auto min-h-screen w-full max-w-6xl overflow-hidden break-words border border-noirPaper/20 bg-[#0b0b0d]/96 p-4 shadow-[0_40px_140px_rgba(0,0,0,0.86)] md:min-h-0 md:p-7"
        initial={{ opacity: 0, y: 24, rotateX: 2 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ type: "spring", stiffness: 170, damping: 24 }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" onClick={onClose} className="file-close" aria-label={t.modal.close}>
          <X size={18} />
        </button>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="case-eyebrow">{t.modal.eyebrow} // {item.number}</p>
            <h2 className="mt-3 max-w-2xl break-words font-display text-5xl font-black leading-none text-noirPaper md:text-7xl">{item.title}</h2>
            <p className="mt-5 border-l border-goldAccent/55 pl-4 text-lg font-bold leading-7 text-noirPaper/85">{item.input}</p>
            <TagRow tags={item.tags} />
          </div>
          <div className="case-note">
            <p className="case-label">{t.modal.videoOutput}</p>
            <p className="mt-2 font-display text-3xl font-black text-noirPaper">{item.output}</p>
            <p className="mt-3 text-sm leading-6 text-noirMuted">{item.result}</p>
          </div>
        </div>

        <div className="mt-7 overflow-hidden border border-noirPaper/20 bg-black/45">
          <div className="relative aspect-video bg-[radial-gradient(circle_at_45%_35%,rgba(255,255,220,0.14),transparent_24%),linear-gradient(135deg,rgba(16,16,18,0.95),rgba(0,0,0,1))]">
            <div className="absolute inset-0 noir-film-lines" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid h-20 w-20 place-items-center rounded-full border border-noirPaper/30 bg-black/40 shadow-[0_0_50px_rgba(255,255,220,0.18)]">
                <Play className="ml-1 text-noirPaper" size={32} fill="currentColor" />
              </div>
            </div>
            <p className="absolute bottom-4 left-4 border border-white/10 bg-black/50 px-3 py-2 text-xs font-bold text-noirMuted">
              {t.modal.videoUrl}: {item.videoUrl}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <CaseFilePanel label={t.modal.rawOffer} title={t.modal.clientCameWith}>
            <p className="text-noirMuted">{item.input}</p>
          </CaseFilePanel>
          <CaseFilePanel label={t.modal.creativeAngle} title={t.modal.weTurnedInto}>
            <ul className="grid gap-2">
              {item.built.map((point) => (
                <li key={point} className="flex gap-2 text-sm text-noirMuted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-goldAccent shadow-[0_0_18px_rgba(212,175,55,0.65)]" />
                  {point}
                </li>
              ))}
            </ul>
          </CaseFilePanel>
        </div>

        <CaseFilePanel label={t.modal.landingPreview} title={t.modal.landingEvidence} className="mt-4">
          <div className="grid gap-3 md:grid-cols-3">
            {item.landingScreens.map((screen, index) => (
              <div key={screen} className="relative overflow-hidden border border-noirPaper/15 bg-black/30">
                <div className="aspect-[4/3] noir-screen-placeholder" />
                <span className="absolute bottom-3 left-3 bg-black/55 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-noirPaper/80">
                  {t.modal.screen} {index + 1}
                </span>
                <span className="absolute right-3 top-3 max-w-[70%] truncate border border-white/10 bg-black/55 px-2 py-1 text-[10px] text-noirMuted">{screen}</span>
              </div>
            ))}
          </div>
        </CaseFilePanel>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a href={item.landingUrl} className="noir-button primary">
            {t.modal.viewLanding}
            <ArrowUpRight size={18} />
          </a>
          <a href="#contact" onClick={onClose} className="noir-button ghost">
            {t.modal.requestSimilar}
            <ScanSearch size={18} />
          </a>
        </div>
      </motion.article>
    </motion.div>
  );
}

function CaseFilePanel({ label, title, children, className = "" }) {
  return (
    <section className={`case-note ${className}`}>
      <p className="case-label">{label}</p>
      <h3 className="mt-2 font-display text-2xl font-black text-noirPaper">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function InvestigationProcess({ t }) {
  return (
    <Section id="process" eyebrow={t.process.eyebrow} title={t.process.title} subtitle={t.process.subtitle}>
      <div className="relative">
        <div className="absolute left-5 top-8 h-[calc(100%-64px)] w-px bg-gradient-to-b from-transparent via-noirPaper/25 to-transparent md:left-1/2 md:top-0 md:h-full" />
        <div className="grid gap-4">
          {t.process.steps.map((step, index) => (
            <motion.article
              key={step.title}
              className={`evidence-row ${index % 2 ? "md:ml-auto" : ""}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.48, delay: index * 0.06 }}
            >
              <div className="evidence-dot">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <p className="case-label">{t.process.evidence} {String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-3xl font-black text-noirPaper">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-noirMuted">{step.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ConversionPathAndStack({ t }) {
  return (
    <Section id="path" pageId="path" eyebrow={t.path.eyebrow} title={t.path.title} subtitle={t.path.text}>
      <div className="case-note overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[0.36fr_1fr]">
          <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
            <Route className="text-goldAccent" size={34} />
            <p className="mt-5 font-display text-3xl font-black leading-tight text-noirPaper">
              {t.path.highlight}
            </p>
          </div>
          <div className="grid gap-3 p-5 md:grid-cols-3">
            {t.path.flow.map((item, index) => (
              <motion.div
                key={item}
                className="flow-evidence"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.38, delay: index * 0.05 }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function StackBehindFunnel({ t }) {
  return (
    <Section id="stack" eyebrow={t.stack.eyebrow} title={t.stack.title} subtitle={t.stack.subtitle}>
      <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="case-note">
          <p className="text-base leading-8 text-noirMuted">{t.stack.text}</p>
          <p className="mt-6 font-display text-3xl font-black leading-tight text-noirPaper">
            <ScrollSpotlightText>{t.stack.positioning}</ScrollSpotlightText>
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {t.stack.flow.map((item, index) => (
              <span key={item} className="stack-step">
                {String(index + 1).padStart(2, "0")} / {item}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {t.stack.categories.map((category, index) => (
            <motion.article
              key={category.title}
              className="stack-card"
              initial={{ opacity: 0, y: 16, rotateZ: index % 2 ? 0.8 : -0.8 }}
              whileInView={{ opacity: 1, y: 0, rotateZ: index % 2 ? 0.4 : -0.4 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.42, delay: index * 0.03 }}
            >
              <p className="case-label">{category.title}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.tools.map((tool) => (
                  <span key={tool} className="tool-tag">
                    {tool}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CoreDirections({ t }) {
  return (
    <Section id="directions" pageId="directions" eyebrow={t.directions.eyebrow} title={t.directions.title}>
      <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        {t.directions.panels.map((panel, index) => (
          <DepartmentPanel key={panel.title} panel={panel} dominant={index === 0} index={index} departmentLabel={t.directions.department} />
        ))}
      </div>
    </Section>
  );
}

function DepartmentPanel({ panel, dominant, index, departmentLabel }) {
  return (
    <motion.article
      className={`department-panel ${dominant ? "department-casino" : "department-ugc"}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.48 }}
    >
      <div className="relative z-10">
        <div className="department-icon">{dominant ? <BadgeDollarSign size={30} /> : <Aperture size={30} />}</div>
        <p className="case-label mt-8">{departmentLabel} {String(index + 1).padStart(3, "0")}</p>
        <p className="case-label mt-3">{panel.subtitle}</p>
        <h3 className="mt-3 font-display text-5xl font-black leading-none text-noirPaper md:text-6xl">{panel.title}</h3>
        <p className="mt-5 max-w-2xl text-base leading-7 text-noirMuted">{panel.description}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {panel.tags.map((tag) => (
            <span key={tag} className="department-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function CasePackages({ t }) {
  return (
    <Section id="deals" eyebrow={t.packages.eyebrow} title={t.packages.title} subtitle={t.packages.subtitle}>
      <p className="-mt-4 mb-8 max-w-3xl border border-noirPaper/15 bg-white/[0.035] p-4 text-sm leading-6 text-noirMuted">{t.packages.note}</p>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {t.packages.items.map((item, index) => (
          <motion.article
            key={item.title}
            className="package-folder min-w-0 break-words"
            initial={{ opacity: 0, y: 20, rotateZ: index % 2 ? 1.2 : -1.2 }}
            whileInView={{ opacity: 1, y: 0, rotateZ: index % 2 ? 0.55 : -0.55 }}
            whileHover={{ y: -8, rotateZ: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.48 }}
          >
            <span className="folder-stamp">{item.stamp}</span>
            <p className="case-label">{t.packages.labels.caseType} // {String(index + 1).padStart(3, "0")}</p>
            <h3 className="mt-8 font-display text-3xl font-black text-noirPaper">{item.title}</h3>
            <p className="case-label mt-5">{t.packages.labels.priceStamp}</p>
            <p className="mt-5 font-display text-4xl font-black leading-none text-noirPaper">{item.price}</p>
            <p className="case-label mt-5">{t.packages.labels.mission}</p>
            <p className="mt-2 text-sm font-black uppercase tracking-[0.12em] text-goldAccent">{item.subtitle}</p>
            <p className="case-label mt-6">{t.packages.labels.deliverables}</p>
            <ul className="mt-6 grid gap-2">
              {item.includes.map((include) => (
                <li key={include} className="flex gap-2 text-sm leading-5 text-noirMuted">
                  <CircleDot className="mt-0.5 shrink-0 text-goldAccent" size={14} />
                  {include}
                </li>
              ))}
            </ul>
            <p className="mt-auto border-t border-white/10 pt-5 text-sm font-bold leading-6 text-noirPaper/80">
              <span className="case-label block pb-2">{t.packages.labels.bestFor}</span>
              {item.footer}
            </p>
            <span className="approved-stamp">{t.packages.labels.approved}</span>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function FinalCTA({ t, language }) {
  const isLongLang = language === "RU" || language === "UA";
  const titleClass = isLongLang
    ? "text-[clamp(1.62rem,7.1vw,2.25rem)] md:text-[clamp(3.05rem,5.1vw,4.75rem)]"
    : "text-[clamp(2rem,10vw,3.35rem)] md:text-7xl";

  return (
    <section id="contact" data-page-id="contact" className="mx-auto w-[calc(100%-32px)] max-w-7xl py-20 md:w-[calc(100%-48px)]">
      <motion.div
        className="case-note relative overflow-hidden p-5 text-center sm:p-7 md:p-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <Sparkles className="mx-auto text-goldAccent" size={30} />
        <p className="case-eyebrow mt-5">{t.cta.eyebrow}</p>
        <h2 className={`final-cta-title mx-auto mt-4 max-w-4xl break-words [overflow-wrap:anywhere] font-display font-black leading-[0.95] text-noirPaper ${titleClass}`}>
          {t.cta.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-noirMuted md:text-lg">{t.cta.text}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="https://t.me/selfhitaro" target="_blank" rel="noreferrer" className="noir-button primary">
            {t.cta.primary}
            <ArrowUpRight size={18} />
          </a>
          <a href="#work" className="noir-button ghost">
            {t.cta.secondary}
            <FolderOpen size={18} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer className="relative z-10 mx-auto flex w-[calc(100%-32px)] max-w-7xl flex-col gap-6 border-t border-white/10 py-8 md:w-[calc(100%-48px)] md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-display text-3xl font-black text-noirPaper">NoirVision</p>
        <p className="mt-2 text-sm text-noirMuted">{t.footer.text}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {t.nav.map((item) => (
          <a key={item.href} href={item.href} className="text-sm font-bold text-noirPaper/60 hover:text-noirPaper">
            {item.label}
          </a>
        ))}
      </div>
    </footer>
  );
}

function Section({ id, pageId, eyebrow, title, subtitle, children }) {
  return (
    <section id={id} data-page-id={pageId || id} className="mx-auto w-[calc(100%-32px)] max-w-7xl py-16 md:w-[calc(100%-48px)] md:py-24">
      <motion.div className="mb-10 max-w-4xl" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.48 }}>
        <p className="case-eyebrow">{eyebrow}</p>
        <h2 className="mt-4 font-display text-[clamp(2.7rem,7.2vw,6rem)] font-black leading-[0.9] tracking-normal text-noirPaper">{title}</h2>
        {subtitle && <p className="mt-5 max-w-3xl text-base leading-8 text-noirMuted md:text-lg">{subtitle}</p>}
      </motion.div>
      {children}
    </section>
  );
}

function NoirAtmosphere() {
  const reduced = useReducedMotion();
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#030303_0%,#070707_48%,#0B0B0E_100%)]" />
      <motion.div
        className="absolute left-[-18%] top-[-16%] h-[72vh] w-[58vw] bg-[radial-gradient(ellipse_at_center,rgba(255,255,220,0.13),transparent_58%)] blur-3xl"
        animate={reduced ? {} : { opacity: [0.5, 0.22, 0.48], x: [0, 42, -10], y: [0, 28, -12] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-24%] right-[-18%] h-[78vh] w-[72vw] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.18),transparent_62%)] blur-3xl"
        animate={reduced ? {} : { opacity: [0.45, 0.75, 0.38], x: [0, -55, 18], y: [0, -30, 16] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <div className="absolute inset-0 smoke-beams" />
      <div className="absolute inset-0 film-grain" />
    </div>
  );
}

export default App;
