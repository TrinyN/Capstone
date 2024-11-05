import { TouchableOpacity, Text, View, FlatList, StyleSheet } from 'react-native';
import styles from '../styles';
import { useState, useEffect } from 'react';
import { Overlay } from '@rneui/base';
import { useRouter } from 'expo-router';
import ProfileItem from '../components/functional/ProfileItem';
import { userDataItems } from '../constants/profileData';
import CustomScreen from '../components/structural/CustomScreen';
import CustomButton2 from '../components/functional/CustomButton2';
import CustomPieChart from '../components/functional/PieChart';
import CustomPopUp2 from '../components/structural/CustomPopUp2';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// problems:
// looks weird on android (feather icon positions doesnt line up with drop down icon)
// make email not be editable and no edit icon next to it
// change data types ex: birth date should be a date and allow user to pick from calendar maybe, height should allow user to input value for ft and also inches
// should save button disappear if no changes?

// REFACTORING FLAGGING - Needs a Component
// 3. Render list component(s) - list item
// 5. Pie chart container? - Not too necessary though
// 6. Small button component? ~ CustomButton implementation?

const Profile = () => {
    const router = useRouter();

    // test data for macro ratio goal
    const [series, setSeries] = useState([15, 35, 40]);

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

    const { userInfo, setUserInfo } = userDataItems();

    handleLogOut = async () => {
        try {
            await auth().signOut();
            router.push('/');
        }
        catch (error) {
            alert('Log out failed: ' + error.message);
        }
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
                    <View style={{ paddingTop: 30 }}>
                        <CustomPieChart series={series} />
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
                    <CustomPopUp2
                        visible={visibleLogOut}
                        toggleVisible={toggleLogOut}
                        handleConfirmPress={() => handleLogOut()}
                        title={"Are you sure you want to log out?"}
                        buttonTitle={"Log Out"}
                    />
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
