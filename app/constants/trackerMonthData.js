// File to store the data related to the tracker-week screen.
// Later will be implemented to work alongside databse

import { useState } from 'react';

// Implement way for color to change depending on goal/data

export const useWeekListData = () => {
    // Sample week data
    const [weekList, setWeekList] = useState([
        { title: '5/26-6/1', data: ['22,000'], goal: ['Surplus'] },
        { title: '6/2-6/8', data: ['17,500'], goal: ['Balance'] },
        { title: '6/9-6/15', data: ['17,000'], goal: ['Balance'] },
        { title: '6/16-6/22', data: ['21,500'], goal: ['Surplus'] },
        { title: '6/23-6/29', data: ['23,000'], goal: ['Surplus'] },
        { title: '6/30-7/6', data: ['17,000'], goal: ['Balance'] }
    ]);
    return {
        weekList,
        setWeekList
    }
}