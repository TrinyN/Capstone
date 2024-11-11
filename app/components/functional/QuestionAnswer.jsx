import { Text, TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import CustomDatePicker from "./CustomDatePicker";
import CustomDropdown from './CustomDropdown';
import Feather from "react-native-vector-icons/Feather";
import React, { useState } from 'react';

// Function that returns the QuestionAnswer given certain fields to determine its behavior
const QuestionAnswer = (
    { type, question, placeholder, setCustomValue, items, setItems, hasTitle, isEmail, value, setValue }) => {

    // If the answer will be a text input
    if (type === 'text') {
        return (
            <View style={localStyle.container}>
                {/* Question */}
                <Text style={localStyle.question}>
                    {question}
                </Text>
                {/* Add in way to accept response */}
                {/* Answer TextInput */}
                <View style={localStyle.answerView}>
                    <TextInput
                        style={localStyle.textAnswer}
                        placeholder={placeholder}
                        selectionColor='#CB9CF2'
                        placeholderTextColor='rgba(242,244,243, 0.2)'
                        keyboardType={isEmail ? 'email': 'default'}
                        value={value}
					    onChangeText={setValue}
                        >
                    </TextInput>
                </View>
            </View>
        )
    } else if (type === 'date') {
        return (
            <View style={localStyle.container}>
                {/* Question and answer both handled in other component */}
                <CustomDatePicker
                    placeholder={placeholder}
                    hasTitle={hasTitle} 
                    onDateChange={setValue}
                    />
            </View>
        )
    } else if (type === 'password') {
        const [showPassword, setShowPassword] = useState(false)
        return (
            <View style={localStyle.container}>
                {/* Question */}
                <Text style={localStyle.question}>
                    {question}
                </Text>
                {/* Add in way to accept response */}
                {/* Answer TextInput */}
                <View style={localStyle.answerView}>
                    <TextInput
                        style={localStyle.textAnswer}
                        placeholder={type}
                        secureTextEntry={!showPassword}
                        selectionColor='#CB9CF2'
                        placeholderTextColor='rgba(242,244,243, 0.2)'
                        value={value}
					    onChangeText={setValue}
                        >
                    </TextInput>
                    <TouchableOpacity style={localStyle.passwordButton} onPress={() => setShowPassword(!showPassword)}>
                        <Feather name={!showPassword ? "eye" : "eye-off"} size={25} color='rgba(242,244,243,0.5)' />
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else if (type === 'dropdown') { // NOT IMPLEMENTED YET
        return (
            <View style={localStyle.container}>
                {/* Question */}
                <Text style={localStyle.question}>
                    {question}
                </Text>
                {/* Answer Dropdown Field */}
                <View >
                    <CustomDropdown
                        placeholder={placeholder}
                        setCustomValue={setCustomValue}
                        items={items}
                        setItems={setItems}
                    />
                </View>
            </View>
        )
    }
}
export default QuestionAnswer;

const localStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    question: {
        color: '#CB9CF2',
        fontSize: 20,
        paddingVertical: 15,
        fontFamily: 'Inter_600SemiBold',
    },
    answerView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textAnswer: {
        width: '100%',
        height: 45,
        color: '#F2F4F3',
        backgroundColor: 'rgba(97, 98, 131, 0.2)',
        borderRadius: 8,
        fontSize: 16,
        paddingLeft: 15,
        paddingVertical: 10,
    },
    passwordButton:{
        width: 25, 
        position: 'absolute', 
        right: 10
    }
})