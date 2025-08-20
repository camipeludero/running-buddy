'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { createWorkoutSession, updatePersonalBest, unlockAchievement } from '@/lib/userService';
import { calculateWorkoutDistance } from '@/app/utils';
import { 
  MdCheckCircle, 
  MdDirectionsRun, 
  MdTimer, 
  MdSpeed, 
  MdLocalFireDepartment,
  MdShare,
  MdHome,
  MdStar,
  MdStarBorder,
  MdTrendingUp,
  MdEmojiEvents
} from 'react-icons/md';
import Link from 'next/link';
import { Workout, Set } from '@/app/types';

interface WorkoutCompletionScreenProps {
  workout: Workout;
  elapsedTime: number; // in seconds
  onClose: () => void;
}

interface CompletionStats {
  distance: number;
  duration: number; // in minutes
  avgPace: number; // min/km
  calories: number;
}

export default function WorkoutCompletionScreen({ 
  workout, 
  elapsedTime, 
  onClose 
}: WorkoutCompletionScreenProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [personalBests, setPersonalBests] = useState<string[]>([]);

  // Calculate workout statistics
  const stats: CompletionStats = useMemo(() => {
    let sets: Set[] = [];
    
    if (workout?.sets) {
      if (typeof workout.sets === 'string') {
        try {
          sets = JSON.parse(workout.sets) as Set[];
        } catch (error) {
          console.error('Error parsing sets:', error);
        }
      } else {
        sets = workout.sets;
      }
    }

    const distance = calculateWorkoutDistance(sets);
    const duration = elapsedTime / 60; // Convert to minutes
    const avgPace = distance > 0 ? duration / distance : 0;
    
    // Estimate calories: roughly 60-80 calories per km for running
    const calories = Math.round(distance * 70 + (duration * 5)); // Base calories + time factor

    return {
      distance: Math.round(distance * 10) / 10,
      duration: Math.round(duration * 10) / 10,
      avgPace: Math.round(avgPace * 10) / 10,
      calories
    };
  }, [workout, elapsedTime]);

  // Save workout session
  const saveWorkoutSession = async () => {
    if (!user || isSaving) return;

    setIsSaving(true);

    try {
      // Create workout session
      const sessionData = {
        user_id: user.id,
        workout_id: workout.id,
        status: 'completed' as const,
        started_at: new Date(Date.now() - elapsedTime * 1000).toISOString(),
        completed_at: new Date().toISOString(),
        duration_completed: elapsedTime,
        distance_covered: stats.distance,
        calories_burned: stats.calories,
        avg_pace: stats.avgPace,
        rating: rating || null,
        notes: notes || null
      };

      const { data: session, error: sessionError } = await createWorkoutSession(sessionData);
      
      if (sessionError) {
        console.error('Error saving workout session:', sessionError);
        return;
      }

      // Check for personal bests
      const newPersonalBests: string[] = [];
      
      // Check distance personal best
      if (stats.distance > 0) {
        const { error: distanceError } = await updatePersonalBest({
          user_id: user.id,
          metric_type: 'longest_run',
          value: stats.distance,
          unit: 'km',
          workout_session_id: session?.id
        });
        
        if (!distanceError) {
          newPersonalBests.push('Longest Run');
        }
      }

      // Check pace personal best (lower is better)
      if (stats.avgPace > 0) {
        const { error: paceError } = await updatePersonalBest({
          user_id: user.id,
          metric_type: 'best_pace',
          value: stats.avgPace,
          unit: 'min_per_km',
          workout_session_id: session?.id
        });
        
        if (!paceError) {
          newPersonalBests.push('Best Pace');
        }
      }

      // Check calories personal best
      if (stats.calories > 0) {
        const { error: caloriesError } = await updatePersonalBest({
          user_id: user.id,
          metric_type: 'most_calories',
          value: stats.calories,
          unit: 'calories',
          workout_session_id: session?.id
        });
        
        if (!caloriesError) {
          newPersonalBests.push('Most Calories');
        }
      }

      setPersonalBests(newPersonalBests);

      // Check for achievements
      const newAchievements: string[] = [];

      // First workout achievement
      const { error: firstWorkoutError } = await unlockAchievement({
        user_id: user.id,
        achievement_type: 'first_workout',
        title: 'First Steps',
        description: 'Completed your first workout',
        icon_emoji: '🏃'
      });

      if (!firstWorkoutError) {
        newAchievements.push('First Steps');
      }

      // Distance-based achievements
      if (stats.distance >= 5) {
        const { error: firstFiveKError } = await unlockAchievement({
          user_id: user.id,
          achievement_type: 'first_5k',
          title: 'First 5K',
          description: 'Completed 5 kilometers',
          icon_emoji: '🏃'
        });

        if (!firstFiveKError) {
          newAchievements.push('First 5K');
        }
      }

      if (stats.distance >= 10) {
        const { error: firstTenKError } = await unlockAchievement({
          user_id: user.id,
          achievement_type: 'first_10k',
          title: 'First 10K',
          description: 'Completed 10 kilometers',
          icon_emoji: '🏆'
        });

        if (!firstTenKError) {
          newAchievements.push('First 10K');
        }
      }

      setAchievements(newAchievements);
      setSavedSuccessfully(true);

    } catch (error) {
      console.error('Error saving workout data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-save when component mounts
  useEffect(() => {
    if (user && !savedSuccessfully && !isSaving) {
      saveWorkoutSession();
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatPace = (pace: number) => {
    const mins = Math.floor(pace);
    const secs = Math.round((pace - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}/km`;
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="text-center p-6 border-b border-dark-600">
          <div className="w-20 h-20 bg-gradient-to-r from-accent-success to-accent-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <MdCheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-dark-100 mb-2">Workout Complete!</h1>
          <p className="text-dark-400">Great job finishing {workout.name}</p>
        </div>

        {/* Stats */}
        <div className="p-6 space-y-6">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-dark-800 rounded-xl p-4 text-center">
              <MdDirectionsRun className="w-8 h-8 text-accent-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-dark-100">{stats.distance}km</div>
              <div className="text-dark-400 text-sm">Distance</div>
            </div>
            
            <div className="bg-dark-800 rounded-xl p-4 text-center">
              <MdTimer className="w-8 h-8 text-accent-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-dark-100">{formatTime(elapsedTime)}</div>
              <div className="text-dark-400 text-sm">Duration</div>
            </div>
            
            <div className="bg-dark-800 rounded-xl p-4 text-center">
              <MdSpeed className="w-8 h-8 text-accent-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-dark-100">{formatPace(stats.avgPace)}</div>
              <div className="text-dark-400 text-sm">Avg Pace</div>
            </div>
            
            <div className="bg-dark-800 rounded-xl p-4 text-center">
              <MdLocalFireDepartment className="w-8 h-8 text-accent-error mx-auto mb-2" />
              <div className="text-2xl font-bold text-dark-100">{stats.calories}</div>
              <div className="text-dark-400 text-sm">Calories</div>
            </div>
          </div>

          {/* Personal Bests */}
          {personalBests.length > 0 && (
            <div className="bg-accent-success/10 border border-accent-success/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <MdTrendingUp className="w-5 h-5 text-accent-success" />
                <h3 className="text-lg font-semibold text-accent-success">New Personal Bests!</h3>
              </div>
              <div className="space-y-2">
                {personalBests.map((best, index) => (
                  <div key={index} className="flex items-center gap-2 text-accent-success text-sm">
                    <div className="w-2 h-2 bg-accent-success rounded-full"></div>
                    {best}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="bg-accent-warning/10 border border-accent-warning/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <MdEmojiEvents className="w-5 h-5 text-accent-warning" />
                <h3 className="text-lg font-semibold text-accent-warning">Achievements Unlocked!</h3>
              </div>
              <div className="space-y-2">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2 text-accent-warning text-sm">
                    <div className="text-lg">🏆</div>
                    {achievement}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rating */}
          <div>
            <h3 className="text-lg font-semibold text-dark-100 mb-3">Rate Your Workout</h3>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="text-2xl transition-colors duration-200"
                >
                  {star <= rating ? (
                    <MdStar className="text-accent-warning" />
                  ) : (
                    <MdStarBorder className="text-dark-500 hover:text-accent-warning" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-lg font-semibold text-dark-100 mb-3">Notes (Optional)</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How did the workout feel? Any observations?"
              className="w-full p-3 bg-dark-800 border border-dark-600 rounded-xl text-dark-100 placeholder-dark-400 resize-none focus:border-accent-primary focus:outline-none"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (rating > 0 || notes.trim()) {
                  saveWorkoutSession();
                }
              }}
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-primary/80 text-white py-3 px-4 rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              <MdShare className="w-5 h-5" />
              {isSaving ? 'Saving...' : 'Save & Share'}
            </button>
            
            <Link href="/" className="flex-1">
              <button
                className="w-full flex items-center justify-center gap-2 bg-dark-800 hover:bg-dark-700 text-dark-100 py-3 px-4 rounded-xl font-medium transition-colors border border-dark-600"
              >
                <MdHome className="w-5 h-5" />
                Home
              </button>
            </Link>
          </div>

          {savedSuccessfully && (
            <div className="text-center text-accent-success text-sm">
              ✅ Workout saved to your history!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}