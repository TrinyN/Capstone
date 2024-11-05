import { View } from 'react-native';
import { useState } from 'react';
import CustomScreen from '../components/structural/CustomScreen';
import CustomAuthButton from '../components/functional/CustomAuthButton';
import QuestionAnswer from '../components/functional/QuestionAnswer';

// Function to handle the design and display of the Sign Up screen
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <CustomScreen
            title='So you are new?'
            info='Please choose a good email and safe password to get started!'
            screenContent={
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
                    <CustomAuthButton authType={"Sign Up"} email={email} password={password}/>
                </View>
            } />
    )
}
export default SignUp;