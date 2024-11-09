// This file contains all of the large amounts of data that
// can be found within the tracker page. Most notably is the
// data that is found within the food, water, and exercise
// lists.

// ***MAY BE REPLACED BY DATABASE FUNCTIONALITY IN THE FUTURE***

// Should there be a file for each tracker zoom level?
// Or should it all be included here?

import { useState, useEffect } from "react";
import { getTrackerDayRef } from "./getTrackerDayRef";
import { collection, getDocs } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';


export const useFoodData = () => {
    // Sample data for Breakfast, Lunch, Dinner, and Snacks
    const [foodSections, setFoodSections] = useState([
        {
            title: 'Breakfast',
            data: [
                { title: 'Eggs', count: '2', kCal: '193' },
                { title: 'Bacon', count: '2', kCal: '100' },
                { title: 'Toast', count: '1', kCal: '80' }
            ],
            key: 'breakfast'
        },
        {
            title: 'Lunch',
            data: [
                { title: 'Chicken Salad', count: '1', kCal: '350' },
                { title: 'Rice', count: '1', kCal: '200' }
            ],
            key: 'lunch'
        },
        {
            title: 'Dinner',
            data: [
                { title: 'Steak', count: '1', kCal: '500' },
                { title: 'Mashed Potatoes', count: '2', kCal: '150' }
            ],
            key: 'dinner'
        },
        {
            title: 'Snacks',
            data: [
                { title: 'Cheetos', count: '3', kCal: '300' },
                { title: 'Doritos', count: '4', kCal: '290' }
            ],
            key: 'snacks'
        }
    ]);

    return {
        foodSections,
        setFoodSections
    }
}

export const useExerciseData = () => {
    // Sample exercise data
    const [exerciseList, setExerciseList] = useState([
        { exercise: '', reps: '', kCal: 0 },
        { exercise: '', reps: '', kCal: 0 },
    ]);
    const getUserData = async () => {
        try {
            const trackerDayRef = getTrackerDayRef();
            const querySnapshot = await trackerDayRef.collection("Exercise").orderBy('exerciseName', 'desc').get()
            const exercises = [];
            querySnapshot.forEach(doc => {
                const data = doc.data();
                exercises.push({
                    exercise: data.exerciseName || '',
                    reps: data.duration + " " + data.durationUnit || '',
                    kCal: "-" + data.calsBurned || 0
                });
            });

            setExerciseList(exercises);
        } catch (e) {
            alert("Error Getting Water Data: ", e.message)
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    return {
        exerciseList,
        setExerciseList
    }
}

// only gets water data from current day, will have to change later
export const useWaterData = async () => {
    try {
        const trackerDayRef = getTrackerDayRef();
        const docSnapshot = await trackerDayRef.get();
        const waterValue = docSnapshot.data().water;
        return waterValue
    } catch (e) {
        alert("Error Getting Water Data: ", e.message)
    }
}

// only gets current date will have to change later
export const getDate = () => {
    try {
        const trackerDayRef = getTrackerDayRef();
        const dateString = trackerDayRef.id // get ID to get today's date as a string
        const [month, day, year] = dateString.split('-');
        const dateObject = new Date(year, month - 1, day); // convert string to Date
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const formattedDate = `${daysOfWeek[dateObject.getDay()] + " "}${(dateObject.getMonth() + 1).toString()}/${dateObject.getDate().toString()}`;
        return formattedDate
    } catch (e) {
        alert("Error Getting Date: ", e.message)
    }
}