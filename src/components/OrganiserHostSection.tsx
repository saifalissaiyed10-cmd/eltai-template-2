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
              {/* ELT@I Logo */}
              <div className="flex items-center justify-center w-full h-full bg-white rounded-xl overflow-hidden">
                <img src="/eltai-logo.png" alt="ELT@I Logo" className="w-full h-full object-contain p-2" />
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
              {/* MIT-ADT Logo */}
              <div className="flex items-center justify-center w-full h-full bg-white rounded-xl overflow-hidden">
                <img src="/mit-adt-logo.png" alt="MIT-ADT University Logo" className="w-full h-full object-contain p-2" />
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
