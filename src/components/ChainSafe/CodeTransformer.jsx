"use client";

import React, { useReducer, useCallback, useRef, memo, useEffect } from 'react';
import { addOptionalChaining } from 'chainsafe';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { Header } from './Header';
import { ActionButtons } from './ActionButtons';
import { ErrorDisplay } from './ErrorDisplay';
import { DiffViewer } from './DiffViewer';
import { CodeEditor } from './CodeEditor';
import { useDarkMode } from '@/context/DarkModeContext';

// Action Types
const ActionTypes = {
    SET_INPUT: 'SET_INPUT',
    SET_OUTPUT: 'SET_OUTPUT',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    HIDE_ERROR: 'HIDE_ERROR',
    TOGGLE_DIFF: 'TOGGLE_DIFF',
    SET_COPIED: 'SET_COPIED',
    SET_DRAGGING: 'SET_DRAGGING',
    CLEAR: 'CLEAR'
};

// Initial state
const initialState = {
    inputText: '',
    outputText: '',
    loading: false,
    isDragging: false,
    error: '',
    showDiff: false,
    copiedInput: false,
    copiedOutput: false,
    showError: true
};

// Reducer function
function reducer(state, action) {
    switch (action.type) {
        case ActionTypes.SET_INPUT:
            return { ...state, inputText: action.payload, error: '' };
        case ActionTypes.SET_OUTPUT:
            return { ...state, outputText: action.payload };
        case ActionTypes.SET_LOADING:
            return { ...state, loading: action.payload };
        case ActionTypes.SET_ERROR:
            return { ...state, error: action.payload, showError: true };
        case ActionTypes.HIDE_ERROR:
            return { ...state, showError: false };
        case ActionTypes.TOGGLE_DIFF:
            return { ...state, showDiff: !state.showDiff };
        case ActionTypes.SET_COPIED:
            return { ...state, [action.payload.type]: action.payload.value };
        case ActionTypes.SET_DRAGGING:
            return { ...state, isDragging: action.payload };
        case ActionTypes.CLEAR:
            return {
                ...state,
                inputText: '',
                outputText: '',
                error: '',
                showDiff: false,
                copiedInput: false,
                copiedOutput: false
            };
        default:
            return state;
    }
}

const CodeTransformerComponent = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const fileInputRef = useRef(null);

    const typingOptions = {
        delay: 100,
        deleteDelay: 50,
        pauseDelay: 3000,
        showDiff: state.showDiff
    };

    const { typedText, setIsTyping, reset } = useTypingEffect(
        'Add optional chaining to JavaScript and TypeScript files...',
        typingOptions
    );

    useEffect(() => {
        if (state.showDiff) {
            setIsTyping(false);
        } else {
            reset();
        }
    }, [state.showDiff, reset]);

    const handleFileRead = useCallback(async (file) => {
        try {
            const text = await file.text();
            dispatch({ type: ActionTypes.SET_INPUT, payload: text });
            dispatch({ type: ActionTypes.SET_OUTPUT, payload: '' });
            dispatch({ type: ActionTypes.SET_ERROR, payload: '' });
        } catch {
            dispatch({
                type: ActionTypes.SET_ERROR,
                payload: 'Error reading file. Make sure it\'s a valid text file.'
            });
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }, []);

    const handleProcess = useCallback(async () => {
        if (!state.inputText.trim()) {
            dispatch({
                type: ActionTypes.SET_ERROR,
                payload: 'No code to process. Makes my life easy! Cheers 😉'
            });
            return;
        }

        try {
            dispatch({ type: ActionTypes.SET_LOADING, payload: true });
            const result = addOptionalChaining(state.inputText);
            dispatch({ type: ActionTypes.SET_OUTPUT, payload: result });
            dispatch({ type: ActionTypes.TOGGLE_DIFF });
            dispatch({ type: ActionTypes.SET_ERROR, payload: '' });
        } catch (err) {
            dispatch({
                type: ActionTypes.SET_ERROR,
                payload: 'Invalid code provided. Can\'t help you. 😅'
            });
        } finally {
            dispatch({ type: ActionTypes.SET_LOADING, payload: false });
        }
    }, [state.inputText]);

    const handleCopy = useCallback(async (text, type) => {
        try {
            await navigator.clipboard.writeText(text);
            dispatch({
                type: ActionTypes.SET_COPIED,
                payload: { type, value: true }
            });
            setTimeout(() =>
                dispatch({
                    type: ActionTypes.SET_COPIED,
                    payload: { type, value: false }
                }),
                2000
            );
        } catch {
            dispatch({
                type: ActionTypes.SET_ERROR,
                payload: 'Failed to copy to clipboard'
            });
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: ActionTypes.SET_DRAGGING, payload: false });

        const file = e.dataTransfer.files[0];
        if (!file) return;

        const validFileTypes = [
            'text/javascript',
            'application/javascript',
            'application/x-javascript'
        ];
        const validExtensions = ['.js', '.ts', '.tsx'];
        const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));

        if (validFileTypes.includes(file.type) || validExtensions.includes(fileExtension)) {
            handleFileRead(file);
        } else {
            dispatch({
                type: ActionTypes.SET_ERROR,
                payload: 'Please upload a valid JavaScript or TypeScript file (.js, .ts, .tsx)'
            });
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }, [handleFileRead]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: ActionTypes.SET_DRAGGING, payload: true });
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        if (!e.currentTarget.contains(e.relatedTarget)) {
            dispatch({ type: ActionTypes.SET_DRAGGING, payload: false });
        }
    }, []);

    return (
        <div className="relative min-h-screen bg-background">
            <Header
                isDarkMode={isDarkMode}
                onDarkModeChange={toggleDarkMode}
                typedText={typedText}
            />

            <div className="p-4 mt-6">
                <ErrorDisplay
                    error={state.error}
                    show={state.showError}
                    isDarkMode={isDarkMode}
                    onClose={() => dispatch({ type: ActionTypes.HIDE_ERROR })}
                />

                <ActionButtons
                    onProcess={handleProcess}
                    onToggleDiff={() => dispatch({ type: ActionTypes.TOGGLE_DIFF })}
                    onClear={() => dispatch({ type: ActionTypes.CLEAR })}
                    loading={state.loading}
                    showDiff={state.showDiff}
                    isDarkMode={isDarkMode}
                    fileInputRef={fileInputRef}
                    onFileSelect={handleFileRead}
                />

                <CodeEditor
                    inputText={state.inputText}
                    outputText={state.outputText}
                    onInputChange={(text) => 
                        dispatch({ type: ActionTypes.SET_INPUT, payload: text })
                    }
                    isDarkMode={isDarkMode}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    copiedInput={state.copiedInput}
                    copiedOutput={state.copiedOutput}
                    onCopy={handleCopy}
                    isDragging={state.isDragging}
                    showDiff={state.showDiff}
                />

                {state.showDiff && state.inputText && state.outputText && (
                    <DiffViewer
                        oldValue={state.inputText}
                        newValue={state.outputText}
                        isDarkMode={isDarkMode}
                    />
                )}
            </div>
        </div>
    );
};

CodeTransformerComponent.displayName = 'CodeTransformer';
export const CodeTransformer = memo(CodeTransformerComponent);