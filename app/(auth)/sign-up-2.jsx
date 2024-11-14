import { View } from 'react-native';
import { router, useLocalSearchParams  } from 'expo-router';
import CustomScreen from '../components/structural/CustomScreen';
import QuestionAnswer from '../components/functional/QuestionAnswer';
import CustomButton2 from '../components/functional/CustomButton2';
import { useSexOptions } from '../constants/dropdownOptions';
import { useState } from 'react';

// Function to handle the design and display of the Sign In 2 screen
const SignUp2 = () => {
    // Handle dropdown menu options for sex question
    const { userSex, setUserSex, sex, setSex } = useSexOptions();
    // gets email and password from sign up page
    const params = useLocalSearchParams(); 
    const { email, password } = params; 

    const [username, setUsername] = useState("");
    const [height, setHeight] = useState(0); // change default value?
    const [weight, setWeight] = useState(0); // change default value?
    const [dateOfBirth, setDateOfBirth] = useState(false)

    handleNext = () => {
        router.push({
            pathname: '/sign-up-3',
            params: {email:email, password:password, username: username, height: height, weight: weight, userSex: userSex, dateOfBirth: dateOfBirth} // add birthdate
        });
    }
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
                        placeholder={'John Smith'}
                        value={username}
                        setValue={setUsername}
                        >
                    </QuestionAnswer>

                    {/* Birthdate */}
                    <QuestionAnswer
                        type={'date'}
                        placeholder={'When were you born?'}
                        hasTitle={true}
                        setValue={setDateOfBirth}
                        >
                    </QuestionAnswer>

                    {/* Height */}
                    <QuestionAnswer
                        type={'text'}
                        question={'How tall are you?'}
                        placeholder={'5 ft 12 in'}
                        value={height}
                        setValue={setHeight}
                        isNum={true}>
                    </QuestionAnswer>

                    {/* Weight */}
                    <QuestionAnswer
                        type={'text'}
                        question={'How much do you weigh?'}
                        placeholder={'125 lbs'}
                        value={weight}
                        setValue={setWeight}
                        isNum={true}>
                    </QuestionAnswer>

                    {/* Sex */}
                    <QuestionAnswer
                        type={'dropdown'}
                        question={'What is your sex?'}
                        placeholder={''}
                        setCustomValue={setUserSex}
                        items={sex}
                        setItems={setSex}
                        >
                    </QuestionAnswer>

                    {/* Space between Questions and Submit */}
                    <View style={{ margin: 20 }}></View>

                    {/* Submit Button */}
                    <CustomButton2 
                        type='normal' 
                        text='Continue'
                        onPress={handleNext}>
                    </CustomButton2>
                </View>
            }
        />
    )
}
export default SignUp2;