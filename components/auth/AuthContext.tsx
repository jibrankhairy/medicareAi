"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  getAuth,
  User,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  registerWithEmail: (
    email: string,
    password: string,
    name: string
  ) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const syncUserToDatabase = async (user: User, name: string | null = null) => {
  if (!user.email) return;

  try {
    const dbResponse = await fetch("/api/auth/register-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firebaseUid: user.uid,
        email: user.email,
        name: name || user.displayName,
      }),
    });

    if (!dbResponse.ok) {
      console.error(
        "Failed to register user in database via API:",
        await dbResponse.json()
      );
      throw new Error("Failed to register user in database.");
    }
    console.log(`User ${user.uid} synced successfully to MySQL.`);
  } catch (error) {
    console.error("Database Synchronization Error:", error);
    throw new Error("Failed to synchronize user data with MySQL database.");
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  const signInWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await syncUserToDatabase(user);

      setUser(user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Google Sign In Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmail = async (
    email: string,
    password: string,
    name: string
  ) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await syncUserToDatabase(user, name);
    } catch (error) {
      console.error("Email Registration Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setUser(user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Email Sign In Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        registerWithEmail,
        signInWithEmail,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
