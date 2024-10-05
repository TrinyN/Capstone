import { Image, TextInput, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import { router } from 'expo-router';
import Feather from "react-native-vector-icons/Feather";
import React, { useState } from 'react';
import CustomButton2 from '../components/CustomButton2';
import QuestionAnswer from '../components/QuestionAnswer';
import CustomScreen from '../components/CustomScreen';
import CustomAuthButton from '../components/CustomAuthButton';

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
        <CustomScreen
            title='Glad to see you again!'
            hasBackButton={true}
            screenContent={

                // {/* View to hold prompts and fields at top and buttons on bottom */}
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

                    <CustomAuthButton authType={"Log In"}/>

                </View>
            }
        >

        </CustomScreen>
    )
}
export default SignIn;