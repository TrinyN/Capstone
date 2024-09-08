import { TextInput, TouchableOpacity, Text, View, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Feather from "react-native-vector-icons/Feather";
import { ListView } from 'react-native';

// Function that handles the design and display of the Home screen
const Home = () => {

    return (
        <SafeAreaView style={styles.container}>
            {/* This screen is not Scrollable, so a regular view was used. May be changed in the future. */}
            <View style={[styles.viewContainerMain, { flex: 1 }]}>

                {/* The "body" of the screen, including its major elements */}
                <View style={[styles.viewContainer, { flex: 1 }]}>

                    {/* Screen header */}
                    <View style={{ marginTop: 30, flex: 1 }}>

                        <Text style={styles.titleText}>
                            Welcome back,
                        </Text>
                        {/* TODO: Make it get the name of the user to display */}
                        <Text style={[styles.titleTextWhite, { paddingBottom: 10 }]}>
                            Bob
                        </Text>
                    </View>

                    {/* View to contain all other major elements, like the frames for each quick tool */}
                    <View style={{ flex: 5, paddingBottom: 50 }}>
                        
                        {/* Wide View Frame for Daily Diet Progress */}
                        <View style={styles.viewHomeFrameWide}>
                            <Text style={styles.frameTextWhite}>
                                Your Daily Diet Progress:
                            </Text>
                        </View>

                        {/* Two FlatLists to hold two separate columns of quick tool frames, with frames of different heights */}

                        <View style={ [styles.viewFrameContainer, { flexDirection: 'row' }]}>

                            {/* FlatList for left column, containing water goal display frame */}
                            <View style={ [styles.containerColumn, { marginRight: 15 }] }>

                                {/* Water Goal Display Frame */}
                                <View style={styles.viewHomeFrameTall}>
                                    <Text style={styles.frameTextWhite}>
                                        Water Goal
                                    </Text>
                                </View>
                            </View>

                            {/* FlatList for right column, containing Quick Track and Notes frames */}
                            <View style={ [ styles.containerColumn, { marginLeft: 15 } ] }>

                                {/* Quick Track Frame */}
                                <View style={ [ styles.viewHomeFrameNormal, { marginBottom: 20 } ] }>
                                    <Text style={styles.frameTextWhite}>
                                        Quick Track
                                    </Text>
                                </View>
                                {/* Take Notes Frame */}
                                <View style={styles.viewHomeFrameNormal}>
                                    <Text style={styles.frameTextWhite}>
                                        Notes
                                    </Text>
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