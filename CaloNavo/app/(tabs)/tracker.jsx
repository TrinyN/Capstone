import { TextInput, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Feather from "react-native-vector-icons/Feather";

const Tracker = () => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <View style={[styles.viewContainer, { flex: 1 }]}>

                    <View style={{ marginTop: 70, flex: 1 }}>
                        <Text style={[styles.titleText, { paddingBottom: 10 }]}>
                            Tracker
                        </Text>

                    </View>
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}
export default Tracker;