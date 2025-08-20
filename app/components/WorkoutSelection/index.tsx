"use client";
import React, { useState, useMemo } from "react";
import { BsBarChartFill } from "react-icons/bs";
import { MdTimer, MdFitnessCenter, MdAdd, MdDirectionsRun, MdFilterList } from "react-icons/md";
import { getLevel, calculateWorkoutDistance, getDistanceCategory, formatDistance } from "../../utils";
import Link from "next/link";

type Workout = {
  id: string;
  name: string;
  category: string;
  type: string;
  duration: number;
  level: number;
  sets?: any; // For distance calculation
};

interface WorkoutSelectionProps {
  workouts: Workout[];
}

const WorkoutSelection: React.FC<WorkoutSelectionProps> = ({ workouts }) => {
  const [selectedDistanceFilter, setSelectedDistanceFilter] = useState<string>("All");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");
  const [selectedDurationFilter, setSelectedDurationFilter] = useState<string>("All");
  
  // Process workouts with distance calculations
  const workoutsWithDistance = useMemo(() => {
    return workouts.map(workout => {
      let parsedSets = [];
      if (workout.sets) {
        try {
          parsedSets = typeof workout.sets === 'string' ? JSON.parse(workout.sets) : workout.sets;
        } catch (error) {
          console.error('Error parsing sets for workout:', workout.id, error);
        }
      }
      
      const distance = calculateWorkoutDistance(parsedSets);
      const distanceCategory = getDistanceCategory(distance);
      
      return {
        ...workout,
        distance,
        distanceCategory,
        parsedSets
      };
    });
  }, [workouts]);

  // Get filter options
  const distanceCategories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(workoutsWithDistance.map(w => w.distanceCategory)));
    const categories = ["All", ...uniqueCategories];
    return categories.sort((a, b) => {
      if (a === "All") return -1;
      if (b === "All") return 1;
      const aNum = parseInt(a);
      const bNum = parseInt(b);
      return aNum - bNum;
    });
  }, [workoutsWithDistance]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(workouts.map(w => w.category)));
    return ["All", ...uniqueCategories];
  }, [workouts]);

  const durationRanges = ["All", "0-15 min", "15-30 min", "30-45 min", "45+ min"];

  // Filter workouts
  const filteredWorkouts = useMemo(() => {
    return workoutsWithDistance.filter(workout => {
      // Distance filter
      if (selectedDistanceFilter !== "All" && workout.distanceCategory !== selectedDistanceFilter) {
        return false;
      }
      
      // Category filter
      if (selectedCategoryFilter !== "All" && workout.category !== selectedCategoryFilter) {
        return false;
      }
      
      // Duration filter
      if (selectedDurationFilter !== "All") {
        const duration = workout.duration;
        switch (selectedDurationFilter) {
          case "0-15 min":
            if (duration > 15) return false;
            break;
          case "15-30 min":
            if (duration <= 15 || duration > 30) return false;
            break;
          case "30-45 min":
            if (duration <= 30 || duration > 45) return false;
            break;
          case "45+ min":
            if (duration <= 45) return false;
            break;
        }
      }
      
      return true;
    });
  }, [workoutsWithDistance, selectedDistanceFilter, selectedCategoryFilter, selectedDurationFilter]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in px-4 py-6">
      {/* Header Section */}
      <div className="text-center space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-dark-100 flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-4">
          <MdFitnessCenter className="text-2xl sm:text-3xl lg:text-4xl text-accent-primary" />
          Choose workout to smash today
        </h2>
        <p className="text-dark-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
          Select from our curated workouts or create your own personalized training session
        </p>
      </div>

      {/* Filters */}
      <div className="bg-dark-800/50 border border-dark-600 rounded-xl p-4 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <MdFilterList className="text-accent-primary text-lg" />
          <h3 className="text-lg font-semibold text-dark-200">Filter Workouts</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Distance Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-dark-300">Distance</label>
            <select
              value={selectedDistanceFilter}
              onChange={(e) => setSelectedDistanceFilter(e.target.value)}
              className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-dark-100 focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
            >
              {distanceCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-dark-300">Category</label>
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-dark-100 focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Duration Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-dark-300">Duration</label>
            <select
              value={selectedDurationFilter}
              onChange={(e) => setSelectedDurationFilter(e.target.value)}
              className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-dark-100 focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
            >
              {durationRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="text-center pt-2">
          <span className="text-sm text-dark-400">
            Showing {filteredWorkouts.length} of {workouts.length} workouts
          </span>
        </div>
      </div>

      {/* Workouts Grid */}
      <div className="space-y-4 sm:space-y-6">
        <h3 className="text-lg sm:text-xl font-semibold text-dark-200">
          {selectedDistanceFilter !== "All" || selectedCategoryFilter !== "All" || selectedDurationFilter !== "All" 
            ? "Filtered Workouts" 
            : "Available Workouts"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredWorkouts.map((workout) => (
            <Link
              href={`/${workout.id}`}
              key={workout.id}
              className="card-interactive group animate-slide-up"
              style={{ animationDelay: `${filteredWorkouts.indexOf(workout) * 100}ms` }}
            >
              <div className="space-y-4">
                {/* Workout Name */}
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-dark-100 group-hover:text-accent-primary transition-colors uppercase tracking-wide">
                    {workout.name}
                  </h4>
                  <div className="w-3 h-3 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"></div>
                </div>

                {/* Category Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent-primary/20 border border-accent-primary/30">
                  <span className="text-sm font-medium text-accent-primary uppercase tracking-wider">
                    {workout.category}
                  </span>
                </div>

                {/* Workout Stats */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-success/20">
                      <BsBarChartFill className="text-accent-success text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-dark-400 uppercase tracking-wide">Difficulty</p>
                      <p className="text-sm font-semibold text-dark-200 uppercase">
                        {getLevel(workout.level)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-warning/20">
                      <MdTimer className="text-accent-warning text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-dark-400 uppercase tracking-wide">Duration</p>
                      <p className="text-sm font-semibold text-dark-200">
                        {workout.duration} MIN
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-secondary/20">
                      <MdDirectionsRun className="text-accent-secondary text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-dark-400 uppercase tracking-wide">Distance</p>
                      <p className="text-sm font-semibold text-dark-200">
                        {workout.distance > 0 ? formatDistance(workout.distance) : "Variable"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Indicator */}
                <div className="flex items-center gap-2 text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 pt-2">
                  <span className="text-sm font-medium">Start Workout</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Create Custom Workout Section */}
      <div className="bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20 rounded-2xl p-8 text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-dark-100">Create Your Own Workout</h3>
          <p className="text-dark-400 max-w-lg mx-auto">
            Design a personalized training session tailored to your fitness goals and preferences
          </p>
        </div>
        <Link href="/new" className="button-primary inline-flex items-center gap-2 max-w-xs mx-auto">
          <MdAdd className="text-xl" />
          CREATE WORKOUT
        </Link>
      </div>
    </div>
  );
};

export default WorkoutSelection;
