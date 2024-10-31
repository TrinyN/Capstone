import { View } from 'react-native';
import React from 'react'
import CustomScreen from '../components/structural/CustomScreen';
import CustomAuthButton from '../components/functional/CustomAuthButton';
import QuestionAnswer from '../components/functional/QuestionAnswer';
// import auth from '@react-native-firebase/auth'

// Function to handle the design and display of the Sign Up screen
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        setLoading(true)
        // try {
        //     await auth().createUserWithEmailAndPassword(email, password);
        //     alert('Registration successful'); 
        // } catch (e) {
        //     alert('Registration failed: ' + e.message);
        // } finally {
        //     setLoading(false)
        // }
    }
    return (
        <CustomScreen
            title='So you are new?'
            info='Please choose a good email and safe password to get started!'
            screenContent={
                // {/* Cotent of screen */}
                <View style={{ flex: 5, paddingBottom: 100 }}>

                    {/* Q/A's for email and password */}
                    <View style={{ justifyContent: 'flex-start', paddingBottom: 100, flex: 1 }}>

                        {/* email */}
                        <QuestionAnswer
                            type='text'
                            placeholder='your_email@gmail.com'
                            question='Email:'
                            isEmail={true}
                            value={email}
                            setValue={setEmail}
                        />

                        {/* password */}
                        <QuestionAnswer
                            type='password'
                            question='Password:'
                            value={password}
                            setValue={setPassword}
                        />

                        {/* <Text style={styles.defaultText}>
                                Confirm Password:
                            </Text>

                            <TextInput style={styles.inputFieldStyle}
                                placeholder='password'
                                secureTextEntry={true}> 
                            </TextInput> */}
                    </View>
                    <CustomAuthButton authType={"Sign Up"} handlePress={handleSignUp}/>
                </View>
            } />
    )
}
export default SignUp;