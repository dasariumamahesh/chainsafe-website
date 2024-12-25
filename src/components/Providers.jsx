// src/components/Providers.jsx
"use client";

import { DarkModeProvider } from '@/context/DarkModeContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useState, useEffect } from 'react';

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DarkModeProvider>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </DarkModeProvider>
  );
}