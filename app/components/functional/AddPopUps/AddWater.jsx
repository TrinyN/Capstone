import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import CustomPopUp from '../../structural/CustomPopUp';
import styles from '../../../styles';
import CustomDropdown from '../CustomDropdown';
import { CustomButton } from '../CustomButton';
import { useWaterUnitTypesOptions } from '../../../constants/dropdownOptions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { React, useState } from 'react';

const AddWater = ({ addWaterVisible, toggleWaterOverlay, previousOverlay }) => {

    // Handle dropdown menu options for water unit type
    const { waterUnit, setWaterUnit,
        waterUnitTypes, setWaterUnitTypes } = useWaterUnitTypesOptions();

    const [waterAmount, setWaterAmount] = useState(0)

    const handleAddWater = async () => {
        try {
            if (waterAmount == 0) {
                Alert.alert("Error", "Please enter a valid amount")
            }
            else {
                const userID = auth().currentUser.uid;
                const currDate = new Date()
                const formattedDate = `${(currDate.getMonth() + 1).toString().padStart(2, '0')}-${currDate.getDate().toString().padStart(2, '0')}-${currDate.getFullYear()}`;
                const trackerDayRef = firestore().collection('Users').doc(userID).collection('Tracker').doc(formattedDate)
                
                const docSnapshot = await trackerDayRef.get();
                const oldWaterTotal = docSnapshot.data().water;

                trackerDayRef.update({
                    water: Number(oldWaterTotal) + Number(waterAmount)
                })

                toggleWaterOverlay()
                Alert.alert('', "Water Successfully Added", [{ text: 'OK' }])
                setWaterAmount(0)
            }

        } catch (e) {
            alert('Error: ', e.message)
        }
    }

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
                                placeholderTextColor='rgba(242,244,243, 0.2)'
                                keyboardType='numeric'
                                onChangeText={newVal => setWaterAmount(newVal)}
                                defaultValue={waterAmount}
                            >
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
                    <CustomButton title={"Submit"} handlePress={handleAddWater} />
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
    },
})
