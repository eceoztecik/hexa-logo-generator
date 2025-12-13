# Hexa AI Logo Generator

A demo mobile application that simulates an AI-powered logo generation experience. Built with React Native Expo, Firebase, and Python Cloud Functions.

## 🎯 Project Overview

This application demonstrates a complete mobile app workflow with:

- User input collection with validation
- Asynchronous job processing with Cloud Functions
- Real-time status updates via Firestore listeners
- Mock AI generation results (30-60 second delay)
- Responsive UI with multiple logo style options

**Note:** This is a case study project with mock AI generation. No actual AI model is used - results are predetermined logo styles based on user selection.

## 🛠 Tech Stack

### Frontend

- **React Native** (Expo Managed Workflow)
- **TypeScript** for type safety
- **Expo Router** for navigation
- **Firebase Web SDK** (Firestore, Cloud Functions)

### Backend

- **Firebase Cloud Functions** (Python 3.13)
- **Firestore** for real-time database
- **Firebase Security Rules** for access control

### Design

- Custom responsive design system (wp/hp helpers)
- Expo Linear Gradient for UI elements
- Custom SVG components

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Python** (3.11 or higher)
- **Firebase CLI** (`npm install -g firebase-tools`)
- **Expo CLI** (`npm install -g expo-cli`)
- **iOS Simulator** (macOS) or **Android Studio** (for Android emulator)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/eceoztecik/hexa-logo-generator.git
cd hexa-logo-generator
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd functions
pip install -r requirements.txt
cd ..
```

### 4. Firebase Setup

#### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Upgrade to Blaze plan (required for Cloud Functions)

#### Configure Firebase Credentials

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**To get these values:**

1. Go to Project Settings > General
2. Scroll to "Your apps" section
3. Click "Web app" and copy the config values

#### Deploy Firebase Resources

Login to Firebase:

```bash
firebase login
```

Initialize Firebase (if not already done):

```bash
firebase init
```

Deploy Firestore Security Rules:

```bash
firebase deploy --only firestore:rules
```

Deploy Cloud Functions:

```bash
firebase deploy --only functions
```

## ▶️ Running the App

### Start the Development Server

```bash
npx expo start
```

### Run on Simulator/Emulator

- **iOS:** Press `i` in the terminal or scan QR code with Expo Go app
- **Android:** Press `a` in the terminal or scan QR code with Expo Go app
- **Web:** Press `w` (limited functionality)

## 📁 Project Structure

```
hexa-logo-generator/
├── app/                          # Screens (Expo Router)
│   ├── index.tsx                 # Input screen
│   ├── indexStyles.ts            # Input screen styles
│   ├── output.tsx                # Output screen
│   ├── outputStyles.ts           # Output screen styles
│   └── _layout.tsx               # Root layout
├── assets/                       # Images, fonts, icons
│   ├── fonts/                    # Manrope font family
│   ├── images/                   # Background images
│   └── mock-logos/               # Pre-generated logo images
├── components/                   # Reusable UI components
│   ├── Header.tsx                # Navigation header
│   ├── LogoPreview.tsx           # Logo rendering logic
│   ├── LogoStyleSelector.tsx     # Style selection UI
│   ├── PromptBox.tsx             # Prompt display component
│   ├── StatusChip.tsx            # Job status indicator
│   └── svg/                      # SVG icon components
├── constants/                    # App configuration
│   ├── colors.ts                 # Color palette
│   ├── logoConfig.ts             # Logo styles & surprise prompts
│   └── responsive.ts             # wp/hp helpers
├── firebase/                     # Firebase configuration
│   └── firebaseConfig.ts         # Firebase initialization
├── functions/                    # Cloud Functions (Python)
│   ├── main.py                   # Job processing function
│   └── requirements.txt          # Python dependencies
├── AI_USAGE.md                   # AI collaboration summary
├── AI_PROMPT_LOG.md              # Chronological prompt log
├── AI_ITERATIONS.md              # Prompt improvement examples
├── AI_FACT_CHECKS.md             # Technical claim verification
├── AI_REVIEW.md                  # Code review decisions
├── DATA_MODEL.md                 # Firestore schema
├── API_CONTRACT.md               # Frontend-backend contract
├── .env                          # Environment variables (create this)
├── firebase.json                 # Firebase configuration
├── firestore.rules               # Firestore security rules
├── app.json                      # Expo configuration
├── package.json                  # Dependencies
├── hexa-logo.mov                 # Demo video
└── README.md                     # This file
```

## ✨ Features

### Input Screen

- Multi-line prompt input (500 character limit)
- 4 logo style options: No Style, Monogram, Abstract, Mascot
- "Surprise me" feature with random prompts
- Real-time character counter
- Input validation (minimum 3 characters)

### Status Management

- **Idle:** Initial state, ready to create
- **Processing:** Job in progress (30-60 second delay)
- **Done:** Logo ready, tap to view
- **Failed:** Error occurred, retry available

### Output Screen

- Large logo preview based on selected style
- Brand name extraction from prompt
- Copyable prompt text
- Navigation back to input

### Backend Processing

- Firestore onCreate trigger
- Random 30-60 second delay simulation
- 90% success / 10% failure rate for testing
- Real-time status updates to frontend

## 🔒 Security

Firebase Security Rules ensure:

- Anyone can read job documents (demo purposes)
- Anyone can create job documents (demo purposes)
- Only Cloud Functions can update job status
- No one can delete jobs

## 🎨 Design System

### Responsive Helpers

```typescript
import { wp, hp } from "@/constants/responsive";

// wp = width percentage
// hp = height percentage
width: wp(50); // 50% of screen width
height: hp(20); // 20% of screen height
```

### Colors

Centralized color system in `constants/colors.ts`:

- Primary: Blue (#4A90E2) to Purple (#9B59B6) gradient
- Text: Primary (#1A1A1A), Secondary (#666666)
- Status: Processing (#FFA500), Success (#4CAF50), Error (#F44336)

### Fonts

Custom Manrope font family:

- Regular (400)
- SemiBold (600)
- Bold (700)
- ExtraBold (800)

## 📖 AI Documentation

This project was developed with extensive AI collaboration. All AI interactions are documented:

- **[AI_USAGE.md](./AI_USAGE.md)** - Overview of AI tools used and key learnings
- **[AI_PROMPT_LOG.md](./AI_PROMPT_LOG.md)** - 12+ chronological prompt entries
- **[AI_ITERATIONS.md](./AI_ITERATIONS.md)** - 3 examples of prompt improvements
- **[AI_FACT_CHECKS.md](./AI_FACT_CHECKS.md)** - 5 verified technical claims
- **[AI_REVIEW.md](./AI_REVIEW.md)** - Code review suggestions and decisions

## 🧪 Testing the App

### Happy Path

1. Enter a prompt (e.g., "A modern logo for TechCorp")
2. Select a logo style (e.g., Monogram)
3. Click "Create"
4. Wait 30-60 seconds
5. Tap status chip when "Done"
6. View generated logo on output screen

### Error Scenario

The Cloud Function has a 10% chance of failing to simulate error handling:

1. Create a logo
2. If it fails, status chip shows "Failed"
3. Tap status chip to see error message
4. Click "Retry" to try again

### Timeout Scenario

If Cloud Function takes longer than 2 minutes:

1. Status automatically changes to "Failed"
2. Alert shows "Job took too long"
3. User can retry

## 🐛 Troubleshooting

**Module errors:**

```bash
rm -rf node_modules && npm install
npx expo start --clear
```

**Cloud Function not triggering:**

```bash
firebase functions:log
firebase deploy --only functions
```

**Permission denied:**

```bash
firebase deploy --only firestore:rules
```

## 📺 Demo Video

**[View Demo: hexa-logo.mov](./hexa-logo.mov)**

The video demonstrates:

- Custom prompt input and logo generation
- Real-time status updates (Processing → Done)
- Surprise Me feature with random prompts
- Cross-platform compatibility (iOS & Android)
- Complete user journey from input to output
