import { Text, View, SectionList } from 'react-native';
import styles from '../styles';
import { useState } from 'react';
import { router } from 'expo-router';
import CustomScreen from '../components/structural/CustomScreen';
import TrackerOptions from '../components/functional/TrackerOptions';
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

// Function to design and display the tracker and its related data
const Tracker = () => {

    // saves visibility of options pop up
    const [visibleOptions, setVisibleOptions] = useState(false);

    // change visibility of options pop up
    const toggleOptions = () => {
        setVisibleOptions(!visibleOptions);
    };

    // test data, will need to start off empty and be saved for each user
    const [dayList, setDayList] = useState([
        { title: 'Sun.', data: ['3000/2500'], goal: ['Surplus'] },
        { title: 'Mon.', data: ['2750/2500'], goal: ['Balance'] },
        { title: 'Tues.', data: ['1000/2500'], goal: ['Surplus'] },
        { title: 'Wed.', data: ['2500/2500'], goal: ['Balance'] },
        { title: 'Thurs.', data: ['2500/2500'], goal: ['Balance'] },
        { title: 'Fri.', data: ['2500/2500'], goal: ['Balance'] },
        { title: 'Sat.', data: ['2500/2500'], goal: ['Balance'] },
    ]);

    const pinch = Gesture.Pinch()

        .onUpdate((event) => {
            if (event.scale > 1) {
                // zoom in
                router.push('/tracker');

            } else if (event.scale < 1) {
                // zoom out
                router.push('/tracker-month');
            }
        })
        .runOnJS(true);

    //  Returning the screen to display
    return (
        <GestureHandlerRootView>
            <GestureDetector gesture={pinch}>
                <CustomScreen
                    title='Week:'
                    title2='6/9 - 6/15' // test value, need to change
                    hasOptions={true}
                    toggleOptions={toggleOptions}
                    screenContent={
                        <View>
                            {/* Top View to calculate user's average weight and water intake that week */}
                            <View
                                style={{
                                    backgroundColor: '#1F2938',
                                    borderRadius: 5,
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    paddingVertical: 5
                                }}
                            >

                                {/* View to hold weight info at a glance */}
                                <View>
                                    {/* Average weight of week */}
                                    <Text style={[styles.smallText, { color: '#CB9CF2' }]}>
                                        Average Weight:
                                    </Text>
                                    {/* TODO: Implement retrieval and calculation of average weight */}
                                    {/* Calculated average weight */}
                                    <Text style={[styles.smallText]}>
                                        102.5 lbs
                                    </Text>
                                </View>

                                {/* View to hold water info at a glance */}
                                <View>
                                    {/* Average water intake of week */}
                                    <Text style={[styles.smallText, { color: '#CB9CF2' }]}>
                                        Average Water:
                                    </Text>
                                    {/* TODO: Implement retrieval and calculation of average water drank */}
                                    {/* Calculated average water */}
                                    <Text style={[styles.smallText]}>
                                        80 fl oz of 72 fl oz
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

                                    // Rendering items based on data set and their respective sections (days)
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
                                                            fontFamily: 'Inter_400Regular',
                                                            color: '#CB9CF2',
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
                                                Day
                                            </Text>
                                            <Text style={[styles.defaultText, { fontFamily: 'Inter_400Regular', fontSize: 18, paddingVertical: 10, flex: 1, textAlign: 'center' }]}>
                                                Calories
                                            </Text>
                                            <Text style={[styles.defaultText, { fontFamily: 'Inter_400Regular', fontSize: 18, paddingVertical: 10, flex: 1, textAlign: 'right' }]}>
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
                                                Avg:
                                            </Text>
                                            {/* Implement calculation of average calorie */}
                                            <Text style={[styles.defaultText, { fontFamily: 'Inter_400Regular', fontSize: 18, paddingVertical: 10, flex: 1, textAlign: 'center' }]}>
                                                2,750
                                            </Text>
                                            {/* Implement comparison to average goal */}
                                            <Text style={[styles.defaultText, { fontFamily: 'Inter_400Regular', fontSize: 18, paddingVertical: 10, flex: 1, textAlign: 'right' }]}>
                                                Balance
                                            </Text>

                                            <View style={{ height: 2, backgroundColor: '#828282' }} />
                                        </View>

                                    }
                                />

                            </View>

                            {/* Space between Exercise List and screen bottom */}
                            <View style={{ padding: 40 }}></View>

                            {/* pop up for options */}
                            <TrackerOptions toggleOptions={toggleOptions} visibleOptions={visibleOptions} view='Week' />
                        </View>
                    }
                />
            </GestureDetector>
        </GestureHandlerRootView>
    )
}
export default Tracker;