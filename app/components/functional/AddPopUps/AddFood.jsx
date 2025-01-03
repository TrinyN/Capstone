import { React, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import CustomPopUp from '../../structural/CustomPopUp';
import styles from '../../../styles';
import CustomDropdown from '../CustomDropdown';
import { CustomButton } from '../CustomButton';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from "react-native-vector-icons/Feather";
import { useTimeFrameOptions } from '../../../constants/dropdownOptions';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomPieChart from '../PieChart';
import AddFoodMacro from './AddFoodMacro';
import { Formik, useFormik, setFieldValue } from 'formik';
import * as yup from 'yup';

// todo: local styles, add button functionality, quick fill, search database. Make it so 
// info gets deleted when overlay is closed/when food is successfully added to tracker
// also only allow press add if all non empty 

const addFoodSchema = yup.object({
    foodName: yup.string()
                .required('Food name is required')
                .matches(/^[a-zA-Z0-9\s\-\/]+$/, 
                    'Only letters and numbers allowed'
                ),
                
    calPerSvg: yup.number()
                .positive('Kcals must be positive')
                .integer('Kcals must be whole numbers')
                .required('Kcals per serving are required'),
    svgEaten: yup.number()
                .typeError('Servings must be numbers')
                .positive('Servings must be positive')
                .required('Serving count is required')
                .test(
                    'is-decimal',
                    'Servings may only go to two decimal places',
                    (serv) => /^\d+(\.\d{1,2})?$/.test(serv)
                ),
    // carbs, fats, and protein are optional? --> on AddFoodMaco popup

})

const AddFood = ({ previousOverlay, addFoodVisible, toggleFoodOverlay, toggleFoodConfirmOverlay, setFood }) => {
    const [series, setSeries] = useState([0, 0, 0]); // init series

    // Handle dropdown menu options for food unit type
    const { timeFrame, setTimeFrame,
        timeFrameTimes, setTimeFrameTimes } = useTimeFrameOptions();

    // Saves visibility of add water pop up
    const [addFoodMacroVisible, setAddFoodMacroVisible] = useState(false);

    // Change visibility of add water overlay
    const toggleFoodMacroOverlay = () => {
        setAddFoodMacroVisible(!addFoodMacroVisible);
    };

    // (DONE?) TODO: need to not use some of the useStates and instead use formik values
    const resetData = (resetForm) => {
        setFood("")                         // Used to ensure no copies of foods are added
        resetForm({
            values: {
                foodName: '',
                calPerSvg: '',
                svgEaten: '',
            },
        });
        setSeries([0,0,0])                  // Handled separately as it is a special case
        setTimeFrame("")                    // Handled separately as it is done elsewhere
    }

    // When add button is pressed
    const handlePress = (values, {resetForm}) => {
        const { foodName, calPerSvg, svgEaten } = values; 
        console.log(values);
        setFood(
            {
                title: foodName, 
                calPerSvg: calPerSvg, 
                svgEaten: svgEaten, 
                carb: series[0], 
                protein: series[1],
                fat: series[2],
                timeFrame: timeFrame
            }
        )

        toggleFoodConfirmOverlay()
        setTimeout(() => toggleFoodOverlay(), 200) // allows enough time for confirmation pop up to appear before close food pop up
        setTimeout(() => resetData(resetForm), 400) // resets food info after adding it to the confirmation pop up
    }

    return (
        <CustomPopUp
            visible={addFoodVisible}
            toggleOverlay={toggleFoodOverlay}
            hasBackButton={true}
            previousOverlay={previousOverlay}
            content={
                <Formik
                    initialValues={{foodName:'', calPerSvg:'', svgEaten:''}}
                    validationSchema={addFoodSchema}
                    onSubmit={handlePress}
                >
                {/* {console.log(values)} */}
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, resetForm, setFieldValue }) => (
                        <ScrollView>
                            <View style={localStyle.fieldContainer}>

                                <View style={localStyle.viewContainer}>
                                    <Text style={[styles.smallText, { color: '#828282' }]}>
                                        Quick Fill
                                    </Text>
                                    <TouchableOpacity>
                                        <Feather name={"camera"} size={25} color='#CB9CF2' style={{ paddingHorizontal: 10 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Ionicons name="barcode-sharp" size={30} color="#CB9CF2" style={{ bottom: 2 }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={[localStyle.viewContainer, { paddingBottom:0 }]}>
                                    <TextInput
                                        style={[styles.inputFieldStyle, { flex: 1 }]}
                                        placeholder='Food Name' 
                                        selectionColor='#CB9CF2'
                                        placeholderTextColor='rgba(242,244,243, 0.2)'
                                        onChangeText={handleChange('foodName')}
                                        // errors={errors.foodName}
                                        value={values.foodName}
                                        >
                                    </TextInput>

                                    <Feather name={"search"} size={20} color='#828282' style={localStyle.searchIcon} />

                                </View>
                                {errors.foodName && <Text style={localStyle.errorMessage}>{errors.foodName}</Text>}

                                <View style={[localStyle.viewContainer, {paddingBottom:0, paddingTop:10}]}>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={styles.inputFieldStyle}
                                            placeholder='Cal Per Svg' 
                                            selectionColor='#CB9CF2'
                                            placeholderTextColor='rgba(242,244,243, 0.2)'
                                            onChangeText={handleChange('calPerSvg')}
                                            value={values.calPerSvg}
                                            keyboardType='numeric'
                                            >
                                        </TextInput>
                                        {errors.calPerSvg && <Text style={localStyle.errorMessage}>{errors.calPerSvg}</Text>}

                                    </View>
                                    <View style={{ paddingLeft: 10, flex: 1 }}>
                                        <TextInput
                                            style={styles.inputFieldStyle}
                                            placeholder='Svgs Eaten' 
                                            selectionColor='#CB9CF2'
                                            placeholderTextColor='rgba(242,244,243, 0.2)'
                                            onChangeText={handleChange('svgEaten')}
                                            value={values.svgEaten}
                                            keyboardType='numeric'
                                        >
                                        </TextInput>
                                        {errors.svgEaten && <Text style={localStyle.errorMessage}>{errors.svgEaten}</Text>}

                                    </View>
                                </View>

                                <View style={{ paddingVertical: 10 }}>
                                    <CustomDropdown
                                        placeholder={'Breakfast'}
                                        setCustomValue={setTimeFrame}
                                        items={timeFrameTimes}
                                        setItems={setTimeFrameTimes}
                                    />
                                </View>
                                <View style={{ paddingVertical: 10, zIndex: -1 }}>
                                    <Pressable onPress={toggleFoodMacroOverlay}>
                                        <CustomPieChart hasTitle={true} editable={true} series={series.every(item => item === 0) ? null : series} />
                                    </Pressable>
                                </View>

                                {/* funtionality of button doesnt work if you use custom button for some reason */}
                                <Pressable
                                    onPress={handleSubmit}
                                    style={[styles.button, { backgroundColor: '#CB9CF2', zIndex: -1}]}
                                >
                                    <Text style={styles.buttonText}>
                                        Add
                                    </Text>
                                </Pressable>
                                    
                            </View>
                            <AddFoodMacro
                                toggleFoodMacroOverlay={toggleFoodMacroOverlay}
                                addFoodMacroVisible={addFoodMacroVisible}
                                setFoodSeries={setSeries}
                            />

                        </ScrollView>
                    )}
                </Formik>
            }
        />
    );
};
export default AddFood;

const localStyle = StyleSheet.create({
    fieldContainer: {
        paddingHorizontal: 30,
        paddingBottom: 20,
        justifyContent: 'center'
    },
    viewContainer: {
        flexDirection: 'row',
        paddingVertical: 10
    },
    searchIcon: {
        position: 'absolute',
        right: 15,
        top: 21
    }, 
    errorMessage: {
        fontSize: 11,
        color: 'red',
        padding: 5,
        fontFamily: 'Inter_300Light',

    }
})