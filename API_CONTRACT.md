# API Contract

This document defines the contract between the frontend application and Firebase backend (Firestore + Cloud Functions).

## Overview

The application uses Firestore as the primary communication layer between frontend and backend. The frontend writes job documents, and Cloud Functions react to changes and update the documents accordingly.

## Frontend Responsibilities

### 1. Create Job Document

When user initiates logo generation, the frontend creates a new document in the `jobs` collection.

**Action:** Write to Firestore
**Collection:** `jobs`
**Operation:** `add()` or `doc().set()`

**Payload:**

```javascript
{
  prompt: string,              // User's input text (required)
  logoStyle: string,           // "none" | "monogram" | "abstract" | "mascot" (required)
  surpriseMe: boolean,         // Toggle state (required)
  status: "processing",        // Always "processing" initially (required)
  createdAt: FieldValue.serverTimestamp()  // Timestamp (required)
}
```

**Example:**

```javascript
const jobRef = await db.collection("jobs").add({
  prompt: "A professional logo for Harrison & Co. Law Firm",
  logoStyle: "monogram",
  surpriseMe: false,
  status: "processing",
  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
});

const jobId = jobRef.id;
```

### 2. Listen to Job Updates

The frontend establishes a real-time listener to track status changes.

**Action:** Subscribe to Firestore document
**Collection:** `jobs`
**Document:** `{jobId}`
**Operation:** `onSnapshot()`

**Example:**

```javascript
const unsubscribe = db
  .collection("jobs")
  .doc(jobId)
  .onSnapshot((doc) => {
    const job = doc.data();

    switch (job.status) {
      case "processing":
        // Show "Creating Your Design..." chip
        break;
      case "done":
        // Show "Your Design is Ready!" chip
        // Enable navigation to output screen
        break;
      case "failed":
        // Show "Oops, something went wrong!" chip
        break;
    }
  });
```

### 3. Navigate to Output Screen

When status becomes `done`, the user can tap the chip to view results.

**Navigation Trigger:** User tap on chip when `status === "done"`
**Data Passed:** `jobId` and `resultUrl`

## Backend Responsibilities (Cloud Functions)

### Cloud Function: `processLogoGeneration`

**Trigger:** Firestore `onCreate` for `jobs/{jobId}`
**Language:** Python
**Runtime:** Python 3.11+

**Function Flow:**

1. **Receive Trigger**

   - New document created in `jobs` collection
   - Extract `jobId` and job data

2. **Simulate Processing**

   - Wait for random duration: 30-60 seconds
   - Simulate AI logo generation (mock)

3. **Determine Outcome**

   - Success (90% probability): Set status to `done`
   - Failure (10% probability): Set status to `failed`

4. **Update Job Document**

**Success Update:**

```python
job_ref.update({
    'status': 'done',
    'statusMessage': 'Your Design is Ready!',
    'resultUrl': 'https://example.com/mock-logo.png',  # Mock image URL
    'updatedAt': firestore.SERVER_TIMESTAMP,
    'completedAt': firestore.SERVER_TIMESTAMP
})
```

**Failure Update:**

```python
job_ref.update({
    'status': 'failed',
    'statusMessage': 'Oops, something went wrong!',
    'errorMessage': 'Mock failure for demonstration',
    'updatedAt': firestore.SERVER_TIMESTAMP,
    'completedAt': firestore.SERVER_TIMESTAMP
})
```

## Status Transitions

### State Machine

```
Initial State (Frontend)
        ↓
    processing
        ↓
   [30-60s delay]
        ↓
    ┌───────┴───────┐
    ↓               ↓
   done          failed
```

### Status Details

| Status       | Set By   | Message                       | User Action Available         |
| ------------ | -------- | ----------------------------- | ----------------------------- |
| `processing` | Frontend | "Creating Your Design..."     | Wait                          |
| `done`       | Backend  | "Your Design is Ready!"       | Tap chip → Navigate to Output |
| `failed`     | Backend  | "Oops, something went wrong!" | Tap chip → Show error details |

## Failure Scenarios

### Scenario 1: Random Failure (Mock)

**Trigger:** Cloud Function randomly selects failure (10% chance)

**Backend Action:**

```python
job_ref.update({
    'status': 'failed',
    'statusMessage': 'Oops, something went wrong!',
    'errorMessage': 'Random mock failure for testing'
})
```

**Frontend Behavior:**

- Display red error chip
- Show error message
- Optionally allow retry

**How to Reproduce:**

- Create multiple jobs
- Statistically, ~1 in 10 will fail
- Or modify Cloud Function to always fail for testing

### Scenario 2: Timeout (Future Enhancement)

**Trigger:** Job processing exceeds maximum time (e.g., 90 seconds)

**Backend Action:**

```python
if elapsed_time > 90:
    job_ref.update({
        'status': 'failed',
        'statusMessage': 'Oops, something went wrong!',
        'errorMessage': 'Processing timeout'
    })
```

## Data Flow Diagram

```
┌─────────────┐
│   Frontend  │
│ (React Native)│
└──────┬──────┘
       │ 1. Create job
       │    status: "processing"
       ↓
┌─────────────────┐
│   Firestore     │
│  jobs/{jobId}   │
└────────┬────────┘
         │ 2. onCreate trigger
         ↓
┌──────────────────┐
│ Cloud Function   │
│   (Python)       │
│ - Wait 30-60s    │
│ - Pick outcome   │
│ - Update doc     │
└────────┬─────────┘
         │ 3. Update job
         │    status: "done"/"failed"
         ↓
┌─────────────────┐
│   Firestore     │
│  jobs/{jobId}   │
└────────┬────────┘
         │ 4. onSnapshot notification
         ↓
┌─────────────┐
│   Frontend  │
│ - Update UI │
│ - Show chip │
└─────────────┘
```

## Error Handling

### Frontend Error Handling

```javascript
try {
  const jobRef = await db.collection("jobs").add(jobData);
  // Set up listener
} catch (error) {
  console.error("Failed to create job:", error);
  // Show user-friendly error message
}
```

### Backend Error Handling

```python
try:
    # Process job
    job_ref.update({
        'status': 'done',
        'resultUrl': mock_result_url
    })
except Exception as e:
    # Log error and update job status
    job_ref.update({
        'status': 'failed',
        'statusMessage': 'Oops, something went wrong!',
        'errorMessage': str(e)
    })
```

## Future Enhancements

### Webhook Simulation (Nice-to-have)

Instead of onCreate trigger, implement a webhook-style pattern:

1. Frontend writes job with `status: "pending"`
2. Frontend calls HTTP Cloud Function: `POST /api/generate-logo`
3. Function processes asynchronously and updates Firestore
4. Frontend still uses real-time listener

**Benefits:**

- More similar to real AI service integration
- Better error handling and retry logic
- Request/response pattern familiar to REST APIs

### Real AI Integration Ready

The current architecture is designed to be easily upgraded:

1. Replace mock delay with actual AI API call
2. Replace mock `resultUrl` with real generated image
3. Add progress updates during generation (optional)
4. Implement result caching and CDN delivery
