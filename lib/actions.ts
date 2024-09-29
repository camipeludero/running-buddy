"use server";

import type { Id } from "react-toastify";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

export type Status = {
  type: "default" | "loading" | "success" | "error";
  toastId: Id;
};

export async function addWorkout(
  previousState: Status,
  formData: FormData
): Promise<Status> {
  const id = uuidv4();
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const type = formData.get("type") as string;
  const duration = Number(formData.get("duration"));
  const level = Number(formData.get("level"));

  const sets = JSON.parse(formData.get("sets") as string);

  const supabase = createServerActionClient({
    cookies,
  });

  const { data: workoutData, error: workoutError } = await supabase
    .from("workouts")
    .insert({
      id,
      name,
      category,
      type,
      duration,
      level,
    })
    .select();

  if (workoutError) {
    console.error(workoutError);
    return { ...previousState, type: "error" }; // Return error state
  }

  if (workoutData) {
    const workoutId = workoutData[0].id;

    for (const set of sets) {
      const { data: setData, error: setError } = await supabase
        .from("sets")
        .insert({
          name: set.name,
          workout_id: workoutId,
        })
        .select();

      if (setError) {
        console.error(setError);
        return { ...previousState, type: "error" }; // Return error state
      }

      if (setData) {
        const setId = setData[0].id;

        for (const step of set.steps) {
          const { error: stepError } = await supabase
            .from("steps")
            .insert({
              set_id: setId,
              duration: step.duration,
              speed: step.speed,
              legend: step.legend,
            });

          if (stepError) {
            return { ...previousState, type: "error" }; // Return error state
          }
        }
      }
    }
  }

  return { ...previousState, type: "success" }; // Return success state
}
