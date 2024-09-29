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
        className="uppercase py-2 px-6 border border-black rounded-md w-fit bg-transparent has-[:checked]:bg-orange"
      >
        <input
          id={uuid}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`${className} appearance-none`}
        />
        {label ? label : null}
      </label>
    );
  } else {
    return (
      <div className={`relative w-full ${className}`}>
        {prefix && (
          <span className="absolute inset-y-0 left-0 flex items-center px-3 text-gray-500">
            {prefix}
          </span>
        )}
        <input
          id={uuid}
          className={`border border-black bg-transparent rounded-md py-3 px-6 text-black placeholder:text-black/50 w-full ${
            prefix ? "pl-12" : ""
          } ${suffix ? "pr-12" : ""}`}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {suffix && (
          <span className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            {suffix}
          </span>
        )}
      </div>
    );
  }
}
