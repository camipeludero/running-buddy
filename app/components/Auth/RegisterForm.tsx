'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { MdEmail, MdLock, MdLockOutline, MdCheckCircle } from 'react-icons/md';

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export default function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const { signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return null;
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: '' };
    if (password.length < 6) return { strength: 1, text: 'Too short' };
    if (password.length < 8) return { strength: 2, text: 'Fair' };
    if (password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { strength: 4, text: 'Strong' };
    }
    return { strength: 3, text: 'Good' };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    const { error } = await signUp(email, password);
    
    if (error) {
      console.error('Registration error:', error);
      // Provide more user-friendly error messages
      if (error.message.includes('User already registered')) {
        setError('An account with this email already exists. Please try signing in instead.');
      } else if (error.message.includes('Password should be at least')) {
        setError('Password must be at least 6 characters long.');
      } else if (error.message.includes('Signup is disabled')) {
        setError('Account registration is currently disabled. Please contact support.');
      } else {
        setError(`Registration failed: ${error.message}`);
      }
    } else {
      setSuccess('Account created successfully! Please check your email to verify your account.');
      // Clear form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-dark-100">Join Running Buddy</h2>
        <p className="text-dark-400 text-sm sm:text-base">Create your account to start your running journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-accent-error/10 border border-accent-error/20 rounded-xl p-3 sm:p-4 animate-slide-up">
            <p className="text-accent-error text-sm">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-accent-success/10 border border-accent-success/20 rounded-xl p-3 sm:p-4 animate-slide-up">
            <div className="flex items-start gap-2">
              <MdCheckCircle className="h-5 w-5 text-accent-success mt-0.5 flex-shrink-0" />
              <p className="text-accent-success text-sm">{success}</p>
            </div>
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
                placeholder="Create a password (min. 6 characters)"
                required
              />
            </div>
            
            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 rounded-full transition-colors duration-200 ${
                          level <= passwordStrength.strength
                            ? passwordStrength.strength <= 2 
                              ? 'bg-accent-error' 
                              : passwordStrength.strength === 3 
                                ? 'bg-accent-warning' 
                                : 'bg-accent-success'
                            : 'bg-dark-600'
                        }`}
                        style={{ width: '25%' }}
                      />
                    ))}
                  </div>
                  <span className={`text-xs font-medium ${
                    passwordStrength.strength <= 2 
                      ? 'text-accent-error' 
                      : passwordStrength.strength === 3 
                        ? 'text-accent-warning' 
                        : 'text-accent-success'
                  }`}>
                    {passwordStrength.text}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdLockOutline className="h-5 w-5 text-dark-400" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`input-field pl-10 ${
                  confirmPassword && password !== confirmPassword 
                    ? 'border-accent-error focus:border-accent-error' 
                    : confirmPassword && password === confirmPassword 
                      ? 'border-accent-success focus:border-accent-success' 
                      : ''
                }`}
                placeholder="Confirm your password"
                required
              />
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="text-accent-error text-xs mt-1">Passwords do not match</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !email || !password || !confirmPassword || password !== confirmPassword}
          className="button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      {/* Switch to Login */}
      <div className="text-center pt-4 border-t border-dark-600">
        <p className="text-dark-400 text-sm">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-accent-primary hover:text-accent-secondary font-medium transition-colors duration-200"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}