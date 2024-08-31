import { Image, TextInput, TouchableOpacity, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Feather from "react-native-vector-icons/Feather";


const SignIn = () => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginTop: 40, width: 35, paddingLeft: 25 }}>
                <TouchableOpacity onPress={() => router.push('')}>
                    <Feather name="chevron-left" size={35} color="#F2F4F3" />
                </TouchableOpacity>
            </View>
            <View style={styles.viewContainer}>

                <View style={{ marginTop: 80, flex: 1 }}>
                    <Text style={styles.titleText}>
                        Glad to see you again!
                    </Text>
                </View>
                <View style={{ flex: 5, paddingBottom: 100 }}>

                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                        <Text style={styles.defaultText}>
                            Email:
                        </Text>
                        <TextInput style={styles.inputFieldStyle}
                            placeholder='your_email@gmail.com'
                            placeholderTextColor='rgba(242,244,243, 0.2)'>
                        </TextInput>

                        <Text style={styles.defaultText}>
                            Password:
                        </Text>

                        <TextInput style={styles.inputFieldStyle}
                            placeholder='password'
                            placeholderTextColor='rgba(242,244,243, 0.2)'>
                        </TextInput>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>
                        <Text style={[styles.smallText, { color: '#CB9CF2' }]}>
                            or continue with
                        </Text>
                        <TouchableOpacity style={[styles.button, {flexDirection:'row', justifyContent: 'center'}]}>
                            <Image
                                source={require('../../assets/images/google-icon.png')}
                                style={{
                                    width: '9%',
                                    height: '100%',
                                }}
                            />
                            <Text style={styles.buttonText}>Google</Text>
                        </TouchableOpacity>
                        <Text style={[styles.smallText, { fontSize: 12, color: '#828282' }]}>
                            By clicking continue, you agree to our{' '}
                            <Text style={{ color: '#F2F4F3' }}>
                                Terms of Service{' '}
                            </Text>
                            <Text>
                                and{' '}
                            </Text>
                            <Text style={{ color: '#F2F4F3' }}>
                                Privacy Policy
                            </Text>
                        </Text>
                        <Text style={[styles.smallText, {}]}>
                            Don't have an account?{' '}
                            <TouchableOpacity onPress={() => router.push('/sign-up')}>
                                <Text style={{ color: '#CB9CF2', textDecorationLine: "underline" }}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </View>
            </View>


            <StatusBar backgroundColor='#0E1116'
                style='light'
            />
        </SafeAreaView>



    )



}
export default SignIn;