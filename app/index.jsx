import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, Image, View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from 'expo-router';
import CustomButton2 from './components/functional/CustomButton2';
import styles from './styles';

import {
    useFonts,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
} from '@expo-google-fonts/inter';
import firestore from '@react-native-firebase/firestore';

// This initializes Firestore (if needed) when your app starts
const firestoreInstance = firestore();

export default function App() {

    let [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_200ExtraLight,
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
        Inter_900Black,
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.viewContainer}>

                    <View style={{flex: 4}}>
                        <Text style={[localStyle.welcomeText]}>
                            Welcome to
                        </Text>
                        <Text style={localStyle.logoText}>
                            CaloNavo
                        </Text>
                        <View style={localStyle.imgView}>
                            <Image
                                source={require('../assets/images/calonavo-logo.png')}
                                style={localStyle.logo}
                            />
                        </View>
                    </View>

                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Text style={localStyle.sloganText}>
                            Here to help{' '}
                            <Text style={{color: '#CB9CF2'}}>navogate{' '}</Text>
                            <Text>your way to a better diet!</Text>
                        </Text>
                    </View>

                    <View style={localStyle.buttonView}>
                        <Text style={[styles.defaultText, { textAlign: 'center', }]}>
                            Don't have an account yet?
                        </Text>
                        
                        {/* Signup button */}
                        <CustomButton2 type='normal' text='Get Started' onPress={() => router.push('/sign-up')}/>
                        {/* Divider */}
                        <View style={localStyle.divider}>
                            <View style={localStyle.line} />
                            <Text style={[styles.defaultText, { marginHorizontal: 10 }]}>
                                Otherwise
                            </Text>
                            <View style={localStyle.line} />
                        </View>
                        {/* Signin button */}
                        <CustomButton2 type='normal' text='Log In' onPress={() => router.push('/sign-in')}/>
                    </View>
                </View>
                {/* Status bar of mobile device */}
                <StatusBar backgroundColor='#0E1116' style='light'/>
            </ScrollView>
        </SafeAreaView>
    )
}

const localStyle = StyleSheet.create({
    logoText: {
        color: '#CB9CF2',                   // #0E1116
        fontSize: 50,
        textAlign: 'center',
        fontFamily: 'Inter_700Bold',
        // textShadowColor: '#CB9CF2',      // Options to make background glow
        // textShadowOffset: {width:0, height:0},
        // textShadowRadius: 5
    },
    welcomeText:{                           // Maybe find better font?
        color: '#CB9CF2',
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Inter_700Bold',
         paddingTop: 100
    },
    imgView:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    logo:{
        width: '90%', 
        height: '90%', 
        resizeMode: 'contain',
    },
    sloganText:{
        fontSize: 20, 
        color: '#F2F4F3', 
        paddingHorizontal: 30, 
        paddingBottom: 10, 
        textAlign: 'center' ,
        fontFamily: 'Inter_400Regular',
    },
    buttonView:{
        flex: 2, 
        paddingTop: 30, 
        paddingBottom: 90, 
        justifyContent: 'center'
    },
    divider:{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    line:{
        flex: 1, 
        height: 1, 
        backgroundColor: '#CB9CF2' 
    }
})