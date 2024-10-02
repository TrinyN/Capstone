import { Text, TextInput, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

const QuestionAnswer = (ansType, placeholder, question) => {

    return (

        <View style={apStyle.container}>
            <Text style={apStyle.question}>
                {question}
            </Text>

            {/* Add in way to accept response */}
            <TextInput 
                style={apStyle.textAnswer} 
                placeholder={placeholder}
                selectionColor='#CB9CF2'
                placeholderTextColor='rgba(242,244,243, 0.2)'>     
            </TextInput>
        </View>
        
    )

}

export default QuestionAnswer;

const apStyle = StyleSheet.create({
    container: {

    },
    question: {
        color: '#CB9CF2',
        fontSize: 20,
        paddingVertical: 15,
        fontFamily: 'Inter_600SemiBold',
    },
    textAnswer: {
        color: '#F2F4F3',
        backgroundColor: 'rgba(97, 98, 131, 0.2)',
        borderRadius: 8,
        fontSize: 16,
        paddingLeft: 15,
        paddingVertical: 10,
    },
})