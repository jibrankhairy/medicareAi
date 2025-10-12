"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Lock,
  Mail,
  ChevronLeft,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { Spinner } from "../ui/spinner";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 533.5 544.3"
    className="h-5 w-5 mr-3"
  >
    <path
      fill="#4285F4"
      d="M533.5 278.4c0-17.4-1.5-34-4.3-50.2H272v95.1h147.3c-6.3 34.1-25.1 63.1-53.5 82.4v68h86.4c50.6-46.6 81.3-115.4 81.3-195.3z"
    />
    <path
      fill="#34A853"
      d="M272 544.3c72.4 0 133.2-24 177.6-65.1l-86.4-68c-24 16.1-54.8 25.5-91.2 25.5-70 0-129.4-47.2-150.6-110.8H31.2v69.5C75.4 486.6 167.7 544.3 272 544.3z"
    />
    <path
      fill="#FBBC05"
      d="M121.4 325.9c-4.8-16.1-7.5-33.3-7.5-50.9s2.7-34.8 7.5-50.9V154.6H31.2C11.2 194.6 0 238.2 0 284.9s11.2 90.3 31.2 130.3l90.2-69.3z"
    />
    <path
      fill="#EA4335"
      d="M272 107.7c39.5 0 74.7 13.6 102.5 40.3l76.3-76.3C405.2 24.1 344.4 0 272 0 167.7 0 75.4 57.7 31.2 154.6l90.2 69.5C142.6 154.9 202 107.7 272 107.7z"
    />
  </svg>
);

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (message: string) => void;
  initialMessage: string | null;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onRegisterSuccess,
  initialMessage,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signInWithGoogle, signInWithEmail, registerWithEmail, loading } =
    useAuth();

  useEffect(() => {
    if (initialMessage) {
      setError(initialMessage);
      setIsLogin(true);
    }
  }, [initialMessage]);

  if (!isOpen) return null;

  const toggleView = () => {
    setIsLogin(!isLogin);
    setError(null);
    setEmail("");
    setPassword("");
    setName("");
    setIsSubmitting(false);
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      setError(
        "Sign in failed. Check network or ensure Firebase setup is complete."
      );
      console.error("Google Sign-in failed in Modal:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    let submissionError = null;

    try {
      if (isLogin) {
        await signInWithEmail(email, password);
        onClose();
      } else {
        if (!name) throw new Error("Name is required for registration.");

        await registerWithEmail(email, password, name);

        const authInstance = getAuth(app);
        await authInstance.signOut();

        onRegisterSuccess(
          "Registration successful! Please sign in with your new account."
        );
      }
    } catch (err: any) {
      const firebaseError = err.message
        .replace("Firebase: ", "")
        .replace(/\(auth.*\)\./, "")
        .trim();

      submissionError =
        firebaseError || "An unexpected error occurred during authentication.";
      setError(submissionError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormLoading = isSubmitting || loading;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-900 transition-colors hover:bg-gray-100"
          aria-label="Tutup"
        >
          <X size={20} />
        </button>

        <h2 className="text-3xl font-extrabold text-[#427693] mb-2 text-center">
          {isLogin ? "Welcome Back!" : "Join MEDICARE"}
        </h2>
        <p className="text-center text-gray-500 mb-6">
          {isLogin
            ? "Sign in to access your health dashboard."
            : "Create your free account to start monitoring."}
        </p>

        {error && (
          <div
            className={`mb-4 p-3 border rounded-lg text-sm ${
              error.includes("successful")
                ? "bg-green-100 border-green-400 text-green-700"
                : "bg-red-100 border-red-400 text-red-700"
            }`}
          >
            {error}
          </div>
        )}

        {isLogin && (
          <button
            onClick={handleGoogleSignIn}
            disabled={isFormLoading}
            className={`flex items-center justify-center w-full py-2.5 mb-4 rounded-full border border-gray-300 text-[#3c4043] font-medium bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm ${
              isFormLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isFormLoading ? (
              <Spinner className="w-5 h-5 text-[#427693]" />
            ) : (
              <>
                <GoogleIcon />
                <span className="text-sm font-medium">Sign in with Google</span>
              </>
            )}
          </button>
        )}

        {isLogin && (
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Nama Lengkap"
                required={!isLogin}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-[#427693] focus:ring-[#427693] transition-colors outline-none"
              />
            </div>
          )}
          <div className="relative">
            <Mail
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              placeholder="Email Anda"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-[#427693] focus:ring-[#427693] transition-colors outline-none"
            />
          </div>
          <div className="relative">
            <Lock
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-[#427693] focus:ring-[#427693] transition-colors outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center justify-center w-full py-3 rounded-xl text-white font-semibold shadow-md transition-colors duration-300 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#427693] hover:bg-[#31576d]"
            }`}
          >
            {isSubmitting ? (
              <Spinner className="w-5 h-5 text-white" />
            ) : (
              <>
                {isLogin ? (
                  <>
                    <LogIn size={20} className="mr-2" /> Sign In
                  </>
                ) : (
                  <>
                    <UserPlus size={20} className="mr-2" /> Sign Up
                  </>
                )}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <button
            onClick={toggleView}
            className="text-[#427693] font-medium hover:underline flex items-center justify-center mx-auto"
          >
            {isLogin ? (
              <>
                <UserPlus size={16} className="mr-1" /> Don't have an account?
                Sign Up
              </>
            ) : (
              <>
                <ChevronLeft size={16} className="mr-1" /> Already have an
                account? Sign In
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
