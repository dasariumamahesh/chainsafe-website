"use client"

import { addOptionalChaining } from 'chainsafe';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Upload, X, Copy, Check } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ReactDiffViewer from 'react-diff-viewer-continued';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import chainSafeLogo from './images/chainsafe-logo.png';

const customStyles = {
  variables: {
    light: {
      diffViewerBackground: '#ffffff',
      diffViewerColor: '#212121',
      addedBackground: '#e6ffec',
      addedColor: '#24292e',
      removedBackground: '#ffebe9',
      removedColor: '#24292e',
      wordAddedBackground: '#acf2bd',
      wordRemovedBackground: '#fdb8c0',
    },
    dark: {
      diffViewerBackground: '#1a1b1e',
      diffViewerColor: '#ffffff',
      addedBackground: '#2ea04326',
      addedColor: '#ffffff',
      removedBackground: '#f8514926',
      removedColor: '#ffffff',
      wordAddedBackground: '#2ea04359',
      wordRemovedBackground: '#f8514959',
    }
  }
};

const ChainSafeUI = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [typedText, setTypedText] = useState('');
  const [showDiff, setShowDiff] = useState(false);
  const [copiedInput, setCopiedInput] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const fileInputRef = useRef(null);
  const timeoutRef = useRef(null);
  const frameRef = useRef(null);
  const indexRef = useRef(0);
  const isDeletingRef = useRef(false);

  const fullTypingText = 'Add optional chaining to JavaScript and TypeScript files...';

  const textareaBaseClass = `w-full h-full pt-12 px-4 pb-4 text-sm font-mono border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none`;
  const darkModeClass = isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-white border-gray-200';
  const secondaryButtonClass = `flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`;

  const typeText = useCallback(() => {
    if (!isTyping) return;

    cancelAnimationFrame(frameRef.current);

    if (!isDeletingRef.current) {
      if (indexRef.current < fullTypingText.length) {
        const currentText = fullTypingText.slice(0, indexRef.current + 1);
        indexRef.current++;
        setTypedText(currentText);
        timeoutRef.current = setTimeout(() => {
          frameRef.current = requestAnimationFrame(typeText);
        }, 100);
      } else {
        timeoutRef.current = setTimeout(() => {
          isDeletingRef.current = true;
          frameRef.current = requestAnimationFrame(typeText);
        }, 3000);
      }
    } else {
      if (indexRef.current > 0) {
        const currentText = fullTypingText.slice(0, indexRef.current - 1);
        indexRef.current--;
        setTypedText(currentText);
        timeoutRef.current = setTimeout(() => {
          frameRef.current = requestAnimationFrame(typeText);
        }, 50);
      } else {
        isDeletingRef.current = false;
        timeoutRef.current = setTimeout(() => {
          frameRef.current = requestAnimationFrame(typeText);
        }, 1000);
      }
    }
  }, [isTyping]);
  useEffect(() => {
    frameRef.current = requestAnimationFrame(typeText);

    return () => {
      clearTimeout(timeoutRef.current);
      cancelAnimationFrame(frameRef.current);
    };
  }, [typeText]);

  useEffect(() => {
    if (showDiff) {
      setIsTyping(false);
      clearTimeout(timeoutRef.current);
      cancelAnimationFrame(frameRef.current);
      setTypedText(fullTypingText);
    } else {
      setIsTyping(true);
      indexRef.current = 0;
      isDeletingRef.current = false;
      frameRef.current = requestAnimationFrame(typeText);
    }
  }, [showDiff, typeText]);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  const handleScroll = useCallback((e) => {
    const source = e.target;
    const target = source === inputRef.current ? outputRef.current : inputRef.current;
    if (target && source) {
      target.scrollTop = source.scrollTop;
    }
  }, []);

  const handleCopy = async (text, setCopied) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy to clipboard');
    }
  };

  const handleProcess = async () => {
    if (!inputText.trim()) {
      setError('Please enter or upload some code first');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const result = addOptionalChaining(inputText);
      setOutputText(result);
      setShowDiff(true);
    } catch (err) {
      setError('Error processing the code: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = useCallback(() => {
    setInputText('');
    setOutputText('');
    setError('');
    setShowDiff(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleFileRead = useCallback(async (file) => {
    try {
      setInputText(await file.text());
      setOutputText('');
      setShowDiff(false);
      setError('');
    } catch {
      setError('Error reading file. Make sure it\'s a valid text file.');
      fileInputRef.current.value = '';
    }
  }, []);

  const handleFileDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'text/javascript' || file.type === 'text/plain' || file.name.endsWith('.ts'))) {
      handleFileRead(file);
    } else {
      setError('Please upload a valid JavaScript or TypeScript file');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [handleFileRead]);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  }, [handleFileRead]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget)) {
      return;
    }
    setIsDragging(false);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto py-3 px-6">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14">
                <Image
                  src={chainSafeLogo}
                  alt="ChainSafe Logo"
                  className="object-contain"
                  priority
                  fill
                />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-inter">
                ChainSafe
              </h1>
            </div>
            <div className="h-5 overflow-hidden">
              <p className="text-sm font-medium text-center font-inter">
                {typedText}
              </p>
            </div>
          </div>

          <div className="absolute top-6 right-6 flex items-center gap-2">
            <Sun className="h-5 w-5 text-yellow-500" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              className="data-[state=checked]:bg-purple-500"
            />
            <Moon className="h-5 w-5 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="p-4 mt-6">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="relative flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              id="file-upload"
              className="hidden"
              accept=".js,.ts,.tsx,.txt"
              onChange={handleFileSelect}
            />
            <Button
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              className={secondaryButtonClass}
            >
              <Upload size={16} />
              Upload File
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowDiff(!showDiff)}
              className={secondaryButtonClass}
            >
              {showDiff ? 'Hide Diff' : 'Show Diff'}
            </Button>
            <Button
              variant="secondary"
              onClick={handleClear}
              className={secondaryButtonClass}
            >
              <X size={16} />
              Clear
            </Button>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Button
              onClick={handleProcess}
              className={`bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 px-6 py-2 text-lg ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Add Optional Chaining'}
            </Button>
          </div>

          <div className="invisible flex items-center gap-2">
            <Button variant="secondary" className="invisible">
              Spacer
            </Button>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-16rem)] ${showDiff ? 'mb-8' : ''}`}>
          <div className="relative h-full overflow-hidden">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className={`${textareaBaseClass} ${darkModeClass} scrollbar-hide`}
              placeholder="Paste your JavaScript/TypeScript code here or drag & drop a file..."
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleFileDrop}
              onScroll={handleScroll}
            />
            {inputText && (
              <Button
                variant="secondary"
                onClick={() => handleCopy(inputText, setCopiedInput)}
                className={`absolute top-3 right-3 ${secondaryButtonClass}`}
              >
                {copiedInput ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                {copiedInput ? 'Copied!' : 'Copy'}
              </Button>
            )}
            <div
              className={`drag-overlay absolute inset-0 bg-purple-500 bg-opacity-10 rounded-md flex items-center justify-center pointer-events-none ${isDragging ? 'active' : ''
                }`}
            >
              <div className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Drop your file here
              </div>
            </div>
          </div>

          <div className="relative h-full">
            <textarea
              ref={outputRef}
              value={outputText}
              readOnly
              className={`${textareaBaseClass} ${darkModeClass}`}
              placeholder="Code with optional chaining will appear here..."
              onScroll={handleScroll}
            />
            {outputText && (
              <Button
                variant="secondary"
                onClick={() => handleCopy(outputText, setCopiedOutput)}
                className={`absolute top-3 right-3 ${secondaryButtonClass}`}
              >
                {copiedOutput ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                {copiedOutput ? 'Copied!' : 'Copy'}
              </Button>
            )}
          </div>
        </div>

        {showDiff && inputText && outputText && (
          <div className={`w-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <ReactDiffViewer
              oldValue={inputText}
              newValue={outputText}
              splitView={true}
              useDarkTheme={isDarkMode}
              hideLineNumbers={false}
              showDiffOnly={false}
              styles={customStyles}
              leftTitle="Original Code"
              rightTitle="Modified Code"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChainSafeUI;