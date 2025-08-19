-- Running Buddy: Populate Database with New Workouts
-- This SQL script adds a 'sets' column to store workout data as JSON and populates with all 20 workouts

-- First, add the sets column to the workouts table if it doesn't exist
ALTER TABLE workouts ADD COLUMN IF NOT EXISTS sets JSONB;

-- Clear existing workouts to start fresh
DELETE FROM workouts;

-- Insert all 20 workouts with their complete set and step data using UUIDs
INSERT INTO workouts (id, name, category, type, duration, level, sets) VALUES

-- Original Workouts (1-4)
('550e8400-e29b-41d4-a716-446655440001', 'Morning Sprint', 'HIIT', 'running', 30, 3, 
'[
  {
    "name": "Warm-up",
    "steps": [
      {"duration": 300, "speed": 6, "legend": "Easy pace"},
      {"duration": 120, "speed": 8, "legend": "Build up"}
    ]
  },
  {
    "name": "Main Set",
    "steps": [
      {"duration": 180, "speed": 12, "legend": "Sprint"},
      {"duration": 90, "speed": 7, "legend": "Recovery"},
      {"duration": 180, "speed": 12, "legend": "Sprint"},
      {"duration": 90, "speed": 7, "legend": "Recovery"}
    ]
  },
  {
    "name": "Cool Down",
    "steps": [
      {"duration": 300, "speed": 5, "legend": "Easy jog"}
    ]
  }
]'),

('550e8400-e29b-41d4-a716-446655440002', 'Endurance Builder', 'Endurance', 'running', 45, 2,
'[
  {
    "name": "Warm-up",
    "steps": [
      {"duration": 600, "speed": 7, "legend": "Easy pace"}
    ]
  },
  {
    "name": "Main Set",
    "steps": [
      {"duration": 1200, "speed": 9, "legend": "Steady effort"},
      {"duration": 300, "speed": 7, "legend": "Easy"},
      {"duration": 1200, "speed": 9, "legend": "Steady effort"}
    ]
  },
  {
    "name": "Cool Down",
    "steps": [
      {"duration": 300, "speed": 6, "legend": "Cool down"}
    ]
  }
]'),

('550e8400-e29b-41d4-a716-446655440003', 'Speed Intervals', 'Speed', 'running', 25, 4,
'[
  {
    "name": "Warm-up",
    "steps": [
      {"duration": 300, "speed": 6, "legend": "Easy pace"}
    ]
  },
  {
    "name": "Intervals",
    "steps": [
      {"duration": 60, "speed": 15, "legend": "Fast"},
      {"duration": 120, "speed": 6, "legend": "Rest"},
      {"duration": 60, "speed": 15, "legend": "Fast"},
      {"duration": 120, "speed": 6, "legend": "Rest"},
      {"duration": 60, "speed": 15, "legend": "Fast"},
      {"duration": 120, "speed": 6, "legend": "Rest"}
    ]
  },
  {
    "name": "Cool Down",
    "steps": [
      {"duration": 240, "speed": 5, "legend": "Easy jog"}
    ]
  }
]'),

('550e8400-e29b-41d4-a716-446655440004', 'Recovery Run', 'Recovery', 'running', 20, 1,
'[
  {
    "name": "Easy Run",
    "steps": [
      {"duration": 1200, "speed": 6, "legend": "Very easy pace"}
    ]
  }
]'),

-- 3K Workouts (5-7)
('550e8400-e29b-41d4-a716-446655440005', '3K Beginner Build', 'Endurance', 'running', 22, 1,
'[
  {
    "name": "Warm-up",
    "steps": [
      {"duration": 300, "speed": 5, "legend": "Walk"},
      {"duration": 180, "speed": 7, "legend": "Easy jog"}
    ]
  },
  {
    "name": "Main Set",
    "steps": [
      {"duration": 240, "speed": 8, "legend": "Comfortable pace"},
      {"duration": 120, "speed": 6, "legend": "Recovery walk"},
      {"duration": 360, "speed": 8, "legend": "Comfortable pace"},
      {"duration": 120, "speed": 6, "legend": "Recovery walk"},
      {"duration": 240, "speed": 8, "legend": "Comfortable pace"}
    ]
  },
  {
    "name": "Cool Down",
    "steps": [
      {"duration": 180, "speed": 6, "legend": "Easy jog"},
      {"duration": 180, "speed": 4, "legend": "Cool walk"}
    ]
  }
]'),

('550e8400-e29b-41d4-a716-446655440006', '3K Tempo Challenge', 'Tempo', 'running', 20, 2,
'[
  {
    "name": "Warm-up",
    "steps": [
      {"duration": 300, "speed": 6, "legend": "Easy pace"},
      {"duration": 120, "speed": 8, "legend": "Build up"}
    ]
  },
  {
    "name": "Tempo Block",
    "steps": [
      {"duration": 900, "speed": 10, "legend": "Comfortably hard"},
      {"duration": 180, "speed": 7, "legend": "Easy recovery"},
      {"duration": 300, "speed": 10, "legend": "Comfortably hard"}
    ]
  },
  {
    "name": "Cool Down",
    "steps": [
      {"duration": 240, "speed": 6, "legend": "Easy jog"}
    ]
  }
]'),

('550e8400-e29b-41d4-a716-446655440007', '3K Pyramid Power', 'HIIT', 'running', 18, 3,
'[
  {
    "name": "Warm-up",
    "steps": [
      {"duration": 300, "speed": 7, "legend": "Easy pace"}
    ]
  },
  {
    "name": "Pyramid",
    "steps": [
      {"duration": 60, "speed": 11, "legend": "Build pace"},
      {"duration": 60, "speed": 6, "legend": "Rest"},
      {"duration": 120, "speed": 12, "legend": "Strong"},
      {"duration": 90, "speed": 6, "legend": "Rest"},
      {"duration": 180, "speed": 13, "legend": "Hard effort"},
      {"duration": 120, "speed": 6, "legend": "Rest"},
      {"duration": 120, "speed": 12, "legend": "Strong"},
      {"duration": 90, "speed": 6, "legend": "Rest"},
      {"duration": 60, "speed": 11, "legend": "Build pace"}
    ]
  },
  {
    "name": "Cool Down",
    "steps": [
      {"duration": 240, "speed": 5, "legend": "Easy jog"}
    ]
  }
]'),

-- 5K Workouts (8-10)
('550e8400-e29b-41d4-a716-446655440008', '5K Base Builder', 'Endurance', 'running', 30, 1,
'[
  {
    "name": "Warm-up",
    "steps": [
      {"duration": 300, "speed": 5, "legend": "Walk"},
      {"duration": 300, "speed": 7, "legend": "Easy jog"}
    ]
  },
  {
    "name": "Main Set",
    "steps": [
      {"duration": 600, "speed": 8, "legend": "Comfortable pace"},
      {"duration": 180, "speed": 6, "legend": "Recovery"},
      {"duration": 600, "speed": 8, "legend": "Comfortable pace"},
      {"duration": 180, "speed": 6, "legend": "Recovery"},
      {"duration": 420, "speed": 8, "legend": "Comfortable pace"}
    ]
  },
  {
    "name": "Cool Down",
    "steps": [
      {"duration": 240, "speed": 6, "legend": "Easy jog"},
      {"duration": 180, "speed": 4, "legend": "Cool walk"}
    ]
  }
]'),

('550e8400-e29b-41d4-a716-446655440009', '5K Goal Pace', 'Tempo', 'running', 32, 2,
'[
  {
    "name": "Warm-up",
    "steps": [
      {"duration": 600, "speed": 7, "legend": "Easy pace"},
      {"duration": 180, "speed": 9, "legend": "Build up"}
    ]
  },
  {
    "name": "Goal Pace Segments",
    "steps": [
      {"duration": 300, "speed": 11, "legend": "5K goal pace"},
      {"duration": 120, "speed": 7, "legend": "Easy recovery"},
      {"duration": 480, "speed": 11, "legend": "5K goal pace"},
      {"duration": 180, "speed": 7, "legend": "Easy recovery"},
      {"duration": 360, "speed": 11, "legend": "5K goal pace"}
    ]
  },
  {
    "name": "Cool Down",
    "steps": [
      {"duration": 300, "speed": 6, "legend": "Easy jog"}
    ]
  }
]'),

('550e8400-e29b-41d4-a716-446655440010', '5K Speed Ladder', 'Speed', 'running', 28, 3,
'[
  {
    "name": "Warm-up",
    "steps": [
      {"duration": 600, "speed": 7, "legend": "Easy pace"}
    ]
  },
  {
    "name": "Speed Ladder",
    "steps": [
      {"duration": 90, "speed": 10, "legend": "Moderate"},
      {"duration": 90, "speed": 6, "legend": "Rest"},
      {"duration": 120, "speed": 11, "legend": "Brisk"},
      {"duration": 90, "speed": 6, "legend": "Rest"},
      {"duration": 150, "speed": 12, "legend": "Fast"},
      {"duration": 120, "speed": 6, "legend": "Rest"},
      {"duration": 180, "speed": 13, "legend": "Very fast"},
      {"duration": 150, "speed": 6, "legend": "Rest"},
      {"duration": 150, "speed": 12, "legend": "Fast"},
      {"duration": 120, "speed": 6, "legend": "Rest"},
      {"duration": 120, "speed": 11, "legend": "Brisk"},
      {"duration": 90, "speed": 6, "legend": "Rest"},
      {"duration": 90, "speed": 10, "legend": "Moderate"}
    ]
  },
  {
    "name": "Cool Down",
    "steps": [
      {"duration": 240, "speed": 5, "legend": "Easy jog"}
    ]
  }
]'),

-- 7K Workouts (11-12)
('550e8400-e29b-41d4-a716-446655440011', '7K Progression', 'Endurance', 'running', 38, 2,
'[
  {
    "name": "Warm-up",
    "steps": [
      {"duration": 600, "speed": 6, "legend": "Easy start"},
      {"duration": 300, "speed": 8, "legend": "Build up"}
    ]
  },
  {
    "name": "Progressive Run",
    "steps": [
      {"duration": 600, "speed": 8, "legend": "Comfortable"},
      {"duration": 600, "speed": 9, "legend": "Moderate"},
      {"duration": 600, "speed": 10, "legend": "Comfortably hard"},
      {"duration": 300, "speed": 11, "legend": "Strong finish"}
    ]
  },
  {
    "name": "Cool Down",
    "steps": [
      {"duration": 360, "speed": 6, "legend": "Easy jog"}
    ]
  }
]'),

('550e8400-e29b-41d4-a716-446655440012', '7K Cruise Intervals', 'Tempo', 'running', 40, 3,
'[
  {
    "name": "Warm-up",
    "steps": [
      {"duration": 720, "speed": 7, "legend": "Easy pace"}
    ]
  },
  {
    "name": "Cruise Intervals",
    "steps": [
      {"duration": 480, "speed": 10, "legend": "Threshold pace"},
      {"duration": 120, "speed": 7, "legend": "Easy recovery"},
      {"duration": 480, "speed": 10, "legend": "Threshold pace"},
      {"duration": 120, "speed": 7, "legend": "Easy recovery"},
      {"duration": 360, "speed": 10, "legend": "Threshold pace"}
    ]
  },
  {
    "name": "Cool Down",
    "steps": [
      {"duration": 360, "speed": 6, "legend": "Easy jog"}
    ]
  }
]'),

-- 8K Workouts (13-14)
('550e8400-e29b-41d4-a716-446655440013', '8K Steady State', 'Endurance', 'running', 42, 2,
'[
  {
    "name": "Warm-up",
    "steps": [
      {"duration": 600, "speed": 6, "legend": "Easy start"},
      {"duration": 360, "speed": 8, "legend": "Build up"}
    ]
  },
  {
    "name": "Steady State",
    "steps": [
      {"duration": 1200, "speed": 9, "legend": "Steady effort"},
      {"duration": 240, "speed": 7, "legend": "Easy recovery"},
      {"duration": 900, "speed": 9, "legend": "Steady effort"}
    ]
  },
  {
    "name": "Cool Down",
    "steps": [
      {"duration": 420, "speed": 6, "legend": "Easy jog"}
    ]
  }
]'),

('550e8400-e29b-41d4-a716-446655440014', '8K Fartlek Fun', 'HIIT', 'running', 45, 3,
'[
  {
    "name": "Warm-up",
    "steps": [
      {"duration": 900, "speed": 7, "legend": "Easy pace"}
    ]
  },
  {
    "name": "Fartlek Play",
    "steps": [
      {"duration": 120, "speed": 11, "legend": "Pickup"},
      {"duration": 180, "speed": 8, "legend": "Easy"},
      {"duration": 90, "speed": 13, "legend": "Fast surge"},
      {"duration": 240, "speed": 8, "legend": "Easy"},
      {"duration": 150, "speed": 12, "legend": "Strong"},
      {"duration": 180, "speed": 8, "legend": "Easy"},
      {"duration": 180, "speed": 11, "legend": "Pickup"},
      {"duration": 240, "speed": 8, "legend": "Easy"},
      {"duration": 60, "speed": 14, "legend": "Sprint"},
      {"duration": 300, "speed": 8, "legend": "Easy"},
      {"duration": 120, "speed": 11, "legend": "Pickup"}
    ]
  },
  {
    "name": "Cool Down",
    "steps": [
      {"duration": 480, "speed": 6, "legend": "Easy jog"}
    ]
  }
]'),

-- 10K Workouts (15-17)
('550e8400-e29b-41d4-a716-446655440015', '10K Base Run', 'Endurance', 'running', 52, 1,
'[
  {
    "name": "Warm-up",
    "steps": [
      {"duration": 600, "speed": 6, "legend": "Easy start"},
      {"duration": 300, "speed": 7, "legend": "Gentle build"}
    ]
  },
  {
    "name": "Main Run",
    "steps": [
      {"duration": 2400, "speed": 8, "legend": "Comfortable pace"}
    ]
  },
  {
    "name": "Cool Down",
    "steps": [
      {"duration": 420, "speed": 6, "legend": "Easy jog"}
    ]
  }
]'),

('550e8400-e29b-41d4-a716-446655440016', '10K Threshold', 'Tempo', 'running', 55, 3,
'[
  {
    "name": "Warm-up",
    "steps": [
      {"duration": 900, "speed": 7, "legend": "Easy pace"},
      {"duration": 300, "speed": 9, "legend": "Build up"}
    ]
  },
  {
    "name": "Threshold Blocks",
    "steps": [
      {"duration": 600, "speed": 11, "legend": "Threshold pace"},
      {"duration": 180, "speed": 7, "legend": "Easy recovery"},
      {"duration": 720, "speed": 11, "legend": "Threshold pace"},
      {"duration": 240, "speed": 7, "legend": "Easy recovery"},
      {"duration": 480, "speed": 11, "legend": "Threshold pace"}
    ]
  },
  {
    "name": "Cool Down",
    "steps": [
      {"duration": 480, "speed": 6, "legend": "Easy jog"}
    ]
  }
]'),

('550e8400-e29b-41d4-a716-446655440017', '10K Race Prep', 'Race Pace', 'running', 58, 4,
'[
  {
    "name": "Warm-up",
    "steps": [
      {"duration": 900, "speed": 7, "legend": "Easy pace"},
      {"duration": 240, "speed": 9, "legend": "Build up"},
      {"duration": 60, "speed": 11, "legend": "Strides"},
      {"duration": 60, "speed": 7, "legend": "Easy"}
    ]
  },
  {
    "name": "Race Pace Practice",
    "steps": [
      {"duration": 480, "speed": 12, "legend": "10K race pace"},
      {"duration": 180, "speed": 8, "legend": "Easy recovery"},
      {"duration": 600, "speed": 12, "legend": "10K race pace"},
      {"duration": 240, "speed": 8, "legend": "Easy recovery"},
      {"duration": 360, "speed": 12, "legend": "10K race pace"},
      {"duration": 180, "speed": 8, "legend": "Easy recovery"},
      {"duration": 240, "speed": 13, "legend": "Faster finish"}
    ]
  },
  {
    "name": "Cool Down",
    "steps": [
      {"duration": 420, "speed": 6, "legend": "Easy jog"}
    ]
  }
]'),

-- Specialized Workouts (18-20)
('550e8400-e29b-41d4-a716-446655440018', '400m Repeats', 'Speed', 'running', 35, 3,
'[
  {
    "name": "Warm-up",
    "steps": [
      {"duration": 720, "speed": 7, "legend": "Easy pace"},
      {"duration": 180, "speed": 9, "legend": "Build up"}
    ]
  },
  {
    "name": "400m Repeats",
    "steps": [
      {"duration": 90, "speed": 13, "legend": "400m effort"},
      {"duration": 120, "speed": 6, "legend": "Recovery jog"},
      {"duration": 90, "speed": 13, "legend": "400m effort"},
      {"duration": 120, "speed": 6, "legend": "Recovery jog"},
      {"duration": 90, "speed": 13, "legend": "400m effort"},
      {"duration": 120, "speed": 6, "legend": "Recovery jog"},
      {"duration": 90, "speed": 13, "legend": "400m effort"},
      {"duration": 120, "speed": 6, "legend": "Recovery jog"},
      {"duration": 90, "speed": 13, "legend": "400m effort"},
      {"duration": 120, "speed": 6, "legend": "Recovery jog"},
      {"duration": 90, "speed": 13, "legend": "400m effort"}
    ]
  },
  {
    "name": "Cool Down",
    "steps": [
      {"duration": 360, "speed": 6, "legend": "Easy jog"}
    ]
  }
]'),

('550e8400-e29b-41d4-a716-446655440019', 'Beginner HIIT', 'HIIT', 'running', 25, 1,
'[
  {
    "name": "Warm-up",
    "steps": [
      {"duration": 300, "speed": 5, "legend": "Walk"},
      {"duration": 300, "speed": 7, "legend": "Easy jog"}
    ]
  },
  {
    "name": "HIIT Intervals",
    "steps": [
      {"duration": 30, "speed": 10, "legend": "Work hard"},
      {"duration": 90, "speed": 6, "legend": "Active rest"},
      {"duration": 30, "speed": 10, "legend": "Work hard"},
      {"duration": 90, "speed": 6, "legend": "Active rest"},
      {"duration": 30, "speed": 10, "legend": "Work hard"},
      {"duration": 90, "speed": 6, "legend": "Active rest"},
      {"duration": 30, "speed": 10, "legend": "Work hard"},
      {"duration": 90, "speed": 6, "legend": "Active rest"},
      {"duration": 30, "speed": 10, "legend": "Work hard"},
      {"duration": 90, "speed": 6, "legend": "Active rest"},
      {"duration": 30, "speed": 10, "legend": "Work hard"}
    ]
  },
  {
    "name": "Cool Down",
    "steps": [
      {"duration": 240, "speed": 5, "legend": "Easy walk"},
      {"duration": 180, "speed": 4, "legend": "Slow walk"}
    ]
  }
]'),

('550e8400-e29b-41d4-a716-446655440020', 'Hill Simulation', 'Strength', 'running', 30, 2,
'[
  {
    "name": "Warm-up",
    "steps": [
      {"duration": 600, "speed": 7, "legend": "Easy pace"}
    ]
  },
  {
    "name": "Hill Repeats",
    "steps": [
      {"duration": 120, "speed": 9, "legend": "Hill climb"},
      {"duration": 120, "speed": 6, "legend": "Easy descent"},
      {"duration": 120, "speed": 9, "legend": "Hill climb"},
      {"duration": 120, "speed": 6, "legend": "Easy descent"},
      {"duration": 120, "speed": 9, "legend": "Hill climb"},
      {"duration": 120, "speed": 6, "legend": "Easy descent"},
      {"duration": 120, "speed": 9, "legend": "Hill climb"},
      {"duration": 120, "speed": 6, "legend": "Easy descent"},
      {"duration": 120, "speed": 9, "legend": "Hill climb"}
    ]
  },
  {
    "name": "Cool Down",
    "steps": [
      {"duration": 360, "speed": 6, "legend": "Easy jog"}
    ]
  }
]');

-- Optional: Create some sample categories if they don't exist
INSERT INTO categories (id, name) VALUES 
('550e8400-e29b-41d4-a716-44665544c001', 'HIIT'),
('550e8400-e29b-41d4-a716-44665544c002', 'Endurance'), 
('550e8400-e29b-41d4-a716-44665544c003', 'Speed'),
('550e8400-e29b-41d4-a716-44665544c004', 'Tempo'),
('550e8400-e29b-41d4-a716-44665544c005', 'Recovery'),
('550e8400-e29b-41d4-a716-44665544c006', 'Race Pace'),
('550e8400-e29b-41d4-a716-44665544c007', 'Strength')
ON CONFLICT (name) DO NOTHING;

-- Verify the data was inserted
SELECT id, name, category, duration, level FROM workouts ORDER BY name;