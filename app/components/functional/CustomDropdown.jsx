import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet } from 'react-native';
import styles from '../../styles';

// Function that returns the CustomDropdown given certain fields to determine its behavior
const CustomDropdown = ({ placeholder, setCustomValue, items, setItems }) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={(val) => {
                setValue(val)
                setCustomValue(val)
            }}
            setItems={setItems}
            theme="DARK"
            placeholder={placeholder}
            style={[styles.inputFieldStyle, { borderWidth: 0, minHeight: 45}]}
            borderColor='#0E1116'
            placeholderStyle={{ color: 'rgba(242,244,243, 0.2)', fontSize: 16 }}
            borderWidth={0}
            dropDownContainerStyle={{ theme: "DARK", borderWidth: 0}}
            textStyle={{ fontSize: 16, color: '#F2F4F3', paddingLeft: 5 }}
            containerStyle={{ zIndex: 3 }}
        />
    )
}

export default CustomDropdown

const localStyle = StyleSheet.create({
    
})