import React, { useEffect, useMemo, useState } from "react";

// Landing for BR geo: FirstUA referral promo
// Offer: invite 10 friends = R$ 3.000 bonus/reward
// This version avoids lucide-react, shadcn/ui and framer-motion so it can build in sandboxed environments
// that cannot fetch external icon chunks from a CDN.
// Replace BACKGROUND_FRAME_URL / HERO_FRAME_URL with exported frames from the video.

const BACKGROUND_FRAME_URL = "/assets/firstua-frame-01.jpg";
const HERO_FRAME_URL = "/assets/firstua-frame-04.jpg";

const promo = {
  brand: "FirstUA",
  geo: "BR",
  friendsRequired: 10,
  reward: "R$ 3.000",
};

const steps = [
  {
    icon: "👥",
    title: "Convide 10 amigos",
    text: "Compartilhe seu link exclusivo com quem curte jogar online.",
  },
  {
    icon: "✅",
    title: "Eles entram e jogam",
    text: "Cada amigo precisa cumprir as regras da campanha para contar.",
  },
  {
    icon: "🏆",
    title: "Receba R$ 3.000",
    text: "Com 10 indicações válidas, o prêmio promocional cai na sua conta.",
  },
];

const benefits = [
  "Campanha exclusiva para jogadores do Brasil",
  "Conta rápida pelo celular",
  "Slots, roletas e promoções em um só lugar",
  "Suporte e regras claras da oferta",
];

function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "inline-flex h-14 items-center justify-center rounded-2xl px-8 text-base font-black transition duration-200 active:scale-[.98]";
  const variants = {
    primary: "bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 text-black shadow-[0_0_40px_rgba(255,121,0,.55)] hover:scale-[1.02]",
    light: "bg-white text-red-700 hover:bg-amber-100",
    outline: "border border-white/15 bg-white/5 text-white hover:bg-white/10",
    ghost: "text-white hover:bg-white/10",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

function IconBadge({ children, className = "" }) {
  return (
    <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-red-500 to-amber-400 text-2xl text-black shadow-[0_0_32px_rgba(255,104,0,.35)] ${className}`}>
      {children}
    </div>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl border border-white/10 bg-white/[.06] shadow-2xl backdrop-blur-xl ${className}`}>{children}</div>;
}

function Countdown() {
  const target = useMemo(() => Date.now() + 1000 * 60 * 60 * 8 + 1000 * 60 * 37, []);
  const [left, setLeft] = useState(target - Date.now());

  useEffect(() => {
    const id = setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(id);
  }, [target]);

  const hours = String(Math.floor(left / 1000 / 60 / 60)).padStart(2, "0");
  const minutes = String(Math.floor((left / 1000 / 60) % 60)).padStart(2, "0");
  const seconds = String(Math.floor((left / 1000) % 60)).padStart(2, "0");

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-amber-300/30 bg-black/45 px-4 py-2 text-sm text-amber-100 shadow-2xl backdrop-blur">
      <span aria-hidden="true">⏱️</span>
      <span>Oferta ativa por</span>
      <strong className="font-mono text-white">{hours}:{minutes}:{seconds}</strong>
    </div>
  );
}

function validatePromoContent(config, stepItems, benefitItems) {
  return Boolean(
    config.brand === "FirstUA" &&
    config.geo === "BR" &&
    config.friendsRequired === 10 &&
    config.reward === "R$ 3.000" &&
    stepItems.length === 3 &&
    stepItems.some((step) => step.title.includes("10 amigos")) &&
    stepItems.some((step) => step.text.includes("10 indicações válidas")) &&
    benefitItems.some((item) => item.includes("Brasil"))
  );
}

function runSmokeTests() {
  const passed = validatePromoContent(promo, steps, benefits);
  if (!passed) {
    throw new Error("Smoke test failed: promo content must match BR offer 10 amigos = R$ 3.000.");
  }
  return true;
}

runSmokeTests();

export default function FirstUaPromoLanding() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070000] text-white">
      <section className="relative isolate min-h-screen px-4 py-6 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_20%,rgba(255,72,0,.45),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(255,184,0,.26),transparent_38%),linear-gradient(180deg,#150000,#050000)]" />
        <div
          className="absolute inset-0 -z-10 opacity-30 mix-blend-screen"
          style={{
            backgroundImage: `url(${BACKGROUND_FRAME_URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute left-1/2 top-0 -z-10 h-96 w-80 -translate-x-1/2 rounded-full bg-red-500/40 blur-3xl" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-red-600/35 to-transparent" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-3xl border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-red-600 shadow-[0_0_30px_rgba(255,0,0,.75)]">
              <span className="text-xl font-black">X1</span>
            </div>
            <div>
              <p className="text-sm font-bold tracking-widest text-red-100">FIRSTUA</p>
              <p className="text-xs text-white/55">Promo BR • 18+</p>
            </div>
          </div>
          <Button variant="light" className="h-11 rounded-full px-5 text-sm">
            Participar agora
          </Button>
        </nav>

        <div className="mx-auto grid max-w-7xl items-center gap-10 pb-16 pt-14 lg:grid-cols-[1.02fr_.98fr] lg:pt-20">
          <div className="animate-[fadeUp_.7s_ease-out_both] text-center lg:text-left">
            <div className="mb-6 flex justify-center lg:justify-start">
              <Countdown />
            </div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-300/20 bg-red-500/15 px-4 py-2 text-sm font-bold text-red-50 shadow-[0_0_32px_rgba(255,0,0,.25)] backdrop-blur">
              <span aria-hidden="true">✨</span>
              Campanha de indicação exclusiva
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl font-black leading-[.9] tracking-tight sm:text-7xl lg:mx-0 lg:text-8xl">
              10 amigos
              <span className="block bg-gradient-to-b from-amber-200 via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(255,170,0,.55)]">
                R$ 3.000
              </span>
              no FirstUA
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-red-50/80 lg:mx-0">
              Chame sua galera, complete 10 indicações válidas e desbloqueie uma recompensa promocional de R$ 3.000 para jogar no FirstUA.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button>
                Quero meu link <span className="ml-2" aria-hidden="true">›</span>
              </Button>
              <Button variant="outline">
                Ver regras da promoção
              </Button>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm text-white/65 lg:justify-start">
              <span className="rounded-full bg-white/10 px-4 py-2">+18</span>
              <span className="rounded-full bg-white/10 px-4 py-2">Jogue com responsabilidade</span>
              <span className="rounded-full bg-white/10 px-4 py-2">Oferta sujeita a termos</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] animate-[heroPop_.8s_ease-out_.1s_both]">
            <div className="absolute -inset-10 rounded-full bg-orange-500/30 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-amber-300/20 bg-black/50 shadow-[0_0_80px_rgba(255,72,0,.45)] backdrop-blur-xl">
              <div
                className="aspect-[4/5] bg-cover bg-center"
                style={{ backgroundImage: `url(${HERO_FRAME_URL})` }}
              >
                <div className="relative flex h-full flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_50%_24%,rgba(255,210,0,.34),transparent_26%),linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.86))] p-6">
                  <div className="pointer-events-none absolute inset-0 opacity-80">
                    <div className="absolute left-10 top-10 h-3 w-3 rounded-full bg-yellow-300 shadow-[70px_20px_0_2px_rgba(255,184,0,.9),170px_8px_0_0_rgba(255,221,80,.85),290px_50px_0_3px_rgba(255,165,0,.75),220px_145px_0_2px_rgba(255,220,80,.8),90px_190px_0_4px_rgba(255,123,0,.65)]" />
                    <div className="absolute inset-x-10 top-0 h-44 bg-gradient-to-b from-red-500/45 to-transparent blur-2xl" />
                  </div>

                  <div className="relative mx-auto mt-4 w-full max-w-[360px] rounded-[2rem] border border-red-300/30 bg-black/45 p-5 shadow-[0_0_60px_rgba(255,85,0,.45)] backdrop-blur-md">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-600 text-lg font-black shadow-[0_0_28px_rgba(255,0,0,.75)]">X1</div>
                      <div className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs font-black uppercase tracking-[.18em] text-amber-200">Indique</div>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="grid aspect-square place-items-center rounded-full border border-amber-200/50 bg-gradient-to-br from-yellow-200 via-orange-400 to-red-500 text-sm font-black text-black shadow-[0_0_22px_rgba(255,190,0,.45)]">
                          {i + 1}
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-4 text-center">
                      <p className="text-xs font-bold uppercase tracking-[.2em] text-white/60">Meta da campanha</p>
                      <p className="mt-1 text-3xl font-black text-amber-300">10 amigos</p>
                    </div>
                  </div>

                  <div className="relative rounded-3xl border border-white/15 bg-black/70 p-5 backdrop-blur-xl">
                    <p className="mb-2 text-sm font-bold uppercase tracking-[.22em] text-amber-300">Bônus desbloqueado</p>
                    <p className="text-5xl font-black text-white">R$ 3.000</p>
                    <p className="mt-2 text-sm text-white/70">Ao completar 10 indicações válidas.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(255,0,0,.18),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(255,184,0,.14),transparent_25%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-black uppercase tracking-[.25em] text-amber-300">Como funciona</p>
            <h2 className="mt-3 text-4xl font-black sm:text-5xl">3 passos para ativar sua recompensa</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <Card key={step.title}>
                <div className="p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <IconBadge>{step.icon}</IconBadge>
                    <span className="text-5xl font-black text-white/10">0{index + 1}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">{step.title}</h3>
                  <p className="mt-3 leading-7 text-white/65">{step.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-red-300/10 bg-gradient-to-br from-red-950/60 via-black to-amber-950/40 p-6 shadow-[0_0_70px_rgba(255,0,0,.18)] md:grid-cols-[.85fr_1.15fr] md:p-10">
          <div>
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-red-600">
              🎁
            </div>
            <h2 className="text-4xl font-black leading-tight">Tudo pronto para transformar indicação em prêmio.</h2>
            <p className="mt-4 text-white/65">Use essa dobra para explicar o valor da oferta, quebrar objeções e levar o usuário direto ao cadastro.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[.06] p-4">
                <span className="mt-1 shrink-0 text-amber-300" aria-hidden="true">🛡️</span>
                <p className="text-sm leading-6 text-white/78">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-amber-300/20 bg-black/60 p-7 text-center shadow-[0_0_80px_rgba(255,120,0,.22)] backdrop-blur-xl sm:p-10">
          <div className="mx-auto mb-5 flex w-fit gap-1 text-amber-300" aria-label="Avaliação cinco estrelas">
            {Array.from({ length: 5 }).map((_, i) => <span key={i}>★</span>)}
          </div>
          <h2 className="text-4xl font-black sm:text-5xl">Pegue seu link e comece agora</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/65">
            Quanto antes você convidar, mais rápido chega nas 10 indicações válidas. Promoção limitada e sujeita aos termos do FirstUA.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button className="px-10">
              Participar da promoção
            </Button>
            <Button variant="ghost">
              <span className="mr-2" aria-hidden="true">💬</span> Falar com suporte
            </Button>
          </div>
          <p className="mt-8 text-xs leading-6 text-white/45">
            Proibido para menores de 18 anos. Jogue com responsabilidade. Valores, elegibilidade, prazos, rollover e validação das indicações devem ser confirmados nos termos oficiais da campanha. Esta página é um modelo criativo de landing e deve ser revisada antes da veiculação.
          </p>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroPop {
          from { opacity: 0; transform: scale(.92) rotate(-3deg); }
          to { opacity: 1; transform: scale(1) rotate(0); }
        }
      `}</style>
    </main>
  );
}
