import { Text, TextInput, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

const QuestionAnswer = ({type, question, placeholder}) => {

    // If the answer will be a text input
    if (type === 'text'){
        return (
            <View style={apStyle.container}>
                {/* Question */}
                <Text style={apStyle.question}>
                    {question}
                </Text>

                {/* Add in way to accept response */}
                {/* Answer TextInput */}
                <View style={apStyle.answerView}>
                    <TextInput 
                        style={apStyle.textAnswer} 
                        placeholder={placeholder}
                        selectionColor='#CB9CF2'
                        placeholderTextColor='rgba(242,244,243, 0.2)'>     
                    </TextInput>
                </View>
            </View>
            
        )
    } else if (type === 'date') { // NOT IMPLEMENTED YET
        return (
            <View style={apStyle.container}>
                {/* Question */}
                <Text style={apStyle.question}>
                    {question}
                </Text>

                {/* Add in way to accept response */}
                {/* Answer TextInput */}
                <View style={apStyle.answerView}>
                    <TextInput 
                        style={apStyle.textAnswer} 
                        placeholder={placeholder}
                        selectionColor='#CB9CF2'
                        placeholderTextColor='rgba(242,244,243, 0.2)'>     
                    </TextInput>
                </View>
            </View>
        )
    } else if (type === 'dropdown') { // NOT IMPLEMENTED YET
        return (
            <View style={apStyle.container}>
                {/* Question */}
                <Text style={apStyle.question}>
                    {question}
                </Text>

                {/* Add in way to accept response */}
                {/* Answer TextInput */}
                <View style={apStyle.answerView}>
                    <TextInput 
                        style={apStyle.textAnswer} 
                        placeholder={placeholder}
                        selectionColor='#CB9CF2'
                        placeholderTextColor='rgba(242,244,243, 0.2)'>     
                    </TextInput>
                </View>
            </View>
        )
    }

}

export default QuestionAnswer;

const apStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'flex-start'
    },
    question: {
        color: '#CB9CF2',
        fontSize: 20,
        paddingVertical: 15,
        fontFamily: 'Inter_600SemiBold',
    },
    answerView : {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textAnswer: {
        width: '100%',
        color: '#F2F4F3',
        backgroundColor: 'rgba(97, 98, 131, 0.2)',
        borderRadius: 8,
        fontSize: 16,
        paddingLeft: 15,
        paddingVertical: 10,
    },
})