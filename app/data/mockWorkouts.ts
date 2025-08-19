// Mock data for testing when database is unavailable
export const mockWorkouts = [
  // Original workouts
  {
    id: "1",
    name: "Morning Sprint",
    category: "HIIT",
    type: "running",
    duration: 30,
    level: 3,
    sets: [
      {
        name: "Warm-up",
        steps: [
          { duration: 300, speed: 6, legend: "Easy pace" },
          { duration: 120, speed: 8, legend: "Build up" }
        ]
      },
      {
        name: "Main Set",
        steps: [
          { duration: 180, speed: 12, legend: "Sprint" },
          { duration: 90, speed: 7, legend: "Recovery" },
          { duration: 180, speed: 12, legend: "Sprint" },
          { duration: 90, speed: 7, legend: "Recovery" }
        ]
      },
      {
        name: "Cool Down",
        steps: [
          { duration: 300, speed: 5, legend: "Easy jog" }
        ]
      }
    ]
  },
  {
    id: "2", 
    name: "Endurance Builder",
    category: "Endurance",
    type: "running",
    duration: 45,
    level: 2,
    sets: [
      {
        name: "Warm-up",
        steps: [
          { duration: 600, speed: 7, legend: "Easy pace" }
        ]
      },
      {
        name: "Main Set", 
        steps: [
          { duration: 1200, speed: 9, legend: "Steady effort" },
          { duration: 300, speed: 7, legend: "Easy" },
          { duration: 1200, speed: 9, legend: "Steady effort" }
        ]
      },
      {
        name: "Cool Down",
        steps: [
          { duration: 300, speed: 6, legend: "Cool down" }
        ]
      }
    ]
  },
  {
    id: "3",
    name: "Speed Intervals", 
    category: "Speed",
    type: "running",
    duration: 25,
    level: 4,
    sets: [
      {
        name: "Warm-up",
        steps: [
          { duration: 300, speed: 6, legend: "Easy pace" }
        ]
      },
      {
        name: "Intervals",
        steps: [
          { duration: 60, speed: 15, legend: "Fast" },
          { duration: 120, speed: 6, legend: "Rest" },
          { duration: 60, speed: 15, legend: "Fast" },
          { duration: 120, speed: 6, legend: "Rest" },
          { duration: 60, speed: 15, legend: "Fast" },
          { duration: 120, speed: 6, legend: "Rest" }
        ]
      },
      {
        name: "Cool Down",
        steps: [
          { duration: 240, speed: 5, legend: "Easy jog" }
        ]
      }
    ]
  },
  {
    id: "4",
    name: "Recovery Run",
    category: "Recovery", 
    type: "running",
    duration: 20,
    level: 1,
    sets: [
      {
        name: "Easy Run",
        steps: [
          { duration: 1200, speed: 6, legend: "Very easy pace" }
        ]
      }
    ]
  },

  // 3K WORKOUTS (≈18-22 minutes)
  {
    id: "5",
    name: "3K Beginner Build",
    category: "Endurance",
    type: "running", 
    duration: 22,
    level: 1,
    sets: [
      {
        name: "Warm-up",
        steps: [
          { duration: 300, speed: 5, legend: "Walk" },
          { duration: 180, speed: 7, legend: "Easy jog" }
        ]
      },
      {
        name: "Main Set",
        steps: [
          { duration: 240, speed: 8, legend: "Comfortable pace" },
          { duration: 120, speed: 6, legend: "Recovery walk" },
          { duration: 360, speed: 8, legend: "Comfortable pace" },
          { duration: 120, speed: 6, legend: "Recovery walk" },
          { duration: 240, speed: 8, legend: "Comfortable pace" }
        ]
      },
      {
        name: "Cool Down",
        steps: [
          { duration: 180, speed: 6, legend: "Easy jog" },
          { duration: 180, speed: 4, legend: "Cool walk" }
        ]
      }
    ]
  },
  {
    id: "6",
    name: "3K Tempo Challenge",
    category: "Tempo",
    type: "running",
    duration: 20,
    level: 2,
    sets: [
      {
        name: "Warm-up",
        steps: [
          { duration: 300, speed: 6, legend: "Easy pace" },
          { duration: 120, speed: 8, legend: "Build up" }
        ]
      },
      {
        name: "Tempo Block",
        steps: [
          { duration: 900, speed: 10, legend: "Comfortably hard" },
          { duration: 180, speed: 7, legend: "Easy recovery" },
          { duration: 300, speed: 10, legend: "Comfortably hard" }
        ]
      },
      {
        name: "Cool Down",
        steps: [
          { duration: 240, speed: 6, legend: "Easy jog" }
        ]
      }
    ]
  },
  {
    id: "7",
    name: "3K Pyramid Power",
    category: "HIIT",
    type: "running",
    duration: 18,
    level: 3,
    sets: [
      {
        name: "Warm-up",
        steps: [
          { duration: 300, speed: 7, legend: "Easy pace" }
        ]
      },
      {
        name: "Pyramid",
        steps: [
          { duration: 60, speed: 11, legend: "Build pace" },
          { duration: 60, speed: 6, legend: "Rest" },
          { duration: 120, speed: 12, legend: "Strong" },
          { duration: 90, speed: 6, legend: "Rest" },
          { duration: 180, speed: 13, legend: "Hard effort" },
          { duration: 120, speed: 6, legend: "Rest" },
          { duration: 120, speed: 12, legend: "Strong" },
          { duration: 90, speed: 6, legend: "Rest" },
          { duration: 60, speed: 11, legend: "Build pace" }
        ]
      },
      {
        name: "Cool Down",
        steps: [
          { duration: 240, speed: 5, legend: "Easy jog" }
        ]
      }
    ]
  },

  // 5K WORKOUTS (≈25-35 minutes)
  {
    id: "8",
    name: "5K Base Builder",
    category: "Endurance",
    type: "running",
    duration: 30,
    level: 1,
    sets: [
      {
        name: "Warm-up",
        steps: [
          { duration: 300, speed: 5, legend: "Walk" },
          { duration: 300, speed: 7, legend: "Easy jog" }
        ]
      },
      {
        name: "Main Set",
        steps: [
          { duration: 600, speed: 8, legend: "Comfortable pace" },
          { duration: 180, speed: 6, legend: "Recovery" },
          { duration: 600, speed: 8, legend: "Comfortable pace" },
          { duration: 180, speed: 6, legend: "Recovery" },
          { duration: 420, speed: 8, legend: "Comfortable pace" }
        ]
      },
      {
        name: "Cool Down",
        steps: [
          { duration: 240, speed: 6, legend: "Easy jog" },
          { duration: 180, speed: 4, legend: "Cool walk" }
        ]
      }
    ]
  },
  {
    id: "9",
    name: "5K Goal Pace",
    category: "Tempo",
    type: "running",
    duration: 32,
    level: 2,
    sets: [
      {
        name: "Warm-up",
        steps: [
          { duration: 600, speed: 7, legend: "Easy pace" },
          { duration: 180, speed: 9, legend: "Build up" }
        ]
      },
      {
        name: "Goal Pace Segments",
        steps: [
          { duration: 300, speed: 11, legend: "5K goal pace" },
          { duration: 120, speed: 7, legend: "Easy recovery" },
          { duration: 480, speed: 11, legend: "5K goal pace" },
          { duration: 180, speed: 7, legend: "Easy recovery" },
          { duration: 360, speed: 11, legend: "5K goal pace" }
        ]
      },
      {
        name: "Cool Down",
        steps: [
          { duration: 300, speed: 6, legend: "Easy jog" }
        ]
      }
    ]
  },
  {
    id: "10",
    name: "5K Speed Ladder",
    category: "Speed",
    type: "running",
    duration: 28,
    level: 3,
    sets: [
      {
        name: "Warm-up",
        steps: [
          { duration: 600, speed: 7, legend: "Easy pace" }
        ]
      },
      {
        name: "Speed Ladder",
        steps: [
          { duration: 90, speed: 10, legend: "Moderate" },
          { duration: 90, speed: 6, legend: "Rest" },
          { duration: 120, speed: 11, legend: "Brisk" },
          { duration: 90, speed: 6, legend: "Rest" },
          { duration: 150, speed: 12, legend: "Fast" },
          { duration: 120, speed: 6, legend: "Rest" },
          { duration: 180, speed: 13, legend: "Very fast" },
          { duration: 150, speed: 6, legend: "Rest" },
          { duration: 150, speed: 12, legend: "Fast" },
          { duration: 120, speed: 6, legend: "Rest" },
          { duration: 120, speed: 11, legend: "Brisk" },
          { duration: 90, speed: 6, legend: "Rest" },
          { duration: 90, speed: 10, legend: "Moderate" }
        ]
      },
      {
        name: "Cool Down",
        steps: [
          { duration: 240, speed: 5, legend: "Easy jog" }
        ]
      }
    ]
  },

  // 7K WORKOUTS (≈35-42 minutes)
  {
    id: "11",
    name: "7K Progression",
    category: "Endurance",
    type: "running",
    duration: 38,
    level: 2,
    sets: [
      {
        name: "Warm-up",
        steps: [
          { duration: 600, speed: 6, legend: "Easy start" },
          { duration: 300, speed: 8, legend: "Build up" }
        ]
      },
      {
        name: "Progressive Run",
        steps: [
          { duration: 600, speed: 8, legend: "Comfortable" },
          { duration: 600, speed: 9, legend: "Moderate" },
          { duration: 600, speed: 10, legend: "Comfortably hard" },
          { duration: 300, speed: 11, legend: "Strong finish" }
        ]
      },
      {
        name: "Cool Down",
        steps: [
          { duration: 360, speed: 6, legend: "Easy jog" }
        ]
      }
    ]
  },
  {
    id: "12",
    name: "7K Cruise Intervals",
    category: "Tempo",
    type: "running",
    duration: 40,
    level: 3,
    sets: [
      {
        name: "Warm-up",
        steps: [
          { duration: 720, speed: 7, legend: "Easy pace" }
        ]
      },
      {
        name: "Cruise Intervals",
        steps: [
          { duration: 480, speed: 10, legend: "Threshold pace" },
          { duration: 120, speed: 7, legend: "Easy recovery" },
          { duration: 480, speed: 10, legend: "Threshold pace" },
          { duration: 120, speed: 7, legend: "Easy recovery" },
          { duration: 360, speed: 10, legend: "Threshold pace" }
        ]
      },
      {
        name: "Cool Down",
        steps: [
          { duration: 360, speed: 6, legend: "Easy jog" }
        ]
      }
    ]
  },

  // 8K WORKOUTS (≈40-48 minutes)
  {
    id: "13",
    name: "8K Steady State",
    category: "Endurance",
    type: "running",
    duration: 42,
    level: 2,
    sets: [
      {
        name: "Warm-up",
        steps: [
          { duration: 600, speed: 6, legend: "Easy start" },
          { duration: 360, speed: 8, legend: "Build up" }
        ]
      },
      {
        name: "Steady State",
        steps: [
          { duration: 1200, speed: 9, legend: "Steady effort" },
          { duration: 240, speed: 7, legend: "Easy recovery" },
          { duration: 900, speed: 9, legend: "Steady effort" }
        ]
      },
      {
        name: "Cool Down",
        steps: [
          { duration: 420, speed: 6, legend: "Easy jog" }
        ]
      }
    ]
  },
  {
    id: "14",
    name: "8K Fartlek Fun",
    category: "HIIT",
    type: "running",
    duration: 45,
    level: 3,
    sets: [
      {
        name: "Warm-up",
        steps: [
          { duration: 900, speed: 7, legend: "Easy pace" }
        ]
      },
      {
        name: "Fartlek Play",
        steps: [
          { duration: 120, speed: 11, legend: "Pickup" },
          { duration: 180, speed: 8, legend: "Easy" },
          { duration: 90, speed: 13, legend: "Fast surge" },
          { duration: 240, speed: 8, legend: "Easy" },
          { duration: 150, speed: 12, legend: "Strong" },
          { duration: 180, speed: 8, legend: "Easy" },
          { duration: 180, speed: 11, legend: "Pickup" },
          { duration: 240, speed: 8, legend: "Easy" },
          { duration: 60, speed: 14, legend: "Sprint" },
          { duration: 300, speed: 8, legend: "Easy" },
          { duration: 120, speed: 11, legend: "Pickup" }
        ]
      },
      {
        name: "Cool Down",
        steps: [
          { duration: 480, speed: 6, legend: "Easy jog" }
        ]
      }
    ]
  },

  // 10K WORKOUTS (≈50-65 minutes)
  {
    id: "15",
    name: "10K Base Run",
    category: "Endurance",
    type: "running",
    duration: 52,
    level: 1,
    sets: [
      {
        name: "Warm-up",
        steps: [
          { duration: 600, speed: 6, legend: "Easy start" },
          { duration: 300, speed: 7, legend: "Gentle build" }
        ]
      },
      {
        name: "Main Run",
        steps: [
          { duration: 2400, speed: 8, legend: "Comfortable pace" }
        ]
      },
      {
        name: "Cool Down",
        steps: [
          { duration: 420, speed: 6, legend: "Easy jog" }
        ]
      }
    ]
  },
  {
    id: "16",
    name: "10K Threshold",
    category: "Tempo",
    type: "running",
    duration: 55,
    level: 3,
    sets: [
      {
        name: "Warm-up",
        steps: [
          { duration: 900, speed: 7, legend: "Easy pace" },
          { duration: 300, speed: 9, legend: "Build up" }
        ]
      },
      {
        name: "Threshold Blocks",
        steps: [
          { duration: 600, speed: 11, legend: "Threshold pace" },
          { duration: 180, speed: 7, legend: "Easy recovery" },
          { duration: 720, speed: 11, legend: "Threshold pace" },
          { duration: 240, speed: 7, legend: "Easy recovery" },
          { duration: 480, speed: 11, legend: "Threshold pace" }
        ]
      },
      {
        name: "Cool Down",
        steps: [
          { duration: 480, speed: 6, legend: "Easy jog" }
        ]
      }
    ]
  },
  {
    id: "17",
    name: "10K Race Prep",
    category: "Race Pace",
    type: "running",
    duration: 58,
    level: 4,
    sets: [
      {
        name: "Warm-up",
        steps: [
          { duration: 900, speed: 7, legend: "Easy pace" },
          { duration: 240, speed: 9, legend: "Build up" },
          { duration: 60, speed: 11, legend: "Strides" },
          { duration: 60, speed: 7, legend: "Easy" }
        ]
      },
      {
        name: "Race Pace Practice",
        steps: [
          { duration: 480, speed: 12, legend: "10K race pace" },
          { duration: 180, speed: 8, legend: "Easy recovery" },
          { duration: 600, speed: 12, legend: "10K race pace" },
          { duration: 240, speed: 8, legend: "Easy recovery" },
          { duration: 360, speed: 12, legend: "10K race pace" },
          { duration: 180, speed: 8, legend: "Easy recovery" },
          { duration: 240, speed: 13, legend: "Faster finish" }
        ]
      },
      {
        name: "Cool Down",
        steps: [
          { duration: 420, speed: 6, legend: "Easy jog" }
        ]
      }
    ]
  },

  // SPECIALIZED WORKOUTS
  {
    id: "18",
    name: "400m Repeats",
    category: "Speed",
    type: "running",
    duration: 35,
    level: 3,
    sets: [
      {
        name: "Warm-up",
        steps: [
          { duration: 720, speed: 7, legend: "Easy pace" },
          { duration: 180, speed: 9, legend: "Build up" }
        ]
      },
      {
        name: "400m Repeats",
        steps: [
          { duration: 90, speed: 13, legend: "400m effort" },
          { duration: 120, speed: 6, legend: "Recovery jog" },
          { duration: 90, speed: 13, legend: "400m effort" },
          { duration: 120, speed: 6, legend: "Recovery jog" },
          { duration: 90, speed: 13, legend: "400m effort" },
          { duration: 120, speed: 6, legend: "Recovery jog" },
          { duration: 90, speed: 13, legend: "400m effort" },
          { duration: 120, speed: 6, legend: "Recovery jog" },
          { duration: 90, speed: 13, legend: "400m effort" },
          { duration: 120, speed: 6, legend: "Recovery jog" },
          { duration: 90, speed: 13, legend: "400m effort" }
        ]
      },
      {
        name: "Cool Down",
        steps: [
          { duration: 360, speed: 6, legend: "Easy jog" }
        ]
      }
    ]
  },
  {
    id: "19",
    name: "Beginner HIIT",
    category: "HIIT",
    type: "running",
    duration: 25,
    level: 1,
    sets: [
      {
        name: "Warm-up",
        steps: [
          { duration: 300, speed: 5, legend: "Walk" },
          { duration: 300, speed: 7, legend: "Easy jog" }
        ]
      },
      {
        name: "HIIT Intervals",
        steps: [
          { duration: 30, speed: 10, legend: "Work hard" },
          { duration: 90, speed: 6, legend: "Active rest" },
          { duration: 30, speed: 10, legend: "Work hard" },
          { duration: 90, speed: 6, legend: "Active rest" },
          { duration: 30, speed: 10, legend: "Work hard" },
          { duration: 90, speed: 6, legend: "Active rest" },
          { duration: 30, speed: 10, legend: "Work hard" },
          { duration: 90, speed: 6, legend: "Active rest" },
          { duration: 30, speed: 10, legend: "Work hard" },
          { duration: 90, speed: 6, legend: "Active rest" },
          { duration: 30, speed: 10, legend: "Work hard" }
        ]
      },
      {
        name: "Cool Down",
        steps: [
          { duration: 240, speed: 5, legend: "Easy walk" },
          { duration: 180, speed: 4, legend: "Slow walk" }
        ]
      }
    ]
  },
  {
    id: "20",
    name: "Hill Simulation",
    category: "Strength",
    type: "running",
    duration: 30,
    level: 2,
    sets: [
      {
        name: "Warm-up",
        steps: [
          { duration: 600, speed: 7, legend: "Easy pace" }
        ]
      },
      {
        name: "Hill Repeats",
        steps: [
          { duration: 120, speed: 9, legend: "Hill climb" },
          { duration: 120, speed: 6, legend: "Easy descent" },
          { duration: 120, speed: 9, legend: "Hill climb" },
          { duration: 120, speed: 6, legend: "Easy descent" },
          { duration: 120, speed: 9, legend: "Hill climb" },
          { duration: 120, speed: 6, legend: "Easy descent" },
          { duration: 120, speed: 9, legend: "Hill climb" },
          { duration: 120, speed: 6, legend: "Easy descent" },
          { duration: 120, speed: 9, legend: "Hill climb" }
        ]
      },
      {
        name: "Cool Down",
        steps: [
          { duration: 360, speed: 6, legend: "Easy jog" }
        ]
      }
    ]
  }
];