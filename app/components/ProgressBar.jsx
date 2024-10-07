import { Text, View, StyleSheet } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';

const ProgressBar = ({
    title,
    progress,
    total,
}) => {
    let color
    if (title == 'Proteins'){
        color = '#7EE8FA'
    }
    else if (title == 'Carbs'){
        color = '#80FF72'
    }
    else if (title == 'Fats'){
        color = '#FFF07C'
    }
    else if (title == 'Calories'){
        color = '#CB9CF2'
    }

    return (
        <View style={{ flexDirection: 'row' }} >
            <View style = {{flex: 1}}>
            <Text style={[progressStyles.homeProgressLabelText, { color}]} numberOfLines={1}>
                {title}
            </Text>
            </View>
            
            <Progress.Bar
                progress={progress/total}
                color={color}
                unfilledColor={'#0E1116'}
                height={20}
                width={200}
                borderRadius={15}
                style={{ marginBottom: 10, justifyContent: 'center'}}>
                <Text style={[progressStyles.homeProgressBarTextLeft, { position: 'absolute' }]}>
                    {progress}
                </Text>
                <Text style={[progressStyles.homeProgressBarTextRight, { position: 'absolute' }]}>
                    {total}
                </Text>
            </Progress.Bar>
        </View>
    )
}

export default ProgressBar

const progressStyles = StyleSheet.create({
    homeProgressLabelText: {
        color: '#0E1116',
        fontFamily: 'Inter_600SemiBold',
        marginVertical: 3
    }, 
    homeProgressBarTextLeft: {
        color: '#0E1116',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        textAlign: 'left',
        marginHorizontal: 10,
        width: '90%'
    },
    homeProgressBarTextRight: {
        color: '#F2F4F3',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        textAlign: 'right',
        marginHorizontal: 10,
        width: '90%'
    },
})