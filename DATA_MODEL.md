# Data Model

This document describes the Firestore database schema for the Hexa Logo Generator application.

## Collections

### `jobs`

Stores logo generation requests and their status.

#### Document Structure

```
jobs/{jobId}
```

#### Fields

| Field           | Type      | Description                                                                                   | Writable By   |
| --------------- | --------- | --------------------------------------------------------------------------------------------- | ------------- |
| `id`            | string    | Unique job identifier (auto-generated)                                                        | Server        |
| `userId`        | string    | User identifier (optional for demo)                                                           | Client        |
| `prompt`        | string    | User's logo generation prompt                                                                 | Client        |
| `logoStyle`     | string    | Selected style: "none", "monogram", "abstract", "mascot"                                      | Client        |
| `surpriseMe`    | boolean   | Whether "Surprise me" toggle was enabled                                                      | Client        |
| `status`        | string    | Current job status: "processing", "done", "failed"                                            | Server        |
| `statusMessage` | string    | UI message: "Creating Your Design...", "Your Design is Ready!", "Oops, something went wrong!" | Server        |
| `resultUrl`     | string    | URL to generated logo image (mock)                                                            | Server        |
| `errorMessage`  | string    | Error details if status is "failed" (optional)                                                | Server        |
| `createdAt`     | timestamp | Job creation time                                                                             | Client/Server |
| `updatedAt`     | timestamp | Last update time                                                                              | Server        |
| `completedAt`   | timestamp | Job completion time (optional)                                                                | Server        |

#### Client-Writable Fields

The frontend can write these fields when creating a new job:

- `prompt`
- `logoStyle`
- `surpriseMe`
- `status` (initially set to "processing")
- `createdAt`

#### Server-Writable Fields

Cloud Functions update these fields during processing:

- `status`
- `statusMessage`
- `resultUrl`
- `errorMessage`
- `updatedAt`
- `completedAt`

## Queries

### Get Latest Job

```javascript
const latestJob = await db
  .collection("jobs")
  .orderBy("createdAt", "desc")
  .limit(1)
  .get();
```

### Get Job by ID

```javascript
const job = await db.collection("jobs").doc(jobId).get();
```

### Listen to Job Updates (Real-time)

```javascript
const unsubscribe = db
  .collection("jobs")
  .doc(jobId)
  .onSnapshot((doc) => {
    const jobData = doc.data();
    // Update UI based on status
  });
```

### Get Job History (Optional Future Feature)

```javascript
const jobHistory = await db
  .collection("jobs")
  .where("userId", "==", currentUserId)
  .orderBy("createdAt", "desc")
  .limit(10)
  .get();
```

## Status State Machine

```
[Client creates job]
        ↓
    processing ──────→ done
        ↓
        └──────────→ failed
```

### Status Transitions

- **processing** → Initial state when job is created

  - Message: "Creating Your Design..."
  - Duration: 30-60 seconds (random)

- **done** → Successful completion

  - Message: "Your Design is Ready!"
  - `resultUrl` populated with mock logo

- **failed** → Processing failure (optional)
  - Message: "Oops, something went wrong!"
  - `errorMessage` may contain details

## Security Considerations

For production, implement Firestore Security Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /jobs/{jobId} {
      // Allow read access to all authenticated users
      allow read: if request.auth != null;

      // Allow create only with required fields
      allow create: if request.auth != null
        && request.resource.data.keys().hasAll(['prompt', 'logoStyle', 'status', 'createdAt'])
        && request.resource.data.status == 'processing';

      // Only server (Cloud Functions) can update
      allow update: if false;

      // Prevent deletion
      allow delete: if false;
    }
  }
}
```

## Scalability Notes

**Current Design (MVP):**

- Simple document structure
- Real-time listeners for status updates
- No pagination needed (single active job)

**Future Considerations:**

- Add `userId` indexing for multi-user support
- Implement job history pagination
- Consider subcollections for job-related data (variations, feedback)
- Add TTL (time-to-live) for automatic cleanup of old jobs
