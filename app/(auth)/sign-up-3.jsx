import { TextInput, TouchableOpacity, Text, View } from 'react-native';
import styles from '../styles';
import { router } from 'expo-router';
import { useState } from 'react';
import CustomDropdown from '../components/CustomDropdown';
import CustomScreen from '../components/CustomScreen';
import QuestionAnswer from '../components/QuestionAnswer';
import CustomButton2 from '../components/CustomButton2';

// REFACTORING FLAGGING - Needs a Component
// 1. Screen component - sign up 2 and 3 and report all same
// 2. Screen header component

// Function to handle the design and display of the Sign In 2 screen
const SignUp3 = () => {
    // Handling user choice of diet plan or not
    const [userDietPlanBoolean, setUserDietPlanBoolean] = useState(false)
    const [dietPlanBoolean, setDietPlanBoolean] = useState([
        { label: 'Yes', value: true },
        { label: 'No', value: false },
    ]);
    // Handling user choice of diet plan
    const [userDietPlan, setUserDietPlan] = useState('')
    const [dietPlan, setDietPlan] = useState([
        { label: 'Keto', value: 'Keto' },
        { label: 'Vegan', value: 'Vegan' },
        { label: 'Vegetarian', value: 'Vegetarian' },
    ]);
    // Handling user's weight goal answer
    const [userWeightGoal, setUserWeightGoal] = useState('')
    const [weightGoal, setWeightGoal] = useState([
        { label: 'Cut / Lose Weight', value: 'Cut / Lose Weight' },
        { label: 'Bulk / Gain Weight', value: 'Bulk / Gain Weight' },
        { label: 'Maintain', value: 'Maintain' },
    ]);

    return (
        <CustomScreen
            title='Your diet goals ...'
            info='Please fill in the following fields to set up your diet and goals.'
            hasBackButton={true}
            screenContent={

                // {/* View to hold all of the questions and fields */}
                <View style={{ flex: 5, paddingBottom: 100 }}>
                    {/* Questions */}

                    {/* MARKED FOR REMOVAL AFTER CONFLICT FIGURED OUT */}
                    {/* Diet Plan question and field */}
                    <Text style={styles.defaultText}>
                        Would you like a diet plan?
                    </Text>

                    <View style={[{ zIndex: 3 }]}>
                        <CustomDropdown
                            placeholder={''}
                            setCustomValue={setUserDietPlanBoolean}
                            items={dietPlanBoolean}
                            setItems={setDietPlanBoolean}
                        />
                    </View>
                    {/* MARKED FOR ADDITION AFTER CONFLICT FIGURED OUT */}
                    {/* <QuestionAnswer
                        type={'dropdown'}
                        question={'Would you like a diet plan?'}
                        placeholder={''}>
                        setCustomValue={setUserDietPlanBoolean}
                        items={dietPlanBoolean}
                        setItems={setDietPlanBoolean}
                    </QuestionAnswer> */}

                    {/* if user chose yes to a diet plan, render approriate text inputs */}
                    {userDietPlanBoolean.valueOf() && (
                        <>
                            {/* Diet Plan Type question and options */}
                            <QuestionAnswer
                                type={'dropdown'}
                                question={'Which diet plan would you like?'}
                                placeholder={''}
                                setCustomValue={setUserDietPlan}
                                items={dietPlan}
                                setItems={setDietPlan}>
                            </QuestionAnswer>

                            {/* Diet Name question and field */}
                            <QuestionAnswer
                                type='text'
                                question='Custom diet name? (optional)'
                                placeholder={'My Diet Plan'}
                                >
                            </QuestionAnswer>
                        </>
                    )}
                    {/* Daily Calories */}
                    <QuestionAnswer
                        type={'text'}
                        question={'How many calories per day?'}
                        placeholder={'2500'}>
                    </QuestionAnswer>

                    {/* Macro Ratio */}
                    <QuestionAnswer
                        type={'text'}
                        question={'What macro ratio do you want?'}
                        placeholder={'35% Carb / 35% Protein / 30 % Fat'}>
                    </QuestionAnswer>

                    {/* Weight Goal */}
                    <QuestionAnswer
                        type={'dropdown'}
                        question={'What is your weight goal?'}
                        placeholder={''}
                        setCustomValue={setUserWeightGoal}
                        items={weightGoal}
                        setItems={setWeightGoal}>
                    </QuestionAnswer>

                    {/* Water Goal */}
                    <QuestionAnswer
                        type={'text'}
                        question={'What is your water goal?'}
                        placeholder={'9 cups'}>
                    </QuestionAnswer>

                    {/* Space between Questions and Submit */}
                    <View style={{ margin: 20 }}></View>

                    {/* Submit Button */}
                    <CustomButton2
                        type={'normal'}
                        text={'Done'}
                        onPress={() => router.push('home')}>
                    </CustomButton2>
                </View>
            } />
    )
}
export default SignUp3;