import { View } from 'react-native';
import styles from '../../styles';
import { Overlay } from '@rneui/base';
import React from 'react'
import OptionItem from './OptionItem';

const TrackerOptions = ({
    visibleOptions,
    toggleOptions,
    view,
    toggleNotesOverlay, 
    day, 
    dayList
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
        <Overlay isVisible={visibleOptions} onBackdropPress={toggleOptions} overlayStyle={[styles.optionsMenu]}>

            {/* View containing option choices */}
            <View style={{ paddingHorizontal: 8, justifyContent: 'center' }}>

                {/* Notes Option Button. Only appears on day view */}
                {/* TODO: Choose:
        1. WHEN PRESSED make user choose a DATE to apply notes to */}
                {view == 'Day' &&
                <OptionItem
                    title={"Take Notes"}
                    icon={"edit-3"}
                    isNotes={true}
                    toggleNotesOverlay={toggleNotesOverlay}
                />
                }
                {/* Generate Shopping List Option Button. Won't appear on month view */}
                {(view != 'Month') &&
                <OptionItem
                    title={"Generate Shopping List"}
                    icon={"shopping-cart"}
                    isShoppingList={true}
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
                    day={day}
                    dayList={dayList}
                />
            </View>
        </Overlay>
    )
}
export default TrackerOptions