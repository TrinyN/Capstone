import { TouchableOpacity, TextInput, Text, View, SectionList, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import Feather from "react-native-vector-icons/Feather";
import { useState, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import { Overlay } from '@rneui/base';

// todo: fix dropdown for food type
// save list for user
// options functionality
// add the bottom text: "It looks like your shopping list blah"
// input validation

const ShoppingList = () => {

    const [collapsedSections, setCollapsedSections] = useState({})

    const [checkedItems, setCheckedItems] = useState({});

    const [foodName, setFoodName] = useState('')
    const [foodType, setFoodType] = useState('')

    // saves visibility of add food pop up
    const [visible, setVisible] = useState(false);

    // saves visibility of options pop up
    const [visibleOptions, setVisibleOptions] = useState(false);

    // boolean value, true if all food items are checked
    const areAllItemsChecked = (items) => {
        return items.every(item => checkedItems[item]);
    };

    // change visibility of overlay
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    // change visibility of options
    const toggleOptions = () => {
        setVisibleOptions(!visibleOptions);
    };

    // test data, will need to start off empty and be saved for each user
    const [shoppingList, setShoppingList] = useState([
        { title: 'Fruit', data: ['Apples', 'Bananas', 'Oranges'] },
        { title: 'Vegetable', data: ['Carrots', 'Broccoli', 'Spinach'] },
        { title: 'Protein', data: ['Chicken', 'Beef', 'Tofu'] },
        { title: 'Dairy', data: ['Milk', 'Yogurt', 'Cheese'] },
        { title: 'Grain', data: ['Oatmeal'] },
        { title: 'Snack', data: ['Popcorn', 'Dorittos', 'Cheetos'] },
        { title: 'Beverage', data: ['Orange Juice', 'Coke', 'Fanta'] },
        { title: 'Misc.', data: ['Broom', 'Sponge'] },
    ]);

    // collapses section if all items within are checked off
    useEffect(() => {
        shoppingList.forEach(section => {
            if (areAllItemsChecked(section.data)) {
                setCollapsedSections(prevState => ({
                    ...prevState,
                    [section.title]: true
                }));
            }
        });
    }, [checkedItems]);

    // changes whether a section of the list is collapsed or not
    const toggleCollapse = (section) => {
        setCollapsedSections(prevState => ({
            // keep collapsed boolean values for other sections
            ...prevState,

            // changes collapsed value for particular section
            [section.title]: !prevState[section.title]
        }));
    };

    // changes whether a food item is checked or not
    const toggleChecked = (item) => {
        setCheckedItems(prevState => ({
            // keep checked values for other food items
            ...prevState,

            // change checked value for particular food item
            [item]: !prevState[item]
        }));
    };

    // called when user clicks add button
    const handleAddFood = () => {
        // find the section that matches foodType entered by user
        const updatedShoppingList = shoppingList.map(section => {
            if (section.title == foodType) {
                // update the data array for the matched food type
                return {
                    ...section,
                    data: [...section.data, foodName.charAt(0).toUpperCase() + foodName.slice(1).toLowerCase()] // Add the new food item
                };
            }
            // return the section as is if it does not match
            return section;
        });

        // update the shopping list
        setShoppingList(updatedShoppingList)

        // close overlay
        toggleOverlay()
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                {/* The "body" of the screen view */}
                <View style={[styles.viewContainer, { flex: 1 }]}>

                    {/* Screen header */}
                    <View style={{ marginTop: 70, flexDirection: 'row', paddingBottom: 20, alignItems: 'center' }}>
                        
                        <Text style={[styles.titleText, { flex: 1 }]}>
                            Shopping List
                        </Text>

                        {/* Options button */}
                        <TouchableOpacity onPress={toggleOptions} style={{ width: 30 }}>
                            <Feather name="more-vertical" size={30} color="#CB9CF2" />
                        </TouchableOpacity>

                    </View>

                    {/* Add button */}
                    <TouchableOpacity onPress={toggleOverlay}
                        style={[styles.button, { backgroundColor: '#CB9CF2', padding: 1 }]}>
                        <Feather name="plus" size={30} color="#1F2938" />
                    </TouchableOpacity>

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

                            renderItem={({ item, section }) =>
                                !collapsedSections[section.title] && (
                                    <View>

                                        {/* View to hold checkbox and item name */}
                                        <View style={{ backgroundColor: '#0E1116', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
                                            
                                            {/* Checkboxes for items on list */}
                                            <Checkbox
                                                color='#CB9CF2'
                                                value={!!checkedItems[item]}
                                                onValueChange={() => toggleChecked(item)}
                                            />

                                            {/* Item names */}
                                            <Text
                                                style={[
                                                    styles.defaultWhiteText,
                                                    {
                                                        paddingLeft: 30,
                                                        paddingVertical: 10,
                                                        textDecorationLine: checkedItems[item] ? 'line-through' : 'none',
                                                        color: checkedItems[item] ? '#ABABAB' : '#F2F4F3'
                                                    }
                                                ]}>
                                                {item}
                                            </Text>

                                        </View>

                                        {/* Divider lines between items */}
                                        <View style={{ height: 1, backgroundColor: 'rgba(242,244,243,0.2)' }} />
                                    </View>
                                )
                            }
                            //  Function to render section headers used in the list (i.e. Fruit, Vegetable, etc.)
                            renderSectionHeader={({ section }) => (
                                // View for the headers
                                <View>
                                    {/* Turning headers into buttons to allow collapse */}
                                    <TouchableOpacity onPress={() => toggleCollapse(section)}>
                                        {/* Setting up section headers to allow for a label and chevron icon */}
                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
                                            {/* Section label/names */}
                                            <Text
                                                style={[
                                                    styles.defaultWhiteText,
                                                    {
                                                        paddingLeft: 10,
                                                        flex: 1,
                                                        fontFamily: 'Inter_600SemiBold',
                                                        textDecorationLine: areAllItemsChecked(section.data) ? 'line-through' : 'none',
                                                        color: areAllItemsChecked(section.data) ? '#6F5882' : '#CB9CF2',
                                                    }
                                                ]}>
                                                {section.title}
                                            </Text>
                                            {/* Icons used depending on whether header is collapsed or open */}
                                            <Feather name={collapsedSections[section.title] ? "chevron-down" : "chevron-up"} size={25} color='#CB9CF2'
                                                style={{
                                                    alignSelf: 'flex-end',
                                                    paddingVertical: 10
                                                }} />

                                        </View>

                                    </TouchableOpacity>

                                    {/* Borderline at bottom of the section headers */}
                                    <View style={{ height: 2, backgroundColor: '#828282' }} />
                                </View>
                            )}
                        />
                    </View>

                    {/* ??? */}
                    <View style={{ padding: 40 }}>
                    </View>

                    {/* Popup/Overlay for adding food in shopping list */}
                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ backgroundColor: '#0E1116', borderRadius: 8, borderColor: '#CB9CF2', borderWidth: 2 }}>
                        
                        {/* View to hold the exit icon */}
                        <View style={{ paddingVertical: 8, paddingRight: 8, flexDirection: 'row-reverse' }}>
                            <TouchableOpacity onPress={toggleOverlay} style={{ width: 25 }}>
                                <Feather name="x" size={25} color="#F2F4F3" />
                            </TouchableOpacity>
                        </View>
                        
                        {/* Handling the input of a food into the shopping list */}
                        <View style={[styles.viewContainer, {}]}>
                            
                            {/* Food Name input */}
                            <View style={{ padding: 10 }}>
                                <TextInput style={styles.inputFieldStyle}
                                    placeholder='Food Name'
                                    selectionColor='#CB9CF2'
                                    placeholderTextColor='rgba(242,244,243, 0.2)'
                                    onChangeText={(text) => setFoodName(text)}
                                >
                                </TextInput>
                            </View>
                            
                            {/* Food Type input */}
                            <View style={{ padding: 10 }}>
                                <TextInput style={[styles.inputFieldStyle]}
                                    placeholder='Food Type'
                                    selectionColor='#CB9CF2'
                                    placeholderTextColor='rgba(242,244,243, 0.2)'
                                    onChangeText={(text) => setFoodType(text)}
                                >
                                </TextInput>
                            </View>

                            {/* Submit button */}
                            <View style={{ paddingHorizontal: 10 }}>
                                <TouchableOpacity onPress={handleAddFood}
                                    style={[styles.button, { backgroundColor: '#CB9CF2' }]}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </Overlay>

                    {/* Popup for options menu */}
                    <Overlay isVisible={visibleOptions} onBackdropPress={toggleOptions} overlayStyle={styles.optionsMenu}>
                        
                        {/* View to contain all options */}
                        <View style={{ paddingHorizontal: 8, justifyContent: 'center' }}>
                            
                            {/* Resetting checkmarks */}
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name="rotate-ccw" size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
                                <Text style={styles.optionsText}>
                                    Reset Checkmarks
                                </Text>
                            </TouchableOpacity>

                            {/* Deleting all items from list */}
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name="trash-2" size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
                                <Text style={styles.optionsText}>
                                    Delete All
                                </Text>
                            </TouchableOpacity>

                            {/* Deleting checked items from list */}
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name="x-square" size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
                                <Text style={styles.optionsText}>
                                    Delete Checked
                                </Text>
                            </TouchableOpacity>

                            {/* Generating list from tracker screen(s) */}
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name="shopping-cart" size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
                                <Text style={styles.optionsText}>
                                    Generate List
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </Overlay>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default ShoppingList;