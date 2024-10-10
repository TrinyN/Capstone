import { Text, View, StyleSheet } from 'react-native'
import React from 'react'

const CustomHeader = ({
    title1,
    title2,
    title3
}) => {
    return (
        <View style={apStyle.header}>
            <Text style={[apStyle.defaultText, { paddingLeft: 10, fontSize: 19 }]}>{title1}</Text>
            <Text style={[apStyle.defaultText, { fontSize: 14, textAlign: 'center' }]}>{title2}</Text>
            <Text style={[apStyle.defaultText, { paddingRight: 10, fontSize: 14 }]}>{title3}</Text>
        </View>
    )
}

export default CustomHeader

const apStyle = StyleSheet.create({
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
    defaultText: {
        color: '#CB9CF2',
        fontSize: 20,
        // paddingLeft:25,
        paddingVertical: 15,
        fontFamily: 'Inter_600SemiBold',
    },
})