import { Button, StyleSheet, Text } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnboardingScreen = () => {
  const router = useRouter();

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("isOnboarded", "true");
  };

  const onDone = () => {
    completeOnboarding();
    router.dismiss();
  };


  const Next = ({ ...props }) => <Button title={"Next"} {...props} />;
  const Done = ({ ...props }) => <Button title={"Done"} {...props} />;
  return (
    <Onboarding
      onDone={onDone}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      pages={[
        {
          backgroundColor: "#fff",
          image: <Text style={styles.image}>👋</Text>,
          title: "Welcome TEST!",
          subtitle: "Page 1",
        },
        {
          backgroundColor: "#999",
          image: <Text style={styles.image}>🎉</Text>,
          title: "TEST!",
          subtitle: "Final page",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    fontSize: 50,
    textAlign: "center",
  },
});

export default OnboardingScreen;
