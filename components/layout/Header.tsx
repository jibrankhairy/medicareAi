"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "../../app/constants/NavData";
import AuthModal from "../auth/AuthModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const openModalWithSuccess = (message: string) => {
    setSuccessMessage(message);
    setIsModalOpen(true);
  };

  return (
    <>
      <header className="py-6 px-4 lg:py-8 lg:px-8 bg-white sticky top-0 z-50 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="text-xl font-bold tracking-wide">
            MEDICARE<span className="text-xs align-top">®</span>
          </div>

          <nav className="hidden space-x-8 text-sm text-gray-900 lg:flex absolute left-1/2 transform -translate-x-1/2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:text-gray-500 font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full bg-[#427693] px-6 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#31576d] shadow-md hidden lg:block"
            >
              Sign In
            </button>

            <button
              className="text-lg p-2 rounded-full transition-colors hover:bg-gray-100 lg:hidden"
              aria-label="Buka menu"
            >
              <Menu size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {isModalOpen && (
          <AuthModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSuccessMessage(null);
            }}
            onRegisterSuccess={openModalWithSuccess}
            initialMessage={successMessage}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
