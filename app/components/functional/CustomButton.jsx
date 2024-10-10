import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../../styles'

const CustomButton = ({
    title,
    handlePress,
}) => {
    return (
        <TouchableOpacity onPress={handlePress} style={[styles.button, {backgroundColor: '#CB9CF2', zIndex: -1}]}>
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
export { CustomButton }