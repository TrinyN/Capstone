import { Text, View } from 'react-native';
import styles from '../styles';
import { useLocalSearchParams } from 'expo-router';
import CustomDropdown from '../components/functional/CustomDropdown';
import CustomScreen from '../components/structural/CustomScreen';
import QuestionAnswer from '../components/functional/QuestionAnswer';
import CustomButton2 from '../components/functional/CustomButton2';
import {
    useDietPlanBooleanOptions,
    useDietPlanOptions,
    useWeightGoalOptions
} from '../constants/dropdownOptions';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';


// Function to handle the design and display of the Sign In 2 screen
const SignUp3 = () => {
    // gets info from sign up 2 page
    const params = useLocalSearchParams();
    const email = params.email
    const password = params.password
    const username = params.username
    const height = params.height
    const weight = params.weight
    // TODO still need birthdate and gender


    // TODO need to add dietplan, weight goal
    const [calGoal, setCalGoal] = useState(0);
    const [macroGoal, setMacroGoal] = useState(""); // change default value? ex: 20:30:30
    const [waterGoal, setWaterGoal] = useState(0); 
    const [dietPlanName, setDietPlanName] = useState(""); 

    // Handling user choice of diet plan or not
    const { userDietPlanBoolean, setUserDietPlanBoolean,
        dietPlanBoolean, setDietPlanBoolean } = useDietPlanBooleanOptions();

    // Handling user choice of diet plan
    const { userDietPlan, setUserDietPlan,
        dietPlan, setDietPlan } = useDietPlanOptions();

    // Handling user's weight goal answer
    const { userWeightGoal, setUserWeightGoal,
        weightGoal, setWeightGoal } = useWeightGoalOptions();

    const handleSignUp = async () => {
        try {
            const user = await auth().createUserWithEmailAndPassword(email, password); // add more fields to create user with
            alert('Registration Successful');
            const userID = user.user.uid

            await firestore().collection('Users').doc(userID).set({
                email: email, 
                username: username,
                height: height, 
                weight: weight, 
                calGoal: calGoal, 
                macroGoal: macroGoal, 
                waterGoal: waterGoal, 
                dietPlanName: dietPlanName
              });

            // const users = await firestore().collection('Users').get();

            // console.log(users)
        } catch (e) {
            alert('Registration failed: ' + e.message);
        }
    };
    return (
        <CustomScreen
            title='Your diet goals ...'
            info='Please fill in the following fields to set up your diet and goals.'
            hasBackButton={true}
            screenContent={
                // View to hold all of the questions and fields
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
                                value={dietPlanName}
                                setValue={setDietPlanName}
                            >
                            </QuestionAnswer>
                        </>
                    )}
                    {/* Daily Calories */}
                    <QuestionAnswer
                        type={'text'}
                        question={'How many calories per day?'}
                        placeholder={'2500'}
                        value={calGoal}
                        setValue={setCalGoal}
                        >
                    </QuestionAnswer>

                    {/* Macro Ratio */}
                    <QuestionAnswer
                        type={'text'}
                        question={'What macro ratio do you want?'}
                        placeholder={'35% Carb / 35% Protein / 30 % Fat'}
                        value={macroGoal}
                        setValue={setMacroGoal}
                        >
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
                        placeholder={'9 cups'}
                        value={waterGoal}
                        setValue={setWaterGoal}
                        >
                    </QuestionAnswer>

                    {/* Space between Questions and Submit */}
                    <View style={{ margin: 20 }}></View>

                    {/* Submit Button */}
                    <CustomButton2
                        type={'normal'}
                        text={'Done'}
                        // onPress={() => router.push('home')}
                        onPress={() => handleSignUp()}
                    >
                    </CustomButton2>
                </View>
            } />
    )
}
export default SignUp3;