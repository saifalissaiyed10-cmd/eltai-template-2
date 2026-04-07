import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const CallToActionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for the background image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  
  // Trigger animations when section comes into view
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
      <div 
        ref={containerRef}
        className="relative max-w-7xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl"
      >
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 w-full h-[130%]"
          style={{ y }}
        >
          <img 
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop" 
            alt="Conference Stage" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Gradient Overlays for readability and mood */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-[#0a0a0a]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
        
        {/* Animated Light Beams (Creative Touch) */}
        <motion.div 
          className="absolute -top-[20%] left-[20%] w-[10%] h-[150%] bg-white/5 blur-[100px] rotate-[30deg] pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3], rotate: [30, 35, 30] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -top-[20%] right-[20%] w-[15%] h-[150%] bg-[#00C853]/10 blur-[120px] -rotate-[30deg] pointer-events-none"
          animate={{ opacity: [0.2, 0.5, 0.2], rotate: [-30, -25, -30] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Content */}
        <div className="relative z-10 px-6 py-24 md:py-32 text-center flex flex-col items-center justify-center min-h-[600px]">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[#00C853] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-6 block" style={{ fontFamily: 'Syne, sans-serif' }}>
              07–10 October 2026 • Pune, India
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl leading-[1.1] tracking-tight"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Join us at ELTAI 2026 – Where English Education Meets Innovation
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mb-12 leading-relaxed"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Be part of the 20th International and 56th Annual ELTAI Conference. Connect with educators, researchers, and thought leaders shaping the future of English education.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          >
            {/* Primary Button */}
            <button className="group relative flex items-center justify-center gap-2 bg-[#00C853] text-white px-8 py-4 rounded-full font-bold overflow-hidden transition-transform hover:scale-105 shadow-[0_0_20px_rgba(0,200,83,0.3)] hover:shadow-[0_0_30px_rgba(0,200,83,0.5)] w-full sm:w-auto" style={{ fontFamily: 'Syne, sans-serif' }}>
              <span className="relative z-10 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                REGISTER NOW
              </span>
              {/* Button Hover Effect */}
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </button>

            {/* Secondary Button */}
            <button className="group relative flex items-center justify-center gap-2 bg-transparent border border-white/30 text-white px-8 py-4 rounded-full font-bold overflow-hidden transition-all hover:border-white hover:bg-white/10 w-full sm:w-auto" style={{ fontFamily: 'Syne, sans-serif' }}>
              <span className="relative z-10">
                SUBMIT ABSTRACT
              </span>
            </button>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
