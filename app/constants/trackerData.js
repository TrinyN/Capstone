// This file contains all of the large amounts of data that
// can be found within the tracker page. Most notably is the
// data that is found within the food, water, and exercise
// lists.

// ***MAY BE REPLACED BY DATABASE FUNCTIONALITY IN THE FUTURE***

// Should there be a file for each tracker zoom level?
// Or should it all be included here?

import { useState } from "react";

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
        { exercise: 'Running', reps: '10 min', kCal: -30 },
        { exercise: 'Swimming', reps: '30 min', kCal: -50 },
    ]);

    return {
        exerciseList,
        setExerciseList
    }
}

export const useWaterData = () => {
    // Sample water data
    // Test data, will need to start off empty and be saved for each user, 
    //      will only be one number that keeps increasing as user adds more
    const [water, setWater] = useState([
        10
    ]);
    
    return {
        water, setWater
    }
}