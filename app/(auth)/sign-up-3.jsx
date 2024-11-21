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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Formik } from 'formik';
import * as yup from 'yup'

// TODO: add weightgoal, dietplan, maybe dietplanboolean (weird bc all dropdown)
const validationSchema = yup.object({
    calGoal: yup.number().positive('Calorie Goal must be a positive number'), // idk if should be required or not
    // weightGoal: yup.string().required('Date of Birth is Required'), // change to date instead of string?
    waterGoal: yup.number().positive('Water Goal must be a positive number').nullable(),
    // dietPlan: yup.string().required("Weight is Required"),
    dietPlanName: yup.string().nullable(),
    macroGoal: yup.string().nullable().matches(
        /^\d{1,3}\s*(:\s*\d{1,3}){2}$/, // allows number:number:number, ignore spaces, 3 digits at most for each number
        'Macro Ratio must be in the format carb:protein:fat eg: 20:40:30'
    ),
});

// Function to handle the design and display of the Sign In 2 screen
const SignUp3 = () => {
    // gets info from sign up 2 page
    const params = useLocalSearchParams();
    const email = params.email
    const password = params.password
    const username = params.username
    const height = params.height
    const weight = params.weight
    const sex = params.userSex
    const dateOfBirth = params.dateOfBirth

    // Handling user choice of diet plan or not
    const { userDietPlanBoolean, setUserDietPlanBoolean,
        dietPlanBoolean, setDietPlanBoolean } = useDietPlanBooleanOptions();

    // Handling user choice of diet plan
    const { userDietPlan, setUserDietPlan,
        dietPlan, setDietPlan } = useDietPlanOptions();

    // Handling user's weight goal answer
    const { userWeightGoal, setUserWeightGoal,
        weightGoal, setWeightGoal } = useWeightGoalOptions();

    const handleSignUp = async (values) => {
        let { calGoal, macroGoal, waterGoal, dietPlanName } = values; // add rest of fields

        try {
            const user = await auth().createUserWithEmailAndPassword(email, password);
            const userID = user.user.uid
            if (macroGoal == '') {
                macroGoal = '30:30:30';  // Set default value
            }
            await firestore().collection('Users').doc(userID).set({
                email: email,
                username: username,
                sex: sex,
                dateOfBirth: dateOfBirth,
                height: height,
                weight: weight,
                calGoal: calGoal,
                macroGoal: macroGoal,
                waterGoal: waterGoal,
                weightGoal: userWeightGoal,
                dietPlanName: dietPlanName,
                dietPlan: userDietPlan,
            });

            alert('Registration Successful');

            // creates Tracker collection with documents for all days of 3 months, each with notes and water field
            const trackerRef = firestore().collection('Users').doc(userID).collection('Tracker');
            const currDate = new Date() // current day

            for (let i = 0; i < 3; i++) { // loops for 3 months
                const month = (currDate.getMonth() + i) % 12 // month cycles between 0 and 11
                const year = currDate.getFullYear() + Math.floor((currDate.getMonth() + i) / 12) // adjust year if month exceeds 12
                const daysInMonth = new Date(year, month + 1, 0).getDate() // get last day in month
                for (let day = 1; day <= daysInMonth; day++) { // create document for all days of the month
                    const date = new Date(year, month, day)
                    // format date like: 01-23-2024
                    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${date.getFullYear()}`;
                    // create document with ID as formatted date and create notes and water field
                    await trackerRef.doc(formattedDate).set({
                        notes: "",
                        water: 0
                    });
                }
            }
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
                <Formik
                    initialValues={{ calGoal: '', waterGoal: '', dietPlanName: '', macroGoal: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSignUp}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
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
                                    placeholder={'No'}
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
                                        onBlur={handleBlur('dietPlanName')}
                                        setValue={handleChange('dietPlanName')}
                                        errors={errors.dietPlanName}
                                    >
                                    </QuestionAnswer>
                                </>
                            )}
                            {/* Daily Calories */}
                            <QuestionAnswer
                                type={'text'}
                                question={'How many calories per day?'}
                                placeholder={'2500'}
                                isNum={true}
                                onBlur={handleBlur('calGoal')}
                                setValue={handleChange('calGoal')}
                                errors={errors.calGoal}
                            >
                            </QuestionAnswer>

                            {/* Macro Ratio */}
                            <QuestionAnswer
                                type={'text'}
                                question={'What macro ratio do you want?'}
                                placeholder={'35% Carb : 35% Protein : 30% Fat'}
                                isNum={true}
                                onBlur={handleBlur('macroGoal')}
                                setValue={handleChange('macroGoal')}
                                errors={errors.macroGoal}

                            >
                            </QuestionAnswer>

                            {/* Weight Goal */}
                            <QuestionAnswer
                                type={'dropdown'}
                                question={'What is your weight goal?'}
                                placeholder={'Maintain'}
                                setCustomValue={setUserWeightGoal}
                                items={weightGoal}
                                setItems={setWeightGoal}>
                            </QuestionAnswer>

                            {/* Water Goal */}
                            <QuestionAnswer
                                type={'text'}
                                question={'What is your water goal?'}
                                placeholder={'9 cups'}
                                onBlur={handleBlur('waterGoal')}
                                setValue={handleChange('waterGoal')}
                                errors={errors.waterGoal}
                                isNum={true}
                            >
                            </QuestionAnswer>

                            {/* Space between Questions and Submit */}
                            <View style={{ margin: 20 }}></View>

                            {/* Submit Button */}
                            <CustomButton2
                                type={'normal'}
                                text={'Done'}
                                onPress={handleSubmit}
                            >
                            </CustomButton2>
                        </View>
                    )}
                </Formik>
            } />
    )
}
export default SignUp3;