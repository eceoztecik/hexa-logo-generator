import { colors } from "@/constants/colors";
import { hp, wp } from "@/constants/responsive";
import { StyleSheet } from "react-native";

// Styles
const styles = StyleSheet.create({
  // Background
  background: {
    flex: 1,
  },
  // Container
  container: {
    padding: wp(6),
    flex: 1,
    justifyContent: "flex-start",
  },
  // Header
  header: {
    textAlign: "center",
    fontSize: wp(4.5),
    fontFamily: "Manrope-ExtraBold",
    lineHeight: wp(6),
    color: colors.text.primary,
    marginTop: hp(6),
  },
  // Prompt label row
  promptLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(1),
  },
  // Section label
  sectionLabel: {
    fontSize: wp(5.3),
    lineHeight: wp(6.7),
    color: colors.text.primary,
    fontFamily: "Manrope-ExtraBold",
  },
  // Surprise me text
  surprise: {
    fontSize: wp(3.5),
    fontFamily: "Monrope-Regular",
    color: colors.text.primary,
    lineHeight: wp(4.8),
  },
  // Prompt input wrapper
  promptInputWrapper: {
    position: "relative",
  },
  // Prompt input
  promptInput: {
    borderRadius: wp(4),
    backgroundColor: colors.background.dark,
    color: colors.text.primary,
    padding: wp(4),
    height: hp(20),
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: colors.border.transparent,
  },
  // Prompt input focused
  promptInputFocused: {
    borderColor: colors.border.default,
  },
  // Character count overlay
  charCountOverlay: {
    position: "absolute",
    bottom: hp(1),
    left: wp(3),
    fontSize: wp(3.2),
    color: colors.text.secondary,
    fontFamily: "Manrope-Regular",
  },
  // Status banner wrapper
  statusBannerWrapper: {
    marginTop: hp(3),
    marginBottom: hp(3),
  },
  // Button container
  buttonContainer: {
    marginTop: "auto",
  },
  // Button
  button: {
    borderRadius: wp(6),
    paddingVertical: hp(2),
    alignItems: "center",
  },
  // Button content
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  // Button text
  buttonText: {
    color: colors.text.btnText,
    fontWeight: "600",
    fontSize: wp(4.3),
  },
});

export default styles;
