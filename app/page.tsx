import React from "react";

import Header from "../components/layout/Header";
import HeroSection from "./sections/HomePage/HeroSection";
import AboutUsSection from "./sections/HomePage/AboutUsSection";
import LearnSection from "./sections/HomePage/LearnSection";
import ServicesSection from "./sections/HomePage/ServicesSection";

const HomePage = () => {
  return (
    <div className="min-h-screen font-sans text-gray-900 bg-white">
      <Header />

      <main>
        <HeroSection />
        <AboutUsSection />
        <ServicesSection />
        <LearnSection />
      </main>
    </div>
  );
};

export default HomePage;
