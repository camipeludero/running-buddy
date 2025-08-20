# Running Buddy - Claude Development Notes

## Project Overview
A modern Next.js 14 treadmill running app with Spotify integration, dark mode UI, and comprehensive workout management. Built with Supabase backend and designed for mobile-first experience.

## Key Technologies
- **Framework**: Next.js 14 with App Router
- **Database**: Supabase (PostgreSQL with real-time features)
- **Styling**: Tailwind CSS with custom dark theme
- **State Management**: Zustand for workout creation
- **Audio**: Spotify Web Playbook SDK integration
- **UI Components**: Custom mobile-first components
- **Type Safety**: TypeScript throughout

## Database Schema

### Workouts Table
```sql
CREATE TABLE workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  level INTEGER NOT NULL, -- 1-4 difficulty
  sets JSONB, -- workout structure as JSON
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Sets and Steps Structure (JSON)
```typescript
interface Step {
  duration: number; // in seconds
  speed: number; // KPH
  legend: string; // description
}

interface Set {
  name: string;
  steps: Step[];
}

interface Workout {
  id: string;
  name: string;
  category: string;
  type: string;
  duration: number;
  level: number;
  sets?: Set[] | string; // Can be JSON string from DB
}
```

## Key Features Implemented

### 🎨 Modern Dark Theme
- Complete Tailwind CSS dark mode implementation
- Custom color palette with accent gradients
- Mobile-first responsive design
- Smooth animations and transitions

### 🏃‍♂️ Workout Management
- **20 comprehensive workouts** covering 3K, 5K, 7K, 8K, 10K distances
- **7 workout categories**: HIIT, Endurance, Speed, Tempo, Recovery, Race Pace, Strength
- **Beginner-friendly progressions** inspired by IBX Running methodology
- **Distance calculations** based on speed × duration for each step

### 🔍 Advanced Filtering System
- **Distance categories**: 1K, 3K, 5K, 7K, 8K, 10K, 15K, 15K+
- **Duration ranges**: 0-15min, 15-30min, 30-45min, 45+min
- **Category filtering**: All workout types
- **Real-time results count** and status indicators

### 📱 Workout Experience
- **Interactive timer** with circular progress display
- **Step-by-step guidance** with pace and duration
- **Real-time distance tracking** during workouts
- **Audio cues** for interval changes
- **Comprehensive workout modal** with progress tracking and jump navigation

### 🎵 Spotify Integration
- Spotify Web Playback SDK for music control
- Authentication flow for Spotify accounts
- Music playback during workouts

## File Structure

```
app/
├── components/
│   ├── Basic/
│   │   └── Modal.tsx              # Reusable modal component
│   ├── Running/
│   │   ├── index.tsx              # Main workout experience
│   │   └── WorkoutStepsModal.tsx  # Workout overview modal
│   ├── WorkoutSelection/
│   │   └── index.tsx              # Home page with filtering
│   └── WebPlayer/                 # Spotify integration
├── data/
│   └── mockWorkouts.ts            # Fallback workout data
├── types/
│   ├── index.ts                   # TypeScript interfaces
│   └── supabase.ts               # Database types
├── utils/
│   └── index.ts                   # Distance calculations & utilities
├── [id]/
│   └── page.tsx                   # Dynamic workout pages
├── page.tsx                       # Home page (client-side)
├── layout.tsx                     # Root layout with dark theme
└── globals.css                    # Custom styles & animations
```

## Key Functions & Utilities

### Distance Calculations
```typescript
// Calculate total workout distance
export const calculateWorkoutDistance = (sets: Set[]): number => {
  // speed (KPH) ÷ 3600 × duration (seconds) = distance (km)
}

// Categorize workouts by distance
export const getDistanceCategory = (distance: number): string => {
  // Returns: 1K, 3K, 5K, 7K, 8K, 10K, 15K, 15K+
}

// Format distance for display
export const formatDistance = (distance: number): string => {
  // Returns: "1.5km" or "800m"
}
```

### Database Integration
- **Client-side Supabase** calls to avoid SSR context issues
- **Graceful fallbacks** to mock data when database unavailable
- **Real-time status indicators** for connection state
- **Type-safe queries** with generated Supabase types

## Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Setup
```sql
-- Run this in Supabase SQL Editor
\i populate_workouts_simple.sql
```

## Troubleshooting

### Context Errors
If you see `TypeError: Cannot read properties of null (reading 'useContext')`:
- Ensure all navigation components use client-side rendering
- Check that `useParams()` is only used in client components
- Verify no server-side `cookies()` usage in client components

### Database Connection Issues
The app automatically falls back to mock data when:
- Supabase is unavailable
- Database query fails
- No workouts found in database

### Build Errors
Common fixes:
- Run `npm run build` to check TypeScript errors
- Ensure all imports are properly typed
- Check that `sets` field handling supports both JSON string and object types

## Workout Categories & Examples

### HIIT Workouts
- **Morning Sprint** (30min) - Sprint intervals with recovery
- **3K Pyramid Power** (18min) - Progressive pyramid intervals
- **8K Fartlek Fun** (45min) - Swedish speed play
- **Beginner HIIT** (25min) - 30sec work / 90sec rest

### Endurance Workouts
- **3K Beginner Build** (22min) - Walk/run progression
- **5K Base Builder** (30min) - Aerobic base development
- **7K Progression** (38min) - Progressive pace building
- **10K Base Run** (52min) - Steady endurance

### Speed Workouts
- **Speed Intervals** (25min) - Fast/rest cycles
- **5K Speed Ladder** (28min) - Progressive speed building
- **400m Repeats** (35min) - Classic track-style intervals

### Tempo/Threshold Workouts
- **3K Tempo Challenge** (20min) - Comfortably hard efforts
- **5K Goal Pace** (32min) - Race pace practice
- **7K Cruise Intervals** (40min) - Threshold pace blocks
- **10K Threshold** (55min) - Lactate threshold training

## Design Principles

### Mobile-First Approach
- All layouts designed for mobile screens first
- Progressive enhancement for larger screens
- Touch-friendly buttons and interactions
- Readable typography at all sizes

### User Experience
- **Clear visual hierarchy** with proper contrast
- **Immediate feedback** for all interactions
- **Graceful error handling** with helpful messages
- **Progressive disclosure** - complex features in modals

### Performance
- **Client-side rendering** for interactive components
- **Efficient state management** with minimal re-renders
- **Optimized images** and animations
- **Lazy loading** where appropriate

## Future Enhancements

### Potential Features
- **Workout creation wizard** with guided steps
- **Progress tracking** and workout history
- **Custom distance goals** and training plans
- **Heart rate integration** with wearables
- **Social features** and workout sharing
- **Offline mode** with service workers

### Technical Improvements
- **Real-time database** subscriptions for live updates
- **Push notifications** for workout reminders
- **PWA features** for app-like experience
- **Performance monitoring** with analytics
- **Automated testing** suite

---

*This documentation reflects the current state of the Running Buddy application as of the last development session. The app successfully combines modern web technologies with thoughtful UX design to create an engaging treadmill running experience.*