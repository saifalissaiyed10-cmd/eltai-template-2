import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { DownloadCloud } from 'lucide-react';

// --- DESIGN TOKENS ---
const COLORS = {
  bg:          '#FAFAFA',
  bgCard:      '#FFFFFF',
  green:       '#00C853',   // primary electric green
  greenDim:    'rgba(0,200,83,0.6)',
  greenGhost:  'rgba(0,200,83,0.06)',
  white:       '#111111',
  fog:         'rgba(0,0,0,0.65)',
  ghost:       'rgba(0,0,0,0.25)',
  border:      'rgba(0,0,0,0.1)',
  borderFaint: 'rgba(0,0,0,0.05)',
} as const;

// --- TYPESCRIPT INTERFACES ---
interface StatItem {
  id: number;
  value: number;
  suffix: string;
  label: string;
}

interface FloatingShape {
  id: number;
  type: 'hexagon' | 'diamond' | 'circle';
  x: string;
  y: string;
  size: number;
  duration: number;
}

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  delay: number;
  duration: number;
}

const STATS: StatItem[] = [
  { id: 1, value: 56,   suffix: 'th', label: 'Annual Edition' },
  { id: 2, value: 1200, suffix: '+',  label: 'Attendees'      },
  { id: 3, value: 30,   suffix: '+',  label: 'Countries'      },
];

// --- SUB-COMPONENTS ---

const CelebrationConfetti: React.FC<{ active: boolean }> = ({ active }) => {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    if (active) {
      const colors = ['#00C853', '#CCFF00', '#008F11', '#B9F6CA', '#FAFAFA'];
      const newParticles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        delay: Math.random() * 0.5,
        duration: Math.random() * 2 + 1.5,
      }));
      setParticles(newParticles);
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: p.color !== '#FAFAFA' ? `0 0 10px ${p.color}80` : 'none',
          }}
          initial={{ opacity: 0, scale: 0, y: 50, rotate: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0.5],
            y: [-50, -150 - Math.random() * 100],
            x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
            rotate: [0, p.rotation + 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

const StatCounter: React.FC<{ stat: StatItem; active: boolean }> = ({ stat, active }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (active) {
      const duration = stat.id === 1 ? 1.5 : stat.id === 2 ? 2 : 1.2;
      const controls = animate(0, stat.value, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (value) => {
          setCount(Math.floor(value));
        }
      });
      return () => controls.stop();
    }
  }, [active, stat.value, stat.id]);

  return <>{count}</>;
};

const VisualCard: React.FC<{ isInView: boolean }> = ({ isInView }) => {
  return (
    <motion.div
      initial={{ x: -80, opacity: 0, scale: 0.92 }}
      animate={isInView ? { x: 0, opacity: 1, scale: 1 } : { x: -80, opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="w-full relative"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full aspect-[4/3] lg:aspect-[3/4] rounded-[20px] overflow-hidden flex flex-col"
        style={{
          background: COLORS.bgCard,
          border: `1px solid ${COLORS.border}`,
          boxShadow: `0 0 60px rgba(0,0,0,0.05)`
        }}
      >
        {/* Pulsing Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-[20px] pointer-events-none z-10"
          animate={{ boxShadow: ['0 0 20px rgba(0,200,83,0.05)', '0 0 50px rgba(0,200,83,0.15)', '0 0 20px rgba(0,200,83,0.05)'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* TOP AREA (60%) - Image */}
        <div className="relative h-[60%] w-full overflow-hidden bg-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" 
            alt="Conference Event" 
            className="w-full h-full object-cover mix-blend-multiply opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#00C853] mix-blend-overlay opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          <span className="absolute top-6 left-6 z-10 text-sm tracking-[0.3em]" style={{ fontFamily: 'Syne, sans-serif', color: COLORS.green }}>EST. 1969</span>
        </div>

        {/* BOTTOM PANEL (40%) */}
        <div className="relative h-[40%] w-full p-6 flex flex-col justify-between z-20" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', borderTop: `1px solid ${COLORS.border}` }}>
          <div>
            <h3 className="text-[42px] leading-none text-gray-900" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>ELTAI</h3>
            <p className="text-[13px]" style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(0,0,0,0.5)' }}>Annual Conference</p>
          </div>
          
          <div className="flex items-center justify-between w-full">
            {STATS.map((stat, i) => (
              <React.Fragment key={stat.id}>
                <div className="flex flex-col">
                  <span className="text-[28px] leading-none" style={{ fontFamily: 'Bebas Neue, sans-serif', color: COLORS.green }}>
                    <StatCounter stat={stat} active={isInView} />{stat.suffix}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.1em]" style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(0,0,0,0.5)' }}>{stat.label}</span>
                </div>
                {i < STATS.length - 1 && <div className="w-[1px] h-8" style={{ background: 'rgba(0,0,0,0.1)' }} />}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <motion.div 
              animate={{ opacity: [1, 0.3, 1] }} 
              transition={{ duration: 2, repeat: Infinity }} 
              className="w-1 h-1 rounded-full"
              style={{ background: COLORS.green }}
            />
            <span className="text-[11px] tracking-[0.12em]" style={{ fontFamily: 'Syne, sans-serif', color: 'rgba(0,0,0,0.5)' }}>Pune, Maharashtra · Oct 2026</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---

const AboutSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-100px" });

  useEffect(() => {
    // Inject Fonts (check if already loaded by hero to avoid duplicates)
    if (!document.getElementById('eltai-fonts')) {
      const link = document.createElement('link');
      link.id = 'eltai-fonts';
      link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:opsz,wght@9..40,400;500;600&family=Syne:wght@400;600;700;800&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden px-[5vw] pt-[100px] pb-[60px] lg:px-[8vw] lg:pt-[140px] lg:pb-[100px]" style={{ background: COLORS.bg }}>
      
      {/* CELEBRATION EFFECTS */}
      <CelebrationConfetti active={isInView} />

      {/* BACKGROUND DECORATION */}
      {/* LAYER 1 — Horizontal scan lines */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.02) 3px, rgba(0,0,0,0.02) 4px)' }} />
      
      {/* LAYER 2 — Large ghost text watermark */}
      <div className="absolute right-0 md:right-4 -bottom-[20px] md:-bottom-[40px] pointer-events-none select-none z-0 text-[120px] sm:text-[180px] md:text-[250px] lg:text-[300px] leading-none" style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'rgba(0,0,0,0.03)' }}>
        ELTAI
      </div>
      
      {/* LAYER 3 — Green corner glow (top-right) */}
      <div className="absolute -top-[100px] -right-[100px] w-[400px] h-[400px] pointer-events-none z-0 blur-[60px]" style={{ background: 'radial-gradient(circle, rgba(0,200,83,0.06) 0%, transparent 70%)' }} />
      
      {/* LAYER 4 — Subtle green glow (bottom-left behind card) */}
      <div className="absolute bottom-0 -left-[50px] w-[300px] h-[300px] pointer-events-none z-0 blur-[50px]" style={{ background: 'radial-gradient(circle, rgba(0,200,83,0.04) 0%, transparent 70%)' }} />

      <div className="relative z-10 mx-auto flex flex-col lg:flex-row gap-12 lg:gap-0 max-w-[1400px]">
        
        {/* LEFT COLUMN */}
        <div className="w-full lg:w-[45%]">
          <VisualCard isInView={isInView} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-[55%] lg:pl-[60px] flex flex-col justify-center">
          
          {/* SECTION TAG */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center mb-6"
          >
            <motion.span 
              initial={{ width: 0 }}
              animate={isInView ? { width: 30 } : { width: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-block h-[1px] mr-3 align-middle"
              style={{ background: COLORS.green }}
            />
            <span className="text-[11px] uppercase tracking-[0.2em]" style={{ fontFamily: 'Syne, sans-serif', color: COLORS.green }}>
              ELTAI ANNUAL CONFERENCE 2026
            </span>
          </motion.div>

          {/* MAIN HEADING */}
          <div className="mb-8 flex flex-col">
            <motion.h2
              initial={{ y: 40, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[40px] lg:text-[52px] leading-[0.95] text-gray-900 tracking-[0.02em]"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              FIVE DECADES OF
            </motion.h2>
            <motion.h2
              initial={{ y: 40, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[40px] lg:text-[52px] leading-[0.95] tracking-[0.02em]"
              style={{ fontFamily: 'Bebas Neue, sans-serif', color: COLORS.green }}
            >
              <motion.span
                animate={isInView ? { textShadow: ['0 0 0px rgba(0,200,83,0)', '0 0 30px rgba(0,200,83,0.4)', '0 0 0px rgba(0,200,83,0)'] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                SHAPING ELT
              </motion.span>
            </motion.h2>
          </div>

          {/* BODY TEXT */}
          <div className="flex flex-col gap-4 max-w-[560px]" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', lineHeight: '1.85', color: COLORS.fog }}>
            <motion.p
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              animate={isInView ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : { clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              For over five decades, ELTAI Annual Conferences have stood as landmark events in the journey of English language and literature education in India. Bringing together teachers, scholars, researchers, and practitioners from across the nation and beyond, these conferences celebrate shared learning, collective wisdom, and the enduring spirit of the teaching community.
            </motion.p>
            <motion.p
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              animate={isInView ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : { clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Each year, ELTAI creates spaces for dialogue through inspiring keynote addresses, engaging workshops, research presentations, creative sessions, and exhibitions of innovative educational resources.
            </motion.p>
            <motion.p
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              animate={isInView ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : { clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              The 20th International and 56th Annual ELTAI Conference, themed <span style={{ color: COLORS.green, fontStyle: 'italic' }}>"English on the Edge: Survive? Evolve? Thrive?"</span>, will be hosted by the School of Humanities and the School of Holistic Development, MIT Art, Design & Technology University, Pune, from <span className="font-medium text-gray-900">07 to 10 October 2026</span>.
            </motion.p>
            <motion.p
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              animate={isInView ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : { clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              As ELTAI continues its legacy of nurturing teachers, promoting reading cultures, and advancing English education across diverse contexts, ELTAI 2026 invites you to come together in Pune — the <span style={{ color: 'rgba(0,200,83,0.8)' }}>Oxford of the East</span> — to reflect, reimagine, and reaffirm our shared commitment to the future of English education.
            </motion.p>
          </div>

          {/* DIVIDER LINE */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-[1px] my-7 origin-left"
            style={{ background: COLORS.border }}
          />

          {/* DOWNLOAD BUTTONS ROW */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              whileHover="hover"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-[6px] px-7 py-3.5 transition-all duration-300 bg-[#00C853] hover:bg-[#008F11] hover:shadow-[0_0_30px_rgba(0,200,83,0.5)] hover:scale-[1.03] text-white"
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '14px', letterSpacing: '0.06em' }}
            >
              <motion.div variants={{ hover: { y: [0, -3, 0], transition: { duration: 0.4, repeat: Infinity } } }}>
                <DownloadCloud size={16} />
              </motion.div>
              Download Brochure
            </motion.button>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="group w-full sm:w-auto flex items-center justify-center gap-2 rounded-[6px] px-7 py-3.5 transition-all duration-300 bg-transparent hover:bg-[rgba(0,200,83,0.06)] border border-[rgba(0,0,0,0.1)] hover:border-[#00C853] text-gray-600 hover:text-gray-900"
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 400, fontSize: '14px' }}
            >
              <DownloadCloud size={16} className="text-[rgba(0,200,83,0.6)] transition-colors duration-300 group-hover:text-[#00C853]" />
              Download Flyer
            </motion.button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;
