import { useWorkoutStore } from "@/app/store/useWorkoutStore";
import RangeSlider from "../Basic/RangeSlider";
import { LEVELS } from "@/app/utils/constants";

export default function LevelSlider() {
  const { level, setLevel } = useWorkoutStore();

  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(Number(e.target.value));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-xl font-semibold text-dark-100">
          Workout Intensity: <span className="text-accent-primary">{LEVELS[level].toUpperCase()}</span>
        </h4>
        <p className="text-dark-400 text-sm">Set the difficulty level for your workout</p>
      </div>
      <div className="space-y-4">
        <RangeSlider
          min={1}
          name="level"
          max={5}
          value={level}
          onChange={handleLevelChange}
        />
        <div className="grid grid-cols-5 gap-2 text-xs text-center">
          {Object.entries(LEVELS).map(([levelNum, levelName]) => (
            <div key={levelNum} className={`p-2 rounded-lg transition-colors ${
              level === parseInt(levelNum) 
                ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30' 
                : 'bg-dark-700 text-dark-400'
            }`}>
              <div className="font-medium uppercase tracking-wide">{levelName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
