export const validateFile = (file) => {
    return file && (
      file.type === 'text/javascript' || 
      file.type === 'text/plain' || 
      file.name.endsWith('.ts')
    );
  };
  
  export const getClassNames = (isDarkMode) => ({
    textareaBase: `w-full h-full pt-12 px-4 pb-4 text-sm font-mono border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none`,
    darkMode: isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-white border-gray-200',
    secondaryButton: `flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`,
  });
  
  export const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };