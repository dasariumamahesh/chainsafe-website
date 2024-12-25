// src/components/ChainSafe/CodeEditor.jsx
"use client";

import React, { useRef, memo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const CodeEditorComponent = ({
  inputText,
  outputText,
  onInputChange,
  onDrop,
  copiedInput,
  copiedOutput,
  onCopy,
  isDragging,
  showDiff
}) => {
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const debouncedOnChange = useCallback(
    debounce((value) => onInputChange(value), 300),
    [onInputChange]
  );

  const handleScroll = (e) => {
    const source = e.target;
    const target = source === inputRef.current ? outputRef.current : inputRef.current;
    if (target && source) {
      target.scrollTop = source.scrollTop;
    }
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${showDiff ? 'h-[calc(80vh-16rem)] mb-6' : 'h-[calc(100vh-16rem)]'}`}>
      {/* Input Area */}
      <div className="relative h-full overflow-hidden">
        <textarea
          ref={inputRef}
          value={inputText}
          onChange={(e) => debouncedOnChange(e.target.value)}
          className="textarea-base scrollbar-hide"
          placeholder="Paste your JavaScript/TypeScript code here or drag & drop a file..."
          onDragOver={(e) => { e.preventDefault(); }}
          onDragLeave={(e) => { e.preventDefault(); }}
          onDrop={onDrop}
          onScroll={handleScroll}
          spellCheck="false"
          aria-label="Input code editor"
        />
        {inputText && (
          <Button
            variant="secondary"
            onClick={() => onCopy(inputText, 'copiedInput')}
            className="absolute top-2 right-3 button-secondary"
            aria-label="Copy input code"
          >
            {copiedInput ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            {copiedInput ? 'Copied!' : 'Copy'}
          </Button>
        )}
        {isDragging && (
          <div className="absolute inset-0 bg-purple-500 bg-opacity-10 rounded-md flex items-center justify-center">
            <div className="text-lg font-medium text-foreground">
              Drop your file here
            </div>
          </div>
        )}
      </div>

      {/* Output Area */}
      <div className="relative h-full">
        <textarea
          ref={outputRef}
          value={outputText}
          readOnly
          className="textarea-base scrollbar-hide"
          placeholder="Code with optional chaining will appear here..."
          onScroll={handleScroll}
          spellCheck="false"
          aria-label="Output code editor"
        />
        {outputText && (
          <Button
            variant="secondary"
            onClick={() => onCopy(outputText, 'copiedOutput')}
            className="absolute top-2 right-3 button-secondary"
            aria-label="Copy output code"
          >
            {copiedOutput ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            {copiedOutput ? 'Copied!' : 'Copy'}
          </Button>
        )}
      </div>
    </div>
  );
};

CodeEditorComponent.displayName = 'CodeEditor';
export const CodeEditor = memo(CodeEditorComponent);