"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../auth/login/supabase-client";

// Define the AuthContextType
interface AuthContextType {
  user: Session["user"] | null;
  setUser: (user: Session["user"] | null) => void;
  login: (credentials: { email: string; password: string }) => Promise<{ error: Error | null }>;
  logout: () => Promise<{ error: Error | null }>;
}

// Create AuthContext with a default value of null
const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider component to wrap the children components with AuthContext
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Session["user"] | null>(null);

  // On component mount, check if there's an existing session
  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      setUser(session?.user || null); // Set user if session exists
    };

    fetchSession(); // Run the fetchSession function on mount

    // Subscribe to auth state changes and update the user
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription?.subscription?.unsubscribe(); // Cleanup subscription
    };
  }, []);

  // Login and logout functions using Supabase authentication
  const login = async (credentials: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) {
      return { error };
    }
    setUser(data.user); // Set the user after successful login
    return { error: null };
  };

  const logout = async (): Promise<{ error: Error | null }> => {
    try {
      await supabase.auth.signOut(); // Sign the user out using Supabase
      setUser(null); // Clear the user from state
      localStorage.removeItem("supabaseSession"); // Clear session from local storage
      return { error: null }; // Return error as null
    } catch (error) {
      return { error: error as Error }; // Return the error if it occurs
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
