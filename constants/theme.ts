/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
// Mapping logo styles to corresponding image names
export const styleToImageMap: Record<string, string> = {
  monogram: "image1",
  abstract: "image2",
  mascot: "image3",
  "no-style": "image4",
};

// Mapping image names to actual files
export const imageMap: Record<string, any> = {
  image1: require("../assets/mock-logos/image1.png"),
  image2: require("../assets/mock-logos/image2.png"),
  image3: require("../assets/mock-logos/image3.png"),
  image4: require("../assets/mock-logos/image4.png"),
};

// Logo styles available for user selection
export const logoStyles = [
  { id: "no-style", label: "No Style" },
  { id: "monogram", label: "Monogram" },
  { id: "abstract", label: "Abstract" },
  { id: "mascot", label: "Mascot" },
];

// Random prompts and styles for "Surprise me" feature
export const surprisePrompts = [
  { prompt: "Ece Software for Simple and clean logo", style: "monogram" },
  { prompt: "Vintage Co. for Retro and vintage style logo", style: "abstract" },
  { prompt: "Happy Paws for Playful mascot logo", style: "mascot" },
  { prompt: "Nova Studio for Minimalist and modern logo", style: "no-style" },
];
