import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight, FiGithub, FiLinkedin, FiMail, FiPhone,
  FiCode, FiMonitor, FiLayout, FiUser, FiMenu, FiX,
  FiMapPin, FiExternalLink, FiTwitter, FiInstagram,
  FiChevronRight, FiChevronLeft, FiStar, FiBriefcase,
  FiBookOpen, FiZap, FiLayers, FiPenTool, FiGlobe,
  FiSend, FiCheck, FiArrowDown
} from "react-icons/fi";

// ─── DATA ───────────────────────────────────────────────────────────────────
const data = {
  personal: {
    name: "Aria Chen",
    title: "Front-End Developer",
    subtitle: "& Brand Designer",
    tagline: "Creating modern digital experiences through design, animation, and clean code.",
    email: "aria@ariachen.studio",
    phone: "+1 (555) 012-3456",
    location: "San Francisco, CA",
    bio: "I'm a passionate front-end developer and brand designer with a love for crafting pixel-perfect, performant web experiences. I bridge the gap between beautiful design and clean, maintainable code.",
    bio2: "With 2+ years of experience working with startups and established brands, I've developed a deep appreciation for the intersection of aesthetics and functionality.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=90",
    stats: [
      { value: "25+", label: "Projects Completed" },
      { value: "10+", label: "Happy Clients" },
      { value: "2+", label: "Years Experience" },
      { value: "15+", label: "Technologies" },
    ],
  },
  nav: ["Home", "About", "Skills", "Projects", "Services", "Contact"],
  skills: {
    frontend: [
      { name: "HTML5", level: 95 }, { name: "CSS3", level: 92 },
      { name: "JavaScript", level: 90 }, { name: "React.js", level: 88 },
      { name: "Tailwind CSS", level: 92 }, { name: "Framer Motion", level: 85 },
      { name: "Next.js", level: 82 },
    ],
    design: [
      { name: "Figma", level: 90 }, { name: "Adobe Illustrator", level: 80 },
      { name: "Adobe Photoshop", level: 78 }, { name: "Branding", level: 88 },
      { name: "UI Design", level: 92 }, { name: "UX Design", level: 85 },
    ],
  },
  projects: [
    {
      id: "01", title: "Modern Agency Website",
      desc: "A fullscreen, award-worthy agency website with scroll-driven storytelling, magnetic cursors, and cinematic transitions built for a creative studio.",
      tags: ["React", "GSAP", "Tailwind", "Framer Motion"],
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&q=85",
      live: "#", github: "#", color: "#F0F4FF",
    },
    {
      id: "02", title: "AI SaaS Landing Page",
      desc: "High-converting SaaS landing page for an AI productivity tool, featuring a 3D hero, animated metrics, and enterprise-grade pricing sections.",
      tags: ["Next.js", "Three.js", "TypeScript", "Stripe"],
      image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=85",
      live: "#", github: "#", color: "#F0FFF4",
    },
    {
      id: "03", title: "E-Commerce Platform",
      desc: "End-to-end luxury e-commerce experience with AR product previews, micro-interaction checkout flow, and personalised recommendation engine.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=85",
      live: "#", github: "#", color: "#FFFBF0",
    },
    {
      id: "04", title: "Hospital Management System",
      desc: "Comprehensive healthcare platform with patient dashboards, appointment scheduling, real-time vitals monitoring and HIPAA-compliant data flows.",
      tags: ["React", "Firebase", "Chart.js", "Tailwind"],
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=85",
      live: "#", github: "#", color: "#F0F8FF",
    },
    {
      id: "05", title: "Gaming Website",
      desc: "Immersive gaming brand website with particle effects, WebGL backgrounds, tournament brackets, and real-time leaderboard integration.",
      tags: ["React", "Three.js", "WebGL", "Socket.io"],
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=85",
      live: "#", github: "#", color: "#FFF0F8",
    },
    {
      id: "06", title: "Personal Portfolio",
      desc: "Award-winning personal portfolio with scroll-locked presentation mode, cinematic transitions, custom cursor, and 3D interactive elements.",
      tags: ["React", "GSAP", "Framer Motion", "Lenis"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=85",
      live: "#", github: "#", color: "#F5F0FF",
    },
  ],
  services: [
    {
      icon: FiMonitor, title: "Front-End Development",
      desc: "Pixel-perfect, performant web applications built with modern frameworks, clean architecture, and obsessive attention to detail.",
      features: ["React / Next.js", "Animation & Interaction", "Performance Optimisation", "Responsive Design"],
    },
    {
      icon: FiLayout, title: "UI/UX Design",
      desc: "Research-driven design systems that balance aesthetic beauty with intuitive usability, crafted in Figma with engineering handoff in mind.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    },
    {
      icon: FiPenTool, title: "Brand Identity Design",
      desc: "Strategic brand identities that communicate your values, differentiate you from competitors, and resonate deeply with your audience.",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Typography Systems"],
    },
    {
      icon: FiZap, title: "Landing Page Design",
      desc: "High-converting landing pages that combine persuasive copy, stunning visuals, and strategic UX to turn visitors into customers.",
      features: ["Conversion Optimisation", "A/B Testing Ready", "SEO Structure", "Analytics Integration"],
    },
    {
      icon: FiGlobe, title: "E-Commerce Development",
      desc: "Full-featured online stores with silky checkout flows, inventory management, payment integrations, and scalable architecture.",
      features: ["Shopify / Custom", "Payment Gateways", "Inventory Management", "Mobile Commerce"],
    },
  ],
  testimonials: [
    {
      name: "James Whitfield", company: "NovaBrand Studios", role: "CEO",
      text: "Aria delivered a website that completely transformed our online presence. The animations, the flow, the design — it felt like working with a top-tier agency but with genuine personal care.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
      rating: 5,
    },
    {
      name: "Sophia Laurent", company: "Lumière Health", role: "Head of Product",
      text: "The hospital management system she built is intuitive and beautiful. Our staff onboarded in days, not weeks. The attention to UX detail is unmatched.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      rating: 5,
    },
    {
      name: "Marcus Reed", company: "Apex Gaming", role: "Marketing Director",
      text: "Our gaming site went from generic to unforgettable overnight. The WebGL effects and interactions have won us multiple industry awards. Exceptional work.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
      rating: 5,
    },
    {
      name: "Elena Vasquez", company: "Meridian Commerce", role: "Founder",
      text: "The e-commerce platform doubled our conversion rate in the first month. Clean code, gorgeous UI, and she genuinely understood our brand vision from day one.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80",
      rating: 5,
    },
  ],
  social: [
    { icon: FiGithub, label: "GitHub", url: "#" },
    { icon: FiLinkedin, label: "LinkedIn", url: "#" },
    { icon: FiTwitter, label: "Twitter", url: "#" },
    { icon: FiInstagram, label: "Instagram", url: "#" },
  ],
};

// ─── SECTION ORDER ───────────────────────────────────────────────────────────
// 0:Hero 1:About 2:Skills 3:Projects(6) 4:Services(5) 5:Testimonials(4) 6:Contact
const TOTAL_MAIN = 7;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const ease = [0.76, 0, 0.24, 1];

// ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [hovered, setHovered] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const over = (e) => { if (e.target.closest("a,button,[data-cursor]")) setHovered(true); };
    const out = () => setHovered(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);

    let rx = -100, ry = -100;
    const animate = () => {
      const { x, y } = pos.current;
      if (dot.current) { dot.current.style.transform = `translate(${x - 4}px,${y - 4}px)`; }
      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;
      if (ring.current) { ring.current.style.transform = `translate(${rx - 20}px,${ry - 20}px)`; }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gray-900 z-[9999] pointer-events-none mix-blend-difference" style={{ transition: "background 0.2s" }} />
      <div ref={ring} className="fixed top-0 left-0 w-10 h-10 rounded-full border border-gray-400 z-[9998] pointer-events-none"
        style={{ transition: "width 0.3s, height 0.3s, border-color 0.3s, transform 0.05s linear", width: hovered ? 56 : 40, height: hovered ? 56 : 40, borderColor: hovered ? "#111827" : "#9CA3AF" }} />
    </>
  );
}

// ─── PROGRESS BAR ────────────────────────────────────────────────────────────
function ProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="fixed bottom-0 left-0 w-full h-[2px] bg-gray-200 z-50">
      <motion.div className="h-full bg-gray-900" animate={{ width: `${pct}%` }} transition={{ duration: 0.6, ease }} />
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar({ current, goTo, mobileOpen, setMobileOpen }) {
  const sectionMap = { Home: 0, About: 1, Skills: 2, Projects: 3, Services: 4, Contact: 6 };
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-5 flex items-center justify-between"
        style={{ backdropFilter: "blur(16px)", background: "rgba(255,255,255,0.75)", borderBottom: "1px solid rgba(229,231,235,0.6)" }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-lg font-semibold tracking-tight text-gray-900 select-none">
          aria<span className="text-gray-400">.</span>
        </motion.div>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {data.nav.map((item) => {
            const idx = sectionMap[item];
            const active = idx !== undefined && (
              (item === "Projects" && current >= 3 && current <= 3) ||
              (item === "Home" && current === 0) ||
              (item === "About" && current === 1) ||
              (item === "Skills" && current === 2) ||
              (item === "Services" && current === 4) ||
              (item === "Contact" && current === 6)
            );
            return (
              <button key={item} onClick={() => goTo(idx)}
                className={`text-sm font-medium transition-all duration-200 relative ${active ? "text-gray-900" : "text-gray-500 hover:text-gray-900"}`}>
                {item}
                {active && <motion.span layoutId="nav-indicator" className="absolute -bottom-1 left-0 w-full h-px bg-gray-900" />}
              </button>
            );
          })}
        </div>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="hidden md:flex items-center gap-2 text-sm font-medium text-white bg-gray-900 px-4 py-2 rounded-full hover:bg-gray-700 transition-all"
          onClick={() => goTo(6)}>
          Hire Me <FiArrowRight size={14} />
        </motion.button>
        <button className="md:hidden text-gray-900" onClick={() => setMobileOpen(true)}><FiMenu size={22} /></button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
            <button className="absolute top-5 right-6 text-gray-900" onClick={() => setMobileOpen(false)}><FiX size={24} /></button>
            <div className="flex flex-col items-center gap-8">
              {data.nav.map((item, i) => (
                <motion.button key={item} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: i * 0.07 } }}
                  className="text-3xl font-light text-gray-900 hover:text-gray-500 transition-colors"
                  onClick={() => { goTo(sectionMap[item]); setMobileOpen(false); }}>
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── SECTION INDICATOR ───────────────────────────────────────────────────────
function SectionDots({ current, total, goTo }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <button key={i} onClick={() => goTo(i)}
          className={`w-1.5 rounded-full transition-all duration-400 ${i === current ? "h-6 bg-gray-900" : "h-1.5 bg-gray-300 hover:bg-gray-500"}`} />
      ))}
    </div>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero({ active, goTo }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handle = (e) => setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const words = ["Developer", "Designer", "Creator"];
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx(p => (p + 1) % words.length), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full opacity-30" style={{ background: "radial-gradient(circle, #E0E7FF, transparent)", filter: "blur(60px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #FCE7F3, transparent)", filter: "blur(80px)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[500px] md:h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #F3F4F6, transparent)", filter: "blur(100px)" }} />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="order-2 md:order-1 text-center md:text-left">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ delay: 0.1, duration: 0.7, ease }}
            className="inline-flex items-center gap-2 text-xs font-medium text-gray-500 border border-gray-200 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Available for new projects
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ delay: 0.2, duration: 0.8, ease }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight mb-2">
            {data.personal.name}
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ delay: 0.3, duration: 0.7, ease }}
            className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-400 mb-6 h-12 flex items-center justify-center md:justify-start gap-2">
            Front-End{" "}
            <AnimatePresence mode="wait">
              <motion.span key={wordIdx} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4 }} className="text-gray-900 font-semibold">
                {words[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 0.4, duration: 0.7, ease }}
            className="text-base md:text-lg text-gray-500 leading-relaxed max-w-md mx-auto md:mx-0 mb-8">
            {data.personal.tagline}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 0.5, duration: 0.7, ease }}
            className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button onClick={() => goTo(3)}
              className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-700 transition-all hover:scale-105">
              View Projects <FiArrowRight size={15} />
            </button>
            <button onClick={() => goTo(6)}
              className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full text-sm font-medium border border-gray-200 hover:border-gray-400 transition-all hover:scale-105">
              Contact Me
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.7, duration: 0.7 }}
            className="flex gap-4 mt-8 justify-center md:justify-start">
            {data.social.map(({ icon: Icon, label, url }) => (
              <a key={label} href={url} data-cursor
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-all">
                <Icon size={15} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Image */}
        <motion.div className="order-1 md:order-2 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.8 }} animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.3, duration: 0.9, ease }}
          style={{ transform: `perspective(1000px) rotateY(${mousePos.x * 0.3}deg) rotateX(${-mousePos.y * 0.3}deg)` }}>
          <div className="relative">
            {/* Rotating ring */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 -m-3 rounded-full"
              style={{ background: "conic-gradient(from 0deg, transparent, #E5E7EB, transparent, #6B7280, transparent)", opacity: 0.6 }} />
            {/* Pulse rings */}
            <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 -m-6 rounded-full border border-gray-200" />
            <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 -m-12 rounded-full border border-gray-100" />
            {/* Image */}
            <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10">
              <img src={data.personal.image} alt={data.personal.name} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.button onClick={() => goTo(1)} initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 hover:text-gray-700 transition-colors">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><FiArrowDown size={16} /></motion.div>
      </motion.button>
    </div>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
function About({ active }) {
  const [counts, setCounts] = useState(data.personal.stats.map(() => 0));
  useEffect(() => {
    if (!active) { setCounts(data.personal.stats.map(() => 0)); return; }
    const targets = data.personal.stats.map(s => parseInt(s.value));
    const timers = targets.map((target, i) => {
      let current = 0;
      return setInterval(() => {
        current += Math.ceil(target / 40);
        if (current >= target) { current = target; }
        setCounts(p => { const n = [...p]; n[i] = current; return n; });
      }, 40);
    });
    return () => timers.forEach(clearInterval);
  }, [active]);

  const cards = [
    { icon: FiUser, title: "Who I Am", text: data.personal.bio },
    { icon: FiBriefcase, title: "What I Do", text: data.personal.bio2 },
    { icon: FiBookOpen, title: "My Approach", text: "Every project begins with deep listening. I prioritise understanding your goals before writing a single line of code or creating a single pixel." },
  ];

  return (
    <div className="w-full h-full flex items-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }} transition={{ duration: 0.6, ease }}
          className="text-center mb-10 md:mb-12">
          <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-3">About Me</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            Passion meets <span className="italic font-light text-gray-400">precision.</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {data.personal.stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease }}
              className="text-center p-4 md:p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                {counts[i]}{s.value.includes("+") ? "+" : ""}
              </div>
              <div className="text-xs md:text-sm text-gray-500">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map(({ icon: Icon, title, text }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.7, ease }}
              className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-gray-900 transition-colors">
                <Icon size={18} className="text-gray-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────
function Skills({ active }) {
  const [tab, setTab] = useState("frontend");
  const list = data.skills[tab];

  return (
    <div className="w-full h-full flex items-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }} transition={{ duration: 0.6 }}
          className="text-center mb-8">
          <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-3">Expertise</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
            Skills & <span className="italic font-light text-gray-400">Technologies</span>
          </h2>
          <div className="inline-flex rounded-full border border-gray-200 p-1 bg-white">
            {["frontend", "design"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all capitalize ${tab === t ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900"}`}>
                {t === "frontend" ? "Frontend" : "Design"}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {list.map((skill, i) => (
            <motion.div key={skill.name} initial={{ opacity: 0, x: -20 }} animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              className="p-5 rounded-2xl border border-gray-100 bg-white hover:shadow-sm transition-all">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                <span className="text-xs text-gray-400 font-mono">{skill.level}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full bg-gray-900"
                  initial={{ width: 0 }} animate={active ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.8, ease }} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.8 }}
          className="mt-6 flex flex-wrap gap-2 justify-center">
          {["TypeScript", "Git", "Vercel", "Webpack", "Vite", "REST APIs", "GraphQL", "Storybook"].map(tag => (
            <span key={tag} className="text-xs font-medium text-gray-500 border border-gray-200 rounded-full px-3 py-1.5 bg-white hover:border-gray-400 transition-colors">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────
function Projects({ active, projectIdx, total }) {
  const project = data.projects[projectIdx];
  return (
    <div className="w-full h-full flex items-center overflow-hidden" style={{ background: project.color }}>
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.div key={project.id}
            initial={{ opacity: 0, scale: 0.92, x: -30 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.96, x: 30 }}
            transition={{ duration: 0.6, ease }}
            className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video border border-gray-100">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            {/* Browser bar */}
            <div className="absolute top-0 left-0 right-0 h-8 flex items-center gap-1.5 px-3" style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}>
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <div className="flex-1 ml-2 h-4 rounded bg-gray-100 text-xs flex items-center px-2 text-gray-400 font-mono overflow-hidden">
                ariachen.studio/{project.title.toLowerCase().replace(/\s/g, "-")}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div key={project.id + "-content"}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, ease }}>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 border border-gray-200 rounded-full px-3 py-1 mb-4 bg-white">
              Project {project.id} / 06
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">{project.title}</h2>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-6">{project.desc}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-full px-3 py-1.5">{tag}</span>
              ))}
            </div>
            <div className="flex gap-3">
              <a href={project.live} data-cursor className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-700 transition-all">
                <FiExternalLink size={14} /> Live Demo
              </a>
              <a href={project.github} data-cursor className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full text-sm font-medium border border-gray-200 hover:border-gray-400 transition-all">
                <FiGithub size={14} /> GitHub
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {data.projects.map((_, i) => (
          <div key={i} className={`rounded-full transition-all duration-300 ${i === projectIdx ? "w-6 h-1.5 bg-gray-900" : "w-1.5 h-1.5 bg-gray-300"}`} />
        ))}
      </div>
    </div>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function Services({ active, serviceIdx }) {
  const service = data.services[serviceIdx];
  const Icon = service.icon;

  return (
    <div className="w-full h-full flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #F3F4F6, transparent)", filter: "blur(80px)" }} />
      </div>
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
          className="text-center mb-10">
          <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-2">Services</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            What I <span className="italic font-light text-gray-400">offer</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={serviceIdx}
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.55, ease }}
              className="p-8 rounded-3xl border border-gray-100 bg-white shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 border border-gray-100">
                <Icon size={24} className="text-gray-700" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed mb-6">{service.desc}</p>
              <ul className="space-y-2.5">
                {service.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <FiCheck size={14} className="text-gray-400" /> {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          {/* All services mini list */}
          <div className="flex flex-col gap-2">
            {data.services.map((s, i) => {
              const SI = s.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${i === serviceIdx ? "border-gray-300 bg-white shadow-sm" : "border-transparent bg-transparent"}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${i === serviceIdx ? "bg-gray-900" : "bg-gray-100"}`}>
                    <SI size={14} className={i === serviceIdx ? "text-white" : "text-gray-500"} />
                  </div>
                  <span className={`text-sm font-medium ${i === serviceIdx ? "text-gray-900" : "text-gray-400"}`}>{s.title}</span>
                  {i === serviceIdx && <FiChevronRight size={14} className="ml-auto text-gray-400" />}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {data.services.map((_, i) => (
          <div key={i} className={`rounded-full transition-all duration-300 ${i === serviceIdx ? "w-6 h-1.5 bg-gray-900" : "w-1.5 h-1.5 bg-gray-300"}`} />
        ))}
      </div>
    </div>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Testimonials({ active, testIdx }) {
  const t = data.testimonials[testIdx];
  return (
    <div className="w-full h-full flex items-center overflow-hidden" style={{ background: "#FAFAFA" }}>
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
          className="mb-10">
          <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-2">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Client <span className="italic font-light text-gray-400">Stories</span></h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={testIdx}
            initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.55, ease }}
            className="max-w-2xl mx-auto p-8 md:p-10 rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => <FiStar key={i} size={16} className="fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 italic">"{t.text}"</p>
            <div className="flex items-center justify-center gap-4">
              <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow" />
              <div className="text-left">
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-400">{t.role} · {t.company}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex gap-2 justify-center">
          {data.testimonials.map((_, i) => (
            <div key={i} className={`rounded-full transition-all duration-300 ${i === testIdx ? "w-6 h-1.5 bg-gray-900" : "w-1.5 h-1.5 bg-gray-300"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact({ active }) {
  const [form, setForm] = useState({ name: "", email: "", type: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); };

  return (
    <div className="w-full h-full flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #E0E7FF, transparent)", filter: "blur(80px)" }} />
      </div>
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Left */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }} transition={{ duration: 0.7, ease }}>
          <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-4">Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
            Let's Build Something<br />
            <span className="italic font-light text-gray-400">Amazing Together.</span>
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8 max-w-sm">Have a project in mind? Let's talk about how we can create something exceptional together.</p>

          <div className="space-y-4 mb-8">
            {[
              { icon: FiMail, label: data.personal.email },
              { icon: FiPhone, label: data.personal.phone },
              { icon: FiMapPin, label: data.personal.location },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                  <Icon size={15} className="text-gray-500" />
                </div>
                {label}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            {data.social.map(({ icon: Icon, label, url }) => (
              <a key={label} href={url} data-cursor
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-all hover:scale-110">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 30 }} animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }} transition={{ duration: 0.7, delay: 0.1, ease }}
          className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Name</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="John Doe"
                className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-400 transition-colors bg-gray-50" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Email</label>
              <input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="john@example.com"
                className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-400 transition-colors bg-gray-50" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Project Type</label>
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-400 transition-colors bg-gray-50">
                <option value="">Select type</option>
                <option>Website Design</option>
                <option>Brand Identity</option>
                <option>E-Commerce</option>
                <option>SaaS Product</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Budget</label>
              <select value={form.budget} onChange={e => setForm(p => ({ ...p, budget: e.target.value }))}
                className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-400 transition-colors bg-gray-50">
                <option value="">Select budget</option>
                <option>$1k – $3k</option>
                <option>$3k – $7k</option>
                <option>$7k – $15k</option>
                <option>$15k+</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Message</label>
            <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} rows={4}
              placeholder="Tell me about your project..."
              className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-400 transition-colors resize-none bg-gray-50" />
          </div>
          <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-gray-700 transition-all">
            {sent ? <><FiCheck size={15} /> Message Sent!</> : <><FiSend size={15} /> Send Message</>}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const SLIDE_HERO = 0;
  const SLIDE_ABOUT = 1;
  const SLIDE_SKILLS = 2;
  const SLIDE_PROJECTS_START = 3;
  const SLIDE_PROJECTS_END = 8;
  const SLIDE_SERVICES_START = 9;
  const SLIDE_SERVICES_END = 13;
  const SLIDE_TEST_START = 14;
  const SLIDE_TEST_END = 17;
  const SLIDE_CONTACT = 18;
  const TOTAL_SLIDES = 19;

  const [slide, setSlide] = useState(0);
  const [locked, setLocked] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [direction, setDirection] = useState(1);
  const touchStart = useRef(0);
  const cooldown = useRef(false);

  const section = () => {
    if (slide === 0) return 0;
    if (slide === 1) return 1;
    if (slide === 2) return 2;
    if (slide >= 3 && slide <= 8) return 3;
    if (slide >= 9 && slide <= 13) return 4;
    if (slide >= 14 && slide <= 17) return 5;
    return 6;
  };

  const goTo = useCallback((sectionIdx) => {
    if (cooldown.current) return;
    const targets = [0, 1, 2, 3, 9, 14, 18];
    const target = targets[sectionIdx] ?? sectionIdx;
    if (target === slide) return;
    cooldown.current = true;
    setDirection(target > slide ? 1 : -1);
    setSlide(target);
    setTimeout(() => { cooldown.current = false; }, 1400);
  }, [slide]);

  const navigate = useCallback((dir) => {
    if (cooldown.current || locked) return;
    const next = Math.max(0, Math.min(TOTAL_SLIDES - 1, slide + dir));
    if (next === slide) return;
    cooldown.current = true;
    setDirection(dir);
    setSlide(next);
    setTimeout(() => { cooldown.current = false; }, 1400);
  }, [slide, locked]);

  useEffect(() => {
    const onWheel = (e) => { e.preventDefault(); navigate(e.deltaY > 0 ? 1 : -1); };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [navigate]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  useEffect(() => {
    const onTouchStart = (e) => { touchStart.current = e.touches[0].clientY; };
    const onTouchEnd = (e) => {
      const delta = touchStart.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 40) navigate(delta > 0 ? 1 : -1);
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => { window.removeEventListener("touchstart", onTouchStart); window.removeEventListener("touchend", onTouchEnd); };
  }, [navigate]);

  const projectIdx = slide >= 3 && slide <= 8 ? slide - 3 : 0;
  const serviceIdx = slide >= 9 && slide <= 13 ? slide - 9 : 0;
  const testIdx = slide >= 14 && slide <= 17 ? slide - 14 : 0;

  const sec = section();

  const variants = {
    enter: (dir) => ({ opacity: 0, y: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, y: 0 },
    exit: (dir) => ({ opacity: 0, y: dir > 0 ? -60 : 60 }),
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-white relative select-none" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Cursor />
      <Navbar current={sec} goTo={goTo} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <SectionDots current={slide} total={TOTAL_SLIDES} goTo={(i) => navigate(i - slide)} />
      <ProgressBar current={slide} total={TOTAL_SLIDES} />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={slide} custom={direction} variants={variants} initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.65, ease }}
          className="w-full h-full absolute top-0 left-0">
          {slide === 0 && <Hero active={true} goTo={goTo} />}
          {slide === 1 && <About active={true} />}
          {slide === 2 && <Skills active={true} />}
          {slide >= 3 && slide <= 8 && <Projects active={true} projectIdx={projectIdx} total={6} />}
          {slide >= 9 && slide <= 13 && <Services active={true} serviceIdx={serviceIdx} />}
          {slide >= 14 && slide <= 17 && <Testimonials active={true} testIdx={testIdx} />}
          {slide === 18 && <Contact active={true} />}
        </motion.div>
      </AnimatePresence>

      {/* Slide counter */}
      <div className="fixed bottom-6 left-6 z-50 hidden md:flex items-center gap-2 text-xs font-mono text-gray-400">
        <span className="text-gray-900 font-semibold">{String(slide + 1).padStart(2, "0")}</span>
        <span>/</span>
        <span>{String(TOTAL_SLIDES).padStart(2, "0")}</span>
      </div>
    </div>
  );
}