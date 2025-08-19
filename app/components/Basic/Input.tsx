import React from "react";
import { v4 as uuidv4 } from "uuid";

interface InputProps {
  type?: string;
  name: string;
  placeholder?: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  id?: string;
  label?: string;
}

export default function Input({
  type = 'text',
  id,
  name,
  placeholder,
  value,
  onChange,
  prefix,
  suffix,
  className = "",
  label,
}: InputProps) {
  const uuid = id || uuidv4();

  if (type === "radio" || type === "checkbox") {
    return (
      <label
        htmlFor={uuid}
        className="group relative cursor-pointer"
      >
        <input
          id={uuid}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`${className} sr-only`}
        />
        <div className="flex items-center justify-center py-3 px-6 rounded-xl border-2 border-dark-600 bg-dark-700 hover:bg-dark-600 has-[:checked]:border-accent-primary has-[:checked]:bg-accent-primary/10 has-[:checked]:text-accent-primary transition-all duration-200 transform hover:scale-105 active:scale-100">
          <span className="text-sm font-medium uppercase tracking-wider text-dark-200 group-has-[:checked]:text-accent-primary">
            {label}
          </span>
        </div>
      </label>
    );
  } else {
    return (
      <div className={`relative w-full ${className}`}>
        {prefix && (
          <span className="absolute inset-y-0 left-0 flex items-center px-4 text-dark-400">
            {prefix}
          </span>
        )}
        <input
          id={uuid}
          className={`input-field ${
            prefix ? "pl-12" : ""
          } ${suffix ? "pr-12" : ""}`}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {suffix && (
          <span className="absolute inset-y-0 right-0 flex items-center px-4 text-dark-400">
            {suffix}
          </span>
        )}
      </div>
    );
  }
}
