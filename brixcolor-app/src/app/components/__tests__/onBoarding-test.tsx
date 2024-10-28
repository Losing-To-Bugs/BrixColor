import { render, fireEvent, waitFor } from "@testing-library/react-native";
import OnboardingScreen from "@/app/onboard"; // Adjust the path as necessary
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useSettings } from "@/components/SettingsContext";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));


jest.mock("react-native-gesture-handler", () => {
  const ActualGestureHandler = jest.requireActual("react-native-gesture-handler");
  return {
    ...ActualGestureHandler,
    GestureHandlerRootView: ({ children }) => <>{children}</>,
    PanGestureHandler: ({ children }) => <>{children}</>,
    // Mock any other components you use if necessary
  };
});

jest.mock("@/components/SettingsContext", () => ({
  useSettings: jest.fn(),
  SettingsProvider: ({ children }) => <>{children}</>,
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock("react-native-onboarding-swiper", () => {
  const { View, Text, Button } = require("react-native");
  return jest.fn().mockImplementation(({ NextButtonComponent, pages, onDone }) => {
    return (
      <>
        {pages.map((page, index) => (
          <View key={index}>
            <Text>{page.title}</Text>
            <NextButtonComponent pageIndex={index} />
          </View>
        ))}
        <Button title="Done" onPress={onDone} testID="done-button" />
      </>
    );
  });
});

describe("OnboardingScreen", () => {
  const mockDismiss = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ dismiss: mockDismiss });
    (useSettings as jest.Mock).mockReturnValue({
      theme: "Light",
      fontSize: "Medium",
      themes: {
        Light: {
          switchOffColor: "#E0E0E0",
          primaryColor: "#0055BF",
          textColor: "#000",
          backgroundColor: "#FFF",
          backgroundColor2: "#F0F0F0",
        },
      },
      fontSizes: {
        Small: { fontSize: 14 },
        Medium: { fontSize: 16 },
        Big: { fontSize: 18 },
        Huge: { fontSize: 20 },
      },
    });
    jest.clearAllMocks();
  });

  it("renders UI - Tutorial page", async () => {
    const { getByText, findByText } = render(<OnboardingScreen />);
 
    // Check if the first page renders correctly
    const welcomeText = await findByText("Welcome to BrixColor!");
    expect(welcomeText).toBeTruthy();

    fireEvent.press(getByText("Next"));
    const page2Text = await findByText("Position the LEGO Brick");
    expect(page2Text).toBeTruthy();

    fireEvent.press(getByText("Next"));

    // Check the third page
    const page3Text = await findByText("Tap the Capture Button!");
    expect(page3Text).toBeTruthy();
    fireEvent.press(getByText("Next"));

    // Check the third page
    const page4Text = await findByText("Thanks for using BrixColor!");
    expect(page4Text).toBeTruthy();
  });


  it("uses Next button", async () => {
    const { getByText, findByText } = render(<OnboardingScreen />);

    // Press Next button
    fireEvent.press(getByText("Next"));

    // Check the second page
    const page2Text = await findByText("Position the LEGO Brick");
    expect(page2Text).toBeTruthy();

    fireEvent.press(getByText("Next"));

    // Check the third page
    const page3Text = await findByText("Tap the Capture Button!");
    expect(page3Text).toBeTruthy();
  });

  it("uses Skip button", async () => {
    const { getByText } = render(<OnboardingScreen />);

    // Skip back to the first page
    fireEvent.press(getByText("Skip"));
    
    await waitFor(() => {
      expect(mockDismiss).toHaveBeenCalled(); 
   
  });
});

  it("uses Done Button", async () => {
    const { getByText, findByText } = render(<OnboardingScreen />);

    // Navigate to the last page
    fireEvent.press(getByText("Next"));
    fireEvent.press(getByText("Next"));
    fireEvent.press(getByText("Next"));
    
    // Verify the last page
    const finalText = await findByText("Thanks for using BrixColor!");
    expect(finalText).toBeTruthy();

    // Press Done
    fireEvent.press(getByText("Done"));

    // Check AsyncStorage and dismiss function
    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith("isOnboarded", "true");
      expect(mockDismiss).toHaveBeenCalled();
    }); 
  });

 it('uses Swipe functions - Right Swipe', async () => {
    const { getByText } = render(<OnboardingScreen />);
    
    // Initial assertion for the first page
    expect(getByText('Get started with BrixColor.')).toBeTruthy();

    fireEvent.press(getByText("Next"));

    // Wait for the component to update
    await waitFor(() => {
      expect(getByText('Position the LEGO Brick')).toBeTruthy();
    });

    // Simulate swipe right
    fireEvent(getByText('Position the LEGO Brick'), 'onGestureEvent', {
      nativeEvent: { translationX: 100 },
    });

    // Wait for the component to update
    await waitFor(() => {
      expect(getByText('Get started with BrixColor.')).toBeTruthy();
    });
  });
  it('uses Swipe functions - Left Swipe', async () => {
    const { getByText } = render(<OnboardingScreen />);
    
    // Initial assertion for the first page
    expect(getByText('Get started with BrixColor.')).toBeTruthy();

    fireEvent(getByText('Get started with BrixColor.'), 'onGestureEvent', {
      nativeEvent: { translationX: -100 },
    });

    // Wait for the component to update
    await waitFor(() => {
      expect(getByText('Position the LEGO Brick')).toBeTruthy();
    });

  });
}); 

