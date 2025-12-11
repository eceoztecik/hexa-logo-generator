export const colors = {
  // Primary
  primary: {
    blue: "#2938DC",
    purple: "#943DFF",
  },

  // Neutral
  neutral: {
    white: "#FAFAFA",
    gray900: "#18181B",
    gray800: "#27272A",
    gray700: "#3F3F46",
    gray600: "#52525B",
    gray500: "#71717A",
    gray400: "#A1A1AA",
    gray300: "#D4D4D8",
    gray200: "#E4E4E7",
    gray100: "#F4F4F5",
  },

  // Text
  text: {
    primary: "#FAFAFA",
    secondary: "#71717A",
    tertiary: "#999999",
    dark: "#222222",
    btnText: "#F7F6F9",
  },

  // Background
  background: {
    dark: "#27272A",
    light: "#FAFAFA",
    transparent: "transparent",
  },

  // Border
  border: {
    default: "#FAFAFA",
    transparent: "transparent",
    dark: "#7E6B6C",
  },

  // Status
  status: {
    success: {
      light: "#10B981",
      dark: "#059669",
    },
    error: {
      light: "#FCA5A5",
      main: "#EF4444",
      dark: "#DC2626",
    },
    warning: {
      light: "#FCD34D",
      main: "#F59E0B",
      dark: "#D97706",
    },
    info: {
      light: "#60A5FA",
      main: "#3B82F6",
      dark: "#2563EB",
    },
  },

  // Logo Styles
  logoStyles: {
    monogram: "#4A90E2",
    abstract: "#E94E77",
    mascot: "#F5A623",
    noStyle: "#222222",
  },

  // Gradient
  gradient: {
    primary: ["#2938DC", "#943DFF"],
    locations: [0, 0.7],
    start: [0, 0] as [number, number],
    end: [1, 1] as [number, number],
  },
} as const;

export type Colors = typeof colors;

export const withOpacity = (color: string, opacity: number): string => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
