// // This file is used to store the data for the tracker-week screen.
// // ***Will be implemented to handle real data in the future.***

// import { useEffect, useState } from "react";
// import { useTrackerData } from "./trackerData";

// // Can goal color be handled within this data file? It may
// // keep bloat code out of the trackerWeek screen

// export const useDayListData = (day) => {
//     // Sample data for days of the week
//     const [dayList, setDayList] = [
//         { title: 'Sun.', data: ['0 - 0'], goal: ['Balance'], goalColor: ['#E65148'] },
//         { title: 'Mon.', data: ['0 - 0'], goal: ['Balance'], goalColor: ['#80FF72'] },
//         { title: 'Tues.', data: ['0 - 0'], goal: ['Balance'], goalColor: ['#E65148'] },
//         { title: 'Wed.', data: ['0 - 0'], goal: ['Balance'], goalColor: ['#80FF72'] },
//         { title: 'Thurs.', data: ['0 - 0'], goal: ['Balance'], goalColor: ['#80FF72'] },
//         { title: 'Fri.', data: ['0 - 0'], goal: ['Balance'], goalColor: ['#80FF72'] },
//         { title: 'Sat.', data: ['2500 - 500'], goal: ['Surplus'], goalColor: ['#80FF72'] },
//     ];
//     useEffect(() => {

//         const date = new Date(day); // Convert the input day string to a Date object
//         const dayOfWeek = date.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
//         const sunday = new Date(date); // clone current date
//         sunday.setDate(date.getDate() - dayOfWeek); // Set to last Sunday
//         const tempDate = new Date(sunday)
//         const fetchData = async () => {
//             for (let i = 0; i < 7; i++) {
//                 tempDate.setDate(sunday.getDate() + i); // change to next day
//                 // Get the data for the current date
//                 const { totalCalsBurned, totalCalsEaten } = await useTrackerData(tempDate);
//                 console.log(tempDate)
//                 // Determine the title for the day (e.g., 'Sun.', 'Mon.', etc.)
//                 const title = tempDate.toLocaleDateString('en-US', { weekday: 'short' });

//                 // Determine the goal and color (example logic, you can adjust this)
//                 const netCals = totalCalsEaten - totalCalsBurned;
//                 let goal = 'Balance';
//                 let goalColor = '#80FF72'; // Default color for balance
//                 if (netCals > 300) {
//                     goal = 'Surplus';
//                     goalColor = '#E65148';
//                 } else if (netCals < -300) {
//                     goal = 'Deficit';
//                     goalColor = '#E65148';
//                 }

//                 // Push the data for the current day to the dayList
//                 dayList.push({
//                     title,
//                     data: [totalCalsEaten + ' - ' + totalCalsBurned],
//                     goal: [goal],
//                     goalColor: [goalColor],
//                 });
//             }
//         }
//         fetchData()

//     }, [day])

//     return {
//         dayList,
//     }
// }

import { useTrackerData } from "./trackerData";
import { useState, useEffect, useRef } from "react";
import { getTrackerDayRef } from "./getTrackerDayRef";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


// get sunday and saturday id
// query tracker starting with id of sunday, ending with id of saturday
// get data from each and accumulate total
// put total in dayList data, finish making dayList
// return dayList for tracker to use

export const useDayListData = (day) => {
    const [dayList, setDayList] = useState([
        { title: 'Sun.', data: ['0 - 0'], goal: ['Surplus'], goalColor: ['#E65148'] },
        { title: 'Mon.', data: ['0 - 0'], goal: ['Balance'], goalColor: ['#80FF72'] },
        { title: 'Tues.', data: ['0 - 0'], goal: ['Deficit'], goalColor: ['#E65148'] },
        { title: 'Wed.', data: ['0 - 0'], goal: ['Balance'], goalColor: ['#80FF72'] },
        { title: 'Thurs.', data: ['0 - 0'], goal: ['Balance'], goalColor: ['#80FF72'] },
        { title: 'Fri.', data: ['0 - 0'], goal: ['Balance'], goalColor: ['#80FF72'] },
        { title: 'Sat.', data: ['default - default'], goal: ['Balance'], goalColor: ['#80FF72'] },
    ]);

    const [totalCalsEaten, setTotalCalsEaten] = useState("0");

    const [totalCalsBurned, setTotalCalsBurned] = useState("0");

    const [avgWater, setAvgWater] = useState(0);
    const [avgWeight, setAvgWeight] = useState(0);

    const userID = auth().currentUser?.uid || null;

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        fetchWeekData()
    }, [userID, day]);

    const fetchWeekData = async () => {
        if (!userID) return;
        const date = new Date(day) // convert string to Date object
        const dayOfWeek = date.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
        // Start from the previous Sunday
        const sunday = new Date(date); // clone current date
        sunday.setDate(date.getDate() - dayOfWeek); // Set to last Sunday
        const saturday = new Date(sunday)
        saturday.setDate(sunday.getDate() + 6); // Set to saturday

        await firestore()
            .collection('Users')
            .doc(userID)
            .collection('Tracker')
            .orderBy(firestore.FieldPath.documentId()) // Order by document ID
            .startAt(formatDate(sunday)) // Start from Sunday (inclusive)
            .endAt(formatDate(saturday)) // End at Saturday (inclusive)
            .get()
            .then(async (querySnapshot) => {
                let waterTotal = 0;
                let weightTotal = 0;
                let count = 0; // Keeps track of how many different weights there are
                let weekDocs = []; // To store tracker data

                // Iterate over each Tracker document
                for (const doc of querySnapshot.docs) {
                    let totalCalsEaten = 0;
                    let totalCalsBurned = 0;
                    const data = doc.data();

                    // Calculate total water
                    const waterData = Number(data.water) || 0;
                    waterTotal += waterData;

                    // Calculate weight and count unique entries
                    if (data?.weight !== undefined) {
                        count++;
                        const weightData = Number(data.weight);
                        weightTotal += weightData;
                    }

                    // Fetch nested Food data and calculate total calories eaten
                    const foodSnapshot = await doc.ref.collection("Food").get();
                    foodSnapshot.forEach((foodDoc) => {
                        const foodData = foodDoc.data();
                        totalCalsEaten += Number(foodData.calPerSvg * foodData.svgEaten || 0);
                    });

                    // Fetch nested Exercise data and calculate total calories burned
                    const exerciseSnapshot = await doc.ref.collection("Exercise").get();
                    exerciseSnapshot.forEach((exerciseDoc) => {
                        const exerciseData = exerciseDoc.data();
                        totalCalsBurned += Number(exerciseData.calsBurned || 0);
                    });

                    console.log(totalCalsBurned)

                    // add total cals eaten and burned into data array
                    // weekDocs.push();
                }

                // Log results
                console.log({
                    waterTotal,
                    weightTotal,
                    averageWeight: (weightTotal / count) || 0,
                    totalCalsEaten,
                    totalCalsBurned,
                    weekDocs,
                });
                setAvgWater(waterTotal / 7)
                setAvgWeight(weightTotal / count)
                setTotalCalsBurned(totalCalsBurned)
                setTotalCalsEaten(totalCalsEaten)

            })
            .catch((error) => {
                console.error("Error fetching weekly tracker data: ", error);
            });
    }

    return {
        totalCalsEaten,
        totalCalsBurned,
        avgWater,
        avgWeight
    };
};
