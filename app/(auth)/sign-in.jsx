import { View } from 'react-native';
import React, { useState } from 'react';
import QuestionAnswer from '../components/functional/QuestionAnswer';
import CustomScreen from '../components/structural/CustomScreen';
import CustomAuthButton from '../components/functional/CustomAuthButton';

// REFACTORING FLAGGING - Needs a Component
// 1. Screen component - sign up and sign in are same screen
// 2. Screen header component
// 3. Add/Submit/Create button component
// 4. Spacing components - bewteen question list and create button
// 5. Question component? - shared between all signup screens and report
//      would contain the questions and answers (email and password included)

//  Function to handle the design and display of the Sign In screen
const SignIn = () => {

    return (
        <CustomScreen
            title='Glad to see you again!'
            screenContent={

                // {/* View to hold prompts and fields at top and buttons on bottom */}
                <View style={{ flex: 5, paddingBottom: 100 }}>

                    {/* View to hold the Email and Password prompts and fields */}
                    <View style={{ justifyContent: 'flex-start', paddingBottom: 100, flex: 1 }}>
                            {/* Email prompt and field */}
                            <QuestionAnswer type='text'
                                question='Email:'
                                placeholder='your_email@gmail.com' />

                            {/* Password prompt and field */}
                            <QuestionAnswer type='password' question='Password:' />
                        </View>
                    {/* Component for log in buttons, discretion statement and link to sign up page */}
                    <CustomAuthButton authType={"Log In"}/>

                </View>
            }
        >

        </CustomScreen>
    )
}
export default SignIn;