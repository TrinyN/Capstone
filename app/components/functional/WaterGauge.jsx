import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { React, useState } from 'react';
import { LiquidGauge } from 'react-native-liquid-gauge';
import { useTrackerData } from '../../constants/trackerData';
import { userDataItems } from '../../constants/profileData';
import { createIconSetFromFontello } from 'react-native-vector-icons';

// Known issues:
// 1. Water gauge max size looks best at 90%, but text within will also show 90% (want 100%)
// 2. The size of the water gauage is not suited for all screens, being slighly off for larger and smaller ones

const WaterGauge = () => {

    date = new Date() // current date

    // Values found and used for WaterGuage size
    const { width } = Dimensions.get('window');
    const wth = (width * 0.35)
    const ht = (wth * 1.5)

    // Handling user's data to get their water drank and water goal, then set progress value
    const {water} = useTrackerData(date);
    const { userInfo, setUserInfo } = userDataItems();
    let goal = parseInt(userInfo.find(item => item.title === "Water Goal")?.value);

    let progress = Math.round(100*(water/goal));
    if (progress > 90){ progress = 90}                  // Ensure the maximum of 90% of animation (looks best)
    else if (goal = 0) { progess = 70}                  // If they do not have a water goal, just show mid amount

    return (
        <View style={localStyle.container}>
            <View 
            style={localStyle.waterContainer}
            >
                <LiquidGauge
                    config={{
                    circleColor: 'transparent',
                    waveColor: '#4D79FF',
                    circleThickness: 0,
                    waveAnimateTime: 1000,
                    textVertPosition: 0.5,
                    textColor: 'transparent',
                    waveTextColor: 'transparent',
                    // textColor: '#F2F4F3',
                    // waveTextColor: '#F2F4F3',
                    textSize: 0.5,
                    // textSuffix:" c"                  // Only allowed to show percentage...
                    }}
                    value={progress}
                    width={wth*1.15}
                    height={wth*1.15}
                />
            </View>

            <Image
                source={require('../../../assets/images/water-bottle-new.png')}
                style={[localStyle.bottle, {width: wth, height: ht}]}
            />
        </View>
    )
}
export default WaterGauge;

const localStyle = StyleSheet.create({
    container: {
        alignContent:'center',
        alignItems:'center',
        marginVertical:10,
        backgroundColor:'transparent'
    },
    waterContainer:{
        top:50 ,
        backgroundColor:'transparent', 
        width:80,                           // possible issue for sizing between screen sizes
        overflow: 'hidden',
        alignContent:'center',
        alignItems:'center',
        resizeMode:'center',
        borderRadius:20
    },
    bottle: {
        alignContent:'center',
        alignItems: 'center',
        resizeMode: 'contain',
        position: 'absolute',
        flex: 1,
    }
})