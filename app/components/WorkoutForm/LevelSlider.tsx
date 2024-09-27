import { useWorkoutStore } from "@/app/store/useWorkoutStore";
import RangeSlider from "../Basic/RangeSlider";
import { LEVELS } from "@/app/utils/constants";

export default function LevelSlider() {
  const { level, setLevel } = useWorkoutStore();

  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(Number(e.target.value));
  };

  return (
    <div className="flex flex-col gap-4">
    <h4>Choose the intensity: {LEVELS[level].toUpperCase()}</h4>
    <RangeSlider
      min={1}
      name="level"
      max={5}
      value={level}
      onChange={handleLevelChange}
    />
  </div>
  );
}
