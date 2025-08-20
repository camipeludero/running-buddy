import { supabase } from './supabaseClient';
import { Database } from '@/app/types/supabase';

type Tables = Database['public']['Tables'];
type UserProfile = Tables['user_profiles']['Row'];
type WorkoutSession = Tables['workout_sessions']['Row'];
type UserAchievement = Tables['user_achievements']['Row'];
type PersonalBest = Tables['personal_bests']['Row'];
type FavoriteWorkout = Tables['favorite_workouts']['Row'];
type UserSettings = Tables['user_settings']['Row'];
type UserGoal = Tables['user_goals']['Row'];

// User Profile Management
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  return { data, error };
}

export async function createUserProfile(profileData: Tables['user_profiles']['Insert']) {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert(profileData)
    .select()
    .single();

  return { data, error };
}

export async function updateUserProfile(userId: string, updates: Tables['user_profiles']['Update']) {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single();

  return { data, error };
}

// Workout Session Management
export async function createWorkoutSession(sessionData: Tables['workout_sessions']['Insert']) {
  const { data, error } = await supabase
    .from('workout_sessions')
    .insert(sessionData)
    .select()
    .single();

  return { data, error };
}

export async function updateWorkoutSession(sessionId: string, updates: Tables['workout_sessions']['Update']) {
  const { data, error } = await supabase
    .from('workout_sessions')
    .update(updates)
    .eq('id', sessionId)
    .select()
    .single();

  return { data, error };
}

export async function getUserWorkoutSessions(userId: string, limit?: number) {
  let query = supabase
    .from('workout_sessions')
    .select(`
      *,
      workouts (
        name,
        category,
        type,
        level
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  return { data, error };
}

// Achievement Management
export async function getUserAchievements(userId: string) {
  const { data, error } = await supabase
    .from('user_achievements')
    .select('*')
    .eq('user_id', userId)
    .order('unlocked_at', { ascending: false });

  return { data, error };
}

export async function unlockAchievement(achievementData: Tables['user_achievements']['Insert']) {
  const { data, error } = await supabase
    .from('user_achievements')
    .insert(achievementData)
    .select()
    .single();

  return { data, error };
}

// Personal Bests Management
export async function getUserPersonalBests(userId: string) {
  const { data, error } = await supabase
    .from('personal_bests')
    .select('*')
    .eq('user_id', userId)
    .order('achieved_at', { ascending: false });

  return { data, error };
}

export async function updatePersonalBest(bestData: Tables['personal_bests']['Insert']) {
  const { data, error } = await supabase
    .from('personal_bests')
    .upsert(bestData, { 
      onConflict: 'user_id,metric_type',
      ignoreDuplicates: false
    })
    .select()
    .single();

  return { data, error };
}

// Favorite Workouts Management
export async function getUserFavoriteWorkouts(userId: string) {
  const { data, error } = await supabase
    .from('favorite_workouts')
    .select(`
      *,
      workouts (
        id,
        name,
        category,
        type,
        duration,
        level
      )
    `)
    .eq('user_id', userId)
    .order('favorited_at', { ascending: false });

  return { data, error };
}

export async function addToFavorites(userId: string, workoutId: string) {
  const { data, error } = await supabase
    .from('favorite_workouts')
    .insert({ user_id: userId, workout_id: workoutId })
    .select()
    .single();

  return { data, error };
}

export async function removeFromFavorites(userId: string, workoutId: string) {
  const { data, error } = await supabase
    .from('favorite_workouts')
    .delete()
    .eq('user_id', userId)
    .eq('workout_id', workoutId);

  return { data, error };
}

// User Settings Management
export async function getUserSettings(userId: string) {
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .single();

  return { data, error };
}

export async function updateUserSettings(userId: string, settings: Partial<UserSettings>) {
  const { data, error } = await supabase
    .from('user_settings')
    .upsert({ 
      user_id: userId,
      ...settings 
    }, {
      onConflict: 'user_id',
      ignoreDuplicates: false
    })
    .select()
    .single();

  return { data, error };
}

// Goals Management
export async function getUserGoals(userId: string, active = true) {
  let query = supabase
    .from('user_goals')
    .select('*')
    .eq('user_id', userId);

  if (active) {
    query = query.eq('status', 'active');
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  return { data, error };
}

export async function createUserGoal(goalData: Tables['user_goals']['Insert']) {
  const { data, error } = await supabase
    .from('user_goals')
    .insert(goalData)
    .select()
    .single();

  return { data, error };
}

export async function updateUserGoal(goalId: string, updates: Tables['user_goals']['Update']) {
  const { data, error } = await supabase
    .from('user_goals')
    .update(updates)
    .eq('id', goalId)
    .select()
    .single();

  return { data, error };
}

// Statistics and Analytics
export async function getUserStatistics(userId: string) {
  // Get all completed workout sessions
  const { data: sessions, error: sessionsError } = await supabase
    .from('workout_sessions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'completed');

  if (sessionsError) {
    return { data: null, error: sessionsError };
  }

  if (!sessions || sessions.length === 0) {
    return {
      data: {
        totalWorkouts: 0,
        totalDistance: 0,
        totalTime: 0,
        avgPace: 0,
        totalCalories: 0,
        currentStreak: 0,
        bestDistance: 0
      },
      error: null
    };
  }

  // Calculate statistics
  const totalWorkouts = sessions.length;
  const totalDistance = sessions.reduce((sum, s) => sum + (s.distance_covered || 0), 0);
  const totalTime = sessions.reduce((sum, s) => sum + (s.duration_completed || 0), 0);
  const totalCalories = sessions.reduce((sum, s) => sum + (s.calories_burned || 0), 0);
  const avgPace = totalDistance > 0 ? (totalTime / 60) / totalDistance : 0; // min/km
  const bestDistance = Math.max(...sessions.map(s => s.distance_covered || 0));

  // Calculate current streak
  const sortedSessions = sessions
    .sort((a, b) => new Date(b.completed_at || '').getTime() - new Date(a.completed_at || '').getTime());

  let currentStreak = 0;
  let lastDate: Date | null = null;

  for (const session of sortedSessions) {
    if (!session.completed_at) continue;
    
    const sessionDate = new Date(session.completed_at);
    sessionDate.setHours(0, 0, 0, 0); // Reset time to start of day
    
    if (!lastDate) {
      lastDate = sessionDate;
      currentStreak = 1;
    } else {
      const dayDiff = Math.floor((lastDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDiff === 1) {
        currentStreak++;
        lastDate = sessionDate;
      } else if (dayDiff === 0) {
        // Same day, continue
        continue;
      } else {
        // Streak broken
        break;
      }
    }
  }

  return {
    data: {
      totalWorkouts,
      totalDistance: Math.round(totalDistance * 10) / 10, // Round to 1 decimal
      totalTime: Math.round(totalTime / 60), // Convert to minutes
      avgPace: Math.round(avgPace * 10) / 10,
      totalCalories,
      currentStreak,
      bestDistance: Math.round(bestDistance * 10) / 10
    },
    error: null
  };
}

export async function getWeeklyActivity(userId: string) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const { data: sessions, error } = await supabase
    .from('workout_sessions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'completed')
    .gte('completed_at', oneWeekAgo.toISOString())
    .order('completed_at', { ascending: true });

  if (error) return { data: null, error };

  // Group by day of week
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const weeklyData = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayName = weekDays[date.getDay()];
    
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const daySessions = sessions?.filter(session => {
      if (!session.completed_at) return false;
      const sessionDate = new Date(session.completed_at);
      return sessionDate >= dayStart && sessionDate <= dayEnd;
    }) || [];

    const distance = daySessions.reduce((sum, s) => sum + (s.distance_covered || 0), 0);
    const duration = daySessions.reduce((sum, s) => sum + (s.duration_completed || 0), 0);
    const calories = daySessions.reduce((sum, s) => sum + (s.calories_burned || 0), 0);

    weeklyData.push({
      day: dayName,
      distance: Math.round(distance * 10) / 10,
      duration: Math.round(duration / 60), // Convert to minutes
      calories
    });
  }

  return { data: weeklyData, error: null };
}

// Initialize user data when they first sign up
export async function initializeNewUser(userId: string, email: string) {
  try {
    // Create profile
    await createUserProfile({
      user_id: userId,
      display_name: email.split('@')[0],
      join_date: new Date().toISOString().split('T')[0]
    });

    // Create default settings
    await updateUserSettings(userId, {
      user_id: userId
    });

    // Create default monthly goals
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    await createUserGoal({
      user_id: userId,
      goal_type: 'monthly_distance',
      target_value: 100,
      period_start: monthStart.toISOString().split('T')[0],
      period_end: monthEnd.toISOString().split('T')[0]
    });

    await createUserGoal({
      user_id: userId,
      goal_type: 'monthly_workouts',
      target_value: 15,
      period_start: monthStart.toISOString().split('T')[0],
      period_end: monthEnd.toISOString().split('T')[0]
    });

    await createUserGoal({
      user_id: userId,
      goal_type: 'monthly_calories',
      target_value: 5000,
      period_start: monthStart.toISOString().split('T')[0],
      period_end: monthEnd.toISOString().split('T')[0]
    });

    return { success: true };
  } catch (error) {
    console.error('Error initializing new user:', error);
    return { success: false, error };
  }
}