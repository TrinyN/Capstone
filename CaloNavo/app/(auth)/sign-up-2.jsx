import { TextInput, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Feather from "react-native-vector-icons/Feather";

const SignUp2 = () => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                {/* Back Button stationary at top of screen*/}
                <View style={{ marginTop: 40, marginBottom: 10, paddingLeft: 25}}>
                    <TouchableOpacity style={{ width: 35 }} onPress={() => router.push('sign-up')}>
                        <Feather name="chevron-left" size={35} color="#F2F4F3" />
                    </TouchableOpacity>
                </View>

                <View style={[styles.viewContainer, { flex: 1 }]}>

                    <View style={{ marginTop: 30, flex: 1 }}>
                        <Text style={[styles.titleText, { paddingBottom: 10 }]}>
                            First things first ...
                        </Text>
                        <Text style={[styles.defaultWhiteText, { fontSize: 20 }]}>
                            Please let us know a little about yourself to get things going!
                        </Text>
                    </View>

                    <View style={{ flex: 5, paddingBottom: 100 }}> 
                        {/* Questions */}
                        {/* Name question and field */}
                        <Text style={styles.defaultText}>
                            Do you have a preferred name?
                        </Text>
                        <TextInput style={styles.inputFieldStyle}
                            selectionColor= '#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'
                            placeholder='John Smith'>
                        </TextInput>

                        {/* Age question and field */}
                        <Text style={styles.defaultText}>
                            When were you born?
                        </Text>
                        <TextInput style={styles.inputFieldStyle}
                            selectionColor= '#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'
                            placeholder='06/01/3024'>
                        </TextInput>

                        {/* Height question and field */}
                        <Text style={styles.defaultText}>
                            How tall are you?
                        </Text>
                        <TextInput style={styles.inputFieldStyle}
                            selectionColor= '#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'
                            placeholder='5 ft 12 in'>
                        </TextInput>

                        {/* Weight question and field */}
                        <Text style={styles.defaultText}>
                            How much do you weigh?
                        </Text>
                        <TextInput style={styles.inputFieldStyle}
                            selectionColor= '#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'
                            placeholder='1000 lbs'>
                        </TextInput>
                    
                        {/* Sex question and field */}
                        <Text style={styles.defaultText}>
                            What is your sex?
                        </Text>
                        <TextInput style={styles.inputFieldStyle}
                            selectionColor= '#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'
                            placeholder='Female'>
                        </TextInput>

                        {/* Submit Button */}
                        <View style={{ justifyContent: 'flex-end', paddingTop: 20, paddingBottom: 10, flex: 1 }}>
                            <TouchableOpacity style={styles.button} onPress={() => router.push('sign-up-3')}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    
                </View>

                <StatusBar
                    backgroundColor='#0E1116'
                    style='light'
                />

            </ScrollView>
        </SafeAreaView>
    )
}
export default SignUp2;