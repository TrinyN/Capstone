import { TextInput, TouchableOpacity, Text, View } from 'react-native';
import styles from '../styles';
import Feather from "react-native-vector-icons/Feather";
import React, { useState } from 'react'
import CustomScreen from '../components/CustomScreen';
import CustomAuthButton from '../components/CustomAuthButton';

// REFACTORING FLAGGING - Needs a Component
// 1. Screen component - sign up and sign in are same screen
// 2. Screen header component
// 3. Add/Submit/Create button component
// 4. Spacing components - bewteen question list and create button
// 5. Question component? - shared between all signup screens and report
//      would contain the questions and answers (email and password included)

// Function to handle the design and display of the Sign Up screen
const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <CustomScreen
            title='So you are new?'
            info='Please choose a good email and safe password to get started!'
            screenContent={
                // {/* Cotent of screen */}
                <View style={{ flex: 5, paddingBottom: 100 }}>

                    {/* Q/A's for email and password */}
                    <View style={{ justifyContent: 'flex-start', paddingBottom: 100, flex: 1 }}>

                        {/* email */}
                        <Text style={styles.defaultText}>
                            Email:
                        </Text>
                        <TextInput style={styles.inputFieldStyle}
                            placeholder='your_email@gmail.com'
                            selectionColor='#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'>
                        </TextInput>

                        {/* password */}
                        <Text style={styles.defaultText}>
                            Password:
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput style={[styles.inputFieldStyle, { flex: 1 }]}
                                placeholder='password'
                                secureTextEntry={!showPassword}
                                selectionColor='#CB9CF2'
                                placeholderTextColor='rgba(242,244,243, 0.2)'
                            />
                            <TouchableOpacity style={{ width: 25, position: 'absolute', right: 10 }} onPress={() => setShowPassword(!showPassword)}>
                                <Feather name={!showPassword ? "eye" : "eye-off"} size={25} color='rgba(242,244,243,0.5)' />
                            </TouchableOpacity>
                        </View>

                        {/* <Text style={styles.defaultText}>
                                Confirm Password:
                            </Text>

                            <TextInput style={styles.inputFieldStyle}
                                placeholder='password'
                                secureTextEntry={true}> 
                            </TextInput> */}
                    </View>
                    <CustomAuthButton authType={"Sign Up"} />
                </View>
            } />
    )
}
export default SignUp;