import PropTypes from 'prop-types';

export const HeaderPropTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  onDarkModeChange: PropTypes.func.isRequired,
  typedText: PropTypes.string.isRequired
};

export const ErrorDisplayPropTypes = {
  error: PropTypes.string,
  show: PropTypes.bool.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export const ActionButtonsPropTypes = {
  onProcess: PropTypes.func.isRequired,
  onToggleDiff: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  showDiff: PropTypes.bool.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  fileInputRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
  onFileSelect: PropTypes.func.isRequired
};

export const DiffViewerPropTypes = {
  oldValue: PropTypes.string.isRequired,
  newValue: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired
};

// Add to PropTypes.js
export const CodeEditorPropTypes = {
    inputText: PropTypes.string.isRequired,
    outputText: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    isDarkMode: PropTypes.bool.isRequired,
    onDrop: PropTypes.func.isRequired,
    copiedInput: PropTypes.bool.isRequired,
    copiedOutput: PropTypes.bool.isRequired,
    onCopy: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    showDiff: PropTypes.bool.isRequired
  };