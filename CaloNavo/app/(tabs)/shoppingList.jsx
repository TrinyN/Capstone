import { TouchableOpacity, TextInput, Text, View, SectionList, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import Feather from "react-native-vector-icons/Feather";
import { useState, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import { Overlay } from '@rneui/base';

const ShoppingList = () => {

    const [collapsedSections, setCollapsedSections] = useState({})

    const [checkedItems, setCheckedItems] = useState({});

    const [foodName, setFoodName] = useState('')
    const [foodType, setFoodType] = useState('')

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

    const toggleCollapse = (section) => {
        setCollapsedSections(prevState => ({
            ...prevState,
            [section.title]: !prevState[section.title]
        }));
    };

    const toggleChecked = (item) => {
        setCheckedItems(prevState => ({
            ...prevState,
            [item]: !prevState[item]
        }));
    };

    const areAllItemsChecked = (items) => {
        return items.every(item => checkedItems[item]);
    };

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const handleAddFood = () => {
        // Find the section that matches foodType
        const updatedShoppingList = shoppingList.map(section => {
            if (section.title == foodType) {
                // Update the data array for the matched food type
                return {
                    ...section,
                    data: [...section.data, foodName.charAt(0).toUpperCase() + foodName.slice(1).toLowerCase()] // Add the new food item
                };
            }
            // Return the section as is if it does not match
            return section;
        });

        // Update the shopping list
        setShoppingList(updatedShoppingList)

        // Close overlay
        toggleOverlay()
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[styles.viewContainer, { flex: 1 }]}>
                    <View style={{ marginTop: 70, flexDirection: 'row', paddingBottom: 20, alignItems: 'center' }}>
                        <Text style={[styles.titleText, { flex: 1 }]}>
                            Shopping List
                        </Text>
                        <TouchableOpacity style={{ width: 30 }}>
                            <Feather name="more-vertical" size={30} color="#CB9CF2" />
                        </TouchableOpacity>
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
                            sections={shoppingList}
                            keyExtractor={(item) => item}

                            renderItem={({ item, section }) =>
                                !collapsedSections[section.title] && (
                                    <View>
                                        <View style={{ backgroundColor: '#0E1116', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
                                            <Checkbox
                                                color='#CB9CF2'
                                                value={!!checkedItems[item]}
                                                onValueChange={() => toggleChecked(item)}
                                            />
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
                                        <View style={{ height: 1, backgroundColor: 'rgba(242,244,243,0.2)' }} />
                                    </View>
                                )
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
                                                        textDecorationLine: areAllItemsChecked(section.data) ? 'line-through' : 'none',
                                                        color: areAllItemsChecked(section.data) ? '#6F5882' : '#CB9CF2',
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
                    </View>
                    <View style={{ padding: 40 }}>
                    </View>
                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ backgroundColor: '#0E1116', borderRadius: 8, borderColor: '#CB9CF2', borderWidth: 2 }}>
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
                                <TouchableOpacity onPress={handleAddFood}
                                    style={[styles.button, { backgroundColor: '#CB9CF2' }]}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Overlay>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default ShoppingList;