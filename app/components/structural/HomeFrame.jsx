import Feather from "react-native-vector-icons/Feather";
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import WaterGauge from "../functional/WaterGauge";

// TODO: need to implement handle press later, quick track, open add pop up, notes add notes pop up
{/* TODO: Add popup for quick tracker */ }
const HomeFrame = ({
    title,
    toggleNotesOverlay,
    // handlePress
}) => {
    let marginBottom
    let icon
    let style = localStyle.viewHomeFrameNormal // default style

    if (title == "Quick Track") {
        marginBottom = 20
        icon = 'plus-circle'
    }
    else if (title == "Notes") {
        icon = 'edit-3'
    }
    else {
        style = localStyle.viewHomeFrameTall
    }

    const handlePress = () => {
        if(title == "Quick Track") {
            router.push('/tracker', {toggleOverlay:true}); // second half does not work properly
        } else if(title == "Notes") {
            // router.push('/tracker');
            toggleNotesOverlay();
        } else {
            router.push('/tracker');
        }
    };

    return (
        // {/* Quick Track Frame */ }
        <View style={[style, { marginBottom }]}>
            {/* Touchable Opacity to make entire frame a button */}
            <TouchableOpacity
                style={localStyle.frameContent}
                onPress={handlePress}>
                <Text style={localStyle.frameTitle}>
                    {title}
                </Text>
                {title == 'Staying Hydrated?' ? (
                    // {/* WARNING: May have to change bottle to be exact size to prevent issues with it changing sizes based on screen */}
                    // {/* TODO: Add calculation of water progress */}
                    // progress to control how full
                    <WaterGauge progress={90}/>
                ) : (
                    // {/* How to fill pruple with dark plus (~Figma)??? */}
                    // {/* Issue: SVG (including stroke and fill) no long supported for feather */}
                    <Feather name={icon}
                        size={55}
                        color={'#CB9CF2'}
                    />
                )}
            </TouchableOpacity>
        </View>
    )
}
export default HomeFrame

const localStyle = StyleSheet.create({
    viewHomeFrameNormal: {                      // Example: Quick Add Frame, Home
        height: '100%',
        width: '100%',
        backgroundColor: '#1F2938',
        paddingVertical: 15,
        flex: 1,
        borderRadius: 8,
    },
    viewHomeFrameTall: {                        // Example: Water Goal Frame, Home
        height: '100%',
        width: '100%',
        backgroundColor: '#1F2938',
        paddingVertical: 15,
        paddingHorizontal: 15,
        flex: 1,
        borderRadius: 8,
        alignContent: 'center',
        paddingBottom: 85,
    },
    frameTitle: {
        color: '#F2F4F3',
        fontSize: 20,
        paddingVertical: 10,
        fontFamily: 'Inter_600SemiBold',
        textAlign: 'center',
    },
    frameContent: {
        alignItems: 'center',
        height: '100%',
        width: '100%',
        flex: 1, 
        flexDirection: 'column'
    }
})