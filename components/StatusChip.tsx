import { colors } from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styleToImageMap } from "../constants/theme";
import LogoPreview from "./LogoPreview";

// Responsive helpers
const { width, height } = Dimensions.get("window");
const wp = (percentage: number) => (width * percentage) / 100;
const hp = (percentage: number) => (height * percentage) / 100;

// Types

type StatusChipProps = {
  status: "idle" | "processing" | "done" | "failed";
  prompt: string;
  selectedStyle: string;
  onRetry: () => void;
  onNavigate: () => void;
};

// Component

const StatusChip = ({
  status,
  prompt,
  selectedStyle,
  onRetry,
  onNavigate,
}: StatusChipProps) => {
  const imageKey =
    (styleToImageMap as Record<string, string>)[selectedStyle] || "image1";

  // Processing State
  if (status === "processing") {
    return (
      <View style={[styles.statusBox, styles.statusProcessing]}>
        <ActivityIndicator
          size="small"
          color="#fff"
          style={{ marginRight: wp(3) }}
        />
        <View>
          <Text style={styles.statusText}>Creating Your Design...</Text>
          <Text style={styles.statusSub}>Ready in 2 minutes</Text>
        </View>
      </View>
    );
  }

  // Done State
  if (status === "done") {
    return (
      <TouchableOpacity onPress={onNavigate} style={styles.gradientWrapper}>
        <LinearGradient
          colors={[colors.primary.blue, colors.primary.purple]}
          locations={[0, 0.7]}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.gradientInner}
        >
          <View style={styles.previewBox}>
            <LogoPreview prompt={prompt} imageKey={imageKey} />
          </View>
          <View style={styles.gradientTextContainer}>
            <Text style={styles.statusText}>✨ Your Design is Ready!</Text>
            <Text style={[styles.statusSub, { color: colors.neutral.gray300 }]}>
              Tap to see it.
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Failed State
  if (status === "failed") {
    return (
      <TouchableOpacity onPress={onRetry} style={styles.errorWrapper}>
        <View style={styles.errorIconBox}>
          <Text style={{ fontSize: wp(8) }}>❗</Text>
        </View>
        <View style={styles.errorTextBox}>
          <Text style={styles.statusText}>Oops, something went wrong!</Text>
          <Text style={[styles.statusSub, { color: colors.neutral.gray300 }]}>
            Click to try again
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return null;
};

// Styles

const styles = StyleSheet.create({
  // Base Styles
  statusBox: {
    padding: wp(4),
    borderRadius: wp(4),
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: wp(4),
    fontWeight: "600",
    color: colors.text.primary,
  },
  statusSub: {
    fontSize: wp(3.25),
    color: colors.text.secondary,
    marginTop: hp(0.5),
  },

  // Processing Styles
  statusProcessing: {
    backgroundColor: colors.background.dark,
  },

  // Done/Success Styles
  gradientWrapper: {
    borderRadius: wp(4),
    overflow: "hidden",
  },
  gradientInner: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: wp(4),
  },
  previewBox: {
    width: wp(17.5),
    height: wp(17.5),
    backgroundColor: colors.background.light,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: wp(4),
    borderBottomLeftRadius: wp(4),
  },
  gradientTextContainer: {
    padding: wp(4),
    flex: 1,
  },

  // Error/Failed Styles
  errorWrapper: {
    borderRadius: wp(4),
    flexDirection: "row",
    overflow: "hidden",
  },
  errorIconBox: {
    width: wp(17.5),
    height: wp(17.5),
    backgroundColor: colors.status.error.light,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: wp(4),
    borderBottomLeftRadius: wp(4),
  },
  errorTextBox: {
    backgroundColor: colors.status.error.main,
    flex: 1,
    padding: wp(4),
    borderTopRightRadius: wp(4),
    borderBottomRightRadius: wp(4),
  },
});

export default StatusChip;
