import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import CustomPopUp from '../../structural/CustomPopUp';
import styles from '../../../styles';
import StarRating from 'react-native-star-rating-widget';
import { CustomButton } from '../CustomButton';
import { getTrackerDayRef } from '../../../constants/getTrackerDayRef';
import { Formik } from 'formik';
import * as yup from 'yup'
// import { JSDOM } from 'jsdom';
// import DOMPurify from 'dompurify';

// TODO: display notes based on which day of the tracker you're on

// const window = new JSDOM('').window;
// const purify = DOMPurify(window);

const validationSchema = yup.object({
    notes: yup.string().nullable().matches(
    /^[\p{L}\p{N}\p{P}\p{S}\s]*$/u, // idk what to reject tbh. allows Letters, Numbers, Punctuation, Symbols, Spaces
    // need to allow emojis
    'Malformed Input'
    ),
});

const AddNotes = ({ addNotesVisible, toggleNotesOverlay }) => {

    const [rating, setRating] = useState(0);

    const handlePress = async (values) => {
        const {notes} = values; // get value from formik
        try {
            // const sanitizedNotes = purify.sanitize(notes); // sanitize dirty HTML

            const trackerDayRef = new getTrackerDayRef();

            trackerDayRef.update({
                notes: notes,
                rating: rating
            })

            toggleNotesOverlay()

        } catch (e) {
            alert("Error: ", e.message)
        }

    }

    return (
        <CustomPopUp
            visible={addNotesVisible}
            toggleOverlay={toggleNotesOverlay}
            hasBackButton={false}
            content={
                <Formik
                    initialValues={{ notes: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handlePress}
                >
                    {({ handleChange, handleSubmit, values, errors, touched, isValid }) => (
                        <View style={localStyle.fieldContainer}>
                            <Text style={[styles.defaultWhiteText, { textAlign: 'center', fontSize: 18 }]}>
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
                                        maxLength={210}
                                        // onChangeText={(newText) => setNotes(newText)}
                                        onChangeText={handleChange('notes')}
                                        // errors={notes.errors}
                                        defaultValue={""}
                                    >
                                    </TextInput>
                                    {errors.notes && <Text style={localStyle.errorMessage}>{errors.notes}</Text>}
                                </View>
                            </View>
                            <CustomButton title={"Save"} handlePress={handleSubmit} />
                        </View>
                    )}
                </Formik>
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
    starContainer: {
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
        borderColor: '#CB9CF2',
        fontSize: 16,
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: 150,
        width: '100%',
        textAlignVertical: 'top',
        borderColor: '#CB9CF2'
    },
    errorMessage: {
        fontSize: 11,
        color: 'red',
        padding: 5,
        fontFamily: 'Inter_300Light',

    }
})
