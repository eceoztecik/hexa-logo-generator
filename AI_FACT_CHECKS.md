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

2. Component Prop Passing in React Native
   **AI Claim:**
   "Adding a size prop to logo components and passing it through the component tree (LogoPreview → MonogramLogo/AbstractLogo/etc.) will work correctly in React Native without prop drilling issues."

**Verification Method:**

Implemented size prop in LogoPreview component: size?: "small" | "large"
Passed size prop to child components: MonogramLogo, AbstractLogo, MascotLogo, NoStyleLogo
Tested prop propagation with console.logs at each level
Rendered both sizes simultaneously: StatusChip (small) and Output screen (large)
Verified responsive calculations: wp(isLarge ? 50 : 16)

**Outcome:**
✅ Confirmed. Props passed correctly through component tree without issues. Both small and large logos render simultaneously in different parts of the app. TypeScript typing with optional prop and union types worked as expected. No performance issues with conditional rendering.
