import { View } from 'react-native';
import { router, useLocalSearchParams  } from 'expo-router';
import CustomScreen from '../components/structural/CustomScreen';
import QuestionAnswer from '../components/functional/QuestionAnswer';
import CustomButton2 from '../components/functional/CustomButton2';
import { useSexOptions } from '../constants/dropdownOptions';

// Function to handle the design and display of the Sign In 2 screen
const SignUp2 = () => {
    // Handle dropdown menu options for sex question
    const { userSex, setUserSex, sex, setSex } = useSexOptions();
    const params = useLocalSearchParams(); // Retrieve parameters
    const { email, password } = params; // Destructure email and password from params

    handleNext = () => {
        router.push({
            pathname: '/sign-up-3',
            params: {email:email, password:password} // add rest of fields to pass
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
                        onPress={handleNext}>
                    </CustomButton2>
                </View>
            }
        />
    )
}
export default SignUp2;