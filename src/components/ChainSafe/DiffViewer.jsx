"use client";

import React, { memo } from 'react';
import ReactDiffViewer from 'react-diff-viewer-continued';

const customStyles = {
  variables: {
    light: {
      diffViewerBackground: '#ffffff',
      diffViewerColor: '#111827',
      addedBackground: '#ecfdf5',
      addedColor: '#064e3b',
      removedBackground: '#fef2f2',
      removedColor: '#7f1d1d',
      gutterBackground: '#ffffff',
      gutterColor: '#6e7681'
    },
    dark: {
      diffViewerBackground: 'rgb(17 24 39)',
      diffViewerColor: 'rgb(243 244 246)',
      addedBackground: '#1e392b',
      addedColor: '#e2e8f0',
      removedBackground: '#3c2626',
      removedColor: '#e2e8f0',
      gutterBackground: 'rgb(17 24 39)',
      gutterColor: '#858585',
    },
  },
  line: {
    padding: '0 15px',
    minHeight: '20px',
    fontSize: '13px',
    lineHeight: '20px',
    fontFamily: 'monospace'
  },
  gutter: {
    padding: '0 10px',
    minWidth: '35px',
    textAlign: 'right',
    fontSize: '12px'
  },
  content: {
    width: '50%'
  }
};

const DiffViewerComponent = ({ oldValue, newValue, isDarkMode }) => (
  <div className={`w-full rounded-md overflow-hidden border ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
    <div className={`flex border-b ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex-1 px-4 py-2 text-sm font-medium">
        <span className={isDarkMode ? 'text-gray-100' : 'text-gray-900'}>Original Code</span>
      </div>
      <div className="flex-1 px-4 py-2 text-sm font-medium">
        <span className={isDarkMode ? 'text-gray-100' : 'text-gray-900'}>Modified Code</span>
      </div>
    </div>
    <ReactDiffViewer
      oldValue={oldValue}
      newValue={newValue}
      splitView={true}
      useDarkTheme={isDarkMode}
      hideLineNumbers={false}
      showDiffOnly={false}
      styles={customStyles}
    />
  </div>
);

DiffViewerComponent.displayName = 'DiffViewer';
export const DiffViewer = memo(DiffViewerComponent);