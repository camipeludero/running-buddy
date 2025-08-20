'use client';

import React, { useState, Suspense } from 'react';
import { MdArrowBack } from 'react-icons/md';
import AppMenu from './AppMenu';
import Profile from './Profile';
import WorkoutHistory from './WorkoutHistory';
import Settings from './Settings';
import Progress from './Progress';
import WorkoutFavorites from './WorkoutFavorites';
import HelpSupport from './HelpSupport';

// Loading component for server components
function SectionLoading() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-dark-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-dark-800 rounded w-full"></div>
            <div className="h-4 bg-dark-800 rounded w-3/4"></div>
            <div className="h-4 bg-dark-800 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AppMenuContainerProps {
  children?: React.ReactNode;
}

export default function AppMenuContainer({ children }: AppMenuContainerProps) {
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  const handleNavigate = (section: string) => {
    if (section === 'workouts') {
      // Don't navigate away for workouts - that's the main page
      setCurrentSection(null);
      return;
    }
    setCurrentSection(section);
  };

  const handleBack = () => {
    setCurrentSection(null);
  };

  const renderSection = () => {
    const getSectionComponent = () => {
      switch (currentSection) {
        case 'profile':
          return <Profile />;
        case 'history':
          return <WorkoutHistory />;
        case 'favorites':
          return <WorkoutFavorites />;
        case 'progress':
          return <Progress />;
        case 'settings':
          return <Settings />;
        case 'help':
          return <HelpSupport />;
        case 'music':
          return (
            <div className="card text-center py-12">
              <div className="text-4xl mb-4">🎵</div>
              <h2 className="text-xl font-bold text-dark-100 mb-2">Music Settings</h2>
              <p className="text-dark-400">Spotify integration settings coming soon!</p>
            </div>
          );
        default:
          return children;
      }
    };

    // Wrap server components with Suspense
    if (['profile', 'history', 'favorites', 'progress', 'help'].includes(currentSection || '')) {
      return (
        <Suspense fallback={<SectionLoading />}>
          {getSectionComponent()}
        </Suspense>
      );
    }

    return getSectionComponent();
  };

  const getSectionTitle = () => {
    const titles = {
      profile: 'Profile',
      history: 'Workout History',
      favorites: 'Favorites',
      progress: 'Progress & Stats',
      settings: 'Settings',
      help: 'Help & Support',
      music: 'Music Settings'
    };
    return titles[currentSection as keyof typeof titles] || 'Running Buddy';
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {currentSection && (
            <button
              onClick={handleBack}
              className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white transition-colors"
            >
              <MdArrowBack className="w-5 h-5" />
            </button>
          )}
          {!currentSection && (
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              Running Buddy
            </h1>
          )}
        </div>
        
        <AppMenu onNavigate={handleNavigate} />
      </div>

      {/* Content */}
      <div className="animate-fade-in">
        {renderSection()}
      </div>
    </div>
  );
}