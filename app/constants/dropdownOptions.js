// This file is used to store all of the options that will be available to
// the user in the various dropdown menus across the app. All options in these
// menus will never be changed (unless us developers add them),so they will stay here.

import { useState } from 'react';

// Export the options of sex
// Used in signup-2 and profile(?)
export const useSexOptions = () => {
    const [userSex, setUserSex] = useState('')
    const [sex, setSex] = useState([
        { label: 'Female', value: 'Female' },
        { label: 'Male', value: 'Male' },
    ]);

    return { 
        userSex, 
        setUserSex, 
        sex,
        setSex 
    }
}

// Export the choice of a diet plan, or not
// Used in signup-3
export const useDietPlanBooleanOptions = () => {
    const [userDietPlanBoolean, setUserDietPlanBoolean] = useState(false)
    const [dietPlanBoolean, setDietPlanBoolean] = useState([
        { label: 'Yes', value: true },
        { label: 'No', value: false },
    ]);

    return {
        userDietPlanBoolean,
        setUserDietPlanBoolean,
        dietPlanBoolean,
        setDietPlanBoolean
    }
}

// Export the diet plan options
// Used in signup-3 and profile(?)
export const useDietPlanOptions = () => {
    const [userDietPlan, setUserDietPlan] = useState('')
    const [dietPlan, setDietPlan] = useState([
        { label: 'Keto', value: 'Keto' },
        { label: 'Vegan', value: 'Vegan' },
        { label: 'Vegetarian', value: 'Vegetarian' },
    ]);

    return {
        userDietPlan,
        setUserDietPlan,
        dietPlan,
        setDietPlan
    }
}

// Export the weight goal options
// Used in signup-3 and profile(?)
export const useWeightGoalOptions = () => {
    const [userWeightGoal, setUserWeightGoal] = useState('')
    const [weightGoal, setWeightGoal] = useState([
        { label: 'Cut / Lose Weight', value: 'Cut / Lose Weight' },
        { label: 'Bulk / Gain Weight', value: 'Bulk / Gain Weight' },
        { label: 'Maintain', value: 'Maintain' },
    ]);

    return {
        userWeightGoal,
        setUserWeightGoal,
        weightGoal,
        setWeightGoal
    }
}

// Tracker Popup: Water Choice: liquid unit dropdown options
export const useWaterUnitTypesOptions = () => {
    const [waterUnit, setWaterUnit] = useState('')
    const [waterUnitTypes, setWaterUnitTypes] = useState([
        { label: 'Cups', value: 'Cups' },
        { label: 'Fl Oz', value: 'Fl Oz' },
        { label: 'Gallon', value: 'Gallon' },

    ]);

    return {
        waterUnit,
        setWaterUnit,
        waterUnitTypes,
        setWaterUnitTypes
    }
}

// Tracker Popup: Exercise Choice: exercise unit dropdown options
export const useExerciseUnitOptions = () => {
    const [exerciseUnit, setExerciseUnit] = useState('')
    const [exerciseUnitTypes, setExerciseUnitTypes] = useState([
        { label: 'Minutes', value: 'Minutes' },
        { label: 'Hours', value: 'Hours' },
        { label: 'Reps', value: 'Reps' },

    ]);

    return {
        exerciseUnit,
        setExerciseUnit,
        exerciseUnitTypes,
        setExerciseUnitTypes
    }
}