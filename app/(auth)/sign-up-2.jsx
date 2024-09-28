import { TextInput, TouchableOpacity, Text, View, ScrollView} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import { router } from 'expo-router';
import Feather from "react-native-vector-icons/Feather";
import CustomDatePicker from '../components/CustomDatePicker';
import CustomDropdown from '../components/CustomDropdown';
import { useState } from 'react';

// REFACTORING FLAGGING - Needs a Component
// 1. Screen component - sign up 2 and 3 and report all same
// 2. Screen header component
// 3. Add/Submit/Create button component
// 4. Spacing components - bewteen question list and create button
// 5. Question component? - shared between all signup screens and report
//      would contain the questions and answers (email and password included)

// Function to handle the design and display of the Sign In 2 screen
const SignUp2 = () => {
    const [userSex, setUserSex] = useState('')
    const [sex, setSex] = useState([
        { label: 'Female', value: 'Female' },
        { label: 'Male', value: 'Male' },
    ]);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                {/* Top bar holding the back button */}
                <View style={{ marginTop: 40, marginBottom: 10, paddingLeft: 25 }}>
                    <TouchableOpacity style={{ width: 35 }} onPress={() => router.back()}>
                        <Feather name="chevron-left" size={35} color="#F2F4F3" />
                    </TouchableOpacity>
                </View>

                {/* The "body" of the screen, including its major elements */}
                <View style={[styles.viewContainer, { flex: 1 }]}>

                    {/* Screen header */}
                    <View style={{ marginTop: 30, flex: 1 }}>
                        <Text style={[styles.titleText, { paddingBottom: 10 }]}>
                            First things first ...
                        </Text>
                        <Text style={[styles.defaultWhiteText, { fontSize: 20 }]}>
                            Please let us know a little about yourself to get things going!
                        </Text>
                    </View>

                    {/* View to hold all of the questions and fields */}
                    <View style={{ flex: 5, paddingBottom: 100 }}>

                        {/* Questions */}
                        {/* Name question and field */}
                        <Text style={styles.defaultText}>
                            Do you have a preferred name?
                        </Text>
                        <TextInput style={styles.inputFieldStyle}
                            selectionColor='#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'
                            placeholder='John Smith'>
                        </TextInput>

                        <CustomDatePicker placeholder={"When were you born?"} hasTitle={true}/>

                        {/* Height question and field */}
                        <Text style={styles.defaultText}>
                            How tall are you?
                        </Text>
                        <TextInput style={styles.inputFieldStyle}
                            selectionColor='#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'
                            placeholder='5 ft 12 in'>
                        </TextInput>

                        {/* Weight question and field */}
                        <Text style={styles.defaultText}>
                            How much do you weigh?
                        </Text>
                        <TextInput style={styles.inputFieldStyle}
                            selectionColor='#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'
                            placeholder='1000 lbs'>
                        </TextInput>

                        {/* Sex question and field */}
                        <Text style={styles.defaultText}>
                            What is your sex?
                        </Text>

                        <View style={[{ zIndex: 3 }]}>
                            <CustomDropdown
                                placeholder={''}
                                setCustomValue={setUserSex}
                                items={sex}
                                setItems={setSex}
                            />
                        </View>

                        {/* Submit Button */}
                        <View style={{ justifyContent: 'flex-end', paddingTop: 40, paddingBottom: 10 }}>
                            <TouchableOpacity style={styles.button} onPress={() => router.push('sign-up-3')}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default SignUp2;