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
    background: `linear-gradient(90deg, orange ${percentage}%, ${
      secondaryBgColor ? secondaryBgColor : '#dddddd'
    } ${percentage + 0.1}%)`,
  };

  return (
    <input
      className={`w-full h-1.5 rounded-full cursor-pointer appearance-none border border-black ${customClasses}`}
      style={rangerStyle}
      type="range"
      name={name}
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default RangeSlider;
