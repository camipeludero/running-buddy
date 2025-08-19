import React, { FC } from 'react';

interface RangeSliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  customClasses?: string;
  secondaryBgColor?: string;
  name: string;
}

const RangeSlider: FC<RangeSliderProps> = ({ value, min, max, onChange, disabled, customClasses, secondaryBgColor, name }) => {
  const percentage = 100 * (value - min) / (max - min);
  
  const rangerStyle = {
    background: `linear-gradient(90deg, rgb(99, 102, 241) ${percentage}%, ${
      secondaryBgColor ? secondaryBgColor : 'rgb(42, 42, 42)'
    } ${percentage + 0.1}%)`,
  };

  return (
    <div className="relative w-full">
      <input
        className={`w-full h-3 rounded-lg cursor-pointer appearance-none bg-dark-600 border-0 ${customClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        style={rangerStyle}
        type="range"
        name={name}
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        disabled={disabled}
      />
      <div className="flex justify-between text-xs text-dark-400 mt-2">
        <span>{min}</span>
        <span className="font-medium text-accent-primary">{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
