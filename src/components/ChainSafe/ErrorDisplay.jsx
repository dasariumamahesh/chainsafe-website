"use client";

import React, { memo } from 'react';
import { X } from 'lucide-react';

const ErrorDisplayComponent = ({ error, show, isDarkMode, onClose }) => {
  if (!error || !show) return null;

  return (
    <div className="flex justify-center mb-4">
      <div className={`
        ${isDarkMode
          ? 'bg-gray-900/20 border-purple-500/50 text-gray-200'
          : 'bg-white/20 border-purple-400/50 text-gray-800'
        } 
        max-w-fit rounded-lg border backdrop-blur-sm py-2 px-4 relative
        shadow-[0_0_20px_rgba(168,85,247,0.3),0_0_40px_rgba(168,85,247,0.2)]
        transition-all duration-300
      `}>
        <div className="flex items-center gap-4">
          <span className="text-base font-medium whitespace-nowrap">
            {error}
          </span>
          <button
            onClick={onClose}
            className={`${isDarkMode
              ? 'text-gray-400 hover:text-gray-300'
              : 'text-gray-600 hover:text-gray-700'
              } transition-colors ml-2`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

ErrorDisplayComponent.displayName = 'ErrorDisplay';
export const ErrorDisplay = memo(ErrorDisplayComponent);