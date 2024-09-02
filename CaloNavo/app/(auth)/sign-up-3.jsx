import { Image, TextInput, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import { StatusBar } from 'expo-status-bar';
import { router, Stack } from 'expo-router';
import Feather from "react-native-vector-icons/Feather";
import React, { useState } from 'react';


const SignUp3 = () => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            
                {/* Back Button / Left Chevron*/}
                <View style={{ marginTop: 10, marginBottom: 10, paddingLeft: 25}}>
                    <TouchableOpacity style={{ width: 35 }} onPress={() => router.push('sign-up')}>
                        <Feather name="chevron-left" size={35} color="#F2F4F3" />
                    </TouchableOpacity>
                </View>

                <View style={[styles.viewContainer, { flex: 1 }]}>

                    <View style={{ marginTop: 30, flex: 1 }}>
                        <Text style={[styles.titleText, { paddingBottom: 10 }]}>
                            Your diet goals ...
                        </Text>
                        <Text style={[styles.defaultWhiteText, { fontSize: 20 }]}>
                            Please fill in the following fields to set up your diet and goals.
                        </Text>
                    </View>

                    <View style={{ flex: 5, paddingBottom: 100 }}> 
                        {/* Questions */}
                        {/* Diet Plan question and field */}
                        <Text style={styles.defaultText}>
                            Would you like a diet plan?
                        </Text>
                        <TextInput style={styles.inputFieldStyle}
                            selectionColor= '#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'
                            placeholder='Yes'>
                        </TextInput>

                        {/* Diet Plan Type question and options */}
                        <Text style={styles.defaultText}>
                            Which diet plan would you like?
                        </Text>
                        <View style={styles.dropdownFieldStyle}>
                            <Picker
                                style={{color:'#F2F4F3'}}
                                // selectedValue={this.props.diet}
                                // onValueChange={value => this.props.profileUpdate({ prop: 'diet', value})}
                            >
                                <Picker.Item label='None' value='None'/>
                                <Picker.Item label='Keto' value='Keto'/>
                                <Picker.Item label='Vegan' value='Vegan'/>
                                <Picker.Item label='Vegetarian' value='Vegetarian'/>
                            </Picker>
                        </View>

                        {/* Diet Name question and field */}
                        <Text style={styles.defaultText}>
                            Custom diet Name? (optional)
                        </Text>
                        <TextInput style={styles.inputFieldStyle}
                            selectionColor= '#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'
                            placeholder='My Diet Plan'>
                        </TextInput>

                        {/* Daily Calories question and field */}
                        <Text style={styles.defaultText}>
                            How many calories per day?
                        </Text>
                        <TextInput style={styles.inputFieldStyle}
                            selectionColor= '#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'
                            placeholder='2500'>
                        </TextInput>
                    
                        {/* Macro Ratio question and field */}
                        <Text style={styles.defaultText}>
                            What macro ratio do you want?
                        </Text>
                        <TextInput style={styles.inputFieldStyle}
                            selectionColor= '#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'
                            placeholder='35% Carb / 35% Protein / 30% Fat'>
                        </TextInput>

                        {/* Weight Goal question and field */}
                        <Text style={styles.defaultText}>
                            What is your weight goal?
                        </Text>
                        <View style={styles.dropdownFieldStyle}>
                            <Picker
                                style={{color:'#F2F4F3'}}
                                // selectedValue={this.props.diet}
                                // onValueChange={value => this.props.profileUpdate({ prop: 'diet', value})}
                            >
                                <Picker.Item label='Cut / Lose Weight' value='Cut'/>
                                <Picker.Item label='Bulk / Gain Weight' value='Bulk'/>
                                <Picker.Item label='Maintain' value='Maintain'/>
                            </Picker>
                        </View>

                        {/* Water Goal question and field */}
                        <Text style={styles.defaultText}>
                            What is your water goal?
                        </Text>
                        <TextInput style={styles.inputFieldStyle}
                            selectionColor= '#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'
                            placeholder='9 cups'>
                        </TextInput>

                        {/* Submit Button */}
                        <View style={{ justifyContent: 'flex-end', paddingTop: 20, paddingBottom: 10, flex: 1 }}>
                            <TouchableOpacity style={styles.button} onPress={() => router.push('sign-up-2')}>
                                <Text style={styles.buttonText}>Done</Text>
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
export default SignUp3;