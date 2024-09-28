import { TouchableOpacity, TextInput, Text, View, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import Feather from "react-native-vector-icons/Feather";
import { useState } from 'react';
import { Overlay } from '@rneui/base';
import { router } from 'expo-router';

// Function to design and display the tracker
const Tracker = () => {

    const [foodName, setFoodName] = useState('')
    const [foodType, setFoodType] = useState('')

    // Saves visibility of add food pop up
    const [visible, setVisible] = useState(false);

    // Saves visibility of options pop up
    const [visibleOptions, setVisibleOptions] = useState(false);

    // Change visibility of overlay
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    // Change visibility of options
    const toggleOptions = () => {
        setVisibleOptions(!visibleOptions);
    };

    // Sample data for Breakfast, Lunch, Dinner, and Snacks
    const [foodSections, setFoodSections] = useState([
        {
            title: 'Breakfast',
            data: [
                { title: 'Eggs', count: '2', kCal: '193' },
                { title: 'Bacon', count: '2', kCal: '100' },
                { title: 'Toast', count: '1', kCal: '80' }
            ],
            key: 'breakfast'
        },
        {
            title: 'Lunch',
            data: [
                { title: 'Chicken Salad', count: '1', kCal: '350' },
                { title: 'Rice', count: '1', kCal: '200' }
            ],
            key: 'lunch'
        },
        {
            title: 'Dinner',
            data: [
                { title: 'Steak', count: '1', kCal: '500' },
                { title: 'Mashed Potatoes', count: '2', kCal: '150' }
            ],
            key: 'dinner'
        },
        {
            title: 'Snacks',
            data: [
                { title: 'Cheetos', count: '3', kCal: '300' },
                { title: 'Doritos', count: '4', kCal: '290' }
            ],
            key: 'snacks'
        }
    ]);

    // Test data, will need to start off empty and be saved for each user
    const [exerciseList, setExerciseListList] = useState([
        { exercise: 'Running', reps: '10 min', kCal: -30 },
        { exercise: 'Swimming', reps: '30 min', kCal: -50  },
    ]);

    // Test data, will need to start off empty and be saved for each user, will only be one number that keeps increasing as user adds more
    const [water, setWater] = useState([
        10,
    ]);

    // Header Component for Food FlatList
    const HeaderComponent = () => {
        return (
            <View style={styles.header}>
                <Text style={[styles.defaultText, { paddingLeft: 10, fontSize: 19 }]}>Food</Text>
                <Text style={[styles.defaultText, { fontSize: 14, textAlign: 'center' }]}>Svg Count</Text>
                <Text style={[styles.defaultText, { paddingRight: 10, fontSize: 14 }]}>kCal</Text>
            </View>
        );
    };

    // Header Component for Exercise FlatList
    const ExerciseHeaderComponent = () => {
        return (
            <View style={styles.header}>
                <Text style={[styles.defaultText, { paddingLeft: 10, fontSize: 19 }]}>Exercise</Text>
                <Text style={[styles.defaultText, { fontSize: 14, textAlign: 'center'}]}>Duration/Reps</Text>
                <Text style={[styles.defaultText, { paddingRight: 10, fontSize: 14 }]}>kCal</Text>
            </View>
        );
    };

    // Header Component for Exercise FlatList
    const WaterHeaderComponent = () => {
        return (
            <View style={[styles.header, {borderBottomWidth: 0}]}>
                <Text style={[styles.defaultText, { paddingLeft: 10, fontSize: 19 }]}>Water</Text>
                <Text style={[styles.defaultWhiteText, { paddingVertical: 15, paddingRight: 10 }]}>{water} cups</Text>
            </View>
        );
    };

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
                        <Text style={[styles.defaultText, { flex: 1, paddingVertical: 0, fontSize: 16, paddingLeft: 10 }]}>{item.title}</Text>

                        <Feather name={collapsedSections[item.key] ? "chevron-down" : "chevron-up"} size={25} color='#CB9CF2'
                            style={{
                                paddingRight: 15
                            }} />
                    </View>

                </TouchableOpacity>

                {/* Render items only if the section is expanded */}
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

    // Render each section with collapsibility
    const renderExercise = ({ item }) => {
        return (
            <View>
                {/* Render items only if the section is expanded */}
                <View>
                        <View style={[styles.item, {paddingLeft: 10}]}>
                            <Text style={[styles.defaultWhiteText, { width: '30%', textAlign: 'left'}]}>{item.exercise}</Text>
                            <Text style={[styles.defaultWhiteText, { width: '40%', textAlign: 'center'}]}>{item.reps}</Text>
                            <Text style={[styles.defaultWhiteText, { width: '20%', textAlign: 'right', paddingRight: 10 }]}>{item.kCal}</Text>
                        </View>
                </View>
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
                    {/* Display Caloric Goal and Weight of User */}
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.defaultWhiteText}>
                                Caloric Goal:
                            </Text>
                            <TextInput style={{ backgroundColor: '#1F2938', width: 50, height: 20, borderRadius: 5, marginHorizontal: 5, color: '#F2F4F3', paddingHorizontal: 5, textAlign: 'center', fontSize: 16 }}
                                placeholder='2,400'
                                placeholderTextColor={'#F2F4F3'}
                                editable={false}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={styles.defaultWhiteText}>
                                Weight:
                            </Text>
                            <TextInput style={{ backgroundColor: '#1F2938', width: 75, height: 20, borderRadius: 5, marginLeft: 5, color: '#F2F4F3', paddingHorizontal: 5, textAlign: 'left', fontSize: 16 }}

                                placeholder='105 lbs'
                                placeholderTextColor={'#F2F4F3'}
                            />
                            <Feather pointerEvents="none" name="edit-2" size={14} color="#CB9CF2" style={{ position: 'absolute', paddingRight: 2}} />
                        </View>
                    </View>

                    {/* Top View to calculate user's calories eaten and burned with a formula visible to them */}
                    <View style={{ backgroundColor: '#1F2938', borderRadius: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>

                            {/* Abstract formula to make numbers make sense*/}
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, color: '#CB9CF2', width: '19%', textAlign: 'left' }]}>
                                (Eaten
                            </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14 }]}> - </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, color: '#CB9CF2', width: '22%', textAlign: 'center' }]}>
                                Burned)
                            </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14 }]}> - </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, color: '#CB9CF2', width: '19%', textAlign: 'center' }]}>
                                BMR
                            </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14 }]}> = </Text>
                            <Text style={[styles.defaultWhiteText, { textDecorationLine: 'underline', fontSize: 14, color: '#80FF72', width: '21%', textAlign: 'right' }]}>
                                Surplus
                            </Text>
                        </View>

                        {/* TODO: Implement retrieval and calculation of calories burned and eaten, placeholder numbers for now */}
                        {/* Actual numbers of forumla */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'left', width: '19%' }]}>
                                (2,400
                            </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'center' }]}>
                                -
                            </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'center', width: '22%' }]}>
                                200)
                            </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'center' }]}>
                                -
                            </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'center', width: '19%' }]}>
                                1,200
                            </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'center' }]}>
                                =
                            </Text>
                            <Text style={[styles.defaultWhiteText, { fontSize: 14, textAlign: 'right', width: '21%' }]}>
                                800
                            </Text>
                        </View>
                    </View>

                    {/* Add Food Button */}
                    <TouchableOpacity onPress={toggleOverlay}
                        style={[styles.button, { backgroundColor: '#CB9CF2', padding: 1 }]}>
                        <Feather name="plus" size={30} color="#1F2938" />
                    </TouchableOpacity>

                    {/* View for FlatList to store all items of tracker */}
                    <View>

                        <FlatList
                            data={foodSections}
                            renderItem={renderSection}
                            keyExtractor={(item) => item.key}
                            ListHeaderComponent={HeaderComponent}
                            scrollEnabled={false}
                        />

                        {/* Space Between Food and Water lists */}
                        <View style={{ margin: 20 }}></View>

                        {/* Water List */}
                        <FlatList
                            style={{
                                backgroundColor: 'rgba(27,33,43,0.5)',
                                borderRadius: 8,
                            }}
                            scrollEnabled={false}
                            sections={water}
                            keyExtractor={(item) => item}

                            // List Header for Water List (contains total drunk as well)
                            ListHeaderComponent={WaterHeaderComponent}
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
                            // sections={exerciseList}
                            keyExtractor={(item) => item.exercise}
                            // List header for exercise
                            ListHeaderComponent={ExerciseHeaderComponent}

                            // Rendering Exercise items based on data set of user
                            renderItem={renderExercise}

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