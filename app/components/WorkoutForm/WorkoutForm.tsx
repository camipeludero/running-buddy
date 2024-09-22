"use client";
import { useEffect, useRef } from "react";
import Input from "../Basic/Input";
import SetForm from "./SetForm";
import CategorySelect from "./CategorySelect";
import LevelSlider from "./LevelSlider";
import { useWorkoutStore } from "@/app/store/useWorkoutStore";
import { type Id, toast } from "react-toastify";
import { useFormState } from "react-dom";
import { addWorkout, Status } from "@/lib/actions";

export default function WorkoutForm() {
  const formRef = useRef(null);
  const initialToastId = "" as Id;
  const initialState = { type: "default", toastId: initialToastId } as Status;
  const [state, formAction] = useFormState(addWorkout, initialState);
  const { sets, totalDuration, calculateTotalDuration } = useWorkoutStore();

  useEffect(() => {
    calculateTotalDuration();
  }, [sets]);

  const handleSubmitForm = (formData: FormData) => {
    console.log("state", state);
    state.toastId = toast.loading("Loading...");
    formAction(formData);
  };

  useEffect(() => {
    if (state.type === "success") {
      toast.update(state.toastId, {
        render: "Success!",
        type: "success",
        autoClose: 1500,
        closeButton: true,
        isLoading: false,
      });
    } else if (state.type === "error") {
      toast.update(state.toastId, {
        render: "Error!",
        type: "error",
        autoClose: 1500,
        closeButton: true,
        isLoading: false,
      });
    }
    formRef.current?.reset();

    state.type = initialState.type;
  }, [initialState.type, state]);

  const jsonSets = JSON.stringify(sets);

  return (
    <form
      ref={formRef}
      action={handleSubmitForm}
      className="flex flex-col w-full gap-3"
    >
      <h4>Add a workout name</h4>
      <Input type="text" name="name" placeholder="Workout Name" />
      <CategorySelect />
      <LevelSlider />
      <SetForm />
      <input type="hidden" name="sets" value={jsonSets} />
      <input type="hidden" name="duration" value={totalDuration} />
      <button type="submit">Submit</button>
    </form>
  );
}
