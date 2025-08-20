'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { 
  MdMenu, 
  MdClose, 
  MdPerson, 
  MdFitnessCenter, 
  MdSettings, 
  MdQueryStats, 
  MdMusicNote, 
  MdHelp,
  MdHistory,
  MdFavorite,
  MdDirectionsRun,
  MdChevronRight
} from 'react-icons/md';

interface AppMenuProps {
  onNavigate?: (section: string) => void;
}

export default function AppMenu({ onNavigate }: AppMenuProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  console.log('AppMenu - user:', user); // Debug log

  if (!user) return null;

  const menuItems = [
    {
      id: 'profile',
      label: 'Profile',
      icon: MdPerson,
      description: 'Personal info & running stats',
      color: 'text-accent-primary'
    },
    {
      id: 'workouts',
      label: 'My Workouts',
      icon: MdDirectionsRun,
      description: 'Browse all workouts',
      color: 'text-accent-success'
    },
    {
      id: 'history',
      label: 'Workout History',
      icon: MdHistory,
      description: 'Track your progress',
      color: 'text-accent-warning'
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: MdFavorite,
      description: 'Saved workouts',
      color: 'text-accent-error'
    },
    {
      id: 'progress',
      label: 'Progress & Stats',
      icon: MdQueryStats,
      description: 'Performance analytics',
      color: 'text-accent-secondary'
    },
    {
      id: 'music',
      label: 'Music Settings',
      icon: MdMusicNote,
      description: 'Spotify integration',
      color: 'text-accent-success'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: MdSettings,
      description: 'App preferences',
      color: 'text-dark-300'
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: MdHelp,
      description: 'FAQ and support',
      color: 'text-dark-400'
    }
  ];

  const handleItemClick = (itemId: string) => {
    setIsOpen(false);
    onNavigate?.(itemId);
  };

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-dark-800 hover:bg-dark-700 border border-dark-600 hover:border-accent-primary/50 rounded-xl px-3 py-2 transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        <MdMenu className="w-5 h-5 text-dark-300" />
        <span className="text-dark-200 text-sm hidden sm:block">Menu</span>
      </button>

      {/* Slide-out Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 animate-fade-in">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute left-0 top-0 h-full w-80 max-w-[90vw] bg-dark-900 border-r border-dark-600 shadow-dark-xl animate-slide-right">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-dark-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center">
                  <MdFitnessCenter className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-dark-100 font-bold text-lg">Running Buddy</h2>
                  <p className="text-dark-400 text-xs">
                    {user.email?.split('@')[0]}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white transition-colors"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2 overflow-y-auto h-[calc(100%-80px)]">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className="w-full flex items-center gap-4 p-3 rounded-xl bg-dark-800 hover:bg-dark-700 border border-dark-600 hover:border-accent-primary/30 transition-all duration-200 group"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-dark-700 flex items-center justify-center group-hover:bg-dark-600 transition-colors`}>
                      <IconComponent className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-dark-100 font-medium group-hover:text-white transition-colors">
                        {item.label}
                      </h3>
                      <p className="text-dark-400 text-xs">
                        {item.description}
                      </p>
                    </div>
                    <MdChevronRight className="w-4 h-4 text-dark-400 group-hover:text-accent-primary transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}