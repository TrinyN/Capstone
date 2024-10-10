import { TouchableOpacity, Text, View, FlatList, StyleSheet } from 'react-native';
import styles from '../styles';
import Feather from "react-native-vector-icons/Feather";
import { useState } from 'react';
import CustomHeader from '../components/structural/CustomHeader';
import TrackerOptions from '../components/functional/TrackerOptions';
import TrackerInfo from '../components/functional/TrackerInfo';
import CustomScreen from '../components/structural/CustomScreen';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import CustomButton2 from '../components/functional/CustomButton2';
import { useWaterUnitTypesOptions, useExerciseUnitOptions } from '../constants/dropdownOptions';
import { useExerciseData, useFoodData, useWaterData } from '../constants/trackerData';
import { AddWater, AddExercise, AddPopUp } from '../components/functional/AddPopUps';

// TODO

// REFACTORING FLAGGING - Needs a Component
// 1. Screen component DONE
// 2. Screen header component 
// 3. At a glance = calculation header view component
// 4. Render list component(s) - split into header, list, and footer?
// 5. Options overlay component
// 6. Add button component DONE

// Function to design and display the tracker
const Tracker = () => {

    const pinch = Gesture.Pinch()
        .onUpdate((event) => {
            if (event.scale < 1) {
                router.push('/tracker-week');
            }
        })
        .runOnJS(true);

    const [foodName, setFoodName] = useState('')
    const [foodType, setFoodType] = useState('')

    // // Saves visibility of add pop up
    // const [visible, setVisible] = useState(false);

    // // Change visibility of add overlay
    // const toggleOverlay = () => {
    //     setVisible(!visible);
    //     setAddWaterVisible(false)
    //     setAddExerciseVisible(false)
    // };

    // // Saves visibility of add water pop up
    // const [addWaterVisible, setAddWaterVisible] = useState(false);

    // // Change visibility of add water overlay
    // const toggleWaterOverlay = () => {
    //     setAddWaterVisible(!addWaterVisible);
    //     setVisible(false)
    // };

    // // Saves visibility of add exercise pop up
    // const [addExerciseVisible, setAddExerciseVisible] = useState(false);

    // // Change visibility of add exercise overlay
    // const toggleExerciseOverlay = () => {
    //     setAddExerciseVisible(!addExerciseVisible);
    //     setVisible(false)
    // };

    // Saves visibility of options pop up
    const [visibleOptions, setVisibleOptions] = useState(false);

    // Change visibility of options
    const toggleOptions = () => {
        setVisibleOptions(!visibleOptions);
    };

    // Handle dropdown menu options for water unit type
    const { waterUnit, setWaterUnit,
        waterUnitTypes, setWaterUnitTypes } = useWaterUnitTypesOptions();

    // Handle dropdown menu options for exervise unit type
    const { exerciseUnit, setExerciseUnit,
        exerciseUnitTypes, setExerciseUnitTypes } = useExerciseUnitOptions();

    // Sample data for Breakfast, Lunch, Dinner, and Snacks
    const { foodSections, setFoodSections } = useFoodData();

    // Sample exercise data
    const { exerciseList, setExerciseList } = useExerciseData();

    // Test data, will need to start off empty and be saved for each user, will only be one number that keeps increasing as user adds more
    const { water, setWater } = useWaterData()

    // State to keep track of expanded/collapsed sections
    const [collapsedSections, setCollapsedSections] = useState({
        breakfast: false,
        lunch: false,
        dinner: false,
        snacks: false,
    });

    // Toggle collapse state
    const toggleSection = (key) => {
        setCollapsedSections((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    // Render each section with collapsibility
    const renderSection = ({ item }) => {
        return (
            <View>
                {/* Section Header (Breakfast, Lunch, Dinner) */}
                <TouchableOpacity onPress={() => toggleSection(item.key)}>
                    <View style={[styles.sectionHeader, { flexDirection: 'row' }]}>

                        {/* make style for maybe */}
                        <Text style={trackerStyles.foodSectionStyle}>{item.title}</Text>

                        <Feather name={collapsedSections[item.key] ? "chevron-down" : "chevron-up"} size={25} color='#CB9CF2'
                            style={{
                                paddingRight: 15
                            }} />
                    </View>

                </TouchableOpacity>

                {/* Render food items only if the section is expanded */}
                {!collapsedSections[item.key] && (
                    <View>
                        {item.data.map((item, index) => (
                            <View key={index} style={styles.item}>
                                <Text style={[styles.defaultWhiteText, { width: '35%', textAlign: 'left' }]}>{item.title}</Text>
                                <Text style={[styles.defaultWhiteText, { width: '10%', textAlign: 'center' }]}>{item.count}</Text>
                                <Text style={[styles.defaultWhiteText, { width: '40%', textAlign: 'right', paddingRight: 10 }]}>{item.kCal}</Text>
                            </View>
                        ))}

                    </View>

                )}
            </View>
        );
    };

    // Render each item in the exercise table
    const renderExercise = ({ item }) => {
        return (
            <View>
                {/* Render items only if the section is expanded */}
                <View>
                    <View style={[styles.item, { paddingLeft: 10 }]}>
                        <Text style={[styles.defaultWhiteText, { width: '30%', textAlign: 'left' }]}>{item.exercise}</Text>
                        <Text style={[styles.defaultWhiteText, { width: '40%', textAlign: 'center' }]}>{item.reps}</Text>
                        <Text style={[styles.defaultWhiteText, { width: '20%', textAlign: 'right', paddingRight: 10 }]}>{item.kCal}</Text>
                    </View>
                </View>
            </View>
        );
    };

    //  Returning the screen to display
    return (

        <GestureHandlerRootView>
            <GestureDetector gesture={pinch}>
                <CustomScreen
                    title='Day:'
                    title2='Monday 8/6' // test value, need to change
                    hasOptions={true}
                    toggleOptions={toggleOptions}
                    screenContent={
                        <View>
                            {/* Display Caloric Goal and Weight of User */}
                            {/* Top View to calculate user's calories eaten and burned with a formula visible to them */}
                            <TrackerInfo />

                            {/* Add Food Button */}
                            <CustomButton2
                                type='add'
                                onPress={toggleOverlay}
                            />

                            {/* View for FlatList to store all items of tracker */}
                            <View>
                                <FlatList
                                    data={foodSections}
                                    renderItem={renderSection}
                                    keyExtractor={(item) => item.key}
                                    ListHeaderComponent={
                                        <CustomHeader title1={"Food"} title2={"Svg Count"} title3={"kCal"} />
                                    }
                                    scrollEnabled={false}
                                />

                                {/* Space Between Food and Water lists */}
                                <View style={{ margin: 20 }}></View>

                                {/* Water List */}
                                <FlatList
                                    style={{
                                        borderRadius: 8,
                                    }}
                                    scrollEnabled={false}
                                    keyExtractor={(item) => item}

                                    // List Header for Water List (contains total drunk as well)
                                    ListHeaderComponent={
                                        <View style={[styles.header, { borderBottomWidth: 0 }]}>
                                            <Text style={[styles.defaultText, { paddingLeft: 10, fontSize: 19 }]}>Water</Text>
                                            <Text style={[styles.defaultWhiteText, { paddingVertical: 15, paddingRight: 10 }]}>{water} cups</Text>
                                        </View>
                                    }
                                />
                                {/* Space between Water and Exercise Lists */}
                                <View style={{ margin: 20 }}></View>

                                {/* Exercise List */}
                                <FlatList
                                    style={{
                                        borderRadius: 8,
                                    }}
                                    data={exerciseList}
                                    scrollEnabled={false}
                                    keyExtractor={(item) => item.exercise}
                                    // List header for exercise
                                    ListHeaderComponent={
                                        <CustomHeader title1={"Exercise"} title2={"Duration/Reps"} title3={"kCal"} />
                                    }

                                    // Rendering Exercise items based on data set of user
                                    renderItem={renderExercise}

                                />
                            </View>

                            {/* Space between Exercise List and screen bottom */}
                            <View style={{ padding: 40 }}></View>
                            <AddPopUp
                                visible={visible}
                                toggleOverlay={toggleOverlay}
                                toggleWaterOverlay={toggleWaterOverlay}
                                toggleExerciseOverlay={toggleExerciseOverlay}
                            />
                            <AddWater
                                addWaterVisible={addWaterVisible}
                                toggleWaterOverlay={toggleWaterOverlay}
                                toggleOverlay={toggleOverlay}
                                setWaterUnit={setWaterUnit}
                                waterUnitTypes={waterUnitTypes}
                                setWaterUnitTypes={setWaterUnitTypes}
                            />
                            <AddExercise
                                addExerciseVisible={addExerciseVisible}
                                toggleExerciseOverlay={toggleExerciseOverlay}
                                toggleOverlay={toggleOverlay}
                                setExerciseUnit={setExerciseUnit}
                                exerciseUnitTypes={exerciseUnitTypes}
                                setExerciseUnitTypes={setExerciseUnitTypes}
                            />
                            {/* Pop ups for adding food, water, or exercise*/}
                            {/* <CustomPopUp visible={visible} toggleOverlay={toggleOverlay}
                                content={
                                    <View style={{ paddingHorizontal: 20, paddingBottom: 20, alignItems: 'center', alignContent: 'center' }}>
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
                                    </View>}
                            />
                            <CustomPopUp visible={addWaterVisible} toggleOverlay={toggleWaterOverlay} hasBackButton={true} previousOverlay={toggleOverlay}
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
                            /> */}

                            {/* <CustomPopUp visible={addExerciseVisibile} toggleOverlay={toggleExerciseOverlay} hasBackButton={true} previousOverlay={toggleOverlay}
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
                            /> */}

                            {/* pop up for options */}
                            <TrackerOptions toggleOptions={toggleOptions} visibleOptions={visibleOptions} view='Day' />
                        </View>
                    }
                />
            </GestureDetector>
        </GestureHandlerRootView>
    )
}
export default Tracker;



const trackerStyles = StyleSheet.create({
    foodSectionStyle: {
        color: '#CB9CF2',
        fontFamily: 'Inter_600SemiBold',
        flex: 1,
        paddingVertical: 0,
        fontSize: 16,
        paddingLeft: 10,
        alignSelf: 'center'
    }
})