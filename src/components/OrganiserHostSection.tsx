import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';

const OrganiserHostSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate distances for the exchange animation
  // Desktop: Card (340) + Gap (48) + Divider (1) + Gap (48) = 437px
  // Mobile: Card (160) + Text (~40) + Gap (32) = 232px
  const moveX = isMobile ? 0 : 437;
  const moveY = isMobile ? 232 : 0;

  return (
    <section className="py-24 bg-[#FAFAFA] relative overflow-hidden" ref={ref}>
      {/* Subtle white elliptical background glow */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        <div className="w-[90%] max-w-[1200px] h-[500px] bg-white rounded-[100%] blur-3xl opacity-80"></div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <h2 className="text-[2.5rem] font-bold text-center text-gray-900 mb-16 tracking-tight">
          Organiser & Host
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mb-12 relative">
          {/* Organiser Card */}
          <motion.div 
            className="flex flex-col items-center relative z-30"
            animate={isInView ? { 
              x: [0, moveX, 0],
              y: [0, moveY, 0],
              scale: [1, 1.05, 1],
            } : { x: 0, y: 0, scale: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] w-[340px] h-[160px] flex items-center justify-center border border-gray-100 transition-transform hover:-translate-y-1">
              {/* ELT@I Logo Recreation */}
              <div className="flex items-center gap-3 border-2 border-[#1B5E20] rounded-xl px-4 py-2 w-full h-full justify-center bg-white">
                <div className="w-12 h-12 flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path d="M12 2C12 2 7 9 7 11C7 13.5 9.5 15 12 15C14.5 15 17 13.5 17 11C17 9 12 2 12 2Z" fill="#1B5E20" />
                    <path d="M11 15V22H13V15H11Z" fill="#5D4037" />
                    <path d="M5 10C5 10 2 14 2 15.5C2 17 3.5 18 5 18C6.5 18 8 17 8 15.5C8 14 5 10 5 10Z" fill="#1B5E20" />
                    <path d="M19 10C19 10 22 14 22 15.5C22 17 20.5 18 19 18C17.5 18 16 17 16 15.5C16 14 19 10 19 10Z" fill="#1B5E20" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-serif text-[#1B5E20] font-bold tracking-wide leading-none mb-1">ELT@I</span>
                  <span className="text-[9px] text-[#B71C1C] font-bold leading-tight">
                    English Language Teachers'<br/>Association of India
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-6 text-gray-500 font-medium text-sm bg-[#FAFAFA] px-4 py-1 rounded-full">Organiser</p>
          </motion.div>

          {/* Divider (visible on md+) */}
          <motion.div 
            className="hidden md:block w-px h-24 bg-gray-200 relative z-10"
            animate={isInView ? { opacity: [1, 0, 1] } : { opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
          ></motion.div>

          {/* Host Card */}
          <motion.div 
            className="flex flex-col items-center relative z-10"
            animate={isInView ? { 
              x: [0, -moveX, 0],
              y: [0, -moveY, 0],
              scale: [1, 0.95, 1],
            } : { x: 0, y: 0, scale: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] w-[340px] h-[160px] flex items-center justify-center border border-gray-100 transition-transform hover:-translate-y-1">
              {/* MIT-ADT Logo Recreation */}
              <div className="flex items-center gap-4 bg-white">
                <div className="w-16 h-16 rounded-full border-[3px] border-[#4A148C] flex items-center justify-center text-[#4A148C] flex-shrink-0 relative">
                  <div className="absolute inset-1 border border-[#4A148C] rounded-full"></div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[8px] font-bold leading-none">MIT</span>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 my-0.5">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                      <path d="M2 17L12 22L22 17V9.5L12 14.5L2 9.5V17Z" />
                    </svg>
                    <span className="text-[6px] font-bold leading-none">ADT</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-serif text-[#4A148C] font-bold leading-none mb-1">
                    MIT-ADT<br/>UNIVERSITY
                  </span>
                  <span className="text-[10px] text-gray-700 font-medium tracking-wide mb-1 text-center">PUNE, INDIA</span>
                  <div className="w-full h-px bg-[#D4AF37] mb-1"></div>
                  <span className="text-[7px] text-gray-500 italic text-center">A leap towards World Class Education</span>
                </div>
              </div>
            </div>
            <p className="mt-6 text-gray-500 font-medium text-sm bg-[#FAFAFA] px-4 py-1 rounded-full">Host</p>
          </motion.div>
        </div>

        <p className="text-center text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
          A collaboration between India's premier English teaching association and one of the nation's most innovative universities.
        </p>
      </div>
    </section>
  );
};

export default OrganiserHostSection;
