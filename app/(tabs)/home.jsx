import { Text, View, StyleSheet } from 'react-native';
import styles from '../styles';
import CustomScreen from '../components/structural/CustomScreen';
import ProgressBar from '../components/functional/ProgressBar';
import HomeFrame from '../components/structural/HomeFrame';


// import { LiquidGauge } from 'react-native-liquid-gauge'

// REFACTORING FLAGGING - Needs a Component
// 1. Screen component
// 2. Screen header component - larger subtext (user's name)
// 3. Individual panes/frames for different home panes? (ex: daily, water, notes, quick add)
// 4. Progress bar component DONE

// Function that handles the design and display of the Home screen
const Home = () => {

    return (
        <CustomScreen
            title='Welcome back,'
            title2='Bob' // test value, need to change
            screenContent={
                // {/* View to contain all other major elements, like the frames for each quick tool */}
                <View style={{ flex: 5, paddingBottom: 20 }}>
                    {/* Wide View Frame for Daily Diet Progress */}
                    <View style={homeStyles.viewHomeFrameWide}>
                        <Text style={[styles.frameTextWhite, { paddingVertical: 5, paddingBottom: 15 }]}>
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
                    <View style={[homeStyles.viewFrameContainer]}>

                        {/* FlatList for left column, containing water goal display frame */}
                        <View style={[homeStyles.containerColumn, { marginRight: 15 }]}>

                            {/* Water Goal Display Frame */}
                            {/* NOTE: If water bottle placement becomes an issue, check this paddingBottom */}
                            <HomeFrame title='Staying Hydrated?' />
                        </View>

                        {/* FlatList for right column, containing Quick Track and Notes frames */}
                        <View style={[homeStyles.containerColumn, { marginLeft: 15 }]}>

                            {/* Quick Track Frame */}
                            <HomeFrame title='Quick Track' />

                            {/* Take Notes Frame */}
                            <HomeFrame title='Notes' />
                        </View>
                    </View>
                </View>
            }
        />
    )
}
export default Home;

const homeStyles = StyleSheet.create({
    viewFrameContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: '#0E1116',
        paddingVertical: 30,
        flex: 2, // Adjust this to balance proportions of home screen top and bottom
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    // Example: Daily Diet Progess Frame, Home
    viewHomeFrameWide: {
        height: '100%',
        width: '100%',
        backgroundColor: '#1F2938',
        paddingVertical: 15,
        paddingHorizontal: '5%',
        flex: 1,
        justifyContent: 'space-between',
        borderRadius: 8
    },
    // Example: Columns of home screen
    containerColumn: {
        height: '100%',
        width: '100%',
        backgroundColor: '#0E1116',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
})