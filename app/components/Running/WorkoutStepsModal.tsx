"use client";
import React from "react";
import Modal from "../Basic/Modal";
import { MdTimer, MdSpeed, MdDirectionsRun, MdPlayArrow } from "react-icons/md";
import { Set, Step } from "../../types";
import { calculateWorkoutDistance, formatDistance } from "../../utils";

interface WorkoutStepsModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutName: string;
  sets: Set[];
  currentInterval: number;
  onJumpToInterval: (intervalIndex: number) => void;
}

const WorkoutStepsModal: React.FC<WorkoutStepsModalProps> = ({
  isOpen,
  onClose,
  workoutName,
  sets,
  currentInterval,
  onJumpToInterval
}) => {
  // Flatten intervals to get global index
  let globalIntervalIndex = 0;
  const setsWithGlobalIndex = sets.map(set => ({
    ...set,
    steps: set.steps.map(step => ({
      ...step,
      globalIndex: globalIntervalIndex++
    }))
  }));

  const totalDuration = sets.reduce((total, set) => 
    total + set.steps.reduce((stepTotal, step) => stepTotal + (step.duration || 0), 0), 0
  );
  
  const totalDistance = calculateWorkoutDistance(sets);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleJumpToStep = (globalIndex: number) => {
    onJumpToInterval(globalIndex);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${workoutName} - Workout Plan`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Workout Summary */}
        <div className="bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20 rounded-xl p-4 space-y-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-accent-primary">
                {sets.length}
              </div>
              <div className="text-xs text-dark-400 uppercase tracking-wide">
                Sets
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-accent-primary">
                {Math.round(totalDuration / 60)}min
              </div>
              <div className="text-xs text-dark-400 uppercase tracking-wide">
                Duration
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-accent-secondary">
                {totalDistance > 0 ? formatDistance(totalDistance) : "0km"}
              </div>
              <div className="text-xs text-dark-400 uppercase tracking-wide">
                Distance
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-accent-secondary">
                {currentInterval + 1} / {globalIntervalIndex}
              </div>
              <div className="text-xs text-dark-400 uppercase tracking-wide">
                Progress
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-dark-400">
              <span>Workout Progress</span>
              <span>{Math.round(((currentInterval + 1) / globalIntervalIndex) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-500"
                style={{ width: `${((currentInterval + 1) / globalIntervalIndex) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Sets and Steps */}
        <div className="space-y-4">
          {setsWithGlobalIndex.map((set, setIndex) => (
            <div key={setIndex} className="space-y-3">
              {/* Set Header */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent-secondary/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-accent-secondary">
                    {setIndex + 1}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-dark-100">
                  {set.name || `Set ${setIndex + 1}`}
                </h4>
              </div>

              {/* Steps */}
              <div className="space-y-2 ml-0 sm:ml-11">
                {set.steps.map((step, stepIndex) => {
                  const isCurrentStep = step.globalIndex === currentInterval;
                  const stepDuration = step.duration || 0;
                  
                  return (
                    <div
                      key={stepIndex}
                      className={`p-3 sm:p-4 rounded-lg border transition-all duration-200 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
                        isCurrentStep
                          ? "border-accent-primary bg-accent-primary/10 shadow-lg"
                          : "border-dark-600 bg-dark-700/50 hover:border-accent-primary/50 hover:bg-dark-700"
                      }`}
                      onClick={() => handleJumpToStep(step.globalIndex)}
                    >
                      {/* Mobile Layout */}
                      <div className="sm:hidden space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${
                              isCurrentStep ? "text-accent-primary" : "text-dark-200"
                            }`}>
                              Step {stepIndex + 1}
                            </span>
                            {isCurrentStep && (
                              <div className="flex items-center gap-1">
                                <MdPlayArrow className="text-accent-primary text-sm" />
                                <span className="text-xs text-accent-primary font-medium">
                                  CURRENT
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className={`text-sm ${
                          isCurrentStep ? "text-dark-100" : "text-dark-300"
                        }`}>
                          {step.legend || "No description"}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <MdTimer className={`text-sm ${
                              isCurrentStep ? "text-accent-primary" : "text-dark-400"
                            }`} />
                            <span className={`text-sm font-medium ${
                              isCurrentStep ? "text-dark-100" : "text-dark-300"
                            }`}>
                              {formatTime(stepDuration)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MdSpeed className={`text-sm ${
                              isCurrentStep ? "text-accent-primary" : "text-dark-400"
                            }`} />
                            <span className={`text-sm font-medium ${
                              isCurrentStep ? "text-dark-100" : "text-dark-300"
                            }`}>
                              {step.speed || 0} KPH
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden sm:flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {/* Step Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-sm font-medium ${
                                isCurrentStep ? "text-accent-primary" : "text-dark-200"
                              }`}>
                                Step {stepIndex + 1}
                              </span>
                              {isCurrentStep && (
                                <div className="flex items-center gap-1">
                                  <MdPlayArrow className="text-accent-primary text-sm" />
                                  <span className="text-xs text-accent-primary font-medium">
                                    CURRENT
                                  </span>
                                </div>
                              )}
                            </div>
                            <p className={`text-sm truncate ${
                              isCurrentStep ? "text-dark-100" : "text-dark-300"
                            }`}>
                              {step.legend || "No description"}
                            </p>
                          </div>

                          {/* Step Stats */}
                          <div className="flex items-center gap-4 flex-shrink-0">
                            <div className="flex items-center gap-1">
                              <MdTimer className={`text-sm ${
                                isCurrentStep ? "text-accent-primary" : "text-dark-400"
                              }`} />
                              <span className={`text-sm font-medium ${
                                isCurrentStep ? "text-dark-100" : "text-dark-300"
                              }`}>
                                {formatTime(stepDuration)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MdSpeed className={`text-sm ${
                                isCurrentStep ? "text-accent-primary" : "text-dark-400"
                              }`} />
                              <span className={`text-sm font-medium ${
                                isCurrentStep ? "text-dark-100" : "text-dark-300"
                              }`}>
                                {step.speed || 0}
                              </span>
                              <span className={`text-xs ${
                                isCurrentStep ? "text-dark-300" : "text-dark-500"
                              }`}>
                                KPH
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="bg-dark-700/50 border border-dark-600 rounded-lg p-4">
          <p className="text-sm text-dark-400 text-center">
            Tap any step to jump directly to that interval in your workout
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default WorkoutStepsModal;