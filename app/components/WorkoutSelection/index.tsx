"use client";
import React from "react";
import Running from "../Running"; // Assuming Running is in the same folder
import { BsBarChartFill } from "react-icons/bs";
import { MdTimer } from "react-icons/md";
import { getLevel } from "../../utils";
import { useWorkoutStore } from "@/app/store/useWorkoutStore";
import Link from "next/link";

// Define the type for workouts
type Workout = {
  id: string;
  name: string;
  category: string;
  type: string;
  duration: number;
  level: number;
};

interface WorkoutSelectionProps {
  workouts: Workout[];
}

const WorkoutSelection: React.FC<WorkoutSelectionProps> = ({ workouts }) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="px-6">Choose workout to smash today</h2>
      <ul className="flex gap-2 overflow-x-auto px-6">
        {workouts.map((workout) => (
          <Link
            href={`/${workout.id}`}
            key={workout.id}
            className="border p-4 cursor-pointer rounded-lg border-black min-h-[140px] min-w-[160px] flex flex-col justify-between"
          >
            <p className="uppercase">{workout.name}</p>
            <div>
              <p className="flex items-center gap-2 uppercase">
                <BsBarChartFill />
                {getLevel(workout.level)}
              </p>
              <p className="flex items-center gap-2 uppercase">
                <MdTimer />
                {workout.duration} MIN
              </p>
            </div>
          </Link>
        ))}
      </ul>
      <div className="flex flex-col gap-4 px-6">
        <h2>Your own workout</h2>
        <Link href="/new" className="button-primary">
          CREATE
        </Link>
      </div>
    </div>
  );
};

export default WorkoutSelection;
