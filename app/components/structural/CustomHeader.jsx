import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import styles from '../../styles'

const CustomHeader = ({
    title1,
    title2,
    title3
}) => {
    return (
        <View style={localStyle.header}>
            <Text style={[styles.defaultText, { paddingLeft: 10, fontSize: 19 }]}>{title1}</Text>
            <Text style={[styles.defaultText, { fontSize: 14, textAlign: 'center' }]}>{title2}</Text>
            <Text style={[styles.defaultText, { paddingRight: 10, fontSize: 14 }]}>{title3}</Text>
        </View>
    )
}
export default CustomHeader

const localStyle = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#1F2938',
        justifyContent: 'space-between',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        alignItems: 'flex-end',
        borderBottomWidth: 2,
        borderBottomColor: '#828282',
    },
})