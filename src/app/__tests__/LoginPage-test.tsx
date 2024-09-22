import {render, fireEvent, waitFor } from "@testing-library/react-native";
import LoginPage from "../LoginPage";
import {signInWithEmailAndPassword} from "firebase/auth";

jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock') );

describe("LoginPage Component Tests", ()=>{
    // test proper init render
    test("Test01: Correct Initial render", () =>{
        const { getByPlaceholderText, queryByText} = render(
            <LoginPage/>
        );
        
        // expects to be on the sign in page, the input fields to be rendered, and no error messages to be rendered
        expect(queryByText("Sign In")).not.toBeNull();
        expect(getByPlaceholderText("Email")).toBeTruthy();
        expect(getByPlaceholderText("Password")).toBeTruthy();
        expect(queryByText("Incorrect Email or Password. Please double-check and try again or reset password.")).toBeNull();
    });


    // test sign up button works
    test("Test02: SignUp button Press", ()=>{
        const { getByLabelText, queryByText} = render(
            <LoginPage/>
        );

        // select signup button
        const signUpButton = getByLabelText("Sign Up Button");

        // press signup button
        fireEvent.press(signUpButton);

        // query sign up page title (check if on correct page)
        expect(queryByText("Create an Account")).not.toBeNull();
    }); 
    

    // test reset password button works
    test("Test03: Reset button Press", ()=>{
        const { getByLabelText, queryByText} = render(
            <LoginPage/>
        );

        // select reset button
        const resetButton = getByLabelText("Reset Password Button");

        // press reset button
        fireEvent.press(resetButton);

        // query a component from reset page (check if on correct page)
        expect(queryByText("Remembered?")).not.toBeNull();
    });


    // test that login button does nothing when 
    test("Test04: Login form Doesn't submit with empty fields", ()=>{
        const { getByLabelText, queryByText} = render(
            <LoginPage/>
        );

        // select Login button
        const loginButton = getByLabelText("Login Button");

        // press reset button
        fireEvent.press(loginButton);

        // query a component from reset page (check if on correct page)
        expect(queryByText("Sign In")).not.toBeNull();
    });

    // bryan@gmail.com
    // hello123&&
    // test can log in with valid input (test with a dummy login)
    test("Test05: Can Login", async () => {
        const {getByLabelText, queryByText} = render(
            <LoginPage/>
        );

        // select the fields and button
        const emailField = getByLabelText("Email Input Field");
        const passwordField = getByLabelText("Password Input Field");
        const loginButton = getByLabelText("Login Button");

        // change the text and submit the form
        fireEvent.changeText(emailField, "bryan@gmail.com");
        fireEvent.changeText(passwordField, "hello123&&");
        fireEvent.press(loginButton);

        // wait for the async call to complete (AuthN is async)
        await waitFor(() =>{
            expect(queryByText("Incorrect Email or Password. Please double-check and try again or reset password.")).toBeNull()
        });
    });

    // test
    // notVal1d3it&er
    // test cannot login with invalid input (test an obviously invalid email (e.g. no @))
    test("Test06: Cannot Login with bad Credentials", async ()=>{

        const {getByLabelText, queryByText} = render(
            <LoginPage/>
        );

        // select the fields and button
        const emailField = getByLabelText("Email Input Field");
        const passwordField = getByLabelText("Password Input Field");
        const loginButton = getByLabelText("Login Button");

        // change the text and submit the form
        fireEvent.changeText(emailField, "hello");
        fireEvent.changeText(passwordField, "two");
        fireEvent.press(loginButton);

        // wait for the async call to complete (AuthN is async)
        await waitFor(() =>{
            expect(queryByText("Invalid Email. No Accounts Match this Email.")).not.toBeNull();
        });
    });

});