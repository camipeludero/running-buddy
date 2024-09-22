export type Database = {
  public: {
    Tables: {
      workouts: {
        Row: {
          id: string; // UUID
          name: string;
          category: string;
          type: string;
          duration: number;
          level: number;
          created_at: string | null; // Timestamp when the workout was created
        };
        Insert: {
          id?: string; // UUID will be auto-generated if not provided
          name: string;
          category: string;
          type: string;
          duration: number;
          level: number;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          type?: string;
          duration?: number;
          level?: number;
          created_at?: string | null;
        };
      };
      sets: {
        Row: {
          id: string; // UUID
          name: string;
          workout_id: string; // Foreign key to workouts
          created_at: string | null; // Timestamp when the set was created
        };
        Insert: {
          id?: string; // UUID will be auto-generated if not provided
          name: string;
          workout_id: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          workout_id?: string;
          created_at?: string | null;
        };
      };
      steps: {
        Row: {
          id: string; // UUID
          set_id: string; // Foreign key to sets
          duration: number;
          speed: number;
          legend: string;
          created_at: string | null;
        };
        Insert: {
          id?: string; // UUID will be auto-generated if not provided
          set_id: string;
          duration: number;
          speed: number;
          legend: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          set_id?: string;
          duration?: number;
          speed?: number;
          legend?: string;
          created_at?: string | null;
        };
      };
      categories: {
        Row: {
          id: string; // UUID
          name: string;
        };
        Insert: {
          id?: string; // UUID will be auto-generated if not provided
          name: string;
        };
        Update: {
          id?: string;
          name: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
};
