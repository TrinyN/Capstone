import Feather from "react-native-vector-icons/Feather";
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native'
import React from 'react'
import { router } from 'expo-router';


// TODO: need to implement handle press later, quick track, open add pop up, notes add notes pop up
{/* TODO: Add popup for quick tracker */ }
const HomeFrame = ({
    title,
    handlePress
}) => {
    let marginBottom
    let icon
    let style = homeFrameStyle.viewHomeFrameNormal // default style

    if (title == "Quick Track") {
        marginBottom = 20
        icon = 'plus-circle'
    }
    else if (title == "Notes") {
        icon = 'edit-3'
    }
    else {
        style = homeFrameStyle.viewHomeFrameTall
    }

    return (
        // {/* Quick Track Frame */ }
        < View style={[style, { marginBottom }]} >

            {/* Touchable Opacity to make entire frame a button */}
            <TouchableOpacity
                style={[homeFrameStyle.frameContent, {flex: 1, flexDirection: 'column'}]}
                onPress={() => router.push('/tracker')}>
                <Text style={homeFrameStyle.frameTextWhite}>
                    {title}
                </Text>

                {title == 'Staying Hydrated?' ? (
                    // {/* WARNING: May have to change bottle to be exact size to prevent issues with it changing sizes based on screen */}
                    // {/* TODO: Add calculation of water progress */}
                    // {/* View Containing Water Bottle and Water Progress */}

                    // {/* <View style={{flex: 1, flexDirection: 'column'}}> */}
                    // {/* <LiquidGauge
                    //         config={{
                    //         circleColor: '#0E1116',
                    //         textSize: 0.5,
                    //         textColor: 'transparent',
                    //         waveTextColor: 'transparent',
                    //         waveColor: '#4D79FF',
                    //         circleThickness: 0,
                    //         textVertPosition: 0.5,
                    //         waveAnimateTime: 1000,
                    //         }}
                    //         // TODO: Reminder: 90 will be max value; adjust calculations accordingly.
                    //         maxValue={90}
                    //         value={90} // Doesnt look good at 100%, 90 looks best for max value
                    //         width={150}
                    //     /> */}

                    <Image
                        source={require('../../../assets/images/water-bottle-1.png')}
                        style={[homeFrameStyle.frameContent, {resizeMode: 'contain', position: 'relative'}]}
                    />
                ) : (
                    // {/* How to fill pruple with dark plus (~Figma)??? */}
                    // {/* Issue: SVG (including stroke and fill) no long supported for feather */}
                    <Feather name={icon}
                        size={55}
                        color={'#CB9CF2'}
                    />
                )}
            </TouchableOpacity>
        </View >
    )
}

export default HomeFrame

const homeFrameStyle = StyleSheet.create({
    // Example: Quick Add Frame, Home
    viewHomeFrameNormal: {
        height: '100%',
        width: '100%',
        backgroundColor: '#1F2938',
        paddingVertical: 20,
        flex: 1,
        borderRadius: 8,
    },
    // Example: Water Goal Frame, Home
    viewHomeFrameTall: {
        height: '100%',
        width: '100%',
        backgroundColor: '#1F2938',
        paddingVertical: 10,
        paddingHorizontal: 15,
        flex: 1,
        borderRadius: 8,
        alignContent: 'center',
        paddingBottom: 85,
    },
    frameTextWhite: {
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
    }
})