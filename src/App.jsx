import React, { useState } from 'react';
import './App.css';

export default function Voice2Post() {
  const [transcript, setTranscript] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript((prev) => prev + (prev ? ' ' : '') + speechResult);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
    };
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGeneratedText(`✨ Enhanced: "${prompt}"`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    alert('Copied!');
  };

  return (
    <div className="v2p-container">
      <h1 className="v2p-title">Voice2Post</h1>
      <p className="v2p-subtitle">
        On the left, watch your spoken words transform into text, which you can edit for any errors. On the right, enter a custom prompt or choose from pre-defined prompts for LinkedIn or Twitter. This section syncs with the left, displaying enhanced content. Then, simply copy and share!
      </p>

      <div className="v2p-panels">
        {/* Left Panel */}
        <div className="v2p-panel">
          <div className="v2p-mic-icon" onClick={startListening}>
            🎤
          </div>
          <textarea
            className="v2p-textarea"
            rows={12}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your speech will appear here..."
          />
          <button className="v2p-btn">Save</button>
        </div>

        {/* Right Panel */}
        <div className="v2p-panel">
          <div className="v2p-input-group">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="hello"
              className="v2p-input"
            />
            <button className="v2p-btn primary" onClick={handleGenerate}>Generate</button>
            <span className="v2p-or">OR</span>
            <div className="v2p-social-icons">
              <img src="/icons/linkedin.png" alt="LinkedIn" />
              <img src="/icons/twitter.png" alt="Twitter" />
            </div>
          </div>

          <textarea
            className="v2p-textarea"
            rows={12}
            readOnly
            value={generatedText}
            placeholder="Enhanced output will appear here..."
          />
          <button className="v2p-btn success" onClick={handleCopy}>Copy</button>
        </div>
      </div>
    </div>
  );
}
