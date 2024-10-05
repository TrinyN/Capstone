import { TextInput, TouchableOpacity, Text, View } from 'react-native';
import styles from '../styles';
import { router } from 'expo-router';
import CustomDatePicker from '../components/CustomDatePicker';
import CustomDropdown from '../components/CustomDropdown';
import { useState } from 'react';
import CustomScreen from '../components/CustomScreen';
import QuestionAnswer from '../components/QuestionAnswer';
import CustomButton2 from '../components/CustomButton2';

// REFACTORING FLAGGING - Needs a Component
// 1. Screen component - sign up 2 and 3 and report all same
// 2. Screen header component

// Function to handle the design and display of the Sign In 2 screen
const SignUp2 = () => {

    // Handle dropdown menu options for sex question
    const [userSex, setUserSex] = useState('')
    const [sex, setSex] = useState([
        { label: 'Female', value: 'Female' },
        { label: 'Male', value: 'Male' },
    ]);
    
    return (
        <CustomScreen
            title='First things first ...'
            info='Please let us know a little about yourself to get things going!'
            hasBackButton={true}
            screenContent={
                // {/* View to hold all of the questions and fields */}
                <View style={{ flex: 5, paddingBottom: 100 }}>

                    {/* Question/Answer fields*/}
                    {/* Name */}
                    <QuestionAnswer
                        type={'text'}
                        question={'Do you have a preferred name?'}
                        placeholder={'John Smith'}>
                    </QuestionAnswer>

                    {/* Birthdate */}
                    <QuestionAnswer
                        type={'date'}
                        placeholder={'When were you born?'}
                        hasTitle={true}>
                    </QuestionAnswer>

                    {/* Height */}
                    <QuestionAnswer
                        type={'text'}
                        question={'How tall are you?'}
                        placeholder={'5 ft 12 in'}>
                    </QuestionAnswer>

                    {/* Weight */}
                    <QuestionAnswer
                        type={'text'}
                        question={'How much do you weigh?'}
                        placeholder={'125 lbs'}>
                    </QuestionAnswer>

                    {/* Sex */}
                    <QuestionAnswer
                        type={'dropdown'}
                        question={'What is your sex?'}
                        placeholder={''}
                        setCustomValue={setUserSex}
                        items={sex}
                        setItems={setSex}>
                    </QuestionAnswer>

                    {/* Space between Questions and Submit */}
                    <View style={{ margin: 20 }}></View>

                    {/* Submit Button */}
                    <CustomButton2 
                        type='normal' 
                        text='Continue'
                        onPress={() => router.push('sign-up-3')}>
                    </CustomButton2>
                </View>
            }
        />
    )
}
export default SignUp2;