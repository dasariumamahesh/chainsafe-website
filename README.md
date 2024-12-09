# ChainSafe - Optional Chaining Transformer 🔗

A modern, user-friendly web application that automatically adds optional chaining operators to JavaScript and TypeScript code. Transform your code with ease and prevent those pesky "Cannot read property of undefined" errors!

## ✨ Features

- **Real-time Code Transformation**: Instantly add optional chaining operators to your code
- **File Upload Support**: Drag & drop or upload JavaScript/TypeScript files
- **Side-by-Side Diff View**: Compare original and transformed code with syntax highlighting
- **Copy & Paste**: Easy one-click copying of both input and output code
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Accessibility**: Built with accessibility in mind using shadcn/ui components

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chainsafe-optional-chaining.git
cd chainsafe-optional-chaining
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable UI components
- [react-diff-viewer](https://github.com/praneshr/react-diff-viewer) - Code comparison
- [chainsafe](https://www.npmjs.com/package/chainsafe) - Optional chaining transformer

## 🎯 Usage

1. **Input Code**: 
   - Type or paste your code in the left panel
   - Alternatively, drag & drop a .js/.ts file

2. **Transform**: 
   - Click "Add Optional Chaining" to transform your code
   - The transformed code appears in the right panel

3. **Compare**: 
   - Toggle "Show Diff" to see a detailed comparison
   - Green highlights show added optional chaining operators

4. **Export**: 
   - Click the copy button to copy the transformed code
   - Save the changes to your codebase

## 📁 Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── fonts/       # Custom fonts
│   ├── images/      # Static images
│   └── globals.css  # Global styles
├── components/       # React components
│   ├── ui/          # UI components
│   └── CodeContainer.jsx
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── utils/           # Code utilities
└── workers/         # Web worker for processing
```

## ⚙️ Configuration

The application can be configured through several files:

- `tailwind.config.js` - Tailwind CSS configuration
- `next.config.js` - Next.js configuration
- `components.json` - shadcn/ui configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn](https://twitter.com/shadcn) for the amazing UI components
- The Next.js team for the fantastic framework
- All contributors who have helped shape this project

## 📞 Support

If you have any questions or run into issues, please:

1. Check the [Issues](https://github.com/dasariumamahesh/chainsafe-website/issues) page
2. Open a new issue if your problem isn't already listed
3. Provide as much information as possible about your problem

---

Built with ❤️ by [Dasari Uma Mahesh]