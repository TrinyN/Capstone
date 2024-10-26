import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { React, useState } from 'react';
import { LiquidGauge } from 'react-native-liquid-gauge';

const WaterGauge = ({
    progress
}) => {

    const { width } = Dimensions.get('window');
    const wth = (width * 0.35)
    const ht = (wth * 1.5)

    return (
        <View style={localStyle.container}>
            <View 
            style={localStyle.waterContainer}
            >
                <LiquidGauge
                    config={{
                    circleColor: 'transparent',
                    textColor: 'transparent',
                    waveTextColor: 'transparent',
                    waveColor: '#4D79FF',
                    circleThickness: 0,
                    textVertPosition: 0.5,
                    waveAnimateTime: 1000,
                    }}
                    // TODO: Reminder: 90 will be max value; adjust calculations accordingly.
                    maxValue={90}
                    value={progress} // Doesnt look good at 100%, 90 looks best for max value
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