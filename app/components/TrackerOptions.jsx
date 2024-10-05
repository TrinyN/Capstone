

import { TouchableOpacity, Text, View } from 'react-native';
import styles from '../styles';
import Feather from "react-native-vector-icons/Feather";
import { Overlay } from '@rneui/base';
import { router } from 'expo-router';
import React from 'react'
// TODO: change color of zoom in zoom out depending on tracker screen version
const TrackerOptions = ({
    visibleOptions, 
    toggleOptions
}) => {
    return (
        <Overlay isVisible={visibleOptions} onBackdropPress={toggleOptions} overlayStyle={[styles.optionsMenu, { width: '70%' }]}>

            {/* View containing option choices */}
            <View style={{ paddingHorizontal: 8, justifyContent: 'center' }}>

                {/* Notes Option Button */}
                {/* TODO: Choose:
        1. REMOVE take notes from tracker WEEK and MONTH screens
        2. WHEN PRESSED make user choose a DATE to apply notes to */}
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="edit-3" size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
                    <Text style={styles.optionsText}>
                        Take Notes
                    </Text>
                </TouchableOpacity>

                {/* Shopping List Option Button */}
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPressOut={toggleOptions}>

                    <Feather name="shopping-cart" size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
                    <Text style={styles.optionsText}>
                        Generate Shopping List
                    </Text>
                </TouchableOpacity>

                {/* Zoom in Option Button */}
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', opacity: 0.2 }}
                    disabled={true}>

                    <Feather name="maximize-2" size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
                    <Text style={styles.optionsText}>
                        Zoom In
                    </Text>
                </TouchableOpacity>

                {/* Zoom out Option Button */}
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => router.push('/tracker-week')}
                    onPressOut={toggleOptions}>

                    <Feather name="minimize-2" size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
                    <Text style={styles.optionsText}>
                        Zoom Out
                    </Text>
                </TouchableOpacity>
            </View>
        </Overlay>
    )
}

export default TrackerOptions