import React from 'react';
import { View, Text, TextInput } from 'react-native';
import CustomPopUp from '../../structural/CustomPopUp';
import styles from '../../../styles';
import CustomDropdown from '../CustomDropdown';
import { CustomButton } from '../CustomButton';
const AddWater = ({ addWaterVisible, toggleWaterOverlay, previousOverlay, setWaterUnit, waterUnitTypes, setWaterUnitTypes }) => {
    return (
        <CustomPopUp visible={addWaterVisible} toggleOverlay={toggleWaterOverlay} hasBackButton={true} previousOverlay={previousOverlay}
            content={
                <View style={{ paddingHorizontal: 30, paddingBottom: 20, justifyContent: 'center' }}>
                    <Text style={[styles.defaultWhiteText, { textAlign: 'center' }]}>
                        How much water did you drink?
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, paddingBottom: 10 }}>
                        <TextInput style={[styles.inputFieldStyle, { flex: 1 }]} placeholder='10' selectionColor='#CB9CF2' placeholderTextColor='rgba(242,244,243, 0.2)'>
                        </TextInput>
                        <View style={{ flex: 1, paddingLeft: 10 }}>
                            <CustomDropdown
                                placeholder={'Cups'}
                                setCustomValue={setWaterUnit}
                                items={waterUnitTypes}
                                setItems={setWaterUnitTypes}
                            />
                        </View>
                    </View >
                    <CustomButton title={"Submit"} />
                </View>}
        />
    );
};
export default AddWater;
