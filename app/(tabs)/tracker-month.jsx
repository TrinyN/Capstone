import { Text, View, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import CustomScreen from '../components/structural/CustomScreen';
import TrackerOptions from '../components/functional/TrackerOptions';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useWeekListData } from '../constants/trackerMonthData';
import GlanceText from '../components/structural/GlanceText';
import { useDayListData } from '../constants/trackerWeekData';

// todo:
// calculating averages
// comparing amounts to get color of text

// REFACTORING FLAGGING - Needs a Component
// 4. Render list component(s) - split into header, list, and footer?

// Function to design and display the tracker
const TrackerMonth = () => {

    const { day, dayList } = useLocalSearchParams();
    
    const { weekList } = useWeekListData(day);

    // saves visibility of options pop up
    const [visibleOptions, setVisibleOptions] = useState(false);

    // change visibility of options
    const toggleOptions = () => {
        setVisibleOptions(!visibleOptions);
    };

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
                    isTrackerScreen={true}
                    screenContent={
                        <View>
                            {/* Top View to calculate user's calories eaten and burned with a formula visible to them */}
                            <View style={localStyle.calcView}>

                                {/* Weight info at a glance */}
                                <GlanceText type='horiz' prompt='Average Weight:' text='102.5'></GlanceText>

                                {/* Water info at a glance */}
                                <GlanceText type='horiz' prompt='Average Water:' text='80 fl oz of 72 fl oz'></GlanceText>

                                {/* View to hold monthly caloric goal at a glance */}
                                <GlanceText type='horiz' prompt='Monthly Caloric Goal:' text='17,500 kcal'></GlanceText>

                                {/* View to hold allowed deviation at a glance */}
                                <GlanceText type='horiz' prompt='Allowed Deviation:' text='2,500 kcal'></GlanceText>
                            </View>

                            {/* Space between Stats View and Week List */}
                            <View style={{ margin: 10 }}></View>

                            {/* View for SectionList to store all items of tracker */}
                            <View>
                                {/* List to hold items */}
                                <SectionList
                                    style={localStyle.weekSectionList}
                                    sections={weekList}
                                    keyExtractor={(item) => item}
                                    scrollEnabled={false}
                                    renderItem={({ section }) => (
                                        <View>
                                            {/* Making sections collapsible */}
                                            <TouchableOpacity style={localStyle.weekSection}>

                                                <Text style={[styles.defaultWhiteText, localStyle.weekName]}>
                                                    {section.title}
                                                </Text>
                                                {/* TODO: Comparison to determine text color */}
                                                <Text style={[styles.defaultWhiteText, localStyle.weekCals]}>
                                                    {section.data}
                                                </Text>
                                                {/* TODO: Comparison to determine text color */}
                                                <Text style={[styles.defaultWhiteText, localStyle.weekGoal]}>
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
                                            <Text style={[styles.headerText, {fontFamily: 'Inter_600SemiBold'}]}>
                                                Week
                                            </Text>
                                            <Text style={[styles.headerText, {textAlign: 'center'}]}>
                                                Calories
                                            </Text>
                                            <Text style={[styles.headerText, {textAlign: 'right'}]}>
                                                Goal
                                            </Text>
                                            <View style={{ height: 2, backgroundColor: '#828282' }} />
                                        </View>
                                    }
                                    // Footer to calculate averages
                                    ListFooterComponent={
                                        <View style={localStyle.sectionListHeadFoot}>
                                            <Text style={styles.headerText}>
                                                Avg.
                                            </Text>
                                            {/* Implement calculation of average calorie */}
                                            <Text style={[styles.headerText, { textAlign: 'center' }]}>
                                                19,667
                                            </Text>
                                            {/* Implement comparison to average goal */}
                                            <Text style={[styles.headerText, { textAlign: 'right' }]}>
                                                Mixed
                                            </Text>
                                            <View style={{ height: 2, backgroundColor: '#828282' }} />
                                        </View>
                                    }
                                />
                            </View>
                            {/* pop up for options */}
                            <TrackerOptions toggleOptions={toggleOptions} visibleOptions={visibleOptions} view='Month' />
                        </View>
                    }
                />
            </GestureDetector>
        </GestureHandlerRootView>
    )
}
export default TrackerMonth;

const localStyle = StyleSheet.create({
    calcView: {
        backgroundColor: '#1F2938',
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        paddingVertical: 5
    },
    weekSectionList:{
        backgroundColor: 'rgba(27,33,43,0.5)',
        borderRadius: 8,
    },
    sectionListHeadFoot:{
        backgroundColor: '#1F2938',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    weekSection:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: '7%'
    },
    weekName:{
        flex: 1,
        textAlign: 'left',
        fontFamily: 'Inter_400Regular'
    },
    weekCals:{
        flex: 1,
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
        color: '#80FF72',                      // CONDITIONALIZE?
    },
    weekGoal:{
        flex: 1,
        textAlign: 'right',
        fontFamily: 'Inter_400Regular',
        color: '#80FF72',                      // CONDITIONALIZE?
    },
})