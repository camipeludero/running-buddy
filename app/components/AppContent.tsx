'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { mockWorkouts } from '@/app/data/mockWorkouts';
import { Database } from '@/app/types/supabase';
import WorkoutSelection from './WorkoutSelection';
import AuthModal from './Auth/AuthModal';
import AppMenuContainer from './AppMenu/AppMenuContainer';

type DatabaseWorkout = Database['public']['Tables']['workouts']['Row'];
type MockWorkout = {
  id: string;
  name: string;
  category: string;
  type: string;
  duration: number;
  level: number;
  sets: { name: string; steps: { duration: number; speed: number; legend: string; }[]; }[];
};
type Workout = DatabaseWorkout | MockWorkout;

export default function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const [workouts, setWorkouts] = useState<Workout[]>(mockWorkouts);
  const [status, setStatus] = useState<'database' | 'demo' | 'error'>('demo');
  const [dataLoading, setDataLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const { data, error } = await supabase.from('workouts').select('*');

        if (error) {
          console.warn('Database connection failed, using mock data:', error.message);
          setStatus('demo');
        } else if (!data || data.length === 0) {
          console.log('No workouts in database, using mock data');
          setStatus('demo');
        } else {
          console.log('Successfully loaded workouts from database:', data.length);
          setWorkouts(data);
          setStatus('database');
        }
      } catch (err) {
        console.error('Unexpected error connecting to database:', err);
        setStatus('error');
      } finally {
        setDataLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      setShowAuthModal(true);
    }
  }, [authLoading, user]);

  const getStatusMessage = () => {
    switch (status) {
      case 'demo':
        return (
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 text-center">
            <p className="text-yellow-300 text-sm">
              ⚠️ Using demo data - Database connection unavailable
            </p>
          </div>
        );
      case 'error':
        return (
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-center">
            <p className="text-red-300 text-sm">
              🔴 Database unavailable - Using demo data
            </p>
          </div>
        );
      case 'database':
      default:
        return null;
    }
  };

  const getUserGreeting = () => {
    if (!user) return null;
    
    return (
      <div className="bg-accent-primary/10 border border-accent-primary/20 rounded-xl p-3 sm:p-4 text-center mb-4 animate-slide-up">
        <p className="text-accent-primary text-sm sm:text-base font-medium">
          👋 Welcome back, {user.email?.split('@')[0]}!
        </p>
      </div>
    );
  };

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center animate-fade-in">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto relative">
            <div className="absolute inset-0 rounded-full border-2 border-dark-600"></div>
            <div className="absolute inset-0 rounded-full border-2 border-accent-primary border-t-transparent animate-spin"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-dark-200 text-lg font-medium">Loading Running Buddy</h3>
            <p className="text-dark-400 text-sm">Preparing your workout experience...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <AppMenuContainer>
        <div className="space-y-4">
          {getUserGreeting()}
          {getStatusMessage()}
          <WorkoutSelection workouts={workouts} />
        </div>
      </AppMenuContainer>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        defaultView="login"
      />
    </>
  );
}