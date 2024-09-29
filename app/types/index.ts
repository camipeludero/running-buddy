export interface Step {
  duration: number;
  speed: number;
  legend: string;
}

export interface Set {
  name: string;
  steps: Step[];
}

export interface Workout {
  id: string;
  name: string;
  category: string;
  type: string;
  duration: number;
  level: number;
  sets: Set[];
}

export interface Category {
  id: string;
  name: string
}