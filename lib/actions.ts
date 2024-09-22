"use server";

/* import type Id statement added */
import type { Id } from "react-toastify";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

export type Status = {
  type: "default" | "loading" | "success" | "error";
  toastId: Id /* Added a toastId field of type Id */;
};

export async function addWorkout(previousState: Status, formData: FormData) {
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
    previousState.type = "error";
    return;
  }

  if (workoutData) {
    const workoutId = workoutData[0].id;

    // Insert sets and steps
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
        previousState.type = "error";
        continue;
      }

      if (setData) {
        const setId = setData[0].id;

        for (const step of set.steps) {
          const { data: stepData, error: stepError } = await supabase
            .from("steps")
            .insert({
              set_id: setId,
              duration: step.duration,
              speed: step.speed,
              legend: step.legend,
            });

          if (stepError) {
            previousState.type = "error";
            continue;
          }
        }
      }
    }
  }
  previousState.type = "success";
  return previousState;
}
