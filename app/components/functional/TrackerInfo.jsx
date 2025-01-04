import { Text, View, TextInput, StyleSheet } from 'react-native';
import Feather from "react-native-vector-icons/Feather";
import React from 'react'
import { getTrackerDayRef } from '../../constants/getTrackerDayRef';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const TrackerInfo = ({
    caloricGoal,
    weight,
    eaten,
    burned,
    bmr,
    weightGoal,
    date
}) => {

    const saveWeight = async (inputWeight) => {
        try {
            const trackerDayRef = getTrackerDayRef(date);
            trackerDayRef.update({
                weight: parseFloat(inputWeight) // saves weight in database
            })

            // find most recent weight
            const userID = auth().currentUser.uid;  // Get current user's ID
            const userRef = await firestore().collection('Users').doc(userID)
            const allTrackersSnapshot = await userRef.collection('Tracker').get();

            let mostRecentDate = null;
            let mostRecentWeight = null;
            allTrackersSnapshot.forEach(doc => {
                const docDate = doc.id;
                const docData = doc.data();

                if (!docData.weight) return; // if weight doesn't exist, disregard

                const docWeight = docData.weight;
                const [year, month, day] = docDate.split('-');
                const dateObject = new Date(year, month - 1, day); // convert string to Date

                if (!mostRecentDate || dateObject > new Date(mostRecentDate)) {
                    mostRecentDate = docDate;
                    mostRecentWeight = docWeight;
                }
            });

            // save most recent weight to profile
            await userRef.update({
                weight: mostRecentWeight
            });

            alert("Weight Successfully Saved")

        } catch (e) {
            alert('Error Saving Weight: ', e.message)
        }
    }

    const netTotal = eaten - burned - bmr
    let weightStatus = Math.abs(netTotal) <= 100 ? 'Maintain' : netTotal > 0 ? 'Bulk / Gain Weight' : 'Cut / Lose Weight'
    let tolerance = 100 // change if needed allows net cal of 100 and -100 to be considered balanced

    // commented stuff below allows for 3 diff colors, green, red, and yellow. Right now its just red and green idk if I want yellow
    // let idk;
    // if (weightGoal === "Maintain") {
    //     idk = weightStatus === weightGoal ? "#80FF72" : "#FFF07C";  // Green if balance, else yellow
    // } else if (weightGoal === "Bulk / Gain Weight") {
    //     idk = weightStatus === weightGoal ? "#80FF72" : weightStatus === "Cut / Lose Weight" ? "#E65148" : "#FFF07C";
    // } else if (weightGoal === "Cut / Lose Weight") {
    //     idk = weightStatus === weightGoal ? "#80FF72" : weightStatus === "Bulk / Gain Weight" ? "#E65148" : "#FFF07C";
    // }

    // renders the formula either with the variables or actual values
    const renderFormula = ({ type }) => {
        const values = type === 'formula'
            ? {
                textDecorationLine: 'underline',
                color: '#CB9CF2',
                eatenValue: 'Eaten',
                burnValue: 'Burned',
                bmrValue: 'BMR',
                overallValue: Math.abs(netTotal) <= tolerance ? 'Balance' : netTotal > 0 ? 'Surplus' : 'Deficit',
                goalColor: weightStatus === weightGoal ? "#80FF72" : "#E65148"
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
            <View style={localStyle.formulaContainer}>
                {/* Abstract formula to make numbers make sense*/}
                <Text style={[localStyle.LeftAlText, { color }]}>
                    ({eatenValue}
                </Text>
                <Text style={[localStyle.mainText,]}> - </Text>
                <Text style={[localStyle.mainText, { color, width: '22%' }]}>
                    {burnValue})
                </Text>
                <Text style={[localStyle.mainText,]}> - </Text>
                <Text style={[localStyle.mainText, { color, width: '19%' }]}>
                    {bmrValue}
                </Text>
                <Text style={[localStyle.mainText]}> = </Text>
                <Text style={[localStyle.RightAlText, { textDecorationLine, color: goalColor }]}>
                    {overallValue}
                </Text>
            </View>
        )
    }
    return (
        <View>
            {/* Display Caloric Goal and Weight of User */}
            <View style={localStyle.goalView}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[localStyle.mainText, { fontSize: 16 }]}>
                        Caloric Goal:
                    </Text>
                    <TextInput style={[localStyle.input, { textAlign: 'center', width: 60, marginHorizontal: 5 }]}
                        placeholder={caloricGoal}
                        placeholderTextColor={'#F2F4F3'}
                        editable={false}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text style={[localStyle.mainText, { fontSize: 16 }]}>
                        Weight:
                    </Text>
                    <TextInput style={[localStyle.input, { width: 75, marginLeft: 5, textAlign: 'left' }]}
                        placeholder={weight + ' lbs'}
                        placeholderTextColor={'#F2F4F3'}
                        keyboardType='numeric'
                        onSubmitEditing={(event) => saveWeight(event.nativeEvent.text)}
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

const localStyle = StyleSheet.create({
    mainText: {
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
    goalView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 12,
        alignItems: 'center'
    },
    formulaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    }
})