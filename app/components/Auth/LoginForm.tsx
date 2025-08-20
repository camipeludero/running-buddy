'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { resendConfirmation } from '@/lib/auth';
import { MdEmail, MdLock, MdSend } from 'react-icons/md';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export default function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState('');

  const handleResendConfirmation = async () => {
    if (!email) {
      setError('Please enter your email address first');
      return;
    }

    setIsResending(true);
    setError('');
    setResendSuccess('');

    const { error } = await resendConfirmation(email);
    
    if (error) {
      setError(`Failed to resend confirmation: ${error.message}`);
    } else {
      setResendSuccess('Confirmation email sent! Please check your inbox.');
    }
    
    setIsResending(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResendSuccess('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const { error } = await signIn(email, password);
    
    if (error) {
      console.error('Login error:', error);
      // Provide more user-friendly error messages
      if (error.message.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else if (error.message.includes('Email not confirmed')) {
        setError('Please check your email and click the confirmation link before signing in. If you didn\'t receive the email, you can request a new one.');
      } else if (error.message.includes('Too many requests')) {
        setError('Too many login attempts. Please wait a few minutes and try again.');
      } else {
        setError(`Login failed: ${error.message}`);
      }
    } else {
      onSuccess?.();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-dark-100">Welcome Back</h2>
        <p className="text-dark-400 text-sm sm:text-base">Sign in to continue your running journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-accent-error/10 border border-accent-error/20 rounded-xl p-3 sm:p-4 animate-slide-up">
            <p className="text-accent-error text-sm">{error}</p>
            {error.includes('Email not confirmed') && email && (
              <button
                onClick={handleResendConfirmation}
                disabled={isResending}
                className="mt-3 flex items-center gap-2 text-accent-primary hover:text-accent-secondary text-sm font-medium transition-colors disabled:opacity-50"
              >
                <MdSend className="w-4 h-4" />
                {isResending ? 'Sending...' : 'Resend Confirmation Email'}
              </button>
            )}
          </div>
        )}

        {/* Success Message */}
        {resendSuccess && (
          <div className="bg-accent-success/10 border border-accent-success/20 rounded-xl p-3 sm:p-4 animate-slide-up">
            <p className="text-accent-success text-sm">{resendSuccess}</p>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-dark-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdEmail className="h-5 w-5 text-dark-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-dark-300 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdLock className="h-5 w-5 text-dark-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        {/* Development Test Account */}
        {process.env.NODE_ENV === 'development' && (
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => {
                setEmail('test@runningbuddy.com');
                setPassword('testpass123');
              }}
              className="button-outline w-full text-sm"
            >
              Use Test Account
            </button>
            <p className="text-dark-500 text-xs text-center">
              💡 Create this account first, then check your email for confirmation
            </p>
          </div>
        )}
      </form>

      {/* Switch to Register */}
      <div className="text-center pt-4 border-t border-dark-600">
        <p className="text-dark-400 text-sm">
          Don&apos;t have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-accent-primary hover:text-accent-secondary font-medium transition-colors duration-200"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
}