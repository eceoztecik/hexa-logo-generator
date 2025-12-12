import { colors } from "@/constants/colors";
import { hp, wp } from "@/constants/responsive";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.closeButton}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(2.5),
  },
  title: {
    fontSize: wp(5.5),
    lineHeight: wp(7),
    fontFamily: "Manrope-ExtraBold",
    color: colors.text.primary,
  },
  closeButton: {
    fontSize: 22,
    color: colors.text.primary,
  },
});
