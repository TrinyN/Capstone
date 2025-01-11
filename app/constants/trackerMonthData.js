// File to store the data related to the tracker-week screen.
// Later will be implemented to work alongside databse

import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { getSunSat } from './trackerWeekData';
// import { getTotalCalsPerWeek } from './getTotalCalsPerWeek';
// Implement way for color to change depending on goal/data

export const useWeekListData = (day, dayList) => {

    // Sample week data
    const [weekList, setWeekList] = useState([
        { title: '5/26-6/1', data: ['22,000'], goal: ['Surplus'] },
        { title: '6/2-6/8', data: ['17,500'], goal: ['Balance'] },
        { title: '6/9-6/15', data: ['17,000'], goal: ['Balance'] },
        { title: '6/16-6/22', data: ['21,500'], goal: ['Surplus'] },
        { title: '6/23-6/29', data: ['23,000'], goal: ['Surplus'] },
        { title: '6/30-7/6', data: ['17,000'], goal: ['Balance'] }
    ]);

    // get current month

    // get total cals for each week of that month
    
    // save data in weeklist

    const {accCal} = getTotalCalsPerWeek(day)
    console.log(accCal)
    

    return {
        weekList,
        accCal
    }
}

export const getTotalCalsPerWeek = (day) => {
    // accumator of calories, used in month view for total cals per week
    const [accCal, setAccCal] = useState(0); 

    const userID = auth().currentUser?.uid || null;

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        fetchWeekData();
    }, [userID, day]);

    const fetchWeekData = async () => {
        if (!userID) return;
        
        const {sunday, saturday} = getSunSat(day)

        await firestore()
            .collection('Users')
            .doc(userID)
            .collection('Tracker')
            .orderBy(firestore.FieldPath.documentId()) // Order by document ID
            .startAt(formatDate(sunday)) // Start from Sunday (inclusive)
            .endAt(formatDate(saturday)) // End at Saturday (inclusive)
            .get()
            .then(async (querySnapshot) => {

                let dayIndex = 0; // keeps track of which day of the week

                // Iterate over each Tracker document
                for (const doc of querySnapshot.docs) {
                    let totalCalsEaten = 0;
                
                    // Fetch nested Food data and calculate total calories eaten
                    const foodSnapshot = await doc.ref.collection("Food").get();
                    foodSnapshot.forEach((foodDoc) => {
                        const foodData = foodDoc.data();
                        totalCalsEaten += Number(Number(foodData?.calPerSvg || 0) * Number(foodData?.svgEaten || 0));
                    });
                    
                    // accumulate total cals eaten for entire week (to give to month view)
                    setAccCal(prevAccCal => prevAccCal + Number(totalCalsEaten))

                    dayIndex++; // Move to the next day in the week

                    if (dayIndex > 6) {
                        break;
                    }
                }
            })
            .catch((error) => {
                console.error("Error fetching monthly tracker data: ", error);
            });
    };

    return {
        accCal
    };
};
