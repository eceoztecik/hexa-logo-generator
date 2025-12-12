# AI Fact Checks

## 1. Firestore onCreate Trigger Auto-Execution

**AI Claim:**
"Cloud Functions onCreate trigger automatically executes when a new document is created in Firestore without any manual intervention."

**Verification Method:**

- Deployed Python Cloud Function with @firestore_fn.on_document_created decorator
- Created job documents from React Native app
- Checked Google Cloud Console logs for function execution
- Observed real-time status updates in app UI

**Outcome:**
✅ Confirmed. Function executed automatically within seconds of document creation. Logs show:

- "Processing job {jobId}" messages appear immediately
- 30-60 second delays executed correctly
- Status updates propagated to frontend via onSnapshot listener
  No manual triggering required.

---
