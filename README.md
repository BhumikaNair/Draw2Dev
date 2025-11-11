# ✨ Draw2Dev - Transform Wireframes into Production Code, Instantly

<div align="center">
  <img src="public/logo.svg" alt="Draw2Dev Logo" width="120"> <br/><br/>
  
  **An AI-powered wireframe-to-code converter that transforms your design wireframes into clean, production-ready React code with Tailwind CSS and real-time preview.**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black.svg)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18.0.0-blue.svg)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-06B6D4.svg)](https://tailwindcss.com/)
  [![Google AI](https://img.shields.io/badge/Google%20AI-Gemini%202.0%20Flash-4285F4.svg)](https://ai.google.dev/)
  [![Sandpack](https://img.shields.io/badge/Sandpack-2.19.11-FFD028.svg)](https://sandpack.codesandbox.io/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

---

## ✨ Key Features

- **🎨 Wireframe to Code** - Upload wireframe images and convert them to pixel-perfect React components
- **🤖 AI-Powered Generation** - Uses Google Gemini 2.0 Flash to analyze wireframes and generate clean code
- **⚡ Instant Code Generation** - Generate fully functional, responsive components in seconds
- **👁️ Live Preview** - Interactive Sandpack editor with real-time code preview and editing
- **📱 Fully Responsive** - Generated code is mobile-first and responsive across all devices
- **🎯 Smart Analysis** - AI understands layout, hierarchy, spacing, and component relationships
- **🔐 Secure Authentication** - Firebase Google OAuth for secure user authentication
- **💾 Browser Storage** - Wireframes and code stored locally in browser (no server uploads)
- **📥 Download Code** - Export generated code as JSX files
- **🔄 Regenerate** - Refine results with one-click regeneration
- **🎨 Modern UI** - Beautiful interface with gradient animations and smooth transitions

## 🏗️ Architecture

```
wireframe-to-code/
├── 📁 public/
│   ├── title.svg                    # 🎨 Application logo
│   ├── favicon.ico                  # 🏷️ Favicon
│   └── google.png                   # 🔑 Google icon for AI model
│
├── 📁 app/
│   ├── layout.tsx                   # 🎯 Root layout with metadata
│   ├── page.tsx                     # 🏠 Landing page with features
│   ├── provider.tsx                 # 🔐 Auth context provider
│   ├── globals.css                  # 🎨 Global styles with animations
│   │
│   ├── 📁 _components/
│   │   └── Authentication.tsx       # 🔐 Google OAuth component
│   │
│   ├── 📁 (routes)/
│   │   ├── layout.tsx               # 📋 Routes layout
│   │   ├── provider.tsx             # 🔄 Dashboard provider
│   │   │
│   │   └── 📁 dashboard/
│   │       ├── page.tsx             # 📊 Main dashboard
│   │       └── 📁 _components/
│   │           └── ImageUpload.tsx  # 📤 Wireframe upload component
│   │
│   ├── 📁 api/
│   │   ├── 📁 ai-model/
│   │   │   └── route.tsx            # 🤖 Gemini AI streaming endpoint
│   │   └── 📁 user/
│   │       └── route.ts             # 👤 User management endpoint
│   │
│   └── 📁 view-code/
│       ├── 📁 [uid]/
│       │   └── page.tsx             # 👁️ Code viewer with preview
│       └── 📁 _components/
│           └── CodeEditor.tsx       # 💻 Sandpack code editor
│
├── 📁 components/ui/
│   ├── button.tsx                   # 🔘 Reusable button component
│   ├── comet-card.tsx              # ✨ 3D animated card
│   ├── input.tsx                    # 📝 Form input component
│   ├── select.tsx                   # 📋 Select dropdown
│   ├── sonner.tsx                   # 🔔 Toast notifications
│   └── textarea.tsx                 # 📝 Text area component
│
├── 📁 configs/
│   ├── db.tsx                       # 🗄️ Drizzle database connection
│   ├── firebaseConfig.tsx          # 🔥 Firebase authentication config
│   └── schema.ts                    # 📊 Database schema (users table)
│
├── 📁 context/
│   └── AuthContext.tsx              # 🔐 Authentication context
│
├── 📁 data/
│   └── Constants.tsx                # ⚙️ AI prompts and configuration
│
├── 📁 config files/
│   ├── next.config.ts               # ⚡ Next.js configuration
│   ├── tailwind.config.ts           # 🎨 Tailwind CSS configuration
│   ├── postcss.config.mjs           # 🔧 PostCSS configuration
│   ├── tsconfig.json                # 📘 TypeScript configuration
│   └── drizzle.config.ts            # 🗄️ Drizzle ORM configuration
│
├── package.json                     # 📦 Dependencies and scripts
└── README.md                        # 📖 Project documentation
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **npm/yarn/pnpm**
- **Firebase Project** (for Google OAuth)
- **Google Gemini API Key** (2.0 Flash)
- **Neon Database** (PostgreSQL)

### 1. Clone & Setup

```bash
# Clone the repository
git clone https://github.com/BhumikaNair/Draw2Dev
cd Draw2Dev

# Install dependencies
npm install
```

### 2. Environment Configuration

Copy the `.env.example` file to `.env` and fill in your API keys:

```bash
cp .env.example .env
```

Then update the `.env` file with your actual credentials:

- Firebase configuration (API key, Auth domain, Project ID, App ID)
- Google Gemini API key
- Neon Database connection string

### 3. Start Development Server

```bash
# Start the Next.js development server
npm run dev
```

### 4. Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🛠️ Tech Stack

### Frontend

- **⚡ Next.js 15** - React framework with App Router
- **⚛️ React 18** - Modern UI library with hooks
- **📘 TypeScript 5** - Type-safe development
- **🎨 Tailwind CSS 3** - Utility-first CSS framework
- **✨ Motion** - Animation library for smooth transitions
- **💻 Sandpack** - CodeSandbox-powered code editor and preview
- **🎯 Radix UI** - Accessible component primitives

### Backend & AI

- **🤖 Google Gemini AI 2.0** - Advanced vision model for wireframe analysis
- **🔥 Firebase Auth** - Google OAuth authentication
- **🗄️ Drizzle ORM** - Type-safe database toolkit
- **🐘 Neon Database** - Serverless PostgreSQL

### UI Components

- **🔔 Sonner** - Beautiful toast notifications
- **🎨 Lucide React** - Icon library
- **🎴 Comet Card** - 3D animated card effects

## 🔑 Required API Keys & Setup

### 1. 🧠 Google Gemini AI API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key for Gemini 2.0 Flash model
3. Copy the API key to your `.env` file as `GOOGLE_API_KEY`
4. [Documentation](https://ai.google.dev/docs)

### 2. 🔥 Firebase Authentication

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Google Sign-In under Authentication
3. Copy your Firebase config values to `.env`
4. Add your domain to authorized domains
5. [Documentation](https://firebase.google.com/docs/auth)

### 3. 🐘 Neon Database

1. Create a database at [Neon Console](https://console.neon.tech/)
2. Copy the connection string to `.env` as `NEXT_PUBLIC_NEON_DB_CONNECTION_STRING`
3. Run `npx drizzle-kit push` to create tables
4. [Documentation](https://neon.tech/docs)

## 🎯 How It Works

1. **🎨 Upload Wireframe** - Upload your design wireframe image (PNG, JPG, etc.)
2. **📝 Add Description** - Describe the purpose and features of your webpage
3. **🤖 AI Analysis** - Gemini AI analyzes the wireframe structure and layout
4. **⚡ Code Generation** - AI generates clean React + Tailwind CSS code
5. **👁️ Live Preview** - View the generated component in real-time with Sandpack
6. **💻 Edit & Refine** - Switch between Preview and Code views
7. **📥 Download** - Export the final code as JSX file
8. **🔄 Regenerate** - Refine the output with one-click regeneration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for instant wireframe-to-code conversion**

[🌟 Star this repo](../../stargazers) • [🐛 Report Bug](../../issues) • [💡 Request Feature](../../issues)

Made by [Bhumika Nair](https://github.com/BhumikaNair)

</div>
