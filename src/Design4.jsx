import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { FiArrowRight, FiArrowDown, FiMail, FiGithub, FiLinkedin, FiExternalLink, FiMenu, FiX } from "react-icons/fi";

// ─── DATA ───────────────────────────────────────────────────────────────────

const SECTIONS = ["Hero", "About", "Skills", "Projects", "Services", "Testimonials", "Contact"];

const PROJECTS = [
  { id: 1, title: "Luminary Design System", tag: "UI / React", year: "2026", desc: "A fully modular design system powering 12+ product teams — tokens, components, accessibility, and live Storybook docs.", color: "#9b5de5", accent: "#f15bb5" },
  { id: 2, title: "Aether E-Commerce", tag: "Next.js / Brand", year: "2026", desc: "End-to-end branded storefront with frictionless checkout, AR product preview, and sub-200ms interactions.", color: "#00bbf9", accent: "#00f5d4" },
  { id: 3, title: "Orbit Dashboard", tag: "Data Viz / React", year: "2025", desc: "Real-time analytics platform visualising millions of events per hour with WebGL charts and live WebSocket feeds.", color: "#f15bb5", accent: "#fee440" },
  { id: 4, title: "Nova Brand Identity", tag: "Branding / Figma", year: "2025", desc: "Complete visual identity for a Series-A fintech — logomark, motion guidelines, and a 60-page brand manual.", color: "#fee440", accent: "#9b5de5" },
  { id: 5, title: "Pulse Landing Page", tag: "Frontend / GSAP", year: "2025", desc: "Scroll-storytelling marketing page achieving 94 Lighthouse score and a 38% uplift in trial sign-ups.", color: "#00f5d4", accent: "#00bbf9" },
];

const SERVICES = [
  { icon: "⚡", title: "Front-End Development", desc: "Pixel-perfect, performant interfaces built with React, TypeScript, and modern tooling. Every millisecond counts." },
  { icon: "🎨", title: "UI / UX Design", desc: "User-centred interfaces grounded in research, systematic thinking, and obsessive attention to visual detail." },
  { icon: "✦", title: "Brand Identity", desc: "Logos, colour systems, typography, and motion guidelines that make your brand instantly recognisable." },
  { icon: "🚀", title: "Landing Pages", desc: "High-conversion pages engineered for speed and storytelling — the first impression that turns visitors into customers." },
  { icon: "🛒", title: "E-Commerce Development", desc: "Headless storefronts on Shopify or custom stacks — seamless UX from discovery to post-purchase delight." },
];

const TESTIMONIALS = [
  { name: "Sofia Reyes", role: "CPO · Aether Commerce", quote: "Working with them was transformative. Our conversion rate jumped 42% in the first month after launch — the attention to micro-interactions is unparalleled.", avatar: "SR" },
  { name: "Marcus Weld", role: "Founder · Orbit Analytics", quote: "They turned a complex data product into something people actually enjoy using. The dashboard redesign cut our onboarding time in half.", avatar: "MW" },
  { name: "Priya Nair", role: "Design Lead · Luminary", quote: "The design system they built is the backbone of everything we ship. Impeccable craft, great communication, and delivered on time.", avatar: "PN" },
  { name: "James Okoro", role: "CEO · Nova Fintech", quote: "Our brand went from forgettable to iconic. Investors noticed it before we even pitched — that says everything.", avatar: "JO" },
];

const SKILLS = {
  Frontend: [
    { name: "React / Next.js", level: 95 },
    { name: "JavaScript / TypeScript", level: 92 },
    { name: "Tailwind CSS", level: 97 },
    { name: "Framer Motion / GSAP", level: 88 },
  ],
  Design: [
    { name: "Figma", level: 96 },
    { name: "Adobe Illustrator", level: 85 },
    { name: "Photoshop", level: 82 },
    { name: "Brand Strategy", level: 90 },
  ],
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function useScrollSections(total) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef({ locked: false, accum: 0 });
  const containerRef = useRef(null);

  const goTo = useCallback((idx) => {
    if (idx < 0 || idx >= total) return;
    setCurrent(idx);
    setProgress(0);
    scrollRef.current.accum = 0;
  }, [total]);

  useEffect(() => {
    const THRESHOLD = 80;

    const onWheel = (e) => {
      e.preventDefault();
      if (scrollRef.current.locked) return;
      scrollRef.current.accum += e.deltaY;

      if (scrollRef.current.accum > THRESHOLD) {
        scrollRef.current.locked = true;
        setCurrent((c) => Math.min(c + 1, total - 1));
        scrollRef.current.accum = 0;
        setTimeout(() => { scrollRef.current.locked = false; }, 900);
      } else if (scrollRef.current.accum < -THRESHOLD) {
        scrollRef.current.locked = true;
        setCurrent((c) => Math.max(c - 1, 0));
        scrollRef.current.accum = 0;
        setTimeout(() => { scrollRef.current.locked = false; }, 900);
      }
    };

    // Touch
    let touchStartY = 0;
    const onTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd = (e) => {
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) {
        if (dy > 0) setCurrent((c) => Math.min(c + 1, total - 1));
        else setCurrent((c) => Math.max(c - 1, 0));
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [total]);

  // Key navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") setCurrent((c) => Math.min(c + 1, total - 1));
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") setCurrent((c) => Math.max(c - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  return { current, goTo, containerRef };
}

// animated counter
function Counter({ to, duration = 1.5 }) {
  const [val, setVal] = useState(0);
  const startRef = useRef(null);
  useEffect(() => {
    setVal(0);
    let raf;
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min((ts - startRef.current) / (duration * 1000), 1);
      setVal(Math.round(p * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); startRef.current = null; };
  }, [to, duration]);
  return <>{val}</>;
}

// ─── SECTION VARIANTS ────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir) => ({ opacity: 0, y: dir > 0 ? 60 : -60, scale: 0.97 }),
  center: { opacity: 1, y: 0, scale: 1 },
  exit: (dir) => ({ opacity: 0, y: dir > 0 ? -60 : 60, scale: 0.97 }),
};

// ─── BACKGROUND GRADIENTS PER SECTION ────────────────────────────────────────

const BG_GRADIENTS = [
  "radial-gradient(ellipse at 30% 60%, #9b5de530 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #f15bb520 0%, transparent 60%), #0a0a0f",
  "radial-gradient(ellipse at 70% 40%, #00bbf920 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #9b5de530 0%, transparent 60%), #07080f",
  "radial-gradient(ellipse at 50% 50%, #f15bb518 0%, transparent 60%), radial-gradient(ellipse at 10% 20%, #fee44020 0%, transparent 60%), #080a0f",
  "radial-gradient(ellipse at 40% 60%, #00f5d418 0%, transparent 60%), radial-gradient(ellipse at 90% 10%, #00bbf920 0%, transparent 60%), #06090f",
  "radial-gradient(ellipse at 60% 30%, #9b5de525 0%, transparent 60%), radial-gradient(ellipse at 30% 90%, #f15bb518 0%, transparent 60%), #080a0f",
  "radial-gradient(ellipse at 20% 50%, #fee44018 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, #9b5de520 0%, transparent 60%), #07080f",
  "radial-gradient(ellipse at 50% 40%, #f15bb525 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, #9b5de520 0%, transparent 60%), #09060f",
];

// ─── NOISE OVERLAY ────────────────────────────────────────────────────────────

function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px" }} />
  );
}

// ─── CURSOR ───────────────────────────────────────────────────────────────────

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 200, damping: 28 });
  const sy = useSpring(y, { stiffness: 200, damping: 28 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => { if (e.target.closest("a,button,[data-cursor]")) setHovered(true); };
    const out = () => setHovered(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); window.removeEventListener("mouseout", out); };
  }, []);

  return (
    <>
      <motion.div className="pointer-events-none fixed z-[9999] rounded-full mix-blend-difference"
        style={{ left: sx, top: sy, x: "-50%", y: "-50%", width: hovered ? 44 : 12, height: hovered ? 44 : 12, background: "white", transition: "width 0.25s, height 0.25s" }} />
      <motion.div className="pointer-events-none fixed z-[9998] rounded-full border border-white/30"
        style={{ left: sx, top: sy, x: "-50%", y: "-50%", width: hovered ? 60 : 36, height: hovered ? 60 : 36, transition: "width 0.35s, height 0.35s" }} />
    </>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

function Nav({ current, goTo }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
        <button onClick={() => goTo(0)} className="text-white/90 font-medium tracking-tight text-sm hover:text-white transition-colors">
          Kalani Voss
        </button>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          {SECTIONS.map((s, i) => (
            <button key={s} onClick={() => goTo(i)}
              className={`transition-colors hover:text-white ${current === i ? "text-white" : ""}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4 text-white/60">
          <a href="#" className="hover:text-white transition-colors"><FiGithub size={18} /></a>
          <a href="#" className="hover:text-white transition-colors"><FiLinkedin size={18} /></a>
          <a href="#" className="ml-2 px-4 py-1.5 rounded-full border border-white/20 text-xs text-white/80 hover:border-white/60 hover:text-white transition-all">
            Available for work
          </a>
        </div>
        <button className="md:hidden text-white/70 hover:text-white" onClick={() => setOpen(true)}><FiMenu size={22} /></button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
            <button className="absolute top-6 right-8 text-white/70" onClick={() => setOpen(false)}><FiX size={24} /></button>
            {SECTIONS.map((s, i) => (
              <button key={s} onClick={() => { goTo(i); setOpen(false); }}
                className="text-3xl font-light text-white/80 hover:text-white transition-colors">{s}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── PROGRESS DOTS ───────────────────────────────────────────────────────────

function ProgressDots({ current, goTo }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5">
      {SECTIONS.map((s, i) => (
        <button key={s} onClick={() => goTo(i)} title={s}
          className={`rounded-full transition-all duration-500 ${current === i ? "bg-white h-6 w-1.5" : "bg-white/30 h-1.5 w-1.5 hover:bg-white/60"}`} />
      ))}
    </div>
  );
}

// ─── SECTION: HERO ───────────────────────────────────────────────────────────

function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e) => setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 30, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const words = ["Front-End", "Developer", "&", "Brand", "Designer"];

  return (
    <div className="relative flex h-full w-full flex-col items-start justify-center px-10 md:px-20 lg:px-28">
      {/* Floating orbs */}
      <motion.div className="pointer-events-none absolute rounded-full blur-3xl opacity-25"
        animate={{ x: mouse.x * 1.5, y: mouse.y * 1.2 }}
        style={{ width: 500, height: 500, background: "radial-gradient(circle, #9b5de5, transparent)", top: "10%", right: "5%" }} />
      <motion.div className="pointer-events-none absolute rounded-full blur-3xl opacity-20"
        animate={{ x: -mouse.x, y: -mouse.y * 0.8 }}
        style={{ width: 350, height: 350, background: "radial-gradient(circle, #f15bb5, transparent)", bottom: "15%", left: "10%" }} />

      {/* Label */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="mb-8 flex items-center gap-3">
        <div className="h-px w-8 bg-white/40" />
        <span className="text-xs tracking-[0.25em] text-white/50 uppercase">Portfolio · 2026</span>
      </motion.div>

      {/* Main heading */}
      <h1 className="max-w-3xl leading-[1.05]">
        {words.map((w, i) => (
          <motion.span key={i} initial={{ opacity: 0, y: 60, rotateX: -30 }} animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 120, damping: 20 }}
            className={`inline-block mr-[0.25em] font-extralight tracking-tight text-white
              ${i === 0 ? "text-5xl md:text-7xl lg:text-8xl" : i === 1 ? "text-5xl md:text-7xl lg:text-8xl" : i === 2 ? "text-5xl md:text-7xl lg:text-8xl text-white/30" : "text-5xl md:text-7xl lg:text-8xl"}`}>
            {w}
          </motion.span>
        ))}
      </h1>

      {/* Subtitle */}
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
        className="mt-8 max-w-md text-base md:text-lg text-white/45 leading-relaxed font-light">
        Crafting digital experiences that sit at the intersection of engineering precision and brand storytelling.
      </motion.p>

      {/* CTA */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
        className="mt-10 flex items-center gap-6">
        <button className="group flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-6 py-3 text-sm text-white hover:bg-white/20 transition-all"
          data-cursor="true">
          View Work <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-4 decoration-white/20">
          Get in touch
        </button>
      </motion.div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-8 right-10 md:right-20 flex items-center gap-2 text-xs text-white/30 tracking-widest uppercase">
        Scroll to discover <FiArrowDown className="animate-bounce" />
      </motion.div>

      {/* Floating skill chips */}
      {["React", "Figma", "TypeScript", "GSAP", "Tailwind"].map((t, i) => (
        <motion.div key={t}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.25 + i * 0.04, scale: 1, y: [0, -8, 0] }}
          transition={{ delay: 1.2 + i * 0.15, y: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" } }}
          className="pointer-events-none absolute hidden lg:block text-xs text-white/60 border border-white/10 rounded-full px-3 py-1 bg-white/5 backdrop-blur-sm"
          style={{ top: `${18 + i * 12}%`, right: `${18 + (i % 2) * 8}%` }}>
          {t}
        </motion.div>
      ))}
    </div>
  );
}

// ─── SECTION: ABOUT ──────────────────────────────────────────────────────────

function AboutSection() {
  const stats = [{ val: 5, suffix: "+", label: "Years Experience" }, { val: 48, suffix: "", label: "Projects Shipped" }, { val: 18, suffix: "", label: "Happy Clients" }, { val: 99, suffix: "%", label: "Satisfaction Rate" }];
  return (
    <div className="flex h-full w-full flex-col justify-center px-10 md:px-20 lg:px-28">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-white/30" />
        <span className="text-xs tracking-[0.25em] text-white/40 uppercase">01 — About</span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h2 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, type: "spring" }}
            className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white leading-tight mb-6">
            Design that <br /><em className="not-italic text-white/40">thinks.</em> Code that <br /><em className="not-italic text-white/40">breathes.</em>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="text-white/50 leading-relaxed text-sm md:text-base max-w-sm">
            I'm Kalani — a front-end developer and brand designer based in Berlin. I believe every pixel has a purpose and every interaction tells a story. I bridge the gap between design systems and production-grade code.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="text-white/35 leading-relaxed text-sm md:text-base max-w-sm mt-4">
            Previously at Figma, currently freelance — open to exciting product roles and studio collaborations.
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.12, type: "spring" }}
              className="rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-6">
              <div className="text-4xl md:text-5xl font-extralight text-white mb-1">
                <Counter to={s.val} duration={1.2} />{s.suffix}
              </div>
              <div className="text-xs text-white/40 tracking-wide uppercase">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SECTION: SKILLS ─────────────────────────────────────────────────────────

function SkillsSection() {
  return (
    <div className="flex h-full w-full flex-col justify-center px-10 md:px-20 lg:px-28">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-white/30" />
        <span className="text-xs tracking-[0.25em] text-white/40 uppercase">02 — Skills</span>
      </motion.div>

      <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="text-4xl md:text-5xl font-extralight text-white mb-10">
        Craft & Tools
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl">
        {Object.entries(SKILLS).map(([cat, skills], ci) => (
          <div key={cat}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + ci * 0.1 }}
              className="text-xs tracking-[0.2em] text-white/35 uppercase mb-5">{cat}</motion.div>
            <div className="space-y-4">
              {skills.map((sk, i) => (
                <motion.div key={sk.name}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + ci * 0.1 + i * 0.08 }}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm text-white/70">{sk.name}</span>
                    <span className="text-xs text-white/30">{sk.level}%</span>
                  </div>
                  <div className="h-px bg-white/8 rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${sk.level}%` }}
                      transition={{ delay: 0.5 + ci * 0.1 + i * 0.1, duration: 1, ease: "easeOut" }}
                      style={{ background: ci === 0 ? "linear-gradient(90deg,#9b5de5,#f15bb5)" : "linear-gradient(90deg,#00bbf9,#00f5d4)" }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating tech chips */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3">
        {["React", "Next.js", "Tailwind", "TypeScript", "Framer", "Figma", "GSAP"].map((t, i) => (
          <motion.div key={t}
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.07, type: "spring" }}
            className="text-xs text-white/50 border border-white/10 rounded-full px-4 py-2 bg-white/4 backdrop-blur-sm text-center">
            {t}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── SECTION: PROJECTS ───────────────────────────────────────────────────────

function ProjectsSection() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const next = () => { setDir(1); setActive((a) => Math.min(a + 1, PROJECTS.length - 1)); };
  const prev = () => { setDir(-1); setActive((a) => Math.max(a - 1, 0)); };

  useEffect(() => {
    const onWheel = (e) => {
      e.stopPropagation();
    };
  }, []);

  const p = PROJECTS[active];

  return (
    <div className="flex h-full w-full flex-col justify-center px-10 md:px-20 lg:px-28">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-white/30" />
        <span className="text-xs tracking-[0.25em] text-white/40 uppercase">03 — Projects</span>
      </motion.div>

      <div className="relative flex flex-col lg:flex-row gap-10 items-start lg:items-center">
        {/* Project visual */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={p.id}
            custom={dir}
            variants={{ enter: (d) => ({ opacity: 0, x: d > 0 ? 80 : -80, scale: 0.92 }), center: { opacity: 1, x: 0, scale: 1 }, exit: (d) => ({ opacity: 0, x: d > 0 ? -80 : 80, scale: 0.92 }) }}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex-shrink-0 w-full lg:w-[420px] h-52 lg:h-72 rounded-2xl overflow-hidden border border-white/8"
            style={{ background: `linear-gradient(135deg, ${p.color}30, ${p.accent}20)` }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-8xl font-extralight text-white/8 select-none">{String(p.id).padStart(2, "0")}</div>
            </div>
            <div className="absolute bottom-4 left-5 text-xs text-white/40 tracking-widest uppercase">{p.tag}</div>
            <div className="absolute top-4 right-5 text-xs text-white/30">{p.year}</div>
            <motion.div className="absolute inset-0 rounded-2xl opacity-30"
              style={{ background: `radial-gradient(circle at 30% 70%, ${p.color}60, transparent 60%)` }} />
          </motion.div>
        </AnimatePresence>

        {/* Text */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={`txt-${p.id}`}
            custom={dir}
            variants={{ enter: (d) => ({ opacity: 0, y: d > 0 ? 30 : -30 }), center: { opacity: 1, y: 0 }, exit: (d) => ({ opacity: 0, y: d > 0 ? -30 : 30 }) }}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex-1 max-w-lg">
            <div className="text-5xl font-extralight text-white/8 mb-2">{String(p.id).padStart(2, "0")}</div>
            <h3 className="text-2xl md:text-3xl font-light text-white mb-4 leading-tight">{p.title}</h3>
            <p className="text-white/45 text-sm md:text-base leading-relaxed mb-6">{p.desc}</p>
            <button className="group flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors" data-cursor="true">
              View Case Study <FiExternalLink className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div className="mt-8 flex items-center gap-4">
        <button onClick={prev} disabled={active === 0}
          className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 disabled:opacity-20 transition-all">
          <FiArrowRight className="rotate-180" size={14} />
        </button>
        <div className="flex gap-2">
          {PROJECTS.map((_, i) => (
            <button key={i} onClick={() => { setDir(i > active ? 1 : -1); setActive(i); }}
              className={`rounded-full transition-all duration-300 ${active === i ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"}`} />
          ))}
        </div>
        <button onClick={next} disabled={active === PROJECTS.length - 1}
          className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 disabled:opacity-20 transition-all">
          <FiArrowRight size={14} />
        </button>
        <span className="ml-auto text-xs text-white/25">{active + 1} / {PROJECTS.length}</span>
      </div>
    </div>
  );
}

// ─── SECTION: SERVICES ───────────────────────────────────────────────────────

function ServicesSection() {
  return (
    <div className="flex h-full w-full flex-col justify-center px-10 md:px-20 lg:px-28">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-white/30" />
        <span className="text-xs tracking-[0.25em] text-white/40 uppercase">04 — Services</span>
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-extralight text-white mb-8">
        What I do
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
        {SERVICES.map((s, i) => (
          <motion.div key={s.title}
            initial={{ opacity: 0, y: 30, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.15)" }}
            className="group rounded-2xl border border-white/7 bg-white/3 backdrop-blur-sm p-6 cursor-default transition-colors">
            <div className="text-2xl mb-3">{s.icon}</div>
            <h3 className="text-sm font-medium text-white/85 mb-2">{s.title}</h3>
            <p className="text-xs text-white/40 leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── SECTION: TESTIMONIALS ───────────────────────────────────────────────────

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const t = TESTIMONIALS[active];

  const next = () => { setDir(1); setActive((a) => (a + 1) % TESTIMONIALS.length); };
  const prev = () => { setDir(-1); setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-10 md:px-20 lg:px-28 text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="mb-4 flex items-center justify-center gap-3">
        <div className="h-px w-8 bg-white/30" />
        <span className="text-xs tracking-[0.25em] text-white/40 uppercase">05 — Testimonials</span>
        <div className="h-px w-8 bg-white/30" />
      </motion.div>

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div key={active}
          custom={dir}
          variants={{ enter: (d) => ({ opacity: 0, y: d > 0 ? 50 : -50, scale: 0.95 }), center: { opacity: 1, y: 0, scale: 1 }, exit: (d) => ({ opacity: 0, y: d > 0 ? -50 : 50, scale: 0.95 }) }}
          initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl">
          <p className="text-xl md:text-2xl lg:text-3xl font-extralight text-white/80 leading-relaxed mb-8">
            "{t.quote}"
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-sm font-medium text-white/70">
              {t.avatar}
            </div>
            <div className="text-left">
              <div className="text-sm text-white/80 font-medium">{t.name}</div>
              <div className="text-xs text-white/35">{t.role}</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex items-center gap-5">
        <button onClick={prev} className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all">
          <FiArrowRight className="rotate-180" size={14} />
        </button>
        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => { setDir(i > active ? 1 : -1); setActive(i); }}
              className={`rounded-full transition-all duration-300 ${active === i ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/25"}`} />
          ))}
        </div>
        <button onClick={next} className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all">
          <FiArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── SECTION: CONTACT ────────────────────────────────────────────────────────

function ContactSection() {
  const [sent, setSent] = useState(false);
  return (
    <div className="flex h-full w-full flex-col justify-center px-10 md:px-20 lg:px-28">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-white/30" />
        <span className="text-xs tracking-[0.25em] text-white/40 uppercase">06 — Contact</span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <motion.h2 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, type: "spring" }}
            className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white leading-tight mb-4">
            Let's build something <span className="text-white/30">amazing.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-white/40 text-sm md:text-base leading-relaxed max-w-sm mb-8">
            Have a project in mind? I'd love to hear about it. Let's chat and see how we can work together.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"><FiMail size={16} /> hello@kalanivoss.com</a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-5 flex gap-5">
            <a href="#" className="text-white/35 hover:text-white transition-colors"><FiGithub size={20} /></a>
            <a href="#" className="text-white/35 hover:text-white transition-colors"><FiLinkedin size={20} /></a>
          </motion.div>
        </div>

        {/* Form */}
        <motion.form initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, type: "spring" }}
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="space-y-4 max-w-md">
          {!sent ? (
            <>
              {[{ id: "name", label: "Name", type: "text", placeholder: "Your full name" },
                { id: "email", label: "Email", type: "email", placeholder: "you@example.com" }].map((f) => (
                <div key={f.id}>
                  <label className="block text-xs text-white/35 uppercase tracking-wider mb-1.5">{f.label}</label>
                  <input type={f.type} required placeholder={f.placeholder}
                    className="w-full rounded-xl border border-white/8 bg-white/4 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-white/25 transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-xs text-white/35 uppercase tracking-wider mb-1.5">Message</label>
                <textarea required rows={4} placeholder="Tell me about your project..."
                  className="w-full rounded-xl border border-white/8 bg-white/4 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-white/25 transition-colors resize-none" />
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl bg-white text-black text-sm font-medium py-3.5 hover:bg-white/90 transition-colors" data-cursor="true">
                Send Message
              </motion.button>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
              <div className="text-4xl mb-4">✦</div>
              <div className="text-white text-lg font-light mb-2">Message sent!</div>
              <div className="text-white/40 text-sm">I'll get back to you within 24 hours.</div>
            </motion.div>
          )}
        </motion.form>
      </div>
    </div>
  );
}

// ─── SECTION MAP ─────────────────────────────────────────────────────────────

const SECTION_COMPONENTS = [HeroSection, AboutSection, SkillsSection, ProjectsSection, ServicesSection, TestimonialsSection, ContactSection];

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const { current, goTo } = useScrollSections(SECTIONS.length);
  const [prevSection, setPrevSection] = useState(0);
  const dir = current >= prevSection ? 1 : -1;

  useEffect(() => { setPrevSection(current); }, [current]);

  const CurrentSection = SECTION_COMPONENTS[current];
  const bg = BG_GRADIENTS[current];

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ width: "100vw", height: "100vh", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Animated background */}
      <motion.div className="absolute inset-0 -z-10"
        animate={{ background: bg }}
        transition={{ duration: 1.2, ease: "easeInOut" }} />

      <NoiseOverlay />
      <Cursor />
      <Nav current={current} goTo={goTo} />
      <ProgressDots current={current} goTo={goTo} />

      {/* Section Renderer */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div key={current}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center pt-16">
          <CurrentSection />
        </motion.div>
      </AnimatePresence>

      {/* Section label bottom left */}
      <motion.div key={`lbl-${current}`}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-7 left-10 hidden md:flex items-center gap-2 text-xs text-white/20 tracking-widest uppercase">
        <span className="tabular-nums">{String(current + 1).padStart(2, "0")}</span>
        <span>/</span>
        <span>{String(SECTIONS.length).padStart(2, "0")}</span>
        <span className="ml-2">{SECTIONS[current]}</span>
      </motion.div>
    </div>
  );
}