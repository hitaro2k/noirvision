import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function IconBase({ children, size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function DropletsIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M7 3.5C4.8 6.6 3.8 8.7 3.8 10.4a3.2 3.2 0 0 0 6.4 0C10.2 8.7 9.2 6.6 7 3.5Z" />
      <path d="M16.5 4.5c-2.8 3.9-4.1 6.5-4.1 8.7a4.1 4.1 0 0 0 8.2 0c0-2.2-1.3-4.8-4.1-8.7Z" />
    </IconBase>
  );
}

function ShieldCheckIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 3 5.2 5.8v5.1c0 4.5 2.7 8.5 6.8 10.1 4.1-1.6 6.8-5.6 6.8-10.1V5.8L12 3Z" />
      <path d="m8.8 12.2 2.1 2.1 4.5-5" />
    </IconBase>
  );
}

function WindIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M3 8h11.2a2.8 2.8 0 1 0-2.4-4.2" />
      <path d="M3 12h16.2a2.8 2.8 0 1 1-2.4 4.2" />
      <path d="M3 16h8" />
    </IconBase>
  );
}

function MountainIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m3 20 7.4-13 4 7 2.1-3.5L21 20H3Z" />
      <path d="m10.4 7 2.1 3.4 1.9-2.1" />
    </IconBase>
  );
}

function ArrowUpRightIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </IconBase>
  );
}

function WavesIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M3 8c2 0 2-1.5 4-1.5S9 8 11 8s2-1.5 4-1.5S17 8 21 8" />
      <path d="M3 13c2 0 2-1.5 4-1.5S9 13 11 13s2-1.5 4-1.5S17 13 21 13" />
      <path d="M3 18c2 0 2-1.5 4-1.5S9 18 11 18s2-1.5 4-1.5S17 18 21 18" />
    </IconBase>
  );
}

const specs = [
  { icon: ShieldCheckIcon, label: "GORE‑TEX membrane", value: "waterproof / breathable" },
  { icon: DropletsIcon, label: "DWR finish", value: "water beads and rolls off" },
  { icon: WindIcon, label: "Storm hood", value: "sealed fit in hard weather" },
  { icon: MountainIcon, label: "Alpine shell", value: "light, packable, durable" },
];

const componentSmokeTests = [
  { name: "has four product specs", pass: specs.length === 4 },
  { name: "all specs have icon components", pass: specs.every((item) => typeof item.icon === "function") },
  { name: "gore-tex is emphasized", pass: specs.some((item) => item.label.includes("GORE")) },
];

componentSmokeTests.forEach((test) => {
  if (!test.pass) {
    console.error(`Smoke test failed: ${test.name}`);
  }
});

function RainLayer() {
  const drops = useMemo(
    () =>
      Array.from({ length: 44 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        delay: (i % 9) * 0.18,
        duration: 1.2 + (i % 5) * 0.18,
        length: 36 + (i % 4) * 18,
        opacity: 0.16 + (i % 6) * 0.035,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
      {drops.map((drop) => (
        <motion.span
          key={drop.id}
          className="absolute -top-20 block w-px rotate-[18deg] bg-gradient-to-b from-white/0 via-white/70 to-white/0"
          style={{ left: drop.left, height: drop.length, opacity: drop.opacity }}
          animate={{ y: [0, 820], x: [0, -130] }}
          transition={{ repeat: Infinity, ease: "linear", duration: drop.duration, delay: drop.delay }}
        />
      ))}
    </div>
  );
}

function WaterPour() {
  return (
    <div className="pointer-events-none absolute -right-10 top-4 h-[72%] w-[50%] overflow-visible">
      <motion.div
        className="absolute right-20 top-2 h-[420px] w-12 origin-top rotate-[20deg] rounded-full bg-gradient-to-b from-white/80 via-cyan-100/70 to-white/0 blur-[1px]"
        animate={{ scaleY: [0.2, 1, 0.7, 1], opacity: [0, 0.85, 0.55, 0.8] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-28 top-48 h-24 w-44 rotate-[22deg] rounded-[100%] border border-white/30 bg-cyan-100/15 backdrop-blur-[2px]"
        animate={{ x: [0, -28, -54], y: [0, 20, 48], scale: [0.7, 1.05, 0.9], opacity: [0, 0.65, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
      />
      {[0, 1, 2, 3, 4, 5].map((n) => (
        <motion.span
          key={n}
          className="absolute h-2 w-2 rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,.8)]"
          style={{ right: 112 + n * 18, top: 230 + (n % 2) * 24 }}
          animate={{ x: [0, -60 - n * 12], y: [0, 75 + n * 10], opacity: [0, 1, 0], scale: [0.6, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: n * 0.16, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function JacketIllustration() {
  return (
    <motion.div
      className="relative mx-auto aspect-[0.72] w-full max-w-[420px]"
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      aria-label="Black Patagonia GORE-TEX jacket illustration with animated water beads"
    >
      <motion.div
        className="absolute left-1/2 top-[3%] h-[22%] w-[42%] -translate-x-1/2 rounded-t-[46%] rounded-b-[26%] bg-zinc-950 shadow-[inset_0_-18px_28px_rgba(255,255,255,.05),0_28px_50px_rgba(0,0,0,.5)]"
        animate={{ filter: ["brightness(1)", "brightness(1.18)", "brightness(1)"] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <div className="absolute left-[22%] top-[18%] h-[66%] w-[56%] rounded-t-[24%] rounded-b-[8%] bg-gradient-to-br from-zinc-950 via-zinc-900 to-black shadow-[inset_12px_0_30px_rgba(255,255,255,.035),inset_-18px_0_38px_rgba(255,255,255,.025),0_34px_80px_rgba(0,0,0,.5)]" />
      <div className="absolute left-[46.8%] top-[24%] h-[57%] w-[2.2%] rounded-full bg-zinc-700 shadow-[0_0_0_1px_rgba(255,255,255,.08)]" />
      <div className="absolute left-[49%] top-[25%] h-[52%] w-[1.3%] rounded-full bg-black/80" />
      <div className="absolute left-[50.5%] top-[26%] h-4 w-2 rounded-full bg-zinc-300/70" />
      <div className="absolute left-[29%] top-[25%] h-[1px] w-[22%] rotate-[28deg] bg-white/10" />
      <div className="absolute right-[30%] top-[25%] h-[1px] w-[22%] -rotate-[28deg] bg-white/10" />
      <div className="absolute left-[9%] top-[31%] h-[49%] w-[18%] rotate-[12deg] rounded-[40%_20%_25%_35%] bg-gradient-to-br from-zinc-900 to-black shadow-[inset_10px_0_24px_rgba(255,255,255,.035)]" />
      <div className="absolute right-[9%] top-[31%] h-[49%] w-[18%] -rotate-[12deg] rounded-[20%_40%_35%_25%] bg-gradient-to-bl from-zinc-900 to-black shadow-[inset_-10px_0_24px_rgba(255,255,255,.035)]" />
      <div className="absolute left-[17%] top-[73%] h-[5%] w-[17%] rotate-[10deg] rounded bg-black shadow-[inset_0_1px_0_rgba(255,255,255,.08)]" />
      <div className="absolute right-[17%] top-[73%] h-[5%] w-[17%] -rotate-[10deg] rounded bg-black shadow-[inset_0_1px_0_rgba(255,255,255,.08)]" />
      <div className="absolute left-[54%] top-[36%] text-[10px] tracking-tight text-white/28">patagonia</div>

      <motion.div
        className="absolute left-[18%] top-[20%] h-[63%] w-[64%] rounded-[28%_28%_10%_10%] bg-gradient-to-br from-white/5 via-transparent to-white/0 mix-blend-screen"
        animate={{ opacity: [0.25, 0.55, 0.25], x: [-4, 8, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      {[...Array(18)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-2 w-2 rounded-full border border-cyan-100/50 bg-white/35 shadow-[0_0_16px_rgba(186,230,253,.55)]"
          style={{ left: `${25 + ((i * 17) % 45)}%`, top: `${28 + ((i * 23) % 44)}%` }}
          animate={{ y: [0, 22, 44], opacity: [0, 1, 0], scale: [0.4, 1, 0.6] }}
          transition={{ duration: 2.2 + (i % 4) * 0.3, delay: i * 0.12, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </motion.div>
  );
}

export default function PatagoniaGoreTexLanding() {
  const [storm, setStorm] = useState(true);

  return (
    <main className="min-h-screen overflow-hidden bg-[#07090b] text-white">
      <section className="relative isolate min-h-screen px-5 py-6 md:px-10 lg:px-14">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,rgba(14,165,233,.25),transparent_34%),radial-gradient(circle_at_16%_12%,rgba(255,255,255,.12),transparent_22%),linear-gradient(140deg,#050505_0%,#101418_45%,#050505_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-cyan-950/30 to-transparent" />
        {storm && <RainLayer />}

        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/[.04] px-5 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-white text-black">
              <WavesIcon size={18} />
            </div>
            <span className="font-semibold tracking-wide">Patagonia Shell Lab</span>
          </div>
          <button
            onClick={() => setStorm(!storm)}
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
            aria-pressed={storm}
          >
            {storm ? "calm mode" : "storm mode"}
          </button>
        </nav>

        <div className="mx-auto grid max-w-7xl items-center gap-10 pt-16 lg:grid-cols-[1.02fr_.98fr] lg:pt-20">
          <div>
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-100/10 px-4 py-2 text-sm text-cyan-50 shadow-[0_0_40px_rgba(14,165,233,.14)]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <DropletsIcon size={16} /> Guaranteed waterproof performance
            </motion.div>

            <motion.h1
              className="max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              Patagonia <span className="text-cyan-100">GORE‑TEX</span> shell for weather that does not ask permission.
            </motion.h1>

            <motion.p
              className="mt-7 max-w-2xl text-lg leading-8 text-white/66 md:text-xl"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.8 }}
            >
              Black technical jacket with sealed construction, storm hood and a GORE‑TEX membrane that blocks rain while letting heat escape. Water hits the surface, beads up and slides away.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.8 }}
            >
              <Button className="h-13 rounded-full bg-white px-7 py-6 text-base font-semibold text-black hover:bg-cyan-100">
                Shop the shell <ArrowUpRightIcon className="ml-2" size={18} />
              </Button>
              <Button variant="outline" className="h-13 rounded-full border-white/18 bg-white/5 px-7 py-6 text-base text-white hover:bg-white/10 hover:text-white">
                Explore GORE‑TEX
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="relative rounded-[2rem] border border-white/10 bg-white/[.035] p-5 shadow-[0_40px_120px_rgba(0,0,0,.45)] backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.96, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.9 }}
          >
            <WaterPour />
            <div className="absolute left-6 top-6 z-10 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-cyan-50 backdrop-blur-xl">
              waterproof test
            </div>
            <JacketIllustration />
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-2 rounded-3xl border border-white/10 bg-black/45 p-3 backdrop-blur-xl">
              <div>
                <p className="text-2xl font-semibold">28k</p>
                <p className="text-xs text-white/50">water column</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">3L</p>
                <p className="text-xs text-white/50">laminate</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">0%</p>
                <p className="text-xs text-white/50">soak‑through</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-10 lg:px-14">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {specs.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="h-full overflow-hidden rounded-[1.6rem] border-white/10 bg-white/[.04] text-white shadow-none backdrop-blur-xl">
                  <CardContent className="p-6">
                    <div className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-cyan-100/10 text-cyan-100">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-semibold">{item.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/55">{item.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
