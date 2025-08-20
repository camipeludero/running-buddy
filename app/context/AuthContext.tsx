'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import { getCurrentSession, signInWithEmail, signUpWithEmail, signOut } from '@/lib/auth';
import { initializeNewUser } from '@/lib/userService';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: AuthError | null }>;
  signUp: (email: string, password: string) => Promise<{ error?: AuthError | null }>;
  logout: () => Promise<{ error?: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    getCurrentSession().then(({ session, user }) => {
      setSession(session || null);
      setUser(user || null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await signInWithEmail(email, password);
    setLoading(false);
    return { error };
  };

  const handleSignUp = async (email: string, password: string) => {
    setLoading(true);
    const { user, error } = await signUpWithEmail(email, password);
    
    // Initialize new user data if signup was successful
    if (user && !error) {
      try {
        await initializeNewUser(user.id, email);
      } catch (initError) {
        console.error('Error initializing new user:', initError);
        // Don't fail the signup if initialization fails
      }
    }
    
    setLoading(false);
    return { error };
  };

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await signOut();
    setLoading(false);
    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}