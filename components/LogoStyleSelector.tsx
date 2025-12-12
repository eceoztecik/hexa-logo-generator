import { colors } from "@/constants/colors";
import { hp, wp } from "@/constants/responsive";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { imageMap, logoStyles, styleToImageMap } from "../constants/logoConfig";

// Types
type Props = {
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
};

// Component
const LogoStyleSelector = ({ selectedStyle, setSelectedStyle }: Props) => {
  const renderStyleItem = ({
    item,
  }: {
    item: { id: string; label: string };
  }) => {
    const imageKey =
      (styleToImageMap as Record<string, string>)[item.id] || "image1";
    const isSelected = selectedStyle === item.id;

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={[styles.styleItem, isSelected && styles.selectedStyleItem]}
          onPress={() => setSelectedStyle(item.id)}
        >
          <Image
            source={(imageMap as Record<string, any>)[imageKey]}
            style={styles.styleIcon}
          />
        </TouchableOpacity>
        <Text
          style={[styles.styleLabel, isSelected && styles.selectedStyleLabel]}
        >
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <>
      <Text style={[styles.sectionLabel, styles.logoStyleLabel]}>
        Logo Styles
      </Text>
      <FlatList
        horizontal
        data={logoStyles}
        renderItem={renderStyleItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.styleList}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  // Item Container
  itemContainer: {
    alignItems: "center",
    marginRight: wp(3),
  },
  // Style Item Container
  styleItem: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(3),
    borderWidth: 2,
    borderColor: "transparent",
    backgroundColor: "transparent",
  },
  // Selected Style Item
  selectedStyleItem: {
    borderColor: colors.border.default,
  },
  // Style Icon
  styleIcon: {
    width: wp(20),
    height: wp(20),
    resizeMode: "contain",
  },
  // Label Styles
  styleLabel: {
    marginTop: hp(0.6),
    fontSize: wp(3.5),
    lineHeight: wp(4.8),
    fontFamily: "Manrope-Regular",
    color: colors.text.secondary,
    textAlign: "center",
  },
  selectedStyleLabel: {
    color: colors.text.primary,
    fontFamily: "Manrope-Bold",
  },
  // Section Header
  sectionLabel: {
    fontSize: wp(5.3),
    lineHeight: wp(6.7),
    color: colors.text.primary,
    fontFamily: "Manrope-ExtraBold",
  },
  logoStyleLabel: {
    marginTop: hp(2.5),
  },
  // List Container
  styleList: {
    marginVertical: hp(1.5),
  },
});

export default LogoStyleSelector;
