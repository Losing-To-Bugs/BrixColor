import { render, fireEvent, waitFor } from "@testing-library/react-native";
import OnboardingScreen from "@/app/onboard"; // Adjust the path as necessary
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useSettings } from "@/components/SettingsContext";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

// Mocking useSettings
jest.mock("@/components/SettingsContext", () => ({
  useSettings: jest.fn(),
  SettingsProvider: ({ children }) => <>{children}</>,
}));

// Mocking AsyncStorage methods
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mocking the onboarding swiper
jest.mock("react-native-onboarding-swiper", () => {
  const { View, Text, Button } = require("react-native");
  return jest
    .fn()
    .mockImplementation(({ NextButtonComponent, pages, onDone }) => {
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
      theme: "Light", // Mocking a light theme
      fontSize: "Medium", // Mocking medium font size
      themes: {
        Light: {
          switchOffColor: "#E0E0E0",
          primaryColor: "#0055BF",
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

  it("renders onboarding pages and navigates thru all", async () => {
    const { getByTestId, findByText } = render(<OnboardingScreen />);

    // First page
    const welcomeText = await findByText("Welcome to BrixColor!");
    expect(welcomeText).toBeTruthy();

    fireEvent.press(getByTestId("next-button-0"));

    // Second page
    const page2Text = await findByText(
      "Place LEGO brick in the highlighted area."
    );
    expect(page2Text).toBeTruthy();

    fireEvent.press(getByTestId("next-button-1"));

    // Third page
    const page3Text = await findByText("Once in view, tap the capture button!");
    expect(page3Text).toBeTruthy();

    fireEvent.press(getByTestId("next-button-2"));

    // Final page
    const finalText = await findByText("Thanks for using BrixColor!");
    expect(finalText).toBeTruthy();

    const doneButton = await getByTestId("done-button");
    fireEvent.press(doneButton);

    // Test if AsyncStorage.setItem is working correctly
    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith("isOnboarded", "true");
      expect(mockDismiss).toHaveBeenCalled();
    });
  });
});
