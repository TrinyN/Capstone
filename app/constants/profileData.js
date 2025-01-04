// This file contains the large constants and data sets that
// can be found within the profile page.
// ***MAY CONTAIN SAMPLE DATA THAT WILL BE REMOVED LATER***

import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect } from 'react';
import { useSexOptions, useDietPlanOptions, useWeightGoalOptions } from './dropdownOptions';

export const userDataItems = () => {
    // gets options from dropdownOptions constant
    const { sex } = useSexOptions();
    const { dietPlan } = useDietPlanOptions();
    const { weightGoal } = useWeightGoalOptions();

    const [goal, setGoal] = useState("");

    // useState that contains non changing values
    const [userInfo, setUserInfo] = useState([
        { title: 'Email', value: '', type: '', options: [] },
        { title: 'Name', value: '', type: 'text', options: [] },
        { title: 'Gender', value: '', type: 'dropdown', options: sex.map(item => item.value) }, // gets array of dropdownoptions
        { title: 'Date of Birth', value: '', type: 'date', options: [] },
        { title: 'Height', value: '', type: 'text', options: [] },
        { title: 'Weight', value: '', type: 'text', options: [] },
        { title: 'Caloric Goal', value: '', type: 'text', options: [] },
        { title: 'Water Goal', value: '', type: 'text', options: [] },
        { title: 'Weight Goal', value: '', type: 'dropdown', options: weightGoal.map(item => item.value) },
        { title: 'Diet Plan', value: '', type: 'dropdown', options: dietPlan.map(item => item.value) },
        { title: 'Macro Ratio Goal', value: '', type: 'text', options: [] },
    ]);

    const userID = auth().currentUser.uid;
    const userDataMapping = {
        'Email': 'email',
        'Name': 'username',
        'Gender': 'sex',
        'Date of Birth': 'dateOfBirth',
        'Height': 'height',
        'Weight': 'weight',
        'Caloric Goal': 'calGoal',
        'Water Goal': 'waterGoal',
        'Weight Goal': 'weightGoal',
        'Diet Plan': 'dietPlan',
        'Macro Ratio Goal': 'macroGoal',
    };

    useEffect(() => {
        // Set up the Firestore listener
        const subscriber = firestore().collection('Users').doc(userID).onSnapshot(
            (docSnapshot) => {
                const userData = docSnapshot.data();

                let tempGoal = userData?.weightGoal
                setGoal(tempGoal)

                const updatedUserInfo = userInfo.map(item => {
                    const value = userData?.[userDataMapping[item.title]] || "—";

                    return {
                        ...item,
                        value: item.title === 'Height' ? `${value} cm` :
                            item.title === 'Weight' ? `${value} lbs` :
                                item.title === 'Water Goal' ? `${value} cups` :
                                    item.title === 'Caloric Goal' ? `${value} per day` :
                                        value
                    };
                });

                setUserInfo(updatedUserInfo);
            },
            (error) => {
                alert('Error fetching user data: ' + error.message);
            }
        );

        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => subscriber();
    }, [userID]);

    return {
        userInfo,
        setUserInfo, 
        goal
    }
};

