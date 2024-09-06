import { TextInput, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Feather from "react-native-vector-icons/Feather";

// change so placeholders match users info
const Report = () => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <View style={[styles.viewContainer, { flex: 1 }]}>

                    <View style={{ marginTop: 70, flex: 1 }}>
                        <Text style={[styles.titleText, { paddingBottom: 10 }]}>
                            Report
                        </Text>
                        <Text style={[styles.defaultWhiteText, { fontSize: 20, paddingBottom: 50 }]}>
                            Help us double check everything to set up your PDF report!
                        </Text>
                    </View>

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
                        <View style={{ justifyContent: 'flex-end', paddingTop: 20, paddingBottom: 10, flex: 1 }}>
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