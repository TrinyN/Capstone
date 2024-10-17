import { React, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import CustomPopUp from '../../structural/CustomPopUp';
import styles from '../../../styles';
import CustomDropdown from '../CustomDropdown';
import { CustomButton } from '../CustomButton';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useMacroUnitOptions } from '../../../constants/dropdownOptions';
import CustomPieChart from '../PieChart';

// todo: make % or grams change the calculation of pie chart, local styles, save button functionality

const AddFoodMacro = ({ addFoodMacroVisible, toggleFoodMacroOverlay }) => {
    const [series, setSeries] = useState([0, 0, 0]); // init series

    // Handle dropdown menu options for food unit type
    const { macroUnit, setMacroUnit, macroUnitTypes, setMacroUnitTypes } = useMacroUnitOptions();

    // changes series values appropriatly as user changes text input, series value changes pie chart
    const handleSeriesChange = (macro, value) => {
        const newSeries = [...series];
        if (macro === 'Carb') {
            newSeries[0] = Number(value) || 0;
        } else if (macro === 'Protein') {
            newSeries[1] = Number(value) || 0;
        } else if (macro === 'Fat') {
            newSeries[2] = Number(value) || 0;
        }
        setSeries(newSeries);
    }

    const renderMacro = (macro) => {
        return (
            <View style={[{ paddingVertical: 10, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                <View style={{ paddingLeft: 3, flex: 1 }}>
                    <Text style={styles.defaultWhiteText}>
                        {macro}{':'}
                    </Text>
                </View>
                <View style={{ padding: 5, flex: 1 }}>
                    <TextInput
                        style={[styles.inputFieldStyle]}
                        placeholder={'0'} // Set placeholder to the corresponding series value
                        selectionColor='#CB9CF2'
                        placeholderTextColor='rgba(242,244,243, 0.2)'
                        keyboardType='numeric'
                        onChangeText={(value) => handleSeriesChange(macro, value)} // Call handler on text change
                    />
                </View>
                <View style={{ flex: 1.5 }}>
                    <CustomDropdown
                        placeholder={'Grams'}
                        setCustomValue={setMacroUnit}
                        items={macroUnitTypes}
                        setItems={setMacroUnitTypes}
                    />
                </View>
            </View>
        )
    }

    return (
        <CustomPopUp
            visible={addFoodMacroVisible}
            toggleOverlay={toggleFoodMacroOverlay}
            hasBackButton={true}
            previousOverlay={toggleFoodMacroOverlay}
            content={
                <ScrollView>
                    <View style={localStyle.fieldContainer}>

                        <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                            <Text style={[styles.defaultWhiteText, { textDecorationLine: 'underline' }]}>
                                Macro-Nutrients
                            </Text>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            {renderMacro('Carb')}
                        </View>
                        <View style={{ zIndex: -1 }}>
                            {renderMacro('Protein')}
                        </View>
                        <View style={{ zIndex: -2 }}>
                            {renderMacro('Fat')}
                        </View>
                        <View style={{ paddingVertical: 10, zIndex: -3 }}>
                            <CustomPieChart series={series.every(item => item === 0) ? null : series} />
                        </View>
                        <CustomButton title={"Save"} />
                    </View>
                </ScrollView>
            }
        />
    );
};
export default AddFoodMacro;

const localStyle = StyleSheet.create({
    fieldContainer: {
        paddingHorizontal: 30,
        paddingBottom: 20,
        justifyContent: 'center'
    },
})