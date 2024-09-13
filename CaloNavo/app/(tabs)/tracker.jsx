import { TouchableOpacity, TextInput, Text, View, SectionList, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import Feather from "react-native-vector-icons/Feather";
import { useState, useEffect } from 'react';
import { Overlay } from '@rneui/base';

// todo: fix dropdown for food type
// save list for user
// options functionality
// add the bottom text: "It looks like your shopping list blah"
// input validation

const Tracker = () => {

    const [collapsedSections, setCollapsedSections] = useState({})

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

    // test data, will need to start off empty and be saved for each user
    const [foodList, setFoodList] = useState([
        { title: 'Breakfast', data: ['Apple'] },
        { title: 'Lunch', data: ['Carrots', 'Broccoli', 'Spinach'] },
        { title: 'Dinner', data: ['Chicken', 'Beef', 'Tofu'] },
        { title: 'Snacks', data: ['Cheetos'] },
    ]);

    // test data, will need to start off empty and be saved for each user
    const [exerciseList, setExerciseListList] = useState([
        { data: ['Running'] },
    ]);

    // test data, will need to start off empty and be saved for each user
    const [water, setWater] = useState([
        { data: ['10 cups'] },
    ]);

    // changes whether a section of the list is collapsed or not
    const toggleCollapse = (section) => {
        setCollapsedSections(prevState => ({
            // keep collapsed boolean values for other sections
            ...prevState,

            // changes collapsed value for particular section
            [section.title]: !prevState[section.title]
        }));
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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[styles.viewContainer, { flex: 1 }]}>
                    <View style={{ marginTop: 70, flexDirection: 'row', paddingBottom: 20, alignItems: 'center' }}>
                        <Text style={[styles.titleText, { flex: 1 }]}>
                            Tracker
                        </Text>
                        <TouchableOpacity onPress={toggleOptions} style={{ width: 30 }}>
                            <Feather name="more-vertical" size={30} color="#CB9CF2" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: '#1F2938', borderRadius: 5 }}>
                        <Text style={styles.defaultWhiteText}>
                            Eaten - Burned = blah blah
                        </Text>
                        <Text style={styles.defaultWhiteText}>
                            Eaten - Burned = blah blah
                        </Text>
                    </View>
                    <TouchableOpacity onPress={toggleOverlay}
                        style={[styles.button, { backgroundColor: '#CB9CF2', padding: 1 }]}>
                        <Feather name="plus" size={30} color="#1F2938" />
                    </TouchableOpacity>
                    <View>
                        <SectionList
                            style={{
                                backgroundColor: 'rgba(27,33,43,0.5)',
                                borderRadius: 8,
                            }}
                            sections={foodList}
                            keyExtractor={(item) => item}

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
                            ListHeaderComponent={
                                <View style={{ backgroundColor: '#1F2938' }}>
                                    <Text style={[styles.defaultText, { paddingVertical: 10, paddingHorizontal: 15 }]}>
                                        Food
                                    </Text>
                                    <View style={{ height: 2, backgroundColor: '#828282' }} />
                                </View>

                            }
                            renderSectionHeader={({ section }) => (
                                <View>
                                    <TouchableOpacity onPress={() => toggleCollapse(section)}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
                                            <Text
                                                style={[
                                                    styles.defaultWhiteText,
                                                    {
                                                        paddingLeft: 10,
                                                        flex: 1,
                                                        fontFamily: 'Inter_600SemiBold',
                                                        color: '#CB9CF2',
                                                    }
                                                ]}>
                                                {section.title}
                                            </Text>
                                            <Feather name={collapsedSections[section.title] ? "chevron-down" : "chevron-up"} size={25} color='#CB9CF2'
                                                style={{
                                                    alignSelf: 'flex-end',
                                                    paddingVertical: 10
                                                }} />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ height: 2, backgroundColor: '#828282' }} />
                                </View>
                            )}
                        />
                        <View style={{ margin: 20 }}>

                        </View>
                        <SectionList
                            style={{
                                backgroundColor: 'rgba(27,33,43,0.5)',
                                borderRadius: 8,
                            }}
                            sections={water}
                            keyExtractor={(item) => item}

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
                            ListHeaderComponent={
                                <View style={{ backgroundColor: '#1F2938' }}>
                                    <Text style={[styles.defaultText, { paddingVertical: 10, paddingHorizontal: 15 }]}>
                                        Water
                                    </Text>
                                    <View style={{ height: 2, backgroundColor: '#828282' }} />
                                </View>

                            }
                        />
                        <View style={{ margin: 20 }}>

                        </View>
                        <SectionList
                            style={{
                                backgroundColor: 'rgba(27,33,43,0.5)',
                                borderRadius: 8,
                            }}
                            sections={exerciseList}
                            keyExtractor={(item) => item}

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
                    <View style={{ padding: 40 }}>
                    </View>



                    {/* pop up for adding food, water, or exercise*/}
                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay} 
                    overlayStyle={{ backgroundColor: '#0E1116', borderRadius: 8, 
                    borderColor: '#CB9CF2', borderWidth: 2, width: '75%', height: '50%', 
                    flex: 0.4 }}>
                        <View style={{ paddingVertical: 8, paddingRight: 8, flexDirection: 'row-reverse' }}>
                            <TouchableOpacity onPress={toggleOverlay} style={{ width: 25 }}>
                                <Feather name="x" size={25} color="#F2F4F3" />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.viewContainer, {}]}>
                            <View style={{ padding: 10 }}>
                                <TextInput style={styles.inputFieldStyle}
                                    placeholder='Food Name'
                                    selectionColor='#CB9CF2'
                                    placeholderTextColor='rgba(242,244,243, 0.2)'
                                    onChangeText={(text) => setFoodName(text)}
                                >
                                </TextInput>
                            </View>
                            <View style={{ padding: 10 }}>
                                <TextInput style={[styles.inputFieldStyle]}
                                    placeholder='Food Type'
                                    selectionColor='#CB9CF2'
                                    placeholderTextColor='rgba(242,244,243, 0.2)'
                                    onChangeText={(text) => setFoodType(text)}
                                >
                                </TextInput>
                            </View>
                            <View style={{ paddingHorizontal: 10 }}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: '#CB9CF2' }]}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* pop up for options */}
                    </Overlay>
                    <Overlay isVisible={visibleOptions} onBackdropPress={toggleOptions} overlayStyle={[styles.optionsMenu, { width: 230 }]}>
                        <View style={{ paddingHorizontal: 8, justifyContent: 'center' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name="edit-3" size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
                                <Text style={styles.optionsText}>
                                    Take Notes
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name="shopping-cart" size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
                                <Text style={styles.optionsText}>
                                    Generate Shopping List
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name="maximize-2" size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
                                <Text style={styles.optionsText}>
                                    Zoom In
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
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