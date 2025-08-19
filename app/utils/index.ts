import { LEVELS } from "./constants";
import { Set, Step, Workout } from "../types";

export const getLevel = (n: number) => {
  return LEVELS[n];
};

export const calculateWorkoutDistance = (sets: Set[]): number => {
  if (!sets || sets.length === 0) return 0;
  
  let totalDistance = 0;
  
  sets.forEach(set => {
    if (set.steps && set.steps.length > 0) {
      set.steps.forEach(step => {
        if (step.speed && step.duration) {
          // Convert speed from KPH to km/second, then multiply by duration in seconds
          const distanceInKm = (step.speed / 3600) * step.duration;
          totalDistance += distanceInKm;
        }
      });
    }
  });
  
  return Math.round(totalDistance * 100) / 100; // Round to 2 decimal places
};

export const getDistanceCategory = (distance: number): string => {
  if (distance <= 1) return "1K";
  if (distance <= 3) return "3K";
  if (distance <= 5) return "5K";
  if (distance <= 7) return "7K";
  if (distance <= 8) return "8K";
  if (distance <= 10) return "10K";
  if (distance <= 15) return "15K";
  return "15K+";
};

export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
};
