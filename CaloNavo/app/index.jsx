import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Button, ScrollView, Text, Image, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "../components/CustomButton";
import { Redirect, router } from 'expo-router';
import styles from './styles';


export default function App() {
    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.viewContainer}>
                <View style={{ flex: 4, marginTop: 30 }}>
                    <Text style={[styles.welcomeText, {fontSize: 24, textAlign: 'center', paddingTop: 90 }]}>
                        Welcome to
                    </Text>
                    <Text style={styles.welcomeText}>
                        CaloNavo
                    </Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text style={[styles.defaultText, { fontWeight: '300', color: '#F2F4F3', paddingLeft: 50, paddingRight: 50, textAlign: 'center' }]}>
                        Here to help navogate your way to a better diet
                    </Text>
                </View>
                <View style={{ flex: 2, paddingBottom: 35, justifyContent: 'center' }}>
                    <Text style={[styles.defaultText, { textAlign: 'center', }]}>
                        Don't have an account yet?
                    </Text>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>

                    <Text style={[styles.defaultText, { textAlign: 'center', }]}>
                        Otherwise
                    </Text>

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