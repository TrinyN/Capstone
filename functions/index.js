const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");

admin.initializeApp();

exports.updateTotalCalsEaten =
onDocumentCreated("/Users/{userId}/Tracker/{trackerId}/Food/{foodId}",
    async (event) => {
      // Get the newly added food data
      const foodData = event.data.data();
      const calPerSvg = foodData.calPerSvg || 0;
      const svgEaten = foodData.svgEaten || 0;
      const calsEaten = calPerSvg * svgEaten;

      // Get userId and trackerId from the path parameters
      const userId = event.params.userId;
      const trackerId = event.params.trackerId;

      // Reference to the specific Tracker document
      const trackerRef = admin.firestore()
          .collection("Users")
          .doc(userId)
          .collection("Tracker")
          .doc(trackerId);

      try {
        // Update the totalCalsEaten field atomically
        await admin.firestore().runTransaction(async (transaction) => {
          const trackerDoc = await transaction.get(trackerRef);
          if (!trackerDoc.exists) {
            throw new Error("Tracker document does not exist!");
          }

          // Get the current totalCalsEaten or default to 0
          const currentTotalCals = trackerDoc.data().totalCalsEaten || 0;
          const newTotalCals = currentTotalCals + calsEaten;

          // Update the totalCalsEaten field
          transaction.update(trackerRef, {totalCalsEaten: newTotalCals});
        });

        console.log(`Updated totalCalsEaten for trackerId ${trackerId}`);
      } catch (error) {
        console.error(`Error updating totalCalsEaten: ${error.message}`);
      }
    });

exports.updateTotalCalsBurned =
onDocumentCreated("/Users/{userId}/Tracker/{trackerId}/Exercise/{exId}",
    async (event) => {
      // Get the newly added food data
      const exerciseData = event.data.data();
      const calsBurned = Number(exerciseData.calsBurned) || 0;

      // Get userId and trackerId from the path parameters
      const userId = event.params.userId;
      const trackerId = event.params.trackerId;

      // Reference to the specific Tracker document
      const trackerRef = admin.firestore()
          .collection("Users")
          .doc(userId)
          .collection("Tracker")
          .doc(trackerId);

      try {
        // Update the totalCalsEaten field atomically
        await admin.firestore().runTransaction(async (transaction) => {
          const trackerDoc = await transaction.get(trackerRef);
          if (!trackerDoc.exists) {
            throw new Error("Tracker document does not exist!");
          }

          // Get the current totalCalsEaten or default to 0
          const currentTotalCals =
          Number(trackerDoc.data().totalCalsBurned) || 0;
          const newTotalCals = currentTotalCals + calsBurned;

          // Update the totalCalsEaten field
          transaction.update(trackerRef, {totalCalsBurned: newTotalCals});
        });

        console.log(`Updated totalCalsBurned for trackerId ${trackerId}`);
      } catch (error) {
        console.error(`Error updating totalCalsBurned: ${error.message}`);
      }
    });
