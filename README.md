# BrixColor
Toy brick color and identifier for the visually impaired.

# Local Development Server
Start the development server from the terminal:
> npx expo start

## Open in Mobile
Once it is running, open the Expo app on your mobile device and scan the QR code shown in the terminal. This will open the React Native app wrapped in Expo.

## Open in Web
Navigate to http://localhost:8081

# Project Structure
This project uses [Expo Router](https://docs.expo.dev/router/create-pages/) to define pages in the file-based routing convention.

More specifically, it leverages the [Expo Drawer](https://dev.to/aaronksaunders/expo-router-drawer-navigation-from-the-docs-231k) for the user to easily navigate between pages such as Settings.

# Environment variables
Environment variables are stored in `.env*.local` files. 

To start the application using environment variables: 
`NODE_ENV=environment npx expo start`

## Example
```
# In .env.development.local
NODE_ENV=development npx expo start
```

```bash
NODE_ENV=development npx expo start
```

## Deploy development build to iOS for the first time
Prerequisites:
- Device running MacOS
- Apple ID account
- Cable to tether iOS device to Mac
- **Mac and iOS device on same network**

### 1. Install Xcode from App store on mac
https://apps.apple.com/us/app/xcode/id497799835?mt=12

### 2. Install dependencies
`npm i`

### 3. Run prebuild
`npx expo prebuild -p ios`

### 4. Configure Xcode
Assuming you're in the project root directory, run `open ./ios/BrixColor.xcworkspace`

After Xcode opens, select the BrixColor project in the navigator pane (left side), and navigate to Signing & Capabilities.

Make sure the 'Automatically manage signing' checkbox is checked.

If the team is set to none, and you have no available one in the dropdown, select 'Add an account' and sign in with your Apple ID.

Remove the 'Push Notification' capability.

You might still see this error
> Failed Registering Bundle Identifier
The app identifier "com.brixcolorfinder.BrixColor" cannot be registered to your development team because it is not available. Change your bundle identifier to a unique string to try again.

In the Bundle Identifier, pick something unique to avoid this error (e.g com.brixcolorfinder.BrixColorTest0)

Retry the provisioning and proceed if no error messages arise.

### 5. Add FrameProcessor & ML Packages
In the XCode filetree, right click "BrixColor" and Select "Add Files To 'BrixColor'..."

A file system window will appear. 

Navigate to "FrameProcessorPlugins"

Select "LegoDetectorFrameProcessor" and click Add.

- Repeat this process for "ColorDetectionPlugins"

- Repeat this process and add "brixblenderv2-t1.mlpackage". 
  - (Located in brixcolor-app/assets folder)

### 6. Run build
`npx expo run:ios --device`

This command will prompt for which device to target when building. To deploy to your iOS device, connect it to the mac with a cable and it should appear in the menu prompt.

### 7. Trust developer in iOS
After the build finishes, it should appear in your iOS device in 'Recently Added', but you first need to go to Settings > General > VPN & Device Management > Developer App

Press 'Trust' for the developer account used to build the app. 

### Troubleshooting

### a)
```
xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance
  [!] Failed to load 'glog' podspec:
  [!] Invalid `glog.podspec` file: undefined method `[]' for nil:NilClass.
```

Run `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`

More info: https://dev.to/lico/react-nativewithout-expo-run-hello-world-app-on-iphone-device-cfi

## Testing
This project uses [Jest](https://jestjs.io/docs/using-matchers)
as a testing framework and the 
[React Native Testing Library](https://testing-library.com/docs/react-native-testing-library/example-intro/) 
that lets you test components in a user-centric way.

To run tests, run:
> npm run test

### Examples
> Testing a simple component
```tsx
import {Text, View} from "react-native";
import {render} from '@testing-library/react-native';


const MyComponent = () => (<View><Text>Hello, world!</Text></View>)

describe('<MyComponent />', () => {
    // PASSES
    test('it renders', () => {
        render(<MyComponent />);
    });

    // PASSES
    test('it has correct text', () => {
        const { getByText } = render(<MyComponent />);
        getByText('Hello, world!');
    });

    // FAILS
    test('it has correct text', () => {
        const { getByText } = render(<MyComponent />);
        getByText('Hello, mom!');
    });
});
```

> Testing a button
```tsx
import {fireEvent, render} from "@testing-library/react-native";
import {useState} from "react";
import {Pressable, Text, View} from "react-native";

const MyComponent = () => {
    const [pressed, setPressed] = useState(false);

    if (pressed) {
        return (<>
            <View><Text>Pressed!</Text></View>
        </>)
    }

    return (<>
        <View>
            <Pressable onPress={() => setPressed(true)}>
                <Text>Press me!</Text>
            </Pressable>
        </View>
    </>)
}

describe('<MyComponent />', () => {
    test('it renders', () => {
        render(<MyComponent />);
    });

    test('it changes on press', () => {
        const { getByText } = render(<MyComponent />);

        fireEvent.press(getByText('Press me!'));
        getByText('Pressed!')
    });
});
```

## Project Structure
The project uses Expo file system based routing and
React Native navigation elements including expo-router/stack
and expo-router/drawer.

### Routes
```
/LoginPage

/(drawer)/scan
/(drawer)/scan/settings
```

The `/(drawer)/scan` route uses a stack element inside
a drawer element. This way, the user can open the drawer
and navigate to the settings page `/(drawer)/settings`
by pushing it to the
stack. In the settings page, the user simply presses
a back button which pops the stack and returns to the
scan page.
