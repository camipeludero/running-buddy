'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { MdExpandMore, MdPerson, MdLogout } from 'react-icons/md';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!user) return null;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-dark-800 hover:bg-dark-700 border border-dark-600 hover:border-accent-primary/50 rounded-xl px-3 py-2 transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        {/* Avatar */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center">
          <span className="text-white text-xs sm:text-sm font-bold">
            {user.email?.charAt(0).toUpperCase()}
          </span>
        </div>
        
        {/* Email - hidden on mobile */}
        <span className="text-dark-200 text-sm hidden sm:block max-w-32 truncate">
          {user.email}
        </span>
        
        {/* Dropdown Arrow */}
        <MdExpandMore 
          className={`w-4 h-4 text-dark-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 mt-2 w-56 card border border-accent-primary/20 shadow-dark-xl z-20 animate-scale-in">
            <div className="p-2 space-y-1">
              {/* User Info */}
              <div className="px-3 py-2 border-b border-dark-600">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center">
                    <MdPerson className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-dark-200 text-sm font-medium truncate">
                      {user.email}
                    </p>
                    <p className="text-dark-400 text-xs">
                      Running Buddy User
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-accent-error hover:bg-accent-error/10 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MdLogout className="w-4 h-4" />
                {isLoggingOut ? 'Signing out...' : 'Sign Out'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}