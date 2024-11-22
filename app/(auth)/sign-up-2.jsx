import { View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import CustomScreen from '../components/structural/CustomScreen';
import QuestionAnswer from '../components/functional/QuestionAnswer';
import CustomButton2 from '../components/functional/CustomButton2';
import { useSexOptions } from '../constants/dropdownOptions';
import { Formik } from 'formik';
import * as yup from 'yup'

// gender is defaulted to Male, no input val needed
const validationSchema = yup.object({
    name: yup.string().nullable(),
    birthDate: yup.string().required('Birthdate is required'), // change to date instead of string?
    height: yup.number().positive('Height must be a positive number').required("Height is required"),
    weight: yup.number().positive('Weight must be a positive number').required("Weight is required"),
});

// Function to handle the design and display of the Sign In 2 screen
const SignUp2 = () => {
    // Handle dropdown menu options for sex question
    const { userSex, setUserSex, sex, setSex } = useSexOptions();
    // gets email and password from sign up page
    const params = useLocalSearchParams();
    const { email, password } = params;

    const handleNext = (values) => {
        const { name, height, weight, birthDate} = values; // add rest of fields
        router.push({
            pathname: '/sign-up-3',
            params: { email: email, password: password, username: name, height: height, weight: weight, userSex: userSex, dateOfBirth: birthDate } // change to sex
        });
    }
    return (
        <CustomScreen
            title='First things first ...'
            info='Please let us know a little about yourself to get things going!'
            hasBackButton={true}
            screenContent={
                <Formik
                    initialValues={{ name: '', height: '', weight: '', sex: '', birthDate: ''  }}
                    validationSchema={validationSchema}
                    onSubmit={handleNext}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                        // {/* View to hold all of the questions and fields */}
                        <View style={{ flex: 5, paddingBottom: 100 }}>

                            {/* Question/Answer fields*/}
                            {/* Name */}
                            <QuestionAnswer
                                type={'text'}
                                question={'Do you have a preferred name? (optional)'}
                                placeholder={'John'}
                                onBlur={handleBlur('name')}
                                setValue={handleChange('name')}
                                errors={errors.name}
                            >
                            </QuestionAnswer>

                            {/* Birthdate */}
                            <QuestionAnswer
                                type={'date'}
                                placeholder={'When were you born?'}
                                hasTitle={true}
                                setValue={handleChange('birthDate')}
                                errors={errors.birthDate}
                                onBlur={handleBlur('birthDate')}
                            >
                            </QuestionAnswer>

                            {/* Height */}
                            <QuestionAnswer
                                type={'text'}
                                question={'How tall are you? (cm)'}
                                placeholder={'162 cm'}
                                onBlur={handleBlur('height')}
                                setValue={handleChange('height')}
                                errors={errors.height}
                                isNum={true}>
                            </QuestionAnswer>

                            {/* Weight */}
                            <QuestionAnswer
                                type={'text'}
                                question={'How much do you weigh? (lbs)'}
                                placeholder={'125 lbs'}
                                onBlur={handleBlur('weight')}
                                setValue={handleChange('weight')}
                                errors={errors.weight}
                                isNum={true}>
                            </QuestionAnswer>

                            {/* Sex */}
                            <QuestionAnswer
                                type={'dropdown'}
                                question={'What is your sex?'}
                                placeholder={'Male'}
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
                                onPress={handleSubmit}>
                            </CustomButton2>
                        </View>
                    )}
                </Formik>
            }
        />
    )
}
export default SignUp2;