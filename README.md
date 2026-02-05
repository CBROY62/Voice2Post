# Voice2Post 🎤✨

Transform your voice into engaging social media content with AI enhancement. Speak naturally, edit as needed, and generate platform-specific posts instantly.

![Voice2Post Demo](https://via.placeholder.com/800x400/4f46e5/ffffff?text=Voice2Post+Demo)

## 🚀 Features

### Core Functionality
- **🎤 Voice Recognition**: Real-time speech-to-text with visual feedback
- **✏️ Text Editing**: Edit and refine your transcribed content
- **🤖 AI Enhancement**: Transform content for different social platforms
- **📋 One-Click Copy**: Copy enhanced content to clipboard instantly

### Social Media Templates
- **LinkedIn**: Professional posts with insights and hashtags
- **Twitter**: Engaging threads with proper formatting
- **Instagram**: Visual captions with emojis and hashtags
- **Facebook**: Conversational posts for community engagement

### Advanced Features
- **📊 Text Analytics**: Word count, reading time, language detection
- **🎨 Voice Visualizer**: Animated voice wave visualization
- **💾 Auto-Save**: Persistent storage of your content
- **🌐 Multi-Language**: Support for 10+ languages
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **🌙 Dark Mode**: Automatic dark/light theme support
- **♿ Accessibility**: Full keyboard navigation and screen reader support

## 🛠️ Technology Stack

- **Frontend**: React 19 with Hooks
- **Styling**: Modern CSS with CSS Variables
- **Speech API**: Web Speech Recognition API
- **Build Tool**: Vite
- **Testing**: Vitest + Testing Library
- **Linting**: ESLint

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Modern browser with speech recognition support (Chrome, Edge, Safari)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/voice2post.git
cd voice2post

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Building for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## 📖 Usage Guide

### Basic Workflow

1. **🎤 Record**: Click the microphone to start voice recording
2. **✏️ Edit**: Review and edit the transcribed text
3. **💾 Save**: Save your content for enhancement
4. **🎯 Choose Template**: Select a social media platform or use custom prompt
5. **🚀 Generate**: Create enhanced content with AI
6. **📋 Copy**: Copy the result to your clipboard

### Voice Recognition Tips

- **Speak clearly** and at a moderate pace
- **Pause between sentences** for better accuracy
- **Use punctuation words** like "comma", "period", "question mark"
- **Check microphone permissions** in your browser
- **Use a quiet environment** for best results

### Template Customization

Each template is optimized for its platform:

- **LinkedIn**: Professional tone, industry insights, networking hashtags
- **Twitter**: Concise threads, engaging questions, trending hashtags
- **Instagram**: Visual storytelling, emojis, lifestyle hashtags
- **Facebook**: Conversational tone, community engagement, personal touch

## 🔧 Configuration

### Browser Compatibility

| Browser | Speech Recognition | Recommended |
|---------|-------------------|-------------|
| Chrome | ✅ Full Support | ✅ Yes |
| Edge | ✅ Full Support | ✅ Yes |
| Safari | ✅ Full Support | ✅ Yes |
| Firefox | ❌ Not Supported | ❌ No |

### Supported Languages

- English (US/UK)
- Spanish
- French
- German
- Italian
- Portuguese (Brazil)
- Japanese
- Korean
- Chinese (Simplified)
- And more...

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📁 Project Structure

```
voice2post/
├── public/
│   └── icons/           # Social media icons
├── src/
│   ├── components/      # React components
│   │   ├── TextAnalytics.jsx
│   │   └── VoiceVisualizer.jsx
│   ├── hooks/          # Custom React hooks
│   │   └── useSpeechRecognition.js
│   ├── utils/          # Utility functions
│   │   ├── contentEnhancer.js
│   │   └── storage.js
│   ├── constants/      # App constants
│   │   └── index.js
│   ├── __tests__/      # Test files
│   │   └── App.test.jsx
│   ├── App.jsx         # Main component
│   ├── App.css         # Styles
│   └── main.jsx        # Entry point
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Customization

### Adding New Templates

1. Edit `src/utils/contentEnhancer.js`
2. Add your template to `socialMediaTemplates`
3. Include icon and enhancement logic
4. Update the UI to display your template

```javascript
myPlatform: {
  name: 'My Platform',
  icon: '/icons/myplatform.png',
  enhance: (text) => {
    return `Enhanced: ${text}`;
  }
}
```

### Styling Customization

The app uses CSS variables for easy theming:

```css
:root {
  --primary-color: #4f46e5;
  --success-color: #10b981;
  --error-color: #ef4444;
  /* ... more variables */
}
```

## 🔒 Privacy & Security

- **No Data Collection**: All processing happens locally
- **No Server Communication**: Your voice data never leaves your device
- **Local Storage Only**: Content saved in browser's local storage
- **Microphone Permissions**: Requested only when needed

## 🐛 Troubleshooting

### Common Issues

**Speech recognition not working?**
- Check browser compatibility
- Ensure microphone permissions are granted
- Try refreshing the page
- Check for HTTPS (required for speech recognition)

**Poor transcription quality?**
- Speak more clearly and slowly
- Reduce background noise
- Check microphone quality
- Try different browsers

**Content not generating?**
- Ensure you have saved text
- Select a template or enter custom prompt
- Check browser console for errors

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Fork and clone the repo
git clone https://github.com/yourusername/voice2post.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes and test
npm test

# Commit and push
git commit -m "Add amazing feature"
git push origin feature/amazing-feature

# Open a Pull Request
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Web Speech API for voice recognition
- React team for the amazing framework
- Vite for lightning-fast development
- All contributors and users

## 📞 Support

- 📧 Email: support@voice2post.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/voice2post/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/voice2post/discussions)

---

Made with ❤️ by [Your Name](https://github.com/yourusername)

**⭐ Star this repo if you find it helpful!**
