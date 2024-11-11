// This file contains the large constants and data sets that
// can be found within the profile page.
// ***MAY CONTAIN SAMPLE DATA THAT WILL BE REMOVED LATER***

import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect } from 'react';

// useState that contains non changing values
export const userDataItems = () => {
    const [userInfo, setUserInfo] = useState([
    { title: 'Email', value: '', type: '', options: [] },
    { title: 'Name', value: '', type: 'text', options: [] },
    { title: 'Gender', value: '', type: 'dropdown', options: ['Female', 'Male'] },
    { title: 'Date of Birth', value: '', type: 'date', options: [] },
    { title: 'Height', value: '', type: 'text', options: [] },
    { title: 'Weight', value: '', type: 'text', options: [] },
    { title: 'Caloric Goal', value: '', type: 'text', options: [] },
    { title: 'Water Goal', value: '', type: 'text', options: [] },
    { title: 'Weight Goal', value: '', type: 'dropdown', options: ['Gain', 'Lose', 'Maintain'] },
    { title: 'Diet Plan', value: '', type: 'dropdown', options: ['Keto', 'Vegetarian'] }, // need to add more options
    { title: 'Macro Ratio Goal', value: '', type: 'text', options: [] },
    ]);

    const getUserData = async () => {
        try {
            const userID = auth().currentUser.uid;
            const userDoc = await firestore().collection('Users').doc(userID).get();
            const userData = userDoc.data();

            // TODO need to add gender, dob, weight goal, dietplan
            const userDataMapping = {
                'Email': 'email',
                'Name': 'username',
                'Gender': 'sex',
                'Date of Birth': 'dateOfBirth',
                'Height': 'height',
                'Weight': 'weight',
                'Caloric Goal': 'calGoal',
                'Water Goal': 'waterGoal',
                'Weight Goal': 'userWeightGoal',
                'Diet Plan': 'userDietPlan',
                'Macro Ratio Goal': 'macroGoal',
            };
            const updatedUserInfo = userInfo.map(item => {
                const value = userData[userDataMapping[item.title]] || "—"; // Get the value from userData
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
        } catch (e) {
            alert('Error fetching user data: ' + e.message);
        }
    };
    
    useEffect(() => {
        getUserData();
    }, []);
    
    return {
        userInfo,
        setUserInfo
    }
}