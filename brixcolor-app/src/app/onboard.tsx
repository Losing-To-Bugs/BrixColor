import React, { useState } from "react";
import {View, Text, Image, Button, StyleSheet, ScrollView, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { SettingsProvider, useSettings } from "@/components/SettingsContext";
import { PanGestureHandler, GestureHandlerRootView,} from "react-native-gesture-handler";
import {StatusBar} from "expo-status-bar";

const onboardingData = [
  {
    image: require("../../assets/images/TutorialPage1.png"),
    imageLabel: "the scanning page.",
    imageHint: "what each button on the scanning page does.",
    title: "Welcome to BrixColor!",
    description: "Get started with BrixColor.",
  },
  {
    image: require("../../assets/images/TutorialPage2.png"),
    imageLabel: "how to position the LEGO brick.",
    imageHint: "where place the LEGO brick.",
    title: "Position the LEGO Brick",
    description: "Place LEGO brick in the highlighted area.",
  },
  {
    image: require("../../assets/images/TutorialPage3.gif"),
    imageLabel: "identifying a LEGO brick",
    imageHint: "how to identify the LEGO brick",
    title: "Tap the Capture Button!",
    description: "Once in view, tap the capture button.",
  },
  {
    image: require("../../assets/images/GreenCheck.png"),
    imageLabel: "a green checkmark",
    imageHint: "the completion of the onboarding.",
    title: "Thanks for using BrixColor!",
    description: "We hope you find this helpful.",
  },
];
const DotIndicator = ({ currentIndex }) => {
  return (
    <View style={styles.dotContainer}>
      {onboardingData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: currentIndex === index ? "blue" : "gray" },
          ]}
        />
      ))}
    </View>
  );
};

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwipeProcessed, setIsSwipeProcessed] = useState(false);
  const router = useRouter();
  const { theme, themes, fontSizes, fontSize } = useSettings();

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("isOnboarded", "true");
  };

  const onNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const onPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const onSwipeGesture = ({ nativeEvent }) => {
    if (isSwipeProcessed) return;
    const { translationX } = nativeEvent;
    if (nativeEvent.translationX < -50) {
      onNext();
      setIsSwipeProcessed(true);
    } else if (nativeEvent.translationX > 50) {
      onPrev();
      setIsSwipeProcessed(true);
    }
  };
  const onSwipeEnd = () => {
    setIsSwipeProcessed(false);
  };
  const onSkip = () => {
    completeOnboarding();
    router.dismiss();
  };

  const onDone = () => {
    completeOnboarding();
    router.dismiss();
  };

  return (
    
    <PanGestureHandler onGestureEvent={onSwipeGesture} onEnded={onSwipeEnd}>
      <View style={{ flex: 1, backgroundColor: themes[theme].backgroundColor }}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          pagingEnabled
          scrollEnabled={false}
        >
          <Image
            source={onboardingData[currentIndex].image}
            style={styles.image}
            accessible={true}
            accessibilityLabel={`Image of ${onboardingData[currentIndex].imageLabel}`}
            accessibilityHint={`This image shows ${onboardingData[currentIndex].imageHint}`}
          />
          <Text
            style={[
              styles.title,
              {
                color: themes[theme].textColor,
                fontSize: fontSizes[fontSize].fontSize,
              },
            ]}
          >
            {onboardingData[currentIndex].title}
          </Text>
          <Text
            style={[
              styles.description,
              {
                color: themes[theme].textColor,
                fontSize: fontSizes[fontSize].fontSize - 4,
              },
            ]}
          >
            {onboardingData[currentIndex].description}
          </Text>
        </ScrollView>

        <View style={styles.buttonContainer}>
          {currentIndex < onboardingData.length - 1 ? (
            <Button title="Skip" onPress={onSkip} />
          ) : (
            <Pressable
              accessible={false} // Fixes look and hides from voiceOver
            >
              <Text style={{ opacity: 0 }}>Skip 123</Text>
            </Pressable>
          )}

          <DotIndicator currentIndex={currentIndex} />

          {currentIndex < onboardingData.length - 1 ? (
            <Button title="Next" onPress={onNext} />
          ) : (
            <Button title="Done" onPress={onDone} />
          )}
        </View>
        <StatusBar style="light" />
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    height: "90%",
    resizeMode: "contain",
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 10,
    flex: 0.1,
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "gray",
    marginHorizontal: 5,
  },
  invisibleButton: {
    width: 100,
    height: 40,
    backgroundColor: "transparent",
  },
});

export default () => {
  return (
    <SettingsProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <OnboardingScreen />
      </GestureHandlerRootView>
    </SettingsProvider>
  );
};
