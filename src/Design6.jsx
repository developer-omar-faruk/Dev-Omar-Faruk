import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight, FiGithub, FiLinkedin, FiMail, FiPhone,
  FiCode, FiLayout, FiUser, FiMonitor, FiStar, FiMapPin,
  FiExternalLink, FiMenu, FiX, FiChevronDown, FiTwitter,
  FiInstagram, FiBriefcase, FiAward, FiZap, FiLayers,
  FiSend, FiDribbble
} from "react-icons/fi";

// ─── DATA ────────────────────────────────────────────────────────────────────
const data = {
  personal: {
    name: "Alex Morgan",
    firstName: "Alex",
    lastName: "Morgan",
    title: "Front-End Developer",
    subtitle: "& Brand Designer",
    tagline: "Creating modern digital experiences through design, animation, and clean code.",
    email: "hello@alexmorgan.dev",
    phone: "+1 (555) 000-0000",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face",
    bio: "I'm a front-end developer and brand designer with 6+ years of experience crafting premium digital experiences. I believe that great design is invisible — it simply feels right.",
    story: "Started as a graphic designer, evolved into a full-stack creative who bridges the gap between beautiful design and performant code. Every pixel matters. Every interaction counts.",
    philosophy: "Design is not just what it looks like — design is how it works. I obsess over the details that most people never notice, but always feel.",
  },
  stats: [
    { label: "Projects Completed", value: 80, suffix: "+" },
    { label: "Happy Clients", value: 60, suffix: "+" },
    { label: "Years Experience", value: 6, suffix: "+" },
    { label: "Technologies", value: 24, suffix: "+" },
  ],
  skills: {
    frontend: [
      { name: "React.js", level: 96 }, { name: "Next.js", level: 92 },
      { name: "JavaScript", level: 95 }, { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 97 }, { name: "Framer Motion", level: 90 },
      { name: "HTML5 / CSS3", level: 98 }, { name: "GSAP", level: 85 },
    ],
    design: [
      { name: "Figma", level: 95 }, { name: "Adobe Illustrator", level: 88 },
      { name: "Adobe Photoshop", level: 85 }, { name: "UI / UX Design", level: 92 },
      { name: "Branding", level: 90 }, { name: "Motion Design", level: 82 },
    ],
  },
  projects: [
    {
      id: "01", title: "Modern Agency Website", category: "Web Design & Dev",
      description: "A premium creative agency website with cinematic scroll animations, split-screen layouts, and award-winning micro-interactions.",
      tech: ["Next.js", "Framer Motion", "GSAP", "Tailwind"],
      color: "#0f0f0f", accent: "#ffffff",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop",
      live: "#", github: "#",
    },
    {
      id: "02", title: "AI SaaS Landing Page", category: "UI/UX & Development",
      description: "Conversion-focused landing page for an AI productivity platform with animated feature showcases and seamless onboarding flow.",
      tech: ["React", "TypeScript", "Tailwind", "Motion"],
      color: "#0a0a0f", accent: "#c7c7ff",
      image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=500&fit=crop",
      live: "#", github: "#",
    },
    {
      id: "03", title: "E-Commerce Platform", category: "Full-Stack Development",
      description: "End-to-end e-commerce solution with dynamic product catalog, cart system, and seamless checkout powered by modern web technologies.",
      tech: ["Next.js", "Stripe", "Prisma", "TailwindCSS"],
      color: "#0f0a0a", accent: "#ffc7c7",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop",
      live: "#", github: "#",
    },
    {
      id: "04", title: "Hospital Website", category: "Brand & Web Design",
      description: "A clean, trustworthy healthcare platform with patient portal, appointment booking, and HIPAA-compliant data handling.",
      tech: ["React", "Node.js", "MongoDB", "Figma"],
      color: "#0a0f0a", accent: "#c7ffc7",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=500&fit=crop",
      live: "#", github: "#",
    },
    {
      id: "05", title: "Gaming Website", category: "UI Design & Dev",
      description: "High-performance gaming community platform with live tournament brackets, leaderboards, and real-time multiplayer integrations.",
      tech: ["React", "WebSockets", "GSAP", "Three.js"],
      color: "#0a0a0f", accent: "#d4c7ff",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop",
      live: "#", github: "#",
    },
    {
      id: "06", title: "Personal Portfolio", category: "Design & Development",
      description: "A presentation-style portfolio website with cinematic scroll transitions, interactive 3D elements, and premium editorial design.",
      tech: ["React", "Framer Motion", "GSAP", "Lenis"],
      color: "#0f0f0a", accent: "#ffffc7",
      image: "https://images.unsplash.com/photo-1545670723-196ed0954986?w=800&h=500&fit=crop",
      live: "#", github: "#",
    },
  ],
  services: [
    {
      icon: "FiCode", title: "Front-End Development",
      description: "Pixel-perfect, performant React & Next.js applications built with modern standards. From concept to deployment.",
      features: ["React / Next.js", "Performance Optimization", "Animation & Interaction", "API Integration"],
    },
    {
      icon: "FiLayout", title: "UI / UX Design",
      description: "Research-driven design systems that convert. I craft interfaces that balance beauty with function.",
      features: ["Wireframing & Prototyping", "Design Systems", "User Research", "Figma Delivery"],
    },
    {
      icon: "FiAward", title: "Brand Identity Design",
      description: "Complete brand identities from logo to full visual system. Built to stand out and scale.",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Typography Systems"],
    },
    {
      icon: "FiMonitor", title: "Landing Page Design",
      description: "High-converting landing pages engineered for impact. Every element serves a purpose.",
      features: ["Conversion Design", "A/B Testing", "Responsive Builds", "SEO Optimized"],
    },
    {
      icon: "FiZap", title: "E-Commerce Development",
      description: "Scalable online stores built for growth. Seamless checkout, powerful admin, and beautiful storefronts.",
      features: ["Shopify / Custom", "Payment Integration", "Inventory Management", "Analytics"],
    },
  ],
  testimonials: [
    {
      name: "Sarah Chen", position: "CEO", company: "Luminary Studio",
      review: "Alex transformed our digital presence completely. The attention to detail, the animations, the overall polish — it's unlike anything we've seen. Clients constantly compliment our new site.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Marcus Rivera", position: "Product Lead", company: "Orbit AI",
      review: "Working with Alex was an absolute pleasure. The landing page we got exceeded every expectation — clean, fast, and incredibly beautiful. Our conversion rate jumped 40% in the first month.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Priya Nair", position: "Marketing Director", company: "NovaBrand",
      review: "The brand identity Alex created for us is timeless. From the logo to the full visual system — everything feels cohesive, premium, and exactly on-brand. Truly world-class work.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "James Whitfield", position: "Founder", company: "Apex Commerce",
      review: "Our e-commerce store went from generic to genuinely stunning. Alex nailed both the design and technical execution. Sales increased significantly and the team loves the new admin experience.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      rating: 5,
    },
  ],
  nav: ["Home", "About", "Skills", "Projects", "Services", "Contact"],
  social: [
    { icon: "FiGithub", href: "#", label: "GitHub" },
    { icon: "FiLinkedin", href: "#", label: "LinkedIn" },
    { icon: "FiTwitter", href: "#", label: "Twitter" },
    { icon: "FiDribbble", href: "#", label: "Dribbble" },
  ],
};

// ─── SECTION REGISTRY ─────────────────────────────────────────────────────────
// Total slides: Hero(1) + About(1) + Skills(1) + Projects(6) + Services(5) + Testimonials(4) + Contact(1) = 19
const buildSlides = () => {
  const slides = [];
  slides.push({ section: "hero", index: 0 });
  slides.push({ section: "about", index: 0 });
  slides.push({ section: "skills", index: 0 });
  data.projects.forEach((_, i) => slides.push({ section: "projects", index: i }));
  data.services.forEach((_, i) => slides.push({ section: "services", index: i }));
  data.testimonials.forEach((_, i) => slides.push({ section: "testimonials", index: i }));
  slides.push({ section: "contact", index: 0 });
  return slides;
};
const SLIDES = buildSlides();

// ─── UTILS ───────────────────────────────────────────────────────────────────
const iconMap = { FiCode, FiLayout, FiAward, FiMonitor, FiZap, FiGithub, FiLinkedin, FiTwitter, FiDribbble };
const Icon = ({ name, ...props }) => {
  const C = iconMap[name];
  return C ? <C {...props} /> : null;
};

// ─── CURSOR ──────────────────────────────────────────────────────────────────
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    let raf;
    const loop = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.12;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${smooth.current.x - 20}px, ${smooth.current.y - 20}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[9999] mix-blend-difference" />
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]" />
    </>
  );
};

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
const Navbar = ({ currentSlide, onNavigate, menuOpen, setMenuOpen }) => {
  const sectionMap = { home: 0, about: 1, skills: 2, projects: 3, services: 9, contact: 18 };
  const currentSection = SLIDES[currentSlide]?.section || "hero";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between"
      style={{ backdropFilter: "blur(20px)", background: "rgba(0,0,0,0.4)" }}
    >
      {/* Logo */}
      <motion.div
        className="text-white font-bold text-lg tracking-widest uppercase cursor-pointer select-none"
        onClick={() => onNavigate(0)}
        whileHover={{ opacity: 0.7 }}
      >
        AM<span className="text-white/40">.</span>
      </motion.div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {data.nav.map((item, i) => {
          const key = item.toLowerCase();
          const slideIdx = sectionMap[key] ?? 0;
          const isActive = currentSection === (key === "home" ? "hero" : key);
          return (
            <motion.button
              key={item}
              onClick={() => onNavigate(slideIdx)}
              className={`text-xs tracking-[0.2em] uppercase transition-all duration-300 relative ${isActive ? "text-white" : "text-white/40 hover:text-white/80"}`}
              whileHover={{ y: -1 }}
            >
              {item}
              {isActive && (
                <motion.div layoutId="navUnderline" className="absolute -bottom-1 left-0 right-0 h-px bg-white" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Menu Button */}
      <motion.button
        className="text-white p-2 md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        whileTap={{ scale: 0.9 }}
      >
        {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </motion.button>

      {/* Hamburger lines desktop */}
      <motion.button
        className="hidden md:flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        whileHover={{ opacity: 0.7 }}
      >
        <span className="block w-5 h-px bg-white" />
        <span className="block w-3 h-px bg-white" />
      </motion.button>
    </motion.nav>
  );
};

// ─── PROGRESS BAR ────────────────────────────────────────────────────────────
const ProgressBar = ({ current, total }) => {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
      <span className="text-white/30 text-[10px] tracking-widest">{String(current + 1).padStart(2, "0")}</span>
      <div className="w-32 h-px bg-white/10 relative">
        <motion.div
          className="absolute inset-y-0 left-0 bg-white"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className="text-white/30 text-[10px] tracking-widest">{String(total).padStart(2, "0")}</span>
    </div>
  );
};

// ─── SECTION: HERO ───────────────────────────────────────────────────────────
const HeroSection = ({ active }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e) => setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <div className="w-full h-full flex items-center px-8 md:px-20 relative overflow-hidden">
      {/* BG shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ x: mousePos.x * 0.3, y: mousePos.y * 0.3 }} className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-white/[0.02] blur-3xl" />
        <motion.div animate={{ x: -mousePos.x * 0.2, y: -mousePos.y * 0.2 }} className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-white/[0.03] blur-2xl" />
        {/* Large typographic element like reference */}
        <div className="absolute bottom-0 left-0 right-0 text-[20vw] font-black text-white/[0.03] leading-none select-none overflow-hidden pointer-events-none">
          AM
        </div>
      </div>

      {/* LEFT */}
      <div className="flex-1 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/40 text-xs tracking-[0.4em] uppercase mb-6"
        >
          Available for work
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-black leading-none mb-2"
          style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
        >
          {data.personal.firstName}
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/20 font-black leading-none mb-8"
          style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
        >
          {data.personal.lastName}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <span className="text-white text-xl md:text-2xl font-light tracking-wide">{data.personal.title}</span>
          <br />
          <span className="text-white/50 text-xl md:text-2xl font-light tracking-wide">{data.personal.subtitle}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/40 text-sm md:text-base leading-relaxed max-w-md mb-10"
        >
          {data.personal.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4"
        >
          <motion.button
            className="px-7 py-3 bg-white text-black text-xs font-semibold tracking-widest uppercase flex items-center gap-2"
            whileHover={{ scale: 1.03, x: 3 }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects <FiArrowRight />
          </motion.button>
          <motion.button
            className="px-7 py-3 border border-white/20 text-white text-xs font-semibold tracking-widest uppercase hover:border-white/50 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Me
          </motion.button>
        </motion.div>
      </div>

      {/* RIGHT — Profile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 60 }}
        animate={active ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.9, x: 60 }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex flex-col items-center justify-center flex-shrink-0 mr-12 relative"
        style={{ transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)` }}
      >
        {/* Rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-72 h-72 rounded-full"
          style={{ background: "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.15), transparent, rgba(255,255,255,0.05), transparent)" }}
        />
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-56 h-56 rounded-full overflow-hidden border border-white/10"
          style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)" }}
        >
          <img src={data.personal.avatar} alt={data.personal.name} className="w-full h-full object-cover" />
        </motion.div>
        {/* Stats floating */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-8 top-8 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-3"
          style={{ borderRadius: "2px" }}
        >
          <div className="text-white font-bold text-lg leading-none">80+</div>
          <div className="text-white/40 text-[10px] tracking-widest mt-1">Projects</div>
        </motion.div>
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -left-8 bottom-10 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-3"
          style={{ borderRadius: "2px" }}
        >
          <div className="text-white font-bold text-lg leading-none">6+</div>
          <div className="text-white/40 text-[10px] tracking-widest mt-1">Years</div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// ─── SECTION: ABOUT ──────────────────────────────────────────────────────────
const CounterNum = ({ target, active }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) { setVal(0); return; }
    let start = 0;
    const step = Math.ceil(target / 60);
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(t); }
      else setVal(start);
    }, 20);
    return () => clearInterval(t);
  }, [active, target]);
  return <>{val}</>;
};

const AboutSection = ({ active }) => (
  <div className="w-full h-full flex items-center px-8 md:px-20 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-white/[0.015]" />
    </div>
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Left */}
      <div>
        <motion.div
          initial={{ opacity: 0, x: -30 }} animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/30 text-[10px] tracking-[0.5em] uppercase mb-5"
        >02 — About Me</motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 40 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-black leading-tight mb-6"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          The story<br /><span className="text-white/25">behind</span><br />the craft.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/50 text-sm leading-loose mb-4 max-w-sm"
        >{data.personal.story}</motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/30 text-sm leading-loose max-w-sm italic"
        >"{data.personal.philosophy}"</motion.p>
      </div>
      {/* Right - Stats */}
      <div className="grid grid-cols-2 gap-4">
        {data.stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="border border-white/10 p-6 hover:border-white/20 transition-colors"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <div className="text-white font-black text-4xl mb-2 leading-none">
              <CounterNum target={s.value} active={active} />{s.suffix}
            </div>
            <div className="text-white/40 text-xs tracking-widest uppercase">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// ─── SECTION: SKILLS ─────────────────────────────────────────────────────────
const SkillBar = ({ skill, delay, active }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className="mb-4"
  >
    <div className="flex justify-between mb-1.5">
      <span className="text-white/70 text-xs tracking-wide">{skill.name}</span>
      <span className="text-white/30 text-xs">{skill.level}%</span>
    </div>
    <div className="h-px bg-white/10 relative overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 bg-white"
        initial={{ width: 0 }}
        animate={active ? { width: `${skill.level}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  </motion.div>
);

const SkillsSection = ({ active }) => (
  <div className="w-full h-full flex items-center px-8 md:px-20 overflow-hidden">
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white/30 text-[10px] tracking-[0.5em] uppercase mb-3"
      >03 — Skills & Tools</motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-white font-black mb-12"
        style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
      >
        The toolkit.<br /><span className="text-white/25">Refined over time.</span>
      </motion.h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <motion.div
            initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-xs tracking-[0.3em] uppercase mb-6"
          >Front-End Development</motion.div>
          {data.skills.frontend.map((s, i) => (
            <SkillBar key={s.name} skill={s} delay={0.1 + i * 0.07} active={active} />
          ))}
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/50 text-xs tracking-[0.3em] uppercase mb-6"
          >Design & Branding</motion.div>
          {data.skills.design.map((s, i) => (
            <SkillBar key={s.name} skill={s} delay={0.2 + i * 0.07} active={active} />
          ))}
          {/* Skill Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-2 mt-8"
          >
            {["Figma", "Illustrator", "GSAP", "Three.js", "Lottie", "Webflow", "Git"].map(t => (
              <span key={t} className="px-3 py-1.5 border border-white/10 text-white/40 text-[10px] tracking-widest uppercase">
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  </div>
);

// ─── SECTION: PROJECT ─────────────────────────────────────────────────────────
const ProjectSection = ({ project, subIndex, totalProjects, active }) => (
  <div className="w-full h-full flex items-center px-8 md:px-20 relative overflow-hidden">
    {/* BG accent */}
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      style={{ background: `radial-gradient(ellipse at 80% 50%, ${project.accent}08 0%, transparent 60%)` }}
    />

    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left — Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, x: -40 }}
        animate={active ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.92, x: -40 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* Browser mockup */}
        <div className="rounded-none overflow-hidden border border-white/10" style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/[0.04] border-b border-white/10">
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="flex-1 mx-3 h-4 bg-white/[0.05] rounded-sm text-[9px] text-white/20 flex items-center px-2 tracking-widest">
              {project.title.toLowerCase().replace(/ /g, "-")}.vercel.app
            </span>
          </div>
          <div className="relative overflow-hidden" style={{ paddingBottom: "62%" }}>
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>
        {/* Decorative */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-white/5 pointer-events-none" />
      </motion.div>

      {/* Right — Content */}
      <div>
        {/* Counter */}
        <motion.div
          initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white/20 text-[10px] tracking-[0.5em] uppercase mb-4"
        >
          04 — Projects &nbsp;&nbsp; {String(subIndex + 1).padStart(2, "0")} / {String(totalProjects).padStart(2, "0")}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.1 }}
          className="text-white/40 text-xs tracking-widest uppercase mb-3"
        >{project.category}</motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-black leading-tight mb-5"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)" }}
        >{project.title}</motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-white/40 text-sm leading-loose mb-6 max-w-sm"
        >{project.description}</motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.35 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {project.tech.map(t => (
            <span key={t} className="px-3 py-1 border border-white/10 text-white/50 text-[10px] tracking-widest uppercase">
              {t}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.45 }}
          className="flex gap-4"
        >
          <motion.a href={project.live}
            className="flex items-center gap-2 px-6 py-2.5 bg-white text-black text-xs font-semibold tracking-widest uppercase"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          >
            <FiExternalLink size={13} /> Live Demo
          </motion.a>
          <motion.a href={project.github}
            className="flex items-center gap-2 px-6 py-2.5 border border-white/20 text-white text-xs tracking-widest uppercase hover:border-white/40 transition-colors"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          >
            <FiGithub size={13} /> GitHub
          </motion.a>
        </motion.div>
      </div>
    </div>
  </div>
);

// ─── SECTION: SERVICES ───────────────────────────────────────────────────────
const serviceIconMap = { FiCode, FiLayout, FiAward, FiMonitor, FiZap };
const ServiceSection = ({ service, subIndex, total, active }) => {
  const IC = serviceIconMap[service.icon];
  return (
    <div className="w-full h-full flex items-center justify-center px-8 md:px-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 70%)" }} />
      </div>
      <div className="max-w-3xl w-full text-center">
        <motion.div
          initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white/30 text-[10px] tracking-[0.5em] uppercase mb-8"
        >05 — Services &nbsp;&nbsp; {String(subIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }} animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-16 border border-white/10 flex items-center justify-center mx-auto mb-8"
        >
          {IC && <IC size={24} className="text-white/60" />}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-black leading-tight mb-6"
          style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
        >{service.title}</motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/40 text-base leading-loose mb-10 max-w-xl mx-auto"
        >{service.description}</motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {service.features.map((f, i) => (
            <motion.span
              key={f}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="flex items-center gap-2 px-4 py-2 border border-white/10 text-white/50 text-xs tracking-widest uppercase"
            >
              <FiArrowRight size={10} /> {f}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// ─── SECTION: TESTIMONIALS ───────────────────────────────────────────────────
const TestimonialSection = ({ testimonial, subIndex, total, active }) => (
  <div className="w-full h-full flex items-center justify-center px-8 md:px-20 relative overflow-hidden">
    <div className="max-w-2xl w-full">
      <motion.div
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white/30 text-[10px] tracking-[0.5em] uppercase mb-12"
      >06 — Testimonials &nbsp;&nbsp; {String(subIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-1 mb-8"
      >
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <FiStar key={i} size={14} className="text-white fill-white" />
        ))}
      </motion.div>

      <motion.blockquote
        initial={{ opacity: 0, y: 40 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="text-white font-light leading-relaxed mb-10"
        style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)" }}
      >
        "{testimonial.review}"
      </motion.blockquote>

      <motion.div
        initial={{ opacity: 0, x: -20 }} animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex items-center gap-4"
      >
        <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
        <div>
          <div className="text-white font-semibold text-sm">{testimonial.name}</div>
          <div className="text-white/40 text-xs tracking-wide">{testimonial.position} · {testimonial.company}</div>
        </div>
      </motion.div>
    </div>
  </div>
);

// ─── SECTION: CONTACT ────────────────────────────────────────────────────────
const ContactSection = ({ active }) => {
  const [form, setForm] = useState({ name: "", email: "", type: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="w-full h-full flex items-center px-8 md:px-20 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white/30 text-[10px] tracking-[0.5em] uppercase mb-6"
          >07 — Contact</motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 50 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-white font-black leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)" }}
          >
            Let's build<br /><span className="text-white/25">something</span><br />amazing.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.25 }}
            className="space-y-4 mb-8"
          >
            {[
              { icon: FiMail, val: data.personal.email },
              { icon: FiPhone, val: data.personal.phone },
              { icon: FiMapPin, val: data.personal.location },
            ].map(({ icon: Ic, val }) => (
              <div key={val} className="flex items-center gap-3 text-white/40 text-sm">
                <Ic size={14} className="text-white/20" /> {val}
              </div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4"
          >
            {data.social.map(s => {
              const Ic = iconMap[s.icon];
              return Ic ? (
                <motion.a key={s.label} href={s.href}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                >
                  <Ic size={15} />
                </motion.a>
              ) : null;
            })}
          </motion.div>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }} animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          {[
            { key: "name", placeholder: "Your Name", type: "text" },
            { key: "email", placeholder: "Email Address", type: "email" },
          ].map(f => (
            <input key={f.key} type={f.type} placeholder={f.placeholder}
              value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/10 text-white text-sm px-4 py-3 placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
            />
          ))}
          <div className="grid grid-cols-2 gap-4">
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
              className="bg-white/[0.03] border border-white/10 text-white/60 text-sm px-4 py-3 focus:outline-none focus:border-white/30 transition-colors appearance-none"
            >
              <option value="" className="bg-black">Project Type</option>
              <option value="web" className="bg-black">Web Development</option>
              <option value="brand" className="bg-black">Brand Design</option>
              <option value="ui" className="bg-black">UI/UX Design</option>
            </select>
            <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}
              className="bg-white/[0.03] border border-white/10 text-white/60 text-sm px-4 py-3 focus:outline-none focus:border-white/30 transition-colors appearance-none"
            >
              <option value="" className="bg-black">Budget Range</option>
              <option value="1-3k" className="bg-black">$1k – $3k</option>
              <option value="3-10k" className="bg-black">$3k – $10k</option>
              <option value="10k+" className="bg-black">$10k+</option>
            </select>
          </div>
          <textarea placeholder="Tell me about your project..." rows={4}
            value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
            className="w-full bg-white/[0.03] border border-white/10 text-white text-sm px-4 py-3 placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
          />
          <motion.button
            type="submit"
            className="w-full py-3.5 bg-white text-black text-xs font-semibold tracking-[0.3em] uppercase flex items-center justify-center gap-2 relative overflow-hidden"
            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.span key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  Message Sent ✓
                </motion.span>
              ) : (
                <motion.span key="send" className="flex items-center gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  Send Message <FiSend size={13} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

// ─── SECTION DOTS / INDICATORS ───────────────────────────────────────────────
const sectionGroups = [
  { label: "Home", start: 0, end: 0 },
  { label: "About", start: 1, end: 1 },
  { label: "Skills", start: 2, end: 2 },
  { label: "Projects", start: 3, end: 8 },
  { label: "Services", start: 9, end: 13 },
  { label: "Testimonials", start: 14, end: 17 },
  { label: "Contact", start: 18, end: 18 },
];

const SectionDots = ({ current, onNavigate }) => (
  <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
    {sectionGroups.map(g => {
      const active = current >= g.start && current <= g.end;
      return (
        <motion.button
          key={g.label}
          onClick={() => onNavigate(g.start)}
          title={g.label}
          className="relative flex items-center justify-end gap-2 group"
          whileHover={{ x: -2 }}
        >
          <span className="opacity-0 group-hover:opacity-100 text-white/50 text-[9px] tracking-widest uppercase transition-opacity">
            {g.label}
          </span>
          <div className={`rounded-full transition-all duration-300 ${active ? "w-4 h-4 bg-white" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"}`} />
        </motion.button>
      );
    })}
  </div>
);

// ─── SCROLL HINT ─────────────────────────────────────────────────────────────
const ScrollHint = ({ visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
        className="fixed bottom-16 left-8 z-50 flex items-center gap-2 text-white/20"
      >
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <FiChevronDown size={14} />
        </motion.div>
        <span className="text-[9px] tracking-[0.4em] uppercase">Scroll</span>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cooldownRef = useRef(false);
  const total = SLIDES.length;

  const goTo = useCallback((idx) => {
    if (cooldownRef.current || idx === current || idx < 0 || idx >= total) return;
    cooldownRef.current = true;
    setTransitioning(true);
    setCurrent(idx);
    setTimeout(() => {
      cooldownRef.current = false;
      setTransitioning(false);
    }, 1100);
  }, [current, total]);

  const goNext = useCallback(() => goTo(Math.min(current + 1, total - 1)), [goTo, current, total]);
  const goPrev = useCallback(() => goTo(Math.max(current - 1, 0)), [goTo, current]);

  // Wheel
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      if (cooldownRef.current) return;
      if (e.deltaY > 0) goNext(); else goPrev();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goNext, goPrev]);

  // Touch
  useEffect(() => {
    let startY = 0;
    const onStart = (e) => { startY = e.touches[0].clientY; };
    const onEnd = (e) => {
      if (cooldownRef.current) return;
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) { if (dy > 0) goNext(); else goPrev(); }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => { window.removeEventListener("touchstart", onStart); window.removeEventListener("touchend", onEnd); };
  }, [goNext, goPrev]);

  // Keys
  useEffect(() => {
    const onKey = (e) => {
      if (cooldownRef.current) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goNext();
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const slide = SLIDES[current];

  const renderSection = (idx) => {
    const s = SLIDES[idx];
    const isActive = idx === current;
    switch (s.section) {
      case "hero": return <HeroSection active={isActive} key="hero" />;
      case "about": return <AboutSection active={isActive} key="about" />;
      case "skills": return <SkillsSection active={isActive} key="skills" />;
      case "projects": return (
        <ProjectSection
          key={`proj-${s.index}`}
          project={data.projects[s.index]}
          subIndex={s.index}
          totalProjects={data.projects.length}
          active={isActive}
        />
      );
      case "services": return (
        <ServiceSection
          key={`svc-${s.index}`}
          service={data.services[s.index]}
          subIndex={s.index}
          total={data.services.length}
          active={isActive}
        />
      );
      case "testimonials": return (
        <TestimonialSection
          key={`test-${s.index}`}
          testimonial={data.testimonials[s.index]}
          subIndex={s.index}
          total={data.testimonials.length}
          active={isActive}
        />
      );
      case "contact": return <ContactSection active={isActive} key="contact" />;
      default: return null;
    }
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden bg-black relative"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", cursor: "none" }}
    >
      <CustomCursor />
      <Navbar currentSlide={current} onNavigate={goTo} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <SectionDots current={current} onNavigate={goTo} />
      <ProgressBar current={current} total={total} />
      <ScrollHint visible={current === 0} />

      {/* Slide container */}
      <div className="w-full h-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {renderSection(current)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Section name — bottom right */}
      <motion.div
        key={slide.section}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        className="fixed bottom-8 right-20 text-white/20 text-[9px] tracking-[0.4em] uppercase pointer-events-none"
      >
        {slide.section}
      </motion.div>
    </div>
  );
}