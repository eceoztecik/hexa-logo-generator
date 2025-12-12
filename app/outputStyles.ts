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
});

export default styles;
