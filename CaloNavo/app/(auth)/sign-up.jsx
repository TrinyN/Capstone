import { Image, TextInput, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Feather from "react-native-vector-icons/Feather";
import React, { useState } from 'react'


const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ marginTop: 40, width: 35, paddingLeft: 25 }}>
                    <TouchableOpacity onPress={() => router.push('')}>
                        <Feather name="chevron-left" size={35} color="#F2F4F3" />
                    </TouchableOpacity>
                </View>
                <View style={[styles.viewContainer, { flex: 1 }]}>

                    <View style={{ marginTop: 80, flex: 1 }}>
                        <Text style={[styles.titleText, { paddingBottom: 10 }]}>
                            So you are new?
                        </Text>
                        <Text style={[styles.defaultWhiteText, { fontSize: 20 }]}>
                            Please choose a good email and safe password to get started!
                        </Text>
                    </View>
                    <View style={{ flex: 5, paddingBottom: 100 }}>

                        <View style={{ justifyContent: 'flex-start', paddingBottom: 100, flex: 1 }}>
                            <Text style={styles.defaultText}>
                                Email:
                            </Text>
                            <TextInput style={styles.inputFieldStyle}
                                placeholder='your_email@gmail.com'>
                            </TextInput>

                            <Text style={styles.defaultText}>
                                Password:
                            </Text>

                            
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <TextInput style={[styles.inputFieldStyle, {flex:1}]}
                                    placeholder='password'
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity style={{ width: 25, position:'absolute', right: 10}} onPress={() => setShowPassword(!showPassword)}>
                                    <Feather name={!showPassword ? "eye" : "eye-off"} size={25} color='rgba(242,244,243,0.5)' />
                                </TouchableOpacity>
                            </View>


                            {/* <Text style={styles.defaultText}>
                                Confirm Password:
                            </Text>

                            <TextInput style={styles.inputFieldStyle}
                                placeholder='password'
                                secureTextEntry={true}> 
                            </TextInput> */}

                        </View>
                        <View style={{ justifyContent: 'flex-end', paddingBottom: 10, flex: 1 }}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#CB9CF2' }} />
                                <Text style={[styles.smallText, { color: '#CB9CF2', paddingHorizontal: 10 }]}>
                                    or continue with
                                </Text>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#CB9CF2' }} />
                            </View>
                            <TouchableOpacity style={[styles.button, { flexDirection: 'row', justifyContent: 'center' }]}>
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
                                Have an account?{' '}
                                <TouchableOpacity onPress={() => router.push('/sign-in')}>
                                    <Text style={{ color: '#CB9CF2', textDecorationLine: "underline" }}>
                                        Sign In
                                    </Text>
                                </TouchableOpacity>
                            </Text>
                        </View>
                    </View>
                </View>
                <StatusBar backgroundColor='#0E1116'
                    style='light'
                />
            </ScrollView>
        </SafeAreaView>
    )
}
export default SignUp;