

import { Text, View, TextInput, StyleSheet } from 'react-native';
import styles from '../../styles';
import Feather from "react-native-vector-icons/Feather";
import React from 'react'

const TrackerInfo = ({
    // will have to pass in user's weight and allow user to change it

}) => {
    return (
        <View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingVertical: 12, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.defaultWhiteText}>
                        Caloric Goal:
                    </Text>
                    <TextInput style={[trackerInfoStyle.input, { textAlign: 'center', width: 60, marginHorizontal: 5}]}
                        placeholder='2,400'
                        placeholderTextColor={'#F2F4F3'}
                        editable={false}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text style={styles.defaultWhiteText}>
                        Weight:
                    </Text>
                    <TextInput style={[trackerInfoStyle.input, { width: 75, paddingHorizontal: 5, textAlign: 'left'}]}

                        placeholder='105 lbs'
                        placeholderTextColor={'#F2F4F3'}
                    />
                    <Feather pointerEvents="none" name="edit-2" size={14} color="#CB9CF2" style={{ position: 'absolute', paddingRight: 2 }} />
                </View>
            </View>
            <View style={{ backgroundColor: '#1F2938', borderRadius: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, alignItems: 'center' }}>

                    {/* Abstract formula to make numbers make sense*/}
                    <Text style={[trackerInfoStyle.smallLeftText, { color: '#CB9CF2' }]}>
                        (Eaten
                    </Text>
                    <Text style={[trackerInfoStyle.defaultText, ]}> - </Text>
                    <Text style={[trackerInfoStyle.defaultText, { textAlign: 'center', color: '#CB9CF2', width: '22%' }]}>
                        Burned)
                    </Text>
                    <Text style={[trackerInfoStyle.defaultText, ]}> - </Text>
                    <Text style={[trackerInfoStyle.defaultText, { textAlign: 'center', color: '#CB9CF2', width: '19%' }]}>
                        BMR
                    </Text>
                    <Text style={[trackerInfoStyle.defaultText, styles.defaultWhiteText, { fontSize: 14 }]}> = </Text>
                    <Text style={[trackerInfoStyle.defaultText, { textAlign: 'right', textDecorationLine: 'underline', color: '#80FF72', width: '21%' }]}>
                        Surplus
                    </Text>
                </View>

                {/* TODO: Implement retrieval and calculation of calories burned and eaten, placeholder numbers for now */}
                {/* Actual numbers of forumla */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                    <Text style={[trackerInfoStyle.defaultText, trackerInfoStyle.smallLeftText]}>
                        (2,400
                    </Text>
                    <Text style={[trackerInfoStyle.defaultText, {textAlign: 'center'}]}>
                        -
                    </Text>
                    <Text style={[trackerInfoStyle.defaultText, { textAlign: 'center', width: '22%' }]}>
                        200)
                    </Text>
                    <Text style={[trackerInfoStyle.defaultText, {textAlign: 'center'}]}>
                        -
                    </Text>
                    <Text style={[trackerInfoStyle.defaultText, { textAlign: 'center', width: '19%' }]}>
                        1,200
                    </Text>
                    <Text style={[trackerInfoStyle.defaultText, {textAlign: 'center'}]}>
                        =
                    </Text>
                    <Text style={[trackerInfoStyle.defaultText, { textAlign: 'right', width: '21%' }]}>
                        800
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default TrackerInfo

const trackerInfoStyle = StyleSheet.create({
    defaultText:{
        color: '#F2F4F3',
        fontFamily: 'Inter_400Regular',
        fontSize: 14
    },
    smallLeftText:{
        width: '19%', 
        textAlign: 'left', 
    }, 
    input:{
        backgroundColor: '#1F2938', 
        height: 20, 
        borderRadius: 5, 
        color: '#F2F4F3', 
        paddingHorizontal: 5, 
        fontSize: 16
    }
})