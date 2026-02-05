import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { socialMediaTemplates, customPromptEnhancer } from './utils/contentEnhancer';
import TextAnalytics from './components/TextAnalytics';
import VoiceVisualizer from './components/VoiceVisualizer';

// Theme management hook
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('voice2post-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('voice2post-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};

export default function Voice2Post() {
  const { theme, toggleTheme } = useTheme();
  
  const {
    isListening,
    transcript,
    error: speechError,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    setTranscript
  } = useSpeechRecognition();

  const [savedText, setSavedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  const timeoutRef = useRef(null);

  // Sync speech error with general error
  useEffect(() => {
    if (speechError) {
      setError(speechError);
    }
  }, [speechError]);

  // Clear transcript
  const clearTranscript = () => {
    resetTranscript();
    setError("");
  };

  // Enhanced save with validation
  const handleSave = () => {
    if (transcript.trim()) {
      setSavedText(transcript);
      setIsEditing(false);
      resetTranscript();
    }
  };

  // Toggle editing mode on/off
  const toggleEdit = () => {
    if (!savedText.trim()) return;
    setIsEditing((prev) => !prev);
  };

  // Handle changes in editable savedText textarea
  const handleSavedTextChange = (e) => {
    setSavedText(e.target.value);
  };

  // Enhanced content generation with templates
  const handleGenerate = async () => {
    if (!prompt.trim() && !selectedTemplate) return;
    
    setIsGenerating(true);
    setError("");
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const baseText = savedText || transcript;
      
      if (selectedTemplate) {
        const template = socialMediaTemplates[selectedTemplate];
        const enhancedText = template.enhance(baseText);
        setGeneratedText(enhancedText);
      } else {
        const enhancedText = customPromptEnhancer(baseText, prompt);
        setGeneratedText(enhancedText);
      }
    } catch (error) {
      setError("Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  };

  // Enhanced copy with feedback
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      setError("Failed to copy text");
    }
  };

  // Template selection
  const selectTemplate = (template) => {
    setSelectedTemplate(template);
    setPrompt("");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!isSupported) {
    return (
      <div className="v2p-container">
        <div className="v2p-error">
          <span>⚠️ Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="v2p-container">
      <header className="v2p-header">
        <div className="v2p-header-controls">
          <button 
            className="v2p-theme-toggle" 
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        <h1 className="v2p-title">Voice2Post</h1>
        <p className="v2p-subtitle">
          Transform your voice into engaging social media content. Speak naturally, 
          edit as needed, and generate platform-specific posts with AI enhancement.
        </p>
      </header>

      {error && (
        <div className="v2p-error">
          <span>⚠️ {error}</span>
          <button onClick={() => setError("")} className="v2p-error-close">×</button>
        </div>
      )}

      <div className="v2p-panels">
        {/* Left Panel - Voice Input */}
        <div className="v2p-panel">
          <div className="v2p-panel-header">
            <h3>🎤 Voice Input</h3>
            <div className="v2p-controls">
              <button 
                className="v2p-btn-small" 
                onClick={clearTranscript}
                disabled={!transcript}
              >
                Clear
              </button>
            </div>
          </div>

          <div
            className={`v2p-mic-icon ${isListening ? 'listening' : ''}`}
            onClick={isListening ? stopListening : startListening}
            title={isListening ? "Stop Recording" : "Start Recording"}
          >
            <VoiceVisualizer isListening={isListening} />
            <img src="/icons/mic-icon.png" alt="microphone" />
            {isListening && <div className="v2p-pulse"></div>}
          </div>

          <div className="v2p-status">
            {isListening ? "🔴 Listening..." : "Click microphone to start"}
          </div>

          <textarea
            className="v2p-textarea"
            rows={6}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your speech will appear here... You can also type directly."
          />

          <button
            className="v2p-btn primary"
            onClick={handleSave}
            disabled={!transcript.trim()}
          >
            💾 Save Text
          </button>

          <div className="v2p-divider"></div>

          <div className="v2p-panel-header">
            <h4>📝 Saved Content</h4>
            <div className="v2p-controls">
              <button
                className="v2p-btn-small"
                onClick={() => setShowAnalytics(!showAnalytics)}
                disabled={!savedText.trim()}
              >
                📊 Analytics
              </button>
              <button
                className="v2p-btn-small"
                onClick={toggleEdit}
                disabled={!savedText.trim()}
              >
                {isEditing ? "✅ Done" : "✏️ Edit"}
              </button>
            </div>
          </div>

          {showAnalytics && <TextAnalytics text={savedText} />}

          <textarea
            className={`v2p-textarea ${isEditing ? 'editing' : ''}`}
            rows={6}
            value={savedText}
            onChange={isEditing ? handleSavedTextChange : undefined}
            placeholder="Saved text will appear here..."
            readOnly={!isEditing}
          />
        </div>

        {/* Right Panel - Content Enhancement */}
        <div className="v2p-panel">
          <div className="v2p-panel-header">
            <h3>✨ Content Enhancement</h3>
          </div>

          <div className="v2p-templates">
            <h4>Quick Templates:</h4>
            <div className="v2p-template-buttons">
              {Object.entries(socialMediaTemplates).map(([key, template]) => (
                <button
                  key={key}
                  className={`v2p-template-btn ${selectedTemplate === key ? 'active' : ''}`}
                  onClick={() => selectTemplate(key)}
                >
                  <img src={template.icon} alt={template.name} />
                  {template.name}
                </button>
              ))}
            </div>
          </div>

          <div className="v2p-or-divider">
            <span>OR</span>
          </div>

          <div className="v2p-custom-prompt">
            <h4>Custom Prompt:</h4>
            <input
              type="text"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                setSelectedTemplate("");
              }}
              placeholder="Enter your custom enhancement prompt..."
              className="v2p-input"
              disabled={selectedTemplate}
            />
          </div>

          <button 
            className="v2p-btn generate" 
            onClick={handleGenerate}
            disabled={(!prompt.trim() && !selectedTemplate) || isGenerating || (!savedText && !transcript)}
          >
            {isGenerating ? "🔄 Generating..." : "🚀 Generate Content"}
          </button>

          <textarea
            className="v2p-textarea output"
            rows={12}
            readOnly
            value={generatedText}
            placeholder="Enhanced content will appear here..."
          />

          <button 
            className={`v2p-btn ${copySuccess ? 'success' : 'copy'}`}
            onClick={handleCopy}
            disabled={!generatedText}
          >
            {copySuccess ? "✅ Copied!" : "📋 Copy to Clipboard"}
          </button>
        </div>
      </div>

      <footer className="v2p-footer">
        <p>💡 Tip: Speak clearly and pause between sentences for better recognition</p>
      </footer>
    </div>
  );
};
