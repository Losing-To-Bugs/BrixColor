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

## Deploy development build to iOS
Prerequisites:
- Device running MacOS
- Apple ID account
- Cable to tether iOS device to Mac

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

### 5. Run build
`npx expo run:ios --device`

This command will prompt for which device to target when building. To deploy to your iOS device, connect it to the mac with a cable and it should appear in the menu prompt.

You'll most likely get an error after running this command, indicating you need to set up Xcode for this project.

### 6. Trust developer in iOS
After the build finishes, it should appear in your iOS device in 'Recently Added', but you first need to go to Settings > General > VPN & Device Management > Developer App

Press 'Trust' for the developer account used to build the app. 

## Troubleshooting

### a)
```
xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance
  [!] Failed to load 'glog' podspec:
  [!] Invalid `glog.podspec` file: undefined method `[]' for nil:NilClass.
```

Run `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`

More info: https://dev.to/lico/react-nativewithout-expo-run-hello-world-app-on-iphone-device-cfi
