import { render, fireEvent } from "@testing-library/react-native";
import Settings from "@/app/(drawer)/scan/settings";
import { useSettings } from "@/components/SettingsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock("@/components/SettingsContext", () => ({
  useSettings: jest.fn(),
}));

describe("Settings", () => {
  const mockSetToggleScans = jest.fn();
  const mockSetToggleAudio = jest.fn();
  const mockSetToggleCapture = jest.fn();
  const mockSetTheme = jest.fn();
  const mockSetFont = jest.fn();
  const mockSetIcon = jest.fn();
  const mocksaveIconSize = jest.fn();
  const mocksaveFontSize = jest.fn();
  const mocksaveTheme = jest.fn();
  const mocksaveToggleAudio = jest.fn();
  const mocksaveToggleCapture = jest.fn();

  test("UI - settings page render", () => {
    const { getByText } = render(<Settings />);
    expect(getByText("Settings")).toBeTruthy();
    expect(getByText("Back")).toBeTruthy();
    expect(getByText("General Settings")).toBeTruthy();
    expect(getByText("Select Language:")).toBeTruthy();
    expect(getByText("Capture with Volume Button")).toBeTruthy();
    expect(getByText("Accessibility Settings")).toBeTruthy();
    expect(getByText("Brick Audio Announcement")).toBeTruthy();
    expect(getByText("Select UI Theme:")).toBeTruthy();
    expect(getByText("Select Text Font Size:")).toBeTruthy();
    expect(getByText("Select Icon Size:")).toBeTruthy();
  });

  beforeEach(() => {
    (useSettings as jest.Mock).mockReturnValue({
      toggleScans: false,
      toggleAudio: false,
      toggleCapture: false,
      setTogglescans: mockSetToggleScans,
      setToggleAudio: mockSetToggleAudio,
      setToggleCapture: mockSetToggleCapture,
      setTheme: mockSetTheme,
      setFontSize: mockSetFont,
      setIconSize: mockSetIcon,
      saveIconSize: mocksaveIconSize,
      saveFontSize: mocksaveFontSize,
      saveTheme: mocksaveTheme,
      saveToggleAudio: mocksaveToggleAudio,
      saveToggleCapture: mocksaveToggleCapture,
      theme: "Light",
      fontSize: "Medium",
      iconSize: "Medium",
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
      iconSizes: {
        Small: { Size: 24 },
        Medium: { Size: 32 },
        Big: { Size: 40 },
        Huge: { Size: 48 },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  it("Toggle Switch Async - Volume capture ON", async () => {
    const { getByLabelText } = render(<Settings />);
    const switchComponent = getByLabelText("Brick Identification Audio Announcement");

    expect(switchComponent.props.value).toBe(false);

    fireEvent(switchComponent, "valueChange", true);

    expect(mockSetToggleAudio).toHaveBeenCalledWith(true);
    expect(mocksaveToggleAudio).toHaveBeenCalledWith(true);
  });

  it("Toggle Switch Async - Volume capture OFF", async () => {
    (useSettings as jest.Mock).mockReturnValueOnce({
      toggleAudio: true,
      setToggleAudio: mockSetToggleAudio,
      saveToggleAudio: mocksaveToggleAudio,
      theme: "Light",
      fontSize: "Medium",
      iconSize: "Medium",
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
      iconSizes: {
        Small: { Size: 24 },
        Medium: { Size: 32 },
        Big: { Size: 40 },
        Huge: { Size: 48 },
      },
    });

    const { getByLabelText } = render(<Settings />);
    const switchComponent = getByLabelText("Brick Identification Audio Announcement");

    expect(switchComponent.props.value).toBe(true);

    fireEvent(switchComponent, "valueChange", false);

    expect(mockSetToggleAudio).toHaveBeenCalledWith(false);
    expect(mocksaveToggleAudio).toHaveBeenCalledWith(false);
  });

  it("Toggle Switch - Audio Announcement ON", async () => {
    const { getByLabelText } = render(<Settings />);
    const switchComponent = getByLabelText("Scan with volume buttons");

    expect(switchComponent.props.value).toBe(false);

    fireEvent(switchComponent, "valueChange", true);

    expect(mockSetToggleCapture).toHaveBeenCalledWith(true);
    expect(mocksaveToggleCapture).toHaveBeenCalledWith(true);
  });

  it("Toggle Switch - Audio Announcement OFF", async () => {
    (useSettings as jest.Mock).mockReturnValueOnce({
      toggleCapture: true,
      setToggleCapture: mockSetToggleCapture,
      saveToggleCapture: mocksaveToggleCapture,
      theme: "Light",
      fontSize: "Medium",
      iconSize: "Medium",
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
      iconSizes: {
        Small: { Size: 24 },
        Medium: { Size: 32 },
        Big: { Size: 40 },
        Huge: { Size: 48 },
      },
    });

    const { getByLabelText } = render(<Settings />);
    const switchComponent = getByLabelText("Scan with volume buttons");

    expect(switchComponent.props.value).toBe(true);

    fireEvent(switchComponent, "valueChange", false);

    expect(mockSetToggleCapture).toHaveBeenCalledWith(false);
    expect(mocksaveToggleCapture).toHaveBeenCalledWith(false);
  });

  test("Picker - Theme", async () => {
    const { getByTestId } = render(<Settings />);
    const themePicker = getByTestId("theme-picker");

    fireEvent(themePicker, "valueChange", "Dark");

    expect(mockSetTheme).toHaveBeenCalledWith("Dark");
    expect(mocksaveTheme).toHaveBeenCalled();
  });

  test("Picker - Font Size", async () => {
    const { getByTestId } = render(<Settings />);
    const fontPicker = getByTestId("Font-picker");

    fireEvent(fontPicker, "valueChange", "Small");

    expect(mockSetFont).toHaveBeenCalledWith("Small");
    expect(mocksaveFontSize).toHaveBeenCalled();
  });

  test("Picker - Icon Size", async () => {
    const { getByTestId } = render(<Settings />);
    const iconPicker = getByTestId("Icon-picker");


    fireEvent(iconPicker, "valueChange", "Small");

    expect(mockSetIcon).toHaveBeenCalledWith("Small");
    expect(mocksaveIconSize).toHaveBeenCalled();
    
  });
});
