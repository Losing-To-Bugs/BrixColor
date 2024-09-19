import React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, Button, TextInput, ActivityIndicator, Image } from 'react-native'
import { auth } from "@/services/firebaseConfig"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
    handleFirebaseAuthError: Function,
    loginError: string,
    setRenderSignUp: Function
}

const SignIn: React.FC<Props> = ({handleFirebaseAuthError, loginError, setRenderSignUp}) =>{

    const router = useRouter()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verPass, setVerPass] = useState("");
    const [userName, setUserName] = useState("");
    const [confirmState, setConfirmState] = useState(false);
    const [showReqs, setShowReqs] = useState(false);

    const [UID, setUID] = useState("");

    const [showPass, setShowPass] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [renderEmailError, setRenderEmailError] = useState(false);
    const [renderLoginError, setRenderLoginError] = useState(false);
    // const [loginError, setLoginError] = useState('')

    // switch between rendering the form as login and sign-up then use these
    // const [renderSignUp, setRenderSignUp] = useState(false);
    const [isLengthValid, setIsLengthValid] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
    const [renderUsernameError, setRenderUsernameError] = useState(false)


    // check Email
    const validateEmail = (): boolean =>{
        const emailregex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailregex.test(email)
    }

    // handle signup and return user
    const signup = () =>{

        // do nothing on accidental clicks when the form isn't ready
        if ((userName.length < 1) && (email.length < 1) && (password.length < 1)){
            return
        }



        if (!isLengthValid || !hasNumber || !hasSpecialCharacter){
            return
        }

        // reset the previous errors
        setRenderEmailError(false)
        setRenderLoginError(false)

        // render loading wheel
        setIsLoading(true)


        // check if email is valid syntax
        const check = validateEmail()

        if (userName.length < 1){
            setRenderUsernameError(true);

            if (!check){
                // render email error
                setRenderEmailError(true)
            }

            setIsLoading(false)
            return
        }

        if (!check){
            // render email error
            setRenderEmailError(true)
            setIsLoading(false)
            return
        }

        // in the case that the error was rendered already
        setRenderEmailError(false)
        setRenderUsernameError(false)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // logged in successfully
                // store info and update state

                setUID(userCredential.user['uid']);

                storeData("uid", userCredential.user['uid']);
                storeData("username", userName);

                router.replace("/(drawer)/scan")
            })
            .catch((err) =>{
                // serve error message and re-try
                handleFirebaseAuthError(err.message)
                setRenderLoginError(true)

                console.error(err)
            })
            .finally(() =>{
                setIsLoading(false)
            })
    }

    const handlePassChange = (val: string) =>{
        const trimVal = val.replace(/\s/g, '');

        // clear the confirm password whenever you change main password
        if (verPass.length > 0){
            setConfirmState(true);
            setVerPass("");
        }

        // check if long enough
        setIsLengthValid(trimVal.length >= 10);

        // check if it contains a number
        setHasNumber(/\d/.test(trimVal));

        // check for a special character
        setHasSpecialCharacter(/[!@#$%^&*]/.test(trimVal))

        // update password state variable
        setPassword(trimVal);
    }

    const storeData = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
            return 0;
        } catch (e) {
            console.error("Problem Saving " + key)
            return -1;
        }
    };



    return (
        <View style={{flex: 1}}>
            {
                // loading wheel
                (isLoading) ?  (
                    <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
                        <ActivityIndicator size={'large'} color={'blue'} />
                    </View>
                ) : (

                    // main page
                    <View style={{flex: 1}} accessibilityLabel='Sign Up Page'>

                        {/* header */}
                        <View style={{flex: 1}} accessibilityLabel='Sign Up Page Header' >

                            {/* header image */}
                            <View style={{marginTop: 10, height: "60%", justifyContent: "center", alignItems: "center"}}>
                                <Image source={require("../../assets/images/BrixColor-cropped.jpeg")} style={{height: "100%", resizeMode: "contain"}} aria-label='BrixColor Logo' accessibilityLabel='BrixColor Logo, Header Image'/>
                            </View>

                            {/* page subtitle */}
                            <Text style={{textAlign: 'center', fontSize: 20, paddingTop: 5}}>
                                Create an Account
                            </Text>

                            {/* header text and log in button */}
                            <View style={{height: "10%", flexDirection: "row"}} >
                                <View style={{flex: 1.6, flexDirection: "column", justifyContent:"flex-start"}} >
                                    <Text style={{textAlign: 'right', fontSize: 12, paddingRight: 2.5}} >
                                        Already Signed Up?
                                    </Text>
                                </View>

                                {/* log in button */}
                                <View style={{flex: 1, flexDirection: "column"}} >
                                    <TouchableOpacity onPress={ () => {setRenderSignUp(false)}} accessibilityLabel='Log In Button' accessibilityHint='double tap to navigate to login form' accessibilityRole='button'>
                                        <Text style={{fontSize: 12, paddingLeft: 2.5, color: "blue"}}>
                                            Log In
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>

                        {<View style={{flex: 3}}>

                            {renderLoginError &&
                                <View style={{flexGrow: 0, alignItems: "center"}} >
                                    <View style={{marginTop: 10, width: "80%", alignItems: "center", height: null}} >
                                        <Text style={{textAlign: "center", color: "red"}}>{loginError}</Text>
                                    </View>
                                </View>
                            }

                            {/* username field */}
                            <View style={{height: "7%", alignItems: "center", justifyContent: "center",  marginVertical: 20}} >
                                <TextInput placeholder='Username' onChangeText={(val) => {
                                    const trimVal = val.replace(/\s/g, '')
                                    if (renderUsernameError){
                                        setRenderUsernameError(false)
                                    }
                                    setUserName(trimVal)
                                }}
                                           value={userName}
                                           style={{height: "100%", width: '90%', textAlign: "center", borderColor: (renderUsernameError) ? "#FF4D4D" : "#3E74FF", borderWidth: 1, borderRadius: 10}}
                                           accessible={true}
                                           accessibilityLabel='Username Input Field'
                                           returnKeyType='done'
                                />
                            </View>

                            {renderEmailError &&
                                <View style={{alignItems: "center", flexGrow: 0, justifyContent: "flex-end"}} >
                                    <View style={{marginVertical: 0, width: "80%", alignItems: "center", height: null}} >
                                        <Text style={{textAlign: "center", color: "red", fontSize: 12}} >Please Enter a Valid Email Address</Text>
                                    </View>
                                </View>

                            }

                            {/* email field */}
                            <View style={{height: "7%", alignItems: "center", justifyContent: "center", marginBottom: 20}} >
                                <TextInput placeholder='Email' onChangeText={(val) => {
                                    const trimVal = val.replace(/\s/g, '')
                                    setEmail(trimVal)
                                }}
                                           value={email}
                                           style={{height: "100%", width: '90%', textAlign: "center", borderColor: (renderLoginError || renderEmailError)? "#FF4D4D" : "#3E74FF", borderWidth: 1, borderRadius: 10}}
                                           accessible={true}
                                           accessibilityLabel='Email Input Field'
                                           keyboardType="email-address"
                                           returnKeyType='done'
                                />
                            </View>

                            {/* password Requirements */}
                            { showReqs &&
                                <View style={{width: "100%", alignItems: "center", marginBottom: 10}}>

                                    { (!isLengthValid || !hasNumber || !hasSpecialCharacter) && <Text style={{fontSize: 15, textDecorationLine: "underline", textAlign: "center"}}>
                                        Password Requirements:
                                    </Text>
                                    }
                                    {!isLengthValid &&
                                        <Text style={{textAlign: "center", marginBottom: 2, color: "red"}}>
                                            at least 10 characters long
                                        </Text>
                                    }
                                    {!hasNumber &&
                                        <Text style={{textAlign: "center", marginBottom: 2, color: "red"}}>
                                            at least one number (0-9)
                                        </Text>
                                    }
                                    {!hasSpecialCharacter && (
                                        <Text style={{textAlign: "center", marginBottom: 2, color: "red"}}>
                                            at least one special character{"\n"}(!@#$%^&*)
                                        </Text>
                                    )}
                                    {isLengthValid && hasNumber && hasSpecialCharacter && (
                                        <Text style={{ color: 'green', textAlign: 'center' }}>
                                            Password meets all requirements
                                        </Text>
                                    )}
                                </View>
                            }


                            {/* password field */}
                            <View style={{height: "7%", alignItems: "center", justifyContent: "center", marginBottom: 20}} >
                                <TextInput
                                    placeholder='Password'
                                    onChangeText={(val) => {
                                        handlePassChange(val)
                                    }}
                                    value={password}
                                    style={{height: "100%", width: '90%', textAlign: "center", borderColor: (((verPass.length > 0) && !confirmState)) ? "#FF4D4D" : "#3E74FF", borderWidth: 1, borderRadius: 10}}
                                    accessible={true}
                                    accessibilityLabel='Password Input Field'
                                    secureTextEntry={showPass}
                                    returnKeyType='done'
                                    onFocus={() =>{
                                        // don't show password requirements until the user gets to the password field
                                        // only set true once.
                                        if (!showReqs){
                                            setShowReqs(true)
                                        }
                                    }}
                                />
                            </View>

                            {/* confirm passowrd field */}
                            <View style={{height: "7%", alignItems: "center", justifyContent: "center"}} >
                                <TextInput
                                    placeholder='Confirm Password'
                                    onChangeText={(val) => {
                                        const trimVal = val.replace(/\s/g, '')
                                        const passwordsMatch = password === trimVal;
                                        setConfirmState(passwordsMatch);
                                        setVerPass(trimVal)
                                    }}
                                    value={verPass}
                                    style={{height: "100%", width: '90%', textAlign: "center", borderColor: (((verPass.length > 0) && !confirmState)) ? "#FF4D4D" : "#3E74FF", borderWidth: 1, borderRadius: 10}}
                                    accessible={true}
                                    accessibilityLabel='Password Input Field'
                                    secureTextEntry={showPass}
                                    returnKeyType='done'
                                />
                            </View>

                            {/* confirm password suggestion */}
                            { ((verPass.length > 0) && (!confirmState)) &&
                                <Text style={{textAlign: "center", fontSize: 12, color: "#FF4D4D"}}>
                                    passwords don't match
                                </Text>
                            }

                            {/* show password button */}
                            <View style={{height: "10%"}} >
                                {password.length > 0 && <Button title={showPass ? 'Show Password': 'Hide Password'} onPress={() => {
                                    setShowPass(!showPass)
                                }}
                                />}
                            </View>



                            {/* create account container and button */}
                            <View style={{flex: 1, justifyContent: "flex-end"}}>
                                <View style={{flex: 0.5, justifyContent: "flex-end", marginBottom: 10, alignItems: "center"}} >
                                    <TouchableOpacity onPress={signup} accessibilityLabel='Account Creation Submit Button' accessibilityHint='double tap to submit form' accessibilityRole='button'>
                                        <Text style={{textAlign: "center", fontSize: 20, color: "blue"}} >
                                            Create Account
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>}


                    </View>
                )}
        </View>
    )

}
export default SignIn;