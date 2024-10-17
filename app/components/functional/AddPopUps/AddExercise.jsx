import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomPopUp from '../../structural/CustomPopUp';
import styles from '../../../styles';
import CustomDropdown from '../CustomDropdown';
import { CustomButton } from '../CustomButton';
import { useExerciseUnitOptions } from '../../../constants/dropdownOptions';

const AddExercise = ({ addExerciseVisible, toggleExerciseOverlay, previousOverlay }) => {

    // Handle dropdown menu options for exervise unit type
    const { exerciseUnit, setExerciseUnit,
        exerciseUnitTypes, setExerciseUnitTypes } = useExerciseUnitOptions();

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
                            placeholder='Exercise' selectionColor='#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'>
                        </TextInput>
                    </View>
                    <View style={localStyle.fieldRow}>
                        <View style={{ flex: 1, paddingRight: 10 }}>
                            <TextInput
                                style={[styles.inputFieldStyle]}
                                placeholder='10' selectionColor='#CB9CF2'
                                placeholderTextColor='rgba(242,244,243, 0.2)'>
                            </TextInput>
                        </View>
                        <View style={{ flex: 1.25 }}>
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
                            <CustomButton title="Calculate" />
                        </View>
                        <TextInput
                            style={[styles.inputFieldStyle, { flex: 1.1 }]}
                            placeholder='Cals Burned'
                            selectionColor='#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'>
                        </TextInput>
                    </View>
                    <CustomButton title={"Submit"} />
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
        paddingTop: 20
    }
})
