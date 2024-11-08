/*
Will probably have to change since it only gets the current day, will need to 
change places where this function is being used or make this have parameter day
and base reference on that
*/



import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getTrackerDayRef = () => {
  const userID = auth().currentUser.uid;  // Get current user's ID
  const currDate = new Date();  // Get current date
  const formattedDate = `${(currDate.getMonth() + 1).toString().padStart(2, '0')}-${currDate.getDate().toString().padStart(2, '0')}-${currDate.getFullYear()}`;

  // Return the reference to the Tracker document for today
  return firestore().collection('Users').doc(userID).collection('Tracker').doc(formattedDate);
};
