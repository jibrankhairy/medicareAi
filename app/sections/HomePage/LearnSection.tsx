"use client";

import React, { useRef } from "react";
import { Stethoscope, Shield, Bell, BookOpen } from "lucide-react";
import { motion, useInView } from "framer-motion";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

const LearnSection = () => {
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

  const learningPaths = [
    {
      icon: Stethoscope,
      title: "Understanding Your Reports",
      desc: "Learn how to interpret your AI-generated health data, risk scores, and monitoring summaries.",
    },
    {
      icon: Shield,
      title: "Proactive Prevention Guides",
      desc: "Detailed guides on lifestyle adjustments, diet, and exercise based on common risk factors.",
    },
    {
      icon: Bell,
      title: "AI Alert Management",
      desc: "Understand the purpose of different alert levels and the recommended steps to take when a risk is detected.",
    },
  ];

  return (
    <section id="learn" className="px-4 pt-4 lg:px-6 lg:pt-6">
      <div
        ref={ref}
        className="relative min-h-[calc(100vh-6rem)] overflow-hidden rounded-[30px] bg-white flex flex-col justify-center py-16 shadow-2xl"
      >
        <div className="relative z-10 w-full p-8 lg:p-16">
          <div className="mx-auto max-w-7xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-sm font-semibold uppercase tracking-widest text-[#427693] mb-3"
            >
              Knowledge Hub
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-4"
            >
              Empower Your Health Decisions
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg max-w-3xl mx-auto text-gray-600 leading-relaxed mb-12"
            >
              Access curated health resources and educational materials to
              maximize the benefits of your MEDICARE monitoring.
            </motion.p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {learningPaths.map((path, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-8 bg-gray-50 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:bg-white hover:scale-[1.02] text-left"
                >
                  <path.icon
                    size={32}
                    className="text-[#427693] mb-4"
                    strokeWidth={2.5}
                  />
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {path.title}
                  </h3>
                  <p className="text-base text-gray-700">{path.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnSection;
