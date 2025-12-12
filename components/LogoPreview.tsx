import { colors, withOpacity } from "@/constants/colors";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

// Responsive helpers
const { width } = Dimensions.get("window");
const wp = (percentage: number) => (width * percentage) / 100;

// Logo Components
const MonogramLogo = ({ brandName, fontFamily, color }: any) => (
  <View
    style={[
      styles.logoBox,
      {
        backgroundColor: color,
        borderRadius: wp(10),
        borderWidth: 1,
        borderColor: colors.border.dark,
      },
    ]}
  >
    <Text style={[styles.monogramText, { fontFamily }]}>
      {brandName[0].toUpperCase()}
    </Text>
  </View>
);

const Wave = ({ color, style }: any) => (
  <View
    style={[
      {
        width: wp(16),
        height: wp(2),
        backgroundColor: color,
        borderRadius: wp(3),
        marginVertical: wp(0.5),
      },
      style,
    ]}
  />
);

const AbstractLogo = ({ color }: any) => (
  <View style={styles.logoBox}>
    <Wave color={withOpacity(color, 0.7)} style={{}} />
    <Wave color={withOpacity(color, 0.85)} style={{}} />
    <Wave color={withOpacity(color, 1)} style={{}} />
  </View>
);

const MascotLogo = ({ brandName, color }: any) => (
  <View
    style={[
      styles.logoBox,
      {
        backgroundColor: color,
        borderRadius: wp(4),
        justifyContent: "center",
        alignItems: "center",
      },
    ]}
  >
    <Text style={styles.mascotText}>{brandName}</Text>
  </View>
);

const NoStyleLogo = ({ brandName, fontFamily }: any) => (
  <View style={styles.logoBox}>
    <Text
      style={[styles.noStyleText, { fontFamily }]}
      numberOfLines={2}
      ellipsizeMode="tail"
    >
      {brandName}
    </Text>
  </View>
);

// Style Mappings - EXPORT THESE
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

// Helper functions - EXPORT THESE
export const extractBrandName = (prompt: string): string => {
  const match = prompt.match(/(.+?) for/i);
  return match ? match[1].trim() : "Brand";
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
}: {
  prompt: string;
  imageKey: string;
}) => {
  const styleName = styleMap[imageKey] || "No Style";
  const { component: Component, color } = styleConfigs[styleName];

  const brandName = extractBrandName(prompt);
  const fontFamily = getFontFromPrompt(prompt);

  return (
    <Component brandName={brandName} fontFamily={fontFamily} color={color} />
  );
};

const styles = StyleSheet.create({
  logoBox: {
    width: wp(16),
    height: wp(16),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  monogramText: {
    fontSize: wp(9.6),
    color: "#fff",
    fontWeight: "900",
  },
  mascotText: {
    color: "#fff",
    fontSize: wp(4.3),
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: wp(1.6),
  },
  noStyleText: {
    fontSize: wp(4.3),
    color: "#222",
    textAlign: "center",
  },
});

export default LogoPreview;
