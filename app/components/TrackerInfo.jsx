

import { Text, View, TextInput } from 'react-native';
import styles from '../styles';
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
                    <TextInput style={{ backgroundColor: '#1F2938', width: 60, height: 20, borderRadius: 5, marginHorizontal: 5, color: '#F2F4F3', paddingHorizontal: 5, textAlign: 'center', fontSize: 16 }}
                        placeholder='2,400'
                        placeholderTextColor={'#F2F4F3'}
                        editable={false}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text style={styles.defaultWhiteText}>
                        Weight:
                    </Text>
                    <TextInput style={{ backgroundColor: '#1F2938', width: 75, height: 20, borderRadius: 5, marginLeft: 5, color: '#F2F4F3', paddingHorizontal: 5, textAlign: 'left', fontSize: 16 }}

                        placeholder='105 lbs'
                        placeholderTextColor={'#F2F4F3'}
                    />
                    <Feather pointerEvents="none" name="edit-2" size={14} color="#CB9CF2" style={{ position: 'absolute', paddingRight: 2 }} />
                </View>
            </View>
            <View style={{ backgroundColor: '#1F2938', borderRadius: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>

                    {/* Abstract formula to make numbers make sense*/}
                    <Text style={[styles.defaultWhiteText, { fontSize: 14, color: '#CB9CF2', width: '19%', textAlign: 'left' }]}>
                        (Eaten
                    </Text>
                    <Text style={[styles.defaultWhiteText, { fontSize: 14 }]}> - </Text>
                    <Text style={[styles.defaultWhiteText, { fontSize: 14, color: '#CB9CF2', width: '22%', textAlign: 'center' }]}>
                        Burned)
                    </Text>
                    <Text style={[styles.defaultWhiteText, { fontSize: 14 }]}> - </Text>
                    <Text style={[styles.defaultWhiteText, { fontSize: 14, color: '#CB9CF2', width: '19%', textAlign: 'center' }]}>
                        BMR
                    </Text>
                    <Text style={[styles.defaultWhiteText, { fontSize: 14 }]}> = </Text>
                    <Text style={[styles.defaultWhiteText, { textDecorationLine: 'underline', fontSize: 14, color: '#80FF72', width: '21%', textAlign: 'right' }]}>
                        Surplus
                    </Text>
                </View>

                {/* TODO: Implement retrieval and calculation of calories burned and eaten, placeholder numbers for now */}
                {/* Actual numbers of forumla */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                    <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'left', width: '19%' }]}>
                        (2,400
                    </Text>
                    <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'center' }]}>
                        -
                    </Text>
                    <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'center', width: '22%' }]}>
                        200)
                    </Text>
                    <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'center' }]}>
                        -
                    </Text>
                    <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'center', width: '19%' }]}>
                        1,200
                    </Text>
                    <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'center' }]}>
                        =
                    </Text>
                    <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'right', width: '21%' }]}>
                        800
                    </Text>
                </View>
            </View>
        </View>

    )
}

export default TrackerInfo