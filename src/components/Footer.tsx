import React from 'react';
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#E8F5E9] text-gray-800 pt-16 pb-8 px-6 lg:px-12 font-sans border-t border-green-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_2fr_1fr] gap-12 lg:gap-8">
          
          {/* Column 1: ELT@I */}
          <div className="flex flex-col">
            {/* ELT@I Logo Pill */}
            <div className="bg-white rounded-lg px-3 py-2 inline-flex items-center justify-center w-fit mb-6">
              <img src="https://conf2026.eltai.in/assets/ELTAI-DxCx19mA.png" alt="ELT@I Logo" className="h-12 object-contain" />
            </div>

            <h4 className="font-bold text-gray-900 mb-3 text-[15px]">English Language Teachers' Association of India</h4>
            <div className="flex flex-col space-y-2 text-[14px] text-gray-700">
              <p>D-54 Third Floor, Anandham Apartments</p>
              <p>156, SIDCO Nagar Main Road</p>
              <p>Villivakkam, Chennai - 600 049, India</p>
            </div>
          </div>

          {/* Column 2: MIT-ADT */}
          <div className="flex flex-col">
            {/* MIT-ADT Logo Pill */}
            <div className="bg-white rounded-lg px-4 py-2 inline-flex items-center justify-center w-fit mb-6">
              <img src="https://conf2026.eltai.in/assets/MITADT-KRFaF891.png" alt="MIT-ADT University Logo" className="h-12 object-contain" />
            </div>

            <h4 className="font-bold text-gray-900 mb-3 text-[15px]">School of Humanities & School of Holistic Development</h4>
            <div className="flex flex-col space-y-2 text-[14px] text-gray-700">
              <p>MIT Art, Design & Technological University</p>
              <p>Pune, Maharashtra, India</p>
            </div>
          </div>

          {/* Column 3: Join Us */}
          <div className="flex flex-col">
            <h4 className="font-bold text-gray-900 mb-6 text-[15px]">Join Us</h4>
            <div className="flex items-center gap-4">
              {/* Custom X Logo */}
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-black/10 mt-16 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-gray-600">
          <p>© 2026 ELT@I. All rights reserved.</p>
          
          <div className="flex items-center gap-2">
            <span>Designed and Developed by</span>
            {/* Deemsys Logo */}
            <div className="flex items-center gap-1.5 ml-1 text-gray-900">
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
