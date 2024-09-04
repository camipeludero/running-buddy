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
  name: string;
  category: string;
  type: string;
  duration: number;
  level: number;
  sets: Set[];
}
