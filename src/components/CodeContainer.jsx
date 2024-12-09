import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

const CodeContainer = ({ 
  inputText, 
  outputText, 
  setInputText, 
  isDarkMode, 
  handleDrop, 
  handleDragOver, 
  handleDragLeave, 
  isDragging, 
  handleCopy, 
  copiedInput, 
  copiedOutput, 
  setCopiedInput, 
  setCopiedOutput 
}) => {
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="grid grid-cols-2 h-full">
            {/* Input Section */}
            <div className="relative h-full pr-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className={`w-full h-full pt-12 px-4 pb-4 text-sm font-mono border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
                  isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-white border-gray-200'
                }`}
                placeholder="Paste your JavaScript/TypeScript code here or drag & drop a file..."
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                spellCheck="false"
              />
              {inputText && (
                <Button
                  variant="secondary"
                  onClick={() => handleCopy(inputText, setCopiedInput)}
                  className={`absolute top-3 right-3 flex items-center gap-2 ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {copiedInput ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  {copiedInput ? 'Copied!' : 'Copy'}
                </Button>
              )}
            </div>

            {/* Output Section */}
            <div className="relative h-full pl-2">
              <textarea
                value={outputText}
                readOnly
                className={`w-full h-full pt-12 px-4 pb-4 text-sm font-mono border rounded-md resize-none ${
                  isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-gray-100 border-gray-200'
                }`}
                placeholder="Code with optional chaining will appear here..."
                spellCheck="false"
              />
              {outputText && (
                <Button
                  variant="secondary"
                  onClick={() => handleCopy(outputText, setCopiedOutput)}
                  className={`absolute top-3 right-3 flex items-center gap-2 ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {copiedOutput ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  {copiedOutput ? 'Copied!' : 'Copy'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isDragging && (
        <div className="absolute inset-0 bg-purple-500 bg-opacity-10 rounded-md flex items-center justify-center pointer-events-none">
          <div className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Drop your file here
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeContainer;