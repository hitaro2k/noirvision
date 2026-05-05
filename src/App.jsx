import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Magnet,
  Menu,
  Play,
  RefreshCw,
  Rocket,
  TrendingUp,
  Video,
  X
} from "lucide-react";

const LANGUAGES = ["RU", "UA", "ENG"];
const TELEGRAM_URL = "https://t.me/selfhitaro";
const pathIcons = [TrendingUp, Magnet, Video, ImageIcon, FileText, Rocket, RefreshCw];

const caseAssets = [
  {
    id: "pack-1win-free-bonus",
    number: "001",
    filters: ["all", "igaming"],
    coverImage: "/watermarked/pack1winfreebonusENG/welcomebonus_pic.png",
    landingUrl: "/pack1winfreebonusENG/index.html",
    landingPreview: "/watermarked/pack1winfreebonusENG/landing1win.png",
    landingScreens: [
      "/watermarked/pack1winfreebonusENG/landing1win.png",
      "/watermarked/pack1winfreebonusENG/thunderGates_pick.jpg",
      "/watermarked/pack1winfreebonusENG/CreatorUGC.jpg"
    ],
    videos: [
      {
        title: "UGC Promo",
        label: "Free bonus push",
        description: "Short-form promo for the welcome/free bonus angle.",
        url: "/watermarked/pack1winfreebonusENG/1W%20welcomebonus(1).mp4",
        poster: "/watermarked/pack1winfreebonusENG/welcomebonus_pic.png"
      },
      {
        title: "Slot Review Promo",
        label: "Thunder Gates slot angle",
        description: "Slot overview promo with the promo mechanic and slot-link CTA.",
        url:
          "/watermarked/pack1winfreebonusENG/openart-77283007ebbe215edc0bad4445dbbd03-de15e8c3-5852-4a74-8b31-0857106c1218_1777928543456_eb5b4ea4.mp4",
        poster: "/watermarked/pack1winfreebonusENG/thunderGates_pick.jpg"
      },
      {
        title: "Video Slot 03",
        label: "Reserved",
        description: "Reserved place for the third promo video in this pack.",
        pending: true
      }
    ],
    statics: [
      { title: "Animated Slot Visual", src: "/watermarked/pack1winfreebonusENG/static/Animated%20Slot%20Visual.jpg" },
      { title: "App Demo Static", src: "/watermarked/pack1winfreebonusENG/static/App%20Demo%20Static.jpg" },
      { title: "Responsible Premium Brand", src: "/watermarked/pack1winfreebonusENG/static/Responsible%20Premium%20Brand.jpg" },
      { title: "UGC Review Thumbnail", src: "/watermarked/pack1winfreebonusENG/static/UGC%20Review%20Thumbnail.jpg" },
      { title: "Welcome Offer Explainer", src: "/watermarked/pack1winfreebonusENG/static/Welcome%20Offer%20Explainer.jpg" }
    ],
    hooks: [
      { title: "Hook A - Ontario angle", file: "Hook_A_Ontario.txt" },
      { title: "Hook B - Bonus mechanic", file: "Hook_B_Bonus.txt" },
      { title: "Hook C - App demo", file: "Hook_C_App_Demo.txt" }
    ],
    cardMetrics: ["2/3 videos", "5 statics", "HTML landing", "3 hooks"]
  },
  {
    id: "fitnerd-fitness-ai",
    number: "002",
    filters: ["product", "ugc"],
    videoUrl: "/watermarked/videos/FItnerdUGCMain.mp4",
    landingUrl: "https://fitnerd-aiassistent.vercel.app/",
    landingScreens: ["/watermarked/landing/landimage/Fitnerdland1.png", "/watermarked/landing/landimage/Fitnerdland2.png"]
  },
  {
    id: "kiko-contouring-ugc",
    number: "003",
    filters: ["beauty", "ugc", "product"],
    videoUrl: "/watermarked/videos/kiko_conturing.mp4",
    phoneVideoUrl: "/watermarked/videos/kiko_conturing.mp4",
    landingUrl: "/?landing=kiko",
    landingScreens: [
      "/watermarked/landing/landimage/kikoland1.png",
      "/watermarked/landing/landimage/kikoland2.png",
      "/watermarked/landing/landimage/kikoland3.png",
      "/watermarked/landing/landimage/kikoland4.png"
    ]
  },
  {
    id: "firstua-friend-bonus",
    number: "004",
    filters: ["igaming"],
    videoUrl: "/watermarked/videos/BR10fr3000$.mp4",
    landingUrl: "/?landing=firstua",
    landingScreens: [
      "/watermarked/landing/landimage/firstBRfriend1.png",
      "/watermarked/landing/landimage/firstBRfriend2.png",
      "/watermarked/landing/landimage/firstBRfriend3.png"
    ]
  },
  {
    id: "patagonia-goretex-cinema",
    number: "005",
    filters: ["product"],
    videoUrl: "/watermarked/videos/patagonia(final).mp4",
    landingUrl: "/?landing=patagonia",
    landingScreens: ["/watermarked/landing/landimage/patagonialand1.png", "/watermarked/landing/landimage/patagonialand2.png"]
  }
];

const translations = {
  ENG: {
    pageNames: {
      top: "Main",
      path: "Conversion path",
      directions: "Departments",
      stack: "Stack",
      deals: "Pricing",
      contact: "Contact"
    },
    menu: "Menu",
    close: "Close",
    logoSub: "AI-FIRST CREATIVE STUDIO",
    hero: {
      eyebrow: "NOIRVISION // PERFORMANCE CREATIVE STUDIO",
      title: ["You bring the offer.", "We build the funnel."],
      line: "Aggressive creative systems for iGaming, UGC, AI video, static ads, landing pages and test campaigns.",
      text:
        "NoirVision compresses offer packaging into one direct path: hook, emotion, video, static, landing and test-ready assets.",
      primary: "Launch a campaign",
      secondary: "Open work",
      stats: ["iGaming funnels", "UGC and AI video", "Landing tests"]
    },
    work: {
      eyebrow: "WORK",
      title: "Test Pack Library",
      intro: "Choose a category. Open a pack to see the videos, statics, landing and hook angles delivered as one test-ready set.",
      filters: [
        { id: "all", label: "All" },
        { id: "igaming", label: "iGaming" },
        { id: "beauty", label: "Beauty" },
        { id: "ugc", label: "UGC" },
        { id: "product", label: "Product" }
      ],
      open: "Open pack",
      raw: "Raw offer",
      output: "Output",
      result: "Result"
    },
    cases: [
      {
        title: "1Win Welcome Bonus Offer",
        input: "Welcome bonus for the first deposit in an online casino",
        output: "Test pack: 3 video slots, HTML landing, 5 Facebook statics and 3 hook angles",
        result: "A compact acquisition pack for bonus traffic: promo clips, Facebook statics, landing and hook angles.",
        tags: ["iGaming", "Test Pack", "Free Bonus"],
        built: [
          "main promo for free bonus traffic",
          "slot-review promo with slot-link CTA",
          "HTML landing page",
          "Facebook static set",
          "hook angle files"
        ]
      },
      {
        title: "Fitnerd FitnessAI",
        input: "AI fitness assistant promo",
        output: "UGC promo video + live landing page",
        result: "Creator-style acquisition case for an AI fitness product.",
        tags: ["FitnessAI", "UGC", "Landing"],
        built: ["product hook", "creator-style script", "app benefit demo", "short-form edit", "landing proof"]
      },
      {
        title: "KIKO Contouring UGC",
        input: "Promote contouring product",
        output: "Beauty UGC promo + product landing",
        result: "Beauty offer turned into a soft creator demo with purchase CTA.",
        tags: ["Beauty", "UGC", "KIKO"],
        built: ["creator review", "beauty demo", "phone-frame video", "social proof", "purchase CTA"]
      },
      {
        title: "FirstUA Friend Bonus",
        input: "10 friends = 3000$ bonus offer",
        output: "Fast casino video + promo landing",
        result: "Video and landing assembled as a rapid iGaming test in 10 minutes.",
        tags: ["iGaming", "Fast Test", "Bonus"],
        built: ["direct bonus hook", "referral mechanic", "fast video", "offer landing", "launch CTA"]
      },
      {
        title: "Patagonia Gore-Tex Cinema",
        input: "Gore-Tex jacket promo",
        output: "AI-cinema promo + product landing",
        result: "Outdoor apparel offer turned into a cinematic ad in 20-30 minutes.",
        tags: ["Cinema", "Fashion", "AI Video"],
        built: ["cinematic product angle", "weather hook", "AI motion scenes", "product landing", "purchase CTA"]
      }
    ],
    path: {
      eyebrow: "CONVERSION PATH",
      title: "Not a clip. A pressure system.",
      text:
        "The creative is not one asset. It is a chain that moves the user from offer recognition to a testable action.",
      steps: ["Grow Offer", "Hook", "Emotion Video", "Static Image", "Short Landing Page", "Launch a Test", "Test and Iterate"]
    },
    directions: {
      eyebrow: "DEPARTMENTS",
      title: "Two directions. One job: attention that converts.",
      panels: [
        {
          title: "iGaming Performance",
          label: "Core direction",
          text: "Casino, betting, bonus, freebet, referral, deposit, cashback and promo creatives built for fast testing.",
          tags: ["Casino", "Betting", "Freebet", "Referral", "Deposit", "Promo landings"]
        },
        {
          title: "Brand Product",
          label: "UGC / Product direction",
          text: "Beauty, apps, e-commerce, fintech, streetwear, local brands and product launches that need sharp social content.",
          tags: ["Beauty", "Apps", "E-commerce", "Fintech", "Streetwear", "Local premium"]
        }
      ]
    },
    stack: {
      eyebrow: "STACK",
      title: "The Stack Behind the Funnel",
      text: "Compact AI-first production stack for fast visuals, UGC logic, landing builds and creative iteration.",
      groups: [
        ["Strategy", "GPT-5.5", "Claude Opus 4.7", "Claude Sonnet 4.6"],
        ["Web", "Codex", "Claude Code", "Next.js", "React", "Webflow"],
        ["Image", "Midjourney", "GPT Image 2", "Nano Banana"],
        ["Video", "Kling", "Higgsfield Cinema Studio", "Higgsfield Marketing Studio", "Runway", "Veo"],
        ["Automation", "Automated Wave", "Batch video generation", "Rapid variants"],
        ["UGC", "HeyGen", "AI UGC workflows", "Real creators"],
        ["Post", "Figma", "CapCut", "DaVinci Resolve"]
      ]
    },
    pricing: {
      eyebrow: "PRICING",
      title: "iGaming client prices",
      subtitle: "Fast test packs, growth volume and monthly creative iteration.",
      packs: [
        { title: "Test Pack", price: "$250-500", items: ["3 videos", "5 statics", "3 hook variants"] },
        {
          title: "Growth Pack",
          price: "$1,000-2,000",
          items: ["10-15 videos", "15-20 statics", "resizes", "localization", "hypothesis table"]
        },
        {
          title: "Retainer",
          price: "$2,500-7,000/mo",
          items: ["30-80 creatives", "weekly iterations", "winners / losers analysis", "new angles"]
        }
      ],
      tableTitle: "Price per 1 creative",
      table: [
        ["Static banner", "$10-50"],
        ["Simple animation / slot", "$30-150"],
        ["App demo / screen-style video", "$50-200"],
        ["AI-avatar UGC", "$80-300"],
        ["Real human UGC", "$150-700+"],
        ["UGC with actor, script, edit, variations", "$300-1,000+"]
      ]
    },
    cta: {
      eyebrow: "CONTACT",
      title: "Bring the offer. We build the test system.",
      text: "Send the raw offer, deadline and traffic goal. We will package it into hooks, videos, statics, landing and first test hypotheses.",
      button: "Text on Telegram"
    },
    modal: {
      case: "Pack",
      raw: "Raw offer",
      built: "Built into",
      landing: "Landing screens",
      videos: "Promo videos",
      statics: "Facebook statics",
      hooks: "Hooks",
      viewLanding: "View landing",
      request: "Request similar"
    }
  },
  RU: {
    pageNames: {
      top: "Главная",
      path: "Воронка",
      directions: "Направления",
      stack: "Стек",
      deals: "Цены",
      contact: "Контакт"
    },
    menu: "Меню",
    close: "Закрыть",
    logoSub: "AI-FIRST CREATIVE STUDIO",
    hero: {
      eyebrow: "NOIRVISION // PERFORMANCE CREATIVE STUDIO",
      title: ["Вы приносите оффер.", "Мы строим воронку."],
      line: "Агрессивные creative systems для iGaming, UGC, AI-видео, статиков, лендингов и тестовых кампаний.",
      text:
        "NoirVision сжимает упаковку оффера в один прямой путь: hook, эмоция, видео, static, landing и ассеты под тест.",
      primary: "Запустить кампанию",
      secondary: "Открыть работы",
      stats: ["iGaming funnels", "UGC и AI video", "Landing tests"]
    },
    work: {
      eyebrow: "WORK",
      title: "Библиотека тест-паков",
      intro: "Выберите категорию. Откройте пак, чтобы увидеть видео, статики, лендинг и hook-углы как один готовый набор под тест.",
      filters: [
        { id: "all", label: "Все" },
        { id: "igaming", label: "iGaming" },
        { id: "beauty", label: "Beauty" },
        { id: "ugc", label: "UGC" },
        { id: "product", label: "Product" }
      ],
      open: "Открыть пак",
      raw: "Оффер",
      output: "Выход",
      result: "Результат"
    },
    cases: [
      {
        title: "1Win Welcome Bonus Offer",
        input: "Welcome bonus за первый депозит в онлайн-казино",
        output: "Тест-пак: 3 video slots, HTML-лендинг, 5 Facebook statics и 3 hook-угла",
        result: "Компактный acquisition pack под bonus-трафик: ролики, статики для Facebook, лендинг и hook-углы.",
        tags: ["iGaming", "Test Pack", "Free Bonus"],
        built: [
          "main promo под free bonus",
          "slot-review promo с CTA на слот",
          "HTML landing page",
          "набор Facebook statics",
          "hook-файлы под углы захода"
        ]
      },
      {
        title: "Fitnerd FitnessAI",
        input: "Промо AI fitness assistant",
        output: "UGC promo video + live landing page",
        result: "Creator-style acquisition case для AI fitness продукта.",
        tags: ["FitnessAI", "UGC", "Landing"],
        built: ["product hook", "creator-style сценарий", "demo пользы приложения", "short-form edit", "landing proof"]
      },
      {
        title: "KIKO Contouring UGC",
        input: "Прорекламировать продукт для контуринга",
        output: "Beauty UGC promo + product landing",
        result: "Beauty offer упакован в мягкий creator demo с purchase CTA.",
        tags: ["Beauty", "UGC", "KIKO"],
        built: ["creator review", "beauty demo", "phone-frame video", "social proof", "purchase CTA"]
      },
      {
        title: "FirstUA Friend Bonus",
        input: "10 друзей = 3000$ bonus offer",
        output: "Fast casino video + promo landing",
        result: "Видео и лендинг собраны как быстрый iGaming test за 10 минут.",
        tags: ["iGaming", "Fast Test", "Bonus"],
        built: ["direct bonus hook", "referral mechanic", "fast video", "offer landing", "launch CTA"]
      },
      {
        title: "Patagonia Gore-Tex Cinema",
        input: "Промо Gore-Tex куртки",
        output: "AI-cinema promo + product landing",
        result: "Outdoor apparel offer превращен в cinematic ad за 20-30 минут.",
        tags: ["Cinema", "Fashion", "AI Video"],
        built: ["cinematic product angle", "weather hook", "AI motion scenes", "product landing", "purchase CTA"]
      }
    ],
    path: {
      eyebrow: "CONVERSION PATH",
      title: "Не ролик. Система давления.",
      text:
        "Креатив - это не один ассет. Это цепочка, которая ведет пользователя от понимания оффера к тестируемому действию.",
      steps: ["Grow Offer", "Hook", "Emotion Video", "Static Image", "Short Landing Page", "Launch a Test", "Test and Iterate"]
    },
    directions: {
      eyebrow: "DEPARTMENTS",
      title: "Два направления. Одна задача: внимание, которое конвертит.",
      panels: [
        {
          title: "iGaming Performance",
          label: "Core direction",
          text: "Casino, betting, bonus, freebet, referral, deposit, cashback и promo creatives под быстрый тест.",
          tags: ["Casino", "Betting", "Freebet", "Referral", "Deposit", "Promo landings"]
        },
        {
          title: "Brand Product",
          label: "UGC / Product direction",
          text: "Beauty, apps, e-commerce, fintech, streetwear, local brands и product launches, которым нужен острый social content.",
          tags: ["Beauty", "Apps", "E-commerce", "Fintech", "Streetwear", "Local premium"]
        }
      ]
    },
    stack: {
      eyebrow: "STACK",
      title: "The Stack Behind the Funnel",
      text: "Компактный AI-first production stack для быстрых визуалов, UGC-логики, лендингов и итераций.",
      groups: [
        ["Strategy", "GPT-5.5", "Claude Opus 4.7", "Claude Sonnet 4.6"],
        ["Web", "Codex", "Claude Code", "Next.js", "React", "Webflow"],
        ["Image", "Midjourney", "GPT Image 2", "Nano Banana"],
        ["Video", "Kling", "Higgsfield Cinema Studio", "Higgsfield Marketing Studio", "Runway", "Veo"],
        ["Automation", "Automated Wave", "быстрый batch видосов", "rapid variants"],
        ["UGC", "HeyGen", "AI UGC workflows", "Real creators"],
        ["Post", "Figma", "CapCut", "DaVinci Resolve"]
      ]
    },
    pricing: {
      eyebrow: "PRICING",
      title: "Цены для iGaming клиентов",
      subtitle: "Test pack, объемный growth и месячная итерация креативов.",
      packs: [
        { title: "Test Pack", price: "$250-500", items: ["3 видео", "5 статик", "3 hook-варианта"] },
        {
          title: "Growth Pack",
          price: "$1,000-2,000",
          items: ["10-15 видео", "15-20 статик", "ресайзы", "локализация", "таблица гипотез"]
        },
        {
          title: "Retainer",
          price: "$2,500-7,000/мес",
          items: ["30-80 креативов", "еженедельные итерации", "анализ winners / losers", "новые angles"]
        }
      ],
      tableTitle: "Цена за 1 креатив",
      table: [
        ["Статичный баннер", "$10-50"],
        ["Простая анимация / слот", "$30-150"],
        ["App demo / screen-style video", "$50-200"],
        ["AI-avatar UGC", "$80-300"],
        ["Real human UGC", "$150-700+"],
        ["UGC с актером, сценарием, монтажом, вариациями", "$300-1,000+"]
      ]
    },
    cta: {
      eyebrow: "CONTACT",
      title: "Приносите оффер. Мы строим тестовую систему.",
      text: "Отправьте сырой оффер, дедлайн и цель по трафику. Мы упакуем это в hooks, videos, statics, landing и первые test hypotheses.",
      button: "Написать в Telegram"
    },
    modal: {
      case: "Пак",
      raw: "Оффер",
      built: "Собрали в",
      landing: "Скрины лендинга",
      videos: "Promo-видео",
      statics: "Статики для Facebook",
      hooks: "Hooky",
      viewLanding: "Открыть лендинг",
      request: "Заказать похожее"
    }
  },
  UA: {
    pageNames: {
      top: "Головна",
      path: "Воронка",
      directions: "Напрями",
      stack: "Стек",
      deals: "Ціни",
      contact: "Контакт"
    },
    menu: "Меню",
    close: "Закрити",
    logoSub: "AI-FIRST CREATIVE STUDIO",
    hero: {
      eyebrow: "NOIRVISION // PERFORMANCE CREATIVE STUDIO",
      title: ["Ви приносите оффер.", "Ми будуємо воронку."],
      line: "Агресивні creative systems для iGaming, UGC, AI-відео, статиків, лендингів і тестових кампаній.",
      text:
        "NoirVision стискає упаковку оффера в один прямий шлях: hook, емоція, відео, static, landing і асети під тест.",
      primary: "Запустити кампанію",
      secondary: "Відкрити роботи",
      stats: ["iGaming funnels", "UGC та AI video", "Landing tests"]
    },
    work: {
      eyebrow: "WORK",
      title: "Бібліотека тест-паків",
      intro: "Оберіть категорію. Відкрийте пак, щоб побачити відео, статики, лендинг і hook-кути як один готовий набір під тест.",
      filters: [
        { id: "all", label: "Усі" },
        { id: "igaming", label: "iGaming" },
        { id: "beauty", label: "Beauty" },
        { id: "ugc", label: "UGC" },
        { id: "product", label: "Product" }
      ],
      open: "Відкрити пак",
      raw: "Оффер",
      output: "Вихід",
      result: "Результат"
    },
    cases: [
      {
        title: "1Win Welcome Bonus Offer",
        input: "Welcome bonus за перший депозит в онлайн-казино",
        output: "Тест-пак: 3 video slots, HTML-лендинг, 5 Facebook statics і 3 hook-кути",
        result: "Компактний acquisition pack під bonus-трафік: ролики, статики для Facebook, лендинг і hook-кути.",
        tags: ["iGaming", "Test Pack", "Free Bonus"],
        built: [
          "main promo під free bonus",
          "slot-review promo з CTA на слот",
          "HTML landing page",
          "набір Facebook statics",
          "hook-файли під кути заходу"
        ]
      },
      {
        title: "Fitnerd FitnessAI",
        input: "Промо AI fitness assistant",
        output: "UGC promo video + live landing page",
        result: "Creator-style acquisition case для AI fitness продукту.",
        tags: ["FitnessAI", "UGC", "Landing"],
        built: ["product hook", "creator-style сценарій", "demo користі застосунку", "short-form edit", "landing proof"]
      },
      {
        title: "KIKO Contouring UGC",
        input: "Прорекламувати продукт для контурингу",
        output: "Beauty UGC promo + product landing",
        result: "Beauty offer упакований у м'який creator demo з purchase CTA.",
        tags: ["Beauty", "UGC", "KIKO"],
        built: ["creator review", "beauty demo", "phone-frame video", "social proof", "purchase CTA"]
      },
      {
        title: "FirstUA Friend Bonus",
        input: "10 друзів = 3000$ bonus offer",
        output: "Fast casino video + promo landing",
        result: "Відео і лендинг зібрані як швидкий iGaming test за 10 хвилин.",
        tags: ["iGaming", "Fast Test", "Bonus"],
        built: ["direct bonus hook", "referral mechanic", "fast video", "offer landing", "launch CTA"]
      },
      {
        title: "Patagonia Gore-Tex Cinema",
        input: "Промо Gore-Tex куртки",
        output: "AI-cinema promo + product landing",
        result: "Outdoor apparel offer перетворений на cinematic ad за 20-30 хвилин.",
        tags: ["Cinema", "Fashion", "AI Video"],
        built: ["cinematic product angle", "weather hook", "AI motion scenes", "product landing", "purchase CTA"]
      }
    ],
    path: {
      eyebrow: "CONVERSION PATH",
      title: "Не ролик. Система тиску.",
      text:
        "Креатив - це не один асет. Це ланцюг, який веде користувача від розуміння оффера до тестованої дії.",
      steps: ["Grow Offer", "Hook", "Emotion Video", "Static Image", "Short Landing Page", "Launch a Test", "Test and Iterate"]
    },
    directions: {
      eyebrow: "DEPARTMENTS",
      title: "Два напрями. Одна задача: увага, яка конвертить.",
      panels: [
        {
          title: "iGaming Performance",
          label: "Core direction",
          text: "Casino, betting, bonus, freebet, referral, deposit, cashback і promo creatives під швидкий тест.",
          tags: ["Casino", "Betting", "Freebet", "Referral", "Deposit", "Promo landings"]
        },
        {
          title: "Brand Product",
          label: "UGC / Product direction",
          text: "Beauty, apps, e-commerce, fintech, streetwear, local brands і product launches, яким потрібен гострий social content.",
          tags: ["Beauty", "Apps", "E-commerce", "Fintech", "Streetwear", "Local premium"]
        }
      ]
    },
    stack: {
      eyebrow: "STACK",
      title: "The Stack Behind the Funnel",
      text: "Компактний AI-first production stack для швидких візуалів, UGC-логіки, лендингів та ітерацій.",
      groups: [
        ["Strategy", "GPT-5.5", "Claude Opus 4.7", "Claude Sonnet 4.6"],
        ["Web", "Codex", "Claude Code", "Next.js", "React", "Webflow"],
        ["Image", "Midjourney", "GPT Image 2", "Nano Banana"],
        ["Video", "Kling", "Higgsfield Cinema Studio", "Higgsfield Marketing Studio", "Runway", "Veo"],
        ["Automation", "Automated Wave", "швидкий batch відео", "rapid variants"],
        ["UGC", "HeyGen", "AI UGC workflows", "Real creators"],
        ["Post", "Figma", "CapCut", "DaVinci Resolve"]
      ]
    },
    pricing: {
      eyebrow: "PRICING",
      title: "Ціни для iGaming клієнтів",
      subtitle: "Test pack, об'ємний growth і місячна ітерація креативів.",
      packs: [
        { title: "Test Pack", price: "$250-500", items: ["3 відео", "5 статик", "3 hook-варіанти"] },
        {
          title: "Growth Pack",
          price: "$1,000-2,000",
          items: ["10-15 відео", "15-20 статик", "ресайзи", "локалізація", "таблиця гіпотез"]
        },
        {
          title: "Retainer",
          price: "$2,500-7,000/міс",
          items: ["30-80 креативів", "щотижневі ітерації", "аналіз winners / losers", "нові angles"]
        }
      ],
      tableTitle: "Ціна за 1 креатив",
      table: [
        ["Статичний банер", "$10-50"],
        ["Проста анімація / слот", "$30-150"],
        ["App demo / screen-style video", "$50-200"],
        ["AI-avatar UGC", "$80-300"],
        ["Real human UGC", "$150-700+"],
        ["UGC з актором, сценарієм, монтажем, варіаціями", "$300-1,000+"]
      ]
    },
    cta: {
      eyebrow: "CONTACT",
      title: "Приносьте оффер. Ми будуємо тестову систему.",
      text: "Надішліть сирий оффер, дедлайн і ціль по трафіку. Ми упакуємо це в hooks, videos, statics, landing і перші test hypotheses.",
      button: "Написати в Telegram"
    },
    modal: {
      case: "Пак",
      raw: "Оффер",
      built: "Зібрали в",
      landing: "Скрини лендинга",
      videos: "Promo-відео",
      statics: "Статики для Facebook",
      hooks: "Hooky",
      viewLanding: "Відкрити лендинг",
      request: "Замовити схоже"
    }
  }
};

const pageOrder = ["top", "path", "directions", "stack", "deals", "contact"];

function getLocalizedCases(language) {
  return translations[language].cases.map((item, index) => ({ ...caseAssets[index], ...item }));
}

function canScrollCaseBoard(target, delta) {
  if (!(target instanceof Element)) return false;
  const scrollBox = target.closest(".nv-case-grid");
  if (!scrollBox) return false;

  const maxScroll = scrollBox.scrollHeight - scrollBox.clientHeight;
  if (maxScroll <= 1) return false;

  const goingDown = delta > 0;
  const canMoveDown = scrollBox.scrollTop < maxScroll - 1;
  const canMoveUp = scrollBox.scrollTop > 1;
  return goingDown ? canMoveDown : canMoveUp;
}

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem("noirvision-language") || "RU");
  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return Math.max(0, pageOrder.indexOf(hash));
  });
  const [activeCase, setActiveCase] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const lockRef = useRef(false);
  const touchStartRef = useRef(null);
  const t = translations[language] || translations.RU;
  const cases = useMemo(() => getLocalizedCases(language), [language]);

  const goToPage = (index) => {
    const next = Math.max(0, Math.min(pageOrder.length - 1, index));
    setActivePage(next);
    window.history.replaceState(null, "", `#${pageOrder[next]}`);
  };

  useEffect(() => {
    localStorage.setItem("noirvision-language", language);
  }, [language]);

  useEffect(() => {
    document.body.style.overflow = activeCase || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCase, menuOpen]);

  useEffect(() => {
    const pageElement = document.getElementById(pageOrder[activePage]);
    requestAnimationFrame(() => {
      pageElement?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [activePage]);

  useEffect(() => {
    const onWheel = (event) => {
      if (activeCase || menuOpen) return;
      const intent = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (canScrollCaseBoard(event.target, intent)) return;
      if (Math.abs(intent) < 24 || lockRef.current) return;
      event.preventDefault();
      lockRef.current = true;
      goToPage(activePage + (intent > 0 ? 1 : -1));
      window.setTimeout(() => {
        lockRef.current = false;
      }, 760);
    };

    const onKey = (event) => {
      if (activeCase || menuOpen) return;
      if (["ArrowRight", "PageDown", " "].includes(event.key)) goToPage(activePage + 1);
      if (["ArrowLeft", "PageUp"].includes(event.key)) goToPage(activePage - 1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [activePage, activeCase, menuOpen]);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    if (!touchStartRef.current || activeCase || menuOpen) return;
    const touch = event.changedTouches[0];
    const dx = touchStartRef.current.x - touch.clientX;
    const dy = touchStartRef.current.y - touch.clientY;
    const isHorizontalSwipe = Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.25;
    if (isHorizontalSwipe) goToPage(activePage + (dx > 0 ? 1 : -1));
    touchStartRef.current = null;
  };

  return (
    <div className="nv-app">
      <Header
        t={t}
        language={language}
        setLanguage={setLanguage}
        activePage={activePage}
        goToPage={goToPage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main className="nv-horizontal-shell" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <motion.div
          className="nv-track"
          animate={{ x: `-${activePage * 100}vw` }}
          transition={{ duration: 0.74, ease: [0.76, 0, 0.24, 1] }}
        >
          <HeroPage t={t} cases={cases} setActiveCase={setActiveCase} goToPage={goToPage} />
          <PathPage t={t} />
          <DirectionsPage t={t} />
          <StackPage t={t} />
          <PricingPage t={t} />
          <ContactPage t={t} />
        </motion.div>
      </main>

      <PageControls t={t} activePage={activePage} goToPage={goToPage} />

      <AnimatePresence>
        {menuOpen && (
          <MenuOverlay
            t={t}
            language={language}
            setLanguage={setLanguage}
            goToPage={goToPage}
            onClose={() => setMenuOpen(false)}
          />
        )}
        {activeCase && <CaseModal t={t} item={activeCase} onClose={() => setActiveCase(null)} />}
      </AnimatePresence>
    </div>
  );
}

function Header({ t, language, setLanguage, activePage, goToPage, menuOpen, setMenuOpen }) {
  return (
    <header className="nv-header">
      <button className="nv-logo" onClick={() => goToPage(0)} type="button">
        Noir<span>Vision</span>
      </button>
      <div className="nv-header-meta">
        <span>{String(activePage + 1).padStart(2, "0")}</span>
        <span>{t.pageNames[pageOrder[activePage]]}</span>
      </div>
      <div className="nv-header-actions">
        <LanguageSwitch language={language} setLanguage={setLanguage} />
        <button className="nv-menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={18} />
          {t.menu}
        </button>
      </div>
    </header>
  );
}

function LanguageSwitch({ language, setLanguage }) {
  return (
    <div className="nv-language-switch">
      {LANGUAGES.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLanguage(item)}
          className={language === item ? "is-active" : ""}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function MenuOverlay({ t, language, setLanguage, goToPage, onClose }) {
  return (
    <motion.div
      className="nv-menu-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24 }}
    >
      <div className="nv-menu-ghost">NOIRVISION</div>
      <button className="nv-close" type="button" onClick={onClose} aria-label={t.close}>
        <X size={22} />
      </button>
      <div className="nv-menu-inner">
        <LanguageSwitch language={language} setLanguage={setLanguage} />
        <nav>
          {pageOrder.map((pageId, index) => (
            <button
              key={pageId}
              type="button"
              onClick={() => {
                goToPage(index);
                onClose();
              }}
            >
              <span>NO - {String(index + 1).padStart(3, "0")}</span>
              {t.pageNames[pageId]}
            </button>
          ))}
        </nav>
        <a className="nv-menu-contact" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
          Telegram / selfhitaro <ArrowUpRight size={18} />
        </a>
      </div>
    </motion.div>
  );
}

function HeroPage({ t, cases, setActiveCase, goToPage }) {
  return (
    <Page id="top" className="nv-hero-page">
      <section className="nv-hero-copy">
        <p className="nv-eyebrow">{t.hero.eyebrow}</p>
        <h1>
          <span>{t.hero.title[0]}</span>
          <span>{t.hero.title[1]}</span>
        </h1>
        <p className="nv-hero-line">{t.hero.line}</p>
        <p className="nv-muted">{t.hero.text}</p>
        <div className="nv-actions">
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="nv-primary">
            {t.hero.primary}
            <ArrowUpRight size={18} />
          </a>
          <button
            type="button"
            className="nv-secondary"
            onClick={() => document.getElementById("work-board")?.scrollIntoView({ behavior: "smooth", block: "start" })}
          >
            {t.hero.secondary}
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="nv-stat-row">
          {t.hero.stats.map((stat) => (
            <span key={stat}>{stat}</span>
          ))}
        </div>
      </section>
      <WorkBoard t={t} cases={cases} setActiveCase={setActiveCase} />
    </Page>
  );
}

function WorkBoard({ t, cases, setActiveCase }) {
  const [filter, setFilter] = useState("all");
  const filteredCases = filter === "all" ? cases : cases.filter((item) => item.filters.includes(filter));

  return (
    <section id="work-board" className="nv-work-board">
      <div className="nv-section-top">
        <p className="nv-eyebrow">{t.work.eyebrow}</p>
        <h2>{t.work.title}</h2>
        <p>{t.work.intro}</p>
      </div>
      <div className="nv-filter-row">
        {t.work.filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={filter === item.id ? "is-active" : ""}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="nv-case-grid">
        {filteredCases.map((item) => (
          <button
            key={item.id}
            className={`nv-case-card ${item.coverImage ? "has-cover" : ""}`}
            type="button"
            onClick={() => setActiveCase(item)}
          >
            {item.coverImage && (
              <span className="nv-case-cover">
                <img src={item.coverImage} alt="" />
                <span>{item.filters[0]} pack</span>
              </span>
            )}
            <span className="nv-case-number">CASE {item.number}</span>
            <span className="nv-case-title">{item.title}</span>
            <span className="nv-case-line">
              <b>{t.work.raw}</b> {item.input}
            </span>
            <span className="nv-case-line">
              <b>{t.work.output}</b> {item.output}
            </span>
            <span className="nv-case-tags">
              {item.tags.map((tag) => (
                <em key={tag}>{tag}</em>
              ))}
            </span>
            {item.cardMetrics && (
              <span className="nv-pack-metrics">
                {item.cardMetrics.map((metric) => (
                  <em key={metric}>{metric}</em>
                ))}
              </span>
            )}
            <span className="nv-open-case">
              {t.work.open}
              <ArrowUpRight size={15} />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function PathPage({ t }) {
  return (
    <Page id="path" className="nv-path-page">
      <div className="nv-page-heading">
        <p className="nv-eyebrow">{t.path.eyebrow}</p>
        <h2>{t.path.title}</h2>
        <p>{t.path.text}</p>
      </div>
      <div className="nv-path-chain">
        {t.path.steps.map((step, index) => {
          const Icon = pathIcons[index] || ArrowRight;

          return (
            <div key={step} className="nv-path-step">
              <div className="nv-path-step-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div className="nv-path-icon">
                  <Icon size={20} />
                </div>
              </div>
              <h3>{step}</h3>
            </div>
          );
        })}
      </div>
    </Page>
  );
}

function DirectionsPage({ t }) {
  return (
    <Page id="directions" className="nv-directions-page">
      <div className="nv-page-heading compact">
        <p className="nv-eyebrow">{t.directions.eyebrow}</p>
        <h2>{t.directions.title}</h2>
      </div>
      <div className="nv-department-grid">
        {t.directions.panels.map((panel, index) => (
          <article key={panel.title} className={`nv-department ${index === 0 ? "is-core" : ""}`}>
            <span>DEPARTMENT {String(index + 1).padStart(3, "0")}</span>
            <p>{panel.label}</p>
            <h3>{panel.title}</h3>
            <p className="nv-muted">{panel.text}</p>
            <div>
              {panel.tags.map((tag) => (
                <em key={tag}>{tag}</em>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Page>
  );
}

function StackPage({ t }) {
  return (
    <Page id="stack" className="nv-stack-page">
      <div className="nv-page-heading compact">
        <p className="nv-eyebrow">{t.stack.eyebrow}</p>
        <h2>{t.stack.title}</h2>
        <p>{t.stack.text}</p>
      </div>
      <div className="nv-stack-grid">
        {t.stack.groups.map(([title, ...items]) => (
          <article key={title} className="nv-stack-card">
            <h3>{title}</h3>
            <div>
              {items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Page>
  );
}

function PricingPage({ t }) {
  return (
    <Page id="deals" className="nv-pricing-page">
      <div className="nv-page-heading compact">
        <p className="nv-eyebrow">{t.pricing.eyebrow}</p>
        <h2>{t.pricing.title}</h2>
        <p>{t.pricing.subtitle}</p>
      </div>
      <div className="nv-pricing-layout">
        <div className="nv-pack-grid">
          {t.pricing.packs.map((pack) => (
            <article key={pack.title} className="nv-price-pack">
              <h3>{pack.title}</h3>
              <strong>{pack.price}</strong>
              <ul>
                {pack.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="nv-rate-table">
          <h3>{t.pricing.tableTitle}</h3>
          <table>
            <tbody>
              {t.pricing.table.map(([format, price]) => (
                <tr key={format}>
                  <td>{format}</td>
                  <td>{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}

function ContactPage({ t }) {
  return (
    <Page id="contact" className="nv-contact-page">
      <div className="nv-contact-card">
        <p className="nv-eyebrow">{t.cta.eyebrow}</p>
        <h2>{t.cta.title}</h2>
        <p>{t.cta.text}</p>
        <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="nv-primary">
          {t.cta.button}
          <ArrowUpRight size={18} />
        </a>
      </div>
    </Page>
  );
}

function Page({ id, className = "", children }) {
  return (
    <section id={id} className={`nv-page ${className}`}>
      <div className="nv-page-noise" />
      {children}
    </section>
  );
}

function PageControls({ t, activePage, goToPage }) {
  return (
    <div className="nv-page-controls">
      <button type="button" onClick={() => goToPage(activePage - 1)} disabled={activePage === 0}>
        <ArrowLeft size={16} />
      </button>
      <span>
        {String(activePage + 1).padStart(2, "0")} / {String(pageOrder.length).padStart(2, "0")}
        <b>{t.pageNames[pageOrder[activePage]]}</b>
      </span>
      <button type="button" onClick={() => goToPage(activePage + 1)} disabled={activePage === pageOrder.length - 1}>
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

function CaseModal({ t, item, onClose }) {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape") {
        if (lightbox) setLightbox(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [lightbox, onClose]);

  const videos = item.videos || [
    {
      title: item.title,
      label: t.modal.videos,
      description: item.result,
      url: item.videoUrl,
      poster: item.landingScreens?.[0]
    }
  ];
  const hasPackMedia = Boolean(item.videos?.length || item.statics?.length || item.hooks?.length || item.landingPreview);

  return createPortal(
    <>
      <motion.div className="nv-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div
          className="nv-modal"
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
        >
          <button className="nv-modal-close" type="button" onClick={onClose}>
            <X size={22} />
          </button>
          <div className="nv-modal-head">
            <p>{t.modal.case} {item.number}</p>
            <h2>{item.title}</h2>
            <div>
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          {hasPackMedia ? (
            <section className="nv-pack-section">
              <div className="nv-pack-section-head">
                <p>{t.modal.videos}</p>
                <span>{videos.filter((video) => !video.pending).length}/{videos.length}</span>
              </div>
              <div className="nv-pack-video-grid">
                {videos.map((video) => (
                  <article key={video.title} className={video.pending ? "is-pending" : ""}>
                    {video.pending ? (
                      <div className="nv-video-placeholder">
                        <Video size={24} />
                        <span>{video.label}</span>
                      </div>
                    ) : (
                      <video src={video.url} poster={video.poster} controls playsInline preload="metadata" />
                    )}
                    <div>
                      <span>{video.label}</span>
                      <h3>{video.title}</h3>
                      <p>{video.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : (
            <video className="nv-modal-video" src={item.videoUrl} controls playsInline preload="metadata" />
          )}
          <div className="nv-modal-info">
            <article>
              <p>{t.modal.raw}</p>
              <h3>{item.input}</h3>
            </article>
            <article>
              <p>{t.modal.built}</p>
              <ul>
                {item.built.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          </div>
          {item.landingPreview && (
            <section className="nv-pack-section">
              <div className="nv-pack-section-head">
                <p>{t.modal.landing}</p>
                <a href={item.landingUrl} target="_blank" rel="noreferrer">
                  {t.modal.viewLanding}
                  <ExternalLink size={15} />
                </a>
              </div>
              <a className="nv-pack-landing" href={item.landingUrl} target="_blank" rel="noreferrer">
                <img src={item.landingPreview} alt={`${item.title} landing preview`} />
                <span>
                  HTML landing
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </section>
          )}
          {item.statics && (
            <section className="nv-pack-section">
              <div className="nv-pack-section-head">
                <p>{t.modal.statics}</p>
                <span>{item.statics.length}</span>
              </div>
              <div className="nv-static-grid">
                {item.statics.map((staticItem) => (
                  <button key={staticItem.src} type="button" onClick={() => setLightbox(staticItem.src)}>
                    <img src={staticItem.src} alt={staticItem.title} />
                    <span>{staticItem.title}</span>
                  </button>
                ))}
              </div>
            </section>
          )}
          {item.hooks && (
            <section className="nv-pack-section">
              <div className="nv-pack-section-head">
                <p>{t.modal.hooks}</p>
                <span>{item.hooks.length}</span>
              </div>
              <div className="nv-hook-grid">
                {item.hooks.map((hook) => (
                  <article key={hook.file}>
                    <FileText size={18} />
                    <h3>{hook.title}</h3>
                    <p>{hook.file}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
          <div className="nv-landing-strip">
            <h3>{t.modal.landing}</h3>
            <div>
              {item.landingScreens.map((src, index) => (
                <button key={src} type="button" onClick={() => setLightbox(src)}>
                  <img src={src} alt={`${item.title} screen ${index + 1}`} />
                  <span>SCREEN {index + 1}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="nv-modal-actions">
            <a href={item.landingUrl} target="_blank" rel="noreferrer">
              {t.modal.viewLanding}
              <ExternalLink size={16} />
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">
              {t.modal.request}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="nv-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button type="button" onClick={() => setLightbox(null)}>
              <X size={22} />
            </button>
            <img src={lightbox} alt="Landing full size" />
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}

export default App;
