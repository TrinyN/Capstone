import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Feather from "react-native-vector-icons/Feather";
import styles from "../../styles";

// Function that returns the CustomButton2 given certain fields to determine its behavior
const CustomButton2 = ({ type, text, onPress }) => {

    if (type === 'google') {
        return (
            // If is google button
            <TouchableOpacity onPress={onPress}>
                <View style={localStyle.buttonGoogle}>
                    <Image style={localStyle.googleLogo}
                        source={require('../../../assets/images/google-icon.png')}
                    />
                    <Text style={styles.buttonText}>Google</Text>
                </View>
            </TouchableOpacity>
        )
    } else if (type === 'normal') {
        return (
            // Else is normal button
            <TouchableOpacity onPress={onPress}>
                <View style={localStyle.button}>
                    <Text style={styles.buttonText}>
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    else if (type === 'add') {
        return (
            <TouchableOpacity onPress={onPress}
                style={[localStyle.button, { height: 33, backgroundColor: '#CB9CF2', padding: 1 }]} >
                <Feather name="plus" size={30} color="#1F2938" />
            </TouchableOpacity>
        )
    } else if (type === 'small') {
        return (
            // Else is small button
            <TouchableOpacity onPress={onPress}>
                <View style={localStyle.buttonSm}>
                    <Text style={styles.buttonText}>
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}
export default CustomButton2;

const localStyle = StyleSheet.create({
    button: {
        height: 45,
        width:'100%',
        backgroundColor: '#F2F4F3',
        padding: 10,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 8,
        activeOpacity: 0.7
    },
    buttonSm: {
        // height: '50%', // temporary
        // width: '50%', // temporary
        backgroundColor: '#CB9CF2',
        padding: 10,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 8,
        activeOpacity: 0.7
    },
    buttonGoogle: {
        height: 45,
        width: '100%',
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
    },
})