import { useState } from 'react';
import { View, Text, TouchableOpacity, Button, TextInput } from 'react-native'
import { auth } from "../../services/firebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'expo-router';



const LoginPage = () =>{
    const router = useRouter()
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [UID, setUID] = useState("")
    const [emailError, setEmailError] = useState()
    const [passError, setPassError] = useState()
    const [showPass, setShowPass] = useState(true)
    
    const validateEmailPass = () =>{
        const emailregex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,}$/

        let checkEmail = true
        let checkPassword = true

        if (!emailregex.test(email)){
            checkEmail = false
        }
        
        if (!passRegex.test(password)){
            checkPassword = false
        }


        return {'email': checkEmail, 'password': checkPassword}
    }
    
    const login = () =>{
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // store info and update state
                console.log(userCredential)
                router.back()
                
            })
            .catch((err) =>{
                // handle bad login probably just render a text element
                console.error(err)
            })
    }

    const signup = () =>{
        const check = validateEmailPass()
        if (!check['email']){
            // render text element that says something
        }
        if (!check['password']){
            // render text element that says something
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // logged in successfully
                // store info and update state
                console.log(userCredential);
                router.back()
            })
            .catch((err) =>{
                // serve error message and re-try
                console.error(err)
            })
    }



    return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4D5AB0'}}>
       
        {/* <TouchableOpacity onPress={login} style={{height: '70%', width: '80%', backgroundColor: 'red', borderRadius: 20}}> 

        </TouchableOpacity> */}

        <View style={{height: '70%', width: '80%', backgroundColor: 'red', borderRadius: 20, justifyContent: 'space-between'}} accessible={true} accessibilityLabel='login form'> 

        <TextInput placeholder='Email' onChangeText={(val) => {
            const trimVal = val.replace('/\s/g', '')
            setEmail(trimVal)}} 
            value={email} 
            style={{height: "30%", width: '90%', textAlign: "center"}} 
            accessible={true} 
            accessibilityLabel='Username Input Field'
            keyboardType="email-address"
            returnKeyType='done'
            
        />
        
        <TextInput placeholder='Password' onChangeText={(val) => setPassword(val)} value={password} style={{height: "30%", width: '90%', textAlign: "center"}} accessible={true} accessibilityLabel='Password Input Field' secureTextEntry={showPass} returnKeyType='done'/>
        <Button title='show password' onPress={() => {setShowPass(!showPass)}}/>


        <Button title='login' onPress={login} accessibilityLabel='Login Button' />
        <Button title='sign up' onPress={signup} accessibilityLabel='Sign Up Button'/>

        </View>


    </View>

    )
}

export default LoginPage;