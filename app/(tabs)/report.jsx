import { TextInput, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import { router } from 'expo-router';

// TODO: change so placeholders match users info
// Function to handle the design of the Reports screen of CaloNavo

// REFACTORING FLAGGING - Needs a Component
// 1. Screen component - sign up 2 and 3 and report all same
// 2. Screen header component
// 3. Add button component /// Same idea as "Create PDF" button
// 4. Spacing components - bewteen question list and create button
// 5. Question component? - shared between all signup screens and report

const Report = () => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                {/* The "body" of the screen, including its major elements */}
                <View style={[styles.viewContainer, { flex: 1 }]}>

                    {/* Screen header */}
                    <View style={{ marginTop: 70, flex: 1 }}>

                        <Text style={[styles.titleText, { paddingBottom: 10 }]}>
                            Report
                        </Text>
                        <Text style={[styles.defaultWhiteText, { fontSize: 20, paddingBottom: 50 }]}>
                            Help us double check everything to set up your PDF report!
                        </Text>
                        
                    </View>

                    {/* View that holds all of the questions and fields */}
                    <View style={{ flex: 5, paddingBottom: 100 }}> 

                        {/* Questions */}
                        {/* Diet plan question and field */}
                        <Text style={styles.defaultText}>
                            What is your diet plan?
                        </Text>
                        <TextInput style={styles.inputFieldStyle}
                            selectionColor= '#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'
                            placeholder='Keto'>
                        </TextInput>

                        {/* Calorie goal question and field */}
                        <Text style={styles.defaultText}>
                            What is your calorie goal?
                        </Text>
                        <TextInput style={styles.inputFieldStyle}
                            selectionColor= '#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'
                            placeholder='2,500'>
                        </TextInput>

                        {/* Water goal question and field */}
                        <Text style={styles.defaultText}>
                            What is your water goal?
                        </Text>
                        <TextInput style={styles.inputFieldStyle}
                            selectionColor= '#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'
                            placeholder='9 cups'>
                        </TextInput>

                        {/* Weight question and field */}
                        <Text style={styles.defaultText}>
                            What is your weight goal?
                        </Text>
                        <TextInput style={styles.inputFieldStyle}
                            selectionColor= '#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'
                            placeholder='Cut / Lose'>
                        </TextInput>

                        {/* Submit Button */}
                        <View style={{paddingVertical:20 }}>
                            <TouchableOpacity style={styles.button} onPress={() => router.push('sign-up-3')}>
                                <Text style={styles.buttonText}>Create PDF</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Report;