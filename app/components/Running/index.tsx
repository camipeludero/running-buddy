"use client";
import React, { useState, useEffect, useMemo } from "react";
import useSound from "use-sound";
import { FaChevronLeft } from "react-icons/fa";
import { RiPauseLargeFill } from "react-icons/ri";
import { IoMdPlay } from "react-icons/io";
import { GrStopFill } from "react-icons/gr";
import { MdOutlinePlaylistPlay, MdSkipPrevious, MdSkipNext, MdDirectionsRun, MdTimer, MdSpeed } from "react-icons/md";
import { Set, Step, Workout } from "../../types";
import Link from "next/link";
import WorkoutStepsModal from "./WorkoutStepsModal";
import WorkoutCompletionScreen from "./WorkoutCompletionScreen";

interface RunningProps {
  workout: Workout; // Define the prop type
}

const Running: React.FC<RunningProps> = ({ workout }) => {
  console.log('Running component received workout:', workout);

  const sets: Set[] = useMemo(() => {
    if (!workout?.sets) return [];
    
    // Handle both JSON string and already parsed object
    let parsedSets: Set[] = [];
    if (typeof workout.sets === 'string') {
      try {
        parsedSets = JSON.parse(workout.sets) as Set[];
      } catch (error) {
        console.error('Error parsing sets JSON:', error);
        return [];
      }
    } else {
      parsedSets = workout.sets;
    }
    
    console.log('Parsed sets:', parsedSets);
    return parsedSets || [];
  }, [workout]);

  const intervals: Step[] = useMemo(() => {
    const flatIntervals = sets.flatMap((set) => set.steps);
    console.log('Flattened intervals:', flatIntervals);
    return flatIntervals;
  }, [sets]);

  const totalDuration = intervals.reduce((sum, step) => sum + (step.duration || 0), 0);

  const [currentSet, setCurrentSet] = useState(0);
  const [currentInterval, setCurrentInterval] = useState(0);
  const [timeLeft, setTimeLeft] = useState(intervals[0]?.duration || 0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [play] = useSound("/sounds/alert.mp3");

  const [distanceCovered, setDistanceCovered] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);

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

  // Reset timeLeft when intervals change or component mounts
  useEffect(() => {
    if (intervals.length > 0 && intervals[currentInterval]) {
      setTimeLeft(intervals[currentInterval].duration || 0);
    }
  }, [intervals, currentInterval]);

  useEffect(() => {
    if (isRunning && timeLeft > 0 && intervals[currentInterval]) {
      setDistanceCovered((prevDistance) => {
        const currentSpeed = (intervals[currentInterval].speed || 0) / 3600;
        return prevDistance + currentSpeed;
      });
    }
  }, [timeLeft, isRunning, currentInterval, intervals]);

  useEffect(() => {
    if (!isRunning || intervals.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1 && currentInterval === intervals.length - 1) {
          play();
          setIsRunning(false);
          setIsWorkoutComplete(true);
          return 0;
        }

        if (prevTime <= 1) {
          play();

          const nextInterval = currentInterval + 1;
          if (nextInterval < intervals.length && intervals[nextInterval]) {
            setCurrentInterval(nextInterval);
            return intervals[nextInterval].duration || 0;
          }
          return 0;
        }
        return prevTime - 1;
      });

      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentInterval, isRunning, intervals, play]);

  const startTimer = () => {
    console.log('Starting timer, current interval:', currentInterval, 'intervals:', intervals);
    if (intervals.length > 0 && intervals[currentInterval]) {
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    console.log('Stopping timer');
    setIsRunning(false);
    setCurrentInterval(0);
    setTimeLeft(intervals[0]?.duration || 0);
    setElapsedTime(0);
    setDistanceCovered(0);
    setCurrentSet(0);
  };

  const prevInterval = () => {
    console.log('Previous interval clicked, current:', currentInterval);
    if (currentInterval > 0 && intervals[currentInterval - 1]) {
      const previousInterval = currentInterval - 1;
      setCurrentInterval(previousInterval);
      setTimeLeft(intervals[previousInterval].duration || 0);
      setIsRunning(false);
    }
  };

  const nextInterval = () => {
    console.log('Next interval clicked, current:', currentInterval, 'total:', intervals.length);
    if (currentInterval < intervals.length - 1 && intervals[currentInterval + 1]) {
      const nextInterval = currentInterval + 1;
      setCurrentInterval(nextInterval);
      setTimeLeft(intervals[nextInterval].duration || 0);
      setIsRunning(false);
    }
  };

  const jumpToInterval = (intervalIndex: number) => {
    console.log('Jumping to interval:', intervalIndex);
    if (intervalIndex >= 0 && intervalIndex < intervals.length && intervals[intervalIndex]) {
      setCurrentInterval(intervalIndex);
      setTimeLeft(intervals[intervalIndex].duration || 0);
      setIsRunning(false);
    }
  };

  const openWorkoutMenu = () => {
    console.log('Opening workout menu');
    setIsModalOpen(true);
  };

  const progressPercentage = totalDuration > 0 ? (elapsedTime / totalDuration) * 100 : 0;

  const currentStepDuration = intervals[currentInterval]?.duration || 0;
  const stepProgressPercentage = currentStepDuration > 0 
    ? ((currentStepDuration - timeLeft) / currentStepDuration) * 100 
    : 0;

  const nextLegend =
    currentInterval < intervals.length - 1 && intervals[currentInterval + 1]
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

  // Safety check for empty intervals
  if (intervals.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="card text-center space-y-4 max-w-md">
          <h3 className="text-xl font-semibold text-red-400">Invalid Workout Data</h3>
          <p className="text-gray-400">
            This workout has no intervals or steps configured.
          </p>
          <Link href="/" className="button-primary">
            Back to Workouts
          </Link>
        </div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="card text-center space-y-4">
          <h3 className="text-xl font-semibold text-dark-100">Error loading workout</h3>
          <p className="text-dark-400">Please try again or select a different workout</p>
          <Link href="/" className="button-primary inline-block">
            Back to Workouts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 space-y-4 sm:space-y-6 animate-fade-in max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <Link 
          href="/" 
          className="p-2 sm:p-3 rounded-xl bg-dark-700 hover:bg-dark-600 text-dark-200 hover:text-white transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          <FaChevronLeft className="text-base sm:text-lg" />
        </Link>
        <div className="text-center flex-1 mx-4">
          <h1 className="text-lg sm:text-xl font-bold text-dark-100 uppercase tracking-wide truncate">
            {workout?.name}
          </h1>
          <p className="text-dark-400 text-xs sm:text-sm">Workout in Progress</p>
        </div>
        <div className="w-8 sm:w-12"></div> {/* Spacer for center alignment */}
      </div>

      {/* Overall Progress Bar */}
      <div className="card space-y-3 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium text-dark-200">Overall Progress</span>
          <span className="text-xs sm:text-sm font-bold text-accent-primary">{progressPercentage.toFixed(0)}%</span>
        </div>
        <div className="w-full h-2 sm:h-3 bg-dark-600 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Main Timer Circle */}
      <div className="flex flex-col items-center space-y-4 sm:space-y-6">
        <div
          className="relative flex items-center justify-center mx-auto"
          style={{ width: "min(75vw, 280px)", height: "min(75vw, 280px)" }}
        >
          {/* Circular Progress Ring */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 120 120"
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="rgb(42, 42, 42)"
              strokeWidth="6"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(99, 102, 241)" />
                <stop offset="100%" stopColor="rgb(139, 92, 246)" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Timer Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-1 sm:space-y-2 px-4">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-100 tabular-nums">
              {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-accent-primary/20 px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-accent-primary/30">
              <MdSpeed className="text-accent-primary text-sm sm:text-base" />
              <span className="text-sm sm:text-base font-bold text-accent-primary">
                {intervals[currentInterval]?.speed || 0}KPH
              </span>
            </div>
            <p className="text-dark-300 uppercase tracking-wide font-medium text-xs sm:text-sm text-center leading-tight">
              {intervals[currentInterval]?.legend || "No data"}
            </p>
          </div>
        </div>

        {/* Next Interval Preview */}
        <div className="text-center space-y-1 px-4">
          <p className="text-dark-400 text-xs uppercase tracking-wide">Next</p>
          <p className="text-dark-200 font-medium text-sm text-center leading-tight">
            {nextLegend === "Finished"
              ? "🎉 Workout Completed!"
              : nextLegend}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <div className="card text-center space-y-1 sm:space-y-2 p-3 sm:p-4">
          <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-accent-success/20 rounded-lg mx-auto">
            <MdDirectionsRun className="text-accent-success text-sm sm:text-base" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-dark-100 tabular-nums">
            {distanceCovered.toFixed(1)}
            <span className="text-xs text-dark-400 ml-1">KM</span>
          </div>
          <p className="text-xs text-dark-400 uppercase tracking-wide">Distance</p>
        </div>
        
        <div className="card text-center space-y-1 sm:space-y-2 p-3 sm:p-4">
          <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-accent-primary/20 rounded-lg mx-auto">
            <MdTimer className="text-accent-primary text-sm sm:text-base" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-dark-100 tabular-nums">
            {totalMinutesCompleted}
          </div>
          <p className="text-xs text-dark-400 uppercase tracking-wide">Time</p>
        </div>
        
        <div className="card text-center space-y-1 sm:space-y-2 p-3 sm:p-4">
          <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-accent-warning/20 rounded-lg mx-auto">
            <MdOutlinePlaylistPlay className="text-accent-warning text-sm sm:text-base" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-dark-100 tabular-nums">
            {fractionOfSetsMade}
          </div>
          <p className="text-xs text-dark-400 uppercase tracking-wide">Sets</p>
        </div>
      </div>

      {/* Control Buttons - Mobile First Design */}
      <div className="space-y-4 pt-2">
        {/* Main Play/Pause Button - Full Width on Mobile */}
        <div className="flex justify-center">
          {!isRunning ? (
            <button
              className="p-4 sm:p-5 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-secondary hover:to-accent-primary shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
              onClick={startTimer}
              title="Start workout"
            >
              <IoMdPlay className="text-2xl sm:text-3xl text-white ml-1" />
            </button>
          ) : (
            <button
              className="p-4 sm:p-5 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-secondary hover:to-accent-primary shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
              onClick={() => setIsRunning(false)}
              title="Pause workout"
            >
              <RiPauseLargeFill className="text-2xl sm:text-3xl text-white" />
            </button>
          )}
        </div>

        {/* Secondary Controls */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {/* Stop Button */}
          <button
            className="p-3 sm:p-4 rounded-xl bg-accent-error/20 hover:bg-accent-error/30 border border-accent-error/30 hover:border-accent-error text-accent-error transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center"
            onClick={stopTimer}
            title="Stop workout"
          >
            <GrStopFill className="text-sm sm:text-base" />
          </button>

          {/* Previous Button */}
          <button
            className="p-3 sm:px-4 sm:py-3 rounded-xl bg-dark-700 hover:bg-dark-600 border border-dark-600 hover:border-accent-primary text-dark-200 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none flex items-center justify-center"
            disabled={currentInterval === 0}
            onClick={prevInterval}
            title="Previous interval"
          >
            <MdSkipPrevious className="text-sm sm:text-base" />
          </button>

          {/* Next Button */}
          <button
            className="p-3 sm:px-4 sm:py-3 rounded-xl bg-dark-700 hover:bg-dark-600 border border-dark-600 hover:border-accent-primary text-dark-200 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none flex items-center justify-center"
            disabled={currentInterval >= intervals.length - 1}
            onClick={nextInterval}
            title="Next interval"
          >
            <MdSkipNext className="text-sm sm:text-base" />
          </button>

          {/* Menu Button */}
          <button
            className="p-3 sm:p-4 rounded-xl bg-dark-700 hover:bg-dark-600 border border-dark-600 hover:border-accent-primary text-dark-200 hover:text-white transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center"
            onClick={openWorkoutMenu}
            title="View workout steps"
          >
            <MdOutlinePlaylistPlay className="text-sm sm:text-base" />
          </button>
        </div>
      </div>

      {/* Workout Steps Modal */}
      <WorkoutStepsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        workoutName={workout?.name || "Workout"}
        sets={sets}
        currentInterval={currentInterval}
        onJumpToInterval={jumpToInterval}
      />

      {/* Workout Completion Screen */}
      {isWorkoutComplete && (
        <WorkoutCompletionScreen
          workout={workout}
          elapsedTime={elapsedTime}
          onClose={() => setIsWorkoutComplete(false)}
        />
      )}
    </div>
  );
};

export default Running;
