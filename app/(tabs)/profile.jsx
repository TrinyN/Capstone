import { TouchableOpacity, Text, View, FlatList, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import Feather from "react-native-vector-icons/Feather";
import { useState } from 'react';
import { Overlay } from '@rneui/base';
import { router } from 'expo-router';
import PieChart from 'react-native-pie-chart'
import ProfileItem from '../components/functional/ProfileItem';
import { userDataItems } from '../constants/profileData';



// problems:
// looks weird on android (feather icon positions doesnt line up with drop down icon)
// make email not be editable and no edit icon next to it
// change data types ex: birth date should be a date and allow user to pick from calendar maybe, height should allow user to input value for ft and also inches

// REFACTORING FLAGGING - Needs a Component
// 1. Screen component
// 2. Screen header component
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

    const [saveVisibility, setSaveVisibility] = useState(false);

    // const toggleSaveVisibility = () => {
    //     setSaveVisibility(!saveVisibility)
    // }

    // const opacity = saveVisibility ? 1: 0
    const opacity = 1

    // test data, will need to start off empty and be saved for each user
    const { userInfo, setUserInfo } = userDataItems();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                {/* The "body" of the screen view */}
                <View style={[styles.viewContainer, { flex: 1 }]}>

                    {/* Screen header */}
                    <View style={{ marginTop: 70, flexDirection: 'row', paddingBottom: 83, alignItems: 'center' }}>

                        <Text style={[styles.titleText, { flex: 1 }]}>
                            Your Profile
                        </Text>

                        {/* Log out button */}
                        <TouchableOpacity onPress={toggleLogOut} style={{ width: 30 }}>
                            <Feather name="log-out" size={30} color="#CB9CF2" />
                        </TouchableOpacity>

                    </View>


                    {/* Flat list to show profile information */}
                    <View style={{ borderRadius: 10, backgroundColor: 'rgba(27,33,43,0.5)' }}>
                        <FlatList
                            data={userInfo}
                            renderItem={({ item, index }) => <ProfileItem title={item.title} value={item.value} index={index} type={item.type} options={item.options} item={item} />}
                            keyExtractor={item => item.title}
                            scrollEnabled={false}
                        />

                    </View>

                    {/* Macro Pi Chart Container*/}
                    <View style={{ paddingTop: 30, paddingBottom: 10 }}>
                        <View style={{ flexDirection: 'row', borderRadius: 10, backgroundColor: 'rgba(27,33,43,0.5)', justifyContent: 'space-between' }}>
                            <View style={{ justifyContent: 'center', padding: 20, justifyContent: 'space-evenly' }}>

                                {/* Legend for Pie Chart*/}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: 15, height: 15, borderRadius: 7.5, marginRight: 8, backgroundColor: '#80FF72' }} />
                                    <Text style={[styles.defaultWhiteText]}>
                                        Carb {Number(Math.round((series[0] / (series[0] + series[1] + series[2]) * 100) + 'e' + 1) + 'e-' + 1)}{"%"}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: 15, height: 15, borderRadius: 7.5, marginRight: 8, backgroundColor: '#7EE8FA' }} />
                                    <Text style={styles.defaultWhiteText}>
                                        Protein {Number(Math.round((series[1] / (series[0] + series[1] + series[2]) * 100) + 'e' + 1) + 'e-' + 1)}{"%"}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: 15, height: 15, borderRadius: 7.5, marginRight: 8, backgroundColor: '#FFF07C' }} />
                                    <Text style={styles.defaultWhiteText}>
                                        Fat {Number(Math.round((series[2] / (series[0] + series[1] + series[2]) * 100) + 'e' + 1) + 'e-' + 1)}{"%"}
                                    </Text>
                                </View>
                            </View>

                            {/* Macro Pi Chart*/}
                            <View style={{ paddingVertical: 20, paddingRight: 20 }}>
                                <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor}
                                    style={{ strokeWidth: '4', stroke: '#141920' }}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{}}>
                        <View style={{ flexDirection: 'row-reverse', paddingBottom: 30, justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                // disabled={!saveVisibility}
                                style={[styles.button, { opacity, backgroundColor: '#CB9CF2', paddingVertical: 0 }]}>
                                <Text style={[styles.defaultText, { color: '#0E1116', fontSize: 14, paddingVertical: 5 }]} >
                                    Save
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Popup for log out */}
                    <Overlay isVisible={visibleLogOut} onBackdropPress={toggleLogOut} overlayStyle={{ backgroundColor: '#0E1116', borderWidth: 2, borderColor: '#CB9CF2', width: '90%' }}>

                        <View style={[{ paddingHorizontal: 8, justifyContent: 'center' }]}>
                            <Text style={[styles.defaultText, { color: '#F2F4F3', textAlign: 'center' }]}>
                                Are you sure you want to log out?
                            </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30 }}>
                                <TouchableOpacity onPress={toggleLogOut} style={[styles.button, { backgroundColor: '#0E1116', borderWidth: 1, borderColor: '#F2F4F3', width: '40%' }]}>

                                    <Text style={[styles.buttonText, { color: '#F2F4F3' }]}>Cancel</Text>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { router.push('') }} style={[styles.button, { backgroundColor: '#CB9CF2', width: '40%' }]}>
                                    <Text style={[styles.buttonText, { color: '0E1116' }]}>Log Out</Text>

                                </TouchableOpacity>

                            </View>

                        </View>

                    </Overlay>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
export default Profile;