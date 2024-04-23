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