import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import styles from '../../styles'

const CustomHeader = ({
    title1,
    title2,
    title3
}) => {
    return (
        <View style={styles.header}>
            <Text style={[styles.defaultText, { paddingLeft: 10, fontSize: 19 }]}>{title1}</Text>
            <Text style={[styles.defaultText, { fontSize: 14, textAlign: 'center' }]}>{title2}</Text>
            <Text style={[styles.defaultText, { paddingRight: 10, fontSize: 14 }]}>{title3}</Text>
        </View>
    )
}
export default CustomHeader