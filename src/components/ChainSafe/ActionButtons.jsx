"use client";

import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

const ActionButtonsComponent = ({
  onProcess,
  onToggleDiff,
  onClear,
  loading,
  showDiff,
  isDarkMode,
  fileInputRef,
  onFileSelect
}) => {
  const secondaryButtonClass = `flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
    }`;

  return (
    <div className="relative flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          id="file-upload"
          className="hidden"
          accept=".js,.ts,.tsx"
          onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
        />
        <Button variant="secondary" onClick={() => fileInputRef.current?.click()} className={secondaryButtonClass}>
          <Upload size={16} /> Upload File
        </Button>
        <Button variant="secondary" onClick={onToggleDiff} className={secondaryButtonClass}>
          {showDiff ? 'Hide Diff' : 'Show Diff'}
        </Button>
        <Button variant="secondary" onClick={onClear} className={secondaryButtonClass}>
          <X size={16} /> Clear
        </Button>
      </div>

      <Button
        onClick={onProcess}
        // For the "Add Optional Chaining" button
        className={`absolute left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#2F6FEB] to-[#60A5FA] text-white hover:from-[#2563EB] hover:to-[#4B91FF] px-6 py-2 text-lg ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Add Optional Chaining'}
      </Button>

      <div className="invisible">
        <Button variant="secondary" className="invisible">Spacer</Button>
      </div>
    </div>
  );
};

ActionButtonsComponent.displayName = 'ActionButtons';
export const ActionButtons = memo(ActionButtonsComponent);