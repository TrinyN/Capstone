// This file contains the ProfileItem component, allowing the profile
// screen to generate its various rows of data to display
// given certain values by implementation found in a <ProfileItem>
// object within the profile screen.

import { View, TouchableOpacity, Text, TextInput, StyleSheet } from "react-native";
import { useState, useRef } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import CustomDatePicker from './CustomDatePicker';
import Feather from "react-native-vector-icons/Feather";
import styles from "../../styles";

// NEEDS REFACTORING == too long maybe

// Function to return the ProfileItem component, used in displaying profile data on the profile screen
const ProfileItem = ({ title, value, index, type, options }) => {
    const textInputRef = useRef();

    // saves editability state
    const [editable, setEditable] = useState(false);

    // change whether text input is editable
    const enableEditable = () => {
        setEditable(true);
        setTimeout(() => textInputRef.current.focus(), 100)// Focus the TextInput if it is becoming editable
    };

    const disableEditable = () => {
        setEditable(false);
    }

    // if index is even, have transparent background, else dark gray
    const backgroundColor = index % 2 === 0 ? 'transparent' : '#0E1116';

    // open state of dropdown picker
    const [open, setOpen] = useState(false);

    // selected value of dropdown picker
    const [selectedValue, setSelectedValue] = useState({});
    const [text, setText] = useState('');

    const renderText = () => {
        return (
            <TextInput
                ref={textInputRef}
                multiline={false}
                placeholder={value}
                placeholderTextColor={'#F2F4F3'}
                placeholderStyle={[styles.smallText, localStyle.text]}
                // editable={editable}
                style={[styles.smallText, localStyle.text, { color: '#ABABAB'}]}
                selectionColor={'#CB9CF2'}
                // onSubmitEditing={disableEditable}
                // onEndEditing={disableEditable}

                // onChangeText={toggleSaveVisibility}
                // onSelectionChange={toggleSaveVisibility}
                value={text}
                onChangeText={(textInput) => {
                    setText(textInput); // Update the text state
                    // setOpacity(1); // Show save button if there's text
                    // setSaveVisibility(textInput.length > 0)
                }}
            >
            </TextInput>
        )
    }
    // Choosing the proper display depending of the passed ProfileItem type
    const renderAppropriateField = () => {
        switch (type) {
            // Dropdown Field
            case 'dropdown':
                return (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <DropDownPicker
                            showArrowIcon={true}
                            open={open}
                            value={selectedValue}
                            setOpen={setOpen}
                            setValue={setSelectedValue}
                            items={options.map(option => ({ label: option, value: option }))}

                            // fyi: items are the different items you can select in the dropdown
                            // value is the item that has been selected by the user

                            // styling
                            dropDownDirection='TOP'
                            style={localStyle.dropdownStyle}
                            theme='DARK'
                            placeholder={value}
                            placeholderStyle={[styles.smallText, { textAlign: 'left' }]}
                            dropDownContainerStyle={{ theme: 'DARK', borderWidth: 0, position: 'absolute' }}
                            textStyle={[styles.smallText, { color: '#ABABAB', textAlign: 'left' }]}
                        />
                    </View>
                )
            // Text field
            case 'text':
                return (
                    <View style={[localStyle.dataContainer, { paddingVertical: 10 }]}>
                        <View style={{ flex: 1 }}>
                            {renderText()}
                        </View>

                        <View style={localStyle.editIconContainer}>
                            <TouchableOpacity onPress={enableEditable} style={{ widthAndHeight: '100%' }}>
                                <Feather name={"edit-2"} size={15} color="#CB9CF2" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            // Date field
            case 'date':
                return (
                    <View style={localStyle.dataContainer}>
                        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                            <CustomDatePicker placeholder={value}/>
                        </View>
                        <View style={localStyle.editIconContainer}>
                            <TouchableOpacity style={{ pointerEvents: 'none', widthAndHeight: '100%' }}>
                                <Feather name={"edit-2"} size={15} color="#CB9CF2" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            default:
                return (
                    <View style={[localStyle.dataContainer, { paddingVertical: 10, paddingRight: 10 }]}>
                        <View style={{ flex: 1 }}>
                            {renderText()}
                        </View>
                    </View>
                )
        }
    };
    // Returning the display for the items used, dependent on the type passed through to choose a the proper style
    return (
        <View style={[localStyle.dataContainer, { justifyContent: 'center', backgroundColor, height: 50 }]}>
            <View style={{ width: '40%' }}>
                <Text style={[styles.smallText, { fontFamily: 'Inter_600SemiBold', color: '#CB9CF2', textAlign: 'left', paddingHorizontal: 10 }]}>{title}</Text>
            </View>
            {renderAppropriateField()}
        </View>
    );
};
export default ProfileItem;

const localStyle = StyleSheet.create({
    dataContainer:{
        flexDirection: 'row', 
        alignItems: 'center', 
        flex: 1
    },
    editIconContainer: {
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        paddingRight: 12, 
        paddingLeft: 10
    },
    text: {
        textAlign: 'left', 
        flex: 1, 
        paddingLeft: 10
    },
    dropdownStyle:{
        alignSelf: 'center', 
        textAlign: 'center', 
        backgroundColor: 'transparent', 
        borderWidth: 0, 
        paddingHorizontal: 10
    },
})