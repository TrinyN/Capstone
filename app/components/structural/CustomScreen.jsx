import { TouchableOpacity, Text, View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { router } from 'expo-router';
import styles from '../../styles';

{/* need to make left and right icons, buttons */ }
// renders outer screens, title, and if needed additional information, back button, and options button
const CustomScreen = ({
    title,
    title2,
    hasBackButton,
    hasOptions,
    toggleOptions,
    info,
    screenContent,
    hasLogOutButton,
    toggleLogOut,
    isTrackerScreen
}) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Render back button if needed */}
                {hasBackButton &&
                    <View style={localStyle.backButtonContainer}>
                        <TouchableOpacity style={{ width: 35 }} onPress={() => router.back()}>
                            <Feather name="chevron-left" size={35} color="#F2F4F3" />
                        </TouchableOpacity>
                    </View>
                }
                {/* The "body" of the screen, including its major elements */}
                <View style={[styles.viewContainer, { flex: 1 }]}>
                    {/* Screen Header */}
                    <View style={localStyle.headerContainer}>
                        {/* NOTE: Flex looks strange on very large (incompatible) screens like iPad, web */}
                        <Text style={localStyle.titleText}>
                            {title} {" "}
                            {/* TODO: Make this text get the current week */}
                            <Text style={localStyle.titleTextWhite}>
                                {title2}
                            </Text>
                        </Text>

                        {hasOptions &&
                            <TouchableOpacity onPress={toggleOptions} style={{ width: 30 }}>
                                <Feather name="more-vertical" size={30} color="#CB9CF2" />
                            </TouchableOpacity>
                        }
                        {hasLogOutButton &&
                            <TouchableOpacity onPress={toggleLogOut} style={{ width: 30 }}>
                                <Feather name="log-out" size={30} color="#CB9CF2" />
                            </TouchableOpacity>
                        }
                    </View>
                    <Text style={localStyle.infoText}>
                        {info}
                    </Text>
                    {screenContent}
                </View>

                {isTrackerScreen &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
                        <Feather name={'chevron-left'} size={30} color={'#CB9CF2'} />
                        <Feather name={'chevron-right'} size={30} color={'#CB9CF2'} />
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}
export default CustomScreen

const localStyle = StyleSheet.create({
    titleText: {
        color: '#CB9CF2',
        fontSize: 28,
        fontFamily: 'Inter_600SemiBold',
        flex: 1,
        flexDirection: 'row'
    },
    titleTextWhite: {
        color: '#F2F4F3',
        fontSize: 28,
        fontFamily: 'Inter_600SemiBold',
    },
    backButtonContainer: {
        marginTop: 40,
        marginBottom: 10,
        paddingLeft: 25
    },
    headerContainer: {
        marginTop: 70,
        flexDirection: 'row',
        paddingBottom: 10,
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Inter_200ExtraLight',
        fontSize: 20,
        paddingBottom: 30
    },
    infoText: {
        color: '#F2F4F3',
        fontFamily: 'Inter_200ExtraLight',
        fontSize: 20,
        paddingBottom: 30
    }
})