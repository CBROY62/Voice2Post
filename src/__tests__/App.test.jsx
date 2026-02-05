import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Mock speech recognition
const mockSpeechRecognition = {
  start: vi.fn(),
  stop: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
};

beforeEach(() => {
  // Mock webkitSpeechRecognition
  global.webkitSpeechRecognition = vi.fn(() => mockSpeechRecognition);
  
  // Mock clipboard API
  global.navigator.clipboard = {
    writeText: vi.fn(() => Promise.resolve()),
  };
});

describe('Voice2Post App', () => {
  it('renders main title', () => {
    render(<App />);
    expect(screen.getByText('Voice2Post')).toBeInTheDocument();
  });

  it('shows microphone button', () => {
    render(<App />);
    const micButton = screen.getByTitle(/Start Recording|Stop Recording/);
    expect(micButton).toBeInTheDocument();
  });

  it('allows typing in transcript textarea', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText(/Your speech will appear here/);
    
    fireEvent.change(textarea, { target: { value: 'Test transcript' } });
    expect(textarea.value).toBe('Test transcript');
  });

  it('enables save button when transcript has content', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText(/Your speech will appear here/);
    const saveButton = screen.getByText('💾 Save Text');
    
    expect(saveButton).toBeDisabled();
    
    fireEvent.change(textarea, { target: { value: 'Test content' } });
    expect(saveButton).not.toBeDisabled();
  });

  it('saves transcript to saved text area', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText(/Your speech will appear here/);
    const saveButton = screen.getByText('💾 Save Text');
    const savedTextarea = screen.getByPlaceholderText(/Saved text will appear here/);
    
    fireEvent.change(textarea, { target: { value: 'Test content to save' } });
    fireEvent.click(saveButton);
    
    expect(savedTextarea.value).toBe('Test content to save');
  });

  it('shows template buttons', () => {
    render(<App />);
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
  });

  it('enables generate button when template is selected and text is available', async () => {
    render(<App />);
    
    // Add some text and save it
    const textarea = screen.getByPlaceholderText(/Your speech will appear here/);
    const saveButton = screen.getByText('💾 Save Text');
    
    fireEvent.change(textarea, { target: { value: 'Test content' } });
    fireEvent.click(saveButton);
    
    // Select a template
    const linkedinButton = screen.getByText('LinkedIn');
    fireEvent.click(linkedinButton);
    
    // Generate button should be enabled
    const generateButton = screen.getByText('🚀 Generate Content');
    expect(generateButton).not.toBeDisabled();
  });

  it('generates content when generate button is clicked', async () => {
    render(<App />);
    
    // Add text and save
    const textarea = screen.getByPlaceholderText(/Your speech will appear here/);
    const saveButton = screen.getByText('💾 Save Text');
    
    fireEvent.change(textarea, { target: { value: 'Test content for generation' } });
    fireEvent.click(saveButton);
    
    // Select template and generate
    const linkedinButton = screen.getByText('LinkedIn');
    fireEvent.click(linkedinButton);
    
    const generateButton = screen.getByText('🚀 Generate Content');
    fireEvent.click(generateButton);
    
    // Wait for generation to complete
    await waitFor(() => {
      const outputTextarea = screen.getByPlaceholderText(/Enhanced content will appear here/);
      expect(outputTextarea.value).toContain('Test content for generation');
    }, { timeout: 2000 });
  });
});