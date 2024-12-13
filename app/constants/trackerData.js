// This file contains all of the large amounts of data that
// can be found within the tracker page. Most notably is the
// data that is found within the food, water, and exercise
// lists.

// ***MAY BE REPLACED BY DATABASE FUNCTIONALITY IN THE FUTURE***

// Should there be a file for each tracker zoom level?
// Or should it all be included here?
import { useState, useEffect } from "react";
import { getTrackerDayRef } from "./getTrackerDayRef";
import auth from '@react-native-firebase/auth';
const userID = auth().currentUser ? auth().currentUser.uid : null;
const currDate = new Date();  // Get current date

export const useFoodData = (date) => {

    const [times, setTimes] = useState([
        { label: 'Breakfast', value: 'Breakfast' },
        { label: 'Lunch', value: 'Lunch' },
        { label: 'Dinner', value: 'Dinner' },
        { label: 'Snacks', value: 'Snacks' }
    ])
    
    const [foodList, setFoodList] = useState([
        // Food formatting
        { title: 'Breakfast', data: []},     // REMOVING key just changes warning, not get rid of it
        { title: 'Lunch', data: []},
        { title: 'Dinner', data: []},
        { title: 'Snacks', data: []}
    ]);

    const userID = auth().currentUser?.uid || null;

    useEffect(() => {
        // look into await?
        const trackerDayRef = getTrackerDayRef(date);

        // Set up the Firestore listener
        const subscriber = trackerDayRef
            .collection("Food")
            .orderBy('foodName', 'asc')
            .onSnapshot(
                (querySnapshot) => {
                    // A list to store all of the foods (sorted later)
                    const newFoodData = [];

                    // For each for all items in document
                    querySnapshot.forEach((doc) => {
                        // The data is the data of the document within firebase
                        const data = doc.data();
                        // Push the fields to be used and filled, empty or not
                        newFoodData.push({
                            foodName: data.foodName || '—',
                            calPerSvg: data.calPerSvg || 0,
                            svgEaten: data.svgEaten || 0,
                            // carb: data.carb || 0, // DONT NEED???
                            // fat: data.fat || 0,
                            // protein: data.protein || 0,
                            timeFrame: data.timeFrame || '—'
                        });
                        // Set the foods to be within the foodSection
                        setFoodList((prevFoodList) => {
                            // Copying the old food section list
                            const updatedList = prevFoodList.map((item) => {
                                const matchingFoods = newFoodData                   // Based on the timeFrame, add foods to database
                                    .filter(food => food.timeFrame === item.title)
                                    .map(food => ({
                                        foodName: food.foodName, 
                                        calPerSvg: food.calPerSvg,
                                        svgEaten:food.svgEaten, 
                                        timeFrame:food.timeFrame            // may cause issues?
                                    }));
                                return {
                                    ...item,
                                    data: [...matchingFoods],
                                }
                            });
                            return updatedList;
                        });
                    });
                },
                (error) => {
                    alert('Error fetching Food data: ' + error.message);
                }
            );
        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => subscriber();
    }, [userID, date]);

    return { setTimes, times, foodList }
};

export const useExerciseData = (date) => {
    const [exerciseList, setExerciseList] = useState([
        { exercise: '', reps: '', kCal: 0 },
        { exercise: '', reps: '', kCal: 0 },
    ]);

    useEffect(() => {
        const trackerDayRef = getTrackerDayRef(date);

        // Set up the Firestore listener
        const subscriber = trackerDayRef
            .collection("Exercise")
            .orderBy('exerciseName', 'asc')
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
    }, [userID, date]);

    return exerciseList
};

export const useWaterData = (date) => {
    const [water, setWater] = useState(0);
    useEffect(() => {
        const trackerDayRef = getTrackerDayRef(date);

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
    }, [userID, date]);

    return water
};

export const getDate = (date) => {
    try {
        const trackerDayRef = getTrackerDayRef(date);
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

export const getNotes = (date) => {
    const [notes, setNotes] = useState("");
    const [stars, setStars] = useState(0);

    useEffect(() => {
        const trackerDayRef = getTrackerDayRef(date);

        // Set up the Firestore listener
        const subscriber = trackerDayRef.onSnapshot(
            (docSnapshot) => {
                const data = docSnapshot.data();
                setNotes(data.notes || "");
                setStars(data.rating || 0);
            },
            (error) => {
                alert("Error Getting Notes: " + error.message);
            }
        );

        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => subscriber();
    }, [userID, date]);

    return {notes, stars}
};