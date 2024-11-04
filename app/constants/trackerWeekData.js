// This file is used to store the data for the tracker-week screen.
// ***Will be implemented to handle real data in the future.***

import { useState } from "react";

// Can goal color be handled within this data file? It may
// keep bloat code out of the trackerWeek screen

export const useDayListData = () => {
    // Sample data for days of the weeek
    const [dayList, setDayList] = useState([
        { title: 'Sun.', data: ['3000 - 500'], goal: ['Surplus'], goalColor: ['#E65148'] },
        { title: 'Mon.', data: ['2750 - 300'], goal: ['Balance'], goalColor: ['#80FF72'] },
        { title: 'Tues.', data: ['1000 - 500'], goal: ['Shortage'], goalColor: ['#E65148'] },
        { title: 'Wed.', data: ['2500 - 0'], goal: ['Balance'], goalColor: ['#80FF72'] },
        { title: 'Thurs.', data: ['2500 - 300'], goal: ['Balance'], goalColor: ['#80FF72'] },
        { title: 'Fri.', data: ['2500 - 0'], goal: ['Balance'], goalColor: ['#80FF72'] },
        { title: 'Sat.', data: ['2500 - 500'], goal: ['Balance'], goalColor: ['#80FF72'] },
    ]);
    return {
        dayList,
        setDayList
    }
}