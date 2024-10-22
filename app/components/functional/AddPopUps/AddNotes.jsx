import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import CustomPopUp from '../../structural/CustomPopUp';
import styles from '../../../styles';
import StarRating from 'react-native-star-rating-widget';
import { CustomButton } from '../CustomButton';

const AddNotes = ({ addNotesVisible, toggleNotesOverlay }) => {

    //...
    const [rating, setRating] = useState(0);


    return (
        <CustomPopUp
            visible={addNotesVisible}
            toggleOverlay={toggleNotesOverlay}
            hasBackButton={false}
            content={
                <View style={localStyle.fieldContainer}>
                    <Text style={[styles.defaultWhiteText, { textAlign: 'center', fontSize:18 }]}>
                        How are you feeling?
                    </Text>
                    <View style={localStyle.starContainer}>
                        <StarRating
                            rating={rating}
                            onChange={setRating}
                            color={'#FFF07C'}
                            enableHalfStar={false}
                        />
                    </View>
                    <View style={localStyle.fieldRow}>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={localStyle.note}
                                placeholder='Today I feel like I...'
                                selectionColor='#CB9CF2'
                                placeholderTextColor='rgba(242,244,243, 0.2)'
                                multiline
                                maxLength={150}>
                            </TextInput>
                        </View>
                    </View>
                    <CustomButton title={"Save"} />
                </View>
            }
        />
    );
};
export default AddNotes;

const localStyle = StyleSheet.create({
    fieldContainer: {
        paddingHorizontal: 30,
        paddingBottom: 20,
        justifyContent: 'center',
    },
    fieldRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10
    },
    starContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: '100%',
        backgroundColor: 'rgba(97, 98, 131, 0.2)',
        borderRadius: 30,
        marginTop: 10
    },
    note: {
        color: '#F2F4F3',
        backgroundColor: 'rgba(97, 98, 131, 0.2)',
        borderRadius: 8,
        borderWidth: 1,
        borderColor:'#CB9CF2',
        fontSize: 16,
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: 150,
        width: '100%',
        textAlignVertical:'top',
        borderColor: '#CB9CF2'
    },
})
