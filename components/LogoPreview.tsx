import { colors, withOpacity } from "@/constants/colors";
import { wp } from "@/constants/responsive";
import React from "react";
import { Text, View } from "react-native";

// Logo Components
const MonogramLogo = ({ brandName, fontFamily, color, size }: any) => {
  const isLarge = size === "large";
  return (
    <View
      style={[
        {
          width: wp(isLarge ? 50 : 16),
          height: wp(isLarge ? 50 : 16),
          backgroundColor: color,
          borderRadius: wp(isLarge ? 8 : 10),
          borderWidth: isLarge ? 2 : 1,
          borderColor: colors.border.dark,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <Text
        style={{
          fontSize: wp(isLarge ? 28 : 9.6),
          color: "#fff",
          fontWeight: "900",
          fontFamily,
        }}
      >
        {brandName[0].toUpperCase()}
      </Text>
    </View>
  );
};

const Wave = ({ color, style, size }: any) => {
  const isLarge = size === "large";
  return (
    <View
      style={[
        {
          width: wp(isLarge ? 50 : 16),
          height: wp(isLarge ? 6 : 2),
          backgroundColor: color,
          borderRadius: wp(3),
          marginVertical: wp(isLarge ? 1.5 : 0.5),
        },
        style,
      ]}
    />
  );
};

const AbstractLogo = ({ color, size }: any) => (
  <View>
    <Wave color={withOpacity(color, 0.7)} style={{}} size={size} />
    <Wave color={withOpacity(color, 0.85)} style={{}} size={size} />
    <Wave color={withOpacity(color, 1)} style={{}} size={size} />
  </View>
);

const MascotLogo = ({ brandName, color, size }: any) => {
  const isLarge = size === "large";
  return (
    <View
      style={{
        width: wp(isLarge ? 50 : 16),
        height: wp(isLarge ? 50 : 16),
        backgroundColor: color,
        borderRadius: wp(isLarge ? 6 : 4),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: wp(isLarge ? 10 : 4.3),
          fontWeight: "600",
          textAlign: "center",
          paddingHorizontal: wp(1.6),
        }}
      >
        {brandName}
      </Text>
    </View>
  );
};

const NoStyleLogo = ({ brandName, fontFamily, size }: any) => {
  const isLarge = size === "large";
  return (
    <View>
      <Text
        style={{
          fontSize: wp(isLarge ? 10 : 4.3),
          color: "#222",
          textAlign: "center",
          fontFamily,
        }}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {brandName}
      </Text>
    </View>
  );
};

// Style Mappings
export const styleMap: any = {
  image1: "Monogram",
  image2: "Abstract",
  image3: "Mascot",
  image4: "No Style",
};

export const styleConfigs: any = {
  Monogram: { component: MonogramLogo, color: colors.logoStyles.monogram },
  Abstract: { component: AbstractLogo, color: colors.logoStyles.abstract },
  Mascot: { component: MascotLogo, color: colors.logoStyles.mascot },
  "No Style": { component: NoStyleLogo, color: colors.logoStyles.noStyle },
};

// Helper functions
export const extractBrandName = (prompt: string): string => {
  // 1. In-quotation mark pattern (highest priority)
  let match = prompt.match(/["'](.+?)["']/);
  if (match) return match[1].trim();

  // 2. "for X" pattern
  match = prompt.match(
    /\bfor\s+([A-Z][\w\s&.'-]+?)(?:\s+(?:with|in|using|and)\b|$)/i
  );
  if (match) {
    const brandName = match[1].trim();
    // Remove words like "logo" and "design" at the end.
    return brandName.replace(/\s+(logo|design|brand|company)$/i, "").trim();
  }

  // 3. "X logo" pattern - take the 1-3 words that come IMMEDIATELY BEFORE "logo"
  // Skip adjectives like "minimalist logo" and "modern logo".
  match = prompt.match(/\b([A-Z][\w\s&.'-]+?)\s+logo\b/i);
  if (match) {
    const beforeLogo = match[1].trim();
    // Filter common adjectives
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

    // If the first word is an adjective and there is more than one word, skip the first word.
    if (words.length > 1 && adjectives.includes(words[0].toLowerCase())) {
      return words.slice(1).join(" ");
    }
    return beforeLogo;
  }

  // 4. Fallback: first word
  const words = prompt.trim().split(/\s+/);
  return words[0] || "Brand";
};

export const getFontFromPrompt = (prompt: string): string => {
  if (prompt.toLowerCase().includes("serif")) return "Manrope-ExtraBold";
  if (prompt.toLowerCase().includes("bold")) return "Manrope-Bold";
  if (prompt.toLowerCase().includes("minimal")) return "Manrope-Regular";
  return "Manrope-SemiBold";
};

// Component
const LogoPreview = ({
  prompt,
  imageKey,
  size = "small",
}: {
  prompt: string;
  imageKey: string;
  size?: "small" | "large";
}) => {
  const styleName = styleMap[imageKey] || "No Style";
  const { component: Component, color } = styleConfigs[styleName];

  const brandName = extractBrandName(prompt);
  const fontFamily = getFontFromPrompt(prompt);

  return (
    <Component
      brandName={brandName}
      fontFamily={fontFamily}
      color={color}
      size={size}
    />
  );
};

export default LogoPreview;
