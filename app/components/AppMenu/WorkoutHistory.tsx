'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { getUserWorkoutSessions } from '@/lib/userService';
import { 
  MdHistory, 
  MdDirectionsRun, 
  MdTimer, 
  MdSpeed, 
  MdCalendarToday,
  MdShare
} from 'react-icons/md';

export default function WorkoutHistory() {
  const { user } = useAuth();
  const [workoutHistory, setWorkoutHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Load user's workout history
  useEffect(() => {
    if (!user) return;

    const loadWorkoutHistory = async () => {
      try {
        setLoading(true);
        
        const { data: sessionsData, error } = await getUserWorkoutSessions(user.id);
        
        if (error) {
          console.error('Error loading workout history:', error);
          setWorkoutHistory([]);
          return;
        }

        // Transform sessions data for display
        const transformedHistory = (sessionsData || []).map(session => {
          const workout = session.workouts as any; // Type assertion for workout data
          return {
            id: session.id,
            workoutName: workout?.name || 'Unknown Workout',
            category: workout?.category || 'General',
            date: session.completed_at || session.created_at,
            duration: Math.round((session.duration_completed || 0) / 60), // Convert to minutes
            distance: session.distance_covered || 0,
            avgPace: session.avg_pace || 0,
            caloriesBurned: session.calories_burned || 0,
            completed: session.status === 'completed',
            rating: session.rating || 0
          };
        });

        setWorkoutHistory(transformedHistory);
      } catch (error) {
        console.error('Error loading workout history:', error);
        setWorkoutHistory([]);
      } finally {
        setLoading(false);
      }
    };

    loadWorkoutHistory();
  }, [user]);

  const formatPace = (pace: number) => {
    const mins = Math.floor(pace);
    const secs = Math.round((pace - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}/km`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'HIIT': 'text-accent-error',
      'Speed': 'text-accent-warning',
      'Endurance': 'text-accent-success',
      'Tempo': 'text-accent-secondary',
      'Recovery': 'text-accent-primary'
    };
    return colors[category as keyof typeof colors] || 'text-dark-300';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-accent-warning' : 'text-dark-600'}>
        ⭐
      </span>
    ));
  };

  // Memoize calculated stats to prevent recalculation on every render
  const stats = useMemo(() => {
    const completedWorkouts = workoutHistory.filter(w => w.completed);
    const totalWorkouts = completedWorkouts.length;
    const totalDistance = completedWorkouts.reduce((sum, w) => sum + w.distance, 0);
    const totalTime = completedWorkouts.reduce((sum, w) => sum + w.duration, 0);
    const avgPace = totalDistance > 0 ? totalTime / totalDistance : 0;
    
    return { totalWorkouts, totalDistance, totalTime, avgPace };
  }, [workoutHistory]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-2">
            <MdHistory className="w-6 h-6 text-accent-warning" />
            Workout History
          </h1>
        </div>
        <div className="card">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-dark-700 rounded w-1/3"></div>
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-2">
          <MdHistory className="w-6 h-6 text-accent-warning" />
          Workout History
        </h1>
        <button className="button-secondary text-sm py-2 px-4">
          <MdShare className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>

      {/* Summary Stats */}
      <div className="card">
        <h2 className="text-lg font-semibold text-dark-100 mb-4">Summary</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-primary">{stats.totalWorkouts}</div>
            <div className="text-dark-400 text-sm">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-success">{stats.totalDistance.toFixed(1)}km</div>
            <div className="text-dark-400 text-sm">Total Distance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-warning">{Math.floor(stats.totalTime / 60)}h {stats.totalTime % 60}m</div>
            <div className="text-dark-400 text-sm">Total Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-secondary">{formatPace(stats.avgPace)}</div>
            <div className="text-dark-400 text-sm">Avg Pace</div>
          </div>
        </div>
      </div>

      {/* Workout List */}
      <div className="space-y-4">
        {workoutHistory.map((workout) => (
          <div key={workout.id} className="card hover:border-accent-primary/30 transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-dark-100">{workout.workoutName}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-sm font-medium ${getCategoryColor(workout.category)}`}>
                    {workout.category}
                  </span>
                  <div className="flex items-center gap-1 text-dark-400 text-sm">
                    <MdCalendarToday className="w-4 h-4" />
                    {formatDate(workout.date)}
                  </div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                workout.completed 
                  ? 'bg-accent-success/20 text-accent-success' 
                  : 'bg-accent-error/20 text-accent-error'
              }`}>
                {workout.completed ? 'Completed' : 'Incomplete'}
              </div>
            </div>

            {workout.completed && (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <MdDirectionsRun className="w-4 h-4 text-accent-success" />
                    <span className="text-dark-200 text-sm">{workout.distance}km</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdTimer className="w-4 h-4 text-accent-warning" />
                    <span className="text-dark-200 text-sm">{workout.duration}min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdSpeed className="w-4 h-4 text-accent-secondary" />
                    <span className="text-dark-200 text-sm">{formatPace(workout.avgPace)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-accent-error text-sm">🔥</div>
                    <span className="text-dark-200 text-sm">{workout.caloriesBurned} cal</span>
                  </div>
                </div>

                {workout.rating > 0 && (
                  <div className="flex items-center gap-2 pt-3 border-t border-dark-600">
                    <span className="text-dark-400 text-sm">Rating:</span>
                    <div className="flex text-sm">
                      {renderStars(workout.rating)}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {workoutHistory.length === 0 && (
        <div className="card text-center py-12">
          <MdHistory className="w-12 h-12 text-dark-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-dark-300 mb-2">No workouts found</h3>
          <p className="text-dark-400">Start your first workout to see your history here!</p>
        </div>
      )}
    </div>
  );
}