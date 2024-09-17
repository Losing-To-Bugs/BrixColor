// import {Text, TouchableOpacity, View} from "react-native";
// import {fireEvent, render, screen} from '@testing-library/react-native';
//
// import BrixDrawerToggleButton from "@/components/BrixDrawerToggleButton";
// import IconCharacters from "@/constants/icon-characters";
// import {Drawer} from "expo-router/drawer";
// import {renderRouter} from "expo-router/testing-library";
// import {Link} from "expo-router";

// describe('<BrixDrawerToggleButton />', () => {
//     test('Renders', () => {
//         // render(<BrixDrawerToggleButton />);
//     });
//
//     it('my-test', async () => {
//         const MockComponent = jest.fn(() => <View />);
//         const PageA = jest.fn(() => <View>
//             <Text>A</Text>
//             <Link href={'(group)/b'}><TouchableOpacity><Text>Touch</Text></TouchableOpacity></Link>
//         </View>);
//         const PageB = jest.fn(() => <View><Text>B</Text></View>);
//
//         const { getByText } = renderRouter(
//             {
//                 index: MockComponent,
//                 'directory/a': PageA,
//                 '(group)/b': PageB,
//             },
//             {
//                 initialUrl: '/directory/a',
//             }
//         );
//
//         expect(screen).toHavePathname('/directory/a');
//         getByText('A');
//         getByText('Touch');
//
//         fireEvent.press(getByText('Touch'));
//
//         expect(screen).toHavePathname('/b');
//
//
//     });
// });

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