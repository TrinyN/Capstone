// This file is used to fetch the data for the tracker-week screen.

import { useState, useEffect } from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { userDataItems } from "./profileData";
import { usePathname } from 'expo-router';

// function that calculates the sunday and saturday of the given day's week
export const getSunSat = (day) => {
    const date = new Date(day); // clones day
    const dayOfWeek = date.getDay(); // returns number to represent which day. Ex: 0 for Sun, 1 for Mon
    const sunday = new Date(date);
    sunday.setDate(date.getDate() - dayOfWeek); // calculates sunday
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6); // calculates saturday based on sunday
    return { sunday, saturday }
}
export const useDayListData = (day) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = usePathname();

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
    const [avgCal, setAvgCal] = useState(0);
    const [avgGoal, setAvgGoal] = useState("Balance");

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


    // doesn't work yet
    const findGoalColor = (netCal) => {
        let weightStatus = Math.abs(netCal) <= 100 ? 'Maintain' : (netCal) > 0 ? 'Bulk / Gain Weight' : 'Cut / Lose Weight'
        let color;
        if (weightStatus === goal) {
            color = "#80FF72"
        }
        else if (goal == "Maintain") {
            if (Math.abs(netCal) > 100) {
                color = "#FFF07C"
            }
            else {
                color = "#E65148"
            }
        }
        else if (goal == "Bulk / Gain Weight") {
            if (netCal <= 0 && netCal > -100) {
                color = "#FFF07C"
            }
            else {
                color = "#E65148"
            }
        }
        else if (goal == "Cut / Lose Weight") {
            if (netCal >= 0 && netCal < 100) {
                color = "#FFF07C"
            }
            else {
                color = "#E65148"
            }
        }
        return color
    }

    useEffect(() => {
        if (router === '/tracker-week') {
            setIsLoading(true); // Start loading when date changes
            fetchWeekData();
          }
    }, [router, userID, day]);

    const fetchWeekData = async () => {
        if (!userID) return;

        const { sunday, saturday } = getSunSat(day)

        try {
            const querySnapshot = await firestore()
                .collection('Users')
                .doc(userID)
                .collection('Tracker')
                .orderBy(firestore.FieldPath.documentId())
                .startAt(formatDate(sunday))
                .endAt(formatDate(saturday))
                .get();

            let waterTotal = 0;
            let weightTotal = 0;
            let count = 0;
            const updatedDayList = [...dayList];

            const dayDataPromises = querySnapshot.docs.map(async (doc, dayIndex) => {
                let totalCalsEaten = 0;
                let totalCalsBurned = 0;
                const data = doc.data();

                waterTotal += Number(data?.water || 0);
                if (data?.weight !== undefined) {
                    count++;
                    weightTotal += Number(data.weight);
                }
                
                totalCalsEaten = Number(data?.totalCalsEaten || 0);
                totalCalsBurned = Number(data?.totalCalsBurned || 0);

                const netCal = totalCalsEaten - totalCalsBurned;
                const weightStatus = Math.abs(netCal) <= 100 ? 'Maintain' : netCal > 0 ? 'Bulk / Gain Weight' : 'Cut / Lose Weight';

                updatedDayList[dayIndex] = {
                    ...updatedDayList[dayIndex],
                    data: [`${totalCalsEaten} - ${totalCalsBurned}`],
                    goal: [
                        netCal > 100 ? 'Surplus' :
                            netCal < -100 ? 'Deficit' : 'Balance'
                    ],
                    goalColor: weightStatus === goal ? "#80FF72" :
                        Math.abs(netCal) <= 200 ? "#FFF07C" : "#E65148"
                };
            });

            await Promise.all(dayDataPromises);

            setAvgWater((waterTotal / 7).toFixed(2));
            setAvgWeight((weightTotal / count || 0).toFixed(2));
            updateDayList(updatedDayList);

        } catch (error) {
            console.error("Error fetching weekly tracker data: ", error);
        } finally {
            setIsLoading(false)
        }
    };

    // Runs everytime data changes
    useEffect(() => {
        // Finds average of calories eaten
        let calTotal = 0;
        dayList.forEach(item => {
            const [calsEaten] = item.data[0].split(' - ').map(Number); // Split and convert to numbers
            calTotal += calsEaten;
        });
        setAvgCal(Math.round(calTotal / 7))

        // Finds frequency of each goal
        const goalCounts = {};

        dayList.forEach(item => {
            const goal = item.goal[0];
            goalCounts[goal] = (goalCounts[goal] || 0) + 1;
        });

        // Finds most occurring goal
        let mostFrequentGoal = null;
        let maxCount = 0;

        for (const goal in goalCounts) {
            if (goalCounts[goal] > maxCount) {
                maxCount = goalCounts[goal];
                mostFrequentGoal = goal;
            }
        }
        setAvgGoal(mostFrequentGoal)
    }, [dayList])

    return {
        avgWater,
        avgWeight,
        dayList,
        avgCal,
        avgGoal, 
        isLoading
    };
};

export const getWeekDate = (day) => {
    try {
        const { sunday, saturday } = getSunSat(day)
        const sun = new Date(sunday);
        const sat = new Date(saturday);


        const formattedDate1 = `${(sun.getMonth() + 1)}/${sun.getDate()}`;
        const formattedDate2 = `${(sat.getMonth() + 1)}/${sat.getDate()}`;
        return `${formattedDate1} - ${formattedDate2}`;
    } catch (e) {
        alert(`Error Getting Week Date: ${e.message}`);
    }
};

// export const getWeekDate = (date) => {
//     try {
//         // const {sunday, saturday} = getSunSat(date)
//         // console.log(sunday)
//         const trackerDayRef = getTrackerDayRef(date);
//         const dateString = trackerDayRef.id // get ID to get today's date as a string
//         const [year, month, day] = dateString.split('-');
//         const dateObject = new Date(year, month - 1, day); // convert string to Date
//         console.log(dateObject)
//         const formattedDate = `${(dateObject.getMonth() + 1).toString()}/${dateObject.getDate().toString()}`;
//         return formattedDate
//     } catch (e) {
//         alert("Error Getting Date: ", e.message)
//     }
// }
