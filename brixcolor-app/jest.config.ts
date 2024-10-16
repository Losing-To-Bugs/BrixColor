import type {Config} from 'jest';
const jestExpoPreset = require('jest-expo/jest-preset');


const config: Config = {
    ...jestExpoPreset,
    verbose: true,

    "transformIgnorePatterns": [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|firebase/app/.*|@firebase|firebase|react-native-svg)",
    ],
    moduleNameMapper: {
        '^@/services/(.*)$': '<rootDir>/services/$1',
        '^@/(.*)$': '<rootDir>/src/$1',
    }
};

export default config;