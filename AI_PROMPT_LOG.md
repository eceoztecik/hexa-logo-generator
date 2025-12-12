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

---

### 5 — Dynamic Logo Preview System with Style Mapping

Date/Phase: Implementation
Tool: Claude (Sonnet 4.5)

Goal: Create a flexible logo preview system that can render different logo styles (Monogram, Abstract, Mascot, No Style) based on user selection, with dynamic brand name extraction and font selection from prompt text

Context: Need to display generated logo in both StatusChip (small preview) and Output screen (large display). Each logo style has different visual representation. Must extract brand name from prompt (e.g., "A logo for ACME Corp" → "ACME"). Should support 4 styles with different colors and layouts. Want reusable LogoPreview component.

Prompt: "I need to build a logo preview system in React Native with 4 different logo styles: Monogram (first letter in circle), Abstract (wave shapes), Mascot (brand name in rounded box), No Style (just text). Each preview needs to:

- Accept prompt text and extract brand name
- Render different component based on style
- Use style-specific colors
- Work at different sizes (small in chip, large in output screen)
  How should I structure this? Should I use a factory pattern, mapping object, or switch statement? Also, how can I extract brand name from prompts like 'A logo for XYZ Company'?"

AI Output Summary:

- Recommended using mapping objects for style configuration (cleaner than switch)
- Suggested creating separate component for each logo style
- Proposed styleConfigs object with component references and colors
- Recommended regex pattern for brand name extraction: /(.+?) for/i
- Suggested making preview component accept size props for reusability
- Advised using TypeScript for type safety on style mappings

My Decision: Accepted core approach with enhancements

- Used styleMap object to map imageKey → style name (accepted)
- Created styleConfigs with component and color for each style (accepted)
- Built separate components: MonogramLogo, AbstractLogo, MascotLogo, NoStyleLogo (accepted)
- Implemented extractBrandName() with regex pattern suggested (accepted)
- Added getFontFromPrompt() helper to infer font from prompt keywords like "bold", "serif", "minimal" (my addition, not suggested by AI - wanted more dynamic customization)
- Used withOpacity() helper for Abstract logo wave gradations (my addition for visual polish)
- Did NOT implement size props - instead used fixed responsive sizing with wp() (decided fixed sizes are sufficient for MVP scope)

Verification:

- Tested all 4 logo styles render correctly
- Verified brand name extraction with various prompt formats: "Logo for X", "A logo for Y Corp", "X Company logo"
- Tested font selection logic with prompts containing "bold", "serif", "minimal"
- Confirmed colors match design system (colors.logoStyles.\*)
- Checked Abstract logo opacity gradient displays correctly

---

### 6 — Module Resolution Troubleshooting: TypeScript Aliases vs Runtime

Date/Phase: Debugging
Tool: Claude (Sonnet 4.5) + ChatGPT

Goal: Resolve module import issue where @ path alias wasn't working for LogoPreview component imports

Context: Implementing Output screen and importing utilities from LogoPreview. Using @ alias throughout the app (e.g., @/components/Header) but @/components/LogoPreview was throwing "Cannot find module" error. TypeScript showed no errors but ESLint complained and it felt unreliable.

Prompt: "I have @ path alias configured in tsconfig.json and it works for most imports, but @/components/LogoPreview gives 'Cannot find module' error. TypeScript doesn't complain but ESLint does. Relative import ../components/LogoPreview works fine. What's the issue? Should I fix the alias configuration or just use relative imports?"

AI Output Summary:

- Explained that TypeScript and Metro bundler handle module resolution separately
- Recommended creating babel.config.js with babel-plugin-module-resolver
- Provided configuration for alias mapping in Babel
- Suggested installing eslint-import-resolver-babel-module for ESLint compatibility
- Mentioned clearing Metro cache after Babel configuration changes
- ChatGPT confirmed this is a classic path alias problem: TypeScript reads the alias but ESLint and Metro bundler don't, requiring proper configuration for all three tools

My Decision: Rejected AI's solution and chose pragmatic approach

- Created babel.config.js with module-resolver plugin as AI suggested
- Installed babel-plugin-module-resolver package
- App runs successfully with @ alias BUT ESLint still shows errors
- Investigated further but ESLint resolver configuration became complex
- Decided to use relative import (../components/LogoPreview) instead
- Reasoning:
  - Relative import is only one level up (../) - very readable
  - No tooling configuration complexity
  - Works consistently across TypeScript, Metro, and ESLint
  - Eliminates red squiggles and potential edge cases
  - MVP scope doesn't justify the additional configuration complexity
- This is acceptable technical debt - can refactor to absolute imports later if needed

Verification:

- Changed import back to ../components/LogoPreview
- No TypeScript errors
- No ESLint errors
- App builds and runs successfully on iOS simulator
- All exports from LogoPreview (extractBrandName, getFontFromPrompt, styleConfigs, styleMap) work correctly
- Confirmed this is only file with relative import - acceptable for single use case
