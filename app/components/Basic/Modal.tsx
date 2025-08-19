"use client";
import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = "md" 
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg", 
    xl: "max-w-xl"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full ${sizeClasses[size]} mx-4 animate-scale-in`}>
        <div className="card border border-accent-primary/20 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-dark-600">
            <h3 className="text-lg sm:text-xl font-bold text-dark-100">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-white transition-all duration-200 transform hover:scale-105 active:scale-95"
              title="Close modal"
            >
              <MdClose className="text-lg" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;