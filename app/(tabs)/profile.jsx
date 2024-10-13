import { TouchableOpacity, Text, View, FlatList, Dimensions, StyleSheet } from 'react-native';
import styles from '../styles';
import { useState } from 'react';
import { Overlay } from '@rneui/base';
import { router } from 'expo-router';
import PieChart from 'react-native-pie-chart'
import ProfileItem from '../components/functional/ProfileItem';
import { userDataItems } from '../constants/profileData';
import CustomScreen from '../components/structural/CustomScreen';
import CustomButton2 from '../components/functional/CustomButton2';

// problems:
// looks weird on android (feather icon positions doesnt line up with drop down icon)
// make email not be editable and no edit icon next to it
// change data types ex: birth date should be a date and allow user to pick from calendar maybe, height should allow user to input value for ft and also inches
// should save button disappear if no changes?

// REFACTORING FLAGGING - Needs a Component
// 1. Screen component DONE
// 2. Screen header component DONE
// 3. Render list component(s) - list item
// 6. Spacing component
// 5. Pie chart container? - Not too necessary though
// 6. Small button component? ~ CustomButton implementation?

const Profile = () => {
    const { width } = Dimensions.get('window');
    const widthAndHeight = (width * 0.30)

    // test data for macro ratio goal
    const [series, setSeries] = useState([15, 35, 40]);

    // colors for pie chart
    const sliceColor = ['#80FF72', '#7EE8FA', '#FFF07C']

    // saves visibility of log out pop up
    const [visibleLogOut, setVisibleLogOut] = useState(false);

    // change visibility of log out pop up
    const toggleLogOut = () => {
        setVisibleLogOut(!visibleLogOut);
    };

    // if save changes doesn't change visibility, no need for opacity and saveVisibility
    // visibility of save button
    const [saveVisibility, setSaveVisibility] = useState(false);
    // const opacity = saveVisibility ? 1: 0
    const opacity = 1

    // test data, will need to fetch user info from database and allow user to change
    const { userInfo, setUserInfo } = userDataItems();

    // calculates percentage of macros based on given ratio
    let percentageCalc = (index) => {
        return Number(Math.round((series[index] / (series[0] + series[1] + series[2]) * 100) + 'e1') + 'e-1');
    }

    const PieChartLegend = ({ macro, index, color }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[localStyle.legendStyle, { backgroundColor: color }]} />
                <Text style={styles.defaultWhiteText}>
                    {macro} {percentageCalc(index)}{"%"}
                </Text>
            </View>
        )
    }

    return (
        <CustomScreen
            title='Your Profile'
            hasLogOutButton={true}
            toggleLogOut={toggleLogOut}
            screenContent={
                <View>
                    {/* Flat list to show profile information */}
                    <View style={localStyle.container}>
                        <FlatList
                            data={userInfo}
                            renderItem={({ item, index }) =>
                                <ProfileItem
                                    title={item.title}
                                    value={item.value}
                                    index={index}
                                    type={item.type}
                                    options={item.options}
                                    item={item}
                                />
                            }
                            keyExtractor={item => item.title}
                            scrollEnabled={false}
                        />

                    </View>

                    {/* Macro Pi Chart Container*/}
                    <View style={{ paddingTop: 30, paddingBottom: 10 }}>
                        <View style={[localStyle.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <View style={localStyle.legendContainer}>
                                <PieChartLegend macro={"Carb"} index={0} color='#80FF72' />
                                <PieChartLegend macro={"Protein"} index={1} color='#7EE8FA' />
                                <PieChartLegend macro={"Fat"} index={2} color='#FFF07C' />
                            </View>

                            {/* Macro Pi Chart*/}
                            <View style={{ paddingVertical: 20, paddingRight: 20 }}>
                                <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor}
                                    style={{ strokeWidth: '4', stroke: '#141920' }}
                                />
                            </View>
                        </View>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row-reverse' }}>
                            {/* <TouchableOpacity
                                // disabled={!saveVisibility}
                                style={[styles.button, { opacity, backgroundColor: '#CB9CF2', paddingVertical: 0 }]}>
                                <Text style={[styles.defaultText, { color: '#0E1116', fontSize: 14, paddingVertical: 5 }]} >
                                    Save
                                </Text>
                            </TouchableOpacity> */}

                            <CustomButton2 type='small' text='Save' />
                        </View>
                    </View>

                    {/* Popup for log out */}
                    <Overlay isVisible={visibleLogOut} onBackdropPress={toggleLogOut} overlayStyle={localStyle.overlayStyle}>
                        <View style={localStyle.overlayHeader}>
                            <Text style={[styles.defaultText, { color: '#F2F4F3', textAlign: 'center' }]}>
                                Are you sure you want to log out?
                            </Text>
                            <View style={localStyle.overlayContainer}>
                                <TouchableOpacity onPress={toggleLogOut} style={[styles.button, localStyle.button]}>
                                    <Text style={[styles.buttonText, { color: '#F2F4F3' }]}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { router.push('') }} style={[styles.button, { backgroundColor: '#CB9CF2', width: '40%' }]}>
                                    <Text style={[styles.buttonText, { color: '0E1116' }]}>Log Out</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Overlay>
                </View>
            }
        >
        </CustomScreen>
    )
}
export default Profile;

const localStyle = StyleSheet.create({
    container: {
        borderRadius: 10, 
        backgroundColor: 'rgba(27,33,43,0.5)'
    }, 
    button: {
        backgroundColor: '#0E1116', 
        borderWidth: 1, 
        borderColor: '#F2F4F3', 
        width: '40%'
    },
    overlayStyle: {
        backgroundColor: '#0E1116', 
        borderWidth: 2, 
        borderColor: '#CB9CF2', 
        width: '90%'
    },
    overlayHeader: {
        paddingHorizontal: 8, 
        justifyContent: 'center'
    },
    overlayContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 30
    },
    legendStyle: {
        width: 15, 
        height: 15, 
        borderRadius: 7.5, 
        marginRight: 8
    }, 
    legendContainer: {
        justifyContent: 'center', 
        padding: 20, 
        justifyContent: 'space-evenly'
    }
})