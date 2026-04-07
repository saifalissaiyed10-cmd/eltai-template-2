import React from 'react';
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#00C853] text-white/90 pt-16 pb-8 px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_2fr_1fr] gap-12 lg:gap-8">
          
          {/* Column 1: ELT@I */}
          <div className="flex flex-col">
            {/* ELT@I Logo Pill */}
            <div className="bg-white rounded-lg px-3 py-2 inline-flex items-center gap-3 w-fit mb-6">
              <div className="w-10 h-10 flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path d="M12 2C12 2 7 9 7 11C7 13.5 9.5 15 12 15C14.5 15 17 13.5 17 11C17 9 12 2 12 2Z" fill="#1B5E20" />
                  <path d="M11 15V22H13V15H11Z" fill="#5D4037" />
                  <path d="M5 10C5 10 2 14 2 15.5C2 17 3.5 18 5 18C6.5 18 8 17 8 15.5C8 14 5 10 5 10Z" fill="#1B5E20" />
                  <path d="M19 10C19 10 22 14 22 15.5C22 17 20.5 18 19 18C17.5 18 16 17 16 15.5C16 14 19 10 19 10Z" fill="#1B5E20" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif text-[#1B5E20] font-bold tracking-wide leading-none mb-0.5">ELT@I</span>
                <span className="text-[7px] text-[#B71C1C] font-bold leading-tight">
                  English Language Teachers'<br/>Association of India
                </span>
              </div>
            </div>

            <h4 className="font-bold text-white mb-3 text-[15px]">English Language Teachers' Association of India</h4>
            <div className="flex flex-col space-y-2 text-[14px] text-white/80">
              <p>D-54 Third Floor, Anandham Apartments</p>
              <p>156, SIDCO Nagar Main Road</p>
              <p>Villivakkam, Chennai - 600 049, India</p>
            </div>
          </div>

          {/* Column 2: MIT-ADT */}
          <div className="flex flex-col">
            {/* MIT-ADT Logo Pill */}
            <div className="bg-white rounded-lg px-4 py-2 inline-flex items-center gap-4 w-fit mb-6">
              <div className="w-12 h-12 rounded-full border-[2px] border-[#4A148C] flex items-center justify-center text-[#4A148C] flex-shrink-0 relative">
                <div className="absolute inset-0.5 border border-[#4A148C] rounded-full"></div>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-[6px] font-bold leading-none">MIT</span>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 my-0.5">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                    <path d="M2 17L12 22L22 17V9.5L12 14.5L2 9.5V17Z" />
                  </svg>
                  <span className="text-[5px] font-bold leading-none">ADT</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-serif text-[#4A148C] font-bold leading-none mb-1">
                  MIT-ADT<br/>UNIVERSITY
                </span>
                <span className="text-[7px] text-gray-700 font-medium tracking-wide mb-0.5 text-center">PUNE, INDIA</span>
                <div className="w-full h-px bg-[#D4AF37] mb-0.5"></div>
                <span className="text-[5px] text-gray-500 italic text-center">A leap towards World Class Education</span>
              </div>
            </div>

            <h4 className="font-bold text-white mb-3 text-[15px]">School of Humanities & School of Holistic Development</h4>
            <div className="flex flex-col space-y-2 text-[14px] text-white/80">
              <p>MIT Art, Design & Technological University</p>
              <p>Pune, Maharashtra, India</p>
            </div>
          </div>

          {/* Column 3: Join Us */}
          <div className="flex flex-col">
            <h4 className="font-bold text-white mb-6 text-[15px]">Join Us</h4>
            <div className="flex items-center gap-4">
              {/* Custom X Logo */}
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mt-16 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-white/80">
          <p>© 2026 ELT@I. All rights reserved.</p>
          
          <div className="flex items-center gap-2">
            <span>Designed and Developed by</span>
            {/* Deemsys Logo */}
            <div className="flex items-center gap-1.5 ml-1 text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3H8.5V21H5V3Z" fill="currentColor"/>
                <path d="M10.5 3L20 12L10.5 21V16L15.5 12L10.5 8V3Z" fill="currentColor"/>
              </svg>
              <span className="font-bold text-lg tracking-tight leading-none">Deemsys</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
