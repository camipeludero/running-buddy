"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import WorkoutSelection from "./components/WorkoutSelection"; // Client component for rendering
import { mockWorkouts } from "./data/mockWorkouts";
import { Database } from "./types/supabase";

export default function WorkoutPage() {
  const [workouts, setWorkouts] = useState<any[]>(mockWorkouts);
  const [status, setStatus] = useState<"loading" | "demo" | "database" | "error">("loading");
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const { data, error } = await supabase.from("workouts").select("*");
        
        if (error) {
          console.warn("Database connection failed, using mock data:", error.message);
          setWorkouts(mockWorkouts);
          setStatus("demo");
          return;
        }

        if (!data || data.length === 0) {
          console.log("No workouts in database, using mock data");
          setWorkouts(mockWorkouts);
          setStatus("demo");
          return;
        }

        console.log("Successfully loaded workouts from database:", data.length);
        setWorkouts(data);
        setStatus("database");
      } catch (err) {
        console.error("Unexpected error connecting to database:", err);
        setWorkouts(mockWorkouts);
        setStatus("error");
      }
    };

    fetchWorkouts();
  }, [supabase]);

  const getStatusMessage = () => {
    switch (status) {
      case "loading":
        return (
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 text-center">
            <p className="text-blue-300 text-sm">
              🔄 Loading workouts...
            </p>
          </div>
        );
      case "demo":
        return (
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 text-center">
            <p className="text-yellow-300 text-sm">
              ⚠️ Using demo data - Database connection unavailable
            </p>
          </div>
        );
      case "database":
        return null; // No message when using real data
      case "error":
        return (
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-center">
            <p className="text-red-300 text-sm">
              🔴 Database unavailable - Using demo data
            </p>
          </div>
        );
    }
  };

  if (status === "loading") {
    return (
      <div className="space-y-4">
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 text-center">
          <p className="text-blue-300 text-sm">
            🔄 Loading workouts...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {getStatusMessage()}
      <WorkoutSelection workouts={workouts} />
    </div>
  );
}
