'use client';

import { useState } from 'react';
import { MdEdit } from 'react-icons/md';

export default function ProfileEditButton() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    // TODO: Implement edit functionality
  };

  return (
    <button
      onClick={handleEdit}
      className="p-1 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-accent-primary transition-colors"
    >
      <MdEdit className="w-4 h-4" />
    </button>
  );
}