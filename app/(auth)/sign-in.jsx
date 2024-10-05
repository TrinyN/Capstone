import { Image, TextInput, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import { router } from 'expo-router';
import Feather from "react-native-vector-icons/Feather";
import React, { useState } from 'react';
import CustomButton2 from '../components/CustomButton2';
import QuestionAnswer from '../components/QuestionAnswer';

// REFACTORING FLAGGING - Needs a Component
// 1. Screen component - sign up and sign in are same screen
// 2. Screen header component
// 3. Add/Submit/Create button component
// 4. Spacing components - bewteen question list and create button
// 5. Question component? - shared between all signup screens and report
//      would contain the questions and answers (email and password included)

//  Function to handle the design and display of the Sign In screen
const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                {/* Top bar holding the back button */}
                <View style={{ marginTop: 40, paddingLeft:25 }}>
                    <TouchableOpacity style={{width:35}} onPress={() => router.push('')}>
                        <Feather name="chevron-left" size={35} color="#F2F4F3" />
                    </TouchableOpacity>
                </View>

                {/* The "body" of the screen, including its major elements */}
                <View style={[styles.viewContainer, { flex: 1 }]}>
                    
                    {/* Screen header */}
                    <View style={{ marginTop: 30, flex: 1 }}>
                        <Text style={styles.titleText}>
                            Glad to see you again!
                        </Text>
                    </View>

                    {/* View to hold prompts and fields at top and buttons on bottom */}
                    <View style={{ flex: 5, paddingBottom: 100 }}>

                        {/* View to hold the Email and Password prompts and fields */}
                        <View style={{ justifyContent: 'flex-start', paddingBottom: 100, flex: 1 }}>
                            {/* Email prompt and field */}
                            <QuestionAnswer type='text'
                                question='Email:'
                                placeholder='your_email@gmail.com'>
                            </QuestionAnswer>

                            {/* Password prompt and field */}
                            <QuestionAnswer type='text'
                                question='Password:'
                                placeholder='password'>
                            </QuestionAnswer>
                        </View>

                        {/* View to hold the buttons at the bottom */}
                        <View style={{ justifyContent: 'flex-end', paddingBottom: 10, flex: 1 }}>

                            {/* Log In button; Need to add verify password and stuff to allow onpress */}
                            <CustomButton2 type='normal' 
                                text='Log In'
                                onPress={ () => { router.push('/home')}}>
                            </CustomButton2>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#CB9CF2' }} />
                                {/* Divider between buttons */}
                                <Text style={[styles.smallText, { color: '#CB9CF2', paddingHorizontal: 10 }]}>
                                    or continue with
                                </Text>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#CB9CF2' }} />
                            </View>

                            {/* Google button */}
                            <CustomButton2 type='google' 
                                text='Google'
                                onPress={ () => { router.push('/home') }}>
                            </CustomButton2>

                            {/* Disclaimers, policies */}
                            <Text style={[styles.smallText, { fontSize: 12, color: '#828282' }]}>
                                By clicking continue, you agree to our{' '}
                                <Text style={{ color: '#F2F4F3' }}>
                                    Terms of Service{' '}
                                </Text>
                                <Text>
                                    and{' '}
                                </Text>
                                <Text style={{ color: '#F2F4F3' }}>
                                    Privacy Policy
                                </Text>
                            </Text>

                            {/* Reroute to Sign Up */}
                            <Text style={[styles.smallText, {}]}>
                                Don't have an account?{' '}

                                <Text onPress={ () => { router.push('/sign-up') } }>

                                    <Text style={{ color: '#CB9CF2', textDecorationLine: "underline" }}>
                                        Sign Up
                                    </Text>
                                </Text>

                            </Text>
                            
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default SignIn;