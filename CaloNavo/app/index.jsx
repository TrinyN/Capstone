// import { StatusBar } from 'expo-status-bar';
// import { TouchableOpacity, Text, Image, View } from 'react-native';
// import { SafeAreaView } from "react-native-safe-area-context";
// import { router } from 'expo-router';
// import styles from './styles';

// import {
//     useFonts,
//     Inter_100Thin,
//     Inter_200ExtraLight,
//     Inter_300Light,
//     Inter_400Regular,
//     Inter_500Medium,
//     Inter_600SemiBold,
//     Inter_700Bold,
//     Inter_800ExtraBold,
//     Inter_900Black,
//   } from '@expo-google-fonts/inter';

// export default function App() {

//     let [fontsLoaded] = useFonts({
//         Inter_100Thin,
//         Inter_200ExtraLight,
//         Inter_300Light,
//         Inter_400Regular,
//         Inter_500Medium,
//         Inter_600SemiBold,
//         Inter_700Bold,
//         Inter_800ExtraBold,
//         Inter_900Black,
//       });

//     return (
//         <SafeAreaView style={[styles.container]}>
//             <View style={styles.viewContainer}>
//                 <View style={{ flex: 4, marginTop: 30 }}>
//                     <Text style={[styles.welcomeText, { fontSize: 24, textAlign: 'center', paddingTop: 90}]}>
//                         Welcome to
//                     </Text>
//                     <Text style={styles.welcomeText}>
//                         CaloNavo
//                     </Text>

//                     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                         <Image
//                             source={require('../assets/images/calonavo-logo.png')}
//                             style={{
//                                 width: '80%',
//                                 height: '90%',
//                                 resizeMode: 'contain',
//                             }}
//                         />
//                     </View>
//                 </View>
//                 <View style={{ flex: 1, justifyContent: 'flex-end' }}>
//                     <Text style={[styles.defaultWhiteText, {fontSize: 20, color: '#F2F4F3', paddingHorizontal: 50, paddingBottom: 10, textAlign: 'center' }]}>
//                         Here to help navogate your way to a better diet!
//                     </Text>

//                 </View>
//                 <View style={{ flex: 2, paddingBottom: 35, justifyContent: 'center' }}>
//                     <Text style={[styles.defaultText, { textAlign: 'center', }]}>
//                         Don't have an account yet?
//                     </Text>

//                     <TouchableOpacity style={styles.button} onPress={() => router.push('/sign-up')}>
//                         <Text style={styles.buttonText}>Get Started</Text>
//                     </TouchableOpacity>

//                     <Text style={[styles.defaultText, { textAlign: 'center', }]}>
//                         Otherwise
//                     </Text>

//                     <TouchableOpacity style={styles.button} onPress={() => router.push('/sign-in')}>
//                         <Text style={styles.buttonText}>Log In</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>

//             <StatusBar backgroundColor='#0E1116'
//                 style='light'
//             />
//         </SafeAreaView>
//     )
// }


import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from 'expo-router';
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
        <SafeAreaView style={[styles.container]}>
            <View style={styles.viewContainer}>
                <View style={{ flex: 4, marginTop: 30 }}>
                    <Text style={[styles.welcomeText, { fontSize: 24, textAlign: 'center', paddingTop: 90 }]}>
                        Welcome to
                    </Text>
                    <Text style={styles.welcomeText}>
                        CaloNavo
                    </Text>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../assets/images/calonavo-logo.png')}
                            style={{
                                width: '80%',
                                height: '90%',
                                resizeMode: 'contain',
                            }}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text style={[styles.defaultWhiteText, { fontSize: 20, color: '#F2F4F3', paddingHorizontal: 50, paddingBottom: 10, textAlign: 'center' }]}>
                        Here to help navogate your way to a better diet!
                    </Text>

                </View>
                <View style={{ flex: 2, paddingBottom: 35, justifyContent: 'center' }}>
                    <Text style={[styles.defaultText, { textAlign: 'center', }]}>
                        Don't have an account yet?
                    </Text>

                    <TouchableOpacity style={styles.button} onPress={() => router.push('/sign-up')}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#CB9CF2' }} />
                        <Text style={[styles.defaultText, { marginHorizontal: 10 }]}>
                            Otherwise
                        </Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#CB9CF2' }} />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => router.push('/sign-in')}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <StatusBar backgroundColor='#0E1116'
                style='light'
            />
        </SafeAreaView>
    )
}