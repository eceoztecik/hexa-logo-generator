import { colors } from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LogoStyleSelector from "../components/LogoStyleSelector";
import StatusChip from "../components/StatusChip";
import Stars from "../components/svg/Stars";
import { styleToImageMap, surprisePrompts } from "../constants/logoConfig";
import { db } from "../firebase/firebaseConfig";
import styles from "./indexStyles";

const InputScreen = () => {
  // Router
  const router = useRouter();

  // State
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("none");
  const [surpriseMe, setSurpriseMe] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "processing" | "done" | "failed"
  >("idle");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string>("");

  // Real-time Job Status Listener
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (currentJobId) {
      unsubscribe = onSnapshot(doc(db, "jobs", currentJobId), (docSnapshot) => {
        const data = docSnapshot.data();

        if (data?.status === "done") {
          setStatus("done");
          setResultUrl(data.resultUrl || "");
        } else if (data?.status === "failed") {
          setStatus("failed");
        }
      });
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [currentJobId]);

  // Handlers
  const handleSurpriseMe = () => {
    setSurpriseMe(true);
    const randomItem =
      surprisePrompts[Math.floor(Math.random() * surprisePrompts.length)];
    setPrompt(randomItem.prompt);
    setSelectedStyle(randomItem.style);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setStatus("processing");

    try {
      const docRef = await addDoc(collection(db, "jobs"), {
        prompt: prompt.trim(),
        logoStyle: selectedStyle,
        surpriseMe: surpriseMe,
        status: "processing",
        createdAt: serverTimestamp(),
      });

      setCurrentJobId(docRef.id);
    } catch (error) {
      console.error("Error creating job:", error);
      setStatus("failed");
    }
  };

  const handleNavigateToOutput = () => {
    if (currentJobId && resultUrl) {
      const imageKey =
        (styleToImageMap as Record<string, string>)[selectedStyle] || "image1";

      router.push({
        pathname: "/output",
        params: {
          jobId: currentJobId,
          prompt: prompt,
          imageKey: imageKey,
          resultUrl: resultUrl,
        },
      });
    }
  };

  const handleRetry = () => {
    setStatus("idle");
    setCurrentJobId(null);
    setResultUrl("");
  };

  // Render
  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.header}>AI Logo</Text>

        {/* Status Chip */}
        <View style={styles.statusBannerWrapper}>
          <StatusChip
            status={status}
            prompt={prompt}
            selectedStyle={selectedStyle}
            onRetry={handleRetry}
            onNavigate={handleNavigateToOutput}
          />
        </View>

        {/* Prompt Section */}
        <View style={styles.promptLabelRow}>
          <Text style={styles.sectionLabel}>Enter Your Prompt</Text>
          <TouchableOpacity onPress={handleSurpriseMe}>
            <Text style={styles.surprise}>🎲 Surprise me</Text>
          </TouchableOpacity>
        </View>

        {/* Text Input */}
        <View style={styles.promptInputWrapper}>
          <TextInput
            style={[
              styles.promptInput,
              isInputFocused && styles.promptInputFocused,
            ]}
            placeholder="A blue lion logo reading 'HEXA' in bold letters"
            placeholderTextColor={colors.text.secondary}
            multiline
            maxLength={500}
            value={prompt}
            onChangeText={setPrompt}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            editable={status !== "processing"}
          />
          <Text style={styles.charCountOverlay}>{prompt.length}/500</Text>
        </View>

        {/* Logo Style Selector */}
        <LogoStyleSelector
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
        />

        {/* Create Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleGenerate}
            disabled={status === "processing" || !prompt.trim()}
          >
            <LinearGradient
              colors={[colors.primary.blue, colors.primary.purple]}
              locations={[0, 0.7]}
              start={[0, 0]}
              end={[1, 1]}
              style={[
                styles.button,
                styles.buttonContent,
                {
                  opacity: status === "processing" || !prompt.trim() ? 0.5 : 1,
                },
              ]}
            >
              <Text style={[styles.buttonText, { marginRight: 4 }]}>
                Create
              </Text>
              <Stars />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default InputScreen;
