import { colors } from "@/constants/colors";
import { hp, wp } from "@/constants/responsive";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Types
type PromptBoxProps = {
  prompt: string;
  styleName: string;
  onCopy: () => void;
};

// Component
const PromptBox = ({ prompt, styleName, onCopy }: PromptBoxProps) => {
  return (
    <View style={styles.promptBox}>
      <View style={styles.promptHeader}>
        <Text style={styles.promptLabel}>Prompt</Text>
        <TouchableOpacity onPress={onCopy} style={styles.copyButton}>
          <Feather name="copy" size={wp(3.5)} color={colors.neutral.gray400} />
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.promptText}>{prompt}</Text>

      <View style={styles.styleTag}>
        <Text style={styles.styleTagText}>{styleName}</Text>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  promptBox: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: wp(3),
    padding: wp(4),
    width: "100%",
    marginBottom: hp(3),
  },

  promptHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(0.75),
  },
  promptLabel: {
    color: colors.text.primary,
    fontSize: wp(3.75),
    fontFamily: "Manrope-Bold",
    lineHeight: wp(5),
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(1),
  },
  copyText: {
    color: colors.neutral.gray400,
    fontSize: wp(2.75),
    lineHeight: wp(3.25),
    fontFamily: "Manrope-Regular",
  },
  promptText: {
    color: colors.text.primary,
    fontSize: wp(4),
    lineHeight: wp(5),
    marginBottom: hp(1.5),
    fontFamily: "Manrope-Regular",
  },
  styleTag: {
    alignSelf: "flex-start",
    backgroundColor: "#FAFAFA1A",
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.5),
    borderRadius: wp(25),
  },
  styleTagText: {
    color: "#FAFAFA",
    fontSize: wp(3),
    fontFamily: "Manrope-Regular",
    lineHeight: wp(4),
  },
});

export default PromptBox;
