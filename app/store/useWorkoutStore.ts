import create from 'zustand';
import { Workout } from '../types'; // Adjust the path according to your structure

interface WorkoutState {
  selectedWorkout: Workout | null;
  setSelectedWorkout: (workout: Workout | null) => void;
  resetWorkout: () => void;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  selectedWorkout: null,
  setSelectedWorkout: (workout: Workout | null) => set({ selectedWorkout: workout }),
  resetWorkout: () => set({ selectedWorkout: null }),
}));
