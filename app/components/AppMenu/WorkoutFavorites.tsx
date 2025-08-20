'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { getUserFavoriteWorkouts, removeFromFavorites, getUserWorkoutSessions } from '@/lib/userService';
import { 
  MdFavorite, 
  MdFavoriteBorder,
  MdDirectionsRun, 
  MdTimer, 
  MdSpeed,
  MdFilterList,
  MdAdd,
  MdShare
} from 'react-icons/md';

export default function WorkoutFavorites() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [favoriteWorkouts, setFavoriteWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load user's favorite workouts
  useEffect(() => {
    if (!user) return;

    const loadFavorites = async () => {
      try {
        setLoading(true);
        
        // Get favorite workouts
        const { data: favoritesData, error: favoritesError } = await getUserFavoriteWorkouts(user.id);
        
        if (favoritesError) {
          console.error('Error loading favorites:', favoritesError);
          setFavoriteWorkouts([]);
          return;
        }

        // Get workout sessions to calculate completion stats
        const { data: sessionsData } = await getUserWorkoutSessions(user.id);
        
        // Transform and enrich favorites data
        const enrichedFavorites = (favoritesData || []).map(fav => {
          const workout = fav.workouts as any; // Type assertion for workout data
          if (!workout || !workout.id) return null;
          
          const sessions = (sessionsData || []).filter(session => 
            session.workout_id === workout.id && session.status === 'completed'
          );
          
          const completedCount = sessions.length;
          const averageTime = completedCount > 0 
            ? sessions.reduce((sum, s) => sum + (s.duration_completed || 0), 0) / completedCount / 60
            : 0;
          
          const lastCompleted = sessions.length > 0 
            ? sessions.sort((a, b) => new Date(b.completed_at || '').getTime() - new Date(a.completed_at || '').getTime())[0].completed_at
            : null;

          return {
            id: workout.id,
            name: workout.name,
            category: workout.category,
            duration: workout.duration,
            level: workout.level,
            distance: 0, // Will be calculated from sets if available
            isFavorite: true,
            completedCount,
            lastCompleted: lastCompleted || new Date().toISOString(),
            averageTime: Math.round(averageTime * 10) / 10
          };
        }).filter(Boolean); // Remove null entries
        
        setFavoriteWorkouts(enrichedFavorites);
      } catch (error) {
        console.error('Error loading favorites:', error);
        setFavoriteWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  // Memoize filtered workouts to prevent recalculation
  const filteredWorkouts = useMemo(() => favoriteWorkouts.filter(workout => {
    if (filter === 'recent') {
      const lastCompleted = new Date(workout.lastCompleted);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return lastCompleted > weekAgo;
    }
    if (filter === 'frequent') {
      return workout.completedCount >= 5;
    }
    return true;
  }), [favoriteWorkouts, filter]);

  // Memoize callback to prevent re-renders
  const toggleFavorite = useCallback(async (workoutId: string) => {
    if (!user) return;

    try {
      await removeFromFavorites(user.id, workoutId);
      
      // Remove from local state
      setFavoriteWorkouts(prev => prev.filter(workout => workout.id !== workoutId));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  }, [user]);

  // Memoize utility functions
  const getCategoryColor = useCallback((category: string) => {
    const colors = {
      'HIIT': 'text-accent-error',
      'Speed': 'text-accent-warning',
      'Endurance': 'text-accent-success',
      'Tempo': 'text-accent-secondary',
      'Recovery': 'text-accent-primary'
    };
    return colors[category as keyof typeof colors] || 'text-dark-300';
  }, []);

  const getLevelColor = useCallback((level: number) => {
    if (level <= 1) return 'text-accent-success';
    if (level <= 2) return 'text-accent-warning';
    if (level <= 3) return 'text-accent-error';
    return 'text-accent-secondary';
  }, []);

  const formatDate = useCallback((dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }, []);

  // Memoize calculated stats
  const stats = useMemo(() => {
    const totalFavorites = favoriteWorkouts.length;
    const totalRuns = favoriteWorkouts.reduce((sum, w) => sum + w.completedCount, 0);
    const avgDuration = favoriteWorkouts.length > 0 
      ? (favoriteWorkouts.reduce((sum, w) => sum + w.averageTime, 0) / favoriteWorkouts.length).toFixed(1)
      : '0';
    
    return { totalFavorites, totalRuns, avgDuration };
  }, [favoriteWorkouts]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-2">
            <MdFavorite className="w-6 h-6 text-accent-error" />
            Favorite Workouts
          </h1>
        </div>
        <div className="card">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-dark-700 rounded w-1/3"></div>
            <div className="space-y-3">
              <div className="h-4 bg-dark-800 rounded w-full"></div>
              <div className="h-4 bg-dark-800 rounded w-3/4"></div>
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
          <MdFavorite className="w-6 h-6 text-accent-error" />
          Favorite Workouts
        </h1>
        <button className="button-secondary text-sm py-2 px-4">
          <MdShare className="w-4 h-4 mr-2" />
          Share List
        </button>
      </div>

      {/* Stats */}
      <div className="card">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-accent-error">{stats.totalFavorites}</div>
            <div className="text-dark-400 text-sm">Favorites</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent-success">{stats.totalRuns}</div>
            <div className="text-dark-400 text-sm">Total Runs</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent-primary">{stats.avgDuration}m</div>
            <div className="text-dark-400 text-sm">Avg Duration</div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <MdFilterList className="w-5 h-5 text-dark-400" />
        <div className="flex gap-2">
          {['all', 'recent', 'frequent'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filter === filterOption
                  ? 'bg-accent-primary text-white'
                  : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Favorite Workouts */}
      <div className="space-y-4">
        {filteredWorkouts.map((workout) => (
          <div key={workout.id} className="card hover:border-accent-primary/30 transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-dark-100 mb-1">{workout.name}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`font-medium ${getCategoryColor(workout.category)}`}>
                        {workout.category}
                      </span>
                      <span className={`font-medium ${getLevelColor(workout.level)}`}>
                        Level {workout.level}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => toggleFavorite(workout.id)}
                className="p-2 rounded-lg hover:bg-dark-700 transition-colors"
              >
                <MdFavorite className="w-5 h-5 text-accent-error" />
              </button>
            </div>

            {/* Workout Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <MdDirectionsRun className="w-4 h-4 text-accent-success" />
                <span className="text-dark-200 text-sm">{workout.distance}km</span>
              </div>
              <div className="flex items-center gap-2">
                <MdTimer className="w-4 h-4 text-accent-warning" />
                <span className="text-dark-200 text-sm">{workout.duration}min</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-accent-primary text-sm">🔄</div>
                <span className="text-dark-200 text-sm">{workout.completedCount} times</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-accent-secondary text-sm">⏱️</div>
                <span className="text-dark-200 text-sm">Avg: {workout.averageTime}min</span>
              </div>
            </div>

            {/* Last Completed & Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-dark-600">
              <div className="text-dark-400 text-sm">
                Last completed: {formatDate(workout.lastCompleted)}
              </div>
              <Link
                href={`/${workout.id}`}
                className="button-primary text-sm py-2 px-4"
              >
                Start Workout
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredWorkouts.length === 0 && (
        <div className="card text-center py-12">
          <MdFavoriteBorder className="w-12 h-12 text-dark-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-dark-300 mb-2">No favorites found</h3>
          <p className="text-dark-400 mb-4">
            {filter === 'recent' && "You haven't favorited any workouts recently."}
            {filter === 'frequent' && "No frequently completed favorites found."}
            {filter === 'all' && "Add some workouts to your favorites to see them here!"}
          </p>
          <Link href="/" className="button-primary">
            <MdAdd className="w-4 h-4 mr-2" />
            Browse Workouts
          </Link>
        </div>
      )}

      {/* Quick Actions */}
      {filteredWorkouts.length > 0 && (
        <div className="card bg-accent-primary/10 border-accent-primary/20">
          <h3 className="text-lg font-semibold text-dark-100 mb-3">Quick Actions</h3>
          <div className="flex gap-3 flex-wrap">
            <button className="button-secondary text-sm">
              Create Playlist from Favorites
            </button>
            <button className="button-secondary text-sm">
              Export as PDF
            </button>
            <Link href="/" className="button-outline text-sm">
              <MdAdd className="w-4 h-4 mr-1" />
              Find More Workouts
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}