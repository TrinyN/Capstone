// This file contains all of the large amounts of data that
// can be found within the tracker page. Most notably is the
// data that is found within the food, water, and exercise
// lists.

// ***MAY BE REPLACED BY DATABASE FUNCTIONALITY IN THE FUTURE***

// Should there be a file for each tracker zoom level?
// Or should it all be included here?
import { useState, useEffect, useRef } from "react";
import { getTrackerDayRef } from "./getTrackerDayRef";
import auth from '@react-native-firebase/auth';

export const useTrackerData = (date) => {
    // **FOOD DATA**
    const [foodList, setFoodList] = useState([
        { title: 'Breakfast', data: [] },
        { title: 'Lunch', data: [] },
        { title: 'Dinner', data: [] },
        { title: 'Snacks', data: [] }
    ]);
    const [totalCalsEaten, setTotalCalsEaten] = useState("0");
    const [totalCarbEaten, setTotalCarbEaten] = useState("0");
    const [totalProteinEaten, setTotalProteinEaten] = useState("0");
    const [totalFatEaten, setTotalFatEaten] = useState("0");

    // **EXERCISE DATA**
    const [exerciseList, setExerciseList] = useState([]);
    const [totalCalsBurned, setTotalCalsBurned] = useState("0");

    // **WATER, NOTES, STAR RATING**
    const [water, setWater] = useState(0);
    const [notes, setNotes] = useState("");
    const [stars, setStars] = useState(0);

    const userID = auth().currentUser?.uid || null;
    
    // Store references to the unsubscribe functions
    const unsubscribeFoodRef = useRef(() => {});
    const unsubscribeExerciseRef = useRef(() => {});
    const unsubscribeDocRef = useRef(() => {});

    useEffect(() => {
        if (!userID) return;

        const trackerDayRef = getTrackerDayRef(date);
        let isMounted = true;

        // Unsubscribe from previous listeners before creating new ones
        unsubscribeFoodRef.current?.();
        unsubscribeExerciseRef.current?.();
        unsubscribeDocRef.current?.();

        // Set up listeners for sub-collections (Food, Exercise) and main document (Water, Notes, Stars)
        const foodListener = trackerDayRef.collection("Food").orderBy('foodName', 'asc');
        const exerciseListener = trackerDayRef.collection("Exercise").orderBy('exerciseName', 'asc');

        unsubscribeFoodRef.current = foodListener.onSnapshot(
            (querySnapshot) => {
                if (!isMounted) return;

                if (querySnapshot.empty) {
                    setFoodList([
                        { title: 'Breakfast', data: [] },
                        { title: 'Lunch', data: [] },
                        { title: 'Dinner', data: [] },
                        { title: 'Snacks', data: [] }
                    ]);
                    setTotalCalsEaten("0");
                    setTotalCarbEaten("0");
                    setTotalProteinEaten("0");
                    setTotalFatEaten("0");
                    return;
                }

                const newFoodData = [];
                let totalEaten = 0;
                let totalCarb = 0;
                let totalProtein = 0;
                let totalFat = 0;

                querySnapshot.forEach((doc) => {
                    const data = doc.data();

                    totalEaten += Number(data.calPerSvg * data.svgEaten);
                    totalCarb += Number(data.carb);
                    totalProtein += Number(data.protein);
                    totalFat += Number(data.fat);

                    newFoodData.push({
                        foodName: data.foodName || '—',
                        calPerSvg: data.calPerSvg || 0,
                        svgEaten: data.svgEaten || 0,
                        timeFrame: data.timeFrame || '—'
                    });
                });

                setFoodList((prevFoodList) => {
                    const updatedList = prevFoodList.map((item) => {
                        const matchingFoods = newFoodData
                            .filter(food => food.timeFrame === item.title)
                            .map(food => ({
                                foodName: food.foodName,
                                calPerSvg: food.calPerSvg,
                                svgEaten: food.svgEaten,
                                timeFrame: food.timeFrame
                            }));
                        return {
                            ...item,
                            data: [...matchingFoods],
                        };
                    });
                    return updatedList;
                });

                setTotalCalsEaten(totalEaten.toString());
                setTotalCarbEaten(totalCarb.toString());
                setTotalProteinEaten(totalProtein.toString());
                setTotalFatEaten(totalFat.toString());
            }
        );

        unsubscribeExerciseRef.current = exerciseListener.onSnapshot(
            (querySnapshot) => {
                if (!isMounted) return;

                if (querySnapshot.empty) {
                    setExerciseList([]);
                    setTotalCalsBurned("0");
                    return;
                }

                const exercises = [];
                let calsBurned = 0;

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    calsBurned += Number(data.calsBurned);
                    exercises.push({
                        exercise: data.exerciseName || '—',
                        reps: `${data.duration} ${data.durationUnit || ''}`,
                        kCal: `-${data.calsBurned || 0}`
                    });
                });

                setExerciseList(exercises);
                setTotalCalsBurned(calsBurned.toString());
            }
        );

        unsubscribeDocRef.current = trackerDayRef.onSnapshot(
            (docSnapshot) => {
                if (!isMounted) return;
                const data = docSnapshot.data();
                setWater(data?.water || 0);
                setNotes(data?.notes || "");
                setStars(data?.rating || 0);
            }
        );

        return () => {
            isMounted = false;
            unsubscribeFoodRef.current?.();
            unsubscribeExerciseRef.current?.();
            unsubscribeDocRef.current?.();
        };
    }, [userID, date]);

    return { 
        foodList, 
        totalCalsEaten, 
        totalCarbEaten, 
        totalProteinEaten, 
        totalFatEaten, 
        exerciseList, 
        totalCalsBurned, 
        water, 
        notes, 
        stars 
    };
};



// export const useFoodData = (date) => {
//     let isMounted = true; // Track if component is still mounted
//     const [times, setTimes] = useState([
//         { label: 'Breakfast', value: 'Breakfast' },
//         { label: 'Lunch', value: 'Lunch' },
//         { label: 'Dinner', value: 'Dinner' },
//         { label: 'Snacks', value: 'Snacks' }
//     ])

//     const emptyFoodList = [
//         { title: 'Breakfast', data: [] },     // REMOVING key just changes warning, not get rid of it
//         { title: 'Lunch', data: [] },
//         { title: 'Dinner', data: [] },
//         { title: 'Snacks', data: [] }
//     ]

//     const [foodList, setFoodList] = useState(emptyFoodList);

//     const [totalCalsEaten, setTotalCalsEaten] = useState("0");
//     const [totalCarbEaten, setTotalCarbEaten] = useState("0");
//     const [totalProteinEaten, setTotalProteinEaten] = useState("0");
//     const [totalFatEaten, setTotalFatEaten] = useState("0");


//     const userID = auth().currentUser?.uid || null;

//     useEffect(() => {
//         // look into await?
//         const trackerDayRef = getTrackerDayRef(date);

//         // Set up the Firestore listener
//         const subscriber = trackerDayRef
//             .collection("Food")
//             .orderBy('foodName', 'asc')
//             .onSnapshot(
//                 (querySnapshot) => {

//                     if (querySnapshot.empty) {
//                         setFoodList(emptyFoodList)
//                     }
//                     else {

//                         // A list to store all of the foods (sorted later)
//                         const newFoodData = [];
//                         let totalEaten = 0;
//                         let totalCarb = 0;
//                         let totalProtein = 0;
//                         let totalFat = 0;

//                         // For each for all items in document
//                         querySnapshot.forEach((doc) => {
//                             // The data is the data of the document within firebase
//                             const data = doc.data();

//                             totalEaten += Number(data.calPerSvg * data.svgEaten)
//                             totalCarb += Number(data.carb)
//                             totalProtein += Number(data.protein)
//                             totalFat += Number(data.fat)

//                             // Push the fields to be used and filled, empty or not
//                             newFoodData.push({
//                                 foodName: data.foodName || '—',
//                                 calPerSvg: data.calPerSvg || 0,
//                                 svgEaten: data.svgEaten || 0,
//                                 // carb: data.carb || 0, // DONT NEED???
//                                 // fat: data.fat || 0,
//                                 // protein: data.protein || 0,
//                                 timeFrame: data.timeFrame || '—'
//                             });
//                             // Set the foods to be within the foodSection
//                             setFoodList((prevFoodList) => {
//                                 // Copying the old food section list
//                                 const updatedList = prevFoodList.map((item) => {
//                                     const matchingFoods = newFoodData                   // Based on the timeFrame, add foods to database
//                                         .filter(food => food.timeFrame === item.title)
//                                         .map(food => ({
//                                             foodName: food.foodName,
//                                             calPerSvg: food.calPerSvg,
//                                             svgEaten: food.svgEaten,
//                                             timeFrame: food.timeFrame            // may cause issues?
//                                         }));
//                                     return {
//                                         ...item,
//                                         data: [...matchingFoods],
//                                     }
//                                 });
//                                 return updatedList;
//                             });
//                         });
//                         setTotalCalsEaten(totalEaten.toString())
//                         setTotalCarbEaten(totalCarb.toString())
//                         setTotalProteinEaten(totalProtein.toString())
//                         setTotalFatEaten(totalFat.toString())

//                     }
//                     (error) => {
//                         if (isMounted) alert('Error fetching Food data: ' + error.message);
//                     }
//                 }
//             );
//         // Cleanup function to unsubscribe from the listener when the component unmounts
//         return () => {
//             isMounted = false; // Mark the component as unmounted
//             subscriber();
//         }
//     }, [userID, date]);

//     return { setTimes, times, foodList, totalCalsEaten, totalCarbEaten, totalProteinEaten, totalFatEaten }
// };

// export const useExerciseData = (date) => {
//     let isMounted = true; // Track if component is still mounted

//     const [exerciseList, setExerciseList] = useState([
//         { exercise: '', reps: '', kCal: 0 },
//         { exercise: '', reps: '', kCal: 0 },
//     ]);
//     const [totalCalsBurned, setTotalCalsBurned] = useState("0")

//     useEffect(() => {
//         const trackerDayRef = getTrackerDayRef(date);

//         // Set up the Firestore listener
//         const subscriber = trackerDayRef
//             .collection("Exercise")
//             .orderBy('exerciseName', 'asc')
//             .onSnapshot(
//                 (querySnapshot) => {
//                     if (!isMounted) return; // Ignore if component is unmounted

//                     const exercises = [];
//                     let calsBurned = 0;
//                     querySnapshot.forEach((doc) => {
//                         const data = doc.data();
//                         calsBurned += Number(data.calsBurned)
//                         exercises.push({
//                             exercise: data.exerciseName || '—',
//                             reps: data.duration + " " + data.durationUnit || '—',
//                             kCal: "-" + data.calsBurned || 0
//                         });
//                     });
//                     setExerciseList(exercises);
//                     setTotalCalsBurned(calsBurned)
//                 },
//                 (error) => {
//                     if (isMounted) alert("Error Fetching Exercise Data: " + error.message);
//                 }
//             );

//         // Cleanup function to unsubscribe from the listener when the component unmounts
//         return () => {
//             isMounted = false; // Mark the component as unmounted
//             subscriber();
//         }
//     }, [userID, date]);

//     return { exerciseList, totalCalsBurned }
// };

// export const useWaterAndNotesData = (date) => {
//     const [water, setWater] = useState(0);
//     const [notes, setNotes] = useState("");
//     const [stars, setStars] = useState(0);
//     useEffect(() => {
//         const trackerDayRef = getTrackerDayRef(date);

//         // Set up the Firestore listener
//         const subscriber = trackerDayRef.onSnapshot(
//             (docSnapshot) => {
//                 const data = docSnapshot.data();
//                 setWater(data.water || 0);
//                 setNotes(data.notes || "");
//                 setStars(data.rating || 0);
//             },
//             (error) => {
//                 alert("Error Getting Data: " + error.message);
//             }
//         );

//         // Cleanup function to unsubscribe from the listener when the component unmounts
//         return () => subscriber();
//     }, [userID, date]);

//     return { water, notes, stars }
// };

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