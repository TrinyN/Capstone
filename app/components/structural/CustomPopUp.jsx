import { TouchableOpacity, View } from 'react-native';
import { Overlay } from '@rneui/base';
import Feather from "react-native-vector-icons/Feather";
import React from 'react';

// renders the frame, close overlay button, and back button if any

const CustomPopUp = ({ visible, toggleOverlay, content, hasBackButton, previousOverlay }) => {
    const iconColor = hasBackButton ? "#F2F4F3" : "transparent"
    return (
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}
            overlayStyle={{
                backgroundColor: '#0E1116', borderRadius: 8,
                borderColor: '#CB9CF2', borderWidth: 2, maxWidth: '90%', minWidth: '75%'
            }}>

            {/* View at top to hold exit button */}
            <View style={{ paddingVertical: 8, paddingRight: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={previousOverlay} style={{ width: 30 }} disabled={!hasBackButton}>
                    <Feather name="chevron-left" size={30} color={iconColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleOverlay} style={{ width: 25 }}>
                    <Feather name="x" size={25} color="#F2F4F3" />
                </TouchableOpacity>
            </View>

            {content}

        </Overlay>
    );
};


export default CustomPopUp