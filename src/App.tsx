import React from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import OrganiserHostSection from './components/OrganiserHostSection';
import PastConferencesSection from './components/PastConferencesSection';
import CallToActionSection from './components/CallToActionSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <HeroSection />
      <AboutSection />
      <OrganiserHostSection />
      <PastConferencesSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
}

export default App;
