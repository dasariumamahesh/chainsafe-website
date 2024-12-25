"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for creating a typing effect with text.
 * @param {string} text - The text to animate
 * @param {Object} options - Configuration options for the typing effect
 * @param {number} options.delay - Delay between each character when typing (default: 100ms)
 * @param {number} options.deleteDelay - Delay between each character when deleting (default: 50ms)
 * @param {number} options.pauseDelay - Delay before starting to delete text (default: 3000ms)
 * @param {boolean} options.showDiff - Whether to show diff view (stops animation when true)
 * @returns {Object} - Object containing the current display text and control functions
 */
export const useTypingEffect = (text, options = {}) => {
    const {
        delay = 100,
        deleteDelay = 50,
        pauseDelay = 3000,
        showDiff = false
    } = options;

    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    // Using a ref object to store multiple properties
    const state = useRef({
        timeoutId: null,
        frameId: null,
        index: 0,
        isDeleting: false,
        lastText: text // Store the last text to detect changes
    }).current;

    // Main animation function
    const animate = useCallback(() => {
        if (!isTyping) return;

        // Cancel any existing animation frame
        cancelAnimationFrame(state.frameId);

        // Typing phase
        if (!state.isDeleting) {
            if (state.index < text.length) {
                // Add next character
                setDisplayText(text.slice(0, state.index + 1));
                state.index++;
                state.timeoutId = setTimeout(() => {
                    state.frameId = requestAnimationFrame(animate);
                }, delay);
            } else {
                // Start deleting after pause
                state.timeoutId = setTimeout(() => {
                    state.isDeleting = true;
                    state.frameId = requestAnimationFrame(animate);
                }, pauseDelay);
            }
        }
        // Deleting phase
        else {
            if (state.index > 0) {
                // Remove last character
                setDisplayText(text.slice(0, state.index - 1));
                state.index--;
                state.timeoutId = setTimeout(() => {
                    state.frameId = requestAnimationFrame(animate);
                }, deleteDelay);
            } else {
                // Start typing again
                state.isDeleting = false;
                state.timeoutId = setTimeout(() => {
                    state.frameId = requestAnimationFrame(animate);
                }, delay);
            }
        }
    }, [text, delay, deleteDelay, pauseDelay, isTyping]);

    // Reset animation when text changes
    useEffect(() => {
        if (text !== state.lastText) {
            state.index = 0;
            state.isDeleting = false;
            state.lastText = text;
            setDisplayText('');
        }
    }, [text, state]);

    // Effect to handle animation lifecycle
    useEffect(() => {
        if (!showDiff && isTyping) {
            state.frameId = requestAnimationFrame(animate);
        } else {
            // Show full text when diff view is active
            clearTimeout(state.timeoutId);
            cancelAnimationFrame(state.frameId);
            setDisplayText(text);
        }

        // Cleanup function
        return () => {
            clearTimeout(state.timeoutId);
            cancelAnimationFrame(state.frameId);
        };
    }, [animate, showDiff, text, state, isTyping]);

    // Return object with display text and control functions
    return {
        typedText: displayText,
        setIsTyping,
        reset: useCallback(() => {
            state.index = 0;
            state.isDeleting = false;
            setIsTyping(true);
            // Clear any existing animations
            clearTimeout(state.timeoutId);
            cancelAnimationFrame(state.frameId);
            // Reset display text
            setDisplayText('');
            // Start new animation cycle
            state.frameId = requestAnimationFrame(animate);
        }, [animate, state])
    };
};

export default useTypingEffect;