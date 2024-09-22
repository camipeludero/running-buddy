import { create } from 'zustand';

interface Step {
  duration: number | null;
  speed: number | null;
  legend: string;
}

interface Set {
  name: string;
  steps: Step[];
}

interface WorkoutState {
  name: string;
  category: string;
  level: number;
  sets: Set[];
  totalDuration: number;
  setName: (name: string) => void;
  setCategory: (category: string) => void;
  setLevel: (level: number) => void;
  setSets: (sets: Set[]) => void;
  calculateTotalDuration: () => void;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  name: '',
  category: '',
  level: 1,
  sets: [{ name: "", steps: [{ duration: null, speed: null, legend: "" }] }],
  totalDuration: 0,
  setName: (name) => set({ name }),
  setCategory: (category) => set({ category }),
  setLevel: (level) => set({ level }),
  setSets: (sets) => set({ sets }),
  calculateTotalDuration: () =>
    set((state) => ({
      totalDuration: state.sets.reduce(
        (total, set) =>
          total + set.steps.reduce((stepTotal, step) => stepTotal + (step.duration || 0), 0),
        0
      ),
    })),
}));
