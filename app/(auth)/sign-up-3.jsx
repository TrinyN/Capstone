import { TextInput, TouchableOpacity, Text, View } from 'react-native';
import styles from '../styles';
import { router } from 'expo-router';
import { useState } from 'react';
import CustomDropdown from '../components/CustomDropdown';
import CustomScreen from '../components/CustomScreen';

// REFACTORING FLAGGING - Needs a Component
// 1. Screen component - sign up 2 and 3 and report all same
// 2. Screen header component
// 3. Add/Submit/Create button component
// 4. Spacing components - bewteen question list and create button
// 5. Question component? - shared between all signup screens and report
//      would contain the questions and answers (email and password included)

// Function to handle the design and display of the Sign In 2 screen
const SignUp3 = () => {
    const [userWeightGoal, setUserWeightGoal] = useState('')
    const [weightGoal, setWeightGoal] = useState([
        { label: 'Cut / Lose Weight', value: 'Cut / Lose Weight' },
        { label: 'Bulk / Gain Weight', value: 'Bulk / Gain Weight' },
        { label: 'Maintain', value: 'Maintain' },
    ]);

    const [userDietPlan, setUserDietPlan] = useState('')
    const [dietPlan, setDietPlan] = useState([
        { label: 'Keto', value: 'Keto' },
        { label: 'Vegan', value: 'Vegan' },
        { label: 'Vegetarian', value: 'Vegetarian' },
    ]);

    const [userDietPlanBoolean, setUserDietPlanBoolean] = useState(false)
    const [dietPlanBoolean, setDietPlanBoolean] = useState([
        { label: 'Yes', value: true },
        { label: 'No', value: false },
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

                    {/* if user chose yes to a diet plan, render approriate text inputs */}
                    {userDietPlanBoolean && (
                        <>
                            {/* Diet Plan Type question and options */}
                            <Text style={styles.defaultText}>
                                Which diet plan would you like?
                            </Text>

                            <View style={[{ zIndex: 2 }]}>
                                <CustomDropdown
                                    placeholder={''}
                                    setCustomValue={setUserDietPlan}
                                    items={dietPlan}
                                    setItems={setDietPlan}
                                />

                            </View>

                            {/* Diet Name question and field */}
                            <Text style={styles.defaultText}>
                                Custom diet name? (optional)
                            </Text>
                            <TextInput style={styles.inputFieldStyle}
                                selectionColor='#CB9CF2'
                                placeholderTextColor='rgba(242,244,243, 0.2)'
                                placeholder='My Diet Plan'>
                            </TextInput>
                        </>
                    )}
                    {/* Daily Calories question and field */}
                    <Text style={styles.defaultText}>
                        How many calories per day?
                    </Text>
                    <TextInput style={styles.inputFieldStyle}
                        selectionColor='#CB9CF2'
                        placeholderTextColor='rgba(242,244,243, 0.2)'
                        placeholder='2500'>
                    </TextInput>

                    {/* Macro Ratio question and field */}
                    <Text style={styles.defaultText}>
                        What macro ratio do you want?
                    </Text>
                    <TextInput style={styles.inputFieldStyle}
                        selectionColor='#CB9CF2'
                        placeholderTextColor='rgba(242,244,243, 0.2)'
                        placeholder='35% Carb / 35% Protein / 30% Fat'>
                    </TextInput>

                    {/* Weight Goal question and field */}
                    <Text style={styles.defaultText}>
                        What is your weight goal?
                    </Text>
                    <View style={[{ zIndex: 1 }]}>
                        <CustomDropdown
                            placeholder={''}
                            setCustomValue={setUserWeightGoal}
                            items={weightGoal}
                            setItems={setWeightGoal}
                        />
                    </View>

                    {/* Water Goal question and field */}
                    <Text style={styles.defaultText}>
                        What is your water goal?
                    </Text>
                    <TextInput style={styles.inputFieldStyle}
                        selectionColor='#CB9CF2'
                        placeholderTextColor='rgba(242,244,243, 0.2)'
                        placeholder='9 cups'>
                    </TextInput>

                    {/* Submit Button */}
                    <View style={{ justifyContent: 'flex-end', paddingTop: 40, paddingBottom: 10 }}>
                        <TouchableOpacity style={styles.button} onPress={() => router.push('home')}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            } />
    )
}
export default SignUp3;