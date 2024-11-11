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
import auth from '@react-native-firebase/auth';
const userID = auth().currentUser ? auth().currentUser.uid : null;


export const useFoodData = () => {

    const [foodSections, setFoodSections] = useState([
        { food:'', servings:0, kCal:0, carbs:0, fats:0, protein:0, time:''},
        { food:'', servings:0, kCal:0, carbs:0, fats:0, protein:0, time:''},
        { food:'', servings:0, kCal:0, carbs:0, fats:0, protein:0, time:''}

        // Different setting mechanism
        // breakfast = [],
        // lunch = [],
        // dinner = [],
        // snacks = [],
    ]);

    useEffect(() => {
        // look into await?
        const trackerDayRef = getTrackerDayRef();

        // Set up the Firestore listener
        const subscriber = trackerDayRef
            .collection("Food")
            .orderBy('foodName', 'desc')
            .onSnapshot(
                (querySnapshot) => {
                    const foods = [];
                    // const times = {
                    //     breakfast: [],
                    //     lunch: [],
                    //     dinner: [],
                    //     snacks: [],
                    // }

                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        // const timeFrame = data.timeFrame?.toLowerCase();       // Needed to compare and place in proper time list

                        foods.push({
                            food: data.foodName || '-',
                            servings: data.servings || 0,
                            kCal: data.cals || 0,
                            carbs: data.carbs || 0,
                            fats: data.fats || 0,
                            protein: data.protein || 0,
                            time: data.timeFrame || '-'
                        });

                        // If statement to push based on the time of day
                        // if (times[timeFrame]) {
                        //     times[timeFrame].push({
                        //         exercise: data.foodName || '-',
                        //         servings: data.servings || 0,
                        //         kCal: data.cals || 0,
                        //         carbs: data.carbs || 0,
                        //         fats: data.fats || 0,
                        //         protein: data.protein || 0,
                        //         time: data.timeFrame || '-'
                        //     });
                        // }
                    });
                    setFoodSections(foods); 
                    // setFoodSections(times);                                     // Used to return foods divided by meal time
                },
                (error) => {
                    alert('Error fetching Food data: ' + error.message);
                }
            );
        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => subscriber();
    }, [userID]);

    return foodSections
};

export const useExerciseData = () => {
    const [exerciseList, setExerciseList] = useState([
        { exercise: '', reps: '', kCal: 0 },
        { exercise: '', reps: '', kCal: 0 },
    ]);

    useEffect(() => {
        const trackerDayRef = getTrackerDayRef();

        // Set up the Firestore listener
        const subscriber = trackerDayRef
            .collection("Exercise")
            .orderBy('exerciseName', 'desc')
            .onSnapshot(
                (querySnapshot) => {
                    const exercises = [];
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        exercises.push({
                            exercise: data.exerciseName || '—',
                            reps: data.duration + " " + data.durationUnit || '—',
                            kCal: "-" + data.calsBurned || 0
                        });
                    });
                    setExerciseList(exercises);
                },
                (error) => {
                    alert("Error Fetching Exercise Data: " + error.message);
                }
            );

        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => subscriber();
    }, [userID]);

    return exerciseList
};

// only gets water data from current day, will have to change later
export const useWaterData = () => {
    const [water, setWater] = useState(0);

    useEffect(() => {
        const trackerDayRef = getTrackerDayRef();

        // Set up the Firestore listener
        const subscriber = trackerDayRef.onSnapshot(
            (docSnapshot) => {
                const data = docSnapshot.data();
                setWater(data.water || 0);
            },
            (error) => {
                alert("Error Getting Water Data: " + error.message);
            }
        );

        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => subscriber();
    }, [userID]);

    return water
};

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