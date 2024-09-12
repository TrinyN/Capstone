import { TextInput, TouchableOpacity, Text, View, ScrollView, FlatList, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Feather from "react-native-vector-icons/Feather";
import { ListView } from 'react-native';
import { color } from '@rneui/base';

// Function that handles the design and display of the Home screen
const Home = () => {

    return (
        <SafeAreaView style={styles.container}>
            {/* This screen is not Scrollable, so a regular view was used. May be changed in the future. */}
            <View style={[styles.viewContainerMain, { flexGrow: 1 }]}>

                {/* The "body" of the screen, including its major elements */}
                <View style={[styles.viewContainer, { flex: 1 }]}>

                    {/* Screen header */}
                    <View style={{ marginTop: 70, flex: 1 }}>

                        <Text style={ styles.titleText }>
                            Welcome back,
                        </Text>
                        {/* TODO: Make it get the name of the user to display */}
                        <Text style={[styles.titleTextWhite, { paddingBottom: 50 }]}>
                            Bob
                        </Text>

                    </View>

                    {/* View to contain all other major elements, like the frames for each quick tool */}
                    <View style={{ flex: 5, paddingBottom: 100 }}>

                        {/* Wide View Frame for Daily Diet Progress */}
                        <View style={styles.viewHomeFrameWide}>
                            <Text style={[styles.frameTextWhite, { paddingVertical: 5, paddingBottom: 10 }]}>
                                Your Daily Diet Progress:
                            </Text>

                            {/* View that holds the progress bars and their labels */}
                            <View style={{ flexDirection: 'column', paddingBottom: 10,  }}>

                                {/* TODO: progress of bars should be calculated using eaten/total calories */}
                                {/* Calorie Progress */}
                                <View style={{ flexDirection: 'row',  }} >
                                    <Text style={[styles.homeProgressLabelText, { color: '#CB9CF2', flex: 1 }]}>
                                        Calories
                                    </Text>
                                    <Progress.Bar
                                        progress={0.5}
                                        color={'#CB9CF2'}
                                        unfilledColor={'#0E1116'}
                                        height={20}
                                        width={200}
                                        borderRadius={15}
                                        style={{ marginBottom: 5 }}>
                                        <Text style={[styles.homeProgressBarTextLeft, { position: 'absolute', flex: 0 }]}>
                                            1400
                                        </Text>
                                    </Progress.Bar>
                                </View>

                                {/* Carbs progress */}
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={[styles.homeProgressLabelText, { color: '#80FF72', flex: 1 }]}>
                                        Carbs
                                    </Text>
                                    <Progress.Bar
                                        progress={0.5}
                                        color={'#80FF72'}
                                        unfilledColor={'#0E1116'}
                                        height={20}
                                        width={200}
                                        borderRadius={15}
                                        style={{ marginBottom: 5 }}>
                                        <Text style={[styles.homeProgressBarTextLeft, { position: 'absolute', flex: 0 }]}>
                                            250
                                        </Text>
                                    </Progress.Bar>
                                </View>

                                {/* Proteins progress */}
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={[styles.homeProgressLabelText, { color: '#7EE8FA', flex: 1 }]}>
                                        Proteins
                                    </Text>
                                    <Progress.Bar
                                        progress={0.5}
                                        color={'#7EE8FA'}
                                        unfilledColor={'#0E1116'}
                                        height={20}
                                        width={200}
                                        borderRadius={15}
                                        style={{ marginBottom: 5 }}>
                                        <Text style={[styles.homeProgressBarTextLeft, { position: 'absolute', flex: 0 }]}>
                                            100
                                        </Text>
                                    </Progress.Bar>
                                </View>

                                {/* Fats progress */}
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={[styles.homeProgressLabelText, { color: '#FFF07C', flex: 1 }]}>
                                        Fats
                                    </Text>
                                    <Progress.Bar
                                        progress={0.5}
                                        color={'#FFF07C'}
                                        unfilledColor={'#0E1116'}
                                        height={20}
                                        width={200}
                                        borderRadius={15}
                                        style={{ marginBottom: 5 }}>
                                        <Text style={[styles.homeProgressBarTextLeft, { position: 'absolute', flex: 0 }]}>
                                            15
                                        </Text>
                                    </Progress.Bar>
                                </View>
                            </View>
                        </View>

                        {/* Two FlatLists to hold two separate columns of quick tool frames, with frames of different heights */}
                        <View style={[styles.viewFrameContainer, { flexDirection: 'row' }]}>

                            {/* FlatList for left column, containing water goal display frame */}
                            <View style={[styles.containerColumn, { marginRight: 15 }]}>

                                {/* Water Goal Display Frame */}
                                {/* NOTE: If water bottle placement becomes an issue, check this paddingBottom */}
                                <View style={[styles.viewHomeFrameTall, {alignContent: 'center', paddingBottom: 85}]}> 

                                    {/* TouchableOpacity to make frame contents a button */}
                                    <TouchableOpacity
                                        style={{
                                            alignItems: 'center',
                                            height: '100%',
                                            width: '100%'
                                        }}
                                        onPress={() => router.push('/tracker')}> 
                                        <Text style={styles.frameTextWhite}>
                                            Staying {'\n'}
                                            Hydrated?
                                        </Text>
                                        {/* TODO: Add bottle's animation */}
                                        {/* Water bottle + animation */}
                                        {/* WARNING: May have to change bottle to be exact size to prevent issues with it changing sizes based on screen */}
                                        <Image
                                            source={require('../../assets/images/water-bottle-1.png')}
                                            style={{
                                                // paddingVertical: 20,
                                                height: '100%',
                                                width: '100%',
                                                alignItems: 'center',
                                                resizeMode: 'contain',
                                                // alignSelf: 'center',
                                                marginLeft: 10       // May have to be changed to make slightly off-left instead of centered
                                            }}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>

                            {/* FlatList for right column, containing Quick Track and Notes frames */}
                            <View style={[styles.containerColumn, { marginLeft: 15 }]}>

                                {/* Quick Track Frame */}
                                <View style={[styles.viewHomeFrameNormal, { marginBottom: 20 }]}>

                                    {/* Touchable Opacity to make entire frame a button */}
                                    {/* TODO: Add popup for quick tracker */}
                                    <TouchableOpacity
                                        style={{
                                            alignItems: 'center',
                                            height: '100%',
                                            width: '100%'
                                        }}
                                        onPress={() => router.push('/tracker')}>
                                        <Text style={styles.frameTextWhite}>
                                            Quick Track
                                        </Text>
                                        {/* How to fill pruple with dark plus (~Figma)??? */}
                                        {/* Issue: SVG (including stroke and fill) no long supported for feather */}
                                        <Feather name='plus-circle'
                                            size={55}
                                            color={'#CB9CF2'}
                                        />
                                    </TouchableOpacity>

                                </View>

                                {/* Take Notes Frame */}
                                <View style={styles.viewHomeFrameNormal}>

                                    {/* Touchable Opacity for making entire Notes frame a button */}
                                    <TouchableOpacity
                                        style={{
                                            alignItems: 'center',
                                            height: '100%',
                                            width: '100%'
                                        }}
                                        onPress={() => router.push('/home')}>
                                        <Text style={styles.frameTextWhite}>
                                            Notes
                                        </Text>
                                        <Feather name='edit-3' size={55} color={'#CB9CF2'} />
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </View>

                    </View>

                </View>


            </View>
        </SafeAreaView>
    )
}
export default Home;