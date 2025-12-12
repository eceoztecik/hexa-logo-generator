# AI Iterations

This document demonstrates how I improved AI outputs through iterative prompting across three key challenges in the project.

---

## Iteration 1: Brand Name Extraction Regex Pattern

### Context

The `extractBrandName()` function needed to parse various prompt formats and extract the actual brand name (e.g., "HEXA" from "A blue lion logo reading 'HEXA' in bold letters").

### Prompt v1 (Initial Attempt)

**Prompt:**

```
I need a function to extract brand names from logo prompts. It should handle patterns like "X logo" and "logo for Y". Use regex to capture the brand name.
```

**AI Output:**

```javascript
export const extractBrandName = (prompt: string): string => {
  // Try "X logo" pattern
  let match = prompt.match(/(.+?)\s+logo/i);
  if (match) return match[1].trim();

  // Try "for Y" pattern
  let match = prompt.match(/for\s+(.+)/i);
  if (match) return match[1].trim();

  // Fallback: first word
  return prompt.split(" ")[0];
};
```

**Issues with v1:**

- ❌ "Modern design for Quantum Solutions" → extracted "Modern design" (wrong - captured everything before "for")
- ❌ "Minimalist logo for Apex Marketing" → extracted "Minimalist logo" (wrong - captured adjective + "logo")
- ❌ "Ocean Wave logo for surfing brand" → extracted "Ocean Wave logo for surfing brand" (wrong - captured too much)
- ❌ No handling for quoted text like `'HEXA'` or `"TechCorp"`

**Why it failed:** The regex patterns were too greedy and didn't account for:

1. Text AFTER "for" being the brand name
2. Adjectives commonly appearing before "logo"
3. Quoted brand names having highest priority

---

### Prompt v2 (After Multiple Test Failures)

**Prompt:**

```
The brand name extraction is failing on these test cases:
- "Modern design for Quantum Solutions" → extracts "Modern design" but should be "Quantum Solutions"
- "Minimalist logo for Apex Marketing" → extracts "Minimalist logo" but should be "Apex Marketing"
- "Ocean Wave logo for surfing brand" → extracts correctly as "Ocean Wave"
- "'HEXA' in bold letters" → should extract "HEXA"

Requirements:
1. Prioritize quoted text first (single or double quotes)
2. For "X for Y" pattern, extract Y (the part AFTER "for"), not X
3. For "X logo" pattern, skip common adjectives (minimalist, modern, professional, etc.)
4. Remove trailing keywords like "logo", "design", "brand", "company"
5. Handle brand names with capitals, spaces, ampersands, periods

Fix the regex patterns with correct priority order.
```

**AI Output:**

```javascript
export const extractBrandName = (prompt: string): string => {
  // 1. Quoted text (highest priority)
  let match = prompt.match(/["'](.+?)["']/);
  if (match) return match[1].trim();

  // 2. "for X" pattern - capture AFTER "for"
  match = prompt.match(
    /\bfor\s+([A-Z][\w\s&.'-]+?)(?:\s+(?:with|in|using|and)\b|$)/i
  );
  if (match) {
    const brandName = match[1].trim();
    return brandName.replace(/\s+(logo|design|brand|company)$/i, "").trim();
  }

  // 3. "X logo" pattern with adjective filtering
  match = prompt.match(/\b([A-Z][\w\s&.'-]+?)\s+logo\b/i);
  if (match) {
    const beforeLogo = match[1].trim();
    const adjectives = [
      "minimalist",
      "modern",
      "professional",
      "creative",
      "elegant",
      "simple",
      "bold",
      "vintage",
      "abstract",
      "geometric",
    ];
    const words = beforeLogo.split(/\s+/);

    if (words.length > 1 && adjectives.includes(words[0].toLowerCase())) {
      return words.slice(1).join(" ");
    }
    return beforeLogo;
  }

  // 4. Fallback
  const words = prompt.trim().split(/\s+/);
  return words[0] || "Brand";
};
```

**Improvements in v2:**

- ✅ "Modern design for Quantum Solutions" → "Quantum Solutions"
- ✅ "Minimalist logo for Apex Marketing" → "Apex Marketing"
- ✅ "Ocean Wave logo for surfing brand" → "Ocean Wave"
- ✅ "'HEXA' in bold letters" → "HEXA"

---

### What Changed in My Approach

1. **Specificity:** Added concrete failing test cases with expected outputs instead of vague requirements
2. **Priority Order:** Explicitly stated pattern priority (quoted → "for X" → "X logo" → fallback)
3. **Edge Cases:** Listed specific words to filter (adjectives) and remove (trailing keywords)
4. **Constraints:** Specified character classes for brand names (`[A-Z][\w\s&.'-]+?`)

### Final Result

The function now correctly handles 15+ different prompt formats. All edge cases pass, and the regex patterns follow a clear priority hierarchy that makes sense semantically (quoted text is most explicit, so it gets highest priority).

---

## Iteration 2: Logo Component Reusability and Size Handling

### Context

Logos needed to display at two different sizes: small preview in StatusChip and large display on Output screen.

### Prompt v1 (Initial Attempt)

**Prompt:**

```
I need to show logos in two places: small in the status chip and large on the output screen. How should I structure the logo components?
```

**AI Output:**

- Suggested creating separate component files: `LogoPreviewSmall.tsx` and `LogoPreviewLarge.tsx`
- Each would have duplicate MonogramLogo, AbstractLogo, MascotLogo, NoStyleLogo components
- Different hardcoded sizes in each file

**Issues with v1:**

- ❌ Massive code duplication (8 components duplicated)
- ❌ Maintenance nightmare (changes need to be made in 2 places)
- ❌ Violates DRY (Don't Repeat Yourself) principle
- ❌ Inconsistent sizing logic between small/large versions
- ❌ 500+ lines of duplicated code

**Why it failed:** The prompt was too vague and didn't emphasize code reusability or maintainability principles.

---

### Prompt v2 (Senior Engineering Perspective)

**Prompt:**

```
I have logo components (MonogramLogo, AbstractLogo, MascotLogo, NoStyleLogo) that need to render at two sizes:
- Small: wp(16) width/height for StatusChip preview
- Large: wp(50) width/height for Output screen display

Current approach suggested duplicating all components for small/large versions, but this creates massive code duplication.

What's the senior engineering approach? Should I:
A) Create duplicate components (current suggestion)
B) Add a size prop to make components reusable

Requirements:
- Follow DRY principle
- Easy to maintain (single source of truth)
- Type-safe sizing
- Scalable if we add more sizes later

Which approach is better and why? Provide implementation for the recommended approach.
```

**AI Output:**

- Strongly recommended **Option B: size prop**
- Explained DRY principle benefits
- Provided implementation with TypeScript typing: `size?: "small" | "large"`
- Showed conditional sizing pattern: `isLarge ? wp(50) : wp(16)`
- Emphasized single source of truth for easier maintenance

**Implementation:**

```typescript
// LogoPreview.tsx
const LogoPreview = ({
  prompt,
  imageKey,
  size = "small", // default to small
}: {
  prompt: string;
  imageKey: string;
  size?: "small" | "large";
}) => {
  // Component logic with size prop passed to children
};

// MonogramLogo.tsx
const MonogramLogo = ({ brandName, fontFamily, color, size }: any) => {
  const isLarge = size === "large";
  return (
    <View
      style={{
        width: wp(isLarge ? 50 : 16),
        height: wp(isLarge ? 50 : 16),
        fontSize: wp(isLarge ? 28 : 9.6),
        // ... other conditional styles
      }}
    >
      {/* Logo content */}
    </View>
  );
};
```

**Improvements in v2:**

- ✅ Single component handles both sizes
- ✅ ~500 lines of code eliminated
- ✅ Consistent sizing logic
- ✅ Type-safe with TypeScript union types
- ✅ Easy to add new sizes (just extend the union type)
- ✅ Changes in one place affect both use cases

---

### What Changed in My Approach

1. **Framing:** Asked for "senior engineering approach" instead of just "how to do it"
2. **Trade-offs:** Explicitly presented both options (A vs B) and asked for comparison
3. **Principles:** Mentioned DRY principle and maintainability as evaluation criteria
4. **Scalability:** Asked about future extensibility (adding more sizes)
5. **Concrete Requirements:** Specified exact sizes needed and type safety requirements

### Final Result

Clean, maintainable component architecture that follows React best practices. The size prop pattern is now used consistently across all logo components, making the codebase significantly more maintainable.

---

## Iteration 3: Navigation Parameter Type Mismatch

### Context

When navigating from Input screen to Output screen, the logo style wasn't displaying correctly - always showed "No Style" regardless of user selection.

### Prompt v1 (Surface-Level Debugging)

**Prompt:**

```
Output screen always shows "No Style" logo instead of the selected style. The navigation passes selectedStyle parameter. Why isn't it working?
```

**AI Output:**

- Suggested checking if navigation params are being received
- Recommended adding console.logs to debug
- Proposed checking if LogoPreview component has correct props

**Issues with v1:**

- ❌ Didn't identify the root cause (type mismatch)
- ❌ Suggested generic debugging steps without analysis
- ❌ Didn't examine the data flow between screens
- ❌ No investigation of what format each component expects

**Why it failed:** The prompt didn't provide enough context about what data format each component expects and what's actually being passed.

---

### Prompt v2 (Data Flow Analysis)

**Prompt:**

````
Bug: Output screen shows white background with text only, not rendering the correct logo style.

Data flow:
1. Input screen: user selects style → stored as selectedStyle ("monogram" | "abstract" | "mascot" | "none")
2. Navigation: passes selectedStyle in params to Output screen
3. Output screen: receives params and passes to LogoPreview component
4. LogoPreview: expects imageKey ("image1" | "image2" | "image3" | "image4")

Issue: There's a naming convention mismatch!
- Input screen has: selectedStyle = "monogram"
- LogoPreview expects: imageKey = "image1"

I have a styleToImageMap constant that maps:
```javascript
{
  "monogram": "image1",
  "abstract": "image2",
  "mascot": "image3",
  "none": "image4"
}
````

Question: Where should the conversion happen?
A) In Input screen before navigation (convert selectedStyle → imageKey)
B) In Output screen after receiving params (convert on receive)

Which follows single responsibility principle better?

````

**AI Output:**
- Recommended **Option A: convert at navigation source**
- Explained single responsibility principle: Input screen knows what it's sending
- Output screen should receive data in the format it needs (fewer transformations)
- Cleaner data flow: convert once at source, consume directly at destination
- Provided implementation for handleNavigateToOutput with mapping

**Implementation:**
```typescript
// app/index.tsx - Input screen
const handleNavigateToOutput = () => {
  if (currentJobId && resultUrl) {
    // Convert selectedStyle to imageKey BEFORE navigation
    const imageKey = styleToImageMap[selectedStyle] || "image1";

    router.push({
      pathname: "/output",
      params: {
        jobId: currentJobId,
        prompt: prompt,
        imageKey: imageKey, // Send in correct format
        resultUrl: resultUrl,
      },
    });
  }
};

// app/output.tsx - Output screen
const OutputScreen = () => {
  const { prompt, imageKey } = useLocalSearchParams(); // Receive correct format

  return (
    <LogoPreview
      prompt={prompt}
      imageKey={imageKey} // Pass through directly, no conversion needed
      size="large"
    />
  );
};
````

**Improvements in v2:**

- ✅ Correct logo style displays on Output screen
- ✅ Clean data flow (convert once at source)
- ✅ Output screen has no transformation logic
- ✅ Single responsibility: Input screen owns the data format it sends
- ✅ Type safety maintained throughout the flow

---

### What Changed in My Approach

1. **Root Cause Analysis:** Identified the exact type mismatch (selectedStyle vs imageKey) instead of just stating "it doesn't work"
2. **Data Flow Documentation:** Showed the complete flow from user action → storage → navigation → rendering
3. **Existing Solutions:** Mentioned the styleToImageMap constant that already exists for conversion
4. **Architecture Decision:** Asked WHERE to do conversion (A vs B) with reasoning about single responsibility
5. **Concrete Context:** Provided actual variable names, types, and mapping structure

### Final Result

Bug fixed with clean architecture. The conversion happens at the right place (navigation source), making the Output screen simpler and following single responsibility principle. All logo styles now display correctly.

---

## Key Takeaways from Iterations

### What Made Prompts More Effective:

1. **Specific Test Cases:** Showing actual inputs/outputs with ✅/❌ markers
2. **Constraints First:** Stating technical requirements before asking for solutions
3. **Trade-off Analysis:** Presenting options (A vs B) and asking for comparison
4. **Context Richness:** Providing variable names, types, existing code structure
5. **Principle-Based:** Mentioning DRY, single responsibility, type safety as evaluation criteria
6. **Why Questions:** Asking "why is this better?" forces deeper reasoning from AI

### Evolution Pattern:

**v1 (Vague):** "How do I do X?"
**v2 (Specific):** "X is failing with these exact test cases. Here are my constraints. What's the senior engineering approach considering Y principle?"

This pattern consistently produced better, more maintainable solutions.
