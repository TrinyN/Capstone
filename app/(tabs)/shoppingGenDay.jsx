import { TouchableOpacity, Text, View, FlatList, StyleSheet } from 'react-native';
import styles from '../styles';
import Feather from "react-native-vector-icons/Feather";
import { useEffect, useState } from 'react';
import CustomHeader from '../components/structural/CustomHeader';
import CustomScreen from '../components/structural/CustomScreen';
import CustomButton2 from '../components/functional/CustomButton2';
import { useTrackerData } from '../constants/trackerData';
import { CollapseSection } from '../constants/CollapseSection';
import { router } from 'expo-router';

// Should this even be its own screen?

// Function to design and display the tracker
const ShoppingGenDay = () => {

    const { collapsedSections, toggleCollapse } = CollapseSection();

    const { foodSections, water } = useTrackerData();

    // Render each section with collapsibility
    const renderSection = ({ item }) => {
        return (
            <View>
                {/* Section Header (Breakfast, Lunch, Dinner) */}
                <TouchableOpacity onPress={() => toggleCollapse(item.key)}>
                    <View style={[localStyle.sectionHeader, { flexDirection: 'row' }]}>
                        {/* make style for maybe */}
                        <Text style={localStyle.foodSectionStyle}>{item.title}</Text>

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
                            <View key={index} style={localStyle.item}>
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
        <CustomScreen
            title='Day:'
            title2='Monday 8/6' // test value, need to change
            info = "Double check that these are the items you would like to use"
            hasOptions={false}
            isTrackerScreen={true}
            screenContent={
                <View>
                    {/* Add Food Button */}
                    <CustomButton2
                        type='normal'
                        text='Generate Shopping List'
                        // onPress={router.push('/shoppingList')}   // careful with this: may automatically do its function rather than wait to be pressed
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
                    </View>
                </View>
            }
        />
    )
}
export default ShoppingGenDay;

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