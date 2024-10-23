import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import React from 'react'
import styles from '../../styles'
import { Overlay } from '@rneui/base';

const CustomPopUp2 = ({
    visible,
    toggleVisible,
    handleConfirmPress, 
    title,
    buttonTitle
}) => {
    return (
        <Overlay isVisible={visible} onBackdropPress={toggleVisible} overlayStyle={localStyle.overlayStyle}>
            <View style={localStyle.overlayHeader}>
                <Text style={[styles.defaultText, { color: '#F2F4F3', textAlign: 'center' }]}>
                    {title}
                </Text>
                <View style={localStyle.overlayContainer}>
                    <TouchableOpacity onPress={toggleVisible} style={[styles.button, localStyle.button]}>
                        <Text style={[styles.buttonText, { color: '#F2F4F3' }]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleConfirmPress} style={[styles.button, { backgroundColor: '#CB9CF2', width: '40%' }]}>
                        <Text style={[styles.buttonText, { color: '#0E1116' }]}>{buttonTitle}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Overlay>
    )
}
export default CustomPopUp2;

const localStyle = StyleSheet.create({
    button: {
        backgroundColor: '#0E1116', 
        borderWidth: 1, 
        borderColor: '#F2F4F3', 
        width: '40%'
    },
    overlayStyle: {
        backgroundColor: '#0E1116', 
        borderWidth: 2, 
        borderColor: '#CB9CF2', 
        width: '90%'
    },
    overlayHeader: {
        paddingHorizontal: 8, 
        justifyContent: 'center'
    },
    overlayContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 30
    },
})