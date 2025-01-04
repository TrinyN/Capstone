// This file is used to fetch the data for the tracker-week screen.

import { useState, useEffect } from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { userDataItems } from "./profileData";

export const useDayListData = (day) => {
    const [dayList, setDayList] = useState([
        { title: 'Sun.', data: ['0 - 0'], goal: ['Balance'], goalColor: '#80FF72' },
        { title: 'Mon.', data: ['0 - 0'], goal: ['Balance'], goalColor: '#80FF72' },
        { title: 'Tues.', data: ['0 - 0'], goal: ['Balance'], goalColor: '#80FF72' },
        { title: 'Wed.', data: ['0 - 0'], goal: ['Balance'], goalColor: '#80FF72' },
        { title: 'Thurs.', data: ['0 - 0'], goal: ['Balance'], goalColor: '#80FF72' },
        { title: 'Fri.', data: ['0 - 0'], goal: ['Balance'], goalColor: '#80FF72' },
        { title: 'Sat.', data: ['0 - 0'], goal: ['Balance'], goalColor: '#80FF72' },
    ]);

    const [avgWater, setAvgWater] = useState(0);
    const [avgWeight, setAvgWeight] = useState(0);

    const userID = auth().currentUser?.uid || null;

    const updateDayList = (updatedData) => {
        setDayList(updatedData); // Update the dayList with the modified data
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
        return `${year}-${month}-${day}`;
    };
    const { goal } = userDataItems();

    useEffect(() => {
        fetchWeekData();
    }, [userID, day]);

    const fetchWeekData = async () => {
        if (!userID) return;
        const date = new Date(day); // convert string to Date object
        const dayOfWeek = date.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
        // Start from the previous Sunday
        const sunday = new Date(date); // clone current date
        sunday.setDate(date.getDate() - dayOfWeek); // Set to last Sunday
        const saturday = new Date(sunday);
        saturday.setDate(sunday.getDate() + 6); // Set to Saturday

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

                const updatedDayList = [...dayList]; // Make a copy of the default dayList
                let dayIndex = 0; // keeps track of which day of the week

                // Iterate over each Tracker document
                for (const doc of querySnapshot.docs) {
                    let totalCalsEaten = 0;
                    let totalCalsBurned = 0;
                    const data = doc.data();

                    // Calculate total water
                    const waterData = Number(data?.water || 0);
                    waterTotal += waterData;

                    // Calculate weight and count unique entries
                    if (data?.weight !== undefined) {
                        count++;
                        const weightData = Number(data?.weight || 0);
                        weightTotal += weightData;
                    }

                    // Fetch nested Food data and calculate total calories eaten
                    const foodSnapshot = await doc.ref.collection("Food").get();
                    foodSnapshot.forEach((foodDoc) => {
                        const foodData = foodDoc.data();
                        totalCalsEaten += Number(Number(foodData?.calPerSvg || 0) * Number(foodData?.svgEaten || 0));
                    });

                    // Fetch nested Exercise data and calculate total calories burned
                    const exerciseSnapshot = await doc.ref.collection("Exercise").get();
                    exerciseSnapshot.forEach((exerciseDoc) => {
                        const exerciseData = exerciseDoc.data();
                        totalCalsBurned += Number(exerciseData.calsBurned || 0);
                    });
                    let weightStatus = Math.abs(totalCalsBurned-totalCalsEaten) <= 100 ? 'Maintain' : (totalCalsBurned-totalCalsEaten) > 0 ? 'Bulk / Gain Weight' : 'Cut / Lose Weight'

                    // Update the corresponding day in the dayList copy
                    updatedDayList[dayIndex] = {
                        ...updatedDayList[dayIndex],
                        data: [`${totalCalsEaten} - ${totalCalsBurned}`],
                        // goal has a 100 tolerance, change if needed
                        goal: [
                            totalCalsEaten - totalCalsBurned > 100 ? 'Surplus' :
                                totalCalsEaten - totalCalsBurned < -100 ? 'Deficit' :
                                    'Balance'
                        ], 
                        // red or green depending on if goal is met (maybe change to 3 diff colors?)
                        goalColor: weightStatus === goal ? "#80FF72" : "#E65148" 
                    };

                    dayIndex++; // Move to the next day in the week

                    if (dayIndex > 6) {
                        break;
                    }
                }

                // Round to 2 decimal places and saves data
                setAvgWater((waterTotal / 7).toFixed(2));
                setAvgWeight((weightTotal / count || 0).toFixed(2));

                // Update the state with the modified dayList after all data is fetched
                updateDayList(updatedDayList);
            })
            .catch((error) => {
                console.error("Error fetching weekly tracker data: ", error);
            });
    };

    return {
        avgWater,
        avgWeight,
        dayList
    };
};
