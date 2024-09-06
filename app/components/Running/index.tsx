"use client";
import React, { useState, useEffect } from "react";
import {  Set, Step } from "../../types";
import useSound from "use-sound";
import { FaChevronLeft } from "react-icons/fa";
import { useWorkoutStore } from "@/app/store/useWorkoutStore";
import { RiPauseLargeFill } from "react-icons/ri";
import { IoMdPlay } from "react-icons/io";
import { GrStopFill } from "react-icons/gr";
import { MdOutlinePlaylistPlay } from "react-icons/md";

const Running: React.FC = () => {
  const { selectedWorkout, setSelectedWorkout } = useWorkoutStore();

  const sets: Set[] = selectedWorkout?.sets || [];
  const intervals: Step[] = sets.flatMap((set) => set.steps);

  const totalDuration = intervals.reduce((sum, step) => sum + step.duration, 0);

  const [currentSet, setCurrentSet] = useState(0);
  const [currentInterval, setCurrentInterval] = useState(0);
  const [timeLeft, setTimeLeft] = useState(intervals[0].duration);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [play] = useSound("/sounds/alert.mp3");

  const [distanceCovered, setDistanceCovered] = useState(0);

  useEffect(() => {
    let cumulativeSteps = 0;
    for (let i = 0; i < sets.length; i++) {
      cumulativeSteps += sets[i].steps.length;
      if (currentInterval < cumulativeSteps) {
        setCurrentSet(i);
        break;
      }
    }
  }, [currentInterval, sets]);

  useEffect(() => {
    setDistanceCovered(
      intervals[currentInterval].speed *
        ((intervals[currentInterval].duration - timeLeft) / 3600)
    );
  }, [timeLeft]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1 && currentInterval === intervals.length - 1) {
          play();
          setIsRunning(false);
          clearInterval(timer);
          return 0;
        }

        if (prevTime <= 1) {
          play();

          const nextInterval = currentInterval + 1;
          setCurrentInterval(nextInterval);
          return intervals[nextInterval].duration;
        }
        return prevTime - 1;
      });

      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentInterval, isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setCurrentInterval(0);
    setTimeLeft(intervals[0].duration);
    setElapsedTime(0);
    setDistanceCovered(0);
    setCurrentSet(0);
  };

  const prevInterval = () => {
    if (currentInterval > 0) {
      const previousInterval = currentInterval - 1;
      setCurrentInterval(previousInterval);
      setTimeLeft(intervals[previousInterval].duration);
    }
  };

  const nextInterval = () => {
    if (currentInterval < intervals.length - 1) {
      const nextInterval = currentInterval + 1;
      setCurrentInterval(nextInterval);
      setTimeLeft(intervals[nextInterval].duration);
    }
  };

  const progressPercentage = (elapsedTime / totalDuration) * 100;

  const currentStepDuration = intervals[currentInterval].duration;
  const stepProgressPercentage =
    ((currentStepDuration - timeLeft) / currentStepDuration) * 100;

  const nextLegend =
    currentInterval < intervals.length - 1
      ? `${intervals[currentInterval + 1].legend} - ${
          intervals[currentInterval + 1].speed
        }KPH`
      : "Finished";

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (stepProgressPercentage / 100) * circumference;

  const getMinutesCompleted = (elapsedTime: number) => {
    const totalMinutes = Math.floor(elapsedTime / 60);
    const totalSeconds = Math.floor(elapsedTime % 60);

    const timeFormatted = `${totalMinutes}:${totalSeconds
      .toString()
      .padStart(2, "0")}`;
    return timeFormatted;
  };

  const totalMinutesCompleted = getMinutesCompleted(elapsedTime);

  const fractionOfSetsMade = `${currentSet}/${sets.length}`;

  return (
    <div className="flex flex-col items-center justify-center px-6 gap-6">
      <div className="flex items-center justify-between w-full">
        <button onClick={() => setSelectedWorkout(null)}>
          <FaChevronLeft />
        </button>
        <h4 className="w-full text-center uppercase font-normal">
          {selectedWorkout?.name}
        </h4>
      </div>
      <div className="w-full flex items-center gap-3 justify-between">
        <div className="w-full h-2 border border-black rounded-full">
          <div
            className="bg-orange border border-black h-full"
            style={{
              width: `${progressPercentage}%`,
              transition: "width 0.5s ease",
            }}
          ></div>
        </div>
        <h5>{progressPercentage.toFixed(0)}%</h5>
      </div>
      <div className="flex items-center justify-center text-center flex-col gap-3">
        <div
          className="relative"
          style={{ width: "min(80vw, 400px)", height: "min(80vw, 400px)" }}
        >
          {/* Circular Progress Bar */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 120 120" // Set the viewBox to match the original size
          >
            {/* Background circle (border) */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#000"
              strokeWidth="6"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#F6F5E9"
              strokeWidth="5"
            />
            {/* Progress circle (orange) */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#F58E12"
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 60 60)" // Rotate 90 degrees counterclockwise
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center">
            <h1 className="text-5xl">
              {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </h1>
            <h4 className="font-bold text-2xl mt-8">
              {intervals[currentInterval].speed}KPH
            </h4>
            <p className="uppercase">{intervals[currentInterval].legend}</p>
          </div>
        </div>
        <p className="uppercase">
          {nextLegend === "Finished"
            ? "Workout Completed!"
            : `Next: ${nextLegend}`}
        </p>
        {/* Additional Information */}
        <div className="flex items-center justify-between gap-1 mt-4 w-full">
          <div className="flex items-start flex-col">
            <h4 className="text-3xl">{distanceCovered.toFixed(1)}<span className="text-sm">KM</span></h4>
            <p>DISTANCE</p>
          </div>
          <div className="flex items-center flex-col">
            <h4 className="text-3xl">{totalMinutesCompleted}</h4>
            <p>TIME</p>
          </div>
          <div className="flex items-end flex-col">
            <h4 className="text-3xl">{fractionOfSetsMade}</h4>
            <p>SETS</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-8 px-6">
        <button
          className="border border-black rounded-full w-10 h-10 flex items-center justify-center"
          onClick={stopTimer}
        >
          <GrStopFill />
        </button>
        <button
          className="disabled:opacity-40"
          disabled={currentInterval === 0}
          onClick={prevInterval}
        >
          PREV
        </button>
        {!isRunning && (
          <button
            className="bg-orange border border-black rounded-full w-[80px] h-[80px] flex items-center justify-center"
            onClick={startTimer}
          >
            <IoMdPlay size="40" />
          </button>
        )}
        {isRunning && (
          <button
            className="bg-orange border border-black rounded-full w-[80px] h-[80px] flex items-center justify-center"
            onClick={() => setIsRunning(false)}
          >
            <RiPauseLargeFill size="40" />
          </button>
        )}
        <button
          disabled={currentInterval >= intervals.length - 1}
          className="disabled:opacity-40"
          onClick={nextInterval}
        >
          NEXT
        </button>
        <button
          className="border border-black rounded-full w-10 h-10 flex items-center justify-center"
          onClick={() => setIsRunning(false)}
        >
          <MdOutlinePlaylistPlay />
        </button>
      </div>
    </div>
  );
};

export default Running;
