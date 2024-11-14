import { StyleSheet, TouchableOpacity, TextInput, Text, View, SectionList } from 'react-native';
import styles from '../styles';
import Feather from "react-native-vector-icons/Feather";
import { useState, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import CustomDropdown from '../components/functional/CustomDropdown';
import CustomPopUp from '../components/structural/CustomPopUp';
import CustomScreen from '../components/structural/CustomScreen';
import CustomButton2 from '../components/functional/CustomButton2';
import { shoppingListData } from '../constants/shoppingListData';
import ShoppingListOptions from '../components/functional/ShoppingListOptions';
import { CollapseSection } from '../constants/CollapseSection';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


// todo:
// save list for user
// generate shopping list functionality
// add the bottom text: "It looks like your shopping list blah"
// input validation
// make handle add food not work if same food name

// REFACTORING FLAGGING - Needs a Component
// 4. Render list component(s) - split into header, list item, and footer?

const ShoppingList = () => {
    const { collapsedSections, setCollapsedSections, toggleCollapse } = CollapseSection();

    const { setItems, items, shoppingList } = shoppingListData();

    const [foodName, setFoodName] = useState('')
    const [foodType, setFoodType] = useState('')

    const [checkedItems, setCheckedItems] = useState({});

    const userID = auth().currentUser?.uid || null;

    // read database for checkmark state of foods and set checkmarks on UI appropriately, if no field found set to {}
    const getCheckedItems = async () => {
        try {
            const ref = await firestore().collection('Users').doc(userID).get();
            const checkedData = ref.data().checkedItems || {}
            setCheckedItems(checkedData)
        } catch (e) {
            alert("Error: ", e.message)
        }
    }

    // changes whether a food item is checked or not
    const toggleChecked = (item) => {
        setCheckedItems(prevState => ({
            // keep checked values for other food items
            ...prevState,

            // change checked value for particular food item
            [item]: !prevState[item]
        }));
    };

    // change checkmark states in database (only usefull for when app is reopened)
    const saveCheckedState = async () => {
        try {
            await firestore().collection('Users').doc(userID).update({
                checkedItems: checkedItems
            });
        } catch (e) {
            alert("Error:", e.message)
        }
    }

    // boolean value, true if all food items are checked
    const areAllItemsChecked = (items) => {
        return items.every(item => checkedItems[item]);
    };

    // idk if we should keep auto collapse, some ppl might find it annoying or confusing, others will find it helpful
    // collapses section if all items within are checked off
    
    // everytime item is checked, save it to database
    useEffect(() => {
        // shoppingList.forEach(section => {
        //     if (areAllItemsChecked(section.data)) {
        //         setCollapsedSections(prevState => ({
        //             ...prevState,
        //             [section.title]: true
        //         }));
        //     }
        // });
        
        // if checkedItems is not empty, update database
        // if statement needed since checkedItems set to {} at very start, might save {} to database and overwrite data
        if (Object.keys(checkedItems).length !== 0) {
            saveCheckedState()
        }
    }, [checkedItems]);

    // when shopping list is opened, call on function
    useEffect(() => {
        getCheckedItems()
    }, []);

    // visibility of the add food overlay
    const [visible, setVisible] = useState(false);

    // change visibility of add food overlay
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    // called when user clicks add button, allows user to add food in shopping list
    const handleAddFood = async () => {
        if (foodName != '') {
            try {
                const userID = auth().currentUser.uid;  // Get current user's ID

                // add document in shopping list collection with fields foodName and foodType
                firestore().collection('Users').doc(userID).collection('ShoppingList').add({
                    foodName: foodName,
                    foodType: foodType
                })

            } catch (e) {
                alert("Error: ", e.message)
            }

            // delete food name after it's added to the list
            setFoodName('')
        }
        // close overlay
        toggleOverlay()
    }
    // // saves visibility of options pop up
    const [visibleOptions, setVisibleOptions] = useState(false);

    // // change visibility of options
    const toggleOptions = () => {
        setVisibleOptions(!visibleOptions);
    };
    return (
        <CustomScreen
            title='Shopping List'
            hasOptions={true}
            toggleOptions={toggleOptions}
            screenContent={
                <View>
                    {/* Add Food Button */}
                    <CustomButton2
                        type='add'
                        onPress={toggleOverlay}
                    />
                    {/* View holding numerous lists for the grocery list */}
                    <View>
                        {/* List of groceries */}
                        <SectionList
                            style={{
                                backgroundColor: 'rgba(27,33,43,0.5)',
                                borderRadius: 8,
                            }}
                            sections={shoppingList}
                            keyExtractor={(item) => item}
                            scrollEnabled={false}
                            renderItem={({ item, section }) =>
                                !collapsedSections[section.title] && (
                                    <View>
                                        {/* View to hold checkbox and item name */}
                                        <View style={[localStyle.listContainer, { backgroundColor: '#0E1116' }]}>
                                            {/* Checkboxes for items on list */}
                                            <Checkbox
                                                color='#CB9CF2'
                                                value={!!checkedItems[item]}
                                                onValueChange={() => toggleChecked(item)}
                                            />
                                            {/* Item names */}
                                            <Text
                                                style={[
                                                    styles.defaultWhiteText, localStyle.itemsCheckable,
                                                    {
                                                        textDecorationLine: checkedItems[item] ? 'line-through' : 'none',
                                                        color: checkedItems[item] ? '#ABABAB' : '#F2F4F3',
                                                    }
                                                ]}>
                                                {item}
                                            </Text>
                                        </View>
                                        {/* Divider lines between items */}
                                        <View style={localStyle.thinBorderLine} />
                                    </View>
                                )
                            }
                            //  Function to render section headers used in the list (i.e. Fruit, Vegetable, etc.)
                            renderSectionHeader={({ section }) => (
                                // View for the headers
                                <View>
                                    {/* Turning headers into buttons to allow collapse */}
                                    <TouchableOpacity onPress={() => toggleCollapse(section.title)}>
                                        {/* Setting up section headers to allow for a label and chevron icon */}
                                        <View style={localStyle.listContainer}>
                                            {/* Section label/names */}
                                            <Text
                                                style={[
                                                    styles.defaultWhiteText, localStyle.sectionCheckable,
                                                    {
                                                        textDecorationLine: areAllItemsChecked(section.data) ? 'line-through' : 'none',
                                                        color: areAllItemsChecked(section.data) ? '#6F5882' : '#CB9CF2',
                                                    }
                                                ]}>
                                                {section.title}
                                            </Text>
                                            {/* Icons used depending on whether header is collapsed or open */}
                                            <Feather name={collapsedSections[section.title] ? "chevron-down" : "chevron-up"} size={25} color='#CB9CF2'
                                                style={{ alignSelf: 'flex-end', paddingVertical: 10 }} />
                                        </View>
                                    </TouchableOpacity>
                                    {/* Borderline at bottom of the section headers */}
                                    <View style={localStyle.borderLine} />
                                </View>
                            )}
                        />
                    </View>
                    {/* Popup/Overlay for adding food in shopping list */}
                    <CustomPopUp visible={visible} toggleOverlay={toggleOverlay} hasBackButton={false}
                        content={
                            // Handling the input of a food into the shopping list
                            <View style={{ paddingHorizontal: 30, paddingBottom: 20 }}>
                                {/* Food Name Input */}
                                <View style={{ padding: 10 }}>
                                    <TextInput style={styles.inputFieldStyle}
                                        placeholder='Food Name'
                                        selectionColor='#CB9CF2'
                                        placeholderTextColor='rgba(242,244,243, 0.2)'
                                        onChangeText={(text) => setFoodName(text)}
                                    >
                                    </TextInput>
                                </View>

                                {/* Food Type Input */}
                                <View style={{ padding: 10, zIndex: 1 }}>
                                    <CustomDropdown
                                        placeholder={'Food Type'}
                                        setCustomValue={setFoodType}
                                        items={items}
                                        setItems={setItems}
                                    />
                                </View>

                                {/* Submit Button */}
                                <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
                                    <TouchableOpacity onPress={handleAddFood}
                                        style={[styles.button, { backgroundColor: '#CB9CF2' }]}>
                                        <Text style={styles.buttonText}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    />
                    {/* Popup for options menu */}
                    <ShoppingListOptions
                        setCheckedItems={setCheckedItems}
                        toggleOptions={toggleOptions}
                        visibleOptions={visibleOptions}
                        checkedItems={checkedItems}
                    />
                </View>
            }
        />
    )
}
export default ShoppingList;

const localStyle = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    itemsCheckable: {
        paddingLeft: 30,
        paddingVertical: 10,
        textDecorationColor: '#F2F4F3'
    },
    sectionCheckable: {
        paddingLeft: 10,
        flex: 1,
        fontFamily: 'Inter_600SemiBold',
        textDecorationColor: '#CB9CF2',
    },
    borderLine: {
        height: 2,
        backgroundColor: '#828282'
    },
    thinBorderLine: {
        height: 1,
        backgroundColor: 'rgba(242,244,243,0.2)'
    },
})