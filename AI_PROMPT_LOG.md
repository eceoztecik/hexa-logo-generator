# AI Prompt Log

This document contains a chronological log of AI interactions during the development of the Hexa Logo Generator project.

---

### 1 — Project Architecture & Technology Stack Planning

Date/Phase: Planning
Tool: Claude (Sonnet 4.5)

Goal: Design the overall architecture for a logo generation app with React Native frontend, Firebase backend, and real-time status tracking

Context: Building a demo app that simulates AI logo generation. Need to decide on Firestore schema, frontend-backend responsibilities, and status flow. Must support 30-60 second mock processing time with real-time updates. Have Figma design with specific UI states and logo style options.

Prompt: "I need to build a React Native Expo app with Firebase Firestore and Cloud Functions (Python) that simulates AI logo generation. Requirements:

- Input screen where user enters a prompt
- Process for 30-60 seconds with real-time status updates
- Display results on output screen
- Use Firestore for data storage
- Cloud Functions should handle the processing logic
  Can you help me design the architecture including: Firestore schema, frontend vs backend responsibility split, and how they should communicate in real-time?"

AI Output Summary:

- Confirmed Firestore with a 'jobs' collection is appropriate for tracking generation requests
- Explained how to set up Cloud Functions (Python) with onCreate trigger for processing
- Detailed how to implement real-time listeners on frontend for status updates
- Suggested status state machine: pending → processing → completed/failed
- Recommended storing generated logos in Firebase Cloud Storage and saving URLs in Firestore
- Provided guidance on structuring the data flow between frontend and backend

My Decision: Accepted the overall architecture with key modifications based on requirements and Figma design:

- Modified status states to match Figma design exactly: processing → done/failed with specific UI messages ("Creating Your Design...", "Your Design is Ready!", "Oops, something went wrong!")
- Decided to use mock logo images from Figma design instead of Cloud Storage for MVP simplicity and faster implementation
- Will implement logo style selection (No Style, Monogram, Abstract, Mascot) as shown in Figma
- Added "Surprise me" toggle feature from design
- Frontend will write job to Firestore, Cloud Function processes it with random 30-60s delay, frontend listens for real-time updates

Verification: Will verify through Firebase documentation review and testing during implementation. Will ensure UI matches Figma design requirements.

---

### 2 — Firestore Data Model and API Contract Design

Date/Phase: Planning
Tool: Claude (Sonnet 4.5)

Goal: Design Firestore database schema and define the contract between frontend and backend for logo generation workflow

Context: Need to structure data for tracking logo generation jobs with real-time status updates. Must support client-writable fields (prompt, style, preferences) and server-writable fields (status, results). Design should be ready for future AI integration while keeping MVP simple.

Prompt: "Design a Firestore schema for tracking logo generation jobs. Requirements:

- Client writes: prompt, logo style (none/monogram/abstract/mascot), surprise me toggle
- Server updates: status (processing/done/failed), status messages, result URL
- Support real-time listeners for status updates
- Include clear separation between client-writable and server-writable fields
  Also define the API contract: what frontend writes to start a job, what backend updates over time, and all status transitions."

AI Output Summary:

- Designed jobs collection with clear field types and ownership (client vs server writable)
- Suggested status state machine: processing → done/failed with specific UI messages
- Provided query patterns for latest job and real-time listeners
- Detailed the data flow: frontend creates job → Cloud Function processes → updates status → frontend reacts
- Recommended security rules to prevent unauthorized updates
- Included failure scenarios and reproduction steps

My Decision: Accepted the schema design with minor adjustments:

- Kept userId optional for MVP simplicity (no authentication required for demo)
- Added logoStyle and surpriseMe fields to match Figma design
- Confirmed status messages match Figma exactly ("Creating Your Design...", "Your Design is Ready!", "Oops, something went wrong!")
- Will use simple mock URLs for resultUrl instead of Cloud Storage
- Agreed with onCreate trigger pattern for Cloud Functions

Verification: Will validate schema design by implementing Firestore rules and testing CRUD operations. Will ensure real-time listeners work correctly by testing status transitions in development.

---

### 3 — Firebase and Firestore Setup

Date/Phase: Implementation
Tool: Claude (Sonnet 4.5)

Goal: Set up Firebase project and configure Firestore database for the application

Context: Need to initialize Firebase in the React Native Expo app and connect to Firestore. Using Firebase Web SDK since Expo Managed Workflow doesn't support native modules. Need to configure proper imports and export db instance for use across the app. Must secure API keys using environment variables.

Prompt: "Help me set up Firebase in my React Native Expo project. I need to:

- Install firebase npm package
- Create firebaseConfig.ts with proper initialization
- Set up Firestore and export db instance
- Use Firebase Web SDK (not native) since I'm using Expo Managed Workflow
- Secure API keys with environment variables (not commit secrets to GitHub)
  What's the correct configuration structure?"

AI Output Summary:

- Recommended installing firebase package via npm
- Provided firebaseConfig structure with initializeApp and getFirestore
- Explained to use Firebase Web SDK imports (firebase/app, firebase/firestore)
- Suggested exporting db instance for reuse across components
- Recommended using .env file with EXPO*PUBLIC* prefix for environment variables
- Advised adding .env to .gitignore and creating .env.example template

My Decision: Accepted the setup approach with security considerations:

- Installed firebase package (v10.x compatible with Expo)
- Created firebase/firebaseConfig.ts using process.env for all config values
- Exported db instance for easy imports throughout the app
- Created .env file with actual Firebase credentials (excluded from git)
- Created .env.example as template for other developers
- Updated .gitignore to ensure .env never gets committed
- Used Web SDK as recommended for Expo compatibility

Verification: Verified Firebase initialization by checking package.json for firebase dependency. Confirmed .env is in .gitignore by checking git status (should not appear). Will test Firestore connection when implementing job creation in Input screen. Reviewed Firebase and Expo documentation on environment variables.

---

### 4 — Input Screen UI Implementation with Responsive Design

Date/Phase: Implementation
Tool: Claude (Sonnet 4.5)

Goal: Implement the Input Screen UI with responsive design that works across different device sizes

Context: Building the main screen where users enter prompts and select logo styles. Need to match Figma design with dark theme. Want to ensure UI scales properly on different screen sizes (phones, tablets). Need guidance on best responsive design approach for React Native.

Prompt: "I'm implementing the Input Screen for my React Native Expo app. I need the UI to be responsive across different device sizes. What are the best approaches for responsive design in React Native? Should I use percentage-based sizing, Dimensions API with helper functions like wp() and hp(), or something else? Which approach is most maintainable?"

AI Output Summary:

- Explained multiple responsive design approaches (flexbox, percentage, Dimensions API)
- Recommended using Dimensions API with width percentage (wp) and height percentage (hp) helper functions
- Suggested creating reusable helper functions: wp(percentage) and hp(percentage)
- Explained benefits: consistent sizing, easy to maintain, works across all device sizes
- Provided example implementation of wp/hp helpers

My Decision: Accepted the wp/hp helper approach:

- Created responsive helper functions in indexStyles.ts
- Applied wp() for widths, font sizes, padding, border radius
- Applied hp() for heights, margins, vertical spacing
- Converted all hardcoded pixel values to responsive percentages
- Implemented centralized color system independently for consistency
- Result: UI now scales properly on different screen sizes

Verification: Tested on iOS simulator with different device sizes (iPhone SE, iPhone 14, iPad). Verified all elements scale proportionally. Confirmed readability and usability across sizes.
