

import { TextInput } from 'react-native'
import React from 'react'
import styles from '../../styles'

const CustomTextInput = ({
    placeholder,
    onChangeText, 
    keyboardType
}) => {
    return (
        <TextInput
            style={[styles.inputFieldStyle, { textAlign: 'center' }]}
            placeholder={placeholder}
            selectionColor='#CB9CF2'
            placeholderTextColor='rgba(242,244,243, 0.2)'
            keyboardType={keyboardType}
            onChangeText={onChangeText}
        />
    )
}
export default CustomTextInput;

// not yet used in any of the code, don't know if we'll need this but its reused in a lot of places (not the profile page tho)