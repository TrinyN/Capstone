import { React, useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import CustomPopUp from '../../structural/CustomPopUp';
import styles from '../../../styles';
import CustomDropdown from '../CustomDropdown';
import { CustomButton } from '../CustomButton';
import { useExerciseUnitOptions } from '../../../constants/dropdownOptions';
import CustomButton2 from '../CustomButton2';
import { getTrackerDayRef } from '../../../constants/getTrackerDayRef';
import firestore from '@react-native-firebase/firestore';

// TODO: defualt for exercise unit is last exercise unit but looks like itll be minutes

const AddExercise = ({ addExerciseVisible, toggleExerciseOverlay, previousOverlay }) => {

    // Handle dropdown menu options for exercise unit type
    const { exerciseUnit, setExerciseUnit,
        exerciseUnitTypes, setExerciseUnitTypes } = useExerciseUnitOptions();

    const [exercise, setExercise] = useState("");
    const [duration, setDuration] = useState(0);
    const [calsBurned, setCalsBurned] = useState(0);

    const handleAddExercise = async () => {
        try {
            if (exercise == "") {
                alert("Please enter an exercise")
            }
            else {
                const trackerDayRef = getTrackerDayRef();

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
                <View style={localStyle.fieldContainer}>
                    <View style={localStyle.fieldRow}>
                        <TextInput
                            style={[styles.inputFieldStyle, { flex: 1 }]}
                            placeholder='Exercise'
                            selectionColor='#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'
                            onChangeText={newVal => setExercise(newVal)}
                            defaultValue={exercise}
                        >
                        </TextInput>
                    </View>
                    <View style={localStyle.fieldRow}>
                        <View style={{ flex: 1, paddingRight: 10 }}>
                            <TextInput
                                style={[styles.inputFieldStyle]}
                                placeholder='10'
                                selectionColor='#CB9CF2'
                                placeholderTextColor='rgba(242,244,243, 0.2)'
                                keyboardType='numeric'
                                onChangeText={newVal => setDuration(newVal)}
                                defaultValue={duration}
                                >
                            </TextInput>
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
                                onChangeText={newVal => setCalsBurned(newVal)}
                                defaultValue={calsBurned}
                                >
                            </TextInput>
                        </View>
                    </View>
                    <CustomButton title={"Submit"} handlePress={handleAddExercise} />
                </View>
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
    }
})