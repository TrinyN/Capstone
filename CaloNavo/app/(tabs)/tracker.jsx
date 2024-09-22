import { TouchableOpacity, TextInput, Text, View, SectionList, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import Feather from "react-native-vector-icons/Feather";
import { useState, useEffect } from 'react';
import { Overlay } from '@rneui/base';
import { router } from 'expo-router';

// Function to design and display the tracker
const Tracker = () => {

    const [foodName, setFoodName] = useState('')
    const [foodType, setFoodType] = useState('')

    // saves visibility of add food pop up
    const [visible, setVisible] = useState(false);

    // saves visibility of options pop up
    const [visibleOptions, setVisibleOptions] = useState(false);

    // change visibility of overlay
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    // change visibility of options
    const toggleOptions = () => {
        setVisibleOptions(!visibleOptions);
    };

    // Sample data for Breakfast, Lunch, Dinner
    const [foodSections, setFoodSections] = useState([
        { title: 'Breakfast', data: ['Eggs', 'Bacon', 'Toast'], key: 'breakfast' },
        { title: 'Lunch', data: ['Chicken Salad', 'Rice'], key: 'lunch' },
        { title: 'Dinner', data: ['Steak', 'Mashed Potatoes'], key: 'dinner' },
    ])

    // Header Component for Food FlatList
    const HeaderComponent = () => {
        return (
            <View style={styles.header}>
                <Text style={[styles.defaultText, { paddingLeft: 10, fontSize: 19 }]}>Food</Text>
                <Text style={[styles.defaultText, { width: '24%', fontSize: 14 }]}>Svg Count</Text>
                <Text style={[styles.defaultText, { paddingRight: 10, fontSize: 14 }]}>kCal</Text>
            </View>
        );
    };
    // test data, will need to start off empty and be saved for each user
    const [exerciseList, setExerciseListList] = useState([
        { data: ['Running'] },
    ]);

    // Header Component for Exercise FlatList
    const ExerciseHeaderComponent = () => {
        return (
            <View style={styles.header}>
                <Text style={[styles.defaultText, { paddingLeft: 10, fontSize: 19 }]}>Exercise</Text>
                <Text style={[styles.defaultText, { fontSize: 14 }]}>Duration/Reps</Text>
                <Text style={[styles.defaultText, { paddingRight: 10, fontSize: 14 }]}>kCal</Text>
            </View>
        );
    };

    // test data, will need to start off empty and be saved for each user
    const [water, setWater] = useState([
        { data: ['10 cups'] },
    ]);

    // Header Component for Exercise FlatList
    const WaterHeaderComponent = () => {
        return (
            <View style={styles.header}>
                <Text style={[styles.defaultText, { paddingLeft: 10, fontSize: 19 }]}>Water</Text>
                <Text style={[styles.defaultText, { fontSize: 14 }]}>{water[0].data}</Text>
            </View>
        );
    };

    // State to keep track of expanded/collapsed sections
    const [collapsedSections, setCollapsedSections] = useState({
        Breakfast: false,
        Lunch: false,
        Dinner: false,
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
                        <Text style={[styles.defaultText, { flex: 1, paddingVertical: 0, fontSize: 16, paddingLeft: 10 }]}>{item.title}</Text>

                        <Feather name={collapsedSections[item.title] ? "chevron-down" : "chevron-up"} size={25} color='#CB9CF2'
                            style={{
                                paddingRight: 15
                            }} />
                    </View>

                </TouchableOpacity>

                {/* Render items only if the section is expanded */}
                {!collapsedSections[item.key] && (
                    <View>
                        {item.data.map((food, index) => (
                            <View key={index} style={styles.item}>
                                <Text style={[styles.defaultWhiteText, { width: '35%', textAlign: 'left' }]}>{food}</Text>
                                <Text style={[styles.defaultWhiteText, { width: '10%', textAlign: 'center' }]}>1</Text>
                                <Text style={[styles.defaultWhiteText, { width: '40%', textAlign: 'right', paddingRight: 10 }]}>200</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        );
    };

    // // called when user clicks add button
    // const handleAddFood = () => {
    //     // find the section that matches foodType entered by user
    //     const updatedShoppingList = shoppingList.map(section => {
    //         if (section.title == foodType) {
    //             // update the data array for the matched food type
    //             return {
    //                 ...section,
    //                 data: [...section.data, foodName.charAt(0).toUpperCase() + foodName.slice(1).toLowerCase()] // Add the new food item
    //             };
    //         }
    //         // return the section as is if it does not match
    //         return section;
    //     });

    //     // update the shopping list
    //     setShoppingList(updatedShoppingList)

    //     // close overlay
    //     toggleOverlay()
    // }

    //  Returning the screen to display
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                {/* The "body" of the screen, including its major elements */}
                <View style={[styles.viewContainer, { flex: 1 }]}>

                    {/* Screen Header */}
                    <View style={{ marginTop: 70, flexDirection: 'row', paddingBottom: 20, alignItems: 'center' }}>
                        <Text style={[styles.titleText, { flex: 1 }]}>
                            Tracker
                        </Text>
                        <TouchableOpacity onPress={toggleOptions} style={{ width: 30 }}>
                            <Feather name="more-vertical" size={30} color="#CB9CF2" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingVertical: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.defaultWhiteText}>
                                Caloric Goal:
                            </Text>
                            <TextInput style={{ backgroundColor: '#1F2938', width: 50, height: 20, borderRadius: 5, marginHorizontal: 5, color: '#F2F4F3', paddingHorizontal: 5, textAlign: 'center' }}
                                placeholder='2,400'
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={styles.defaultWhiteText}>
                                Weight:
                            </Text>
                            <TextInput style={{ backgroundColor: '#1F2938', width: 70, height: 20, borderRadius: 5, marginLeft: 5, color: '#F2F4F3', paddingHorizontal: 5, textAlign: 'left' }}
                                placeholder='105 lbs'
                            />
                            
                            <Feather name="edit-2" size={14} color="#CB9CF2" style={{position: 'absolute', paddingRight: 2, verticalAlign: 'bottom'}}/>


                        </View>
                    </View>

                    {/* Top View to calculate user's calories eaten and burned with a formula visible to them */}
                    <View style={{ backgroundColor: '#1F2938', borderRadius: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>

                            {/* Abstract formula to make numbers make sense*/}
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, color: '#CB9CF2', width: '16%', textAlign: 'left' }]}>
                                (Eaten
                            </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14 }]}> - </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, color: '#CB9CF2', width: '17%', textAlign: 'center' }]}>
                                Burned)
                            </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14 }]}> - </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, color: '#CB9CF2', width: '15%', textAlign: 'center' }]}>
                                BMR
                            </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14 }]}> = </Text>
                            <Text style={[styles.defaultWhiteText, { textDecorationLine: 'underline', fontSize: 14, color: '#80FF72', width: '16%', textAlign: 'right' }]}>
                                Surplus
                            </Text>
                        </View>

                        {/* TODO: Implement retrieval and calculation of calories burned and eaten */}
                        {/* Actual numbers of forumla */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'left', width: '16%' }]}>
                                (2,400
                            </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'center' }]}>
                                -
                            </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'center', width: '17%' }]}>
                                200)
                            </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'center' }]}>
                                -
                            </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'center', width: '15%' }]}>
                                1,200
                            </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'center' }]}>
                                =
                            </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'right', width: '16%' }]}>
                                800
                            </Text>
                        </View>
                    </View>

                    {/* Add Food Button */}
                    <TouchableOpacity onPress={toggleOverlay}
                        style={[styles.button, { backgroundColor: '#CB9CF2', padding: 1 }]}>
                        <Feather name="plus" size={30} color="#1F2938" />
                    </TouchableOpacity>

                    {/* View for SectionList to store all items of tracker */}
                    <View>

                        <FlatList
                            data={foodSections}
                            renderItem={renderSection}
                            keyExtractor={(item) => item.key}
                            ListHeaderComponent={HeaderComponent}
                        />

                        {/* Space Between Food and Water lists */}
                        <View style={{ margin: 20 }}></View>

                        {/* Water List */}
                        <SectionList
                            style={{
                                backgroundColor: 'rgba(27,33,43,0.5)',
                                borderRadius: 8,
                            }}
                            scrollEnabled={false}
                            sections={water}
                            keyExtractor={(item) => item}

                            // Generating water amount drank by retrieving data(?)
                            renderItem={({ item, section }) =>
                                !collapsedSections[section.title] && (
                                    <View>
                                        <View style={{ backgroundColor: '#0E1116', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
                                            <Text
                                                style={[
                                                    styles.defaultWhiteText,
                                                    {
                                                        paddingLeft: 30,
                                                        paddingVertical: 7,
                                                    }
                                                ]}>
                                                {item}
                                            </Text>
                                        </View>
                                        <View style={{ height: 1, backgroundColor: 'rgba(242,244,243,0.2)' }} />
                                    </View>
                                )
                            }
                            // List Header for Water List
                            ListHeaderComponent={
                                <View style={{ backgroundColor: '#1F2938' }}>
                                    <Text style={[styles.defaultText, { paddingVertical: 10, paddingHorizontal: 15 }]}>
                                        Water
                                    </Text>
                                    <View style={{ height: 2, backgroundColor: '#828282' }} />
                                </View>

                            }
                        />
                        {/* Space between Water and Exercise Lists */}
                        <View style={{ margin: 20 }}></View>

                        {/* Exercise List */}
                        <SectionList
                            style={{
                                backgroundColor: 'rgba(27,33,43,0.5)',
                                borderRadius: 8,
                            }}
                            scrollEnabled={false}
                            sections={exerciseList}
                            keyExtractor={(item) => item}

                            // Rendering Exercise items based on data set of user
                            renderItem={({ item, section }) =>
                                !collapsedSections[section.title] && (
                                    <View>
                                        <View style={{ backgroundColor: '#0E1116', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
                                            <Text
                                                style={[
                                                    styles.defaultWhiteText,
                                                    {
                                                        paddingLeft: 30,
                                                        paddingVertical: 7,
                                                    }
                                                ]}>
                                                {item}
                                            </Text>
                                        </View>
                                        <View style={{ height: 1, backgroundColor: 'rgba(242,244,243,0.2)' }} />
                                    </View>
                                )
                            }

                            // List Header for Exercise List
                            ListHeaderComponent={
                                <View style={{ backgroundColor: '#1F2938' }}>
                                    <Text style={[styles.defaultText, { paddingVertical: 10, paddingHorizontal: 15 }]}>
                                        Exercise
                                    </Text>
                                    <View style={{ height: 2, backgroundColor: '#828282' }} />
                                </View>

                            }
                        />
                    </View>

                    {/* Space between Exercise List and screen bottom */}
                    <View style={{ padding: 40 }}></View>

                    {/* pop up for adding food, water, or exercise*/}
                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}
                        overlayStyle={{
                            backgroundColor: '#0E1116', borderRadius: 8,
                            borderColor: '#CB9CF2', borderWidth: 2, width: '75%', height: '50%',
                            flex: 0.4
                        }}>

                        {/* View at top to hold exit button */}
                        <View style={{ paddingVertical: 8, paddingRight: 8, flexDirection: 'row-reverse' }}>
                            <TouchableOpacity onPress={toggleOverlay} style={{ width: 25 }}>
                                <Feather name="x" size={25} color="#F2F4F3" />
                            </TouchableOpacity>
                        </View>

                        {/* View to hold input fields and sumbit button */}
                        <View style={[styles.viewContainer, {}]}>

                            {/* Food name input */}
                            <View style={{ padding: 10 }}>
                                <TextInput style={styles.inputFieldStyle}
                                    placeholder='Food Name'
                                    selectionColor='#CB9CF2'
                                    placeholderTextColor='rgba(242,244,243, 0.2)'
                                    onChangeText={(text) => setFoodName(text)}
                                >
                                </TextInput>
                            </View>

                            {/* Food type dropdown */}
                            <View style={{ padding: 10 }}>
                                <TextInput style={[styles.inputFieldStyle]}
                                    placeholder='Food Type'
                                    selectionColor='#CB9CF2'
                                    placeholderTextColor='rgba(242,244,243, 0.2)'
                                    onChangeText={(text) => setFoodType(text)}
                                >
                                </TextInput>
                            </View>

                            {/* Submit button */}
                            <View style={{ paddingHorizontal: 10 }}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: '#CB9CF2' }]}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Overlay>

                    {/* pop up for options */}
                    <Overlay isVisible={visibleOptions} onBackdropPress={toggleOptions} overlayStyle={[styles.optionsMenu, { width: '70%' }]}>


                        {/* View containing option choices */}
                        <View style={{ paddingHorizontal: 8, justifyContent: 'center' }}>

                            {/* Notes Option Button */}
                            {/* TODO: Choose:
                                1. REMOVE take notes from tracker WEEK and MONTH screens
                                2. WHEN PRESSED make user choose a DATE to apply notes to */}
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name="edit-3" size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
                                <Text style={styles.optionsText}>
                                    Take Notes
                                </Text>
                            </TouchableOpacity>

                            {/* Shopping List Option Button */}
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPressOut={toggleOptions}>

                                <Feather name="shopping-cart" size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
                                <Text style={styles.optionsText}>
                                    Generate Shopping List
                                </Text>
                            </TouchableOpacity>

                            {/* Zoom in Option Button */}
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', opacity: 0.2 }}
                                disabled={true}>

                                <Feather name="maximize-2" size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
                                <Text style={styles.optionsText}>
                                    Zoom In
                                </Text>
                            </TouchableOpacity>

                            {/* Zoom out Option Button */}
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => router.push('/tracker-week')}
                                onPressOut={toggleOptions}>

                                <Feather name="minimize-2" size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
                                <Text style={styles.optionsText}>
                                    Zoom Out
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Overlay>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Tracker;