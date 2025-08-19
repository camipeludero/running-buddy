-- Running Buddy Database Setup
-- Execute this in your Supabase SQL Editor

-- 1. Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Workouts Table
CREATE TABLE IF NOT EXISTS workouts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    type VARCHAR(50) DEFAULT 'running',
    duration INTEGER NOT NULL, -- in minutes
    level INTEGER NOT NULL CHECK (level >= 1 AND level <= 5),
    sets JSONB NOT NULL, -- Store sets and steps as JSON
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 4. Create trigger for workouts table
CREATE TRIGGER update_workouts_updated_at 
    BEFORE UPDATE ON workouts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 5. Enable Row Level Security (RLS) - Optional for development
-- ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;

-- 6. Create policies for public access (for development/testing)
-- You might want to restrict this in production
CREATE POLICY "Allow public read access on categories" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on workouts" ON workouts
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert on workouts" ON workouts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on workouts" ON workouts
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on workouts" ON workouts
    FOR DELETE USING (true);

-- 7. Insert Categories
INSERT INTO categories (name) VALUES 
    ('HIIT'),
    ('Endurance'),
    ('Speed'),
    ('Recovery'),
    ('Strength'),
    ('Intervals'),
    ('Long Run'),
    ('Tempo');

-- 8. Insert Sample Workouts
INSERT INTO workouts (name, category, type, duration, level, sets) VALUES 

-- Morning Sprint (HIIT)
('Morning Sprint', 'HIIT', 'running', 30, 3, '[
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

-- Endurance Builder
('Endurance Builder', 'Endurance', 'running', 45, 2, '[
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

-- Speed Intervals
('Speed Intervals', 'Speed', 'running', 25, 4, '[
    {
        "name": "Warm-up",
        "steps": [
            {"duration": 300, "speed": 6, "legend": "Easy pace"},
            {"duration": 180, "speed": 8, "legend": "Build up"}
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

-- Recovery Run
('Recovery Run', 'Recovery', 'running', 20, 1, '[
    {
        "name": "Easy Run",
        "steps": [
            {"duration": 1200, "speed": 6, "legend": "Very easy pace"}
        ]
    }
]'),

-- Tempo Run
('Tempo Run', 'Tempo', 'running', 35, 3, '[
    {
        "name": "Warm-up",
        "steps": [
            {"duration": 600, "speed": 7, "legend": "Easy pace"},
            {"duration": 180, "speed": 9, "legend": "Build up"}
        ]
    },
    {
        "name": "Tempo",
        "steps": [
            {"duration": 1200, "speed": 11, "legend": "Comfortably hard"}
        ]
    },
    {
        "name": "Cool Down",
        "steps": [
            {"duration": 300, "speed": 6, "legend": "Easy jog"}
        ]
    }
]'),

-- Hill Repeats
('Hill Repeats', 'Strength', 'running', 30, 4, '[
    {
        "name": "Warm-up",
        "steps": [
            {"duration": 600, "speed": 7, "legend": "Easy pace"}
        ]
    },
    {
        "name": "Hill Repeats",
        "steps": [
            {"duration": 120, "speed": 10, "legend": "Hill effort"},
            {"duration": 180, "speed": 6, "legend": "Easy down"},
            {"duration": 120, "speed": 10, "legend": "Hill effort"},
            {"duration": 180, "speed": 6, "legend": "Easy down"},
            {"duration": 120, "speed": 10, "legend": "Hill effort"},
            {"duration": 180, "speed": 6, "legend": "Easy down"},
            {"duration": 120, "speed": 10, "legend": "Hill effort"},
            {"duration": 180, "speed": 6, "legend": "Easy down"}
        ]
    },
    {
        "name": "Cool Down",
        "steps": [
            {"duration": 300, "speed": 6, "legend": "Easy jog"}
        ]
    }
]'),

-- Long Run
('Long Run', 'Long Run', 'running', 60, 2, '[
    {
        "name": "Warm-up",
        "steps": [
            {"duration": 600, "speed": 7, "legend": "Easy start"}
        ]
    },
    {
        "name": "Main Run",
        "steps": [
            {"duration": 3000, "speed": 8, "legend": "Steady pace"}
        ]
    },
    {
        "name": "Cool Down",
        "steps": [
            {"duration": 0, "speed": 6, "legend": "Easy finish"}
        ]
    }
]'),

-- Fartlek Fun
('Fartlek Fun', 'Intervals', 'running', 28, 3, '[
    {
        "name": "Warm-up",
        "steps": [
            {"duration": 480, "speed": 7, "legend": "Easy pace"}
        ]
    },
    {
        "name": "Fartlek",
        "steps": [
            {"duration": 90, "speed": 12, "legend": "Fast"},
            {"duration": 60, "speed": 7, "legend": "Easy"},
            {"duration": 120, "speed": 10, "legend": "Medium"},
            {"duration": 90, "speed": 7, "legend": "Easy"},
            {"duration": 60, "speed": 14, "legend": "Very fast"},
            {"duration": 120, "speed": 7, "legend": "Easy"},
            {"duration": 180, "speed": 11, "legend": "Tempo"},
            {"duration": 90, "speed": 7, "legend": "Easy"}
        ]
    },
    {
        "name": "Cool Down",
        "steps": [
            {"duration": 360, "speed": 6, "legend": "Easy jog"}
        ]
    }
]'),

-- Beginner Starter
('Beginner Starter', 'Recovery', 'running', 15, 1, '[
    {
        "name": "Easy Run",
        "steps": [
            {"duration": 300, "speed": 5, "legend": "Very easy"},
            {"duration": 600, "speed": 6, "legend": "Easy pace"},
            {"duration": 300, "speed": 5, "legend": "Very easy"}
        ]
    }
]'),

-- Beast Mode
('Beast Mode', 'HIIT', 'running', 40, 5, '[
    {
        "name": "Warm-up",
        "steps": [
            {"duration": 360, "speed": 7, "legend": "Easy pace"},
            {"duration": 240, "speed": 9, "legend": "Build up"}
        ]
    },
    {
        "name": "Beast Intervals",
        "steps": [
            {"duration": 240, "speed": 14, "legend": "Hard"},
            {"duration": 120, "speed": 6, "legend": "Recovery"},
            {"duration": 180, "speed": 16, "legend": "Very hard"},
            {"duration": 180, "speed": 6, "legend": "Recovery"},
            {"duration": 120, "speed": 18, "legend": "All out"},
            {"duration": 240, "speed": 6, "legend": "Recovery"},
            {"duration": 240, "speed": 14, "legend": "Hard"},
            {"duration": 120, "speed": 6, "legend": "Recovery"}
        ]
    },
    {
        "name": "Cool Down",
        "steps": [
            {"duration": 480, "speed": 5, "legend": "Easy recovery"}
        ]
    }
]');

-- 9. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_workouts_category ON workouts(category);
CREATE INDEX IF NOT EXISTS idx_workouts_level ON workouts(level);
CREATE INDEX IF NOT EXISTS idx_workouts_duration ON workouts(duration);
CREATE INDEX IF NOT EXISTS idx_workouts_created_at ON workouts(created_at);

-- 10. Verify the data
SELECT 'Categories created:' as info, count(*) as count FROM categories
UNION ALL
SELECT 'Workouts created:' as info, count(*) as count FROM workouts;