import { Text, View } from 'react-native'
import React from 'react'
import CustomPopUp from '../../structural/CustomPopUp'
import { CustomButton } from '../CustomButton'
import styles from '../../../styles'

const AddPopUp = ({ visible, toggleOverlay, toggleWaterOverlay, toggleExerciseOverlay, toggleFoodOverlay }) => {
    return (
        <CustomPopUp
            visible={visible}
            toggleOverlay={toggleOverlay}
            content={
                <View style={{ paddingHorizontal: 20, paddingBottom: 20, alignItems: 'center' }}>
                    <Text style={[styles.defaultWhiteText, { textAlign: 'center', paddingBottom: 10 }]}>
                        Which would you like to add?
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Food"} handlePress={toggleFoodOverlay} />
                        </View>
                        <View style={{ flex: 1, paddingHorizontal: 10 }}>
                            <CustomButton title={"Water"} handlePress={toggleWaterOverlay} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Exercise"} handlePress={toggleExerciseOverlay} />
                        </View>
                    </View>
                </View>
            }
        />
    );
};
export default AddPopUp;
