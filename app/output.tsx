import Header from "@/components/Header";
import PromptBox from "@/components/PromptBox";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, ImageBackground, Text, View } from "react-native";
import LogoPreview, {
  extractBrandName,
  getFontFromPrompt,
  styleMap,
} from "../components/LogoPreview";
import styles from "./outputStyles";
import { isValidImageKey } from "@/types/logo.types";

const OutputScreen = () => {
  // Get navigation params (prompt and imageKey from Input screen)
  const { prompt, imageKey } = useLocalSearchParams<{
    prompt: string;
    imageKey: string;
  }>();

  // Extract logo details from prompt
  const validImageKey = isValidImageKey(imageKey) ? imageKey : "image1";
  const styleName = styleMap[validImageKey];
  const safePrompt = typeof prompt === "string" ? prompt : "";

  const brandName = extractBrandName(safePrompt);
  const fontFamily = getFontFromPrompt(safePrompt);

  // Copy prompt to clipboard
  const handleCopyPrompt = () => {
    Clipboard.setStringAsync(prompt || "");
    Alert.alert("Copied!", "Prompt has been copied to clipboard.");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Header with back button */}
      <Header title="Your Design" />

      {/* Logo display card (white background) */}
      <View style={styles.logoCard}>
        <LogoPreview
          prompt={prompt || ""}
          imageKey={validImageKey}
          size="large"
        />
        {/* Show brand name below logo */}
        {styleName !== "No Style" && (
          <Text style={[styles.logoText, { fontFamily }]}>{brandName}</Text>
        )}
      </View>

      {/* Prompt box with copy functionality */}
      <PromptBox
        prompt={prompt || ""}
        styleName={styleName}
        onCopy={handleCopyPrompt}
      />
    </ImageBackground>
  );
};

export default OutputScreen;
