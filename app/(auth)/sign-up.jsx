import { View } from 'react-native';
import CustomScreen from '../components/structural/CustomScreen';
import CustomAuthButton from '../components/functional/CustomAuthButton';
import QuestionAnswer from '../components/functional/QuestionAnswer';
import { router } from 'expo-router';
import { Formik } from 'formik';
import * as yup from 'yup'

const validationSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'), // maybe add more requirements for password (like one symbol, number, etc)
});

// Function to handle the design and display of the Sign Up screen
const SignUp = () => {

    const handleNext = (values) => {
        const { email, password} = values;
            router.push({
                pathname: '/sign-up-2',
                params: { email: email, password: password },
            });
    }
    return (
        <CustomScreen
            title='So you are new?'
            info='Please choose a good email and safe password to get started!'
            screenContent={
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleNext}

                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                        // {/* Content of screen */}
                        <View style={{ flex: 5, paddingBottom: 100 }}>

                            {/* Q/A's for email and password */}
                            <View style={{ justifyContent: 'flex-start', paddingBottom: 100, flex: 1 }}>

                                {/* email */}
                                <QuestionAnswer
                                    type='text'
                                    placeholder='your_email@gmail.com'
                                    question='Email:'
                                    isEmail={true}
                                    value={values.email}
                                    onBlur={handleBlur('email')}
                                    setValue={handleChange('email')}
                                    errors={errors.email}
                                />

                                {/* password */}
                                <QuestionAnswer
                                    type='password'
                                    question='Password:'
                                    value={values.password}
                                    onBlur={handleBlur('password')}
                                    setValue={handleChange('password')}
                                    errors={errors.password}
                                />
                                {/* <Text style={styles.defaultText}>
                                Confirm Password:
                            </Text>

                            <TextInput style={styles.inputFieldStyle}
                                placeholder='password'
                                secureTextEntry={true}> 
                            </TextInput> */}
                            </View>
                            <CustomAuthButton authType={"Sign Up"} email={values.email} password={values.password} handleAuth={handleSubmit}/>
                        </View>
                    )}
                </Formik>
            } />
    )
}
export default SignUp;