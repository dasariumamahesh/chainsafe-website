// src/context/DarkModeContext.js
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run after mount to avoid hydration mismatch
    setMounted(true);
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setIsDarkMode(stored === 'dark' || (!stored && prefersDark));
  }, []);

  useEffect(() => {
    if (mounted) {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }, [isDarkMode, mounted]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Prevent flash during hydration
  if (!mounted) {
    return null;
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
}