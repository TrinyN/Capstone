import { Text, View, SectionList } from 'react-native';
import styles from '../styles';
import { useState } from 'react';
import { router } from 'expo-router';
import CustomScreen from '../components/CustomScreen';
import TrackerOptions from '../components/TrackerOptions';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';

// todo:
// calculating averages
// comparing amounts to get color of text
// options functionality

// REFACTORING FLAGGING - Needs a Component
// 1. Screen component
// 2. Screen header component
// 3. At a glance header component
// 4. Render list component(s) - split into header, list, and footer?
// 5. Options overlay component
// 6. Minor button component? (i.e. Zoom out = Zoom in = Take notes, etc.)


// Function to design and display the tracker
const Tracker = () => {

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

    // test data, will need to start off empty and be saved for each user
    const [dayList, setDayList] = useState([
        { title: '5/26-6/1', data: ['22,000'], goal: ['Surplus'] },
        { title: '6/2-6/8', data: ['17,500'], goal: ['Balance'] },
        { title: '6/9-6/15', data: ['17,000'], goal: ['Balance'] },
        { title: '6/16-6/22', data: ['21,500'], goal: ['Surplus'] },
        { title: '6/23-6/29', data: ['23,000'], goal: ['Surplus'] },
        { title: '6/30-7/6', data: ['17,000'], goal: ['Balance'] }
    ]);

    const pinch = Gesture.Pinch()

        .onUpdate((event) => {
            // zoom in
            if (event.scale > 1) {
                router.push('/tracker-week');

            }
        })
        .runOnJS(true);

    //  Returning the screen to display
    return (
        <GestureHandlerRootView>
            <GestureDetector gesture={pinch}>
                <CustomScreen
                    title='Month:'
                    title2='June, 2024' // test value, need to change
                    hasOptions={true}
                    toggleOptions={toggleOptions}
                    screenContent={
                        <View>
                            {/* Top View to calculate user's calories eaten and burned with a formula visible to them */}
                            <View
                                style={{
                                    backgroundColor: '#1F2938',
                                    borderRadius: 5,
                                    flexDirection: 'column',
                                    justifyContent: 'space-evenly',
                                    paddingVertical: 5
                                }}
                            >

                                {/* View to hold weight info at a glance */}
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                    {/* Average weight of week */}
                                    <Text style={[styles.smallText, { color: '#CB9CF2', marginRight: 5 }]}>
                                        Average Weight:
                                    </Text>
                                    {/* TODO: Implement retrieval and calculation of average weight */}
                                    {/* Calculated average weight */}
                                    <Text style={[styles.smallText]}>
                                        102.5 lbs
                                    </Text>
                                </View>

                                {/* View to hold water info at a glance */}
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                    {/* Average water intake of week */}
                                    <Text style={[styles.smallText, { color: '#CB9CF2', marginRight: 5 }]}>
                                        Average Water:
                                    </Text>
                                    {/* TODO: Implement retrieval and calculation of average water drank */}
                                    {/* Calculated average water */}
                                    <Text style={[styles.smallText]}>
                                        80 fl oz of 72 fl oz
                                    </Text>
                                </View>

                                {/* View to hold monthly caloric goal at a glance */}
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                    {/* Monthly goal is set by user and displayed */}
                                    <Text style={[styles.smallText, { color: '#CB9CF2', marginRight: 5 }]}>
                                        Monthly Caloric Goal:
                                    </Text>
                                    {/* TODO: Implement retrieval of user's goal and calculate based on them */}
                                    {/* Displayed goal */}
                                    <Text style={[styles.smallText]}>
                                        17,500 kcal
                                    </Text>
                                </View>

                                {/* View to hold allowed deviation at a glance */}
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                    {/* Allowed deviation from monthly goal (500 per week in example) */}
                                    <Text style={[styles.smallText, { color: '#CB9CF2', marginRight: 5 }]}>
                                        Allowed Deviation:
                                    </Text>
                                    {/* TODO: Implement retrieval of user's goals and calculate based on them */}
                                    {/* Deviation displayed, 500 per day of week */}
                                    <Text style={[styles.smallText]}>
                                        2,500 kcal
                                    </Text>
                                </View>

                            </View>

                            {/* Space between Stats View and Week List */}
                            <View style={{ margin: 10 }}></View>

                            {/* View for SectionList to store all items of tracker */}
                            <View>

                                {/* List to hold items */}
                                <SectionList
                                    style={{
                                        backgroundColor: 'rgba(27,33,43,0.5)',
                                        borderRadius: 8,
                                    }}
                                    sections={dayList}
                                    keyExtractor={(item) => item}
                                    scrollEnabled={false}

                                    // Rendering items based on data set and their respective sections
                                    renderItem={({ section }) => (
                                        <View>
                                            {/* Making sections collapsible */}
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                paddingHorizontal: 15,
                                                paddingVertical: '7%'
                                            }}>

                                                <Text
                                                    style={[
                                                        styles.defaultWhiteText,
                                                        {
                                                            flex: 1,
                                                            textAlign: 'left',
                                                            fontFamily: 'Inter_400Regular'
                                                        }
                                                    ]}>
                                                    {section.title}
                                                </Text>
                                                {/* TODO: Comparison to determine text color */}
                                                <Text
                                                    style={[
                                                        styles.defaultWhiteText,
                                                        {
                                                            flex: 1,
                                                            textAlign: 'center',
                                                            fontFamily: 'Inter_400Regular',
                                                            color: '#80FF72',
                                                        }
                                                    ]}>
                                                    {section.data}
                                                </Text>
                                                {/* TODO: Comparison to determine text color */}
                                                <Text
                                                    style={[
                                                        styles.defaultWhiteText,
                                                        {
                                                            flex: 1,
                                                            textAlign: 'right',
                                                            fontFamily: 'Inter_400Regular',
                                                            color: '#80FF72',
                                                        }
                                                    ]}>
                                                    {section.goal}
                                                </Text>
                                            </View>

                                            {/* Borderline at bottom of Section Headers */}
                                            <View style={{ height: 2, backgroundColor: '#828282' }} />
                                        </View>
                                    )}
                                    // List header for week list
                                    ListHeaderComponent={
                                        <View style={{
                                            backgroundColor: '#1F2938',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingHorizontal: 15
                                        }}>

                                            <Text style={[styles.defaultText, { fontSize: 18, paddingVertical: 10, flex: 1, textAlign: 'left' }]}>
                                                Month
                                            </Text>
                                            <Text style={[styles.defaultText, { fontSize: 18, paddingVertical: 10, flex: 1, textAlign: 'center' }]}>
                                                Calories
                                            </Text>
                                            <Text style={[styles.defaultText, { fontSize: 18, paddingVertical: 10, flex: 1, textAlign: 'right' }]}>
                                                Goal
                                            </Text>

                                            <View style={{ height: 2, backgroundColor: '#828282' }} />
                                        </View>

                                    }
                                    // Section headers for food types


                                    // Footer to calculate averages
                                    ListFooterComponent={
                                        <View style={{
                                            backgroundColor: '#1F2938',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingHorizontal: 15
                                        }}>

                                            <Text style={[styles.defaultText, { fontSize: 18, paddingVertical: 10, flex: 1, textAlign: 'left' }]}>
                                                Avg.
                                            </Text>
                                            {/* Implement calculation of average calorie */}
                                            <Text style={[styles.defaultText, { fontSize: 18, paddingVertical: 10, flex: 1, textAlign: 'center' }]}>
                                                19,667
                                            </Text>
                                            {/* Implement comparison to average goal */}
                                            <Text style={[styles.defaultText, { fontSize: 18, paddingVertical: 10, flex: 1, textAlign: 'right' }]}>
                                                Mixed
                                            </Text>

                                            <View style={{ height: 2, backgroundColor: '#828282' }} />
                                        </View>
                                    }
                                />

                            </View>

                            {/* Space between Exercise List and screen bottom */}
                            <View style={{ padding: 40 }}></View>

                            {/* pop up for options */}
                            <TrackerOptions toggleOptions={toggleOptions} visibleOptions={visibleOptions} view='Month' />
                        </View>
                    }
                />
            </GestureDetector>
        </GestureHandlerRootView>
    )
}
export default Tracker;