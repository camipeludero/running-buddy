"use client";
import { useEffect, useRef, useState } from "react";
import Input from "../Basic/Input";
import SetForm from "./SetForm";
import CategorySelect from "./CategorySelect";
import LevelSlider from "./LevelSlider";
import { useWorkoutStore } from "@/app/store/useWorkoutStore";
import { type Id, toast } from "react-toastify";
import { useFormState } from "react-dom";
import { addWorkout, Status } from "@/lib/actions";

export default function WorkoutForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const initialToastId = "" as Id;
  const initialState: Status = { type: "default", toastId: initialToastId };

  const [state, formAction] = useFormState(addWorkout, initialState);

  const { sets, totalDuration, calculateTotalDuration } = useWorkoutStore();
  const [workoutName, setWorkoutName] = useState<string>("");

  useEffect(() => {
    calculateTotalDuration();
  }, [sets, calculateTotalDuration]);

  const handleSubmitForm = (formData: FormData) => {
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
  }, [state]);

  const jsonSets = JSON.stringify(sets);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
          Create Custom Workout
        </h1>
        <p className="text-dark-400 text-lg">
          Design your personalized training session
        </p>
      </div>

      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(formRef.current!);
          handleSubmitForm(formData);
        }}
        className="card space-y-8"
      >
        {/* Workout Name Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-xl font-semibold text-dark-100">Workout Name</h4>
            <p className="text-dark-400 text-sm">Give your workout a memorable name</p>
          </div>
          <Input
            type="text"
            name="name"
            placeholder="e.g., Morning Sprint Session"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
          />
        </div>

        {/* Category Section */}
        <CategorySelect />
        
        {/* Level Section */}
        <LevelSlider />
        
        {/* Sets Section */}
        <SetForm />
        
        {/* Workout Summary */}
        <div className="bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20 rounded-xl p-6 space-y-3">
          <h4 className="text-lg font-semibold text-dark-100">Workout Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-dark-400">Total Sets:</span>
              <span className="ml-2 font-medium text-dark-200">{sets.length}</span>
            </div>
            <div>
              <span className="text-dark-400">Total Duration:</span>
              <span className="ml-2 font-medium text-accent-primary">{totalDuration} min</span>
            </div>
          </div>
        </div>

        {/* Hidden Inputs */}
        <input type="hidden" name="sets" value={jsonSets} />
        <input type="hidden" name="duration" value={totalDuration} />
        
        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button type="submit" className="button-primary min-w-[200px]">
            Create Workout
          </button>
        </div>
      </form>
    </div>
  );
}
