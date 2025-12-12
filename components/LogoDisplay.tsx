import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

// Responsive helpers
const { width, height } = Dimensions.get("window");
const wp = (percentage: number) => (width * percentage) / 100;
const hp = (percentage: number) => (height * percentage) / 100;

// Types
type LogoDisplayProps = {
  StyleComponent: React.FC<any>;
  brandName: string;
  fontFamily: string;
  color: string;
  styleName: string;
};

// Component
const LogoDisplay: React.FC<LogoDisplayProps> = ({
  StyleComponent,
  brandName,
  fontFamily,
  color,
  styleName,
}) => (
  <View style={styles.logoCard}>
    <StyleComponent
      brandName={brandName}
      fontFamily={fontFamily}
      color={color}
    />
    {styleName !== "No Style" && (
      <Text
        style={[
          styles.logoText,
          { fontFamily, marginTop: hp(1.5), color: "#222" },
        ]}
      >
        {brandName}
      </Text>
    )}
  </View>
);

// Styles
const styles = StyleSheet.create({
  logoCard: {
    width: wp(88),
    height: wp(88),
    backgroundColor: "#fff",
    borderRadius: wp(4),
    padding: wp(5),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp(3),
  },
  logoShape: {
    width: wp(30),
    height: wp(30),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(3),
  },
  logoText: {
    fontSize: wp(7),
    color: "#222",
    textAlign: "center",
  },
  logoShapeText: {
    fontSize: wp(18),
    color: "#fff",
    textAlign: "center",
  },
});

export default LogoDisplay;
