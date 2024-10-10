import React from 'react';
import { View, TextInput } from 'react-native';
import CustomPopUp from '../../structural/CustomPopUp';
import styles from '../../../styles';
import CustomDropdown from '../CustomDropdown';
import { CustomButton } from '../CustomButton';

const AddExercise = ({ addExerciseVisible, toggleExerciseOverlay, toggleOverlay, setExerciseUnit, exerciseUnitTypes, setExerciseUnitTypes }) => {
    return (
        <CustomPopUp visible={addExerciseVisible} toggleOverlay={toggleExerciseOverlay} hasBackButton={true} previousOverlay={toggleOverlay}
            content={
                <View style={{ paddingHorizontal: 30, paddingBottom: 20, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20 }}>
                        <TextInput style={[styles.inputFieldStyle, { flex: 1 }]} placeholder='Exercise' selectionColor='#CB9CF2' placeholderTextColor='rgba(242,244,243, 0.2)'>
                        </TextInput>
                    </View >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20 }}>
                        <View style={{ flex: 1, paddingRight: 10 }}>
                            <TextInput style={[styles.inputFieldStyle]} placeholder='10' selectionColor='#CB9CF2' placeholderTextColor='rgba(242,244,243, 0.2)'>
                            </TextInput>
                        </View >
                        <View style={{ flex: 1.25 }}>

                            <CustomDropdown
                                placeholder={'Minutes'}
                                setCustomValue={setExerciseUnit}
                                items={exerciseUnitTypes}
                                setItems={setExerciseUnitTypes}
                            />
                        </View >
                    </View >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 5, zIndex: -1 }}>
                        <View style={{ flex: 1, paddingRight: 10 }}>
                            <CustomButton title="Calculate" />
                        </View >
                        <TextInput style={[styles.inputFieldStyle, { flex: 1.1 }]} placeholder='Cals Burned' selectionColor='#CB9CF2' placeholderTextColor='rgba(242,244,243, 0.2)'>
                        </TextInput>
                    </View >
                    <CustomButton title={"Submit"} />
                </View>
            }
        />
    );
};

export default AddExercise;
