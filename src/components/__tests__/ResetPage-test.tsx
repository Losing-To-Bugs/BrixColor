import {fireEvent, render} from '@testing-library/react-native';
import ResetPage from "@/components/ResetPage";

describe('<ResetPage />', () => {
    const setRenderReset = jest.fn() as () => {}
    const handleReset = () => (<></>)
    const loginError = 'login_error'

    test('Renders', () => {
        const {queryByText} = render(
            <ResetPage
            setRenderReset={setRenderReset}
            handleReset={handleReset}
            loginError={loginError}
            renderLoginError={false}/>
        )

        expect(queryByText(loginError)).toBeNull()
    });

    test('Renders login error when renderLoginError is true', () => {
        const {queryByText} = render(
            <ResetPage
                setRenderReset={setRenderReset}
                handleReset={handleReset}
                loginError={loginError}
                renderLoginError={true}/>
        )

        expect(queryByText(loginError)).toBeTruthy()
    });

    it('calls setRenderReset when go back button is pressed', async () => {
        const {getByText} = render(
            <ResetPage
                setRenderReset={setRenderReset}
                handleReset={handleReset}
                loginError={loginError}
                renderLoginError={false}/>
        )

        fireEvent.press(getByText('Go Back'))
        expect(setRenderReset).toHaveBeenCalledWith(false)
    });
});
