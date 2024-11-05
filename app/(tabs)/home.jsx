import { Text, View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import CustomScreen from '../components/structural/CustomScreen';
import ProgressBar from '../components/functional/ProgressBar';
import HomeFrame from '../components/structural/HomeFrame';
import AddNotes from '../components/functional/AddPopUps/AddNotes';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Function that handles the design and display of the Home screen
const Home = () => {
    
    const [addNotesVisible, setAddNotesVisible] = useState(false);
    const [userName, setUserName] = useState("");

    // Change visibility of add notes pop up
    const toggleNotesOverlay = () => {
        setAddNotesVisible(!addNotesVisible);
    }

    // Searches database for user's username
    const getUsername = async () => {
        try{
            const userID = auth().currentUser.uid;
            const userDoc = await firestore().collection('Users').doc(userID).get();
            setUserName(userDoc.data().username)
            return
        } catch (e){
            alert(e.message)
        }

    }

    useEffect(() => {
        getUsername();
    }, []);

    return (
        <CustomScreen
            title='Welcome back,'
            title2={userName}
            screenContent={
                // View to contain all other major elements, like the frames for each quick tool
                <View style={{ flex: 5 }}>
                    {/* Wide View Frame for Daily Diet Progress */}
                    <View style={localStyle.viewHomeFrameWide}>
                        <Text style={[localStyle.summTitle]}>
                            Your Daily Diet Progress:
                        </Text>

                        {/* View that holds the progress bars and their labels */}
                        <View style={{ flexDirection: 'column'}}>
                            {/* TODO: progress of bars should be calculated using eaten/total calories */}
                            {/* test values, will have to change */}
                            {/* Progress Bars */}
                            <ProgressBar title='Calories' progress={1400} total={2000} />
                            <ProgressBar title='Carbs' progress={200} total={300} />
                            <ProgressBar title='Proteins' progress={100} total={170} />
                            <ProgressBar title='Fats' progress={15} total={30} />
                        </View>
                    </View>
                    {/* Two FlatLists to hold two separate columns of quick tool frames, with frames of different heights */}
                    <View style={[localStyle.viewFrameContainer]}>

                        {/* FlatList for left column, containing water goal display frame */}
                        <View style={[localStyle.containerColumn, { marginRight: 15 }]}>
                            {/* Water Goal Display Frame */}
                            {/* NOTE: If water bottle placement becomes an issue, check this paddingBottom */}
                            <HomeFrame title='Staying Hydrated?' />
                        </View>

                        {/* FlatList for right column, containing Quick Track and Notes frames */}
                        <View style={[localStyle.containerColumn, { marginLeft: 15 }]}>
                            {/* Quick Track Frame */}
                            <HomeFrame title='Quick Track' />
                            {/* Take Notes Frame */}
                            <HomeFrame title='Notes' 
                                toggleNotesOverlay={toggleNotesOverlay}
                            />
                        </View>
                    </View>
                    <AddNotes
                        toggleNotesOverlay={toggleNotesOverlay}
                        addNotesVisible={addNotesVisible}
                    />
                </View>
            }
        />
    )
}
export default Home;

const localStyle = StyleSheet.create({
    viewFrameContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: '#0E1116',
        paddingVertical: 30,
        flex: 2,                            // Adjust to balance frame proportions on screen
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    viewHomeFrameWide: {                    // Example: Daily Diet Progess Frame, Home
        height: '100%',
        width: '100%',
        backgroundColor: '#1F2938',
        paddingVertical: 15,
        paddingHorizontal: '5%',
        flex: 1,
        justifyContent: 'space-between',
        borderRadius: 8
    },
    containerColumn: {                      // Example: Columns of home screen
        height: '100%',
        width: '100%',
        backgroundColor: '#0E1116',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    summTitle: {
        color: '#F2F4F3',
        fontSize: 20,
        paddingTop: 5, 
        paddingBottom: 20,
        fontFamily: 'Inter_600SemiBold',
        textAlign: 'center',
    },
})