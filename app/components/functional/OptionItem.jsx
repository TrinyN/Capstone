import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Feather from "react-native-vector-icons/Feather";
import React from 'react'
import { router } from 'expo-router';
import styles from '../../styles';

const OptionItem = ({
    title,
    icon,
    zoomRoute,
    opacity,
    toggleOptions,
    isShoppingList,
    isNotes,
    toggleNotesOverlay,
    onPress
}) => {
    // if shopping list, button performs function, else zoom in/out
    const handlePress = () => {
        if (isShoppingList) {
            // onPress();              // Error here - onPress is not defined?
            router.push('/shoppingGenDay');
        } else if (isNotes) {
            toggleNotesOverlay();
        }else {
            router.push(zoomRoute);
        }
    };
    return (
        <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', opacity }}
            onPress={handlePress}
            onPressOut={toggleOptions}
            disabled={opacity == 0.2}
        >
            <Feather name={icon} size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
            <Text style={styles.optionsText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
export default OptionItem