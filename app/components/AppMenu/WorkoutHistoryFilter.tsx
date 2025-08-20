'use client';

import { useState } from 'react';
import { MdFilterList } from 'react-icons/md';

interface WorkoutHistoryFilterProps {
  onFilterChange: (filter: string) => void;
}

export default function WorkoutHistoryFilter({ onFilterChange }: WorkoutHistoryFilterProps) {
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    onFilterChange(newFilter);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <MdFilterList className="w-5 h-5 text-dark-400" />
      <div className="flex gap-2">
        {['all', 'completed', 'incomplete'].map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => handleFilterChange(filterOption)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              filter === filterOption
                ? 'bg-accent-primary text-white'
                : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
            }`}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}