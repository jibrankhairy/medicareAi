"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const LOCAL_HERO_IMAGE = "/images/herosection-bg.jpg";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const AnimatedCounter = ({
  from,
  to,
  delay,
}: {
  from: number;
  to: number;
  delay: number;
}) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(count, to, {
      duration: 1.5,
      ease: easeOut,
      delay: delay,
    });

    return () => controls.stop();
  }, [count, to, delay]);

  return <motion.span>{rounded}</motion.span>;
};

const HeroSection = () => {
  return (
    <section className="px-4 pt-0 lg:px-6 lg:pt-6">
      <div className="relative h-[85vh] overflow-hidden rounded-[30px] bg-black">
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.1, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: easeOut }}
            src={LOCAL_HERO_IMAGE}
            alt="Custom background image"
            className="h-full w-full object-cover object-center brightness-75"
          />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-end p-8 pb-12 lg:p-16 lg:pb-20">
          <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-end text-white max-w-full">
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.2, duration: 0.8 }}
            >
              <motion.h1
                variants={textVariants}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl font-semibold leading-tight tracking-tight lg:text-7xl xl:text-8xl"
                style={{ textShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}
              >
                Your Health
              </motion.h1>
              <motion.h1
                variants={textVariants}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl font-semibold leading-tight tracking-tight lg:text-7xl xl:text-8xl"
                style={{ textShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}
              >
                Matters
              </motion.h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: easeOut }}
              className="mt-8 lg:mt-0 flex flex-col items-start"
            >
              <div className="mb-4 rounded-2xl bg-white/10 p-4 text-white shadow-xl backdrop-blur-sm transition-all duration-300 w-full max-w-xs border border-white/20">
                <p className="text-4xl font-extrabold text-white">
                  <AnimatedCounter from={0} to={60} delay={1.0} />%
                </p>
                <p className="text-xs font-medium text-gray-100 mt-1">
                  of adults in Indonesia lack regular medical check-ups.
                  <span className="font-bold">Be the 40%.</span>
                </p>
              </div>

              <p className="max-w-sm text-sm text-gray-200 lg:text-base">
                MEDICARE delivers trusted, comprehensive, and accessible health
                services to prioritize your well-being.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
