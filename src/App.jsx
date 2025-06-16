import React, { useState } from "react";
import "./App.css";

export default function Voice2Post() {
  const [transcript, setTranscript] = useState("");
  const [savedText, setSavedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript((prev) => prev + (prev ? " " : "") + speechResult);
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    }
  }

  // Save current transcript into savedText
  const handleSave = () => {
    if (transcript.trim()) {
      setSavedText(transcript);
      setIsEditing(false); // Make sure edit mode is off after saving
    }
  };

  // Toggle editing mode on/off
  const toggleEdit = () => {
    if (!savedText.trim()) return; // Do nothing if no saved text
    setIsEditing((prev) => !prev);
  }

  // Handle changes in editable savedText textarea
  const handleSavedTextChange = (e) => {
    setSavedText(e.target.value);
  }

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGeneratedText(`✨ Enhanced: "${prompt}"`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    alert("Copied!");
  };

  return (
    <div className="v2p-container">
      <h1 className="v2p-title">Voice2Post</h1>
      <p className="v2p-subtitle">
        On the left, speak naturally and watch your words turn into editable
        text. Make corrections as needed. On the right, enter a custom prompt or
        select from built-in templates for LinkedIn or Twitter. This section
        enhances your message based on the input and keeps it synced with your
        original transcript. Once you're happy with the result, copy the
        polished version and share it instantly across your preferred social
        media platform.
      </p>

      <div className="v2p-panels">
        { /* Left Panel */ }
        <div className="v2p-panel">
          <div
            className="v2p-mic-icon"
            onClick={startListening}
            title="Start Speaking"
          >
            <img src="/icons/mic-icon.png" alt="mic" />
          </div>

          <textarea
            className="v2p-textarea"
            rows={6}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your speech will appear here..."
          />

          <button
            className="v2p-btn"
            onClick={handleSave}
            disabled={!transcript.trim()}
          >
            Save
          </button>

          <textarea
            className="v2p-textarea"
            rows={6}
            value={savedText}
            onChange={isEditing ? handleSavedTextChange : undefined}
            placeholder="Saved text will appear here..."
            readOnly={!isEditing}
            style={{ backgroundColor: isEditing ? "white" : "#f0f0f0" }}
          />

          <button
            className="v2p-btn"
            onClick={toggleEdit}
            disabled={!savedText.trim()}
          >
            {isEditing ? "Stop Editing" : "Edit"}
          </button>
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
            <button className="v2p-btn primary" onClick={handleGenerate}>
              Generate
            </button>
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
          <button className="v2p-btn success" onClick={handleCopy}>
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};
