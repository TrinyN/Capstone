import { TouchableOpacity, TextInput, Text, View, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import Feather from "react-native-vector-icons/Feather";
import { useState, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import { ListItem, Overlay } from '@rneui/base';
import CustomDropdown from '../components/CustomDropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import { router } from 'expo-router';


// problems:
// looks weird on android (feather icon positions doesnt line up with drop down icon)
// drop down is behind other items in list (zIndex is supposed to fix this but doesnt)
// the transparent background looks good but hides the drop down

// need to fix drop down elements

const Profile = () => {
    // saves visibility of log out pop up
    const [visibleLogOut, setVisibleLogOut] = useState(false);

    // change visibility of log out pop up
    const toggleLogOut = () => {
        setVisibleLogOut(!visibleLogOut);
    };

    const [editable, setEditable] = useState(false);
    // change visibility of log out pop up
    const toggleEditable = () => {
        setEditable(!editable);
    };

    // test data, will need to start off empty and be saved for each user
    const [userInfo, setUserInfo] = useState([
        { title: 'Email', value: 'trinynguyen@gmail.com', type: '', options: [] },
        { title: 'Name', value: 'Triny', type: 'text', options: [] },
        { title: 'Gender', value: 'Female', type: 'dropdown', options: ['Female', 'Male'] },
        { title: 'Date of Birth', value: '08/23/2003', type: 'text', options: [] },
        { title: 'Height', value: '5 feet 0 in', type: 'text', options: [] },
        { title: 'Weight', value: '1,000 lbs', type: 'text', options: [] },
        { title: 'Caloric Goal', value: '2,400', type: 'text', options: [] },
        { title: 'Water Goal', value: '9 cups per day', type: 'text', options: [] },
        { title: 'Weight Goal', value: 'Gain', type: 'dropdown', options: ['Gain', 'Lose', 'Maintain'] },
        { title: 'Diet Plan', value: 'Keto (Custom)', type: 'dropdown', options: ['Keto', 'Vegetarian'] },
        { title: 'Macro Ratio Goal', value: '30:30:30', type: 'text', options: [] },

    ]);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);
    const Item = ({ title, value, index, type, options }) => {
        const backgroundColor = index % 2 === 0 ? 'transparent' : '#0E1116';
        // const zIndex = index % 2 === 0 ? 1 : 5;
        const zIndex = open && type === 'dropdown' ? 1000 : 1;
        return (

            <View style={[{ backgroundColor, zIndex, flexDirection: 'row', paddingVertical: 10, alignItems: 'center', paddingRight: 10, flex: 1 }]}>
                <View style={{ width: '40%' }}>
                    <Text style={[styles.smallText, { fontFamily: 'Inter_600SemiBold', color: '#CB9CF2', textAlign: 'left', paddingHorizontal: 10 }]}>{title}</Text>

                </View>

                {(type === 'dropdown') ? (
                    <View style={{ flex: 1, zIndex: 1000 }}>
                        <DropDownPicker
                            zIndex={10000}
                            open={open}
                            value={value}
                            setOpen={setOpen}
                            setValue={setValue}
                            // setItems={setItems}
                            // items={items}

                            // fyi: items are the different items you can select in the dropdown
                            // value is the item that has been selected by the user



                            style={{ backgroundColor: 'transparent', borderWidth: 0, maxHeight: 27, paddingHorizontal: 10, minHeight: 27 }}
                            theme='DARK'
                            placeholder={value}
                            placeholderStyle={[styles.smallText, { textAlign: 'left', paddingVertical: 0 }]}
                            dropDownContainerStyle={{ zIndex: 1000, elevation: 3 }}
                        />
                    </View>
                ) : (

                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <View style={{ maxWidth: '75%' }}>

                            <TextInput
                                placeholder={value}
                                placeholderTextColor={'#F2F4F3'}
                                placeholderStyle={[styles.smallText, { textAlign: 'left', flex: 1, paddingLeft: 10 }]}
                                editable={editable}
                                style={[styles.smallText, { textAlign: 'left', flex: 1, paddingLeft: 10 }]}
                            >
                            </TextInput>
                        </View>

                        <View style={{ alignItems: 'flex-end', justifyContent: 'center', flex: 1, paddingRight: 12 }}>
                            <TouchableOpacity onPress={toggleEditable} style={{ width: 15, position: 'absolute' }}>
                                <Feather name={"edit-2"} size={15} color="#CB9CF2" />
                            </TouchableOpacity>
                        </View>

                    </View>

                )}
            </View>
        )
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                {/* The "body" of the screen view */}
                <View style={[styles.viewContainer, { flex: 1 }]}>

                    {/* Screen header */}
                    <View style={{ marginTop: 70, flexDirection: 'row', paddingBottom: 85, alignItems: 'center' }}>

                        <Text style={[styles.titleText, { flex: 1 }]}>
                            Your Profile
                        </Text>

                        {/* Log out button */}
                        <TouchableOpacity onPress={toggleLogOut} style={{ width: 30 }}>
                            <Feather name="log-out" size={30} color="#CB9CF2" />
                        </TouchableOpacity>

                    </View>

                    <View style={{ borderRadius: 10, backgroundColor: 'rgba(27,33,43,0.5)' }}>
                        <FlatList

                            data={userInfo}
                            renderItem={({ item, index }) => <Item title={item.title} value={item.value} index={index} type={item.type} options={item.options} item={item} />}
                            keyExtractor={item => item.title}
                        />

                    </View>
                    <View style={{ paddingTop: 30 }}>
                        <View style={{ borderRadius: 10, backgroundColor: 'rgba(27,33,43,0.5)' }}>
                            <Text>
                                fajkfh
                            </Text>
                        </View>

                    </View>













                    {/* Popup for log out */}
                    <Overlay isVisible={visibleLogOut} onBackdropPress={toggleLogOut} overlayStyle={{ backgroundColor: '#0E1116', borderWidth: 2, borderColor: '#CB9CF2', width: '90%' }}>

                        <View style={[{ paddingHorizontal: 8, justifyContent: 'center' }]}>
                            <Text style={[styles.defaultText, { color: '#F2F4F3', textAlign: 'center' }]}>
                                Are you sure you want to log out?
                            </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30 }}>
                                <TouchableOpacity onPress={toggleLogOut} style={[styles.button, { backgroundColor: '#0E1116', borderWidth: 1, borderColor: '#F2F4F3', width: 85 }]}>

                                    <Text style={[styles.buttonText, { color: '#F2F4F3' }]}>Cancel</Text>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { router.push('') }} style={[styles.button, { backgroundColor: '#CB9CF2', width: 85 }]}>
                                    <Text style={[styles.buttonText, { color: '0E1116' }]}>Log Out</Text>

                                </TouchableOpacity>

                            </View>

                        </View>

                    </Overlay>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
export default Profile;