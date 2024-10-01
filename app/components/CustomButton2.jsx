import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function CustomButton2({ isGoogle, text, onPress }) {
    return (
        // Is Google true?
        {isGoogle} ?
        <TouchableOpacity onPress={onPress}>
            <View style={apStyle.googleButton}>
                <Image style={apStyle.googleLogo} 
                    source={require('../../assets/images/google-icon.png')}
                    />
                <Text style={apStyle.buttonText}>Google</Text>
            </View>
        </TouchableOpacity>     
        // Else is not Google
        :
        <TouchableOpacity onPress={onPress}>
            <View style={apStyle.button}>
                <Text style={apStyle.buttonText}>
                    { text }
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const apStyle = StyleSheet.create({
    button: {
        backgroundColor: '#F2F4F3',
        padding: 10,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 8,
        activeOpacity: 0.7
    },
    buttonText: {
        color: '#0E1116',
        fontSize: 16,
        fontFamily: 'Inter_500Medium',
    },
    googleButton: {
        backgroundColor: '#F2F4F3',
        padding: 10,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 8,
        activeOpacity: 0.7,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    googleLogo: {
        width: '9%',
        height: '100%'
    }

})