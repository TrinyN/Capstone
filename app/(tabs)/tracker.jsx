import { TouchableOpacity, Text, View, FlatList, StyleSheet, SectionList } from 'react-native';
import styles from '../styles';
import Feather from "react-native-vector-icons/Feather";
import { useEffect, useState } from 'react';
import CustomHeader from '../components/structural/CustomHeader';
import TrackerOptions from '../components/functional/TrackerOptions';
import TrackerInfo from '../components/functional/TrackerInfo';
import CustomScreen from '../components/structural/CustomScreen';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { router, useLocalSearchParams } from 'expo-router';
import CustomButton2 from '../components/functional/CustomButton2';
import { useExerciseData, useFoodData, useWaterAndNotesData, getDate, getNotes, getTotalEaten } from '../constants/trackerData';
import { AddWater, AddExercise, AddPopUp, AddFood } from '../components/functional/AddPopUps';
import { CollapseSection } from '../constants/CollapseSection';
import AddNotes from '../components/functional/AddPopUps/AddNotes';
import AddFoodConfirmation from '../components/functional/AddPopUps/AddFoodConfirmation';
import { userDataItems } from '../constants/profileData';

// TODO: the use of add pop up components arent the most efficient
// PROBLEM: after adding water, doesn't update value of list but does in database, need to rerender

// REFACTORING FLAGGING - Needs a Component
// 4. Render list component(s) - split into header, list, and footer?

// Function to design and display the tracker
const Tracker = () => {
    const [date, setDate] = useState(new Date());

    const { openOverlay } = useLocalSearchParams();         // Used for Quick Track frame

    const pinch = Gesture.Pinch()
        .onUpdate((event) => {
            if (event.scale < 1) {
                router.push('/tracker-week');
            }
        })
        .runOnJS(true);

    const { collapsedSections, toggleCollapse } = CollapseSection();

    // Saves visibility of add pop up
    const [visible, setVisible] = useState(false);

    const [food, setFood] = useState("")

    // Change visibility of add overlay
    const toggleOverlay = () => {
        setVisible(!visible);
        setAddWaterVisible(false)
        setAddExerciseVisible(false)
        setAddFoodVisible(false)
    };

    useEffect(() => {
        // const openOverlay = routerPrev.query?openOverlay ?? false;
        if (openOverlay === 'true') {
            toggleOverlay();
        }
    }, [openOverlay]);

    // Saves visibility of add water pop up
    const [addWaterVisible, setAddWaterVisible] = useState(false);

    // Change visibility of add water overlay
    const toggleWaterOverlay = () => {
        setAddWaterVisible(!addWaterVisible);
        setVisible(false)
    };

    // Saves visibility of add food pop up
    const [addFoodVisible, setAddFoodVisible] = useState(false);

    // Change visibility of add food overlay
    const toggleFoodOverlay = () => {
        setAddFoodVisible(!addFoodVisible);
        setVisible(false)
    };

    // Saves visibility of add exercise pop up
    const [addExerciseVisible, setAddExerciseVisible] = useState(false);

    // Change visibility of add exercise overlay
    const toggleExerciseOverlay = () => {
        setAddExerciseVisible(!addExerciseVisible);
        setVisible(false)
    };

    // Saves visibility of food confirmation pop up
    const [addFoodConfirmVisible, setAddFoodConfirmVisible] = useState(false);

    // Change visibility of food confirmation overlay
    const toggleFoodConfirmOverlay = () => {
        setAddFoodConfirmVisible(!addFoodConfirmVisible);
    };

    /////////////////////////////////////////////////
    // Saves visibility of add notes pop up
    const [addNotesVisible, setAddNotesVisible] = useState(false);

    // Change visibility of add notes pop up
    const toggleNotesOverlay = () => {
        setAddNotesVisible(!addNotesVisible);
        setVisibleOptions(false);
        setVisible(false);
    }

    // Saves visibility of options pop up
    const [visibleOptions, setVisibleOptions] = useState(false);

    // Change visibility of options
    const toggleOptions = () => {
        setVisibleOptions(!visibleOptions);
    };

    const { setItems, items, foodList, totalCalsEaten } = useFoodData(date);
    const { exerciseList, totalCalsBurned } = useExerciseData(date);
    const {water, notes, stars} = useWaterAndNotesData(date);

    // const { notes, stars } = getNotes(date);

    // gets current date (ex: Saturday 11/9)
    const formattedDate = getDate(date);

    // get profile data to calculate BMR
    const { userInfo, setUserInfo } = userDataItems();

    const calculateAge = (dob) => {
        // Split the MM/DD/YYYY format into parts
        const [month, day, year] = dob.split('/');
        // Reformat to YYYY-MM-DD (this format works with new Date())
        const birthDate = new Date(`${year}-${month}-${day}`);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();

        // Check if the birthday has occurred this year
        const hasHadBirthdayThisYear = (today.getMonth() > birthDate.getMonth()) ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

        if (!hasHadBirthdayThisYear) {
            age--;
        }
        return age;
    }

    // gets profile info needed for BMR calculation
    const { weight, height, age, gender, weightGoal, calGoal } = userInfo.reduce((acc, item) => {
        if (item.title === "Weight") acc.weight = parseFloat(item.value); // parse float turns string to number ignoring letters
        if (item.title === "Height") acc.height = parseFloat(item.value);
        if (item.title === "Date of Birth") acc.age = calculateAge(item.value);
        if (item.title === "Gender") acc.gender = item.value;
        if (item.title === "Weight Goal") acc.weightGoal = item.value;
        if (item.title === "Caloric Goal") acc.calGoal = item.value.replace(" per day", '');
        return acc;
    }, {});

    // calculates BMR using Mifflin-St Jeor Equation
    const calcBMR = () => {
        const s = gender === 'Male' ? 5 : -161;

        // calculates BMR, round to nearest whole number, and converts weight from lbs to kg
        const BMR = Math.round(10 * (weight * 0.45359237) + 6.25 * height - 5 * age + s)
        return BMR
    }

    // changes date to be next day
    const nextDay = () => {
        setDate(prevDate => {
            const newDate = new Date(prevDate); // Clone the current date
            newDate.setDate(newDate.getDate() + 1); // Add 1 day
            return newDate; // Update state with the new date
        });
    }

    // changes date to be previous day
    const previousDay = () => {
        setDate(prevDate => {
            const newDate = new Date(prevDate); // Clone the current date
            newDate.setDate(newDate.getDate() - 1); // Subtract 1 day
            return newDate; // Update state with the new date
        });
    }

    // Render each section with collapsibility
    const renderFood = ({ item, section }) => { // item = food, section = foodTime
        return (
            <View>
                {/* Render food items only if the section is expanded */}
                {!collapsedSections[section.title] && (
                    // COME BACK HERE
                    <View>
                        <View style={localStyle.item}>
                            <Text style={[styles.defaultWhiteText, { width: '35%', textAlign: 'left' }]}>{item.foodName}</Text>
                            <Text style={[styles.defaultWhiteText, { width: '10%', textAlign: 'center' }]}>{item.svgEaten}</Text>
                            <Text style={[styles.defaultWhiteText, { width: '40%', textAlign: 'right', paddingRight: 10 }]}>{item.calPerSvg}</Text>
                        </View>
                    </View>
                )}
            </View>
        );
    };
    // Render the section headers
    const renderTimeFrHeaders = ({ section }) => {
        return (
            <View>
                {/* Section Header (Breakfast, Lunch, Dinner) */}
                <TouchableOpacity onPress={() => toggleCollapse(section.title)}>
                    <View style={[localStyle.sectionHeader, { flexDirection: 'row' }]}>
                        {/* make style for maybe */}
                        <Text style={localStyle.foodSectionStyle}>{section.title}</Text>

                        <Feather name={collapsedSections[section.title] ? "chevron-down" : "chevron-up"} size={25} color='#CB9CF2'
                            style={{ paddingRight: 15 }} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    // Render each item in the exercise table
    const renderExercise = ({ item }) => {
        return (
            <View>
                {/* Render items only if the section is expanded */}
                <View>
                    <View style={[localStyle.item, { paddingLeft: 10 }]}>
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
                    title2={formattedDate} // test value, need to change
                    hasOptions={true}
                    toggleOptions={toggleOptions}
                    isTrackerScreen={true}
                    next={nextDay}
                    previous={previousDay}
                    date={date}
                    screenContent={
                        <View>
                            {/* test values, will need to get users info from database */}
                            <TrackerInfo
                                caloricGoal={calGoal}
                                weight={"105"}
                                eaten={totalCalsEaten}
                                burned={totalCalsBurned}
                                bmr={calcBMR()}
                                weightGoal={weightGoal}
                            />
                            {/* Add Food Button */}
                            <CustomButton2
                                type='add'
                                onPress={toggleOverlay}
                            />
                            {/* View for FlatList to store all items of tracker */}
                            <View>
                                <SectionList
                                    sections={foodList}
                                    // keyExtractor={(item) => item}
                                    scrollEnabled={false}
                                    ListHeaderComponent={
                                        <CustomHeader title1={"Food"} title2={"Svg Count"} title3={"kCal"} />
                                    }
                                    renderItem={renderFood} // check this for rendering (and associated method)
                                    renderSectionHeader={renderTimeFrHeaders}
                                />
                                {/* Space Between Food and Water lists */}
                                <View style={{ margin: 20 }}></View>
                                {/* Water List */}
                                <FlatList
                                    scrollEnabled={false}
                                    // keyExtractor={(item) => item}

                                    // List Header for Water List (contains total drunk as well)
                                    ListHeaderComponent={
                                        <View style={[styles.header, { borderBottomWidth: 0, borderRadius: 8 }]}>
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
                                    // keyExtractor={(item) => item.exercise}
                                    // List header for exercise
                                    ListHeaderComponent={
                                        <CustomHeader title1={"Exercise"} title2={"Duration/Reps"} title3={"kCal"} />
                                    }
                                    // Rendering Exercise items based on data set of user
                                    renderItem={renderExercise}
                                />
                            </View>

                            {/* Pop ups for adding food, water, or exercise*/}
                            <AddPopUp
                                visible={visible}
                                toggleOverlay={toggleOverlay}
                                toggleWaterOverlay={toggleWaterOverlay}
                                toggleExerciseOverlay={toggleExerciseOverlay}
                                toggleFoodOverlay={toggleFoodOverlay}
                                toggleFoodConfirmOverlay={toggleFoodConfirmOverlay}
                            />
                            <AddWater
                                addWaterVisible={addWaterVisible}
                                toggleWaterOverlay={toggleWaterOverlay}
                                previousOverlay={toggleOverlay}
                                date={date}
                            />
                            <AddExercise
                                addExerciseVisible={addExerciseVisible}
                                toggleExerciseOverlay={toggleExerciseOverlay}
                                previousOverlay={toggleOverlay}
                                date={date}
                            />
                            <AddFood
                                previousOverlay={toggleOverlay}
                                toggleFoodOverlay={toggleFoodOverlay}
                                addFoodVisible={addFoodVisible}
                                toggleFoodConfirmOverlay={toggleFoodConfirmOverlay}
                                setFood={setFood}
                                date={date}
                            />
                            <AddNotes
                                toggleNotesOverlay={toggleNotesOverlay}
                                addNotesVisible={addNotesVisible}
                                date={date}
                                notes={notes}
                                stars={stars}
                            />
                            {/* pop up for options */}
                            <TrackerOptions
                                toggleOptions={toggleOptions}
                                visibleOptions={visibleOptions}
                                view='Day'
                                toggleNotesOverlay={toggleNotesOverlay}
                            />
                            <AddFoodConfirmation
                                toggleFoodConfirmOverlay={toggleFoodConfirmOverlay}
                                addFoodConfirmVisible={addFoodConfirmVisible}
                                food={food}
                                toggleFoodOverlay={toggleFoodOverlay}
                                date={date}
                            />
                        </View>
                    }
                />
            </GestureDetector>
        </GestureHandlerRootView>
    )
}
export default Tracker;

const localStyle = StyleSheet.create({
    foodSectionStyle: {
        color: '#CB9CF2',
        fontFamily: 'Inter_600SemiBold',
        flex: 1,
        paddingVertical: 0,
        fontSize: 16,
        paddingLeft: 10,
        alignSelf: 'center'
    },
    sectionHeader: {
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#828282',
        backgroundColor: 'rgba(27,33,43,0.5)'
    },
    item: {                                                 // List item styles (Eggs, Bacon, Toast, etc.)
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#828282',
        paddingLeft: 30,
        alignItems: 'center'
    },
})