import { View, Text } from 'react-native';
import QuestionAnswer from '../components/functional/QuestionAnswer';
import CustomScreen from '../components/structural/CustomScreen';
import CustomAuthButton from '../components/functional/CustomAuthButton';
import auth from '@react-native-firebase/auth';
import { Formik } from 'formik';
import * as yup from 'yup'

const validationSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Email is Required'),
    password: yup.string().required('Password is Required'),
});

//  Function to handle the design and display of the Sign In screen
const SignIn = () => {

    const handleSignIn = async (values) => {
        const { email, password } = values;
        try {
            await auth().signInWithEmailAndPassword(email, password);
        } catch (e) {
            alert("Incorrect Email or Password");
        }
    };

    return (
        <CustomScreen
            title='Glad to see you again!'
            screenContent={
                // Formik form for handling email and password input
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSignIn}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                        <View style={{ flex: 5, paddingBottom: 100 }}>
                            {/* Email and Password fields */}
                            <View style={{ justifyContent: 'flex-start', paddingBottom: 100, flex: 1 }}>
                                {/* Email prompt and field */}
                                <QuestionAnswer
                                    type="text"
                                    question="Email:"
                                    placeholder="your_email@gmail.com"
                                    isEmail={true}
                                    value={values.email}
                                    onBlur={handleBlur('email')}
                                    setValue={handleChange('email')}
                                />
                                {errors.email &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                                }

                                {/* Password prompt and field */}
                                <QuestionAnswer
                                    type="password"
                                    question="Password:"
                                    value={values.password}
                                    onBlur={handleBlur('password')}
                                    setValue={handleChange('password')}
                                />
                                {errors.password &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                                }
                            </View>

                            {/* Log In button */}
                            <CustomAuthButton authType="Log In" handleAuth={handleSubmit} />
                        </View>
                    )}
                </Formik>
            }
        >
        </CustomScreen>
    )
}
export default SignIn;