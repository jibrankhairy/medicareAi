"use client";

import React, { useState } from "react";
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

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="h-5 w-5 mr-3"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.343c-1.897,4.357-6.666,9.136-11.343,9.136c-6.81,0-12.289-5.56-12.289-12.483  c0-6.923,5.479-12.484,12.289-12.484c3.136,0,5.732,1.258,7.399,2.775l5.52-5.267C37.892,4.86,32.65,2,24,2C11.851,2,2,11.851,2,24  s9.851,22,22,22c11.082,0,21-8.197,21-22C45.97,22.19,44.172,20.583,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.774,1.189,7.766,3.066  l6.096-5.873C34.721,4.717,29.897,2,24,2C14.777,2,7.746,8.239,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,46c5.566,0,10.648-2.227,14.127-5.912l-6.2-5.238C30.505,36.56,27.352,38,24,38  c-5.594,0-10.428-3.957-11.341-9.421l-6.205,4.33C6.444,40.457,14.757,46,24,46z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.343c-0.655,3.318-3.329,6.486-6.096,8.75l6.2,5.238  C39.141,40.169,45.719,34.019,45.97,24C45.97,22.19,44.172,20.583,43.611,20.083z"
    />
  </svg>
);

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { signInWithGoogle, loading, user } = useAuth();

  if (!isOpen) return null;

  const toggleView = () => {
    setIsLogin(!isLogin);
    setError(null);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(
      "Email/Password login is not yet implemented. Please use 'Sign in with Google'."
    );
  };

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
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={loading} // Disable saat loading
          className={`flex items-center justify-center w-full py-3 mb-4 rounded-full border border-gray-300 text-gray-700 font-semibold transition-all duration-300 shadow-sm ${
            loading
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-white hover:bg-gray-50"
          }`}
        >
          {loading ? (
            "Processing..."
          ) : (
            <>
              <GoogleIcon />
              {isLogin ? "Sign in with Google" : "Sign up with Google"}
            </>
          )}
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

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
            className="flex items-center justify-center w-full py-3 rounded-xl bg-[#427693] text-white font-semibold shadow-md hover:bg-[#31576d] transition-colors duration-300"
          >
            {isLogin ? (
              <>
                <LogIn size={20} className="mr-2" /> Sign In
              </>
            ) : (
              <>
                <UserPlus size={20} className="mr-2" /> Sign Up
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
