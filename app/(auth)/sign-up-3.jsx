import { TextInput, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import { router } from 'expo-router';
import Feather from "react-native-vector-icons/Feather";
import { useState } from 'react';
import CustomDropdown from '../components/CustomDropdown';





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
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                {/* Top bar holding the back button */}
                <View style={{ marginTop: 40, marginBottom: 10, paddingLeft: 25 }}>
                    <TouchableOpacity style={{ width: 35 }} onPress={() => router.back()}>
                        <Feather name="chevron-left" size={35} color="#F2F4F3" />
                    </TouchableOpacity>
                </View>

                {/* The "body" of the screen, including its major elements */}
                <View style={[styles.viewContainer, { flex: 1 }]}>

                    {/* Screen header */}
                    <View style={{ marginTop: 30, flex: 1 }}>
                        <Text style={[styles.titleText, { paddingBottom: 10 }]}>
                            Your diet goals ...
                        </Text>
                        <Text style={[styles.defaultWhiteText, { fontSize: 20 }]}>
                            Please fill in the following fields to set up your diet and goals.
                        </Text>
                    </View>

                    {/* View to hold all of the questions and fields */}
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
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default SignUp3;