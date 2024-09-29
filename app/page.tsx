import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import WorkoutSelection from "./components/WorkoutSelection"; // Client component for rendering
import { Database } from "./types/supabase";

export default async function WorkoutPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: workouts, error } = await supabase.from("workouts").select("*");

  if (error) {
    console.error("Error fetching workouts:", error);
    return <div>Error loading workouts</div>;
  }

  return <WorkoutSelection workouts={workouts} />;
}
