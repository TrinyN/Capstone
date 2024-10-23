import { React, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import CustomPopUp from '../../structural/CustomPopUp';
import styles from '../../../styles';
import { ScrollView } from 'react-native-gesture-handler';
import CustomPieChart from '../PieChart';
import Feather from "react-native-vector-icons/Feather";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CustomPopUp2 from '../../structural/CustomPopUp2';

const AddFoodConfirmation = ({
    food,
    addFoodConfirmVisible,
    toggleFoodConfirmOverlay,
    toggleFoodOverlay
}) => {

    const [series, setSeries] = useState([0, 0, 0]);

    const defaultDATA = [{
        title: null,
        calPerSvg: null,
        svgEaten: null,
        carb: series[0],
        protein: series[1],
        fat: series[2]
    },]

    const [DATA, setDATA] = useState(defaultDATA);

    // when food changes, if food is not empty and title is not already in data, add food to data set
    useEffect(() => {
        if (food !== "" && DATA.length > 0 && !DATA.some(item => item.title === food.title)) {
            setDATA(prevData => [...prevData, food]);
        }
    }, [food, DATA]);


    // set pie chart percentages
    useEffect(() => {
        // if (DATA.length > 0) {
        // goes through data and sums up appropriate value with default value of 0
        const totalCarb = DATA.reduce((acc, item) => acc + item.carb, 0);
        const totalProtein = DATA.reduce((acc, item) => acc + item.protein, 0);
        const totalFat = DATA.reduce((acc, item) => acc + item.fat, 0);

        setSeries([totalCarb, totalProtein, totalFat])
    }, [DATA]);

    const handleAddPress = () => {
        toggleFoodConfirmOverlay()
        toggleFoodOverlay()
    }

    const handleConfirmPress = () => {
        // add food to database

        // reset data
        setDATA(defaultDATA)

        // close pop up
        toggleFoodConfirmOverlay()
    }

    const handleEditPress = () => {
        toggleFoodOverlay()
        // todo: open food overlay with appriopriate data and allow user to edit
        toggleFoodConfirmOverlay()
    }

    // Saves visibility of add water pop up
    const [deleteConfirmVis, setDeleteConfirmVis] = useState(false);

    // Change visibility of add water overlay
    const toggleDeleteConfirmVis = () => {
        setDeleteConfirmVis(!deleteConfirmVis);
    };

    const handleDeletePress = () => {
        // open delete confirmation pop up
        // if confirmed, delete item

        toggleDeleteConfirmVis()
    }

    const renderFoodInfo = ({ data, title }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                <View style={{ backgroundColor: 'rgba(97, 98, 131, 0.2)', borderRadius: 8, marginVertical: 3, width: 50 }}>
                    <Text style={[styles.smallText, { color: '#828282', paddingVertical: 3 }]}>
                        {data}
                    </Text>
                </View>
                <Text style={[styles.smallText, { paddingLeft: 10, color: '#828282', marginVertical: 3 }]}>
                    {title}
                </Text>
            </View>
        )
    }

    const renderMacroInfo = ({ title, data }) => {
        return (
            <Text style={[styles.smallText, { fontSize: 12 }]}>
                {title}:

                <Text style={{ color: '#828282' }}>
                    {" "}{data}{"g"}
                </Text>

            </Text>
        )
    }

    const Item = ({ item }) => {
        // if there is no title do not render list item
        if (item.title == null || item.title.trim() == '') {
            return null;
        }

        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ borderRadius: 5, width: 5, height: 5, backgroundColor: '#CB9CF2', margin: 10 }}>
                    </View>
                    <Text style={styles.defaultWhiteText}>
                        {item.title}
                    </Text>

                    <View style={{ paddingHorizontal: 10 }}>
                        <TouchableOpacity style={{ width: 20 }} onPress={toggleDeleteConfirmVis}>
                            <AntDesign name="minuscircle" size={20} color="#CB9CF2" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity>
                        <MaterialIcons name="mode-edit-outline" size={24} color="#CB9CF2" />
                    </TouchableOpacity>
                </View>
                <View>

                </View>
                {renderFoodInfo({ data: item.calPerSvg, title: 'Calories Per Serving' })}
                {renderFoodInfo({ data: item.svgEaten, title: 'Servings Eaten' })}

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 15 }}>
                    {renderMacroInfo({ data: item.carb, title: 'Carb' })}
                    {renderMacroInfo({ data: item.protein, title: 'Protein' })}
                    {renderMacroInfo({ data: item.fat, title: 'Fat' })}
                </View>
            </View>
        )
    }

    return (
        <CustomPopUp
            visible={addFoodConfirmVisible}
            toggleOverlay={toggleFoodConfirmOverlay}
            content={
                <ScrollView>
                    <View style={{ paddingHorizontal: 30, paddingBottom: 20, justifyContent: 'center' }}>
                        <View style={{ borderRadius: 10, backgroundColor: 'rgba(27,33,43,0.5)', paddingVertical: 10 }}>
                            <FlatList
                                data={DATA}
                                renderItem={({ item }) => <Item item={item} />}
                                ListHeaderComponent={
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>

                                        <Text style={[styles.defaultWhiteText, { textDecorationLine: 'underline', fontSize: 21, paddingHorizontal: 10 }]}>
                                            Food
                                        </Text>
                                        <TouchableOpacity style={{ width: 25 }} onPress={handleAddPress}>
                                            {/* <Feather name={'plus-square'} size={25} color='#CB9CF2' /> */}
                                            <AntDesign name="plussquare" size={25} color="#CB9CF2" />
                                        </TouchableOpacity>
                                    </View>
                                }
                                scrollEnabled={false}
                            />
                        </View>

                        <View style={{ paddingVertical: 10 }}>
                            <CustomPieChart hasTitle={true} series={series.every(item => item === 0) ? null : series} />
                        </View>

                        {/* functionality of button doesnt work if you use custom button for some reason */}
                        <TouchableOpacity
                            onPress={handleConfirmPress}
                            style={[styles.button, { backgroundColor: '#CB9CF2', zIndex: -1 }]}
                        >
                            <Text style={styles.buttonText}>
                                Confirm
                            </Text>
                        </TouchableOpacity>

                        {/* pop up for deleting food item */}
                        <CustomPopUp2
                            visible={deleteConfirmVis}
                            toggleVisible={toggleDeleteConfirmVis}
                            handleConfirmPress={handleDeletePress}
                            title={"Are you sure you want to delete?"}
                            buttonTitle={"Delete"}
                        />
                        
                    </View>
                </ScrollView>
            }
        />
    )
}
export default AddFoodConfirmation