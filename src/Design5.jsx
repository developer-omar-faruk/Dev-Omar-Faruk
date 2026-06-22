import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  FiArrowRight, FiGithub, FiLinkedin, FiMail, FiPhone,
  FiCode, FiLayout, FiUser, FiMonitor, FiExternalLink,
  FiMapPin, FiTwitter, FiInstagram, FiChevronDown,
  FiStar, FiBriefcase, FiPenTool, FiShoppingCart,
  FiActivity, FiZap, FiAward, FiSend
} from "react-icons/fi";

// ─── DATA ────────────────────────────────────────────────────────────────────
const data = {
  name: "Alex Morgan",
  title: "Front-End Developer",
  subtitle: "& Brand Designer",
  bio: "I craft digital experiences that sit at the intersection of design and technology. With a passion for pixel-perfect execution and meaningful interactions, I turn ideas into elegant products that people love to use.",
  email: "hello@alexmorgan.design",
  phone: "+1 (555) 240-8801",
  location: "San Francisco, CA",
  stats: [
    { value: 25, suffix: "+", label: "Projects" },
    { value: 10, suffix: "+", label: "Clients" },
    { value: 2, suffix: "+", label: "Years Exp." },
    { value: 15, suffix: "+", label: "Technologies" },
  ],
  story: "Started as a graphic designer obsessed with brand storytelling, I discovered web development as the ultimate canvas — where design meets code to create living, breathing experiences. Today I blend both disciplines to build products that are as beautiful as they are functional.",
  philosophy: "I believe great design is invisible — it simply works. Every pixel, every transition, every interaction should feel intentional. Code is my brush; the browser is my canvas.",
  skills: {
    frontend: [
      { name: "React.js", level: 95 },
      { name: "JavaScript", level: 92 },
      { name: "HTML5 / CSS3", level: 98 },
      { name: "Tailwind CSS", level: 94 },
      { name: "Next.js", level: 88 },
      { name: "Framer Motion", level: 85 },
    ],
    design: [
      { name: "Figma", level: 96 },
      { name: "Adobe Illustrator", level: 90 },
      { name: "Adobe Photoshop", level: 87 },
      { name: "Branding", level: 93 },
      { name: "UI Design", level: 95 },
      { name: "UX Design", level: 88 },
    ],
  },
  projects: [
    {
      id: 1,
      title: "Modern Agency Website",
      description: "A high-performance agency site with scroll-driven animations, 3D elements, and editorial layout system built for maximum impact.",
      tags: ["React", "GSAP", "Tailwind", "Three.js"],
      color: "#F5F0EB",
      accent: "#1F2937",
      mockupBg: "#E8E2DA",
    },
    {
      id: 2,
      title: "AI SaaS Landing Page",
      description: "Conversion-focused landing page for an AI productivity platform, featuring interactive demos, pricing tables, and smooth micro-interactions.",
      tags: ["Next.js", "Framer Motion", "TypeScript"],
      color: "#EEF2F7",
      accent: "#1E40AF",
      mockupBg: "#DDE6F0",
    },
    {
      id: 3,
      title: "E-Commerce Platform",
      description: "Full-featured storefront with custom product configurator, real-time cart, seamless checkout flow, and editorial product photography layouts.",
      tags: ["React", "Node.js", "Stripe", "Tailwind"],
      color: "#F0F5F0",
      accent: "#166534",
      mockupBg: "#D9EAD9",
    },
    {
      id: 4,
      title: "Hospital Website",
      description: "Accessible, WCAG 2.1 compliant healthcare platform with appointment booking, doctor profiles, and patient portal integration.",
      tags: ["React", "Accessibility", "REST API"],
      color: "#F5F0F5",
      accent: "#7C3AED",
      mockupBg: "#E8D9EA",
    },
    {
      id: 5,
      title: "Gaming Website",
      description: "Immersive gaming community platform with real-time leaderboards, tournament brackets, and cinematic hero sections.",
      tags: ["Next.js", "WebGL", "Socket.io"],
      color: "#F5F2EE",
      accent: "#92400E",
      mockupBg: "#EAE0D5",
    },
    {
      id: 6,
      title: "Personal Portfolio",
      description: "Award-worthy portfolio showcasing creative direction, motion design, and brand identity work through an interactive presentation format.",
      tags: ["React", "GSAP", "Framer Motion"],
      color: "#F0F0F5",
      accent: "#1F2937",
      mockupBg: "#DCDCE8",
    },
  ],
  services: [
    {
      icon: FiMonitor,
      title: "Front-End Development",
      description: "Building fast, accessible, and scalable web applications with React, Next.js, and modern CSS — engineered for performance and delight.",
      features: ["React & Next.js", "Performance Optimization", "Responsive Design", "API Integration"],
    },
    {
      icon: FiLayout,
      title: "UI/UX Design",
      description: "Crafting intuitive user experiences through research-driven design, interactive prototypes, and meticulous attention to visual detail.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    },
    {
      icon: FiPenTool,
      title: "Brand Identity Design",
      description: "Creating memorable brand identities — from logo systems and typography to full visual identity guidelines that resonate and endure.",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Typography"],
    },
    {
      icon: FiZap,
      title: "Landing Page Design",
      description: "High-converting landing pages engineered for maximum impact — beautiful design meets proven conversion principles.",
      features: ["Conversion Design", "A/B Testing", "Motion Design", "Analytics"],
    },
    {
      icon: FiShoppingCart,
      title: "E-Commerce Development",
      description: "End-to-end e-commerce experiences — from product discovery to checkout — built to convert browsers into loyal customers.",
      features: ["Shopify / Custom", "Payment Integration", "Product UX", "Performance"],
    },
  ],
  testimonials: [
    {
      name: "Sarah Chen",
      company: "Luminary Studios",
      position: "Creative Director",
      review: "Alex delivered a website that completely transformed our brand's digital presence. The attention to detail, the animations, the overall polish — it felt like working with a world-class agency. Absolutely outstanding work.",
      rating: 5,
    },
    {
      name: "Marcus Reid",
      company: "Velocity AI",
      position: "Founder & CEO",
      review: "Our conversion rate doubled after the redesign. Alex doesn't just build beautiful websites — he builds websites that perform. The strategic thinking combined with exceptional design craft is rare.",
      rating: 5,
    },
    {
      name: "Priya Nair",
      company: "Bloom Health",
      position: "Product Lead",
      review: "Working with Alex was an absolute pleasure. He understood our complex requirements and translated them into an experience that our patients genuinely love using. On time, on budget, and above expectations.",
      rating: 5,
    },
    {
      name: "James Okafor",
      company: "Forge Digital",
      position: "Marketing Director",
      review: "The brand identity Alex created for us is exactly what we envisioned — but better. He pushed our thinking and delivered something truly unique. We've received so many compliments from clients.",
      rating: 5,
    },
  ],
  social: [
    { icon: FiGithub, href: "#", label: "GitHub" },
    { icon: FiLinkedin, href: "#", label: "LinkedIn" },
    { icon: FiTwitter, href: "#", label: "Twitter" },
    { icon: FiInstagram, href: "#", label: "Instagram" },
  ],
  nav: ["Home", "About", "Skills", "Projects", "Services", "Testimonials", "Contact"],
};

// ─── SLIDE INDICES ────────────────────────────────────────────────────────────
// 0=Hero,1=About,2=Skills,3-8=Projects(6),9=Services,10=Testimonials,11=Contact
const SECTION_SLIDES = { hero: 0, about: 1, skills: 2, projects: [3,4,5,6,7,8], services: 9, testimonials: 10, contact: 11 };
const TOTAL_SLIDES = 12;
const NAV_SECTIONS = [0, 1, 2, 3, 9, 11]; // indices mapped to nav links

// ─── UTILITIES ────────────────────────────────────────────────────────────────
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    const over = (e) => { if (e.target.closest("a,button,[data-cursor]")) setHovered(true); };
    const out = () => setHovered(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); window.removeEventListener("mouseout", out); };
  }, []);

  return (
    <>
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-gray-900/40 mix-blend-multiply"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%", width: hovered ? 44 : 28, height: hovered ? 44 : 28, transition: "width 0.2s, height 0.2s" }} />
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-gray-900"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%", width: 5, height: 5 }} />
    </>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function ProgressBar({ slide }) {
  const pct = ((slide + 1) / TOTAL_SLIDES) * 100;
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-gray-100">
      <motion.div className="h-full bg-gray-900" animate={{ width: `${pct}%` }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ currentSlide, goTo }) {
  const navItems = [
    { label: "Home", slide: 0 },
    { label: "About", slide: 1 },
    { label: "Skills", slide: 2 },
    { label: "Projects", slide: 3 },
    { label: "Services", slide: 9 },
    { label: "Contact", slide: 11 },
  ];
  const active = navItems.reduce((acc, item) => currentSlide >= item.slide ? item.label : acc, "Home");

  return (
    <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8, duration: 0.7, ease: [0.22,1,0.36,1] }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-16 h-16">
      <div className="backdrop-blur-md bg-white/70 border border-gray-200/60 rounded-full px-4 py-2">
        <span className="font-semibold text-gray-900 tracking-tight text-sm">AM<span className="text-gray-400">.</span></span>
      </div>
      <div className="backdrop-blur-md bg-white/70 border border-gray-200/60 rounded-full px-2 py-2 flex items-center gap-1">
        {navItems.map((item) => (
          <button key={item.label} onClick={() => goTo(item.slide)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${active === item.label ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="backdrop-blur-md bg-white/70 border border-gray-200/60 rounded-full px-4 py-2 flex gap-3">
        {data.social.slice(0,2).map(s => (
          <a key={s.label} href={s.href} className="text-gray-400 hover:text-gray-900 transition-colors"><s.icon size={14} /></a>
        ))}
      </div>
    </motion.nav>
  );
}

// ─── SLIDE DOT NAVIGATOR ──────────────────────────────────────────────────────
function SlideDots({ currentSlide, goTo }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
      {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
        <button key={i} onClick={() => goTo(i)}
          className={`rounded-full transition-all duration-300 ${currentSlide === i ? "w-2 h-5 bg-gray-900" : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-500"}`} />
      ))}
    </div>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSlide({ active }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imgX = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });
  const imgY = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 20;
      const dy = (e.clientY / window.innerHeight - 0.5) * 20;
      imgX.set(dx); imgY.set(dy);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const words = ["Front-End", "Developer", "&", "Brand", "Designer"];

  return (
    <div className="w-full h-full flex">
      {/* Left */}
      <div className="w-1/2 flex flex-col justify-center px-16 md:px-24 relative">
        {/* Subtle background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gray-100/60 blur-3xl" />
          <div className="absolute bottom-20 -left-20 w-64 h-64 rounded-full bg-gray-200/40 blur-2xl" />
        </div>

        <div className="relative z-10 space-y-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22,1,0.36,1] }}
            className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-500 font-medium tracking-wide">Available for work</span>
          </motion.div>

          <div className="space-y-2">
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={active ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.9, ease: [0.22,1,0.36,1] }}
              className="text-6xl md:text-7xl font-bold text-gray-900 leading-none tracking-tight">
              {data.name.split(" ")[0]}<br />
              <span className="text-gray-400">{data.name.split(" ")[1]}</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22,1,0.36,1] }}
              className="flex items-center gap-3 pt-2">
              <div className="h-px w-8 bg-gray-300" />
              <p className="text-gray-500 font-medium tracking-wide text-sm">{data.title} {data.subtitle}</p>
            </motion.div>
          </div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.65, duration: 0.8, ease: [0.22,1,0.36,1] }}
            className="text-gray-500 text-base leading-relaxed max-w-md">
            {data.bio.split(".")[0]}.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.22,1,0.36,1] }}
            className="flex items-center gap-4">
            <button className="group flex items-center gap-2.5 bg-gray-900 text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-gray-700 transition-all duration-300">
              View Projects
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={15} />
            </button>
            <button className="flex items-center gap-2.5 border border-gray-200 text-gray-700 px-7 py-3.5 rounded-full text-sm font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
              Contact Me
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex items-center gap-6 pt-2">
            {data.social.map(s => (
              <a key={s.label} href={s.href} className="text-gray-300 hover:text-gray-700 transition-colors">
                <s.icon size={17} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right */}
      <div className="w-1/2 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-gray-100 blur-3xl opacity-70" />
          <div className="absolute bottom-1/4 left-1/4 w-60 h-60 rounded-full bg-gray-200/50 blur-2xl" />
          {/* Geometric lines */}
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 500 500">
            <circle cx="250" cy="250" r="180" fill="none" stroke="#1F2937" strokeWidth="1" />
            <circle cx="250" cy="250" r="220" fill="none" stroke="#1F2937" strokeWidth="0.5" />
            <line x1="0" y1="250" x2="500" y2="250" stroke="#1F2937" strokeWidth="0.5" />
            <line x1="250" y1="0" x2="250" y2="500" stroke="#1F2937" strokeWidth="0.5" />
          </svg>
        </div>

        <motion.div style={{ x: imgX, y: imgY }} className="relative">
          {/* Rotating gradient ring */}
          <motion.div className="absolute inset-0 rounded-full" style={{ padding: 3 }}
            animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }}>
            <div className="w-full h-full rounded-full"
              style={{ background: "conic-gradient(from 0deg, #E5E7EB, #9CA3AF, #1F2937, #9CA3AF, #E5E7EB)", opacity: 0.6 }} />
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={active ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 1, ease: [0.22,1,0.36,1] }}
            className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
            {/* Placeholder avatar */}
            <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gray-300/60 mx-auto mb-3 flex items-center justify-center">
                  <FiUser size={36} className="text-gray-500" />
                </div>
                <div className="w-20 h-2 bg-gray-300/60 rounded-full mx-auto mb-1" />
                <div className="w-14 h-2 bg-gray-200/60 rounded-full mx-auto" />
              </div>
            </div>
          </motion.div>

          {/* Floating badges */}
          <motion.div className="absolute -bottom-4 -left-12 bg-white border border-gray-100 shadow-lg rounded-2xl px-4 py-3"
            animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                <FiCode size={13} className="text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-900">React Developer</div>
                <div className="text-[10px] text-gray-400">2+ Years</div>
              </div>
            </div>
          </motion.div>

          <motion.div className="absolute -top-4 -right-12 bg-white border border-gray-100 shadow-lg rounded-2xl px-4 py-3"
            animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                <FiAward size={13} className="text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-900">25+ Projects</div>
                <div className="text-[10px] text-gray-400">Delivered</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────
function AboutSlide({ active }) {
  const [counts, setCounts] = useState(data.stats.map(() => 0));

  useEffect(() => {
    if (!active) return;
    const timers = data.stats.map((stat, i) => {
      let start = 0;
      const step = stat.value / 40;
      const interval = setInterval(() => {
        start = Math.min(start + step, stat.value);
        setCounts(prev => { const next = [...prev]; next[i] = Math.round(start); return next; });
        if (start >= stat.value) clearInterval(interval);
      }, 40);
      return interval;
    });
    return () => timers.forEach(clearInterval);
  }, [active]);

  return (
    <div className="w-full h-full flex flex-col justify-center px-16 md:px-24 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gray-100/50 blur-3xl" />
        <motion.div className="absolute bottom-20 left-1/2 w-2 h-2 rounded-full bg-gray-300"
          animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 4 }} />
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-2 gap-20 items-center">
        {/* Left */}
        <div className="space-y-7">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="inline-flex items-center gap-2 text-xs text-gray-400 tracking-widest uppercase font-medium">
            <div className="w-8 h-px bg-gray-300" /> About Me
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22,1,0.36,1] }}
            className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            Designing with<br /><span className="text-gray-400">purpose.</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-gray-500 leading-relaxed text-base">{data.story}</motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-gray-400 italic leading-relaxed text-sm border-l-2 border-gray-200 pl-4">"{data.philosophy}"</motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[9px] text-gray-500 font-bold">
                  {["SC","MR","PN","JO"][i]}
                </div>
              ))}
            </div>
            <span className="text-xs text-gray-400">Trusted by 10+ clients worldwide</span>
          </motion.div>
        </div>

        {/* Right: stats */}
        <div className="grid grid-cols-2 gap-4">
          {data.stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: [0.22,1,0.36,1] }}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="text-4xl font-bold text-gray-900 tracking-tight mb-1">
                {counts[i]}<span className="text-gray-400">{stat.suffix}</span>
              </div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              <div className="mt-4 h-0.5 w-0 bg-gray-900 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0, y: 30 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="col-span-2 bg-gray-900 rounded-2xl p-6 text-white">
            <div className="flex items-start gap-3">
              <FiBriefcase size={18} className="mt-0.5 text-gray-400 flex-shrink-0" />
              <div>
                <div className="font-semibold text-sm mb-1">Currently</div>
                <div className="text-gray-400 text-xs leading-relaxed">Open to freelance projects and full-time remote opportunities in Front-End Development & Brand Design.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── SKILLS SECTION ───────────────────────────────────────────────────────────
function SkillsSlide({ active }) {
  return (
    <div className="w-full h-full flex flex-col justify-center px-16 md:px-24 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gray-100" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gray-100" />
      </div>

      <div className="max-w-5xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="flex items-center gap-2 text-xs text-gray-400 tracking-widest uppercase font-medium mb-4">
          <div className="w-8 h-px bg-gray-300" /> Skills & Expertise
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22,1,0.36,1] }}
          className="text-5xl font-bold text-gray-900 tracking-tight mb-10">
          What I do <span className="text-gray-400">best.</span>
        </motion.h2>

        <div className="grid grid-cols-2 gap-10">
          {/* Frontend */}
          <div>
            <motion.div initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mb-5">
              <FiCode size={14} className="text-gray-500" />
              <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">Front-End Development</span>
            </motion.div>
            <div className="space-y-4">
              {data.skills.frontend.map((skill, i) => (
                <motion.div key={skill.name} initial={{ opacity: 0, x: -20 }} animate={active ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.07, duration: 0.6, ease: [0.22,1,0.36,1] }}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm text-gray-700 font-medium">{skill.name}</span>
                    <span className="text-xs text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gray-900 rounded-full"
                      initial={{ width: 0 }} animate={active ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ delay: 0.5 + i * 0.07, duration: 0.9, ease: [0.22,1,0.36,1] }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Design */}
          <div>
            <motion.div initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mb-5">
              <FiPenTool size={14} className="text-gray-500" />
              <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">Design & Branding</span>
            </motion.div>
            <div className="space-y-4">
              {data.skills.design.map((skill, i) => (
                <motion.div key={skill.name} initial={{ opacity: 0, x: 20 }} animate={active ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.07, duration: 0.6, ease: [0.22,1,0.36,1] }}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm text-gray-700 font-medium">{skill.name}</span>
                    <span className="text-xs text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gray-700 rounded-full"
                      initial={{ width: 0 }} animate={active ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ delay: 0.5 + i * 0.07, duration: 0.9, ease: [0.22,1,0.36,1] }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROJECT SLIDE ────────────────────────────────────────────────────────────
function ProjectSlide({ project, index, active }) {
  const total = data.projects.length;

  return (
    <div className="w-full h-full flex relative">
      {/* Project counter */}
      <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3"
        initial={{ opacity: 0, y: -10 }} animate={active ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
        <span className="text-xs text-gray-400 tracking-widest uppercase font-medium">Project</span>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className={`rounded-full transition-all duration-300 ${i === index ? "w-5 h-1.5 bg-gray-900" : "w-1.5 h-1.5 bg-gray-200"}`} />
          ))}
        </div>
        <span className="text-xs text-gray-400 font-mono">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
      </motion.div>

      {/* Left: mockup */}
      <div className="w-1/2 flex items-center justify-center pl-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: project.color }} />

        <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={active ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.22,1,0.36,1] }}
          className="relative w-[88%] max-w-lg">
          {/* Browser chrome */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200/60">
            <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 border-b border-gray-100">
              <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
              <div className="flex-1 mx-3 bg-gray-100 rounded-full h-5 flex items-center px-3">
                <span className="text-[10px] text-gray-400">alexmorgan.design/{project.title.toLowerCase().replace(/ /g, "-")}</span>
              </div>
            </div>
            <div className="relative" style={{ height: 260, backgroundColor: project.mockupBg }}>
              <div className="p-6 space-y-3">
                <div className="h-8 rounded-lg w-2/3" style={{ backgroundColor: `${project.accent}22` }} />
                <div className="h-3 rounded-full w-full bg-white/50" />
                <div className="h-3 rounded-full w-4/5 bg-white/50" />
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 rounded-lg bg-white/60" />
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="h-7 rounded-full w-24 flex items-center justify-center text-[10px] font-semibold text-white"
                    style={{ backgroundColor: project.accent }}>Get Started</div>
                  <div className="h-7 rounded-full w-20 bg-white/70" />
                </div>
              </div>
            </div>
          </div>

          <motion.div className="absolute -bottom-4 left-4 flex gap-2"
            initial={{ opacity: 0, y: 10 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}>
            {project.tags.slice(0, 2).map(tag => (
              <span key={tag} className="bg-white border border-gray-100 shadow-sm text-gray-600 text-[10px] font-medium px-3 py-1.5 rounded-full">{tag}</span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Right: info */}
      <div className="w-1/2 flex flex-col justify-center px-12 md:px-20">
        <div className="space-y-6 max-w-md">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="inline-flex items-center gap-2 text-xs text-gray-400 tracking-widest uppercase font-medium">
            <div className="w-6 h-px bg-gray-300" /> Featured Work
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.22,1,0.36,1] }}
            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            {project.title}
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-gray-500 leading-relaxed text-sm">{project.description}</motion.p>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="border border-gray-200 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex items-center gap-3 pt-2">
            <button className="group flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full text-xs font-medium hover:bg-gray-700 transition-all duration-300">
              <FiExternalLink size={12} />
              Live Demo
            </button>
            <button className="group flex items-center gap-2 border border-gray-200 text-gray-600 px-6 py-3 rounded-full text-xs font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
              <FiGithub size={12} />
              GitHub
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── SERVICES SECTION ─────────────────────────────────────────────────────────
function ServicesSlide({ active }) {
  const [activeService, setActiveService] = useState(0);

  useEffect(() => { if (active) setActiveService(0); }, [active]);

  const svc = data.services[activeService];

  return (
    <div className="w-full h-full flex flex-col justify-center px-16 md:px-24 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gray-50 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="flex items-center gap-2 text-xs text-gray-400 tracking-widest uppercase font-medium mb-8">
          <div className="w-8 h-px bg-gray-300" /> Services
        </motion.div>

        <div className="grid grid-cols-5 gap-3 mb-10">
          {data.services.map((s, i) => (
            <motion.button key={s.title} onClick={() => setActiveService(i)}
              initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.6 }}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-300 text-center
                ${activeService === i ? "border-gray-900 bg-gray-900 text-white shadow-lg scale-105" : "border-gray-100 bg-white text-gray-500 hover:border-gray-300"}`}>
              <s.icon size={16} />
              <span className="text-[10px] font-medium leading-tight">{s.title.split(" ").slice(0,2).join(" ")}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeService} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
            className="grid grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center">
                <svc.icon size={22} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight">{svc.title}</h2>
              <p className="text-gray-500 leading-relaxed text-sm">{svc.description}</p>
              <button className="group flex items-center gap-2 border border-gray-200 text-gray-700 px-6 py-3 rounded-full text-sm font-medium hover:border-gray-900 hover:bg-gray-50 transition-all duration-300">
                Learn more <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="text-xs text-gray-400 tracking-widest uppercase font-medium mb-4">What's included</div>
              {svc.features.map((feature, i) => (
                <motion.div key={feature} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex items-center gap-3 border border-gray-100 bg-white rounded-xl px-5 py-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                  <span className="text-sm text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── TESTIMONIALS SECTION ────────────────────────────────────────────────────
function TestimonialsSlide({ active }) {
  const [current, setCurrent] = useState(0);
  const total = data.testimonials.length;

  const next = () => setCurrent(c => (c + 1) % total);
  const prev = () => setCurrent(c => (c - 1 + total) % total);

  useEffect(() => {
    if (!active) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [active]);

  const t = data.testimonials[current];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-16 md:px-24 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-gray-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-gray-100" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 text-xs text-gray-400 tracking-widest uppercase font-medium mb-10">
        <div className="w-8 h-px bg-gray-300" /> Testimonials
      </motion.div>

      <div className="max-w-2xl text-center">
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }} transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
            className="space-y-7">
            <div className="flex justify-center gap-1">
              {[...Array(t.rating)].map((_, i) => (
                <FiStar key={i} size={14} className="text-amber-400 fill-amber-400" />
              ))}
            </div>

            <blockquote className="text-2xl md:text-3xl font-light text-gray-800 leading-relaxed tracking-tight">
              "{t.review}"
            </blockquote>

            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 font-bold text-sm">
                {t.name.split(" ").map(n=>n[0]).join("")}
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                <div className="text-gray-400 text-xs">{t.position}, {t.company}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4 mt-10">
        <button onClick={prev} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-400 transition-all">
          <FiArrowRight size={13} className="rotate-180" />
        </button>
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-1.5 bg-gray-900" : "w-1.5 h-1.5 bg-gray-200"}`} />
          ))}
        </div>
        <button onClick={next} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-400 transition-all">
          <FiArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────
function ContactSlide({ active }) {
  const [form, setForm] = useState({ name: "", email: "", type: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => { e.preventDefault(); setSent(true); };

  return (
    <div className="w-full h-full flex relative overflow-hidden">
      {/* Left */}
      <div className="w-5/12 flex flex-col justify-center px-14 relative">
        <div className="absolute inset-0 bg-gray-900" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute bottom-20 -left-10 w-48 h-48 rounded-full bg-white/3 blur-xl" />
        </div>

        <div className="relative z-10 space-y-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="flex items-center gap-2 text-xs text-gray-400 tracking-widest uppercase font-medium">
            <div className="w-6 h-px bg-gray-600" /> Get in touch
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22,1,0.36,1] }}
            className="text-4xl font-bold text-white leading-tight tracking-tight">
            Let's Build<br />Something<br /><span className="text-gray-400">Amazing.</span>
          </motion.h2>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="space-y-4">
            {[
              { icon: FiMail, label: data.email },
              { icon: FiPhone, label: data.phone },
              { icon: FiMapPin, label: data.location },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center">
                  <item.icon size={13} className="text-gray-400" />
                </div>
                <span className="text-gray-300 text-sm">{item.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex gap-3">
            {data.social.map(s => (
              <a key={s.label} href={s.href}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all">
                <s.icon size={14} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right: form */}
      <div className="w-7/12 flex flex-col justify-center px-10 md:px-16 bg-white">
        <motion.div initial={{ opacity: 0, x: 30 }} animate={active ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22,1,0.36,1] }}
          className="max-w-lg w-full mx-auto">

          {sent ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto">
                <FiSend size={22} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Message Sent!</h3>
              <p className="text-gray-500 text-sm">I'll get back to you within 24 hours.</p>
              <button onClick={() => setSent(false)} className="text-xs text-gray-400 underline underline-offset-2">Send another</button>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Start a project</h3>
                <p className="text-gray-400 text-sm mt-1">Fill in the form and I'll be in touch.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "name", placeholder: "Your name", type: "text" },
                  { name: "email", placeholder: "Email address", type: "email" },
                ].map(f => (
                  <input key={f.name} name={f.name} type={f.type} placeholder={f.placeholder} value={form[f.name]} onChange={handle} required
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-gray-400 bg-gray-50 transition-colors" />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <select name="type" value={form.type} onChange={handle} required
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-gray-400 bg-gray-50 transition-colors">
                  <option value="">Project type</option>
                  <option>Website Design</option>
                  <option>Brand Identity</option>
                  <option>E-Commerce</option>
                  <option>Landing Page</option>
                </select>
                <select name="budget" value={form.budget} onChange={handle} required
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-gray-400 bg-gray-50 transition-colors">
                  <option value="">Budget range</option>
                  <option>$1k – $3k</option>
                  <option>$3k – $7k</option>
                  <option>$7k – $15k</option>
                  <option>$15k+</option>
                </select>
              </div>

              <textarea name="message" placeholder="Tell me about your project..." value={form.message} onChange={handle} required rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-gray-400 bg-gray-50 transition-colors resize-none" />

              <button type="submit"
                className="group w-full flex items-center justify-center gap-2.5 bg-gray-900 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-gray-700 transition-all duration-300">
                Send Message
                <FiSend size={13} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [slide, setSlide] = useState(0);
  const locked = useRef(false);
  const COOLDOWN = 1300;

  const goTo = useCallback((target) => {
    const t = clamp(target, 0, TOTAL_SLIDES - 1);
    if (t === slide || locked.current) return;
    locked.current = true;
    setSlide(t);
    setTimeout(() => { locked.current = false; }, COOLDOWN);
  }, [slide]);

  const next = useCallback(() => goTo(slide + 1), [goTo, slide]);
  const prev = useCallback(() => goTo(slide - 1), [goTo, slide]);

  // Wheel
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      if (locked.current) return;
      const delta = e.deltaY;
      if (Math.abs(delta) < 5) return;
      if (delta > 0) next(); else prev();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev]);

  // Touch
  useEffect(() => {
    let startY = 0;
    const onTouchStart = (e) => { startY = e.touches[0].clientY; };
    const onTouchEnd = (e) => {
      if (locked.current) return;
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return;
      if (dy > 0) next(); else prev();
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => { window.removeEventListener("touchstart", onTouchStart); window.removeEventListener("touchend", onTouchEnd); };
  }, [next, prev]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (locked.current) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next();
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Build slide components array
  const slides = [
    <HeroSlide active={slide === 0} />,
    <AboutSlide active={slide === 1} />,
    <SkillsSlide active={slide === 2} />,
    ...data.projects.map((p, i) => <ProjectSlide key={p.id} project={p} index={i} active={slide === 3 + i} />),
    <ServicesSlide active={slide === 9} />,
    <TestimonialsSlide active={slide === 10} />,
    <ContactSlide active={slide === 11} />,
  ];

  const sectionLabels = ["Hero","About","Skills",...data.projects.map((_,i)=>`Project ${i+1}`),"Services","Testimonials","Contact"];

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#FAFAFA] relative" style={{ cursor: "none", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <CustomCursor />
      <ProgressBar slide={slide} />
      <Navbar currentSlide={slide} goTo={goTo} />
      <SlideDots currentSlide={slide} goTo={goTo} />

      {/* Slide counter bottom-left */}
      <div className="fixed bottom-6 left-8 z-40 flex items-center gap-3">
        <span className="text-[11px] text-gray-400 font-mono tabular-nums">{String(slide + 1).padStart(2,"0")}</span>
        <div className="w-16 h-px bg-gray-200">
          <motion.div className="h-full bg-gray-500" animate={{ width: `${((slide + 1) / TOTAL_SLIDES) * 100}%` }} transition={{ duration: 0.6 }} />
        </div>
        <span className="text-[11px] text-gray-300 font-mono tabular-nums">{String(TOTAL_SLIDES).padStart(2,"0")}</span>
      </div>

      {/* Scroll hint bottom-center */}
      <AnimatePresence>
        {slide < TOTAL_SLIDES - 1 && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5">
            <span className="text-[10px] text-gray-300 tracking-widest uppercase font-medium">Scroll</span>
            <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
              <FiChevronDown size={12} className="text-gray-300" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section label bottom-right */}
      <AnimatePresence mode="wait">
        <motion.div key={slide} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="fixed bottom-6 right-16 z-40">
          <span className="text-[10px] text-gray-300 tracking-widest uppercase font-medium">{sectionLabels[slide]}</span>
        </motion.div>
      </AnimatePresence>

      {/* Slides */}
      <div className="w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div key={slide}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.98 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full">
            {slides[slide]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}