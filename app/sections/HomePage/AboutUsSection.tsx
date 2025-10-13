"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

const AboutUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  return (
    <section id="about-us" className="px-4 pt-4 lg:px-6 lg:pt-6">
      <div
        ref={ref}
        className="relative min-h-[calc(100vh-6rem)] overflow-hidden rounded-[30px] bg-white flex items-center shadow-2xl"
      >
        <div className="relative z-10 w-full p-8 lg:p-16 text-gray-900">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={variants}
                transition={{ delay: 0.1 }}
              >
                <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-[#427693] rounded-full mb-4">
                  Powered by Intelligence
                </span>

                <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight text-gray-900">
                  MEDICARE: Health Monitoring powered by AI
                </h2>

                <p className="text-lg lg:text-xl max-w-xl leading-relaxed mb-8 text-gray-700">
                  Our platform goes beyond basic record-keeping. We leverage
                  cutting-edge **AI technology** to actively monitor your health
                  data, predict potential risks, and provide personalized, clear
                  answers to your health queries.
                </p>

                <button className="rounded-full bg-[#427693] px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#31576d] shadow-lg">
                  Learn How AI Works
                </button>
              </motion.div>

              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={variants}
                transition={{ delay: 0.3 }}
                className="w-full h-full p-6 lg:p-10 bg-gray-50 rounded-2xl shadow-inner border border-gray-200"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-[#427693]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L9 11.586 6.707 9.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Key AI Features
                </h3>

                <ul className="space-y-4 text-gray-700">
                  {[...Array(3)].map((_, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + i * 0.15,
                        ease: easeOut,
                      }}
                      className="flex items-start"
                    >
                      <span className="text-[#427693] mr-3 text-xl leading-none">
                        •
                      </span>
                      <div>
                        <p className="font-semibold">
                          {i === 0 && "Predictive Risk Analysis:"}
                          {i === 1 && "Interactive Health Assistant:"}
                          {i === 2 && "Personalized Wellness Goals:"}
                        </p>
                        <p className="text-sm">
                          {i === 0 &&
                            "Identify health patterns and flag risks before they become critical."}
                          {i === 1 &&
                            "Get clear, concise, and scientifically grounded answers instantly."}
                          {i === 2 &&
                            "Receive goal recommendations tailored to your unique data."}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
