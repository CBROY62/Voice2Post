// Application constants
export const APP_CONFIG = {
  name: 'Voice2Post',
  version: '1.0.0',
  description: 'Transform your voice into engaging social media content',
  maxTranscriptLength: 5000,
  maxGeneratedLength: 10000,
  speechRecognitionTimeout: 30000, // 30 seconds
  copySuccessTimeout: 2000, // 2 seconds
};

export const SPEECH_CONFIG = {
  language: 'en-US',
  continuous: true,
  interimResults: true,
  maxAlternatives: 1,
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'en-GB', name: 'English (UK)' },
  { code: 'es-ES', name: 'Spanish' },
  { code: 'fr-FR', name: 'French' },
  { code: 'de-DE', name: 'German' },
  { code: 'it-IT', name: 'Italian' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'ko-KR', name: 'Korean' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
];

export const ERROR_MESSAGES = {
  speechNotSupported: 'Speech recognition is not supported in this browser',
  speechPermissionDenied: 'Microphone permission denied',
  speechNetworkError: 'Network error occurred during speech recognition',
  speechNoSpeech: 'No speech detected',
  speechAborted: 'Speech recognition was aborted',
  speechAudioCapture: 'Audio capture failed',
  speechNotAllowed: 'Speech recognition not allowed',
  speechServiceNotAllowed: 'Speech recognition service not allowed',
  speechBadGrammar: 'Grammar error in speech recognition',
  speechLanguageNotSupported: 'Language not supported',
  generateFailed: 'Failed to generate content',
  copyFailed: 'Failed to copy to clipboard',
  saveFailed: 'Failed to save text',
};

export const SUCCESS_MESSAGES = {
  textSaved: 'Text saved successfully',
  contentGenerated: 'Content generated successfully',
  textCopied: 'Text copied to clipboard',
  speechStarted: 'Speech recognition started',
  speechStopped: 'Speech recognition stopped',
};