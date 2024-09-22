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

    it('shows login error when bad email is typed', async () => {
        const {queryByText, getByAccessibilityHint, getByPlaceholderText} = render(
            <ResetPage
                setRenderReset={setRenderReset}
                handleReset={handleReset}
                loginError={loginError}
                renderLoginError={false}/>
        )

        const resetPasswordButton = getByAccessibilityHint('double tap to send reset')
        const emailField = getByPlaceholderText('Email')

        fireEvent.changeText(emailField, 'badEmail')
        fireEvent.press(resetPasswordButton)

        expect(queryByText('Please Enter a Valid Email Address')).toBeTruthy()
    });

    it('does not show login error when good email is typed', async () => {
        const {queryByText, getByAccessibilityHint, getByPlaceholderText} = render(
            <ResetPage
                setRenderReset={setRenderReset}
                handleReset={handleReset}
                loginError={loginError}
                renderLoginError={false}/>
        )

        const resetPasswordButton = getByAccessibilityHint('double tap to send reset')
        const emailField = getByPlaceholderText('Email')

        fireEvent.changeText(emailField, 'goodEmail@mail.com')
        fireEvent.press(resetPasswordButton)

        expect(queryByText('Please Enter a Valid Email Address')).toBeFalsy()
    });
});
