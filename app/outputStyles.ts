import { Dimensions, StyleSheet } from "react-native";

// Responsive helpers
const { width, height } = Dimensions.get("window");
const wp = (percentage: number) => (width * percentage) / 100;
const hp = (percentage: number) => (height * percentage) / 100;

// Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: hp(7.5),
    paddingHorizontal: wp(6),
  },
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
  logoText: {
    fontSize: wp(7),
    color: "#222",
    textAlign: "center",
    marginTop: hp(1.5),
  },
});

export default styles;
