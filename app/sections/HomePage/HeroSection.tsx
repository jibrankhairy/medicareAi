import React from "react";

const LOCAL_HERO_IMAGE = "/images/herosection-bg.jpg";

const HeroSection = () => {
  return (
    <section className="px-4 pt-0 lg:px-6 lg:pt-0">
      <div className="relative h-[85vh] overflow-hidden rounded-[30px] bg-black">
        <div className="absolute inset-0">
          <img
            src={LOCAL_HERO_IMAGE}
            alt="Custom background image"
            className="h-full w-full object-cover object-center brightness-75"
          />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-end p-8 pb-12 lg:p-16 lg:pb-20">
          <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-end text-white max-w-full">
            <div>
              <h1
                className="text-5xl font-semibold leading-tight tracking-tight lg:text-7xl xl:text-8xl"
                style={{ textShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}
              >
                Your Health
                <br />
                Matters
              </h1>
            </div>

            <div className="mt-8 lg:mt-0 flex flex-col items-start">
              <div className="mb-4 rounded-2xl bg-white/10 p-4 text-white shadow-xl backdrop-blur-sm transition-all duration-300 w-full max-w-xs border border-white/20">
                <p className="text-4xl font-extrabold text-white">60%</p>
                <p className="text-xs font-medium text-gray-100 mt-1">
                  of adults in Indonesia lack regular medical check-ups.
                  <span className="font-bold">Be the 40%.</span>
                </p>
              </div>

              <p className="max-w-sm text-sm text-gray-200 lg:text-base">
                MEDICARE delivers trusted, comprehensive, and accessible health
                services to prioritize your well-being.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
