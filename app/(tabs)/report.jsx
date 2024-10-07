import { View } from 'react-native';
import { router } from 'expo-router';
import CustomScreen from '../components/CustomScreen';
import CustomButton2 from '../components/CustomButton2';
import QuestionAnswer from '../components/QuestionAnswer';
// TODO: change so placeholders match users info
// Function to handle the design of the Reports screen of CaloNavo

// REFACTORING FLAGGING - Needs a Component
// 1. Screen component - sign up 2 and 3 and report all same
// 2. Screen header component
const Report = () => {

    return (
        <CustomScreen
            title="Report"
            info = "Help us double check everything to set up your PDF report!"
            screenContent={
                // {/* View that holds all of the questions and fields */ }
                < View style={{ flex: 5, paddingBottom: 20}}>

                    {/* Questions */}
                    {/* Diet plan question and field */}
                    <QuestionAnswer
                        type={'text'}
                        question={'What is your diet plan?'}
                        placeholder={'Keto'}>
                    </QuestionAnswer>

                    {/* Calorie goal question and field */}
                    <QuestionAnswer
                        type={'text'}
                        question={'What is your daily calorie goal?'}
                        placeholder={'2,500'}>
                    </QuestionAnswer>

                    {/* Water goal question and field */}
                    <QuestionAnswer
                        type={'text'}
                        question={'What is your daily water goal?'}
                        placeholder={'9 cups'}>
                    </QuestionAnswer>

                    {/* Weight question and field */}
                    <QuestionAnswer
                        type={'text'}
                        question={'What is your weight goal?'}
                        placeholder={'Cut / Lose'}>
                    </QuestionAnswer>

                    {/* Space between Questions and Submit */}
                    <View style={{ margin: 20 }}></View>

                    {/* Submit Button */}
                    <CustomButton2
                        type={'normal'}
                        text={'Create PDF'}
                        onPress={() => router.push('/home')}>
                    </CustomButton2>
                </View>
            }
        />
    )
}
export default Report;