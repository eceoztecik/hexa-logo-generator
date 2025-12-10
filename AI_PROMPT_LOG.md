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
