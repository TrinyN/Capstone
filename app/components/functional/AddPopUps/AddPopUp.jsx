import { Text, View } from 'react-native'
import React from 'react'
import CustomPopUp from '../../structural/CustomPopUp'
import { CustomButton } from '../CustomButton'
import styles from '../../../styles'

const AddPopUp = ({ visible, toggleOverlay, toggleWaterOverlay, toggleExerciseOverlay }) => {
    return (
        <CustomPopUp
            visible={visible}
            toggleOverlay={toggleOverlay}
            content={
                <View style={{ paddingHorizontal: 20, paddingBottom: 20, alignItems: 'center' }}>
                    <Text style={[styles.defaultWhiteText, { textAlign: 'center' }]}>
                        Which would you like to add?
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <CustomButton title={"   Water   "} handlePress={toggleWaterOverlay} />
                        <View style={{ paddingHorizontal: 10 }}>
                            <CustomButton title={"   Food   "} />
                        </View>
                        <CustomButton title={"Exercise"} handlePress={toggleExerciseOverlay} />
                    </View>
                </View>
            }
        />
    );
};

export default AddPopUp;