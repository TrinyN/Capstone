import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles'
import Feather from "react-native-vector-icons/Feather";
import { router } from 'expo-router';


const OptionItem = ({
    title,
    icon,
    zoom,
    zoomRoute,
    opacity, 
}) => {
    return (
        <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', opacity}}
            onPress={() => router.push(zoomRoute)}
            disabled={!zoom}>

            <Feather name={icon} size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
            <Text style={styles.optionsText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default OptionItem