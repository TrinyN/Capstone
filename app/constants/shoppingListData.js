import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const shoppingListData = () => {

    const [items, setItems] = useState([
        { label: 'Fruit', value: 'Fruit' },
        { label: 'Vegetable', value: 'Vegetable' },
        { label: 'Protein', value: 'Protein' },
        { label: 'Dairy', value: 'Dairy' },
        { label: 'Grain', value: 'Grain' },
        { label: 'Snack', value: 'Snack' },
        { label: 'Beverage', value: 'Beverage' },
        { label: 'Misc.', value: 'Misc.' }
    ]);

    // // test data, will need to start off empty and be saved for each user and fetched from database
    // const [shoppingList, setShoppingList] = useState([
    //     { title: 'Fruit', data: ['Apples', 'Bananas', 'Oranges'] },
    //     { title: 'Vegetable', data: ['Carrots', 'Broccoli', 'Spinach'] },
    //     { title: 'Protein', data: ['Chicken', 'Beef', 'Tofu'] },
    //     { title: 'Dairy', data: ['Milk', 'Yogurt', 'Cheese'] },
    //     { title: 'Grain', data: ['Oatmeal'] },
    //     { title: 'Snack', data: ['Popcorn', 'Dorittos', 'Cheetos'] },
    //     { title: 'Beverage', data: ['Orange Juice', 'Coke', 'Fanta'] },
    //     { title: 'Misc.', data: ['Broom', 'Sponge'] },
    // ]);

    const emptyShoppingList = [
        { title: 'Fruit', data: [] },
        { title: 'Vegetable', data: [] },
        { title: 'Protein', data: [] },
        { title: 'Dairy', data: [] },
        { title: 'Grain', data: [] },
        { title: 'Snack', data: [] },
        { title: 'Beverage', data: [] },
        { title: 'Misc.', data: [] },
    ];

    // return {
    //     setItems,
    //     items,
    //     shoppingList,
    //     setShoppingList, 
    //     emptyShoppingList
    // }


    const [shoppingList, setShoppingList] = useState([
        { title: 'Fruit', data: [] },
        { title: 'Vegetable', data: [] },
        { title: 'Protein', data: [] },
        { title: 'Dairy', data: [] },
        { title: 'Grain', data: [] },
        { title: 'Snack', data: [] },
        { title: 'Beverage', data: [] },
        { title: 'Misc.', data: [] },
    ]);
    const userID = auth().currentUser.uid;  // Get current user's ID


    useEffect(() => {

        const subscriber = firestore().collection('Users').doc(userID).collection('ShoppingList').onSnapshot(
                (querySnapshot) => {
                    const newShoppingData = [];
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        newShoppingData.push({
                            foodName: data.foodName || '—',
                            foodType: data.foodType || '—',
                        });
                    });
                    setShoppingList((prevShoppingList) => {
                        // Create a copy of the previous shopping list
                        const updatedList = prevShoppingList.map((item) => {
                            // Find the matching foodType and add foodName to the data array
                                const matchingFoods = newShoppingData
                                    .filter(food => food.foodType === item.title)
                                    .map(food => food.foodName);
                                return {
                                    ...item,
                                    data: [...matchingFoods],
                                };
                        });                        
                        return updatedList
                    });
                },
                (error) => {
                    alert("Error Fetching Shopping List Data: " + error.message);
                }
            );


        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => subscriber();
    }, [userID]);

    return {setItems, items, shoppingList, emptyShoppingList}
}