import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../types/supabase";
import { mockWorkouts } from "../data/mockWorkouts";
import { notFound } from "next/navigation";

import Running from "../components/Running";

interface WorkoutPageProps {
  params: {
    id: string;
  };
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = params;
  let workout = null;

  try {
    const supabase = createServerComponentClient<Database>({ cookies });
    
    // Try to get workout from database first
    const { data, error } = await supabase
      .from("workouts")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      console.log('workout from database:', data);
      workout = data;
    } else {
      console.warn("Database error, checking mock data:", error?.message);
      
      // Fallback to mock data
      const mockWorkout = mockWorkouts.find(w => w.id === id);
      if (mockWorkout) {
        workout = mockWorkout;
      }
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    
    // Fallback to mock data
    const mockWorkout = mockWorkouts.find(w => w.id === id);
    if (mockWorkout) {
      workout = mockWorkout;
    }
  }

  // If no workout found in database or mock data, show 404
  if (!workout) {
    notFound();
  }

  return <Running workout={workout} />;
}