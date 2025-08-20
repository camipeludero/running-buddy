'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { getUserProfile, getUserStatistics, getUserAchievements } from '@/lib/userService';
import { Database } from '@/app/types/supabase';

type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
type UserAchievement = Database['public']['Tables']['user_achievements']['Row'];

interface UserStats {
  totalWorkouts: number;
  totalDistance: number;
  totalTime: number;
  avgPace: number;
  totalCalories: number;
  currentStreak: number;
  bestDistance: number;
}
import { 
  MdPerson, 
  MdDirectionsRun, 
  MdTimer, 
  MdSpeed, 
  MdTrendingUp,
  MdEmojiEvents,
  MdCalendarToday,
  MdLocationOn,
  MdQueryStats
} from 'react-icons/md';
import ProfileEditButton from './ProfileEditButton';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Load user data
  useEffect(() => {
    if (!user) return;

    const loadUserData = async () => {
      try {
        setLoading(true);

        // Load profile
        const { data: profileData } = await getUserProfile(user.id);
        
        // Load statistics  
        const { data: statsData } = await getUserStatistics(user.id);
        
        // Load achievements
        const { data: achievementsData } = await getUserAchievements(user.id);

        setProfile(profileData);
        setStats(statsData);
        setAchievements(achievementsData || []);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  // Combine real and fallback data for display
  const displayData = useMemo(() => ({
    displayName: profile?.display_name || user?.email?.split('@')[0] || 'Runner',
    location: profile?.location || 'Set your location',
    joinDate: profile?.join_date ? new Date(profile.join_date).getFullYear().toString() : '2024',
    goals: profile?.goals || 'Set your running goals',
    bio: profile?.bio || 'Welcome to Running Buddy! Start tracking your workouts.',
    stats: {
      totalWorkouts: stats?.totalWorkouts || 0,
      totalDistance: stats?.totalDistance || 0,
      totalTime: stats?.totalTime || 0,
      avgPace: stats?.avgPace || 0,
      currentStreak: stats?.currentStreak || 0,
      bestDistance: stats?.bestDistance || 0
    },
    achievements: achievements.length > 0 ? achievements.map(a => ({
      id: a.id,
      title: a.title,
      icon: a.icon_emoji || '🏆',
      date: a.unlocked_at ? new Date(a.unlocked_at).toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      }) : 'Locked',
      unlocked: true
    })) : [
      { id: 'placeholder1', title: 'Complete your first workout', icon: '🏃', date: 'Locked', unlocked: false },
      { id: 'placeholder2', title: 'Run your first 5K', icon: '🎯', date: 'Locked', unlocked: false },
      { id: 'placeholder3', title: 'Build a streak', icon: '🔥', date: 'Locked', unlocked: false },
      { id: 'placeholder4', title: 'Join the 100K club', icon: '💯', date: 'Locked', unlocked: false },
      { id: 'placeholder5', title: 'Marathon ready', icon: '🏆', date: 'Locked', unlocked: false },
      { id: 'placeholder6', title: 'Consistency master', icon: '👑', date: 'Locked', unlocked: false }
    ]
  }), [profile, stats, achievements, user?.email]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="card">
          <div className="animate-pulse">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-dark-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-6 bg-dark-700 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-dark-800 rounded w-1/2 mb-1"></div>
                <div className="h-4 bg-dark-800 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatPace = (pace: number) => {
    const mins = Math.floor(pace);
    const secs = Math.round((pace - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}/km`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Header */}
      <div className="card">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center">
            <MdPerson className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-dark-100">{displayData.displayName}</h1>
              <ProfileEditButton />
            </div>
            <div className="space-y-1 text-sm text-dark-400">
              <div className="flex items-center gap-2">
                <MdLocationOn className="w-4 h-4" />
                {displayData.location}
              </div>
              <div className="flex items-center gap-2">
                <MdCalendarToday className="w-4 h-4" />
                Running since {displayData.joinDate}
              </div>
            </div>
          </div>
        </div>
        
        {displayData.bio && (
          <div className="mt-4 p-3 bg-dark-800 rounded-lg">
            <p className="text-dark-200 text-sm">{displayData.bio}</p>
          </div>
        )}

        {displayData.goals && (
          <div className="mt-3 p-3 bg-accent-primary/10 border border-accent-primary/20 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <MdEmojiEvents className="w-4 h-4 text-accent-primary" />
              <span className="text-accent-primary text-sm font-medium">Current Goal</span>
            </div>
            <p className="text-dark-200 text-sm">{displayData.goals}</p>
          </div>
        )}
      </div>

      {/* Running Stats */}
      <div className="card">
        <h2 className="text-xl font-bold text-dark-100 mb-4 flex items-center gap-2">
          <MdQueryStats className="w-5 h-5 text-accent-success" />
          Running Statistics
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-dark-800 rounded-xl p-4 text-center">
            <MdDirectionsRun className="w-6 h-6 text-accent-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-dark-100">{displayData.stats.totalWorkouts}</div>
            <div className="text-dark-400 text-sm">Total Workouts</div>
          </div>
          
          <div className="bg-dark-800 rounded-xl p-4 text-center">
            <MdSpeed className="w-6 h-6 text-accent-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-dark-100">{displayData.stats.totalDistance}km</div>
            <div className="text-dark-400 text-sm">Distance Covered</div>
          </div>
          
          <div className="bg-dark-800 rounded-xl p-4 text-center">
            <MdTimer className="w-6 h-6 text-accent-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-dark-100">{formatTime(displayData.stats.totalTime)}</div>
            <div className="text-dark-400 text-sm">Total Time</div>
          </div>
          
          <div className="bg-dark-800 rounded-xl p-4 text-center">
            <MdTrendingUp className="w-6 h-6 text-accent-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-dark-100">{displayData.stats.avgPace > 0 ? formatPace(displayData.stats.avgPace) : '--'}</div>
            <div className="text-dark-400 text-sm">Average Pace</div>
          </div>
          
          <div className="bg-dark-800 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-dark-100">{displayData.stats.currentStreak}</div>
            <div className="text-dark-400 text-sm">Day Streak</div>
          </div>
          
          <div className="bg-dark-800 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🏃‍♂️</div>
            <div className="text-2xl font-bold text-dark-100">{displayData.stats.bestDistance}km</div>
            <div className="text-dark-400 text-sm">Longest Run</div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="card">
        <h2 className="text-xl font-bold text-dark-100 mb-4 flex items-center gap-2">
          <MdEmojiEvents className="w-5 h-5 text-accent-warning" />
          Achievements
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {displayData.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                achievement.unlocked
                  ? 'bg-dark-800 border-accent-success/30 hover:border-accent-success/50'
                  : 'bg-dark-800/50 border-dark-600 opacity-60'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h3 className={`font-medium mb-1 ${
                  achievement.unlocked ? 'text-dark-100' : 'text-dark-400'
                }`}>
                  {achievement.title}
                </h3>
                <p className={`text-xs ${
                  achievement.unlocked ? 'text-accent-success' : 'text-dark-500'
                }`}>
                  {achievement.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}