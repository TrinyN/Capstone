import { TouchableOpacity, Text, View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { router } from 'expo-router';

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
    toggleLogOut
}) => {
    return (
        <SafeAreaView style={apStyle.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Render back button if needed */}
                {hasBackButton &&
                    <View style={apStyle.backButtonContainer}>
                        <TouchableOpacity style={{ width: 35 }} onPress={() => router.back()}>
                            <Feather name="chevron-left" size={35} color="#F2F4F3" />
                        </TouchableOpacity>
                    </View>
                }

                {/* The "body" of the screen, including its major elements */}
                <View style={[apStyle.viewContainer, { flex: 1 }]}>

                    {/* Screen Header */}
                    <View style={apStyle.headerContainer}>
                        {/* NOTE: Flex looks strange on very large (incompatible) screens like iPad, web */}

                        <Text style={[apStyle.titleText, { flex: 1, flexDirection: 'row' }]}>
                            {title} {" "}
                            {/* TODO: Make this text get the current week */}
                            <Text style={[apStyle.titleTextWhite]}>
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
                <Text style={[apStyle.defaultWhiteText, { fontFamily: 'Inter_200ExtraLight', fontSize: 20, paddingBottom: 30 }]}>
                    {info}
                </Text>

                {screenContent}

            </View>
        </ScrollView>
        </SafeAreaView >

    )
}

export default CustomScreen

const apStyle = StyleSheet.create({
    container: {
        height: '100%',
        flexGrow: 1,
        backgroundColor: '#0E1116'
    },
    viewContainer: {
        height: '100%',
        backgroundColor: '#0E1116',
        paddingHorizontal: 35,
        flex: 1
    },
    titleText: {
        color: '#CB9CF2',
        fontSize: 28,
        fontFamily: 'Inter_600SemiBold',
    },
    titleTextWhite: {
        color: '#F2F4F3',
        fontSize: 28,
        fontFamily: 'Inter_600SemiBold',
    },
    defaultWhiteText: {
        color: '#F2F4F3',
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
    },
    backButtonContainer: {
        marginTop: 40, marginBottom: 10, paddingLeft: 25
    },
    headerContainer: {
        marginTop: 70, flexDirection: 'row', paddingBottom: 10, alignItems: 'center'
    },
    text: {
        fontFamily: 'Inter_200ExtraLight', fontSize: 20, paddingBottom: 30
    }
})