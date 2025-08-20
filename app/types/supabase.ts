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
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          display_name: string | null;
          location: string | null;
          bio: string | null;
          goals: string | null;
          join_date: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          display_name?: string | null;
          location?: string | null;
          bio?: string | null;
          goals?: string | null;
          join_date?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          display_name?: string | null;
          location?: string | null;
          bio?: string | null;
          goals?: string | null;
          join_date?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      workout_sessions: {
        Row: {
          id: string;
          user_id: string;
          workout_id: string | null;
          status: string;
          started_at: string | null;
          completed_at: string | null;
          duration_completed: number | null;
          distance_covered: number | null;
          calories_burned: number | null;
          avg_pace: number | null;
          rating: number | null;
          notes: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          workout_id?: string | null;
          status?: string;
          started_at?: string | null;
          completed_at?: string | null;
          duration_completed?: number | null;
          distance_covered?: number | null;
          calories_burned?: number | null;
          avg_pace?: number | null;
          rating?: number | null;
          notes?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          workout_id?: string | null;
          status?: string;
          started_at?: string | null;
          completed_at?: string | null;
          duration_completed?: number | null;
          distance_covered?: number | null;
          calories_burned?: number | null;
          avg_pace?: number | null;
          rating?: number | null;
          notes?: string | null;
          created_at?: string | null;
        };
      };
      user_achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_type: string;
          title: string;
          description: string | null;
          icon_emoji: string | null;
          unlocked_at: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          achievement_type: string;
          title: string;
          description?: string | null;
          icon_emoji?: string | null;
          unlocked_at?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          achievement_type?: string;
          title?: string;
          description?: string | null;
          icon_emoji?: string | null;
          unlocked_at?: string | null;
          created_at?: string | null;
        };
      };
      personal_bests: {
        Row: {
          id: string;
          user_id: string;
          metric_type: string;
          value: number;
          unit: string;
          achieved_at: string | null;
          workout_session_id: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          metric_type: string;
          value: number;
          unit: string;
          achieved_at?: string | null;
          workout_session_id?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          metric_type?: string;
          value?: number;
          unit?: string;
          achieved_at?: string | null;
          workout_session_id?: string | null;
          created_at?: string | null;
        };
      };
      favorite_workouts: {
        Row: {
          id: string;
          user_id: string;
          workout_id: string;
          favorited_at: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          workout_id: string;
          favorited_at?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          workout_id?: string;
          favorited_at?: string | null;
          created_at?: string | null;
        };
      };
      user_settings: {
        Row: {
          id: string;
          user_id: string;
          notifications: any; // JSONB
          audio: any; // JSONB
          display: any; // JSONB
          units: any; // JSONB
          privacy: any; // JSONB
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          notifications?: any;
          audio?: any;
          display?: any;
          units?: any;
          privacy?: any;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          notifications?: any;
          audio?: any;
          display?: any;
          units?: any;
          privacy?: any;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      user_goals: {
        Row: {
          id: string;
          user_id: string;
          goal_type: string;
          target_value: number;
          current_value: number;
          period_start: string;
          period_end: string;
          status: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          goal_type: string;
          target_value: number;
          current_value?: number;
          period_start: string;
          period_end: string;
          status?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          goal_type?: string;
          target_value?: number;
          current_value?: number;
          period_start?: string;
          period_end?: string;
          status?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
};
