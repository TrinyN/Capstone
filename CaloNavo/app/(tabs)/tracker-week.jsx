import { TouchableOpacity, TextInput, Text, View, SectionList, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import Feather from "react-native-vector-icons/Feather";
import { useState, useEffect } from 'react';
import { Overlay } from '@rneui/base';
import { router } from 'expo-router';

// todo:
// calculating averages
// comparing amounts to get color of text
// options functionality

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
        { title: 'Sun.', data: ['3000/2500'], goal: ['Surplus'] },
        { title: 'Mon.', data: ['2750/2500'], goal: ['Balance'] },
        { title: 'Tues.', data: ['1000/2500'], goal: ['Surplus'] },
        { title: 'Wed.', data: ['2500/2500'], goal: ['Balance'] },
        { title: 'Thurs.', data: ['2500/2500'], goal: ['Balance'] },
        { title: 'Fri.', data: ['2500/2500'], goal: ['Balance'] },
        { title: 'Sat.', data: ['2500/2500'], goal: ['Balance'] },
    ]);

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
                        {/* NOTE: Flex looks strange on very large (incompatible) screens like iPad, web */}
                        <Text style={[styles.titleText, { flex: 0.5 }]}>
                            Week:
                        </Text>
                        {/* TODO: Make this text get the current week */}
                        <Text style={[styles.titleTextWhite, { flex: 1 }]}>
                            6/9 - 6/15
                        </Text>
                        <TouchableOpacity onPress={toggleOptions} style={{ width: 30 }}>
                            <Feather name="more-vertical" size={30} color="#CB9CF2" />
                        </TouchableOpacity>
                    </View>

                    {/* Top View to calculate user's calories eaten and burned with a formula visible to them */}
                    <View 
                        style={{ 
                            backgroundColor: '#1F2938', 
                            borderRadius: 5, 
                            flexDirection: 'row', 
                            justifyContent: 'space-evenly',
                            paddingVertical: 5}}
                        >

                         {/* View to hold weight info at a glance */}
                        <View>
                            {/* Average weight of week */}
                            <Text style={[styles.smallText, {color: '#CB9CF2'} ]}>
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
                            <Text style={[styles.smallText, {color: '#CB9CF2'}]}>
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

                            // Rendering items based on data set and their respective sections
                            renderItem={({ section }) => (
                                <View>
                                    {/* Making sections collapsible */}
                                        <View style={{ 
                                            flexDirection: 'row', 
                                            justifyContent: 'space-between',
                                            alignItems: 'center', 
                                            paddingHorizontal: 15,
                                            paddingVertical: '7%' }}>

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
                                    paddingHorizontal: 15 }}>

                                    <Text style={[styles.defaultText, { fontSize: 18, paddingVertical: 10, flex: 1, textAlign: 'left' }]}>
                                        Day
                                    </Text>
                                    <Text style={[styles.defaultText, { fontSize: 18, paddingVertical: 10, flex: 1, textAlign: 'center'}]}>
                                        Calories
                                    </Text>
                                    <Text style={[styles.defaultText, { fontSize: 18, paddingVertical: 10, flex: 1, textAlign: 'right'}]}>
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
                                    paddingHorizontal: 15 }}>

                                    <Text style={[styles.defaultText, { fontSize: 18, paddingVertical: 10, flex: 1, textAlign: 'left' }]}>
                                        Avg.
                                    </Text>
                                    {/* Implement calculation of average calorie */}
                                    <Text style={[styles.defaultText, { fontSize: 18, paddingVertical: 10, flex: 1, textAlign: 'center'}]}>
                                        2,750
                                    </Text>
                                    {/* Implement comparison to average goal */}
                                    <Text style={[styles.defaultText, { fontSize: 18, paddingVertical: 10, flex: 1, textAlign: 'right'}]}>
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
                    <Overlay 
                        isVisible={visibleOptions} 
                        onBackdropPress={toggleOptions}
                        overlayStyle={[styles.optionsMenu, { width: '70%' }]}>


                        {/* View containing option choices */}
                        <View style={{ paddingHorizontal: 8, justifyContent: 'center' }}>

                            {/* Notes Option Button */}
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name="edit-3" size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
                                <Text style={styles.optionsText}>
                                    Take Notes
                                </Text>
                            </TouchableOpacity>

                            {/* Shoping List Option Button */}
                            <TouchableOpacity 
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPressOut={toggleOptions}>

                                <Feather name="shopping-cart" size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
                                <Text style={styles.optionsText}>
                                    Generate Shopping List
                                </Text>
                            </TouchableOpacity>

                            {/* Zoom in Option Button */}
                            {/* NOTE: onPressOut closes overlay so it doesn't stay open when moving to new screen */}
                            <TouchableOpacity 
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => router.push('/tracker')}
                                onPressOut={toggleOptions}>

                                <Feather name="maximize-2" size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
                                <Text style={styles.optionsText}>
                                    Zoom In
                                </Text>
                            </TouchableOpacity>

                            {/* Zoom out Option Button */}
                            <TouchableOpacity 
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => router.push('/tracker-month')}
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