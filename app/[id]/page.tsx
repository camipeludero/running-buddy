"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../types/supabase";
import { mockWorkouts } from "../data/mockWorkouts";
import Link from "next/link";
import { useParams } from "next/navigation";

import Running from "../components/Running";

export default function WorkoutPage() {
  const params = useParams();
  const id = params.id as string;
  const [workout, setWorkout] = useState<any>(null);
  const [status, setStatus] = useState<"loading" | "found" | "notfound">("loading");
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        // Simple select - sets are stored as JSON, not separate tables
        const { data, error } = await supabase
          .from("workouts")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.warn("Database error, checking mock data:", error.message);
          
          // Fallback to mock data
          const mockWorkout = mockWorkouts.find(w => w.id === id);
          if (mockWorkout) {
            setWorkout(mockWorkout);
            setStatus("found");
            return;
          }
          
          // No workout found
          setStatus("notfound");
          return;
        }

        if (!data) {
          // Try mock data
          const mockWorkout = mockWorkouts.find(w => w.id === id);
          if (mockWorkout) {
            setWorkout(mockWorkout);
            setStatus("found");
            return;
          }
          
          setStatus("notfound");
          return;
        }

        console.log('workout from database:', data);
        setWorkout(data);
        setStatus("found");
      } catch (err) {
        console.error("Unexpected error:", err);
        
        // Fallback to mock data
        const mockWorkout = mockWorkouts.find(w => w.id === id);
        if (mockWorkout) {
          setWorkout(mockWorkout);
          setStatus("found");
          return;
        }

        setStatus("notfound");
      }
    };

    fetchWorkout();
  }, [id, supabase]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 text-center">
          <p className="text-blue-300 text-sm">
            🔄 Loading workout...
          </p>
        </div>
      </div>
    );
  }

  if (status === "notfound") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="card text-center space-y-4 max-w-md">
          <h3 className="text-xl font-semibold text-red-400">Workout Not Found</h3>
          <p className="text-gray-400">
            The requested workout could not be found.
          </p>
          <Link href="/" className="button-primary">
            Back to Workouts
          </Link>
        </div>
      </div>
    );
  }

  return <Running workout={workout} />;
}