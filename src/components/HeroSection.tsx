import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence, useMotionValueEvent } from 'motion/react';
import { ArrowRight, Calendar, MapPin, Users, Globe, Volume2, ChevronDown } from 'lucide-react';

// --- TYPES & INTERFACES ---
interface InfoCard {
  id: string;
  icon: React.ElementType;
  label: string;
  value: string;
  subtext: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'blue' | 'cyan' | 'volt';
  duration: number;
  delay: number;
}

interface CounterStat {
  id: string;
  label: string;
  endValue: number;
  suffix: string;
}

// --- CONSTANTS & DATA ---
const COLORS = {
  void: '#FAFAFA',
  abyss: '#FFFFFF',
  nebula: '#E8F5E9',
  electric: '#00C853',
  plasma: '#00B8FF',
  pulse: '#008F11',
  volt: '#CCFF00',
  white: '#111111',
  snow: '#F5F5F7',
  fog: '#4B5563',
  ghost: 'rgba(0,0,0,0.05)',
  glass: 'rgba(255,255,255,0.6)',
  glassHover: 'rgba(255,255,255,0.8)',
  borderGlow: 'rgba(0,200,83,0.3)',
  borderFaint: 'rgba(0,0,0,0.1)',
};

const INFO_CARDS: InfoCard[] = [
  { id: 'dates', icon: Calendar, label: 'DATES', value: '07–10', subtext: 'OCTOBER 2026' },
  { id: 'venue', icon: MapPin, label: 'VENUE', value: 'MIT-ADT', subtext: 'PUNE, INDIA' },
  { id: 'attendees', icon: Users, label: 'ATTENDEES', value: '2500+', subtext: 'GLOBAL EDUCATORS' },
  { id: 'edition', icon: Globe, label: 'EDITION', value: '20TH', subtext: 'INTERNATIONAL' },
];

const STATS: CounterStat[] = [
  { id: 'speakers', label: 'Global Speakers', endValue: 150, suffix: '+' },
  { id: 'sessions', label: 'Interactive Sessions', endValue: 80, suffix: '+' },
  { id: 'countries', label: 'Countries Represented', endValue: 45, suffix: '' },
];

// --- CUSTOM HOOKS ---
const useMagnetic = (ref: React.RefObject<HTMLElement | null>) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.addEventListener("mousemove", handleMouse);
    element.addEventListener("mouseleave", reset);
    return () => {
      element.removeEventListener("mousemove", handleMouse);
      element.removeEventListener("mouseleave", reset);
    };
  }, [ref]);

  return position;
};

// --- SUB-COMPONENTS ---

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) {
        setIsHovering(true);
        setHoverText("");
      } else if (target.closest('.visual-card-container')) {
        setIsHovering(true);
        setHoverText("DRAG");
      } else {
        setIsHovering(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block mix-blend-difference">
      <motion.div
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-white"
        animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      <motion.div
        className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/50"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(255,255,255,0.1)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      >
        {hoverText && (
          <span className="text-[8px] font-bold tracking-widest text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            {hoverText}
          </span>
        )}
      </motion.div>
    </div>
  );
};

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-[#00FF66] to-[#CCFF00]"
      style={{ scaleX, width: '100%' }}
    />
  );
};

const GrainCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const idata = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.05) {
          buffer32[i] = 0x08000000; // very faint dark noise
        }
      }

      ctx.putImageData(idata, 0, 0);
      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 opacity-30 mix-blend-overlay" />;
};

const OrbBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#FAFAFA]">
      {/* Nebula Orb */}
      <motion.div
        className="absolute -left-[10%] top-[10%] h-[60vw] w-[60vw] rounded-full bg-[#E8F5E9] opacity-60 blur-[120px]"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      {/* Plasma Orb */}
      <motion.div
        className="absolute -right-[10%] bottom-[10%] h-[50vw] w-[50vw] rounded-full bg-[#E1F5FE] opacity-40 blur-[150px]"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      {/* Electric Glow */}
      <motion.div
        className="absolute left-[40%] top-[40%] h-[30vw] w-[30vw] rounded-full bg-[#B9F6CA] opacity-30 blur-[100px]"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Scanlines */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px]" />
      
      {/* Radial Vignette */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#FAFAFA_100%)]" />
    </div>
  );
};

const FloatingParticles = () => {
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      type: Math.random() > 0.6 ? 'volt' : Math.random() > 0.3 ? 'cyan' : 'blue',
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.type === 'volt' ? COLORS.volt : p.type === 'cyan' ? COLORS.electric : COLORS.pulse,
            boxShadow: `0 0 ${p.size * 2}px ${p.type === 'volt' ? COLORS.volt : p.type === 'cyan' ? COLORS.electric : COLORS.pulse}`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const NAV_ITEMS = [
  { name: 'HOME', hasDropdown: false },
  { name: 'THEME', hasDropdown: true },
  { name: 'SUBMIT', hasDropdown: true },
  { name: 'PROGRAMME', hasDropdown: true },
  { name: 'HIGHLIGHTS', hasDropdown: true },
  { name: 'REGISTER', hasDropdown: true },
  { name: 'TRAVEL', hasDropdown: true },
  { name: 'ORGANIZERS', hasDropdown: true },
  { name: 'CONTACT', hasDropdown: true },
];

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-500 ${
        isScrolled ? 'bg-white/80 py-4 backdrop-blur-md border-b border-black/10' : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Left Logo */}
        <div className="flex items-center gap-2">
        </div>
        
        {/* Middle Nav Items */}
        <div className="hidden items-center gap-4 xl:gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a key={item.name} href={`#${item.name.toLowerCase()}`} className="group relative flex items-center gap-1 text-[12px] xl:text-[13px] font-bold text-gray-700 transition-colors hover:text-gray-900" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {item.name}
              {item.hasDropdown && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#00C853] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 xl:gap-6">
          <button className="relative overflow-hidden whitespace-nowrap rounded-full bg-gradient-to-r from-[#00C853] to-[#008F11] px-4 py-2 xl:px-6 text-xs xl:text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(0,200,83,0.4)] border border-transparent" style={{ fontFamily: 'Syne, sans-serif' }}>
            <span className="relative z-10">Register Now</span>
            <motion.div
              className="absolute inset-0 z-0 bg-white/20 opacity-0 transition-opacity duration-300 hover:opacity-100"
            />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

const VISUAL_CARDS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
    location: "PUNE, INDIA",
    venue: "MIT-ADT UNIVERSITY",
    month: "OCTOBER",
    date: "07-10, 2026"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=1000&auto=format&fit=crop",
    location: "GLOBAL",
    venue: "2500+ EDUCATORS",
    month: "NETWORK",
    date: "CONNECT"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop",
    location: "SESSIONS",
    venue: "80+ INTERACTIVE",
    month: "LEARN",
    date: "GROW"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop",
    location: "SPEAKERS",
    venue: "150+ EXPERTS",
    month: "INSPIRE",
    date: "LEAD"
  }
];

const VisualCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setCurrentIndex((prev) => (prev + 1) % VISUAL_CARDS.length);
  };

  const currentCard = VISUAL_CARDS[currentIndex];

  return (
    <div className="visual-card-container perspective-1000 relative flex h-full w-full items-center justify-center p-8">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative aspect-[4/3.5] w-full max-w-[1000px] rounded-2xl border border-black/10 bg-gradient-to-br from-white/80 to-gray-50/90 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-xl cursor-pointer"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 rounded-2xl border border-[#00C853]/20" style={{ transform: "translateZ(20px)" }} />
        
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-black/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 h-full w-full"
            >
              {/* Image Background */}
              <img 
                src={currentCard.image} 
                alt="Conference Visual" 
                className="absolute inset-0 h-full w-full object-cover"
                referrerPolicy="no-referrer"
                style={{ transform: "translateZ(10px) scale(1.05)" }}
              />
              
              {/* Gradient Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" style={{ transform: "translateZ(20px)" }} />

              {/* Frosted Glass Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-black/10 bg-white/40 p-4 backdrop-blur-md" style={{ transform: "translateZ(40px)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-[#008F11]" style={{ fontFamily: 'Syne, sans-serif' }}>{currentCard.location}</p>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: 'DM Sans, sans-serif' }}>{currentCard.venue}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-600" style={{ fontFamily: 'Syne, sans-serif' }}>{currentCard.month}</p>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: 'DM Sans, sans-serif' }}>{currentCard.date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

const MagneticButton = ({ children, className, onClick, style }: { children: React.ReactNode, className?: string, onClick?: () => void, style?: React.CSSProperties }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const position = useMagnetic(ref);

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      style={style}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative flex items-center justify-center overflow-hidden rounded-full ${className}`}
    >
      {children}
    </motion.button>
  );
};

// --- MAIN COMPONENT ---

export default function HeroSection() {
  useEffect(() => {
    // Inject Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:opsz,wght@9..40,400;500;700&family=Syne:wght@400;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#FAFAFA] selection:bg-[#00C853] selection:text-white flex flex-col">
      <CustomCursor />
      <ScrollProgressBar />
      <OrbBackground />
      <GrainCanvas />
      <FloatingParticles />
      <Navbar />

      <div className="relative z-20 mx-auto flex flex-1 w-full max-w-7xl flex-col justify-center px-6 pt-32 pb-8 lg:flex-row lg:items-center lg:px-12 lg:pt-32 lg:pb-8">
        
        {/* LEFT COLUMN */}
        <div className="flex w-full flex-col justify-center lg:w-[50%]">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 inline-flex w-fit items-center gap-2 sm:gap-3 rounded-full border border-black/10 bg-black/5 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm"
          >
            <motion.div
              className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#00C853]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-gray-700" style={{ fontFamily: 'Syne, sans-serif' }}>
              20TH INTERNATIONAL · 56TH ANNUAL CONFERENCE
            </span>
          </motion.div>

          {/* Headlines */}
          <div className="mb-8 flex flex-col">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl font-bold leading-[0.9] tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-[64px]"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              ENGLISH ON THE <span className="text-[#008F11] drop-shadow-[0_0_20px_rgba(0,143,17,0.2)]">EDGE:</span>
            </motion.h1>
            
            <div className="mt-2 flex flex-wrap gap-3 text-3xl font-bold leading-[0.9] tracking-tight sm:text-4xl md:text-5xl lg:text-[48px]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-gray-500 transition-all duration-300 hover:tracking-wider hover:text-gray-900"
              >
                SURVIVE?
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-gray-500 transition-all duration-300 hover:tracking-wider hover:text-gray-900"
              >
                EVOLVE?
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6, type: "spring", bounce: 0.4 }}
                className="text-[#00C853] drop-shadow-[0_0_15px_rgba(0,200,83,0.3)] transition-all duration-300 hover:tracking-wider"
              >
                THRIVE?
              </motion.span>
            </div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            The defining gathering for English language educators navigating transformation — where research meets practice, and the future of ELT takes shape.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-5"
          >
            <MagneticButton className="group bg-gradient-to-r from-[#00C853] to-[#008F11] px-6 py-3 text-xs md:text-sm font-bold text-white shadow-[0_0_30px_rgba(0,200,83,0.3)] transition-all hover:shadow-[0_0_50px_rgba(0,143,17,0.4)]" style={{ fontFamily: 'Syne, sans-serif' }}>
              <span className="relative z-10 flex items-center gap-2">
                CLAIM YOUR SEAT
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 z-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </MagneticButton>
            
            <a href="#programme" className="group relative text-xs md:text-sm font-bold text-gray-900 transition-colors hover:text-[#00C853]" style={{ fontFamily: 'Syne, sans-serif' }}>
              EXPLORE PROGRAMME
              <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#00C853] transition-all duration-300 group-hover:w-full" />
            </a>
          </motion.div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="mt-12 hidden w-full lg:mt-0 lg:flex lg:w-[50%] lg:items-center lg:justify-center">
          <VisualCard />
        </div>

      </div>

      {/* BOTTOM INFO CARDS */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pb-12 lg:px-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INFO_CARDS.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-xl border border-black/10 bg-white/60 p-4 sm:p-5 backdrop-blur-md transition-all hover:bg-white/90 hover:border-black/20 hover:shadow-lg"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#00C853] shadow-[0_0_8px_rgba(0,200,83,0.5)]" />
                  <span className="text-[10px] font-bold tracking-widest text-gray-500" style={{ fontFamily: 'Syne, sans-serif' }}>{card.label}</span>
                </div>
                <card.icon className="h-4 w-4 text-gray-400 transition-colors group-hover:text-[#00C853]" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{card.value}</span>
                <span className="text-[10px] sm:text-[11px] font-medium text-gray-600" style={{ fontFamily: 'DM Sans, sans-serif' }}>{card.subtext}</span>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#00C853] to-[#008F11] transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ambient Audio Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 right-8 z-30 hidden items-center gap-2 md:flex"
        title="Ambient Sound Active"
      >
        <div className="flex items-end gap-[2px] h-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-[#00C853]/50 rounded-t-sm"
              animate={{ height: ['20%', '100%', '40%', '80%', '20%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
            />
          ))}
        </div>
      </motion.div>

    </section>
  );
}
