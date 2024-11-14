import { View } from 'react-native'
import React from 'react'
import styles from '../../styles'
import OptionItem from './OptionItem'
import { Overlay } from '@rneui/base';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';

const ShoppingListOptions = ({
    setCheckedItems,
    toggleOptions,
    visibleOptions,
    checkedItems
}) => {
    const userID = auth().currentUser?.uid || null;

    const resetCheckmarks = async () => {
        setCheckedItems({ "placeholder": false }) // didn't use {} because checkmarks only saved in database if non empty 
    };

    const deleteAll = async () => {
        setCheckedItems({ "placeholder": false }) // reset checked state in database in case of repeat foods

        // delete all food documents in shopping list collection
        try {
            const batch = firestore().batch();
            const snap = await firestore().collection("Users").doc(userID).collection("ShoppingList").get();
            snap.forEach((doc) => {
                batch.delete(doc.ref)
            })
            return batch.commit();
        } catch (e) {
            alert("Error: ", e.message)
        }
    };

    const deleteCheckedItems = async () => {
        setCheckedItems({ "placeholder": false }) // reset checked state in database in case of repeat foods

        // for every food in shoppinglist, if food name is checked, delete
        try {
            // store all checked food items in array
            const checkedFoods = Object.keys(checkedItems).filter(food => checkedItems[food]);
            
            const batch = firestore().batch();
            const snap = await firestore().collection("Users").doc(userID).collection("ShoppingList").get();
            snap.forEach((doc) => {
                if (checkedFoods.includes(doc.data().foodName)) {
                    batch.delete(doc.ref);
                }})
            return batch.commit();
        } catch (e) {
            alert("Error: ", e.message)
        }
    };

    const generateList = () => {
        router.push('/shoppingGenDay')
    }

    return (
        <Overlay isVisible={visibleOptions} onBackdropPress={toggleOptions}
            overlayStyle={[styles.optionsMenu, { justifyContent: 'center' }]}
        >
            {/* View to contain all options */}
            <View style={{ paddingHorizontal: 8, justifyContent: 'center' }}>

                {/* Resetting checkmarks */}
                <OptionItem
                    title={"Reset Checkmarks"}
                    icon={"rotate-ccw"}
                    onPress={resetCheckmarks}
                    isShoppingList={true}
                />
                {/* Deleting checked items from list */}
                <OptionItem
                    title={"Delete Checked"}
                    icon={"x-square"}
                    onPress={deleteCheckedItems}
                    isShoppingList={true}
                />
                {/* Deleting all items from list */}
                <OptionItem
                    title={"Delete All"}
                    icon={"trash-2"}
                    onPress={deleteAll}
                    isShoppingList={true}
                />
                {/* Generating list from tracker screen(s) */}
                <OptionItem
                    title={"Generate List"}
                    icon={"shopping-cart"}
                    onPress={generateList}
                    isShoppingList={true}
                />
            </View>
        </Overlay>
    )
}
export default ShoppingListOptions