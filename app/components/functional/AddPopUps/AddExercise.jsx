import { React, useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text } from 'react-native';
import CustomPopUp from '../../structural/CustomPopUp';
import styles from '../../../styles';
import CustomDropdown from '../CustomDropdown';
import { CustomButton } from '../CustomButton';
import { useExerciseUnitOptions } from '../../../constants/dropdownOptions';
import CustomButton2 from '../CustomButton2';
import { getTrackerDayRef } from '../../../constants/getTrackerDayRef';
import firestore from '@react-native-firebase/firestore';
import { Formik } from 'formik';
import * as yup from 'yup';

// TODO: defualt for exercise unit is last exercise unit but looks like itll be minutes

const addExerciseSchema = yup.object({
    exercise: yup.string()
                .required('Food name is required')
                .matches(/^[a-zA-Z0-9\-\/]+$/),
    duration: yup.number()
                .typeError('Servings must be numbers')
                .positive('Servings must be positive')
                .required('Serving count is required')
                .test(
                    'is-decimal',
                    'Servings may only go to two decimal places',
                    (serv) => /^\d+(\.\d{1,2})?$/.test(serv)
                ),
    calsBurned: yup.number()
                .positive('Kcals must be positive')
                .integer('Kcals must be whole numbers')
                .required('Kcals per serving are required'),
})

const AddExercise = ({ addExerciseVisible, toggleExerciseOverlay, previousOverlay, date }) => {

    // Handle dropdown menu options for exercise unit type
    const { exerciseUnit, setExerciseUnit,
        exerciseUnitTypes, setExerciseUnitTypes } = useExerciseUnitOptions();

    // const [exercise, setExercise] = useState("");
    // const [duration, setDuration] = useState(0);
    // const [calsBurned, setCalsBurned] = useState(0);

    const handleAddExercise = async (values) => {
        // let { exercise, duration, calsBurned } = values;
        const { exercise, duration, calsBurned } = values;
        // console.log(values);

        try {
            if (exercise == "") {
                alert("Please enter an exercise")
            }
            else {
                // let trackerDayRef;
                const trackerDayRef = getTrackerDayRef(date);

                await trackerDayRef.collection("Exercise").add({
                    exerciseName: exercise,
                    duration: duration,
                    durationUnit: exerciseUnit,
                    calsBurned: calsBurned
                })

                toggleExerciseOverlay()
                Alert.alert('', "Exercise Successfully Added")
                setExercise("")
                setDuration(0)
                setCalsBurned(0)
                setExerciseUnit("Minutes")
            }

        } catch (e) {
            alert("Error: ", e.message)
        }

    }
    return (
        <CustomPopUp
            visible={addExerciseVisible}
            toggleOverlay={toggleExerciseOverlay}
            hasBackButton={true}
            previousOverlay={previousOverlay}
            content={
                <Formik
                    initialValues={{ exerciseName:'', duration:'', calsBurned:'' }}
                    validationSchema={addExerciseSchema}
                    onSubmit={handleAddExercise}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                        <View style={localStyle.fieldContainer}>
                            <View style={localStyle.fieldRow}>
                                <TextInput
                                    style={[styles.inputFieldStyle, { flex: 1 }]}
                                    placeholder='Exercise'
                                    selectionColor='#CB9CF2'
                                    placeholderTextColor='rgba(242,244,243, 0.2)'
                                    // onChangeText={newVal => setExercise(newVal)}
                                    // defaultValue={exercise}
                                    value={values.exercise}
                                    // onBlur={handleBlur('exercise')}              // I.V. work - NOT WORKING
                                    onChangeText={handleChange('exercise')}
                                    // errors={errors.name} //?
                                >
                                </TextInput>
                                {errors.exercise && <Text style={localStyle.errorMessage}>{errors.exercise}</Text>}
                            </View>
                            <View style={localStyle.fieldRow}>
                                <View style={{ flex: 1, paddingRight: 10 }}>
                                    <TextInput
                                        style={[styles.inputFieldStyle]}
                                        placeholder='10'
                                        selectionColor='#CB9CF2'
                                        placeholderTextColor='rgba(242,244,243, 0.2)'
                                        keyboardType='numeric'
                                        // onChangeText={newVal => setDuration(newVal)}
                                        // defaultValue={duration}
                                        value={values.duration}
                                        // onBlur={handleBlur('duration')}              // I.V. work - NOT WORKING
                                        onChangeText={handleChange('duration')}
                                        // errors={errors.name} //?
                                        >
                                    </TextInput>
                                    {errors.duration && <Text style={localStyle.errorMessage}>{errors.duration}</Text>}
                                </View>
                                <View style={{ flex: 1 }}>
                                    <CustomDropdown
                                        placeholder={'Minutes'}
                                        setCustomValue={setExerciseUnit}
                                        items={exerciseUnitTypes}
                                        setItems={setExerciseUnitTypes}
                                    />
                                </View>
                            </View>
                            <View style={[localStyle.fieldRow, { paddingTop: 5, zIndex: -1 }]}>
                                <View style={{ flex: 1, paddingRight: 10 }}>
                                    <CustomButton2 type={"normal"} text={"Calculate"} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        style={[styles.inputFieldStyle]}
                                        placeholder='Cals Burned'
                                        selectionColor='#CB9CF2'
                                        placeholderTextColor='rgba(242,244,243, 0.2)'
                                        keyboardType='numeric'
                                        // onChangeText={newVal => setCalsBurned(newVal)}
                                        // defaultValue={calsBurned}
                                        value={values.calsBurned}
                                        // onBlur={handleBlur('calsBurned')}              // I.V. work - NOT WORKING
                                        onChangeText={handleChange('calsBurned')}
                                        // errors={errors.name} //?
                                        >
                                    </TextInput>
                                    {errors.calsBurned && <Text style={localStyle.errorMessage}>{errors.calsBurned}</Text>}
                                </View>
                            </View>
                            <CustomButton title={"Submit"} handlePress={handleAddExercise} />
                        </View>
                    )}
                </Formik>
            }
        />
    );
};
export default AddExercise;

const localStyle = StyleSheet.create({
    fieldContainer: {
        paddingHorizontal: 30,
        paddingBottom: 20,
        justifyContent: 'center'
    },
    fieldRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
    },
    errorMessage: {
        fontSize: 11,
        color: 'red',
        padding: 5,
        fontFamily: 'Inter_300Light',
        
    }
})