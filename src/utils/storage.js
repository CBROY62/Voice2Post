// Local storage utilities for persisting user data
const STORAGE_KEYS = {
  savedTexts: 'voice2post_saved_texts',
  userPreferences: 'voice2post_preferences',
  generatedContent: 'voice2post_generated_content',
};

export const storage = {
  // Save text to local storage
  saveText: (text, timestamp = Date.now()) => {
    try {
      const savedTexts = storage.getSavedTexts();
      const newText = {
        id: timestamp,
        text,
        timestamp,
        wordCount: text.trim().split(/\s+/).length,
      };
      
      const updatedTexts = [newText, ...savedTexts.slice(0, 49)]; // Keep last 50
      localStorage.setItem(STORAGE_KEYS.savedTexts, JSON.stringify(updatedTexts));
      return newText;
    } catch (error) {
      console.error('Failed to save text:', error);
      return null;
    }
  },

  // Get all saved texts
  getSavedTexts: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.savedTexts);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to get saved texts:', error);
      return [];
    }
  },

  // Delete a saved text
  deleteText: (id) => {
    try {
      const savedTexts = storage.getSavedTexts();
      const filtered = savedTexts.filter(text => text.id !== id);
      localStorage.setItem(STORAGE_KEYS.savedTexts, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Failed to delete text:', error);
      return false;
    }
  },

  // Save user preferences
  savePreferences: (preferences) => {
    try {
      const current = storage.getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(STORAGE_KEYS.userPreferences, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return null;
    }
  },

  // Get user preferences
  getPreferences: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.userPreferences);
      return saved ? JSON.parse(saved) : {
        language: 'en-US',
        autoSave: true,
        showAnalytics: false,
        theme: 'light',
        defaultTemplate: '',
      };
    } catch (error) {
      console.error('Failed to get preferences:', error);
      return {};
    }
  },

  // Save generated content
  saveGeneratedContent: (content, originalText, template, timestamp = Date.now()) => {
    try {
      const saved = storage.getGeneratedContent();
      const newContent = {
        id: timestamp,
        content,
        originalText,
        template,
        timestamp,
      };
      
      const updated = [newContent, ...saved.slice(0, 29)]; // Keep last 30
      localStorage.setItem(STORAGE_KEYS.generatedContent, JSON.stringify(updated));
      return newContent;
    } catch (error) {
      console.error('Failed to save generated content:', error);
      return null;
    }
  },

  // Get generated content history
  getGeneratedContent: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.generatedContent);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to get generated content:', error);
      return [];
    }
  },

  // Clear all data
  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Failed to clear storage:', error);
      return false;
    }
  },

  // Export data
  exportData: () => {
    try {
      const data = {
        savedTexts: storage.getSavedTexts(),
        preferences: storage.getPreferences(),
        generatedContent: storage.getGeneratedContent(),
        exportDate: new Date().toISOString(),
      };
      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Failed to export data:', error);
      return null;
    }
  },

  // Import data
  importData: (jsonData) => {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.savedTexts) {
        localStorage.setItem(STORAGE_KEYS.savedTexts, JSON.stringify(data.savedTexts));
      }
      
      if (data.preferences) {
        localStorage.setItem(STORAGE_KEYS.userPreferences, JSON.stringify(data.preferences));
      }
      
      if (data.generatedContent) {
        localStorage.setItem(STORAGE_KEYS.generatedContent, JSON.stringify(data.generatedContent));
      }
      
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  },
};