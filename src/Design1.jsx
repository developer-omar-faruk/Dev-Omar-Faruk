import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  FiArrowRight, FiGithub, FiLinkedin, FiMail, FiPhone,
  FiCode, FiLayout, FiUser, FiMonitor, FiExternalLink,
  FiMenu, FiX, FiMapPin, FiSend, FiChevronDown,
  FiArrowUpRight, FiFigma, FiLayers, FiPackage,
  FiStar, FiZap, FiBriefcase, FiAward,
} from "react-icons/fi";

// ─── DATA ────────────────────────────────────────────────────────────────────
const data = {
  personal: {
    name: "Alex Monroe",
    title: "Front-End Developer",
    subtitle: "& Brand Designer",
    description:
      "Creating modern digital experiences through design, animation, and clean code. Turning ideas into elegant, high-performance interfaces.",
    email: "alex@alexmonroe.co",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    avatar: null,
  },
  stats: [
    { value: 25, suffix: "+", label: "Projects" },
    { value: 10, suffix: "+", label: "Clients" },
    { value: 2, suffix: "+", label: "Years Exp." },
    { value: 15, suffix: "+", label: "Technologies" },
  ],
  skills: {
    frontend: [
      { name: "React.js", level: 95 },
      { name: "JavaScript", level: 92 },
      { name: "HTML5 / CSS3", level: 96 },
      { name: "Tailwind CSS", level: 93 },
      { name: "Framer Motion", level: 88 },
      { name: "Next.js", level: 85 },
    ],
    design: [
      { name: "Figma", level: 94 },
      { name: "UI/UX Design", level: 91 },
      { name: "Branding", level: 89 },
      { name: "Adobe Illustrator", level: 82 },
      { name: "Adobe Photoshop", level: 80 },
      { name: "Motion Design", level: 78 },
    ],
  },
  projects: [
    {
      id: 1,
      title: "Modern Agency Website",
      category: "Web Development",
      description:
        "A high-performance creative agency website with immersive scroll animations, parallax effects, and a bold editorial layout built for maximum impact.",
      tech: ["React", "GSAP", "Tailwind CSS", "Framer Motion"],
      color: "#F5F0EB",
      accent: "#1F2937",
      demo: "#",
      github: "#",
    },
    {
      id: 2,
      title: "AI SaaS Landing Page",
      category: "UI Design & Dev",
      description:
        "A conversion-focused SaaS landing page for an AI platform, featuring animated feature reveals, pricing tables, and seamless micro-interactions.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
      color: "#EEF2F7",
      accent: "#374151",
      demo: "#",
      github: "#",
    },
    {
      id: 3,
      title: "E-Commerce Platform",
      category: "Full-Stack",
      description:
        "A premium e-commerce experience with editorial product pages, smooth cart animations, and a checkout flow optimized for conversion.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      color: "#F0EDE8",
      accent: "#1F2937",
      demo: "#",
      github: "#",
    },
    {
      id: 4,
      title: "Hospital Website",
      category: "Web Development",
      description:
        "A clean, accessible healthcare platform with appointment booking, doctor profiles, and department directories built for trust and clarity.",
      tech: ["Next.js", "Tailwind CSS", "PostgreSQL", "Prisma"],
      color: "#EDF4F0",
      accent: "#374151",
      demo: "#",
      github: "#",
    },
    {
      id: 5,
      title: "Gaming Website",
      category: "UI Design & Dev",
      description:
        "An immersive gaming hub with dynamic hero sections, tournament brackets, and real-time leaderboards for a competitive gaming community.",
      tech: ["React", "Three.js", "GSAP", "Socket.io"],
      color: "#F2F0F5",
      accent: "#1F2937",
      demo: "#",
      github: "#",
    },
    {
      id: 6,
      title: "Personal Portfolio",
      category: "Brand & Dev",
      description:
        "A fullscreen presentation-style portfolio with scroll-snap transitions, custom cursor, and editorial typography — the one you're experiencing right now.",
      tech: ["React", "Framer Motion", "GSAP", "Tailwind CSS"],
      color: "#F5F5F0",
      accent: "#374151",
      demo: "#",
      github: "#",
    },
  ],
  services: [
    {
      icon: FiMonitor,
      title: "Front-End Development",
      tagline: "Pixel-perfect implementation",
      description:
        "Building blazing-fast, accessible, and responsive web interfaces using React, Next.js, and modern CSS. Every pixel intentional, every interaction smooth.",
      features: ["React / Next.js", "Performance Optimization", "Accessibility", "Animations & Interactions"],
    },
    {
      icon: FiLayout,
      title: "UI/UX Design",
      tagline: "Design that converts",
      description:
        "Crafting intuitive, beautiful interfaces that balance aesthetics with function. From wireframes to polished high-fidelity prototypes in Figma.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    },
    {
      icon: FiPackage,
      title: "Brand Identity Design",
      tagline: "Identity that resonates",
      description:
        "Creating cohesive brand identities — logos, color palettes, typography systems, and brand guidelines that tell a compelling story.",
      features: ["Logo Design", "Color Systems", "Typography", "Brand Guidelines"],
    },
    {
      icon: FiZap,
      title: "Landing Page Design",
      tagline: "Convert visitors to customers",
      description:
        "High-converting landing pages engineered for clarity and persuasion. A/B tested layouts, compelling copy structure, and measurable CTAs.",
      features: ["Conversion Optimization", "A/B Testing", "Analytics Integration", "Fast Loading"],
    },
    {
      icon: FiBriefcase,
      title: "E-Commerce Development",
      tagline: "Stores that sell",
      description:
        "End-to-end e-commerce solutions with seamless checkout flows, inventory management, and payment integrations built for growth.",
      features: ["Shopify / Custom", "Payment Gateways", "Inventory Systems", "Analytics"],
    },
  ],
  testimonials: [
    {
      name: "Sarah Chen",
      company: "Luminary Studio",
      position: "Creative Director",
      review:
        "Alex delivered an absolutely stunning website that exceeded every expectation. The attention to animation detail and the premium feel of the final product was something we hadn't seen before. Truly world-class work.",
      rating: 5,
    },
    {
      name: "Marcus Reid",
      company: "Velocity AI",
      position: "Co-Founder & CEO",
      review:
        "Working with Alex transformed our product's online presence. The landing page conversion rate increased by 340% after the redesign. The combination of beautiful design and technical precision is rare and invaluable.",
      rating: 5,
    },
    {
      name: "Priya Nair",
      company: "Bloom Health",
      position: "Head of Product",
      review:
        "The hospital website Alex built for us brought clarity and trust to our patients. The design language was warm, accessible, and professional. Our booking requests doubled within the first month.",
      rating: 5,
    },
    {
      name: "James Okafor",
      company: "Nexora Games",
      position: "Marketing Lead",
      review:
        "The gaming website was mind-blowing. Alex captured exactly the energy of our brand and executed it flawlessly. The scroll animations and interactive elements kept users engaged far longer than our old site.",
      rating: 5,
    },
  ],
  nav: ["Home", "About", "Skills", "Projects", "Services", "Contact"],
  socials: [
    { icon: FiGithub, href: "#", label: "GitHub" },
    { icon: FiLinkedin, href: "#", label: "LinkedIn" },
    { icon: FiMail, href: "#", label: "Email" },
  ],
};

// ─── SECTIONS ORDER ───────────────────────────────────────────────────────────
const TOTAL_PROJECTS = data.projects.length;
const TOTAL_SERVICES = data.services.length;
const TOTAL_TESTIMONIALS = data.testimonials.length;

const SECTION_HERO = 0;
const SECTION_ABOUT = 1;
const SECTION_SKILLS = 2;
const SECTION_PROJECTS_START = 3;
const SECTION_PROJECTS_END = SECTION_PROJECTS_START + TOTAL_PROJECTS - 1;
const SECTION_SERVICES_START = SECTION_PROJECTS_END + 1;
const SECTION_SERVICES_END = SECTION_SERVICES_START + TOTAL_SERVICES - 1;
const SECTION_TESTIMONIALS_START = SECTION_SERVICES_END + 1;
const SECTION_TESTIMONIALS_END = SECTION_TESTIMONIALS_START + TOTAL_TESTIMONIALS - 1;
const SECTION_CONTACT = SECTION_TESTIMONIALS_END + 1;
const TOTAL_SLIDES = SECTION_CONTACT + 1;

function getSectionName(slide) {
  if (slide === SECTION_HERO) return "Home";
  if (slide === SECTION_ABOUT) return "About";
  if (slide === SECTION_SKILLS) return "Skills";
  if (slide >= SECTION_PROJECTS_START && slide <= SECTION_PROJECTS_END) return "Projects";
  if (slide >= SECTION_SERVICES_START && slide <= SECTION_SERVICES_END) return "Services";
  if (slide >= SECTION_TESTIMONIALS_START && slide <= SECTION_TESTIMONIALS_END) return "Testimonials";
  if (slide === SECTION_CONTACT) return "Contact";
  return "";
}

function getNavIndex(slide) {
  if (slide === SECTION_HERO) return 0;
  if (slide === SECTION_ABOUT) return 1;
  if (slide === SECTION_SKILLS) return 2;
  if (slide >= SECTION_PROJECTS_START && slide <= SECTION_PROJECTS_END) return 3;
  if (slide >= SECTION_SERVICES_START && slide <= SECTION_SERVICES_END) return 4;
  if (slide === SECTION_CONTACT) return 5;
  return -1;
}

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
    };
    const over = (e) => { if (e.target.closest("a,button,[data-cursor]")) setHovered(true); };
    const out = () => setHovered(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    let raf;
    const loop = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.12;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerPos.current.x - 20}px, ${followerPos.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-gray-900 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75" style={{ willChange: "transform" }} />
      <div ref={followerRef} className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-gray-400 transition-all duration-200 ${hovered ? "w-12 h-12 bg-gray-900/10" : "w-10 h-10 bg-transparent"}`} style={{ willChange: "transform" }} />
    </>
  );
}

// ─── SCROLL PROGRESS ─────────────────────────────────────────────────────────
function ScrollProgress({ current, total }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-1.5 hidden md:flex">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`rounded-full transition-all duration-500 ${i === current ? "w-1.5 h-4 bg-gray-900" : "w-1 h-1.5 bg-gray-300"}`} />
      ))}
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ currentSlide, onNavigate }) {
  const [open, setOpen] = useState(false);
  const activeIdx = getNavIndex(currentSlide);
  const navTargets = [SECTION_HERO, SECTION_ABOUT, SECTION_SKILLS, SECTION_PROJECTS_START, SECTION_SERVICES_START, SECTION_CONTACT];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between backdrop-blur-md bg-white/80 border-b border-gray-100">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="font-semibold text-gray-900 tracking-tight text-lg cursor-pointer" onClick={() => onNavigate(SECTION_HERO)}>
          Alex<span className="text-gray-400">.</span>
        </motion.div>
        <div className="hidden md:flex items-center gap-8">
          {data.nav.map((item, i) => (
            <button key={item} onClick={() => onNavigate(navTargets[i])} className={`text-sm font-medium transition-all duration-300 relative ${activeIdx === i ? "text-gray-900" : "text-gray-400 hover:text-gray-700"}`}>
              {item}
              {activeIdx === i && <motion.div layoutId="nav-indicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />}
            </button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          {data.socials.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-all duration-200">
              <Icon size={15} />
            </a>
          ))}
        </div>
        <button onClick={() => setOpen(true)} className="md:hidden w-9 h-9 flex items-center justify-center text-gray-700">
          <FiMenu size={20} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white flex flex-col px-8 py-6">
            <div className="flex items-center justify-between mb-12">
              <span className="font-semibold text-gray-900 text-lg">Alex<span className="text-gray-400">.</span></span>
              <button onClick={() => setOpen(false)} className="w-9 h-9 flex items-center justify-center"><FiX size={20} /></button>
            </div>
            <div className="flex flex-col gap-6 flex-1">
              {data.nav.map((item, i) => (
                <motion.button key={item} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} onClick={() => { onNavigate(navTargets[i]); setOpen(false); }} className={`text-left text-3xl font-semibold transition-colors ${activeIdx === i ? "text-gray-900" : "text-gray-300"}`}>
                  {item}
                </motion.button>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              {data.socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500"><Icon size={16} /></a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection({ isActive }) {
  const floatRef = useRef(null);
  useEffect(() => {
    if (!floatRef.current) return;
    gsap.to(floatRef.current, { y: -18, duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-[#FAFAFA]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gray-100 blur-3xl opacity-80" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-gray-50 blur-3xl opacity-60" />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-gray-100/50 blur-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-20">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* LEFT */}
          <div className="flex-1 text-center md:text-left">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-xs text-gray-500 font-medium mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available for new projects
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.2 }} className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight mb-2">
              Front-End
            </motion.h1>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.3 }} className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-300 leading-[1.05] tracking-tight mb-2">
              Developer
            </motion.h1>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.35 }} className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight mb-6">
              & Designer.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }} className="text-gray-500 text-base md:text-lg max-w-lg leading-relaxed mb-8">
              {data.personal.description}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.65 }} className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button className="px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-all duration-300 flex items-center gap-2 group shadow-lg shadow-gray-900/10">
                View Projects <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-6 py-3 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:border-gray-400 transition-all duration-300 flex items-center gap-2 shadow-sm">
                Contact Me
              </button>
            </motion.div>
          </div>

          {/* RIGHT – Avatar */}
          <motion.div ref={floatRef} initial={{ opacity: 0, scale: 0.85 }} animate={isActive ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1, delay: 0.3 }} className="relative flex-shrink-0">
            <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200 animate-spin" style={{ animationDuration: "20s" }} />
              <div className="absolute inset-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl shadow-gray-200/80 flex items-center justify-center overflow-hidden border border-gray-100">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-50 to-white flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-3">
                      <FiUser size={32} className="text-gray-400" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">{data.personal.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Dev & Designer</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 top-8 bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100 text-xs font-medium text-gray-700 flex items-center gap-1.5">
                <FiCode size={12} className="text-gray-500" /> React Expert
              </div>
              <div className="absolute -left-4 bottom-8 bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100 text-xs font-medium text-gray-700 flex items-center gap-1.5">
                <FiFigma size={12} className="text-gray-500" /> UI Designer
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────
function CountUp({ target, suffix, isActive }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); } else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [isActive, target]);
  return <>{count}{suffix}</>;
}

function AboutSection({ isActive }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-gray-50 rounded-bl-[80px]" />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center h-full">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : {}} transition={{ duration: 0.6 }} className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">About Me</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
              Crafting digital<br /><span className="text-gray-300">experiences</span><br />with purpose.
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.25 }} className="text-gray-500 leading-relaxed text-sm md:text-base mb-4">
              I'm a Front-End Developer and Brand Designer with a deep passion for building beautiful, functional interfaces. My work sits at the intersection of engineering precision and design intuition.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.35 }} className="text-gray-400 leading-relaxed text-sm md:text-base mb-8">
              With 2+ years of hands-on experience, I've partnered with startups, agencies, and independent founders to bring their visions to life — one pixel at a time.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.45 }} className="flex flex-wrap gap-3">
              {["Design Systems", "Pixel Perfect", "Accessibility", "Performance"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-600 bg-gray-50">{tag}</span>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {data.stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={isActive ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.15 + i * 0.1 }} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {isActive ? <CountUp target={stat.value} suffix={stat.suffix} isActive={isActive} /> : `0${stat.suffix}`}
                </div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.55 }} className="col-span-2 bg-gray-900 rounded-2xl p-6 text-white">
              <FiAward size={20} className="mb-3 opacity-60" />
              <p className="text-sm font-medium mb-1">Based in San Francisco</p>
              <p className="text-gray-400 text-xs">Open to remote collaborations worldwide</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SKILLS SECTION ───────────────────────────────────────────────────────────
function SkillBar({ name, level, isActive, delay }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        <span className="text-xs text-gray-400">{level}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={isActive ? { width: `${level}%` } : { width: 0 }} transition={{ duration: 1, delay, ease: "easeOut" }} className="h-full bg-gray-900 rounded-full" />
      </div>
    </div>
  );
}

function SkillsSection({ isActive }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#FAFAFA] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-tr-[80px] bg-white" />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-8">
        <motion.p initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : {}} transition={{ duration: 0.6 }} className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3 text-center">My Expertise</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-10 tracking-tight">
          Skills & <span className="text-gray-300">Tools</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isActive ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <FiCode size={16} className="text-gray-400" />
              <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Frontend</h3>
            </div>
            {data.skills.frontend.map((s, i) => <SkillBar key={s.name} {...s} isActive={isActive} delay={0.3 + i * 0.08} />)}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isActive ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.25 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <FiFigma size={16} className="text-gray-400" />
              <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Design</h3>
            </div>
            {data.skills.design.map((s, i) => <SkillBar key={s.name} {...s} isActive={isActive} delay={0.35 + i * 0.08} />)}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── PROJECT SECTION ──────────────────────────────────────────────────────────
function ProjectSection({ project, index, total, isActive }) {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden" style={{ background: project.color }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-white/20 rounded-bl-[120px]" />
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-8">
        <div className="flex items-center justify-between mb-8">
          <motion.p initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : {}} transition={{ duration: 0.5 }} className="text-xs font-semibold tracking-widest text-gray-400 uppercase">Selected Work</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : {}} transition={{ duration: 0.5 }} className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-gray-300 text-lg">/</span>
            <span className="text-gray-400 text-base">{String(total).padStart(2, "0")}</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div key={`img-${project.id}`} initial={{ opacity: 0, scale: 0.92, x: -30 }} animate={isActive ? { opacity: 1, scale: 1, x: 0 } : {}} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="relative">
            <div className="bg-white rounded-2xl shadow-2xl shadow-gray-900/10 overflow-hidden border border-gray-100">
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
                <div className="ml-3 flex-1 bg-gray-100 rounded-md h-5 flex items-center px-2">
                  <span className="text-[10px] text-gray-400 truncate">https://{project.title.toLowerCase().replace(/ /g, "-")}.com</span>
                </div>
              </div>
              <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <FiMonitor size={40} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-400 font-medium">{project.title}</p>
                  <p className="text-xs text-gray-300 mt-1">{project.category}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div>
            <motion.p key={`cat-${project.id}`} initial={{ opacity: 0, y: 10 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">{project.category}</motion.p>
            <motion.h2 key={`title-${project.id}`} initial={{ opacity: 0, y: 25 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.15 }} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">{project.title}</motion.h2>
            <motion.p key={`desc-${project.id}`} initial={{ opacity: 0, y: 15 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.25 }} className="text-gray-500 leading-relaxed text-sm md:text-base mb-6">{project.description}</motion.p>
            <motion.div key={`tech-${project.id}`} initial={{ opacity: 0, y: 15 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.35 }} className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-white/70 border border-gray-200 text-xs font-medium text-gray-600 backdrop-blur-sm">{t}</span>
              ))}
            </motion.div>
            <motion.div key={`btns-${project.id}`} initial={{ opacity: 0, y: 15 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.45 }} className="flex gap-3">
              <a href={project.demo} className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-all duration-300 flex items-center gap-2 group">
                Live Demo <FiExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a href={project.github} className="px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:border-gray-400 transition-all duration-300 flex items-center gap-2">
                <FiGithub size={14} /> Code
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SERVICE SECTION ──────────────────────────────────────────────────────────
function ServiceSection({ service, index, total, isActive }) {
  const Icon = service.icon;
  return (
    <div className="w-full h-full flex items-center justify-center bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
        <div className="h-full bg-gray-900 transition-all duration-500" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 pt-24 text-center">
        <motion.div initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : {}} transition={{ duration: 0.5 }} className="flex items-center justify-center gap-2 mb-6">
          <span className="text-xs font-semibold tracking-widest text-gray-300 uppercase">Service {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={isActive ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.1 }} className="w-16 h-16 mx-auto rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 shadow-sm">
          <Icon size={24} className="text-gray-700" />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">{service.tagline}</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 25 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.25 }} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">{service.title}</motion.h2>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.35 }} className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">{service.description}</motion.p>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.45 }} className="flex flex-wrap gap-3 justify-center">
          {service.features.map((f) => (
            <span key={f} className="px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm font-medium text-gray-600 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gray-400" />{f}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─── TESTIMONIAL SECTION ──────────────────────────────────────────────────────
function TestimonialSection({ testimonial, index, total, isActive }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#FAFAFA] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-24 text-[20vw] font-bold text-gray-100/60 select-none leading-none">"</div>
      </div>
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-12 pt-24 text-center">
        <motion.p initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : {}} transition={{ duration: 0.5 }} className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-8">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={isActive ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.1 }} className="flex justify-center mb-4">
          {[...Array(testimonial.rating)].map((_, i) => <FiStar key={i} size={16} className="text-gray-900 fill-gray-900 mx-0.5" />)}
        </motion.div>
        <motion.blockquote initial={{ opacity: 0, y: 25 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.2 }} className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-800 leading-relaxed mb-10 tracking-tight">
          "{testimonial.review}"
        </motion.blockquote>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.4 }} className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <FiUser size={20} className="text-gray-400" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
            <p className="text-gray-400 text-xs">{testimonial.position} · {testimonial.company}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
function ContactSection({ isActive }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="w-full h-full flex items-center justify-center bg-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[45vw] h-[45vh] bg-gray-50 rounded-tl-[80px]" />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-8 overflow-y-auto max-h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : {}} transition={{ duration: 0.5 }} className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">Get In Touch</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 25 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              Let's Build<br />Something<br /><span className="text-gray-300">Amazing.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.25 }} className="text-gray-400 text-sm leading-relaxed mb-8">
              Have a project in mind? I'd love to hear about it. Let's create something extraordinary together.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.35 }} className="space-y-4">
              {[
                { icon: FiMail, value: data.personal.email },
                { icon: FiPhone, value: data.personal.phone },
                { icon: FiMapPin, value: data.personal.location },
              ].map(({ icon: Icon, value }) => (
                <div key={value} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                    <Icon size={14} className="text-gray-500" />
                  </div>
                  <span className="text-sm text-gray-600">{value}</span>
                </div>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.5 }} className="flex gap-3 mt-8">
              {data.socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isActive ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center mb-4">
                  <FiSend size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-sm">I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Name</label>
                    <input required placeholder="Your name" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:border-gray-400 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
                    <input required type="email" placeholder="your@email.com" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:border-gray-400 focus:bg-white transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Project Type</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 bg-gray-50 focus:outline-none focus:border-gray-400 focus:bg-white transition-all">
                    <option>Web Development</option>
                    <option>UI/UX Design</option>
                    <option>Brand Identity</option>
                    <option>Landing Page</option>
                    <option>E-Commerce</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Budget</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 bg-gray-50 focus:outline-none focus:border-gray-400 focus:bg-white transition-all">
                    <option>$500 – $1,000</option>
                    <option>$1,000 – $3,000</option>
                    <option>$3,000 – $7,000</option>
                    <option>$7,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Message</label>
                  <textarea required rows={4} placeholder="Tell me about your project..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:border-gray-400 focus:bg-white transition-all resize-none" />
                </div>
                <button type="submit" className="w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-gray-900/15">
                  Send Message <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
function SectionLabel({ slide }) {
  const name = getSectionName(slide);
  return (
    <AnimatePresence mode="wait">
      <motion.div key={slide} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }} className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">{name}</span>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isTransitioning = useRef(false);
  const touchStartY = useRef(0);

  const goToSlide = useCallback((next) => {
    if (isTransitioning.current) return;
    const clamped = Math.max(0, Math.min(TOTAL_SLIDES - 1, next));
    if (clamped === currentSlide) return;
    isTransitioning.current = true;
    setCurrentSlide(clamped);
    setTimeout(() => { isTransitioning.current = false; }, 1400);
  }, [currentSlide]);

  const handleNav = useCallback((target) => {
    isTransitioning.current = false;
    setCurrentSlide(target);
    setTimeout(() => { isTransitioning.current = false; }, 1400);
  }, []);

  // Wheel
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      if (isTransitioning.current) return;
      if (e.deltaY > 0) goToSlide(currentSlide + 1);
      else if (e.deltaY < 0) goToSlide(currentSlide - 1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [currentSlide, goToSlide]);

  // Touch
  useEffect(() => {
    const onStart = (e) => { touchStartY.current = e.touches[0].clientY; };
    const onEnd = (e) => {
      if (isTransitioning.current) return;
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goToSlide(currentSlide + 1);
        else goToSlide(currentSlide - 1);
      }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => { window.removeEventListener("touchstart", onStart); window.removeEventListener("touchend", onEnd); };
  }, [currentSlide, goToSlide]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (isTransitioning.current) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goToSlide(currentSlide + 1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") goToSlide(currentSlide - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentSlide, goToSlide]);

  const slides = [
    <HeroSection isActive={currentSlide === 0} />,
    <AboutSection isActive={currentSlide === 1} />,
    <SkillsSection isActive={currentSlide === 2} />,
    ...data.projects.map((p, i) => (
      <ProjectSection key={`proj-${p.id}`} project={p} index={i} total={TOTAL_PROJECTS} isActive={currentSlide === SECTION_PROJECTS_START + i} />
    )),
    ...data.services.map((s, i) => (
      <ServiceSection key={`svc-${i}`} service={s} index={i} total={TOTAL_SERVICES} isActive={currentSlide === SECTION_SERVICES_START + i} />
    )),
    ...data.testimonials.map((t, i) => (
      <TestimonialSection key={`test-${i}`} testimonial={t} index={i} total={TOTAL_TESTIMONIALS} isActive={currentSlide === SECTION_TESTIMONIALS_START + i} />
    )),
    <ContactSection isActive={currentSlide === SECTION_CONTACT} />,
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <CustomCursor />
      <Navbar currentSlide={currentSlide} onNavigate={handleNav} />
      <ScrollProgress current={currentSlide} total={TOTAL_SLIDES} />
      <SectionLabel slide={currentSlide} />

      <div className="w-full h-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {slides[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>

      {currentSlide < TOTAL_SLIDES - 1 && (
        <motion.button
          onClick={() => goToSlide(currentSlide + 1)}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="fixed bottom-6 right-6 md:right-12 w-9 h-9 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-400 transition-all z-50 shadow-sm"
        >
          <FiChevronDown size={16} />
        </motion.button>
      )}
    </div>
  );
}