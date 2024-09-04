'use client'
import React from "react";
import { workouts } from "@/app/utils/workouts";
import Running from "../Running"; // Assuming Running is in the same folder
import { BsBarChartFill } from "react-icons/bs";
import { getLevel } from "../../utils";
import { MdTimer } from "react-icons/md";
import { useWorkoutStore } from "@/app/store/useWorkoutStore";

const WorkoutSelection = () => {
  const {selectedWorkout, setSelectedWorkout} = useWorkoutStore();

  if (selectedWorkout) {
    return <Running />;
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="px-6">Choose workout to smash today</h2>
      <ul className="flex gap-2 overflow-x-auto px-6">
        {workouts.map((workout, index) => (
          <li
            key={index}
            className="border p-4 cursor-pointer rounded-lg border-black min-h-[140px] min-w-[160px] flex flex-col justify-between"
            onClick={() => setSelectedWorkout(workout)}
          >
            <p className="uppercase">{workout.name}</p>
            <div>

            <p className="flex items-center gap-2 uppercase">
              <BsBarChartFill />
              {getLevel(workout.level)}
            </p>
            <p className="flex items-center gap-2 uppercase"><MdTimer />{workout.duration} MIN
            </p>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="px-6">Your own workout</h2>
    </div>
  );
};

export default WorkoutSelection;
