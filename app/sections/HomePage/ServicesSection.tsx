"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const services = [
    {
      title: "AI Health Monitoring",
      desc: "Real-time data analysis to spot anomalies and provide immediate, actionable risk alerts tailored to your profile.",
      iconPath:
        "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z",
      iconColor: "text-red-500",
      buttonText: "Start Monitoring",
    },
    {
      title: "Interactive Consultation",
      desc: "Ask our AI Assistant any health question and receive simple, clear, and verified answers based on medical guidelines.",
      iconPath:
        "M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z",
      iconColor: "text-green-600",
      buttonText: "Talk to AI",
    },
    {
      title: "Personalized Plans",
      desc: "Create custom wellness, diet, and exercise plans automatically generated based on your real-time health data.",
      iconPath:
        "M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H10z",
      iconColor: "text-yellow-600",
      buttonText: "Build My Plan",
    },
  ];

  return (
    <section id="services" className="px-4 pt-4 lg:px-6 lg:pt-6">
      <div
        ref={ref}
        className="relative min-h-[calc(100vh-6rem)] overflow-hidden rounded-[30px] bg-[#427693] flex flex-col justify-center py-16 shadow-2xl"
      >
        <div className="relative z-10 w-full p-8 lg:p-16 text-white">
          <div className="mx-auto max-w-7xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight"
            >
              Integrated Health Services by MEDICARE
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-200 mb-12 max-w-3xl mx-auto"
            >
              We provide essential services powered by our AI engine to ensure
              proactive, personalized, and efficient health management for
              everyone.
            </motion.p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex flex-col items-center p-8 rounded-2xl bg-white text-black shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[#427693]/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-10 w-10 mb-4 ${service.iconColor}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d={service.iconPath}
                      clipRule="evenodd"
                    />
                  </svg>
                  <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 flex-grow">
                    {service.desc}
                  </p>
                  <button className="mt-6 w-full rounded-full bg-[#427693] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#31576d] shadow-lg">
                    {service.buttonText}
                  </button>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.2, ease: easeOut }}
              className="mt-16"
            >
              <button className="rounded-full bg-white px-10 py-4 text-base font-bold text-gray-900 transition-all duration-300 hover:bg-gray-200 shadow-2xl">
                See All Features
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
