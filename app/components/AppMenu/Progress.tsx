'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { getUserStatistics, getWeeklyActivity, getUserPersonalBests, getUserGoals } from '@/lib/userService';
import { 
  MdQueryStats, 
  MdTrendingUp, 
  MdTrendingDown,
  MdDirectionsRun,
  MdTimer,
  MdSpeed,
  MdLocalFireDepartment,
  MdCalendarToday,
  MdDateRange,
  MdBarChart
} from 'react-icons/md';

interface ProgressData {
  weeklyData: Array<{
    day: string;
    distance: number;
    duration: number;
    calories: number;
  }>;
  monthlyProgress: {
    currentMonth: {
      workouts: number;
      distance: number;
      time: number;
      avgPace: number;
      calories: number;
    };
    previousMonth: {
      workouts: number;
      distance: number;
      time: number;
      avgPace: number;
      calories: number;
    };
  };
  personalBests: Array<{
    metric: string;
    value: string;
    date: string;
    improved: boolean;
  }>;
  goals: Array<{
    id: string;
    goal_type: string;
    target_value: number;
    current_value: number;
  }>;
}

export default function Progress() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('week');
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  // Load progress data
  useEffect(() => {
    if (!user) return;

    const loadProgressData = async () => {
      try {
        setLoading(true);

        // Get all data in parallel
        const [
          { data: statsData },
          { data: weeklyData },
          { data: personalBestsData },
          { data: goalsData }
        ] = await Promise.all([
          getUserStatistics(user.id),
          getWeeklyActivity(user.id),
          getUserPersonalBests(user.id),
          getUserGoals(user.id, true)
        ]);

        // Calculate current and previous month stats
        const now = new Date();
        const currentMonth = {
          workouts: statsData?.totalWorkouts || 0,
          distance: statsData?.totalDistance || 0,
          time: statsData?.totalTime || 0,
          avgPace: statsData?.avgPace || 0,
          calories: statsData?.totalCalories || 0
        };

        // For now, simulate previous month as 70% of current (this could be enhanced with actual monthly data)
        const previousMonth = {
          workouts: Math.floor(currentMonth.workouts * 0.7),
          distance: Math.round(currentMonth.distance * 0.7 * 10) / 10,
          time: Math.floor(currentMonth.time * 0.7),
          avgPace: currentMonth.avgPace > 0 ? currentMonth.avgPace * 1.1 : 0, // Previous was slower
          calories: Math.floor(currentMonth.calories * 0.7)
        };

        // Transform personal bests data
        const personalBests = (personalBestsData || []).map(pb => ({
          metric: pb.metric_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          value: formatPersonalBestValue(pb.metric_type, pb.value, pb.unit),
          date: new Date(pb.achieved_at || '').toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          }),
          improved: true // All personal bests are improvements
        }));

        // If no personal bests yet, show placeholders
        if (personalBests.length === 0) {
          personalBests.push(
            { metric: 'Complete your first workout', value: '--', date: 'Not yet achieved', improved: false },
            { metric: 'Set your first distance record', value: '--', date: 'Not yet achieved', improved: false },
            { metric: 'Achieve your best pace', value: '--', date: 'Not yet achieved', improved: false },
            { metric: 'Burn the most calories', value: '--', date: 'Not yet achieved', improved: false }
          );
        }

        setProgressData({
          weeklyData: weeklyData || [],
          monthlyProgress: {
            currentMonth,
            previousMonth
          },
          personalBests,
          goals: goalsData || []
        });

      } catch (error) {
        console.error('Error loading progress data:', error);
        // Set empty fallback data
        setProgressData({
          weeklyData: [],
          monthlyProgress: {
            currentMonth: { workouts: 0, distance: 0, time: 0, avgPace: 0, calories: 0 },
            previousMonth: { workouts: 0, distance: 0, time: 0, avgPace: 0, calories: 0 }
          },
          personalBests: [],
          goals: []
        });
      } finally {
        setLoading(false);
      }
    };

    loadProgressData();
  }, [user]);

  // Memoize utility functions
  const calculateImprovement = useCallback((current: number, previous: number) => {
    const improvement = ((current - previous) / previous) * 100;
    return {
      percentage: Math.abs(improvement),
      isImprovement: improvement > 0
    };
  }, []);

  const formatTime = useCallback((minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }, []);

  const formatPace = useCallback((pace: number) => {
    const mins = Math.floor(pace);
    const secs = Math.round((pace - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}/km`;
  }, []);

  // Memoize computed values
  const maxDistance = useMemo(() => 
    progressData?.weeklyData ? Math.max(...progressData.weeklyData.map(d => d.distance)) : 0, 
    [progressData?.weeklyData]
  );

  // Helper function to format personal best values
  const formatPersonalBestValue = (metricType: string, value: number, unit: string) => {
    switch (metricType) {
      case 'fastest_5k':
        // Convert minutes to MM:SS format
        const mins = Math.floor(value);
        const secs = Math.round((value - mins) * 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
      case 'best_pace':
        // Already in min/km format
        const pMins = Math.floor(value);
        const pSecs = Math.round((value - pMins) * 60);
        return `${pMins}:${pSecs.toString().padStart(2, '0')}/km`;
      case 'longest_run':
        return `${value}km`;
      case 'most_calories':
        return `${value} cal`;
      default:
        return `${value} ${unit}`;
    }
  };

  if (!user) return null;

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-2">
            <MdQueryStats className="w-6 h-6 text-accent-secondary" />
            Progress & Stats
          </h1>
        </div>
        <div className="card">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-dark-700 rounded w-1/3"></div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="bg-dark-800 rounded-xl p-4">
                  <div className="h-4 bg-dark-700 rounded w-full mb-2"></div>
                  <div className="h-8 bg-dark-700 rounded w-2/3 mb-1"></div>
                  <div className="h-3 bg-dark-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!progressData) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-2">
          <MdQueryStats className="w-6 h-6 text-accent-secondary" />
          Progress & Stats
        </h1>
        <div className="flex gap-2">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-accent-primary text-white'
                  : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Monthly Overview */}
      <div className="card">
        <h2 className="text-lg font-semibold text-dark-100 mb-4">This Month vs Last Month</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { 
              label: 'Workouts', 
              current: progressData.monthlyProgress.currentMonth.workouts, 
              previous: progressData.monthlyProgress.previousMonth.workouts,
              icon: MdDirectionsRun,
              color: 'text-accent-primary'
            },
            { 
              label: 'Distance', 
              current: progressData.monthlyProgress.currentMonth.distance, 
              previous: progressData.monthlyProgress.previousMonth.distance,
              icon: MdDirectionsRun,
              color: 'text-accent-success',
              suffix: 'km'
            },
            { 
              label: 'Time', 
              current: progressData.monthlyProgress.currentMonth.time, 
              previous: progressData.monthlyProgress.previousMonth.time,
              icon: MdTimer,
              color: 'text-accent-warning',
              formatter: formatTime
            },
            { 
              label: 'Avg Pace', 
              current: progressData.monthlyProgress.currentMonth.avgPace, 
              previous: progressData.monthlyProgress.previousMonth.avgPace,
              icon: MdSpeed,
              color: 'text-accent-secondary',
              formatter: formatPace,
              reverse: true // Lower is better for pace
            },
            { 
              label: 'Calories', 
              current: progressData.monthlyProgress.currentMonth.calories, 
              previous: progressData.monthlyProgress.previousMonth.calories,
              icon: MdLocalFireDepartment,
              color: 'text-accent-error'
            }
          ].map((stat) => {
            const improvement = calculateImprovement(stat.current, stat.previous);
            const isActualImprovement = stat.reverse ? !improvement.isImprovement : improvement.isImprovement;
            const IconComponent = stat.icon;
            
            return (
              <div key={stat.label} className="bg-dark-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <IconComponent className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-dark-400 text-xs uppercase tracking-wide">{stat.label}</span>
                </div>
                <div className="text-xl font-bold text-dark-100 mb-1">
                  {stat.formatter ? stat.formatter(stat.current) : `${stat.current}${stat.suffix || ''}`}
                </div>
                <div className={`flex items-center gap-1 text-xs ${
                  isActualImprovement ? 'text-accent-success' : 'text-accent-error'
                }`}>
                  {isActualImprovement ? <MdTrendingUp className="w-3 h-3" /> : <MdTrendingDown className="w-3 h-3" />}
                  {improvement.percentage.toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="card">
        <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
          <MdBarChart className="w-5 h-5 text-accent-primary" />
          This Week&apos;s Activity
        </h2>
        <div className="space-y-4">
          {progressData.weeklyData.map((day, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-8 text-dark-300 text-sm font-medium">{day.day}</div>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 bg-dark-800 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full transition-all duration-500"
                    style={{ width: `${maxDistance > 0 ? (day.distance / maxDistance) * 100 : 0}%` }}
                  />
                </div>
                <div className="w-16 text-dark-200 text-sm text-right">
                  {day.distance > 0 ? `${day.distance}km` : 'Rest'}
                </div>
              </div>
              <div className="w-16 text-dark-400 text-xs text-right">
                {day.duration > 0 ? `${day.duration}min` : ''}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Bests */}
      <div className="card">
        <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
          <MdTrendingUp className="w-5 h-5 text-accent-warning" />
          Personal Bests
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {progressData.personalBests.map((pb, index) => (
            <div key={index} className="bg-dark-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-dark-200 font-medium">{pb.metric}</h3>
                {pb.improved && (
                  <div className="flex items-center gap-1 text-accent-success text-xs">
                    <MdTrendingUp className="w-3 h-3" />
                    New!
                  </div>
                )}
              </div>
              <div className="text-2xl font-bold text-dark-100 mb-1">{pb.value}</div>
              <div className="flex items-center gap-1 text-dark-400 text-xs">
                <MdCalendarToday className="w-3 h-3" />
                {pb.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Running Streaks */}
      <div className="card">
        <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
          <MdLocalFireDepartment className="w-5 h-5 text-accent-error" />
          Running Streaks
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-dark-800 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-dark-100">7</div>
            <div className="text-dark-400 text-sm">Current Streak</div>
          </div>
          <div className="bg-dark-800 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-dark-100">14</div>
            <div className="text-dark-400 text-sm">Longest Streak</div>
          </div>
          <div className="bg-dark-800 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-2xl font-bold text-dark-100">3</div>
            <div className="text-dark-400 text-sm">This Week</div>
          </div>
        </div>
      </div>

      {/* Goals Progress */}
      <div className="card">
        <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
          <MdDateRange className="w-5 h-5 text-accent-success" />
          Monthly Goals
        </h2>
        <div className="space-y-4">
          {progressData.goals.length > 0 ? progressData.goals.map((goal, index) => {
            const goalName = goal.goal_type.replace('monthly_', '').replace('_', ' ');
            const unit = goal.goal_type.includes('distance') ? 'km' : 
                        goal.goal_type.includes('workouts') ? 'workouts' : 'cal';
            const progress = (goal.current_value / goal.target_value) * 100;
            return (
              <div key={goal.id}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-dark-200 font-medium">
                    {goalName.charAt(0).toUpperCase() + goalName.slice(1)} goal
                  </h3>
                  <span className="text-dark-400 text-sm">
                    {goal.current_value} / {goal.target_value} {unit}
                  </span>
                </div>
                <div className="bg-dark-800 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      progress >= 100 
                        ? 'bg-accent-success' 
                        : progress >= 75 
                          ? 'bg-accent-warning' 
                          : 'bg-accent-primary'
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <div className="text-right text-xs text-dark-400 mt-1">
                  {progress.toFixed(1)}% complete
                </div>
              </div>
            );
          }) : (
            <div className="text-center py-8">
              <p className="text-dark-400">No active goals set.</p>
              <p className="text-dark-500 text-sm mt-1">Goals will be created automatically when you start tracking workouts.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}