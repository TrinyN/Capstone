import { Text, View, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import CustomScreen from '../components/structural/CustomScreen';
import TrackerOptions from '../components/functional/TrackerOptions';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDayListData } from '../constants/trackerWeekData';
import GlanceText from '../components/structural/GlanceText';
import { useLocalSearchParams } from 'expo-router';
import { useTrackerData } from '../constants/trackerData';
// todo:
// calculating averages
// comparing amounts to get color of text

// REFACTORING FLAGGING - Needs a Component
// 4. Render list component(s) - split into header, list, and footer?

// Function to design and display the tracker and its related data
const TrackerWeek = () => {
    const { day } = useLocalSearchParams();

    // saves visibility of options pop up
    const [visibleOptions, setVisibleOptions] = useState(false);

    // change visibility of options pop up
    const toggleOptions = () => { setVisibleOptions(!visibleOptions) };

    const { avgWater, avgWeight, dayList } = useDayListData(day);
    // console.log(avgWater, avgWeight, totalCalsBurned)

    // // Sample data for days of the week
    // const dayList = ([
    //     { title: 'Sun.', data: ['3000 - 500'], goal: ['Surplus'], goalColor: ['#E65148'] },
    //     { title: 'Mon.', data: ['2750 - 300'], goal: ['Balance'], goalColor: ['#80FF72'] },
    //     { title: 'Tues.', data: ['1000 - 500'], goal: ['Deficit'], goalColor: ['#E65148'] },
    //     { title: 'Wed.', data: ['2500 - 0'], goal: ['Balance'], goalColor: ['#80FF72'] },
    //     { title: 'Thurs.', data: ['2500 - 300'], goal: ['Balance'], goalColor: ['#80FF72'] },
    //     { title: 'Fri.', data: [' - '], goal: ['Balance'], goalColor: ['#80FF72'] },
    //     { title: 'Sat.', data: [' - '], goal: ['Balance'], goalColor: ['#80FF72'] },
    // ]);

    const pinch = Gesture.Pinch()
        .onUpdate((event) => {
            if (event.scale > 1) {                          // zoom in
                router.push('/tracker');
            } else if (event.scale < 1) {
                router.push('/tracker-month');              // zoom out
            }
        })
        .runOnJS(true);

    //  Returning the screen to display
    return (
        <GestureHandlerRootView>
            <GestureDetector gesture={pinch}>
                <CustomScreen
                    title='Week:'
                    title2='6/9 - 6/15'                     // test value, need to change
                    hasOptions={true}
                    toggleOptions={toggleOptions}
                    isTrackerScreen={true}
                    screenContent={
                        <View>
                            {/* Top View to calculate user's average weight and water intake that week */}
                            <View style={localStyle.calcView}>

                                {/* View to hold weight info at a glance */}
                                <GlanceText type='vert' prompt='Average Weight:' text={avgWeight + ' lbs'}></GlanceText>

                                {/* View to hold water info at a glance */}
                                <GlanceText type='vert' prompt='Average Water:' text={avgWater + ' cups'}></GlanceText>
                            </View>

                            {/* Space between Stats View and Week List */}
                            <View style={{ margin: 10 }}></View>

                            {/* View for SectionList to store all items of tracker */}
                            <View>
                                {/* List to hold items */}
                                <SectionList
                                    style={localStyle.daySectionList}
                                    sections={dayList}
                                    keyExtractor={(item) => item}
                                    scrollEnabled={false}
                                    renderItem={({ section }) => (
                                        <View>
                                            {/* Sections of Day List */}
                                            <TouchableOpacity style={localStyle.daySection}>
                                                <Text style={[styles.defaultWhiteText, localStyle.dayName]}>
                                                    {section.title}
                                                </Text>
                                                {/* TODO: Comparison to determine text color */}
                                                <Text style={[styles.defaultWhiteText, localStyle.dayCals, { color: section.goalColor }]}>
                                                    {section.data}
                                                </Text>
                                                {/* TODO: Comparison to determine text color */}
                                                <Text style={[styles.defaultWhiteText, localStyle.dayGoal, { color: section.goalColor }]}>
                                                {section.goal}
                                                </Text>
                                            </TouchableOpacity>

                                            {/* Borderline at bottom of Section Headers */}
                                            <View style={{ height: 2, backgroundColor: '#828282' }} />
                                        </View>
                                    )}
                                    // List header for week list
                                    ListHeaderComponent={
                                        <View style={localStyle.sectionListHeadFoot}>
                                            <Text style={[styles.headerText, { fontFamily: 'Inter_600SemiBold' }]}>
                                                Day
                                            </Text>
                                            {/* Calories eaten and burned */}
                                            <Text style={[styles.headerText, { textAlign: 'center' }]}>
                                                Calories
                                            </Text>
                                            <Text style={[styles.headerText, { textAlign: 'right' }]}>
                                                Goal
                                            </Text>
                                            <View style={{ height: 2, backgroundColor: '#828282' }} />
                                        </View>
                                    }
                                    // Footer to calculate averages
                                    ListFooterComponent={
                                        <View style={localStyle.sectionListHeadFoot}>
                                            <Text style={styles.headerText}>
                                                Avg:
                                            </Text>
                                            {/* Implement calculation of average calorie */}
                                            <Text style={[styles.headerText, { textAlign: 'center' }]}>
                                                2,750
                                            </Text>
                                            {/* Implement comparison to average goal */}
                                            <Text style={[styles.headerText, { textAlign: 'right' }]}>
                                                Balance
                                            </Text>
                                            <View style={{ height: 2, backgroundColor: '#828282' }} />
                                        </View>
                                    }
                                />
                            </View>
                            {/* pop up for options */}
                            <TrackerOptions toggleOptions={toggleOptions} visibleOptions={visibleOptions} view='Week' />
                        </View>
                    }
                />
            </GestureDetector>
        </GestureHandlerRootView>
    )
}
export default TrackerWeek;

const localStyle = StyleSheet.create({
    calcView: {
        backgroundColor: '#1F2938',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 5
    },
    daySectionList: {
        backgroundColor: 'rgba(27,33,43,0.5)',
        borderRadius: 8,
    },
    sectionListHeadFoot: {
        backgroundColor: '#1F2938',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    daySection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: '7%'
    },
    dayName: {
        flex: 1,
        textAlign: 'left',
        fontFamily: 'Inter_400Regular',
        color: '#CB9CF2',
    },
    dayCals: {
        flex: 1,
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
        color: '#80FF72',                        // HOW TO MAKE THIS CONDITIONAL
    },
    dayGoal: {
        flex: 1,
        textAlign: 'right',
        fontFamily: 'Inter_400Regular',
        color: '#80FF72',                        // HOW TO MAKE THIS CONDITIONAL
    },
})