import React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native'

interface Props {
    setRenderReset: Function,
    handleReset: Function,
    renderLoginError: boolean,
    loginError: string
}

const ResetPage: React.FC<Props> = ({setRenderReset, handleReset, renderLoginError, loginError}) => {

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [renderEmailError, setRenderEmailError] = useState(false);
    

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
                </View>


                {/* body */}
                <View style={{flex: 3, justifyContent: "center"}}>

                    {/* page subtitle */}
                    <Text style={{textAlign: 'center', fontSize: 20, paddingTop: 5}}>
                            Reset Password
                    </Text>

                    {/* header text and log in button */}
                    <View style={{height: "10%", flexDirection: "row"}} >
                        <View style={{flex: 1.25, flexDirection: "column", justifyContent:"flex-start"}} >
                            <Text style={{textAlign: 'right', fontSize: 12, paddingRight: 2.5}} >
                                Remembered? 
                            </Text>
                        </View>

                        {/* Go back button */}
                        <View style={{flex: 1, flexDirection: "column"}} >
                            <TouchableOpacity onPress={ () => {setRenderReset(false)}} accessibilityLabel='Go Back Button'>
                                <Text style={{fontSize: 12, paddingLeft: 2.5, color: "blue"}}>
                                    Go Back
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>

 
                    {renderEmailError && 
                        <View style={{alignItems: "center", flexGrow: 0, justifyContent: "flex-end"}} >
                            <View style={{marginVertical: 0, width: "80%", alignItems: "center", height: null}} >
                                <Text style={{textAlign: "center", color: "red", fontSize: 12}} >Please Enter a Valid Email Address</Text>
                            </View>
                        </View>
                
                    }

                    {renderLoginError && 
                        <View style={{alignItems: "center", flexGrow: 0, justifyContent: "flex-end"}} >
                            <View style={{marginVertical: 0, width: "80%", alignItems: "center", height: null}} >
                                <Text style={{textAlign: "center", color: "red", fontSize: 12}} >
                                    {loginError}
                                </Text>
                            </View>
                        </View>
                
                    }

                    {/* email field */}
                    <View style = {{flex: 1}}>

                        
                        <View style={{height: "10%", alignItems: "center", justifyContent: "center", marginBottom: 20}} >
                            <TextInput placeholder='Email' onChangeText={(val) => {
                                const trimVal = val.replace(/\s/g, '')
                                setEmail(trimVal)
                            }} 
                            value={email} 
                            style={{height: "100%", width: '90%', textAlign: "center", borderColor: (renderEmailError)? "#FF4D4D" : "#3E74FF", borderWidth: 1, borderRadius: 10}} 
                            accessible={true} 
                            accessibilityLabel='Email Input Field'
                            keyboardType="email-address"
                            returnKeyType='done'
                            />
                        </View>



                        {/* create account container and button */}
                                <TouchableOpacity onPress={async () => {
                                    const emailregex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/

                                    if (!emailregex.test(email)){
                                        setRenderEmailError(true);
                                        return;
                                    }

                                    if (renderEmailError){
                                        setRenderEmailError(false);
                                    }

                                    const val = await handleReset(email)

                                    // error returned
                                    if (val < 0){
                                        return;
                                    }
                                    else{
                                        setRenderReset(false)
                                    }
                                    
                                    }} 
                                    accessibilityLabel='Submit Button'>
                                    <Text style={{textAlign: "center", fontSize: 20, color: "blue"}} >
                                        Reset Password
                                    </Text>
                                </TouchableOpacity>
                    </View>
                </View>
        </View>)}
           
        </View>

    )
} 
export default ResetPage;
