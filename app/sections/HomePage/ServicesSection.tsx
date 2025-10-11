import React from "react";

const ServicesSection = () => {
  return (
    <section id="services" className="px-4 pt-4 lg:px-6 lg:pt-6">
      <div className="relative min-h-[calc(100vh-6rem)] overflow-hidden rounded-[30px] bg-[#427693] flex flex-col justify-center py-16 shadow-2xl">
        <div className="relative z-10 w-full p-8 lg:p-16 text-white">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">
              Integrated Health Services by MEDICARE
            </h2>

            <p className="text-lg text-gray-200 mb-12 max-w-3xl mx-auto">
              We provide essential services powered by our AI engine to ensure
              proactive, personalized, and efficient health management for
              everyone.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="flex flex-col items-center p-8 rounded-2xl bg-white text-black shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[#427693]/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mb-4 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="text-xl font-bold mb-1">AI Health Monitoring</h3>
                <p className="text-sm text-gray-600 mt-2 flex-grow">
                  Real-time data analysis to spot anomalies and provide
                  immediate, actionable risk alerts tailored to your profile.
                </p>
                <button className="mt-6 w-full rounded-full bg-[#427693] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#31576d] shadow-lg">
                  Start Monitoring
                </button>
              </div>

              <div className="flex flex-col items-center p-8 rounded-2xl bg-white text-black shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[#427693]/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mb-4 text-green-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <h3 className="text-xl font-bold mb-1">
                  Interactive Consultation
                </h3>
                <p className="text-sm text-gray-600 mt-2 flex-grow">
                  Ask our AI Assistant any health question and receive simple,
                  clear, and verified answers based on medical guidelines.
                </p>
                <button className="mt-6 w-full rounded-full bg-[#427693] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#31576d] shadow-lg">
                  Talk to AI
                </button>
              </div>

              <div className="flex flex-col items-center p-8 rounded-2xl bg-white text-black shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[#427693]/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mb-4 text-yellow-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H10z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="text-xl font-bold mb-1">Personalized Plans</h3>
                <p className="text-sm text-gray-600 mt-2 flex-grow">
                  Create custom wellness, diet, and exercise plans automatically
                  generated based on your real-time health data.
                </p>
                <button className="mt-6 w-full rounded-full bg-[#427693] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#31576d] shadow-lg">
                  Build My Plan
                </button>
              </div>
            </div>

            <div className="mt-16">
              <button className="rounded-full bg-white px-10 py-4 text-base font-bold text-gray-900 transition-all duration-300 hover:bg-gray-200 shadow-2xl">
                See All Features
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
