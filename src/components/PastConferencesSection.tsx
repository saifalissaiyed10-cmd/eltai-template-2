import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const PastConferencesSection = () => {
  const images = [
    "https://picsum.photos/seed/conf1/800/600",
    "https://picsum.photos/seed/conf2/800/600",
    "https://picsum.photos/seed/conf3/800/600",
    "https://picsum.photos/seed/conf4/800/600",
    "https://picsum.photos/seed/conf5/800/600",
  ];

  // Duplicate for seamless loop (3 sets to ensure it fills wide screens and loops cleanly)
  // The animation will translate by -33.3333% which is exactly one set.
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-3">
              Looking Back
            </h3>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Our Past Conferences
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Moments and milestones from our previous conference editions.
            </p>
          </div>
          
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-gray-600 transition-colors group"
          >
            VIEW FULL GALLERY
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex overflow-hidden">
        {/* Left/Right Gradient Masks for smooth fade out */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div 
          className="flex gap-4 md:gap-6 w-max animate-marquee hover:[animation-play-state:paused]"
        >
          {duplicatedImages.map((src, index) => (
            <motion.div 
              key={index}
              className="relative w-[260px] md:w-[350px] lg:w-[420px] aspect-[4/3] flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer group"
              whileHover={{ scale: 0.97 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <img 
                src={src} 
                alt={`Conference moment ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              {/* Subtle overlay that fades out on hover */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastConferencesSection;
