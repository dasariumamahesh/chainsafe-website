import { useState, useEffect, useRef, useCallback } from 'react';

export const useTypingEffect = (text, delay = 100, deleteDelay = 50, pauseDelay = 3000, showDiff) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const timeoutRef = useRef(null);
  const frameRef = useRef(null);
  const indexRef = useRef(0);
  const isDeletingRef = useRef(false);

  const typeText = useCallback(() => {
    if (!isTyping) return;

    cancelAnimationFrame(frameRef.current);

    if (!isDeletingRef.current) {
      if (indexRef.current < text.length) {
        setDisplayText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
        timeoutRef.current = setTimeout(() => {
          frameRef.current = requestAnimationFrame(typeText);
        }, delay);
      } else {
        timeoutRef.current = setTimeout(() => {
          isDeletingRef.current = true;
          frameRef.current = requestAnimationFrame(typeText);
        }, pauseDelay);
      }
    } else {
      if (indexRef.current > 0) {
        setDisplayText(text.slice(0, indexRef.current - 1));
        indexRef.current--;
        timeoutRef.current = setTimeout(() => {
          frameRef.current = requestAnimationFrame(typeText);
        }, deleteDelay);
      } else {
        isDeletingRef.current = false;
        timeoutRef.current = setTimeout(() => {
          frameRef.current = requestAnimationFrame(typeText);
        }, delay);
      }
    }
  }, [text, delay, deleteDelay, pauseDelay, isTyping]);

  useEffect(() => {
    if (isTyping && !showDiff) {
      frameRef.current = requestAnimationFrame(typeText);
    } else {
      clearTimeout(timeoutRef.current);
      cancelAnimationFrame(frameRef.current);
      setDisplayText(text);
    }
    return () => {
      clearTimeout(timeoutRef.current);
      cancelAnimationFrame(frameRef.current);
    };
  }, [typeText, isTyping, text, showDiff]);


  return {
    displayText,
    setIsTyping,
    reset: () => {
      indexRef.current = 0;
      isDeletingRef.current = false;
      setIsTyping(true);
    }
  };
};