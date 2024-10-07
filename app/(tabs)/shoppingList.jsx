import { StyleSheet, TouchableOpacity, TextInput, Text, View, SectionList, Dimensions } from 'react-native';
import styles from '../styles';
import Feather from "react-native-vector-icons/Feather";
import { useState, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import { Overlay } from '@rneui/base';
import CustomDropdown from '../components/CustomDropdown';
import CustomPopUp from '../components/CustomPopUp';
import CustomScreen from '../components/CustomScreen';
import CustomButton2 from '../components/CustomButton2';
import OptionItem from '../components/OptionItem';

// todo:
// save list for user
// generate shopping list functionality
// add the bottom text: "It looks like your shopping list blah"
// input validation
// make handle add food not work if same food name

// REFACTORING FLAGGING - Needs a Component
// 1. Screen component
// 2. Screen header component
// 3. Add button component
// 4. Render list component(s) - split into header, list item, and footer?
// 5. Options overlay component
// 6. Minor button component? (i.e. Zoom out = Zoom in = Take notes, etc.)
// 7. Spacing components

const ShoppingList = () => {
    const { width, height } = Dimensions.get('window');

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

    const [items, setItems] = useState([
        { label: 'Fruit', value: 'Fruit' },
        { label: 'Vegetable', value: 'Vegetable' },
        { label: 'Protein', value: 'Protein' },
        { label: 'Dairy', value: 'Dairy' },
        { label: 'Grain', value: 'Grain' },
        { label: 'Snack', value: 'Snack' },
        { label: 'Beverage', value: 'Beverage' },
        { label: 'Misc.', value: 'Misc.' }

    ]);

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

        if (foodName != '') {

            // find the section that matches foodType entered by user
            const updatedShoppingList = shoppingList.map(section => {
                if (section.title == foodType.toString()) {
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

            // delete food name after it's added to the list
            setFoodName('')
        }

        // close overlay
        toggleOverlay()
    }

    const resetCheckmarks = () => {
        setCheckedItems({})
    }

    const deleteAll = () => {
        const emptyShoppingList = [
            { title: 'Fruit', data: [] },
            { title: 'Vegetable', data: [] },
            { title: 'Protein', data: [] },
            { title: 'Dairy', data: [] },
            { title: 'Grain', data: [] },
            { title: 'Snack', data: [] },
            { title: 'Beverage', data: [] },
            { title: 'Misc.', data: [] },
        ];
        setShoppingList(emptyShoppingList)
    };

    const deleteCheckedItems = () => {
        const updatedShoppingList = shoppingList.map(section => {
            return {
                ...section,
                data: section.data.filter(item => !checkedItems[item])
            };
        });

        setShoppingList(updatedShoppingList);
    };

    return (
        <CustomScreen
            title='Shopping List'
            hasOptions={true}
            toggleOptions={toggleOptions}
            screenContent={

                <View>
                    {/* Add button */}
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
                                        <View style={[shopListStyles.listContainer, { backgroundColor: '#0E1116'}]}>

                                            {/* Checkboxes for items on list */}
                                            <Checkbox
                                                color='#CB9CF2'
                                                value={!!checkedItems[item]}
                                                onValueChange={() => toggleChecked(item)}
                                            />

                                            {/* Item names */}
                                            <Text
                                                style={[
                                                    styles.defaultWhiteText, shopListStyles.itemsCheckable,
                                                    {
                                                        textDecorationLine: checkedItems[item] ? 'line-through' : 'none',
                                                        color: checkedItems[item] ? '#ABABAB' : '#F2F4F3',
                                                    }
                                                ]}>
                                                {item}
                                            </Text>

                                        </View>

                                        {/* Divider lines between items */}
                                        <View style={shopListStyles.thinBorderLine} />
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
                                        <View style={shopListStyles.listContainer}>
                                            {/* Section label/names */}
                                            <Text
                                                style={[
                                                    styles.defaultWhiteText, shopListStyles.sectionCheckable, 
                                                    {
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
                                    <View style={shopListStyles.borderLine} />
                                </View>
                            )}
                        />
                    </View>

                    {/* Spacing under the list */}
                    <View style={{ padding: 40 }}>
                    </View>

                    {/* NOTE: Adjust Overlay's flex or width/height to change its size properly */}
                    {/* Popup/Overlay for adding food in shopping list */}
                    <CustomPopUp visible={visible} toggleOverlay={toggleOverlay} hasBackButton={false}
                        content={
                            // Handling the input of a food into the shopping list
                            <View style={{ paddingHorizontal: 30, paddingBottom: 20 }}>
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
                                <View style={{ padding: 10, zIndex: 1 }}>
                                    <CustomDropdown
                                        placeholder={'Food Type'}
                                        setCustomValue={setFoodType}
                                        items={items}
                                        setItems={setItems}
                                    />
                                </View>

                                {/* Submit button */}
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
                    <Overlay isVisible={visibleOptions} onBackdropPress={toggleOptions} overlayStyle={[styles.optionsMenu, { justifyContent: 'center' }]}>

                        {/* View to contain all options */}
                        <View style={{ paddingHorizontal: 8, justifyContent: 'center' }}>

                            {/* Resetting checkmarks */}
                            <OptionItem
                                title={"Reset Checkmarks"}
                                icon={"rotate-ccw"}
                                onPress={resetCheckmarks}
                                isShoppingList={true}
                            />

                            {/* Deleting checked items from list */}
                            <OptionItem
                                title={"Delete Checked"}
                                icon={"x-square"}
                                onPress={deleteCheckedItems}
                                isShoppingList={true}
                            />

                            {/* Deleting all items from list */}
                            <OptionItem
                                title={"Delete All"}
                                icon={"trash-2"}
                                onPress={deleteAll}
                                isShoppingList={true}
                            />

                            {/* Generating list from tracker screen(s) */}
                            <OptionItem
                                title={"Generate List"}
                                icon={"shopping-cart"}
                                // onPress={}
                                isShoppingList={true}
                            />

                        </View>

                    </Overlay>
                </View>
            }
        />
    )
}
export default ShoppingList;


const shopListStyles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 15 
    },
    itemsCheckable:{
        paddingLeft: 30,
        paddingVertical: 10,
        textDecorationColor: '#F2F4F3'
    }, 
    sectionCheckable:{
        paddingLeft: 10,
        flex: 1,
        fontFamily: 'Inter_600SemiBold',
        textDecorationColor: '#CB9CF2',
    },
    borderLine:{
        height: 2, 
        backgroundColor: '#828282' 
    },
    thinBorderLine:{
        height: 1, 
        backgroundColor: 'rgba(242,244,243,0.2)'
    },
})