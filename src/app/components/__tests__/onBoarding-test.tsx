import { render, fireEvent, waitFor } from "@testing-library/react-native";
import OnboardingScreen from "@/app/onboard"; // Adjust the path as necessary
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock("react-native-onboarding-swiper");

describe("OnboardingScreen", () => {
  const mockDismiss = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ dismiss: mockDismiss });
    jest.clearAllMocks();
  });

  it("renders onboarding pages and navigates to the second page", async () => {
    const { getByText } = render(<OnboardingScreen />);
    expect(getByText("Welcome TEST!")).toBeTruthy();

    fireEvent.press(getByText("Next"));

    await waitFor(() => {
      expect(getByText("TEST!")).toBeTruthy();
    });
  });

  it("completes onboarding and dismisses when done", async () => {
    const { getByText } = render(<OnboardingScreen />);

    fireEvent.press(getByText("Next"));
    fireEvent.press(getByText("Done"));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith("isOnboarded", "true");
      expect(mockDismiss).toHaveBeenCalled();
    });
  });
});
