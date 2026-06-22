import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight, FiGithub, FiLinkedin, FiMail, FiPhone,
  FiCode, FiMonitor, FiLayout, FiUser, FiMapPin,
  FiExternalLink, FiTwitter, FiInstagram, FiStar,
  FiChevronDown, FiSend, FiCheck, FiBriefcase,
  FiPackage, FiLayers, FiZap, FiAward, FiPenTool,
  FiGrid, FiMenu, FiX
} from "react-icons/fi";

// ─────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────
const data = {
  personal: {
    name: "Alex Mercer",
    title1: "Front-End Web Developer",
    title2: "Brand Designer",
    tagline: "Creating modern digital experiences through design, animation, and clean code.",
    email: "alex@mercer.studio",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA",
    bio: "I'm a Front-End Developer and Brand Designer with a passion for crafting pixel-perfect, performant digital experiences. My work lives at the intersection of clean code and thoughtful design.",
    story: "With 2+ years of experience building products for startups and established brands, I've developed a deep understanding of what makes a digital product not just functional, but truly memorable. Every project is an opportunity to push the boundaries of what's possible.",
    philosophy: "I believe great design is invisible — it guides users effortlessly, communicates clearly, and leaves a lasting impression without demanding attention.",
  },
  stats: [
    { value: 25, suffix: "+", label: "Projects Completed" },
    { value: 10, suffix: "+", label: "Happy Clients" },
    { value: 2, suffix: "+", label: "Years Experience" },
    { value: 15, suffix: "+", label: "Technologies" },
  ],
  nav: ["Home", "About", "Skills", "Projects", "Services", "Contact"],
  skills: {
    frontend: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 92 },
      { name: "JavaScript", level: 88 },
      { name: "React.js", level: 90 },
      { name: "Tailwind CSS", level: 93 },
      { name: "Framer Motion", level: 82 },
      { name: "Next.js", level: 85 },
    ],
    design: [
      { name: "Figma", level: 91 },
      { name: "Illustrator", level: 84 },
      { name: "Photoshop", level: 80 },
      { name: "Branding", level: 88 },
      { name: "UI Design", level: 90 },
      { name: "UX Design", level: 85 },
    ],
  },
  projects: [
    {
      id: "01",
      title: "Modern Agency Website",
      category: "Web Development",
      description: "A high-impact agency website featuring immersive scroll animations, 3D elements, and a bespoke CMS integration that drives a 40% increase in lead generation.",
      tech: ["React", "GSAP", "Three.js", "Tailwind", "Sanity CMS"],
      color: "#F0EEF8",
      accent: "#6366F1",
      demo: "#",
      github: "#",
    },
    {
      id: "02",
      title: "AI SaaS Landing Page",
      category: "UI Design & Dev",
      description: "A conversion-optimized landing page for an AI writing tool. Crafted with micro-interactions and a clean typographic system that communicates complexity simply.",
      tech: ["Next.js", "Framer Motion", "TypeScript", "Tailwind", "Vercel"],
      color: "#EEF4F8",
      accent: "#0EA5E9",
      demo: "#",
      github: "#",
    },
    {
      id: "03",
      title: "E-Commerce Platform",
      category: "Full-Stack & Brand",
      description: "A premium e-commerce experience for a luxury fashion brand. Custom product configurator, seamless checkout flow, and a robust admin dashboard.",
      tech: ["React", "Node.js", "Stripe", "MongoDB", "Tailwind"],
      color: "#F8F0EE",
      accent: "#F97316",
      demo: "#",
      github: "#",
    },
    {
      id: "04",
      title: "Hospital Website",
      category: "Healthcare & UX",
      description: "A patient-centric hospital portal redesign focused on accessibility, information clarity, and trust. Achieved a 60% reduction in appointment booking friction.",
      tech: ["React", "TypeScript", "WCAG 2.1", "Tailwind", "React Query"],
      color: "#EEF8F3",
      accent: "#10B981",
      demo: "#",
      github: "#",
    },
    {
      id: "05",
      title: "Gaming Website",
      category: "Interactive Design",
      description: "An immersive gaming hub with real-time leaderboards, animated character showcases, and a game library powered by a custom API integration.",
      tech: ["React", "WebGL", "GSAP", "Socket.io", "Node.js"],
      color: "#F5EEF8",
      accent: "#A855F7",
      demo: "#",
      github: "#",
    },
    {
      id: "06",
      title: "Personal Portfolio",
      category: "Brand & Design",
      description: "A showcase portfolio crafted as a cinematic, fullscreen presentation. Every transition is intentional, every detail considered. The work speaks for itself.",
      tech: ["React", "Framer Motion", "GSAP", "Tailwind", "Lenis"],
      color: "#F8F5EE",
      accent: "#EAB308",
      demo: "#",
      github: "#",
    },
  ],
  services: [
    {
      icon: FiCode,
      title: "Front-End Development",
      subtitle: "01",
      description: "Building fast, accessible, and visually stunning web interfaces using modern frameworks and best practices. From concept to pixel-perfect implementation.",
      features: ["React / Next.js", "Performance Optimization", "Responsive Design", "API Integration"],
    },
    {
      icon: FiLayout,
      title: "UI/UX Design",
      subtitle: "02",
      description: "Designing intuitive, elegant user experiences that convert visitors into customers. Every interaction is crafted with purpose, clarity, and delight.",
      features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
    },
    {
      icon: FiPenTool,
      title: "Brand Identity Design",
      subtitle: "03",
      description: "Crafting distinctive brand identities that communicate your values and resonate with your audience. Logos, systems, and guidelines that scale.",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
    },
    {
      icon: FiMonitor,
      title: "Landing Page Design",
      subtitle: "04",
      description: "High-converting landing pages engineered for performance. Combining persuasive copywriting frameworks with stunning visual design.",
      features: ["Conversion Optimization", "A/B Testing Ready", "Analytics Setup", "Copy Consulting"],
    },
    {
      icon: FiPackage,
      title: "E-Commerce Development",
      subtitle: "05",
      description: "End-to-end e-commerce solutions from storefront design to payment integration. Built to scale, optimized to sell.",
      features: ["Custom Storefronts", "Payment Integration", "Inventory System", "Performance Tuning"],
    },
  ],
  testimonials: [
    {
      name: "Sarah Chen",
      company: "Luminary Studio",
      position: "Creative Director",
      review: "Alex completely transformed our digital presence. The attention to detail, the animations, the overall polish — it's unlike anything I've seen from a freelancer. Our client acquisition doubled after launch.",
      rating: 5,
      initials: "SC",
      color: "#6366F1",
    },
    {
      name: "Marcus Williams",
      company: "Apex Ventures",
      position: "Founder & CEO",
      review: "Working with Alex was an absolute pleasure. He understood our brand vision immediately and delivered a website that exceeded every expectation. The conversion rate increase speaks for itself.",
      rating: 5,
      initials: "MW",
      color: "#0EA5E9",
    },
    {
      name: "Priya Sharma",
      company: "HealthTech Co.",
      position: "Head of Product",
      review: "The hospital portal Alex redesigned is now the gold standard in our organization. Patients love it, staff love it. He has a rare ability to balance aesthetics with deep functional thinking.",
      rating: 5,
      initials: "PS",
      color: "#10B981",
    },
    {
      name: "Jordan Lee",
      company: "NovaBrands",
      position: "Marketing Lead",
      review: "Our brand identity package was delivered ahead of schedule and far beyond scope. Alex brings a strategic perspective to design work that most designers simply don't have. Highly recommend.",
      rating: 5,
      initials: "JL",
      color: "#F97316",
    },
  ],
  socials: [
    { icon: FiGithub, label: "GitHub", url: "#" },
    { icon: FiLinkedin, label: "LinkedIn", url: "#" },
    { icon: FiTwitter, label: "Twitter", url: "#" },
    { icon: FiInstagram, label: "Instagram", url: "#" },
  ],
};

// ─────────────────────────────────────────
//  SECTION INDEX MAP
// ─────────────────────────────────────────
const SECTIONS = ["Home", "About", "Skills", "Projects", "Services", "Testimonials", "Contact"];

// ─────────────────────────────────────────
//  UTILS
// ─────────────────────────────────────────
function useCountUp(target, active) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1500;
    const step = (target / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);
  return count;
}

// ─────────────────────────────────────────
//  CUSTOM CURSOR
// ─────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    const loop = () => {
      dotPos.current.x += (pos.current.x - dotPos.current.x) * 0.12;
      dotPos.current.y += (pos.current.y - dotPos.current.y) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 20}px, ${dotPos.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-gray-900 rounded-full pointer-events-none z-[9999] mix-blend-difference" style={{ willChange: "transform" }} />
      <div ref={dotRef} className="fixed top-0 left-0 w-10 h-10 border border-gray-400 rounded-full pointer-events-none z-[9998] opacity-50" style={{ willChange: "transform", transition: "opacity 0.2s" }} />
    </>
  );
}

// ─────────────────────────────────────────
//  SCROLL PROGRESS
// ─────────────────────────────────────────
function ScrollProgress({ current, total }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`rounded-full transition-all duration-500 ${i === current ? "w-1.5 h-6 bg-gray-900" : "w-1 h-2 bg-gray-300"}`} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
//  NAVBAR
// ─────────────────────────────────────────
function Navbar({ current, onNav, total }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ["Home", "About", "Skills", "Projects", "Services", "Contact"];
  const navMap = { Home: 0, About: 1, Skills: 2, Projects: 3, Services: 4, Contact: 6 };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between"
      style={{ backdropFilter: "blur(20px)", background: "rgba(255,255,255,0.85)", borderBottom: "1px solid rgba(229,231,235,0.6)" }}>
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
        className="text-base font-semibold tracking-tight text-gray-900 cursor-pointer select-none"
        onClick={() => onNav(0)}>
        Alex Mercer
      </motion.div>

      {/* Desktop Nav */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
        className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <button key={item}
            onClick={() => onNav(navMap[item])}
            className={`text-sm font-medium transition-all duration-300 relative group ${navMap[item] === current ? "text-gray-900" : "text-gray-500 hover:text-gray-900"}`}>
            {item}
            <span className={`absolute -bottom-0.5 left-0 h-px bg-gray-900 transition-all duration-300 ${navMap[item] === current ? "w-full" : "w-0 group-hover:w-full"}`} />
          </button>
        ))}
      </motion.div>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 py-4 flex flex-col items-center gap-4 md:hidden">
            {navItems.map((item) => (
              <button key={item} onClick={() => { onNav(navMap[item]); setMenuOpen(false); }}
                className={`text-sm font-medium ${navMap[item] === current ? "text-gray-900" : "text-gray-500"}`}>
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─────────────────────────────────────────
//  FLOATING GRADIENT BG
// ─────────────────────────────────────────
function MeshGradient({ color = "#6366F1" }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 rounded-full opacity-10 blur-3xl"
        style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }} />
      <div className="absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 rounded-full opacity-8 blur-3xl"
        style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }} />
    </div>
  );
}

// ─────────────────────────────────────────
//  SECTION 01 — HERO
// ─────────────────────────────────────────
function HeroSection({ onNav }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handle = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const floatVariants = {
    animate: {
      y: [0, -18, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const textReveal = {
    hidden: { y: 60, opacity: 0 },
    visible: (i) => ({ y: 0, opacity: 1, transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } }),
  };

  return (
    <div ref={containerRef} className="w-full h-full flex items-center relative overflow-hidden bg-white">
      <MeshGradient color="#6366F1" />

      {/* Floating decorative shapes */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-[42%] w-2 h-2 bg-indigo-200 rounded-full opacity-60" />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-32 left-1/4 w-3 h-3 border border-gray-300 rounded-full opacity-40" />
      <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-[8%] w-1 h-16 bg-gradient-to-b from-gray-200 to-transparent opacity-50" />

      <div className="w-full h-full flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 pt-20">
        {/* LEFT */}
        <div className="flex-1 flex flex-col justify-center max-w-xl">
          <motion.div custom={0} variants={textReveal} initial="hidden" animate="visible"
            className="text-xs font-semibold tracking-[0.25em] text-indigo-500 uppercase mb-4">
            Available for Freelance
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1 custom={1} variants={textReveal} initial="hidden" animate="visible"
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-none">
              Alex Mercer
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-1">
            <motion.p custom={2} variants={textReveal} initial="hidden" animate="visible"
              className="text-xl md:text-2xl font-light text-gray-600 tracking-wide">
              Front-End Web Developer
            </motion.p>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.p custom={3} variants={textReveal} initial="hidden" animate="visible"
              className="text-xl md:text-2xl font-light text-indigo-400 tracking-wide">
              & Brand Designer
            </motion.p>
          </div>

          <motion.p custom={4} variants={textReveal} initial="hidden" animate="visible"
            className="text-base text-gray-500 leading-relaxed mb-10 max-w-md">
            Creating modern digital experiences through design, animation, and clean code.
          </motion.p>

          <motion.div custom={5} variants={textReveal} initial="hidden" animate="visible"
            className="flex flex-wrap gap-4">
            <button onClick={() => onNav(3)}
              className="group flex items-center gap-2 px-6 py-3.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-indigo-600 transition-all duration-300 shadow-lg shadow-gray-900/20">
              View Projects
              <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button onClick={() => onNav(6)}
              className="flex items-center gap-2 px-6 py-3.5 bg-white text-gray-900 text-sm font-medium rounded-full border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all duration-300">
              Contact Me
            </button>
          </motion.div>
        </div>

        {/* RIGHT — Profile */}
        <div className="flex-1 flex items-center justify-center mt-12 md:mt-0 relative">
          <motion.div
            animate={{ x: mousePos.x * 12, y: mousePos.y * 12 }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="relative">
            <motion.div variants={floatVariants} animate="animate" className="relative">
              {/* Rotating gradient ring */}
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full"
                style={{ background: "conic-gradient(from 0deg, #6366F1, #A855F7, #EC4899, #6366F1)", padding: "3px" }}>
                <div className="w-full h-full rounded-full bg-white" />
              </motion.div>

              {/* Profile circle */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-gray-900/20"
                style={{ background: "linear-gradient(135deg, #F5F3FF 0%, #EEF2FF 50%, #F0F9FF 100%)" }}>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 opacity-40">
                    <FiUser size={80} className="text-indigo-400" />
                    <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">Profile Photo</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3"
                  style={{ background: "linear-gradient(to top, rgba(99,102,241,0.15), transparent)" }} />
              </div>
            </motion.div>

            {/* Floating badge 1 */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -left-8 top-1/4 bg-white rounded-2xl px-4 py-3 shadow-xl border border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center">
                <FiCode size={14} className="text-indigo-600" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-900">Clean Code</div>
                <div className="text-xs text-gray-400">React & Next.js</div>
              </div>
            </motion.div>

            {/* Floating badge 2 */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -right-8 bottom-1/4 bg-white rounded-2xl px-4 py-3 shadow-xl border border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center">
                <FiPenTool size={14} className="text-purple-600" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-900">Brand Design</div>
                <div className="text-xs text-gray-400">Figma & AI</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
        <span className="text-xs tracking-widest uppercase">Scroll to discover</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <FiChevronDown size={16} />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────
//  SECTION 02 — ABOUT
// ─────────────────────────────────────────
function StatCard({ value, suffix, label, active, delay }) {
  const count = useCountUp(value, active);
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      <div className="text-4xl font-bold text-gray-900 tracking-tight">
        {count}<span className="text-indigo-500">{suffix}</span>
      </div>
      <div className="text-sm text-gray-500 mt-1 font-medium">{label}</div>
    </motion.div>
  );
}

function AboutSection({ active }) {
  return (
    <div className="w-full h-full flex items-center relative overflow-hidden" style={{ background: "#FAFAFA" }}>
      <MeshGradient color="#A855F7" />
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 pt-20 pb-8 gap-12">

        {/* LEFT */}
        <div className="flex-1 max-w-lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.25em] text-purple-500 uppercase mb-4">
            Who I Am
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
            Designing at the<br />
            <span className="text-purple-500">edge of code</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-gray-600 leading-relaxed mb-5">
            {data.personal.bio}
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base text-gray-500 leading-relaxed mb-5">
            {data.personal.story}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="w-1 h-full min-h-12 bg-purple-400 rounded-full self-stretch" />
            <p className="text-sm text-gray-600 italic leading-relaxed">{data.personal.philosophy}</p>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex flex-col gap-6 max-w-sm w-full">
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs font-semibold tracking-[0.25em] text-purple-500 uppercase">
            By the numbers
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {data.stats.map((s, i) => (
              <StatCard key={i} {...s} active={active} delay={0.3 + i * 0.1} />
            ))}
          </div>

          {/* Timeline */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">Journey</div>
            {[
              { year: "2022", event: "Started freelancing", sub: "First client project" },
              { year: "2023", event: "Scaled to 10+ clients", sub: "Launched brand studio" },
              { year: "2024", event: "25+ projects delivered", sub: "Built award-worthy work" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 mb-4 last:mb-0">
                <div className="text-xs font-bold text-purple-400 w-10 pt-0.5">{item.year}</div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{item.event}</div>
                  <div className="text-xs text-gray-400">{item.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  SECTION 03 — SKILLS
// ─────────────────────────────────────────
function SkillBar({ name, level, delay, accent }) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        <span className="text-xs text-gray-400 font-medium">{level}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: accent }} />
      </div>
    </motion.div>
  );
}

function SkillsSection() {
  return (
    <div className="w-full h-full flex items-center relative overflow-hidden bg-white">
      <MeshGradient color="#0EA5E9" />
      <div className="w-full h-full flex flex-col items-start justify-center px-8 md:px-16 lg:px-24 pt-20 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.25em] text-sky-500 uppercase mb-3">
          Expertise
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-10">
          Skills & <span className="text-sky-500">Technologies</span>
        </motion.h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          {/* Frontend */}
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-5">
              <FiCode size={16} className="text-sky-500" />
              <span className="text-sm font-semibold text-gray-900 tracking-wide">Frontend Development</span>
            </motion.div>
            <div className="flex flex-col gap-4">
              {data.skills.frontend.map((s, i) => (
                <SkillBar key={i} {...s} delay={0.2 + i * 0.07} accent="linear-gradient(90deg, #0EA5E9, #6366F1)" />
              ))}
            </div>
          </div>

          {/* Design */}
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mb-5">
              <FiPenTool size={16} className="text-purple-500" />
              <span className="text-sm font-semibold text-gray-900 tracking-wide">Design & Branding</span>
            </motion.div>
            <div className="flex flex-col gap-4">
              {data.skills.design.map((s, i) => (
                <SkillBar key={i} {...s} delay={0.3 + i * 0.07} accent="linear-gradient(90deg, #A855F7, #EC4899)" />
              ))}
            </div>
          </div>
        </div>

        {/* Floating tag cloud */}
        <div className="absolute right-12 bottom-12 hidden lg:flex flex-wrap gap-2 max-w-xs">
          {["React", "Next.js", "GSAP", "Figma", "Tailwind", "TypeScript", "Node.js", "Framer"].map((tag, i) => (
            <motion.span key={i}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.06 }}
              className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:border-sky-300 hover:text-sky-600 hover:-translate-y-0.5 transition-all duration-200 cursor-default">
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  SECTION 04 — PROJECTS (sub-slides)
// ─────────────────────────────────────────
function ProjectSlide({ project, direction }) {
  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -60 : 60, scale: 0.97, transition: { duration: 0.4 } }),
  };

  const imageVariants = {
    enter: (d) => ({ opacity: 0, scale: 1.04 }),
    center: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 0.97, transition: { duration: 0.35 } },
  };

  return (
    <motion.div key={project.id} custom={direction}
      variants={variants} initial="enter" animate="center" exit="exit"
      className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 pt-20 pb-8 gap-10">

      {/* LEFT — Mockup */}
      <motion.div custom={direction} variants={imageVariants} initial="enter" animate="center" exit="exit"
        className="flex-1 flex items-center justify-center max-w-lg w-full">
        <div className="relative w-full">
          {/* Browser chrome */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
            style={{ background: project.color }}>
            {/* Browser top bar */}
            <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-3 border-b border-gray-200">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-white rounded-full px-3 py-1 text-xs text-gray-400 font-mono">
                alexmercer.studio/{project.title.toLowerCase().replace(/\s+/g, "-")}
              </div>
            </div>
            {/* Mockup content */}
            <div className="p-8 min-h-64 flex flex-col justify-between"
              style={{ background: `linear-gradient(135deg, ${project.color} 0%, white 100%)` }}>
              <div className="flex flex-col gap-4">
                <div className="h-4 rounded-full w-3/4" style={{ background: project.accent, opacity: 0.3 }} />
                <div className="h-3 rounded-full w-full bg-gray-200 opacity-60" />
                <div className="h-3 rounded-full w-5/6 bg-gray-200 opacity-50" />
                <div className="h-3 rounded-full w-4/6 bg-gray-200 opacity-40" />
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="rounded-xl p-4 flex items-center justify-center"
                      style={{ background: `${project.accent}15`, border: `1px solid ${project.accent}25` }}>
                      <div className="w-6 h-6 rounded-lg" style={{ background: project.accent, opacity: 0.4 }} />
                    </div>
                  ))}
                </div>
              </div>
              {/* CTA mockup */}
              <div className="mt-6 flex gap-3">
                <div className="h-9 w-28 rounded-full" style={{ background: project.accent, opacity: 0.8 }} />
                <div className="h-9 w-24 rounded-full border" style={{ borderColor: project.accent, opacity: 0.4 }} />
              </div>
            </div>
          </div>
          {/* Glow */}
          <div className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl -z-10"
            style={{ background: `radial-gradient(circle, ${project.accent}40, transparent 70%)` }} />
        </div>
      </motion.div>

      {/* RIGHT — Info */}
      <div className="flex-1 max-w-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: project.accent }}>
          {project.category}
        </motion.div>
        <motion.h3 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
          {project.title}
        </motion.h3>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-sm text-gray-600 leading-relaxed mb-6">
          {project.description}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t, i) => (
            <span key={i} className="px-3 py-1.5 text-xs font-medium rounded-full border"
              style={{ borderColor: `${project.accent}40`, color: project.accent, background: `${project.accent}08` }}>
              {t}
            </span>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex gap-4">
          <a href={project.demo}
            className="group flex items-center gap-2 px-5 py-3 text-sm font-medium text-white rounded-full transition-all duration-300 hover:shadow-lg"
            style={{ background: project.accent }}>
            <FiExternalLink size={14} />
            Live Demo
            <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href={project.github}
            className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-gray-700 rounded-full border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all duration-300">
            <FiGithub size={14} />
            GitHub
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProjectsSection({ projectIndex, direction }) {
  const project = data.projects[projectIndex];
  return (
    <div className="w-full h-full relative overflow-hidden bg-white">
      <MeshGradient color={project.accent} />

      {/* Header */}
      <div className="absolute top-20 left-8 md:left-16 lg:left-24 z-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase">
          Selected Work
        </motion.div>
      </div>

      {/* Counter */}
      <div className="absolute top-20 right-8 md:right-16 z-10 flex items-center gap-3">
        <span className="text-2xl font-bold text-gray-900" style={{ fontVariantNumeric: "tabular-nums" }}>
          {String(projectIndex + 1).padStart(2, "0")}
        </span>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-400 font-medium">
          {String(data.projects.length).padStart(2, "0")}
        </span>
      </div>

      {/* Dot nav */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {data.projects.map((_, i) => (
          <div key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === projectIndex ? 20 : 6,
              height: 6,
              background: i === projectIndex ? project.accent : "#E5E7EB"
            }} />
        ))}
      </div>

      <AnimatePresence custom={direction} mode="wait">
        <ProjectSlide key={projectIndex} project={project} direction={direction} />
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────
//  SECTION 05 — SERVICES (sub-slides)
// ─────────────────────────────────────────
function ServicesSection({ serviceIndex, direction }) {
  const service = data.services[serviceIndex];
  const Icon = service.icon;

  const variants = {
    enter: (d) => ({ opacity: 0, y: d > 0 ? 50 : -50 }),
    center: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    exit: (d) => ({ opacity: 0, y: d > 0 ? -50 : 50, transition: { duration: 0.35 } }),
  };

  return (
    <div className="w-full h-full flex items-center relative overflow-hidden" style={{ background: "#F9FAFB" }}>
      <MeshGradient color="#6366F1" />

      {/* Header */}
      <div className="absolute top-20 left-8 md:left-16 lg:left-24 z-10">
        <span className="text-xs font-semibold tracking-[0.25em] text-indigo-500 uppercase">Services</span>
      </div>

      {/* Counter */}
      <div className="absolute top-20 right-8 md:right-16 z-10">
        <span className="text-sm font-medium text-gray-400">{serviceIndex + 1} / {data.services.length}</span>
      </div>

      {/* Dot nav */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {data.services.map((_, i) => (
          <div key={i} className="rounded-full transition-all duration-500"
            style={{ width: i === serviceIndex ? 20 : 6, height: 6, background: i === serviceIndex ? "#6366F1" : "#E5E7EB" }} />
        ))}
      </div>

      <AnimatePresence custom={direction} mode="wait">
        <motion.div key={serviceIndex} custom={direction}
          variants={variants} initial="enter" animate="center" exit="exit"
          className="absolute inset-0 flex items-center justify-center px-8 md:px-16 lg:px-24 pt-20">
          <div className="max-w-3xl w-full mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              {/* Left icon area */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-3xl bg-white shadow-lg border border-gray-100 flex items-center justify-center mb-6">
                  <Icon size={32} className="text-indigo-500" />
                </div>
                <div className="text-5xl font-bold text-gray-100 select-none">{service.subtitle}</div>
              </div>

              {/* Right content */}
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">{service.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-lg">{service.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                      <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <FiCheck size={10} className="text-indigo-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────
//  SECTION 06 — TESTIMONIALS (sub-slides)
// ─────────────────────────────────────────
function TestimonialsSection({ testimonialIndex, direction }) {
  const t = data.testimonials[testimonialIndex];

  const variants = {
    enter: (d) => ({ opacity: 0, scale: 0.94, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    exit: (d) => ({ opacity: 0, scale: 0.96, x: d > 0 ? -40 : 40, transition: { duration: 0.35 } }),
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-white">
      <MeshGradient color={t.color} />

      <div className="absolute top-20 left-8 md:left-16 lg:left-24 z-10">
        <span className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase">Testimonials</span>
      </div>
      <div className="absolute top-20 right-8 md:right-16 z-10">
        <span className="text-sm font-medium text-gray-400">{testimonialIndex + 1} / {data.testimonials.length}</span>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {data.testimonials.map((_, i) => (
          <div key={i} className="rounded-full transition-all duration-500"
            style={{ width: i === testimonialIndex ? 20 : 6, height: 6, background: i === testimonialIndex ? t.color : "#E5E7EB" }} />
        ))}
      </div>

      <AnimatePresence custom={direction} mode="wait">
        <motion.div key={testimonialIndex} custom={direction}
          variants={variants} initial="enter" animate="center" exit="exit"
          className="absolute inset-0 flex items-center justify-center px-8 pt-16">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
              {/* Quote mark */}
              <div className="absolute top-6 right-8 text-8xl font-serif leading-none select-none"
                style={{ color: `${t.color}15` }}>"</div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array(t.rating).fill(0).map((_, i) => (
                  <FiStar key={i} size={14} className="fill-current" style={{ color: t.color }} />
                ))}
              </div>

              <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-8 relative z-10 font-light">
                "{t.review}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: t.color }}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.position} — {t.company}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────
//  SECTION 07 — CONTACT
// ─────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", type: "", budget: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSubmitted(true); };

  const inputClass = "w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-400";

  return (
    <div className="w-full h-full flex items-center relative overflow-hidden" style={{ background: "#FAFAFA" }}>
      <MeshGradient color="#6366F1" />
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 pt-20 pb-8 gap-12 overflow-y-auto">

        {/* LEFT */}
        <div className="flex-1 max-w-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.25em] text-indigo-500 uppercase mb-4">
            Get In Touch
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
            Let's Build Something<br />
            <span className="text-indigo-500">Amazing Together.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-sm text-gray-500 leading-relaxed mb-8">
            Have a project in mind? I'd love to hear about it. Let's create something memorable.
          </motion.p>

          {/* Contact info */}
          <div className="flex flex-col gap-4 mb-8">
            {[
              { icon: FiMail, label: "Email", value: data.personal.email },
              { icon: FiPhone, label: "Phone", value: data.personal.phone },
              { icon: FiMapPin, label: "Location", value: data.personal.location },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                  <item.icon size={14} className="text-gray-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">{item.label}</div>
                  <div className="text-sm font-medium text-gray-900">{item.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social links */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex gap-3">
            {data.socials.map((s, i) => (
              <a key={i} href={s.url}
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <s.icon size={15} className="text-gray-600" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Form */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 max-w-md w-full">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <FiCheck size={28} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-sm text-gray-500">I'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <input name="name" value={form.name} onChange={handle} placeholder="Your Name" required className={inputClass} />
                  <input name="email" type="email" value={form.email} onChange={handle} placeholder="Email Address" required className={inputClass} />
                </div>
                <select name="type" value={form.type} onChange={handle} className={inputClass}>
                  <option value="">Project Type</option>
                  <option>Web Development</option>
                  <option>UI/UX Design</option>
                  <option>Brand Identity</option>
                  <option>Landing Page</option>
                  <option>E-Commerce</option>
                </select>
                <select name="budget" value={form.budget} onChange={handle} className={inputClass}>
                  <option value="">Budget Range</option>
                  <option>$500 – $1,500</option>
                  <option>$1,500 – $5,000</option>
                  <option>$5,000 – $10,000</option>
                  <option>$10,000+</option>
                </select>
                <textarea name="message" value={form.message} onChange={handle} placeholder="Tell me about your project…"
                  rows={4} className={`${inputClass} resize-none`} required />
                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="group flex items-center justify-center gap-2 w-full py-3.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-indigo-600 transition-all duration-300 shadow-lg shadow-gray-900/20">
                  Send Message
                  <FiSend size={14} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  SLIDE TRANSITION VARIANTS
// ─────────────────────────────────────────
const slideVariants = {
  enterUp: { opacity: 0, y: "100%" },
  enterDown: { opacity: 0, y: "-100%" },
  center: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  exitUp: { opacity: 0, y: "-100%", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exitDown: { opacity: 0, y: "100%", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ─────────────────────────────────────────
//  MAIN APP
// ─────────────────────────────────────────
export default function App() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  const [projectIndex, setProjectIndex] = useState(0);
  const [projectDirection, setProjectDirection] = useState(1);
  const [serviceIndex, setServiceIndex] = useState(0);
  const [serviceDirection, setServiceDirection] = useState(1);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialDirection, setTestimonialDirection] = useState(1);

  const TOTAL_SLIDES = 7;
  const SLIDE_PROJECTS = 3;
  const SLIDE_SERVICES = 4;
  const SLIDE_TESTIMONIALS = 5;

  const lockRef = useRef(false);
  const touchStart = useRef(null);
  const cooldown = 1400;

  const navigate = useCallback((dir) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setTransitioning(true);

    const isInProjects = slideIndex === SLIDE_PROJECTS;
    const isInServices = slideIndex === SLIDE_SERVICES;
    const isInTestimonials = slideIndex === SLIDE_TESTIMONIALS;

    if (dir > 0) {
      if (isInProjects && projectIndex < data.projects.length - 1) {
        setProjectDirection(1);
        setProjectIndex((p) => p + 1);
      } else if (isInServices && serviceIndex < data.services.length - 1) {
        setServiceDirection(1);
        setServiceIndex((s) => s + 1);
      } else if (isInTestimonials && testimonialIndex < data.testimonials.length - 1) {
        setTestimonialDirection(1);
        setTestimonialIndex((t) => t + 1);
      } else {
        if (slideIndex < TOTAL_SLIDES - 1) {
          setDirection(1);
          setSlideIndex((s) => s + 1);
          if (slideIndex + 1 === SLIDE_PROJECTS) setProjectIndex(0);
          if (slideIndex + 1 === SLIDE_SERVICES) setServiceIndex(0);
          if (slideIndex + 1 === SLIDE_TESTIMONIALS) setTestimonialIndex(0);
        }
      }
    } else {
      if (isInProjects && projectIndex > 0) {
        setProjectDirection(-1);
        setProjectIndex((p) => p - 1);
      } else if (isInServices && serviceIndex > 0) {
        setServiceDirection(-1);
        setServiceIndex((s) => s - 1);
      } else if (isInTestimonials && testimonialIndex > 0) {
        setTestimonialDirection(-1);
        setTestimonialIndex((t) => t - 1);
      } else {
        if (slideIndex > 0) {
          setDirection(-1);
          setSlideIndex((s) => s - 1);
        }
      }
    }

    setTimeout(() => {
      lockRef.current = false;
      setTransitioning(false);
    }, cooldown);
  }, [slideIndex, projectIndex, serviceIndex, testimonialIndex]);

  const navTo = useCallback((idx) => {
    if (lockRef.current || idx === slideIndex) return;
    lockRef.current = true;
    setTransitioning(true);
    setDirection(idx > slideIndex ? 1 : -1);
    setSlideIndex(idx);
    if (idx === SLIDE_PROJECTS) setProjectIndex(0);
    if (idx === SLIDE_SERVICES) setServiceIndex(0);
    if (idx === SLIDE_TESTIMONIALS) setTestimonialIndex(0);
    setTimeout(() => { lockRef.current = false; setTransitioning(false); }, cooldown);
  }, [slideIndex]);

  useEffect(() => {
    const onWheel = (e) => { e.preventDefault(); navigate(e.deltaY > 0 ? 1 : -1); };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [navigate]);

  useEffect(() => {
    const onStart = (e) => { touchStart.current = e.touches[0].clientY; };
    const onEnd = (e) => {
      if (touchStart.current === null) return;
      const delta = touchStart.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 40) navigate(delta > 0 ? 1 : -1);
      touchStart.current = null;
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => { window.removeEventListener("touchstart", onStart); window.removeEventListener("touchend", onEnd); };
  }, [navigate]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); navigate(1); }
      if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); navigate(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const renderSlide = (index) => {
    switch (index) {
      case 0: return <HeroSection onNav={navTo} />;
      case 1: return <AboutSection active={slideIndex === 1} />;
      case 2: return <SkillsSection />;
      case 3: return <ProjectsSection projectIndex={projectIndex} direction={projectDirection} />;
      case 4: return <ServicesSection serviceIndex={serviceIndex} direction={serviceDirection} />;
      case 5: return <TestimonialsSection testimonialIndex={testimonialIndex} direction={testimonialDirection} />;
      case 6: return <ContactSection />;
      default: return null;
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { cursor: none !important; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <CustomCursor />
      <Navbar current={slideIndex} onNav={navTo} total={TOTAL_SLIDES} />
      <ScrollProgress current={slideIndex} total={TOTAL_SLIDES} />

      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={slideIndex}
          custom={direction}
          initial={direction > 0 ? "enterUp" : "enterDown"}
          animate="center"
          exit={direction > 0 ? "exitUp" : "exitDown"}
          variants={slideVariants}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: "transform, opacity" }}>
          {renderSlide(slideIndex)}
        </motion.div>
      </AnimatePresence>

      {/* Section label */}
      <motion.div
        key={`label-${slideIndex}`}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="fixed bottom-8 left-8 z-50 hidden md:block">
        <span className="text-xs font-medium text-gray-400 tracking-widest uppercase">
          {SECTIONS[slideIndex]}
        </span>
      </motion.div>
    </div>
  );
}