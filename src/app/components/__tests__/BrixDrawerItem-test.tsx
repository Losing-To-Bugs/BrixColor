import { render } from '@testing-library/react-native';

import {BrixDrawerItem} from "@/app/components/BrixDrawerItem";

describe('<BrixDrawerItem />', () => {
    test('Renders', () => {
        render(<BrixDrawerItem href={'/'} />);
    });
});