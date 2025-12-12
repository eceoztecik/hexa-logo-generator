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

## 2. Component Prop Passing in React Native

**AI Claim:**
"Adding a size prop to logo components and passing it through the component tree (LogoPreview → MonogramLogo/AbstractLogo/etc.) will work correctly in React Native without prop drilling issues."

**Verification Method:**

- Implemented size prop in LogoPreview component: `size?: "small" | "large"`
- Passed size prop to child components: MonogramLogo, AbstractLogo, MascotLogo, NoStyleLogo
- Tested prop propagation with console.logs at each level
- Rendered both sizes simultaneously: StatusChip (small) and Output screen (large)
- Verified responsive calculations: `wp(isLarge ? 50 : 16)`

**Outcome:**
✅ Confirmed. Props passed correctly through component tree without issues. Both small and large logos render simultaneously in different parts of the app. TypeScript typing with optional prop and union types worked as expected. No performance issues with conditional rendering.

---

## 3. React State Management with Firestore Real-time Listeners

**AI Claim:**
"Using useState with Firestore onSnapshot creates a reactive UI that automatically updates when backend changes document status, without requiring manual polling or refresh."

**Verification Method:**

- Implemented onSnapshot listener in useEffect for job status tracking
- Set up state updates when document changes: `setStatus("done")` triggered by onSnapshot callback
- Created job from Input screen and observed StatusChip update automatically
- Monitored time between backend status change and frontend UI update
- Verified no polling interval or manual refresh logic needed
- Tested cleanup: ensured unsubscribe() called on component unmount to prevent memory leaks

**Outcome:**
✅ Confirmed. onSnapshot listener detected Firestore changes in real-time (within 1-2 seconds). When Cloud Function updated job status from "processing" to "done", the callback fired automatically and setStatus() updated UI immediately. StatusChip transitioned from "Creating Your Design..." to "Your Design is Ready!" without any manual intervention. No polling required - Firestore push updates to client efficiently.

---

## 4. Firestore serverTimestamp() for Consistent Time Tracking

**AI Claim:**
"Using serverTimestamp() instead of client-side Date.now() ensures consistent timestamps across all users regardless of their device's clock settings, preventing issues with timezone differences or incorrect device time."

**Verification Method:**

- Implemented serverTimestamp() in job document creation: `createdAt: serverTimestamp()`
- Also used in Cloud Functions for status updates: `updatedAt: firestore.SERVER_TIMESTAMP`
- Read Firebase documentation: "Server Timestamp" behavior
- Tested by creating jobs from simulator
- Checked Firestore Console to verify timestamp values
- Compared timestamps between client creation and server updates
- Verified timestamps are in UTC format consistently

**Outcome:**
✅ Confirmed. serverTimestamp() generates consistent UTC timestamps on Firebase servers. Eliminated potential bugs from device clock drift or timezone issues. All timestamps in Firestore Console showed consistent format. Cloud Functions and frontend both use server time, ensuring accurate delay calculations (30-60 seconds) work correctly.

---

## 5. Firebase Blaze Plan Free Tier for Testing

**AI Claim:**
"Firebase Blaze plan has a generous free tier (2M Cloud Functions invocations/month) that covers testing needs without charges for small projects."

**Verification Method:**

- Reviewed Firebase pricing page: https://firebase.google.com/pricing
- Checked free tier limits: 2M invocations, 400K GB-seconds, 200K CPU-seconds per month
- Deployed Cloud Functions and tested ~20-30 invocations during development
- Monitored Firebase Console usage dashboard
- Set up $5 budget alert in Google Cloud Console as safety measure
- Checked billing after one week of testing

**Outcome:**
✅ Confirmed. All testing stayed well within free tier. Usage dashboard showed ~30 invocations, 0% of monthly quota. No charges incurred. Budget alert never triggered. Free tier is more than sufficient for demo/testing purposes.
