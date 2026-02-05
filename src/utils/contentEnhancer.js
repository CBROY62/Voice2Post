// Content enhancement utilities
export const socialMediaTemplates = {
  linkedin: {
    name: 'LinkedIn',
    icon: '/icons/linkedin.png',
    prompt: 'Transform this into a professional LinkedIn post with engaging hooks, insights, and relevant hashtags:',
    enhance: (text) => {
      if (!text.trim()) return "Please add some text first!";
      
      const hooks = [
        "🚀 Here's what I learned:",
        "💡 Key insight:",
        "🔥 Hot take:",
        "📈 Growth mindset:",
        "🎯 Pro tip:"
      ];
      
      const randomHook = hooks[Math.floor(Math.random() * hooks.length)];
      
      return `${randomHook}\n\n${text}\n\n💭 What's your experience with this?\n\n#LinkedIn #Professional #Growth #Networking #CareerDevelopment`;
    }
  },
  
  twitter: {
    name: 'Twitter',
    icon: '/icons/twitter.png',
    prompt: 'Convert this into a compelling Twitter thread with proper formatting and hashtags:',
    enhance: (text) => {
      if (!text.trim()) return "Please add some text first!";
      
      const sentences = text.split('.').filter(s => s.trim());
      if (sentences.length <= 1) {
        return `🧵 ${text}\n\nWhat do you think? 💭\n\n#Twitter #Thread #Discussion`;
      }
      
      let thread = `🧵 Thread: ${sentences[0].trim()}.\n\n`;
      sentences.slice(1).forEach((sentence, index) => {
        if (sentence.trim()) {
          thread += `${index + 2}/ ${sentence.trim()}.\n\n`;
        }
      });
      
      thread += `What are your thoughts? 💭\n\n#Twitter #Thread #Discussion`;
      return thread;
    }
  },
  
  instagram: {
    name: 'Instagram',
    icon: '/icons/linkedin.png', // Using linkedin icon as placeholder
    prompt: 'Create an Instagram caption with emojis and relevant hashtags:',
    enhance: (text) => {
      if (!text.trim()) return "Please add some text first!";
      
      const emojis = ['✨', '🌟', '💫', '🔥', '💎', '🌈', '🦋', '🌸'];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      
      return `${randomEmoji} ${text} ${randomEmoji}\n\n📸 Capturing this moment because it matters.\n\n💭 What resonates with you?\n\n#Instagram #Life #Inspiration #Mindfulness #Growth #Positivity #Grateful`;
    }
  },
  
  facebook: {
    name: 'Facebook',
    icon: '/icons/linkedin.png', // Using linkedin icon as placeholder
    prompt: 'Make this into an engaging Facebook post with a conversational tone:',
    enhance: (text) => {
      if (!text.trim()) return "Please add some text first!";
      
      return `Hey friends! 👋\n\n${text}\n\nI'd love to hear your thoughts on this! What's your experience been like? Drop a comment below and let's start a conversation! 💬\n\n#Facebook #Community #Discussion #Friends`;
    }
  }
};

export const customPromptEnhancer = (text, prompt) => {
  if (!text.trim()) return "Please add some text first!";
  if (!prompt.trim()) return "Please provide a prompt!";
  
  return `✨ Enhanced based on your prompt: "${prompt}"\n\n${text}\n\n---\nGenerated with custom enhancement`;
};

export const analyzeText = (text) => {
  if (!text.trim()) return null;
  
  const words = text.trim().split(/\s+/).length;
  const characters = text.length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const readingTime = Math.ceil(words / 200); // Average reading speed
  
  return {
    words,
    characters,
    sentences,
    readingTime
  };
};

export const detectLanguage = (text) => {
  // Simple language detection (can be enhanced with a proper library)
  const commonWords = {
    en: ['the', 'and', 'is', 'in', 'to', 'of', 'a', 'that', 'it', 'with'],
    es: ['el', 'la', 'de', 'que', 'y', 'en', 'un', 'es', 'se', 'no'],
    fr: ['le', 'de', 'et', 'à', 'un', 'il', 'être', 'et', 'en', 'avoir'],
    de: ['der', 'die', 'und', 'in', 'den', 'von', 'zu', 'das', 'mit', 'sich']
  };
  
  const words = text.toLowerCase().split(/\s+/);
  const scores = {};
  
  Object.keys(commonWords).forEach(lang => {
    scores[lang] = 0;
    commonWords[lang].forEach(word => {
      scores[lang] += words.filter(w => w === word).length;
    });
  });
  
  const detectedLang = Object.keys(scores).reduce((a, b) => 
    scores[a] > scores[b] ? a : b
  );
  
  return scores[detectedLang] > 0 ? detectedLang : 'en';
};