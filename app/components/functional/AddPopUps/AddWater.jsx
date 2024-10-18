import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import CustomPopUp from '../../structural/CustomPopUp';
import styles from '../../../styles';
import CustomDropdown from '../CustomDropdown';
import { CustomButton } from '../CustomButton';
import { useWaterUnitTypesOptions } from '../../../constants/dropdownOptions';

const AddWater = ({ addWaterVisible, toggleWaterOverlay, previousOverlay }) => {
    
    // Handle dropdown menu options for water unit type
    const { waterUnit, setWaterUnit,
        waterUnitTypes, setWaterUnitTypes } = useWaterUnitTypesOptions();

    return (
        <CustomPopUp
            visible={addWaterVisible}
            toggleOverlay={toggleWaterOverlay}
            hasBackButton={true}
            previousOverlay={previousOverlay}
            content={
                <View style={localStyle.fieldContainer}>
                    <Text style={[styles.defaultWhiteText, { textAlign: 'center' }]}>
                        How much water did you drink?
                    </Text>
                    <View style={localStyle.fieldRow}>
                        <View style={{ flex: 1 }}>
                        <TextInput
                            style={styles.inputFieldStyle}
                            placeholder='10'
                            selectionColor='#CB9CF2'
                            placeholderTextColor='rgba(242,244,243, 0.2)'>
                        </TextInput>
                        </View>
                        <View style={{ flex: 1, paddingLeft: 10 }}>
                            <CustomDropdown
                                placeholder={'Cups'}
                                setCustomValue={setWaterUnit}
                                items={waterUnitTypes}
                                setItems={setWaterUnitTypes}
                            />
                        </View>
                    </View>
                    <CustomButton title={"Submit"} />
                </View>
            }
        />
    );
};
export default AddWater;

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
        paddingBottom: 10
    }
})
