import { Button, StyleSheet, Text, Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SettingsProvider, useSettings } from "@/components/SettingsContext";

const OnboardingScreen = () => {
  const router = useRouter();

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("isOnboarded", "true");
  };

  const onDone = () => {
    completeOnboarding();
    router.dismiss();
  };

  //This convoluted button is for testing purposes.
  const Next = ({ pageIndex, ...props }) => {
    const currentPageIndex = pageIndex !== undefined ? pageIndex : 0;
    return (
      <Button
        title={"Next"}
        {...props}
        testID={`next-button-${currentPageIndex}`}
      />
    );
  };
  const { theme, themes, fontSizes, fontSize } = useSettings();
  //const Next = ({ ...props }) => <Button title={"Next"} {...props} />; simple button
  const Done = ({ ...props }) => (
    <Button title={"Done"} {...props} testID="done-button" />
  );
  return (
    <Onboarding
      onDone={onDone}
      onSkip={onDone} //should just close the onBoarding
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      pages={[
        {
          backgroundColor: themes[theme].backgroundColor,
          image: (
            <Image
              source={require("../../assets/images/TutorialPage2.png")}
              style={styles.image}
            />
          ),
          title: (
            <Text
              style={{
                color: themes[theme].textColor,
                fontSize: fontSizes[fontSize].fontSize,
                textAlign: "center",
                margin: 15,
              }}
            >
              Welcome to BrixColor!
            </Text>
          ),
          subtitle: "", //need subtitles to get rid of errors.
        },
        {
          backgroundColor: themes[theme].backgroundColor,
          image: (
            <Image
              source={require("../../assets/images/TutorialPage2.png")}
              style={styles.image}
            />
          ),
          title: (
            <Text
              style={{
                color: themes[theme].textColor,
                fontSize: fontSizes[fontSize].fontSize,
                textAlign: "center",
                margin: 15,
              }}
            >
              Place LEGO brick in the highlighted area.
            </Text>
          ),
          subtitle: "",
        },
        {
          backgroundColor: themes[theme].backgroundColor,
          image: (
            <Image
              source={require("../../assets/images/TutorialPage3.gif")}
              style={styles.image2}
            />
          ),
          title: (
            <Text
              style={{
                color: themes[theme].textColor,
                fontSize: fontSizes[fontSize].fontSize,
                textAlign: "center",
                margin: 15,
              }}
            >
              Once in view, tap the capture button!{" "}
            </Text>
          ),
          subtitle: "",
        },
        {
          backgroundColor: themes[theme].backgroundColor,
          image: (
            <Image
              source={require("../../assets/images/GreenCheck.png")}
              style={styles.image2}
            />
          ),
          title: (
            <Text
              style={{
                color: themes[theme].textColor,
                fontSize: fontSizes[fontSize].fontSize,
                textAlign: "center",
                margin: 15,
              }}
            >
              Thanks for using BrixColor!
            </Text>
          ),
          subtitle: "",
        },
      ]}
      imageContainerStyles={styles.imageContainer}
      bottomBarHeight={50}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    textAlign: "center",
  },
  imageContainer: {
    paddingBottom: 0,
    width: "100%",
    height: "70%",
    margin: 5,
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  image2: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
});

export default () => {
  return (
    <SettingsProvider>
      <OnboardingScreen />
    </SettingsProvider>
  );
};
