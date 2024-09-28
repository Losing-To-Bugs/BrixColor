// OnboardingScreen.tsx
import { StyleSheet, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { NavigationProp } from '@react-navigation/native';
import {useRouter} from "expo-router";

const OnboardingScreen = () => {

  const router = useRouter();

  const onDone = () => {
    //set hasOnboarded to true. Save to async
    router.dismiss(); 
  };

  return (
    <Onboarding
      onDone={onDone}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Text style={styles.image}>👋</Text>,
          title: 'Welcome!',
          subtitle: 'This is the first page of the onboarding.',
        },
        {
          backgroundColor: '#999',
          image: <Text style={styles.image}>🎉</Text>,
          title: 'Enjoy!',
          subtitle: 'Let’s get started with your journey!',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    fontSize: 50,
    textAlign: 'center',
  },
});

export default OnboardingScreen;
