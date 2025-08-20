import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/app/types/supabase';

// Mock data generators for server-side rendering
export async function getUserProfile(userId: string) {
  // In a real app, this would fetch from database
  return {
    id: userId,
    displayName: 'Runner',
    location: 'New York, NY',
    joinDate: '2024',
    goals: 'Complete a 10K race',
    bio: 'Passionate runner working towards my first marathon!',
    stats: {
      totalWorkouts: 24,
      totalDistance: 156.8,
      totalTime: 890,
      avgPace: 6.2,
      currentStreak: 7,
      bestDistance: 15.5
    },
    achievements: [
      { id: 1, title: 'First 5K', icon: '🏃', date: 'Dec 2024', unlocked: true },
      { id: 2, title: 'Week Warrior', icon: '🔥', date: 'Dec 2024', unlocked: true },
      { id: 3, title: '100K Club', icon: '💯', date: 'Dec 2024', unlocked: true },
      { id: 4, title: 'Marathon Ready', icon: '🏆', date: 'Locked', unlocked: false },
      { id: 5, title: 'Speed Demon', icon: '⚡', date: 'Locked', unlocked: false },
      { id: 6, title: 'Consistency King', icon: '👑', date: 'Locked', unlocked: false }
    ]
  };
}

export async function getWorkoutHistory(userId: string) {
  // In a real app, this would fetch from database
  return [
    {
      id: 1,
      workoutName: '5K Speed Intervals',
      category: 'Speed',
      date: '2024-01-15',
      duration: 28,
      distance: 5.2,
      avgPace: 5.4,
      caloriesBurned: 312,
      completed: true,
      rating: 4
    },
    {
      id: 2,
      workoutName: '3K Beginner Build',
      category: 'Endurance',
      date: '2024-01-13',
      duration: 22,
      distance: 3.8,
      avgPace: 5.8,
      caloriesBurned: 245,
      completed: true,
      rating: 5
    },
    {
      id: 3,
      workoutName: 'Morning Sprint',
      category: 'HIIT',
      date: '2024-01-11',
      duration: 30,
      distance: 4.5,
      avgPace: 6.7,
      caloriesBurned: 298,
      completed: false,
      rating: 0
    },
    {
      id: 4,
      workoutName: '7K Progression',
      category: 'Endurance',
      date: '2024-01-09',
      duration: 38,
      distance: 7.1,
      avgPace: 5.3,
      caloriesBurned: 445,
      completed: true,
      rating: 4
    },
    {
      id: 5,
      workoutName: '8K Fartlek Fun',
      category: 'HIIT',
      date: '2024-01-07',
      duration: 45,
      distance: 8.3,
      avgPace: 5.4,
      caloriesBurned: 512,
      completed: true,
      rating: 5
    }
  ];
}

export async function getProgressData(userId: string) {
  // In a real app, this would fetch and calculate from database
  const weeklyData = [
    { day: 'Mon', distance: 5.2, duration: 28, calories: 312 },
    { day: 'Tue', distance: 0, duration: 0, calories: 0 },
    { day: 'Wed', distance: 3.8, duration: 22, calories: 245 },
    { day: 'Thu', distance: 0, duration: 0, calories: 0 },
    { day: 'Fri', distance: 4.5, duration: 30, calories: 298 },
    { day: 'Sat', distance: 7.1, duration: 38, calories: 445 },
    { day: 'Sun', distance: 8.3, duration: 45, calories: 512 }
  ];

  const monthlyProgress = {
    currentMonth: {
      workouts: 12,
      distance: 58.4,
      time: 378,
      avgPace: 6.2,
      calories: 3450
    },
    previousMonth: {
      workouts: 8,
      distance: 42.1,
      time: 289,
      avgPace: 6.9,
      calories: 2680
    }
  };

  const personalBests = [
    { metric: 'Fastest 5K', value: '22:30', date: 'Jan 15, 2024', improved: true },
    { metric: 'Longest Run', value: '15.5km', date: 'Jan 12, 2024', improved: true },
    { metric: 'Best Pace', value: '4:45/km', date: 'Jan 10, 2024', improved: false },
    { metric: 'Most Calories', value: '645 cal', date: 'Jan 8, 2024', improved: true }
  ];

  return {
    weeklyData,
    monthlyProgress,
    personalBests
  };
}

export async function getFavoriteWorkouts(userId: string) {
  // In a real app, this would fetch user's favorites from database
  return [
    {
      id: '1',
      name: '5K Speed Intervals',
      category: 'Speed',
      duration: 28,
      level: 3,
      distance: 5.2,
      isFavorite: true,
      completedCount: 5,
      lastCompleted: '2024-01-15',
      averageTime: 26.8
    },
    {
      id: '2', 
      name: 'Morning Sprint',
      category: 'HIIT',
      duration: 30,
      level: 2,
      distance: 4.5,
      isFavorite: true,
      completedCount: 8,
      lastCompleted: '2024-01-11',
      averageTime: 31.2
    },
    {
      id: '3',
      name: '7K Progression',
      category: 'Endurance',
      duration: 38,
      level: 4,
      distance: 7.1,
      isFavorite: true,
      completedCount: 3,
      lastCompleted: '2024-01-09',
      averageTime: 39.5
    },
    {
      id: '4',
      name: '3K Beginner Build',
      category: 'Endurance',
      duration: 22,
      level: 1,
      distance: 3.8,
      isFavorite: true,
      completedCount: 12,
      lastCompleted: '2024-01-13',
      averageTime: 23.1
    }
  ];
}

export async function getCurrentUser() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}