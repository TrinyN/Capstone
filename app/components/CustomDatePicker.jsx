import { TextInput, TouchableOpacity, Text, View, Modal, Pressable, Platform } from 'react-native';
import styles from '../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

const CustomDatePicker = ({ placeholder, hasTitle }) => {
    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(showPicker)
    const [dateOfBirth, setDateOfBirth] = useState(false)

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
                        onChangeText={setDateOfBirth}
                        editable={false}
                        onPressIn={toggleDatepicker}>
                    </TextInput>
                </Pressable>
            ) : (
                <Pressable onPress={toggleDatepicker} style={{}}>
                    <View style={{ justifyContent: 'center' }}>
                        <TextInput
                            style={[styles.smallText, { color: '#ABABAB', textAlign: 'left', paddingLeft: 10 }]}
                            placeholder={placeholder}
                            placeholderTextColor={'#F2F4F3'}
                            editable={false}
                            onPressIn={toggleDatepicker}
                            value={dateOfBirth}
                            onChangeText={setDateOfBirth}
                        >
                        </TextInput>
                    </View>

                </Pressable>
            )}


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

            {showPicker && Platform.OS === "ios" && (
                <Modal transparent={true} animationType="slide" style={{ justifyContent: 'center' }}>
                    <View style={{ backgroundColor: '#0E1116', bottom: 0, position: 'absolute', alignSelf: 'center', width: '100%' }}>
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
                            <TouchableOpacity onPress={toggleDatepicker} style={[styles.button, {backgroundColor: 'transparent', borderWidth: 1, borderColor: '#F2F4F3'}]}>
                                <Text style={[styles.buttonText, {color: '#F2F4F3'}]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={confirmIOSDate} style={[styles.button, {backgroundColor: '#CB9CF2'}]}>
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