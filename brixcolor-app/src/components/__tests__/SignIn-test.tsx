import {fireEvent, render, waitFor} from '@testing-library/react-native';
import SignIn from "@/components/SignUp";
import {createUserWithEmailAndPassword} from "firebase/auth";

jest.mock('firebase/auth', () => ({
    ...jest.requireActual('firebase/auth'),
    getAuth: jest.fn(),
    createUserWithEmailAndPassword: jest.fn()
}))
jest.mock('firebase/app')
jest.mock('firebase/firestore')
jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock') );
describe('<SignIn />', () => {
    const setRenderSignUp = jest.fn() as () => {}
    const handleFirebaseAuthError = jest.fn() as () => {}
    const loginError = 'login_error'

    const email = 'email@mail.com'
    const user = 'user123'
    const pass = 'password12345!'

    const badEmail = 'badEmail'

    test('Renders', () => {
        const {queryByText} = render(
            <SignIn
            loginError={loginError}
            handleFirebaseAuthError={handleFirebaseAuthError}
            setRenderSignUp={setRenderSignUp}
            />
        )

        expect(queryByText(loginError)).toBeNull()
    });

    it('calls setRenderSignUp on Log In press', () => {
        const {getByText, queryByText, getByLabelText, getByPlaceholderText} = render(
            <SignIn
                loginError={loginError}
                handleFirebaseAuthError={handleFirebaseAuthError}
                setRenderSignUp={setRenderSignUp}
            />
        )

        fireEvent.press(getByText('Log In'))

        expect(setRenderSignUp).toHaveBeenCalledWith(false)
    });

    it('Renders email address error when sign up goes wrong', () => {
        const {getByText, queryByText, getByLabelText, getByPlaceholderText} = render(
            <SignIn
                loginError={loginError}
                handleFirebaseAuthError={handleFirebaseAuthError}
                setRenderSignUp={setRenderSignUp}
            />
        )

        expect(queryByText(loginError)).toBeNull()

        const emailField = getByLabelText('Email Input Field')
        const userField = getByLabelText('Username Input Field')
        const passwordField = getByPlaceholderText('Password')
        const confirmPasswordField = getByPlaceholderText('Confirm Password')
        const createAccountBtn = getByText('Create Account')

        fireEvent.changeText(emailField, badEmail)
        fireEvent.changeText(userField, user)
        fireEvent.changeText(passwordField, pass)
        fireEvent.changeText(confirmPasswordField, pass)

        fireEvent.press(createAccountBtn)

        expect(queryByText('Please Enter a Valid Email Address')).toBeTruthy()
    });

    it('Renders loginError when login goes wrong', async () => {
        createUserWithEmailAndPassword.mockImplementationOnce(() => Promise.reject(''))

        const {getByText, queryByText, getByLabelText, getByPlaceholderText} = render(
            <SignIn
                loginError={loginError}
                handleFirebaseAuthError={handleFirebaseAuthError}
                setRenderSignUp={setRenderSignUp}
            />
        )

        expect(queryByText(loginError)).toBeNull()

        const emailField = getByLabelText('Email Input Field')
        const userField = getByLabelText('Username Input Field')
        const passwordField = getByPlaceholderText('Password')
        const confirmPasswordField = getByPlaceholderText('Confirm Password')
        const createAccountBtn = getByText('Create Account')

        fireEvent.changeText(emailField, email)
        fireEvent.changeText(userField, user)
        fireEvent.changeText(passwordField, pass)
        fireEvent.changeText(confirmPasswordField, pass)

        fireEvent.press(createAccountBtn)

        await waitFor(() => expect(queryByText(loginError)).toBeTruthy())
    });

    it.each([
        {badPass: 't0oShort!', expected: 'at least 10 characters long'},
        {badPass: 'thereIsNoNumberInThisPassword!', expected: 'at least one number (0-9)'},
        {badPass: 'there1sNoSpecialCharacterInThisPassword', expected: 'at least one special character'},
    ])(('shows password error: $expected'), ({ badPass, expected }) => {
        const {queryByText, getByLabelText, getByPlaceholderText} = render(
            <SignIn
                loginError={loginError}
                handleFirebaseAuthError={handleFirebaseAuthError}
                setRenderSignUp={setRenderSignUp}
            />
        )

        const emailField = getByLabelText('Email Input Field')
        const userField = getByLabelText('Username Input Field')
        const passwordField = getByPlaceholderText('Password')
        const confirmPasswordField = getByPlaceholderText('Confirm Password')


        fireEvent(passwordField, 'focus')
        fireEvent.changeText(userField, user)
        fireEvent.changeText(emailField, email)
        fireEvent.changeText(passwordField, badPass)
        fireEvent.changeText(confirmPasswordField, badPass)

        expect(queryByText(expected, {exact: false})).toBeTruthy()
    })

    it('shows no password errors given good password', async () => {
        const {queryByText, getByLabelText, getByPlaceholderText} = render(
            <SignIn
                loginError={loginError}
                handleFirebaseAuthError={handleFirebaseAuthError}
                setRenderSignUp={setRenderSignUp}
            />
        )

        const emailField = getByLabelText('Email Input Field')
        const userField = getByLabelText('Username Input Field')
        const passwordField = getByPlaceholderText('Password')
        const confirmPasswordField = getByPlaceholderText('Confirm Password')


        fireEvent(passwordField, 'focus')
        fireEvent.changeText(userField, user)
        fireEvent.changeText(emailField, email)
        fireEvent.changeText(passwordField, pass)
        fireEvent.changeText(confirmPasswordField, pass)

        expect(queryByText('Password meets all requirements')).toBeTruthy()
    });

});
