'use client';

import React, { useState, useCallback } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { 
  MdSettings, 
  MdNotifications, 
  MdVolumeUp, 
  MdBrightness6, 
  MdLanguage,
  MdSecurity,
  MdStorage,
  MdSync,
  MdBugReport,
  MdInfo,
  MdChevronRight,
  MdToggleOn,
  MdToggleOff
} from 'react-icons/md';

export default function Settings() {
  const { logout } = useAuth();
  const [settings, setSettings] = useState({
    notifications: {
      workoutReminders: true,
      achievements: true,
      weeklyProgress: false,
      emailUpdates: true
    },
    audio: {
      voiceCoaching: true,
      musicDucking: true,
      countdownSounds: true,
      volume: 80
    },
    display: {
      darkMode: true,
      autoStartWorkouts: false,
      showPaceAlerts: true
    },
    units: {
      distance: 'km',
      pace: 'min/km',
      temperature: 'celsius'
    },
    privacy: {
      shareProgress: false,
      allowAnalytics: true,
      dataCollection: true
    }
  });

  // Memoize the toggle function to prevent re-renders
  const toggleSetting = useCallback((category: keyof typeof settings, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !(prev[category] as any)[setting]
      }
    }));
  }, []);

  const updateVolume = useCallback((volume: number) => {
    setSettings(prev => ({
      ...prev,
      audio: {
        ...prev.audio,
        volume
      }
    }));
  }, []);

  const handleLogout = useCallback(async () => {
    if (confirm('Are you sure you want to sign out?')) {
      await logout();
    }
  }, [logout]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-2">
        <MdSettings className="w-6 h-6 text-dark-300" />
        Settings
      </h1>

      {/* Notifications */}
      <div className="card">
        <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
          <MdNotifications className="w-5 h-5 text-accent-warning" />
          Notifications
        </h2>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h3 className="text-dark-200 font-medium">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h3>
                <p className="text-dark-400 text-sm">
                  {key === 'workoutReminders' && 'Get reminded about scheduled workouts'}
                  {key === 'achievements' && 'Celebrate your running milestones'}
                  {key === 'weeklyProgress' && 'Weekly summary of your progress'}
                  {key === 'emailUpdates' && 'Receive updates via email'}
                </p>
              </div>
              <button onClick={() => toggleSetting('notifications', key)}>
                {value ? (
                  <MdToggleOn className="w-8 h-8 text-accent-success" />
                ) : (
                  <MdToggleOff className="w-8 h-8 text-dark-500" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Audio */}
      <div className="card">
        <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
          <MdVolumeUp className="w-5 h-5 text-accent-primary" />
          Audio & Voice
        </h2>
        <div className="space-y-4">
          {Object.entries(settings.audio).filter(([key]) => key !== 'volume').map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h3 className="text-dark-200 font-medium">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h3>
                <p className="text-dark-400 text-sm">
                  {key === 'voiceCoaching' && 'Hear pace and time announcements'}
                  {key === 'musicDucking' && 'Lower music volume for voice prompts'}
                  {key === 'countdownSounds' && 'Audio cues for interval changes'}
                </p>
              </div>
              <button onClick={() => toggleSetting('audio', key)}>
                {value ? (
                  <MdToggleOn className="w-8 h-8 text-accent-success" />
                ) : (
                  <MdToggleOff className="w-8 h-8 text-dark-500" />
                )}
              </button>
            </div>
          ))}
          
          {/* Volume Slider */}
          <div>
            <h3 className="text-dark-200 font-medium mb-2">Volume Level</h3>
            <div className="flex items-center gap-3">
              <span className="text-dark-400 text-sm">0</span>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.audio.volume}
                onChange={(e) => updateVolume(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-dark-400 text-sm">100</span>
              <span className="text-dark-200 text-sm font-medium w-8">{settings.audio.volume}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Display */}
      <div className="card">
        <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
          <MdBrightness6 className="w-5 h-5 text-accent-secondary" />
          Display & Behavior
        </h2>
        <div className="space-y-4">
          {Object.entries(settings.display).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h3 className="text-dark-200 font-medium">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h3>
                <p className="text-dark-400 text-sm">
                  {key === 'darkMode' && 'Use dark theme for better visibility'}
                  {key === 'autoStartWorkouts' && 'Skip countdown and start immediately'}
                  {key === 'showPaceAlerts' && 'Get notified when pace changes'}
                </p>
              </div>
              <button onClick={() => toggleSetting('display', key)}>
                {value ? (
                  <MdToggleOn className="w-8 h-8 text-accent-success" />
                ) : (
                  <MdToggleOff className="w-8 h-8 text-dark-500" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Units */}
      <div className="card">
        <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
          <MdLanguage className="w-5 h-5 text-accent-success" />
          Units & Preferences
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-dark-200 font-medium">Distance Unit</h3>
              <p className="text-dark-400 text-sm">Choose your preferred distance measurement</p>
            </div>
            <select 
              className="bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 text-dark-200"
              value={settings.units.distance}
              onChange={(e) => setSettings(prev => ({ ...prev, units: { ...prev.units, distance: e.target.value }}))}
            >
              <option value="km">Kilometers</option>
              <option value="mi">Miles</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-dark-200 font-medium">Pace Format</h3>
              <p className="text-dark-400 text-sm">How to display your running pace</p>
            </div>
            <select 
              className="bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 text-dark-200"
              value={settings.units.pace}
              onChange={(e) => setSettings(prev => ({ ...prev, units: { ...prev.units, pace: e.target.value }}))}
            >
              <option value="min/km">Min/km</option>
              <option value="min/mi">Min/mile</option>
              <option value="mph">MPH</option>
              <option value="kph">KPH</option>
            </select>
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="card">
        <h2 className="text-lg font-semibold text-dark-100 mb-4">Advanced</h2>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <MdSecurity className="w-5 h-5 text-accent-warning" />
              <span className="text-dark-200">Privacy & Data</span>
            </div>
            <MdChevronRight className="w-5 h-5 text-dark-400" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <MdStorage className="w-5 h-5 text-accent-primary" />
              <span className="text-dark-200">Storage & Backup</span>
            </div>
            <MdChevronRight className="w-5 h-5 text-dark-400" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <MdSync className="w-5 h-5 text-accent-success" />
              <span className="text-dark-200">Sync & Integrations</span>
            </div>
            <MdChevronRight className="w-5 h-5 text-dark-400" />
          </button>
        </div>
      </div>

      {/* Support */}
      <div className="card">
        <h2 className="text-lg font-semibold text-dark-100 mb-4">Support</h2>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <MdBugReport className="w-5 h-5 text-accent-error" />
              <span className="text-dark-200">Report a Bug</span>
            </div>
            <MdChevronRight className="w-5 h-5 text-dark-400" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <MdInfo className="w-5 h-5 text-accent-secondary" />
              <span className="text-dark-200">About Running Buddy</span>
            </div>
            <MdChevronRight className="w-5 h-5 text-dark-400" />
          </button>
        </div>
      </div>

      {/* Account Actions */}
      <div className="card border-accent-error/20">
        <h2 className="text-lg font-semibold text-dark-100 mb-4">Account</h2>
        <button
          onClick={handleLogout}
          className="w-full button-secondary text-accent-error border-accent-error/30 hover:bg-accent-error/10"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}