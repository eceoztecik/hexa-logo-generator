import { colors, withOpacity } from "@/constants/colors";
import { wp } from "@/constants/responsive";
import { ImageKey, LogoSize, StyleName } from "@/types/logo.types";
import React from "react";
import { Text, View, ViewStyle } from "react-native";

// Types

type BaseLogoProps = {
  size: LogoSize;
};

type ColorProp = {
  color: string;
};

type BrandProp = {
  brandName: string;
};

type FontProp = {
  fontFamily?: string;
};

type MonogramProps = BaseLogoProps & BrandProp & FontProp & ColorProp;
type AbstractProps = BaseLogoProps & ColorProp;
type MascotProps = BaseLogoProps & BrandProp & ColorProp;
type NoStyleProps = BaseLogoProps & BrandProp & FontProp;

type StylePropsMap = {
  Monogram: MonogramProps;
  Abstract: AbstractProps;
  Mascot: MascotProps;
  "No Style": NoStyleProps;
};

type StyleConfig<K extends StyleName> = {
  component: React.ComponentType<StylePropsMap[K]>;
  color: string;
};

// Logo Components

const MonogramLogo = ({
  brandName,
  fontFamily,
  color,
  size,
}: MonogramProps) => {
  const isLarge = size === "large";

  return (
    <View
      style={{
        width: wp(isLarge ? 50 : 16),
        height: wp(isLarge ? 50 : 16),
        backgroundColor: color,
        borderRadius: wp(isLarge ? 8 : 10),
        borderWidth: isLarge ? 2 : 1,
        borderColor: colors.border.dark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: wp(isLarge ? 28 : 9.6),
          color: "#fff",
          fontWeight: "900",
          fontFamily,
        }}
      >
        {brandName.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
};

const Wave = ({
  color,
  size,
  style,
}: {
  color: string;
  size: LogoSize;
  style?: ViewStyle;
}) => {
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

const AbstractLogo = ({ color, size }: AbstractProps) => (
  <View>
    <Wave color={withOpacity(color, 0.7)} size={size} />
    <Wave color={withOpacity(color, 0.85)} size={size} />
    <Wave color={withOpacity(color, 1)} size={size} />
  </View>
);

const MascotLogo = ({ brandName, color, size }: MascotProps) => {
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

const NoStyleLogo = ({ brandName, fontFamily, size }: NoStyleProps) => {
  const isLarge = size === "large";

  return (
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
  );
};

// Style Mappings

export const styleMap: Record<ImageKey, StyleName> = {
  image1: "Monogram",
  image2: "Abstract",
  image3: "Mascot",
  image4: "No Style",
};

export const styleConfigs: {
  [K in StyleName]: StyleConfig<K>;
} = {
  Monogram: {
    component: MonogramLogo,
    color: colors.logoStyles.monogram,
  },
  Abstract: {
    component: AbstractLogo,
    color: colors.logoStyles.abstract,
  },
  Mascot: {
    component: MascotLogo,
    color: colors.logoStyles.mascot,
  },
  "No Style": {
    component: NoStyleLogo,
    color: colors.logoStyles.noStyle,
  },
};

// Helper functions
export const extractBrandName = (prompt: string): string => {
  // 1. In-quotation mark pattern (highest priority)
  let match = prompt.match(/["'](.+?)["']/);
  if (match) return match[1].trim();
  // 2. "for X" pattern
  match = prompt.match(
    /\bfor\s+([A-Z][\w\s&.'-]+?)(?:\s+(?:with|in|using|and)\b|$)/i,
  );
  if (match) {
    // Remove words like "logo" and "design" at the end.
    return match[1].replace(/\s+(logo|design|brand|company)$/i, "").trim();
  }
  // 3. "X logo" pattern - take the 1-3 words that come IMMEDIATELY BEFORE "logo"
  // Skip adjectives like "minimalist logo" and "modern logo".
  match = prompt.match(/\b([A-Z][\w\s&.'-]+?)\s+logo\b/i);
  if (match) return match[1].trim();

  return prompt.split(/\s+/)[0] || "Brand";
};

export const getFontFromPrompt = (prompt: string): string => {
  const lower = prompt.toLowerCase();
  if (lower.includes("serif")) return "Manrope-ExtraBold";
  if (lower.includes("bold")) return "Manrope-Bold";
  if (lower.includes("minimal")) return "Manrope-Regular";
  return "Manrope-SemiBold";
};

// Render Helper

const renderLogoByStyle = ({
  styleName,
  size,
  brandName,
  fontFamily,
}: {
  styleName: StyleName;
  size: LogoSize;
  brandName: string;
  fontFamily: string;
}) => {
  switch (styleName) {
    case "Monogram": {
      const { component: Component, color } = styleConfigs.Monogram;
      return (
        <Component
          size={size}
          brandName={brandName}
          fontFamily={fontFamily}
          color={color}
        />
      );
    }

    case "Abstract": {
      const { component: Component, color } = styleConfigs.Abstract;
      return <Component size={size} color={color} />;
    }

    case "Mascot": {
      const { component: Component, color } = styleConfigs.Mascot;
      return <Component size={size} brandName={brandName} color={color} />;
    }

    case "No Style": {
      const { component: Component } = styleConfigs["No Style"];
      return (
        <Component size={size} brandName={brandName} fontFamily={fontFamily} />
      );
    }
    default: {
      const _exhaustiveCheck: never = styleName;
      return _exhaustiveCheck;
    }
  }
};

// Main Component

type LogoPreviewProps = {
  prompt: string;
  imageKey: ImageKey;
  size?: LogoSize;
};

const LogoPreview = ({
  prompt,
  imageKey,
  size = "small",
}: LogoPreviewProps) => {
  const styleName = styleMap[imageKey];

  const brandName = extractBrandName(prompt);
  const fontFamily = getFontFromPrompt(prompt);

  return renderLogoByStyle({
    styleName,
    size,
    brandName,
    fontFamily,
  });
};

export default LogoPreview;
