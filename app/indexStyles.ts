import { Dimensions, StyleSheet } from "react-native";
const windowWidth = Dimensions.get("window").width;
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "flex-start",
  },
  header: {
    textAlign: "center",
    fontSize: 17,
    fontFamily: "Manrope-ExtraBold",
    lineHeight: 22,
    color: "#FAFAFA",
    marginTop: height * 0.06,
  },
  promptLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  promptInputWrapper: {
    position: "relative",
  },

  surprise: {
    fontSize: 13,
    fontFamily: "Monrope-Regular",
    color: "#FAFAFA",
    lineHeight: 18,
  },
  promptInput: {
    borderRadius: 16,
    backgroundColor: "#27272A",
    color: "#fff",
    padding: 16,
    height: 175,
    textAlignVertical: "top",
  },
  charCount: {
    color: "#71717A",
    fontSize: 12,
    lineHeight: 14,
    fontFamily: "Manrope-Regular",
  },
  buttonContainer: {
    marginTop: "auto",
  },
  button: {
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  charCountOverlay: {
    position: "absolute",
    bottom: 8,
    left: 12,
    fontSize: 12,
    color: "#999",
    fontFamily: "Manrope-Regular",
  },
  sectionLabel: {
    fontSize: 20,
    lineHeight: 25,
    color: "#FAFAFA",
    fontFamily: "Manrope-ExtraBold",
  },

  statusBannerWrapper: {
    marginTop: 24,
    marginBottom: 24,
  },
});

export default styles;
