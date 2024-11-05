import { View } from 'react-native';
import QuestionAnswer from '../components/functional/QuestionAnswer';
import CustomScreen from '../components/structural/CustomScreen';
import CustomAuthButton from '../components/functional/CustomAuthButton';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';

//  Function to handle the design and display of the Sign In screen
const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
        } catch (e) {
            alert('Sign in failed: ' + e.message);
        }
    };

    return (
        <CustomScreen
            title='Glad to see you again!'
            screenContent={
                // View to hold prompts and fields at top and buttons on bottom
                <View style={{ flex: 5, paddingBottom: 100 }}>
                    {/* View to hold the Email and Password prompts and fields */}
                    <View style={{ justifyContent: 'flex-start', paddingBottom: 100, flex: 1 }}>
                        {/* Email prompt and field */}
                        <QuestionAnswer type='text'
                            question='Email:'
                            placeholder='your_email@gmail.com'
                            isEmail={true}
                            value={email}
                            setValue={setEmail}
                        />

                        {/* Password prompt and field */}
                        <QuestionAnswer
                            type='password'
                            question='Password:'
                            value={password}
                            setValue={setPassword}
                        />
                    </View>
                    {/* Component for log in buttons, discretion statement and link to sign up page */}
                    <CustomAuthButton authType={"Log In"} handleAuth={handleSignIn()} />
                </View>
            }
        >
        </CustomScreen>
    )
}
export default SignIn;