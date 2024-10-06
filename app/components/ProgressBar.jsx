import { Text, View } from 'react-native'
import React from 'react'
import styles from '../styles'
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
            <Text style={[styles.homeProgressLabelText, { color, flex: 1 }]}>
                {title}
            </Text>
            <Progress.Bar
                progress={progress/total}
                color={color}
                unfilledColor={'#0E1116'}
                height={20}
                width={200}
                borderRadius={15}
                style={{ marginBottom: 5 }}>
                <Text style={[styles.homeProgressBarTextLeft, { position: 'absolute' }]}>
                    {progress}
                </Text>
                <Text style={[styles.homeProgressBarTextRight, { position: 'absolute' }]}>
                    {total}
                </Text>
            </Progress.Bar>
        </View>
    )
}

export default ProgressBar