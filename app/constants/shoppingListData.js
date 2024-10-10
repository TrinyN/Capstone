import { useState } from 'react';

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

    // test data, will need to start off empty and be saved for each user and fetched from database
    const [shoppingList, setShoppingList] = useState([
        { title: 'Fruit', data: ['Apples', 'Bananas', 'Oranges'] },
        { title: 'Vegetable', data: ['Carrots', 'Broccoli', 'Spinach'] },
        { title: 'Protein', data: ['Chicken', 'Beef', 'Tofu'] },
        { title: 'Dairy', data: ['Milk', 'Yogurt', 'Cheese'] },
        { title: 'Grain', data: ['Oatmeal'] },
        { title: 'Snack', data: ['Popcorn', 'Dorittos', 'Cheetos'] },
        { title: 'Beverage', data: ['Orange Juice', 'Coke', 'Fanta'] },
        { title: 'Misc.', data: ['Broom', 'Sponge'] },
    ]);

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

    return {
        setItems,
        items,
        shoppingList,
        setShoppingList, 
        emptyShoppingList
    }
}

