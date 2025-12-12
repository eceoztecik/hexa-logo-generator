import Header from "@/components/Header";
import LogoDisplay from "@/components/LogoDisplay";
import PromptBox from "@/components/PromptBox";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, ImageBackground } from "react-native";
import {
  extractBrandName,
  getFontFromPrompt,
  styleConfigs,
  styleMap,
} from "../components/LogoPreview";
import styles from "./outputStyles";

const OutputScreen = () => {
  // Get route params
  const { prompt, imageKey } = useLocalSearchParams<{
    prompt: string;
    imageKey: string;
  }>();

  // Extract logo details from prompt
  const styleName = styleMap[imageKey || "image1"] || "No Style";
  const brandName = extractBrandName(prompt || "");
  const fontFamily = getFontFromPrompt(prompt || "");

  // Get logo component and color
  const StyleComponent = styleConfigs[styleName].component;
  const color = styleConfigs[styleName].color;

  // Handlers
  const handleCopyPrompt = () => {
    Clipboard.setStringAsync(prompt || "");
    Alert.alert("Copied!", "Prompt has been copied to clipboard.");
  };

  // Render
  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Header */}
      <Header title="Your Design" />

      {/* Logo Display */}
      <LogoDisplay
        StyleComponent={StyleComponent}
        brandName={brandName}
        fontFamily={fontFamily}
        color={color}
        styleName={styleName}
      />

      {/* Prompt Box */}
      <PromptBox
        prompt={prompt || ""}
        styleName={styleName}
        onCopy={handleCopyPrompt}
      />
    </ImageBackground>
  );
};

export default OutputScreen;
