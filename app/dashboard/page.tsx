"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

const DashboardPage = () => {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl text-[#427693]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-4xl font-extrabold text-[#427693] mb-4">
          Welcome, {user.displayName || user.email}!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          This is your MEDICARE Dashboard. Login successful!
        </p>

        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8">
          <p className="font-semibold text-green-800">
            SUCCESS: Anda berhasil login via Google dan terhubung ke Firebase.
          </p>
          <p className="text-sm text-green-700">
            User ID (Firebase UID): {user.uid}
          </p>
        </div>

        <button
          onClick={signOut}
          className="flex items-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-700 shadow-lg"
        >
          <LogOut size={20} className="mr-2" /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
