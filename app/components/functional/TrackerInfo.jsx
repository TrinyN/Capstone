import { Text, View, TextInput, StyleSheet } from 'react-native';
import Feather from "react-native-vector-icons/Feather";
import React from 'react'

const TrackerInfo = ({
    caloricGoal,
    weight,
    eaten,
    burned,
    bmr
}) => {
    // renders the formula either with the variables or actual values
    const renderFormula = ({ type }) => {
        const values = type === 'formula'
            ? {
                textDecorationLine: 'underline',
                color: '#CB9CF2',
                goalColor: '#80FF72', // 3 diff colors depending on users goals, will need to add later
                eatenValue: 'Eaten',
                burnValue: 'Burned',
                bmrValue: 'BMR',
                overallValue: 'Surplus' // will need to change between surplus, balance, deficit depending on value
            }
            : {
                textDecorationLine: 'none',
                color: '#F2F4F3',
                goalColor: '#F2F4F3',
                eatenValue: eaten,
                burnValue: burned,
                bmrValue: bmr,
                overallValue: eaten - burned - bmr
            };
        const { textDecorationLine, color, goalColor, eatenValue, burnValue, bmrValue, overallValue } = values;

        return (
            <View style={trackerInfoStyle.formulaContainer}>
                {/* Abstract formula to make numbers make sense*/}
                <Text style={[trackerInfoStyle.LeftAlText, { color }]}>
                    ({eatenValue}
                </Text>
                <Text style={[trackerInfoStyle.defaultText,]}> - </Text>
                <Text style={[trackerInfoStyle.defaultText, { color, width: '22%' }]}>
                    {burnValue})
                </Text>
                <Text style={[trackerInfoStyle.defaultText,]}> - </Text>
                <Text style={[trackerInfoStyle.defaultText, { color, width: '19%' }]}>
                    {bmrValue}
                </Text>
                <Text style={[trackerInfoStyle.defaultText]}> = </Text>
                <Text style={[trackerInfoStyle.RightAlText, { textDecorationLine, color: goalColor }]}>
                    {overallValue}
                </Text>
            </View>
        )
    }

    return (
        <View>
            {/* Display Caloric Goal and Weight of User */}
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingVertical: 12, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[trackerInfoStyle.defaultText, { fontSize: 16 }]}>
                        Caloric Goal:
                    </Text>
                    <TextInput style={[trackerInfoStyle.input, { textAlign: 'center', width: 60, marginHorizontal: 5 }]}
                        placeholder={caloricGoal}
                        placeholderTextColor={'#F2F4F3'}
                        editable={false}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text style={[trackerInfoStyle.defaultText, { fontSize: 16 }]}>
                        Weight:
                    </Text>
                    <TextInput style={[trackerInfoStyle.input, { width: 75, paddingHorizontal: 5, textAlign: 'left' }]}

                        placeholder={weight + ' lbs'}
                        placeholderTextColor={'#F2F4F3'}
                    />
                    <Feather pointerEvents="none" name="edit-2" size={14} color="#CB9CF2" style={{ position: 'absolute', paddingRight: 2 }} />
                </View>
            </View>
            {/* Top View to calculate user's calories eaten and burned with a formula visible to them */}
            <View style={{ backgroundColor: '#1F2938', borderRadius: 5 }}>
                {/* Abstract formula to make numbers make sense*/}
                {renderFormula({ type: 'formula' })}

                {/* TODO: Implement retrieval and calculation of calories burned and eaten, placeholder numbers for now */}
                {/* Actual numbers of forumla */}
                {renderFormula({})}

            </View>
        </View>
    )
}

export default TrackerInfo

const trackerInfoStyle = StyleSheet.create({
    defaultText: {
        color: '#F2F4F3',
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        textAlign: 'center',
    },
    LeftAlText: {
        width: '19%',
        textAlign: 'left',
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
    },
    RightAlText: {
        textAlign: 'right',
        width: '21%',
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
    },
    input: {
        backgroundColor: '#1F2938',
        height: 20,
        borderRadius: 5,
        color: '#F2F4F3',
        paddingHorizontal: 5,
        fontSize: 16
    },
    formulaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    }
})