import { View } from 'react-native'
import React from 'react'
import styles from '../../styles'
import OptionItem from './OptionItem'
import { Overlay } from '@rneui/base';
import { shoppingListData } from '../../constants/shoppingListData';

const ShoppingListOptions = ({
    setShoppingList,
    shoppingList,
    setCheckedItems,
    toggleOptions, 
    visibleOptions, 
    checkedItems
}) => {
    const { emptyShoppingList } = shoppingListData();

    const resetCheckmarks = () => {
        setCheckedItems({})
    };

    const deleteAll = () => {
        setShoppingList(emptyShoppingList)
    };

    const deleteCheckedItems = () => {
        const updatedShoppingList = shoppingList.map(section => {
            return {
                ...section,
                data: section.data.filter(item => !checkedItems[item])
            };
        });
        setShoppingList(updatedShoppingList);
    };

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
                    // onPress={}
                    isShoppingList={true}
                />
            </View>
        </Overlay>
    )
}
export default ShoppingListOptions