import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import styles from '../../styles';
import Feather from "react-native-vector-icons/Feather";
import { Overlay } from '@rneui/base';
import React from 'react'
import OptionItem from './OptionItem';

const TrackerOptions = ({
    visibleOptions,
    toggleOptions,
    view
}) => {
    let zoomIn
    let zoomOut
    let zoomOutRoute
    let zoomInRoute

    if (view == 'Day') {
        zoomOut = true
        zoomOutRoute = '/tracker-week'
    }
    else if (view == 'Week') {
        zoomIn = true
        zoomOut = true
        zoomOutRoute = '/tracker-month'
        zoomInRoute = '/tracker'
    }
    else {
        zoomIn = true
        zoomInRoute = '/tracker-week'
    }

    const zoomInOpac = zoomIn ? 1 : 0.2
    const zoomOutOpac = zoomOut ? 1 : 0.2

    return (
        <Overlay isVisible={visibleOptions} onBackdropPress={toggleOptions} overlayStyle={[localStyle.optionsMenu]}>

            {/* View containing option choices */}
            <View style={{ paddingHorizontal: 8, justifyContent: 'center' }}>

                {/* Notes Option Button. Only appears on day view */}
                {/* TODO: Choose:
        1. WHEN PRESSED make user choose a DATE to apply notes to */}
                {view == 'Day' &&
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Feather name="edit-3" size={20} color="#F2F4F3" style={{ paddingRight: 5 }} />
                        <Text style={styles.optionsText}>
                            Take Notes
                        </Text>
                    </TouchableOpacity>
                }
                {/* Generate Shopping List Option Button. Won't appear on month view */}
                {(view == 'Day' || view == 'Week') &&
                <OptionItem
                    title={"Generate Shopping List"}
                    icon={"shopping-cart"}
                />
                }
                {/* Zoom in Option Button */}
                <OptionItem
                    title={"Zoom In"}
                    icon={"maximize-2"}
                    zoomRoute={zoomInRoute}
                    opacity={zoomInOpac}
                    toggleOptions={toggleOptions}
                />
                {/* Zoom out Option Button */}
                <OptionItem
                    title={"Zoom Out"}
                    icon={"minimize-2"}
                    zoomRoute={zoomOutRoute}
                    opacity={zoomOutOpac}
                    toggleOptions={toggleOptions}
                />
            </View>
        </Overlay>
    )
}

export default TrackerOptions

const localStyle = StyleSheet.create({
    optionsMenu: {
        backgroundColor: '#1F2938',
        borderRadius: 5,
        // width: 200, 
        // width: '60%',
        // height: 130,
        // height: '20%',
        position: 'absolute',
        top: 100,
        right: 50,
    },
    
})