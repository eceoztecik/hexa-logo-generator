// Logo style mappings
export const styleToImageMap: Record<string, string> = {
  monogram: "image1",
  abstract: "image2",
  mascot: "image3",
  "no-style": "image4",
};

// Mock logo images
export const imageMap: Record<string, any> = {
  image1: require("../assets/mock-logos/image1.png"),
  image2: require("../assets/mock-logos/image2.png"),
  image3: require("../assets/mock-logos/image3.png"),
  image4: require("../assets/mock-logos/image4.png"),
};

// Available logo styles
export const logoStyles = [
  { id: "no-style", label: "No Style" },
  { id: "monogram", label: "Monogram" },
  { id: "abstract", label: "Abstract" },
  { id: "mascot", label: "Mascot" },
];

// Surprise me prompts
export const surprisePrompts = [
  {
    prompt: "A sleek 'NEXUS' logo with geometric patterns in electric blue",
    style: "monogram",
  },
  {
    prompt: "Professional logo for Stellar Innovations with modern typography",
    style: "abstract",
  },
  {
    prompt: "Bold 'APEX' brand mark with sharp angular design",
    style: "no-style",
  },
  {
    prompt: "Creative logo for Phoenix Creative Studio with gradient effects",
    style: "abstract",
  },
  {
    prompt: "Playful 'BUDDY' mascot logo with friendly character design",
    style: "mascot",
  },
  {
    prompt: "Elegant logo for Luna Boutique with minimalist aesthetic",
    style: "monogram",
  },
  {
    prompt: "Dynamic 'VOLT' logo reading in energetic bold letters",
    style: "no-style",
  },
  {
    prompt: "Tech-inspired logo for Quantum Labs with circuit patterns",
    style: "abstract",
  },
  {
    prompt: "Vibrant 'SPARK' brand logo with neon glow effect",
    style: "monogram",
  },
  {
    prompt: "Cute mascot logo for Cookie Crumbs Bakery with sweet character",
    style: "mascot",
  },
  {
    prompt: "Sophisticated logo for Atlas & Co. Law Firm in deep navy",
    style: "no-style",
  },
  {
    prompt: "Flowing wave design for Aqua Solutions with ocean vibes",
    style: "abstract",
  },
  {
    prompt: "Strong 'TITAN' logo with industrial metallic finish",
    style: "monogram",
  },
  {
    prompt: "Friendly mascot for Sunshine Daycare with cheerful colors",
    style: "mascot",
  },
  {
    prompt: "Modern 'ECHO' wordmark with clean sans-serif typography",
    style: "no-style",
  },
];
