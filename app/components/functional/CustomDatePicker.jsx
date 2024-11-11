import { TextInput, TouchableOpacity, Text, View, Modal, Pressable, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import styles from '../../styles';

const CustomDatePicker = ({ placeholder, hasTitle, dateOfBirth, setDateOfBirth }) => {
    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(showPicker)
    // const [dateOfBirth, setDateOfBirth] = useState(false)

    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
    }

    const confirmIOSDate = () => {
        setDateOfBirth(formatDate(date))
        toggleDatepicker()
    }

    const formatDate = (rawDate) => {
        let date = new Date(rawDate)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate();

        month = month < 10 ? `0${month}` : month
        day = day < 10 ? `0${day}` : day

        return `${month}/${day}/${year}`
    }
    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate
            setDate(currentDate)

            if (Platform.OS === "android") {
                toggleDatepicker()
                setDateOfBirth(formatDate(currentDate))
            }
        } else {
            toggleDatepicker()
        }
    }
    return (
        <View>
            {hasTitle ? (
                <Pressable onPress={toggleDatepicker}>
                    {/* Age question and field */}
                    <Text style={styles.defaultText}>
                        {placeholder}
                    </Text>
                    <TextInput style={styles.inputFieldStyle}
                        selectionColor='#CB9CF2'
                        placeholderTextColor='rgba(242,244,243, 0.2)'
                        placeholder='06/01/3024'
                        value={dateOfBirth}
                        onChangeText={newDate => setDateOfBirth(newDate)}
                        editable={false}
                        onPressIn={toggleDatepicker}>
                    </TextInput>
                </Pressable>
            ) : (
                <Pressable onPress={toggleDatepicker} style={{}}>
                    <View style={{ justifyContent: 'center' }}>
                        <TextInput
                            style={localStyle.inputText}
                            placeholder={placeholder}
                            placeholderTextColor={'#F2F4F3'}
                            editable={false}
                            onPressIn={toggleDatepicker}
                            value={dateOfBirth}
                            onChangeText={newDate => setDateOfBirth(newDate)}
                        >
                        </TextInput>
                    </View>
                </Pressable>
            )}
            {/* Android date picker */}
            {showPicker && Platform.OS === "android" && (
                <DateTimePicker
                    mode='date'
                    display='spinner'
                    value={date}
                    onChange={onChange}
                    accentColor='#CB9CF2'
                    textColor='#F2F4F3'
                    style={{ backgroundColor: '#0E1116' }}
                    maximumDate={new Date()}
                />
            )}
            {/* IOS date picker */}
            {showPicker && Platform.OS === "ios" && (
                <Modal transparent={true} animationType="slide" style={{ justifyContent: 'center' }}>
                    <View style={localStyle.iosDateView}>
                        <DateTimePicker
                            mode='date'
                            display='spinner'
                            value={date}
                            onChange={onChange}
                            accentColor='#CB9CF2'
                            textColor='#F2F4F3'
                            style={{ backgroundColor: '#0E1116' }}
                            maximumDate={new Date()}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            {/* Toggle date button */}
                            <TouchableOpacity onPress={toggleDatepicker} 
                                style={[localStyle.button, {backgroundColor: 'transparent', borderWidth: 1, borderColor: '#F2F4F3'}]}
                            >
                                <Text style={[styles.buttonText, {color: '#F2F4F3'}]}>Cancel</Text>
                            </TouchableOpacity>
                            {/* Confirm date button */}
                            <TouchableOpacity onPress={confirmIOSDate} 
                                style={[localStyle.button, {backgroundColor: '#CB9CF2'}]}
                            >
                                <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    )
}
export default CustomDatePicker

const localStyle = StyleSheet.create({
    inputText: {
        color: '#ABABAB',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        textAlign: 'left',
        paddingVertical: 5,
        paddingLeft: 10
    },
    iosDateView:{
        backgroundColor: '#0E1116', 
        bottom: 0, 
        position: 'absolute', 
        alignSelf: 'center',
        width: '100%'
    },
    button: {
        backgroundColor: '#F2F4F3',
        padding: 10,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 8,
        activeOpacity: 0.7, 
        minHeight: 30, 
    },
})