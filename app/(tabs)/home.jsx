import { TouchableOpacity, Text, View, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import styles from '../styles';
import { router } from 'expo-router';
import Feather from "react-native-vector-icons/Feather";
import CustomScreen from '../components/CustomScreen';
import ProgressBar from '../components/ProgressBar';
import HomeFrame from '../components/HomeFrame';

// import { LiquidGauge } from 'react-native-liquid-gauge'

// REFACTORING FLAGGING - Needs a Component
// 1. Screen component
// 2. Screen header component - larger subtext (user's name)
// 3. Individual panes/frames for different home panes? (ex: daily, water, notes, quick add)
// 4. Progress bar component

// Function that handles the design and display of the Home screen
const Home = () => {

    return (
        <CustomScreen
            title='Welcome back,'
            title2='Bob' // test value, need to change
            screenContent={
                // {/* View to contain all other major elements, like the frames for each quick tool */}
                <View style={{ flex: 5, paddingBottom: 50 }}>
                        {/* Wide View Frame for Daily Diet Progress */}
                        <View style={styles.viewHomeFrameWide}>
                            <Text style={[styles.frameTextWhite, { paddingVertical: 5, paddingBottom: 10 }]}>
                                Your Daily Diet Progress:
                            </Text>

                            {/* View that holds the progress bars and their labels */}
                            <View style={{ flexDirection: 'column', paddingBottom: 10, }}>

                                {/* TODO: progress of bars should be calculated using eaten/total calories */}

                                {/* test values, will have to change */}
                                {/* Progress Bars */}
                                <ProgressBar title='Calories' progress={1400} total={2000}/>
                                <ProgressBar title='Carbs' progress={200} total={300}/>
                                <ProgressBar title='Proteins' progress={100} total={170}/>
                                <ProgressBar title='Fats' progress={15} total={30}/>
                                
                            </View>
                        </View>

                        {/* Two FlatLists to hold two separate columns of quick tool frames, with frames of different heights */}
                        <View style={[styles.viewFrameContainer, { flexDirection: 'row' }]}>

                            {/* FlatList for left column, containing water goal display frame */}
                            <View style={[styles.containerColumn, { marginRight: 15 }]}>

                                {/* Water Goal Display Frame */}
                                {/* NOTE: If water bottle placement becomes an issue, check this paddingBottom */}
                                <View style={[styles.viewHomeFrameTall, { alignContent: 'center', paddingBottom: 85 }]}>

                                    {/* TouchableOpacity to make frame contents a button */}
                                    <TouchableOpacity
                                        style={{
                                            alignItems: 'center',
                                            height: '100%',
                                            width: '100%',
                                            flex: 1,
                                            flexDirection: 'column',
                                        }}
                                        onPress={() => router.push('/tracker')}>

                                        <Text style={styles.frameTextWhite}>
                                            Staying {'\n'}
                                            Hydrated?
                                        </Text>
                                        {/* WARNING: May have to change bottle to be exact size to prevent issues with it changing sizes based on screen */}
                                        {/* TODO: Add calculation of water progress */}
                                        {/* View Containing Water Bottle and Water Progress */}

                                        {/* <View styles={{flex: 1, flexDirection: 'column'}}> */}
                                        {/* <LiquidGauge
                                            config={{
                                            circleColor: '#0E1116',
                                            textSize: 0.5,
                                            textColor: 'transparent',
                                            waveTextColor: 'transparent',
                                            waveColor: '#4D79FF',
                                            circleThickness: 0,
                                            textVertPosition: 0.5,
                                            waveAnimateTime: 1000,
                                            }}
                                            // TODO: Reminder: 90 will be max value; adjust calculations accordingly.
                                            maxValue={90}
                                            value={90} // Doesnt look good at 100%, 90 looks best for max value
                                            width={150}
                                        /> */}
                                        <Image
                                            source={require('../../assets/images/water-bottle-1.png')}
                                            style={{
                                                height: '100%',
                                                width: '100%',
                                                alignItems: 'center',
                                                resizeMode: 'contain',
                                                position: 'relative',
                                                // right: -30
                                            }}
                                        />

                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* FlatList for right column, containing Quick Track and Notes frames */}
                            <View style={[styles.containerColumn, { marginLeft: 15}]}>

                                {/* Quick Track Frame */}
                                <HomeFrame title='Quick Track'/>

                                {/* Take Notes Frame */}
                                    <HomeFrame title='Notes'/>
                            </View>
                        </View>

                    
                </View>
            }
        />

    )
}
export default Home;