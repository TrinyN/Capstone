import { React, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import CustomPopUp from '../../structural/CustomPopUp';
import styles from '../../../styles';
import CustomDropdown from '../CustomDropdown';
import { CustomButton } from '../CustomButton';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from "react-native-vector-icons/Feather";
import { useTimeFrameOptions } from '../../../constants/dropdownOptions';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomPieChart from '../PieChart';
import AddFoodMacro from './AddFoodMacro';

// todo: local styles, add button functionality, quick fill, search database. Make it so 
// info gets deleted when overlay is closed/when food is successfully added to tracker
// also only allow press add if all non empty 

const AddFood = ({ previousOverlay, addFoodVisible, toggleFoodOverlay, toggleFoodConfirmOverlay, setFood }) => {
    const [series, setSeries] = useState([0, 0, 0]); // init series

    // Handle dropdown menu options for food unit type
    const { timeFrame, setTimeFrame,
        timeFrameTimes, setTimeFrameTimes } = useTimeFrameOptions();

    // Saves visibility of add water pop up
    const [addFoodMacroVisible, setAddFoodMacroVisible] = useState(false);

    // Change visibility of add water overlay
    const toggleFoodMacroOverlay = () => {
        setAddFoodMacroVisible(!addFoodMacroVisible);
    };

    const [foodName, setFoodName] = useState('')
    const [calPerSvg, setCalPerSvg] = useState('')
    const [svgEaten, setSvgEaten] = useState('')

    const resetData = () => {
        setFood("")
        setFoodName("")
        setCalPerSvg("")
        setSvgEaten("")
        setSeries([0,0,0])
        setTimeFrame("")
    }

    // When add button is pressed
    const handlePress = () => {
        setFood(
            {
                title: foodName, 
                calPerSvg: calPerSvg, 
                svgEaten: svgEaten, 
                carb: series[0], 
                protein: series[1],
                fat: series[2],
                timeFrame: timeFrame
            }
        )
        toggleFoodConfirmOverlay()
        setTimeout(() => toggleFoodOverlay(), 200) // allows enough time for confirmation pop up to appear before close food pop up
        setTimeout(() => resetData(), 400) // resets food info after adding it to the confirmation pop up
    }

    return (
        <CustomPopUp
            visible={addFoodVisible}
            toggleOverlay={toggleFoodOverlay}
            hasBackButton={true}
            previousOverlay={previousOverlay}
            content={
                <ScrollView>
                    <View style={localStyle.fieldContainer}>

                        <View style={localStyle.viewContainer}>
                            <Text style={[styles.smallText, { color: '#828282' }]}>
                                Quick Fill
                            </Text>
                            <TouchableOpacity>
                                <Feather name={"camera"} size={25} color='#CB9CF2' style={{ paddingHorizontal: 10 }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons name="barcode-sharp" size={30} color="#CB9CF2" style={{ bottom: 2 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={localStyle.viewContainer}>
                            <TextInput
                                style={[styles.inputFieldStyle, { flex: 1 }]}
                                placeholder='Food Name' 
                                selectionColor='#CB9CF2'
                                placeholderTextColor='rgba(242,244,243, 0.2)'
                                onChangeText={newText => setFoodName(newText)}
                                defaultValue={foodName}
                                >

                            </TextInput>
                            <Feather name={"search"} size={20} color='#828282' style={localStyle.searchIcon} />

                        </View>
                        <View style={localStyle.viewContainer}>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    style={styles.inputFieldStyle}
                                    placeholder='Cal Per Svg' 
                                    selectionColor='#CB9CF2'
                                    placeholderTextColor='rgba(242,244,243, 0.2)'
                                    onChangeText={newText => setCalPerSvg(newText)}
                                    defaultValue={calPerSvg}
                                    keyboardType='numeric'
                                    >
                                </TextInput>
                            </View>
                            <View style={{ paddingLeft: 10, flex: 1 }}>
                                <TextInput
                                    style={styles.inputFieldStyle}
                                    placeholder='Svgs Eaten' 
                                    selectionColor='#CB9CF2'
                                    placeholderTextColor='rgba(242,244,243, 0.2)'
                                    onChangeText={newText => setSvgEaten(newText)}
                                    defaultValue={svgEaten}
                                    keyboardType='numeric'
                                    >
                                </TextInput>
                            </View>
                        </View>

                        <View style={{ paddingVertical: 10 }}>
                            <CustomDropdown
                                placeholder={'Breakfast'}
                                setCustomValue={setTimeFrame}
                                items={timeFrameTimes}
                                setItems={setTimeFrameTimes}
                            />
                        </View>
                        <View style={{ paddingVertical: 10, zIndex: -1 }}>
                            <Pressable onPress={toggleFoodMacroOverlay}>
                                <CustomPieChart hasTitle={true} editable={true} series={series.every(item => item === 0) ? null : series} />
                            </Pressable>
                        </View>

                        {/* funtionality of button doesnt work if you use custom button for some reason */}
                        <Pressable
                            onPress={handlePress}
                            style={[styles.button, { backgroundColor: '#CB9CF2', zIndex: -1 }]}
                        >
                            <Text style={styles.buttonText}>
                                Add
                            </Text>
                        </Pressable>
                    </View>
                    <AddFoodMacro
                        toggleFoodMacroOverlay={toggleFoodMacroOverlay}
                        addFoodMacroVisible={addFoodMacroVisible}
                        setFoodSeries={setSeries}
                    />

                </ScrollView>
            }
        />
    );
};
export default AddFood;

const localStyle = StyleSheet.create({
    fieldContainer: {
        paddingHorizontal: 30,
        paddingBottom: 20,
        justifyContent: 'center'
    },
    viewContainer: {
        flexDirection: 'row',
        paddingVertical: 10
    },
    searchIcon: {
        position: 'absolute',
        right: 15,
        top: 21
    }
})