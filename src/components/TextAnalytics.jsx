import { analyzeText, detectLanguage } from '../utils/contentEnhancer';

const TextAnalytics = ({ text }) => {
  if (!text.trim()) return null;

  const analytics = analyzeText(text);
  const language = detectLanguage(text);

  const languageNames = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German'
  };

  return (
    <div className="text-analytics">
      <h4>📊 Text Analytics</h4>
      <div className="analytics-grid">
        <div className="analytics-item">
          <span className="analytics-label">Words:</span>
          <span className="analytics-value">{analytics.words}</span>
        </div>
        <div className="analytics-item">
          <span className="analytics-label">Characters:</span>
          <span className="analytics-value">{analytics.characters}</span>
        </div>
        <div className="analytics-item">
          <span className="analytics-label">Sentences:</span>
          <span className="analytics-value">{analytics.sentences}</span>
        </div>
        <div className="analytics-item">
          <span className="analytics-label">Reading time:</span>
          <span className="analytics-value">{analytics.readingTime} min</span>
        </div>
        <div className="analytics-item">
          <span className="analytics-label">Language:</span>
          <span className="analytics-value">{languageNames[language] || 'Unknown'}</span>
        </div>
      </div>
    </div>
  );
};

export default TextAnalytics;