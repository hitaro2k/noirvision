import React from "react";

// Sandbox-safe React landing page.
// No lucide-react, shadcn/ui, framer-motion, CDN icons, or external images.
// Icons are small inline SVG components, so the page runs offline in the preview sandbox.

const HERO_IMAGE_ALT = "UGC review of KIKO Milano contour stick";

const bullets = [
  "creamy texture that blends out easily",
  "stick format — apply directly to the skin in seconds",
  "soft shadow effect without muddy patches",
  "compact enough to keep in your makeup bag for touch-ups",
];

const steps = [
  "Swipe under the cheekbone",
  "Add along the hairline",
  "Blend with a brush or fingertips",
];

const productFacts = [
  "for cheekbones, forehead and jawline",
  "easy to apply straight from the stick",
  "simple to add to an everyday makeup routine",
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Landing smoke test failed: ${message}`);
  }
}

function runLandingSmokeTests() {
  assert(bullets.length === 4, "expected 4 review benefit bullets");
  assert(steps.length === 3, "expected 3 application steps");
  assert(productFacts.length === 3, "expected 3 product facts");
  assert(bullets.every((item) => item.length > 10), "every bullet should contain meaningful copy");
  assert(steps[0].toLowerCase().includes("cheekbone"), "first step should mention cheekbone application");
  assert(productFacts.some((fact) => fact.includes("jawline")), "product facts should mention jawline usage");
  return true;
}

runLandingSmokeTests();

function Icon({ name, size = 20, className = "" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": "true",
  };

  const icons = {
    star: (
      <svg {...common} fill="currentColor" stroke="currentColor">
        <path d="M12 2.7 14.9 8.6l6.5.9-4.7 4.6 1.1 6.5L12 17.5 6.2 20.6l1.1-6.5-4.7-4.6 6.5-.9L12 2.7Z" />
      </svg>
    ),
    sparkles: (
      <svg {...common}>
        <path d="M12 3l1.4 4.2L17.6 9l-4.2 1.8L12 15l-1.4-4.2L6.4 9l4.2-1.8L12 3Z" />
        <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" />
        <path d="M5 13l.8 2.2L8 16l-2.2.8L5 19l-.8-2.2L2 16l2.2-.8L5 13Z" />
      </svg>
    ),
    check: (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.4 2.4L16.5 8.5" />
      </svg>
    ),
    play: (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8.5v7l5.5-3.5L10 8.5Z" fill="currentColor" stroke="none" />
      </svg>
    ),
    shield: (
      <svg {...common}>
        <path d="M12 3 19 6v5.6c0 4.3-2.9 7.6-7 9.4-4.1-1.8-7-5.1-7-9.4V6l7-3Z" />
        <path d="m8.5 12 2.2 2.2L15.8 9" />
      </svg>
    ),
    wand: (
      <svg {...common}>
        <path d="M15 4l5 5" />
        <path d="M14 5l-9 9a2.1 2.1 0 0 0 3 3l9-9" />
        <path d="M5 4v2" />
        <path d="M4 5h2" />
        <path d="M19 16v2" />
        <path d="M18 17h2" />
      </svg>
    ),
    bag: (
      <svg {...common}>
        <path d="M6 8h12l-1 12H7L6 8Z" />
        <path d="M9 8a3 3 0 0 1 6 0" />
      </svg>
    ),
    arrow: (
      <svg {...common}>
        <path d="m9 18 6-6-6-6" />
      </svg>
    ),
  };

  return icons[name] || null;
}

function Button({ href, variant = "primary", children, className = "" }) {
  const variants = {
    primary: "bg-[#211814] text-white hover:bg-[#3a2921] shadow-lg shadow-[#211814]/15",
    light: "bg-white text-[#211814] hover:bg-white/90 shadow-lg shadow-black/10",
    outline: "border border-[#211814]/20 bg-white/70 text-[#211814] hover:bg-white",
    ghostDark: "border border-white/30 bg-transparent text-white hover:bg-white/10",
  };

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-7 py-4 text-base font-bold transition ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl border border-[#2b1b12]/10 bg-white shadow-sm ${className}`}>{children}</div>;
}

function SnapshotMock() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#ead7c9] via-[#c58b76] to-[#211814]" role="img" aria-label={HERO_IMAGE_ALT}>
      <div className="absolute left-1/2 top-12 h-56 w-44 -translate-x-1/2 rounded-[50%] bg-[#f0c2a8] shadow-2xl" />
      <div className="absolute left-1/2 top-5 h-44 w-52 -translate-x-1/2 rounded-t-[70%] bg-[#6f2d24]" />
      <div className="absolute left-1/2 top-28 h-3 w-24 -translate-x-1/2 rounded-full bg-[#6f2d24]/30" />
      <div className="absolute left-[43%] top-[132px] h-4 w-8 rounded-full bg-[#2b2724]/70" />
      <div className="absolute right-[43%] top-[132px] h-4 w-8 rounded-full bg-[#2b2724]/70" />
      <div className="absolute left-1/2 top-[177px] h-5 w-16 -translate-x-1/2 rounded-full bg-[#8d4d3b]" />
      <div className="absolute left-8 top-28 h-80 w-28 -rotate-12 rounded-[2rem] bg-gradient-to-b from-[#050505] to-[#25211f] shadow-2xl" />
      <div className="absolute left-11 top-[270px] -rotate-12 text-center text-[10px] font-black leading-tight tracking-tight text-white">
        SCULPTING<br />TOUCH<br /><span className="text-[8px] font-medium">CREAMY STICK</span><br /><br />KIKO
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#211814] to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 p-4 backdrop-blur">
        <p className="font-bold text-[#211814]">“A soft sculpt in one minute — no harsh stripes.”</p>
      </div>
    </div>
  );
}

export default function KikoUgcLanding() {
  return (
    <div className="min-h-screen bg-[#fbf3ed] text-[#211814]">
      <header className="sticky top-0 z-50 border-b border-[#2b1b12]/10 bg-[#fbf3ed]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="text-xl font-black tracking-tight">KIKO Milano</div>
          <a href="#buy" className="rounded-full bg-[#211814] px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90">
            Shop now
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 lg:grid-cols-2">
          <div className="animate-[fadeUp_0.65s_ease-out_both]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2b1b12]/10 bg-white/80 px-4 py-2 text-sm font-semibold shadow-sm">
              <Icon name="sparkles" size={16} /> UGC AI review: real contour on camera
            </div>
            <h1 className="mt-6 text-5xl font-black leading-[0.92] tracking-tight md:text-7xl">
              Filter-like cheekbones — in real life
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#5c4a40] md:text-xl">
              A UGC-style review of the KIKO Milano Sculpting Touch Creamy Stick Contour: a creamy contour stick made to define your features quickly while keeping the finish soft, natural and wearable in daylight.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#buy">
                I want this contour <Icon name="arrow" size={18} className="ml-1" />
              </Button>
              <Button href="#review" variant="outline">
                <Icon name="play" size={17} className="mr-2" /> Watch the breakdown
              </Button>
            </div>
            <div className="mt-7 flex items-center gap-2 text-sm text-[#5c4a40]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Icon key={index} name="star" size={17} />
              ))}
              <span className="ml-2">looks polished, applies effortlessly</span>
            </div>
          </div>

          <div className="relative animate-[fadeIn_0.75s_ease-out_0.1s_both]">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#d7a083]/50 via-white/50 to-[#7b4c39]/20 blur-2xl" />
            <div className="relative mx-auto max-w-sm rotate-1 rounded-[2.5rem] bg-[#211814] p-3 shadow-2xl">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] bg-black">
                <SnapshotMock />
                <div className="absolute left-4 right-4 top-4 flex items-center justify-between text-white">
                  <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-bold">AI UGC BLOGGER</span>
                  <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold">REC</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="review" className="bg-white py-16">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 lg:grid-cols-3">
            <Card className="bg-[#fbf3ed] lg:col-span-1">
              <div className="p-7">
                <Icon name="wand" size={30} className="mb-5" />
                <h2 className="text-3xl font-black leading-tight">Why did the blogger keep it in her makeup bag?</h2>
                <p className="mt-4 text-[#6c584d]">
                  Because it is a fast way to add dimension to the face without complicated technique or heavy layers of makeup.
                </p>
              </div>
            </Card>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
              {bullets.map((item) => (
                <Card key={item}>
                  <div className="flex gap-4 p-6">
                    <Icon name="check" size={22} className="mt-1 shrink-0" />
                    <p className="text-lg font-semibold">{item}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-black tracking-tight md:text-5xl">Contour without the fear of overdoing it</h2>
              <p className="mt-4 text-lg text-[#6c584d]">
                This stick is made for quick makeup: swipe, blend, and get a soft sculpted shadow that still looks like skin.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step} className="rounded-[2rem] border border-[#2b1b12]/10 bg-white p-7 shadow-sm transition hover:-translate-y-1">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#211814] font-black text-white">{index + 1}</div>
                  <h3 className="mt-5 text-2xl font-black">{step}</h3>
                  <p className="mt-3 text-[#6c584d]">The creamy line melts into a soft shadow — no harsh, graphic stripes.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="buy" className="bg-[#211814] py-16 text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                <Icon name="shield" size={16} /> beauty upgrade in one stick
              </div>
              <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">Add it to cart while the effect is still on your mind</h2>
              <p className="mt-5 max-w-2xl text-lg text-white/70">
                Sculpting Touch Creamy Stick Contour is the product for “a little more defined, but still natural.” It works beautifully for UGC makeup, selfies and everyday looks.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#buy" variant="light">
                  <Icon name="bag" size={18} className="mr-2" /> Shop the contour
                </Button>
                <Button href="#review" variant="ghostDark">Choose your shade</Button>
              </div>
            </div>
            <Card className="border-none bg-white text-[#211814] shadow-2xl">
              <div className="p-7">
                <p className="text-sm font-bold uppercase tracking-widest text-[#8c6a59]">review verdict</p>
                <h3 className="mt-3 text-3xl font-black">Get it if you want quick contour without a makeup masterclass</h3>
                <div className="mt-6 space-y-4 text-[#5c4a40]">
                  {productFacts.map((fact) => (
                    <p key={fact}>✓ {fact}</p>
                  ))}
                </div>
                <div className="mt-7 rounded-2xl bg-[#fbf3ed] p-4 text-sm text-[#6c584d]">
                  Tip: start with a thin line and build slowly — that is how the result stays soft, natural and easy to wear.
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
