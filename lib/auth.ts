// lib/auth.ts
import { supabase } from './supabaseClient';
import type { AuthError, User, Session } from '@supabase/supabase-js';

export interface AuthResponse {
  user?: User | null;
  error?: AuthError | null;
}

export interface SessionResponse {
  session?: Session | null;
  user?: User | null;
  error?: AuthError | null;
}

// Sign up with email and password
export async function signUpWithEmail(email: string, password: string): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return {
    user: data.user,
    error: error
  };
}

// Sign in with email and password
export async function signInWithEmail(email: string, password: string): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    user: data.user,
    error: error
  };
}

// Sign out
export async function signOut(): Promise<{ error?: AuthError | null }> {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Get current session
export async function getCurrentSession(): Promise<SessionResponse> {
  const { data, error } = await supabase.auth.getSession();
  
  return {
    session: data.session,
    user: data.session?.user || null,
    error: error
  };
}

// Get current user
export async function getCurrentUser(): Promise<{ user?: User | null; error?: AuthError | null }> {
  const { data, error } = await supabase.auth.getUser();
  
  return {
    user: data.user,
    error: error
  };
}

// Reset password
export async function resetPassword(email: string): Promise<{ error?: AuthError | null }> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  
  return { error };
}

// Update password
export async function updatePassword(password: string): Promise<{ error?: AuthError | null }> {
  const { error } = await supabase.auth.updateUser({ password });
  return { error };
}

// Resend confirmation email
export async function resendConfirmation(email: string): Promise<{ error?: AuthError | null }> {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`
    }
  });
  return { error };
}