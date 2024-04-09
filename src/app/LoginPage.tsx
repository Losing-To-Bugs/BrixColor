import React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, Button, TextInput, ActivityIndicator, Image } from 'react-native'
import { auth } from "../../services/firebaseConfig"
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'expo-router';
import SignIn from "@/components/SignIn"
import ResetPage from '@/components/ResetPage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// need to implement persistence of user

const LoginPage = () =>{
    const router = useRouter()
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [UID, setUID] = useState("")

    const [showPass, setShowPass] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    // const [renderEmailError, setRenderEmailError] = useState(false)
    const [renderLoginError, setRenderLoginError] = useState(false)
    const [loginError, setLoginError] = useState('')

    // switch between rendering the form as login and sign-up then use these
    const [renderSignUp, setRenderSignUp] = useState(false);
    const [renderResetScreen, setRenderResetScreen] = useState(false);
    const [renderResetScreenError, setRenderResetScreenError] = useState(false)



    const handleFirebaseAuthError = (errorCode: string) => {
        const regex = /\((.*?)\)/;
        const match = errorCode.match(regex);
        const code = match[1]
        // console.log(code)

        switch (code) {
          case 'auth/invalid-email':
            renderSignUp ? setLoginError('Invalid email address.') : setLoginError('Invalid email address. No Accounts Match this Email.');
            break;
          case 'auth/user-not-found':
            setLoginError('User not found. Please check your email or sign up.');
            break;
          case 'auth/wrong-password':
            setLoginError('Invalid password. Please check your password and try again.');
            break;
        case 'auth/email-already-exists':
            setLoginError('The provided email is already in use. If you forgot your password, you can reset it.');
            break;
        case 'auth/email-already-in-use':
            setLoginError('The provided email is already in use.');
            break;
        case 'auth/invalid-credential':
            setLoginError("Incorrect Email or Password. Please double-check and try again or reset password.");
            break;
          // Add more cases for additional error codes as needed
          default:
            setLoginError('An unexpected error occurred. Please try again later or contact support.');
            break;
        }
    };
    
    const storeData = async (key: string, value: string) => {
        try {
          await AsyncStorage.setItem(key, value);
          return 0;
        } catch (e) {
            console.error(e)
        //   console.error("Problem Saving" + key)
          return -1;
        }
    };

    // handle login 
    const login = () =>{

        if ((password.length < 1) || (email.length < 1)){
            return
        }

        setIsLoading(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // store info and update state
                // console.log(userCredential)
                setUID(userCredential.user['uid'])

                storeData("uid", userCredential.user['uid']);
                router.replace("/(drawer)/scan")
                
            })
            .catch((err) =>{
                // handle bad login probably just render a text element
                handleFirebaseAuthError(err.message)
                setRenderLoginError(true)

                
            })
            .finally(() =>{
                setIsLoading(false)
            })
    } 

    const handlePasswordReset = async (myEmail: string) =>{
        try{
            await sendPasswordResetEmail(auth, myEmail)
            return 0
        }
        catch(err){
            handleFirebaseAuthError(err.message)
            setRenderResetScreenError(true)
            return -1
        }
    }



    const renderLogin = (check: boolean) =>{
        setRenderSignUp(check)
        setRenderResetScreen(check)

        setRenderLoginError(false);
        setLoginError("");
    }   


    return(
        // 4D5AB0
        // #3E74FF
        // FFE294
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4d5ab0'}}>

        
        <View style={{height: '70%', width: '80%', backgroundColor: 'white', borderRadius: 20, justifyContent: 'space-between'}} accessible={true} accessibilityLabel='login form'> 
        
            {/* loading wheel */}
            {isLoading ? (
            <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
                <ActivityIndicator size={'large'} color={'blue'} />
            </View>
            
            // login form
            ) : (!renderSignUp && !renderResetScreen) ? (
                <View style={{flex: 1}} >
                    <View style={{marginTop: 10, height: "15%", justifyContent: "center", alignItems: "center"}}>
                        <Image source={require("../../assets/images/BrixColor-cropped.jpeg")} style={{height: "100%", resizeMode: "contain"}} />
                    </View>

                    {/* sign in and sign up text and button */}
                    <View style={{flex: 1, justifyContent: "flex-end", marginTop: 40}} >
                        {/* <View style={{backgroundColor: "yell", justifyContent: "flex-end"}} > */}
                            {/* <View style={{ justifyContent:"flex-end"}} > */}
                                <Text style={{textAlign: 'center', fontSize: 20, paddingTop: 5}} >
                                    Sign In
                                </Text>
                            {/* </View> */}
        
                            <View style={{height: "10%", flexDirection: "row"}} >
                                <View style={{flex: 1.2, flexDirection: "column", justifyContent:"flex-start"}} >
                                    <Text style={{textAlign: 'right', fontSize: 12, paddingRight: 2.5}} >
                                        No Account?
                                    </Text>
                                </View>
                                <View style={{flex: 1, flexDirection: "column"}} >
                                    <TouchableOpacity onPress={ () => {setRenderSignUp(true)}}>
                                        <Text style={{fontSize: 12, paddingLeft: 2.5, color: "blue"}}>
                                            Sign Up
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                            { /** renderEmailError && 
                                <View style={{flexGrow: 1, alignItems: "center"}} >
                                    <View style={{ marginTop: 10, width: "80%", alignItems: "center", height: null}} >
                                        <Text style={{textAlign: "center", color: "red"}} >Please Enter a Valid Email</Text>
                                    </View>
                                </View>
                            
                            **/}
                            {renderLoginError && 
                                <View style={{flexGrow: 1, alignItems: "center"}} >
                                    <View style={{marginTop: 10, width: "80%", alignItems: "center", height: null}} >
                                        <Text style={{textAlign: "center", color: "red"}}>{loginError}</Text>
                                    </View>
                                </View>
                            }
                        {/* </View> */}

                        {/* <View style={{flex: 1, justifyContent: "flex-end", just}} > */}
                            <View style={{height: "25%", alignItems: "center", justifyContent: "center"}} >
                                <TextInput placeholder='Email' onChangeText={(val) => {
                                    const trimVal = val.replace(/\s/g, '')
                                    setEmail(trimVal)
                                }} 
                                value={email} 
                                style={{height: "60%", width: '90%', textAlign: "center", borderColor: renderLoginError ? "#FF4D4D" : "#3E74FF", borderWidth: 1, borderRadius: 10}} 
                                accessible={true} 
                                accessibilityLabel='Username Input Field'
                                keyboardType="email-address"
                                returnKeyType='done'
                                />
                            </View>

                            
                            <View style={{height: "25%", alignItems: "center", justifyContent: "center"}} >
                                <TextInput 
                                    placeholder='Password' 
                                    onChangeText={(val) => {
                                        const trimVal = val.replace(/\s/g, '')
                                        setPassword(trimVal)
                                    }}  
                                    value={password} 
                                    style={{height: "60%", width: '90%', textAlign: "center", borderColor: renderLoginError ? "#FF4D4D" : "#3E74FF", borderWidth: 1, borderRadius: 10}} 
                                    accessible={true} 
                                    accessibilityLabel='Password Input Field' 
                                    secureTextEntry={showPass} 
                                    returnKeyType='done'
                                />
                            </View>
                        
                        <TouchableOpacity style={{flexGrow: 0, alignItems: "center"}} onPress={() =>{setRenderResetScreen(true)}}>
                            <Text style={{textAlign: "center", color: "#3E74FF", fontSize: 12}} >
                                Reset Password
                            </Text>
                        </TouchableOpacity>

                        <View style={{height: "15%"}} >
                            {password.length > 0 && <Button title={showPass ? 'Show Password': 'Hide Password'} onPress={() => {
                                setShowPass(!showPass)
                                }}
                            />}
                        </View>
                    </View>
                    
                    <View style={{flex: 0.8}} >
                        
                        <View style={{flex: 0.5, alignItems: "center"}} >
                        <Button title='Login' onPress={login} accessibilityLabel='Login Button' />
                        </View>
                    </View>
                </View>
            ) : (!renderSignUp && renderResetScreen) ?  (
                
                <ResetPage setRenderReset={renderLogin} handleReset={handlePasswordReset} renderLoginError={renderResetScreenError} loginError={loginError}/>
            ): 
            
            // sign in form

            <SignIn handleFirebaseAuthError={handleFirebaseAuthError} loginError={loginError} setRenderSignUp={renderLogin}/>
            
            }
        </View>
        
    </View>
    )
}

export default LoginPage;