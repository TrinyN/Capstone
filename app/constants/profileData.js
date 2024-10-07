// This file contains the large constants and data sets that
// can be found within the profile page.
// ***MAY CONTAIN SAMPLE DATA THAT WILL BE REMOVED LATER***

import { useState } from 'react';

// useState that contains all of user's info
// MAY BE REPLACED BY DATABASE FUNCTIONALITY(?)
export const userDataItems = () => {
    const [userInfo, setUserInfo] = useState([
        { title: 'Email', value: 'trinynguyen@gmail.com', type: '', options: [] },
        { title: 'Name', value: 'Triny', type: 'text', options: [] },
        { title: 'Gender', value: 'Female', type: 'dropdown', options: ['Female', 'Male'] },
        { title: 'Date of Birth', value: '08/23/2003', type: 'date', options: [] },
        { title: 'Height', value: '5 feet 0 in', type: 'text', options: [] },
        { title: 'Weight', value: '1,000 lbs', type: 'text', options: [] },
        { title: 'Caloric Goal', value: '2,400', type: 'text', options: [] },
        { title: 'Water Goal', value: '9 cups per day', type: 'text', options: [] },
        { title: 'Weight Goal', value: 'Gain', type: 'dropdown', options: ['Gain', 'Lose', 'Maintain'] },
        { title: 'Diet Plan', value: 'Keto (Custom)', type: 'dropdown', options: ['Keto', 'Vegetarian'] },
        { title: 'Macro Ratio Goal', value: '15:35:40', type: 'text', options: [] },

    ]);

    return {
        userInfo,
        setUserInfo
    }
}