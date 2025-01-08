import { Text, View, SectionList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../styles';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import CustomScreen from '../components/structural/CustomScreen';
import TrackerOptions from '../components/functional/TrackerOptions';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { getSunSat, useDayListData } from '../constants/trackerWeekData';
import GlanceText from '../components/structural/GlanceText';
import { useLocalSearchParams } from 'expo-router';
import { getWeekDate } from '../constants/trackerWeekData';

// todo:
// calculating averages
// comparing amounts to get color of text

// REFACTORING FLAGGING - Needs a Component
// 4. Render list component(s) - split into header, list, and footer?

// Function to design and display the tracker and its related data
const useDebouncedDateChange = (date) => {
    const [debouncedDate, setDebouncedDate] = useState(date);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedDate(date); // Only update when date has stopped changing for 500ms
        }, 500); // Delay to wait for user to stop changing date

        return () => {
            clearTimeout(handler); // Clear the timeout if date changes before 500ms
        };
    }, [date]);

    return debouncedDate;
};
const TrackerWeek = () => {
    const { day } = useLocalSearchParams(); // current day gets passed from day view on zoom out
    const initialDate = day ? new Date(day) : new Date()
    const [date, setDate] = useState(initialDate); // default to date passed from day view, date will change on traversal

    const title = getWeekDate(date) // gets date range for week

    const debouncedDate = useDebouncedDateChange(date);

    // saves visibility of options pop up
    const [visibleOptions, setVisibleOptions] = useState(false);

    // change visibility of options pop up
    const toggleOptions = () => { setVisibleOptions(!visibleOptions) };

    const { avgWater, avgWeight, dayList, avgCal, avgGoal, isLoading } = useDayListData(debouncedDate);

    const pinch = Gesture.Pinch()
        .onUpdate((event) => {
            if (event.scale > 1) {                          // zoom in
                router.push('/tracker');
            } else if (event.scale < 1) {
                router.push('/tracker-month');              // zoom out
                // router.push(`${zoomRoute}?day=${encodeURIComponent(day, dayList)}`); might not work, implements traversal with pinch zoom out
            }
        })
        .runOnJS(true);

    // changes date to be next week
    const nextWeek = () => {
        setDate(prevDate => {
            const newDate = new Date(prevDate); // Clone the current date
            newDate.setDate(newDate.getDate() + 6); // Add 6 days
            return newDate; // Update state with the new date
        });
    }

    // changes date to be previous week
    const previousWeek = () => {
        setDate(prevDate => {
            const newDate = new Date(prevDate); // Clone the current date
            newDate.setDate(newDate.getDate() - 6); // Subtract 6 days
            return newDate; // Update state with the new date
        });
    }

    const isLastWeek = () => {
        const today = new Date()
        const { sunday, saturday } = getSunSat(today)

        // Check if the date of tracker is within the current week
        const givenDate = new Date(date);
        if (givenDate >= sunday && givenDate <= saturday) {
            return true;
        }

        return false
    }

    //  Returning the screen to display
    return (
        <GestureHandlerRootView>
            <GestureDetector gesture={pinch}>
                <CustomScreen
                    title='Week:'
                    title2={title}
                    hasOptions={true}
                    toggleOptions={toggleOptions}
                    isTrackerScreen={true}
                    next={nextWeek}
                    previous={previousWeek}
                    isLastWeek={isLastWeek()}
                    screenContent={
                        <View>
                            {/* only render when loading is done */}
                            {isLoading? (
                                <ActivityIndicator size="large" color="transparent" style={localStyle.activityIndicator} />
                            ) : (
                                // Top View to calculate user's average weight and water intake that week
                                <View style={localStyle.calcView}>

                                    {/* View to hold weight info at a glance */}
                                    <GlanceText type='vert' prompt='Average Weight:' text={avgWeight + ' lbs'}></GlanceText>

                                    {/* View to hold water info at a glance */}
                                    <GlanceText type='vert' prompt='Average Water:' text={avgWater + ' cups'}></GlanceText>
                                </View>
                            )}

                            {/* Space between Stats View and Week List */}
                            <View style={{ margin: 10 }}></View>

                            {/* only render when loading is done */}
                            {isLoading? (
                                <ActivityIndicator size="large" color="#CB9CF2" style={localStyle.activityIndicator} />
                            ) : (
                                // View for SectionList to store all items of tracker
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
                                                {avgCal}
                                            </Text>
                                            {/* Implement comparison to average goal */}
                                            <Text style={[styles.headerText, { textAlign: 'right' }]}>
                                                {avgGoal}
                                            </Text>
                                            <View style={{ height: 2, backgroundColor: '#828282' }} />
                                        </View>
                                    }
                                />
                            </View>
                            )}
                            {/* pop up for options */}
                            <TrackerOptions toggleOptions={toggleOptions} visibleOptions={visibleOptions} view='Week' dayList={dayList} day={date} />
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