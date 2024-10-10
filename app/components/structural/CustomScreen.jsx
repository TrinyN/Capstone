import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../../styles';
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
    screenContent
}) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Render back button if needed */}
                {hasBackButton &&
                    <View style={{ marginTop: 40, marginBottom: 10, paddingLeft: 25 }}>
                        <TouchableOpacity style={{ width: 35 }} onPress={() => router.back()}>
                            <Feather name="chevron-left" size={35} color="#F2F4F3" />
                        </TouchableOpacity>
                    </View>
                }

                {/* The "body" of the screen, including its major elements */}
                <View style={[styles.viewContainer, { flex: 1 }]}>

                    {/* Screen Header */}
                    <View style={{ marginTop: 70, flexDirection: 'row', paddingBottom: 10, alignItems: 'center' }}>
                        {/* NOTE: Flex looks strange on very large (incompatible) screens like iPad, web */}

                            <Text style={[styles.titleText, {flex: 1, flexDirection: 'row'}]}>
                                {title} {" "}
                                {/* TODO: Make this text get the current week */}
                                <Text style={[styles.titleTextWhite]}>
                                    {title2}
                                </Text>
                            </Text>

                        {hasOptions &&
                            <TouchableOpacity onPress={toggleOptions} style={{ width: 30 }}>
                                <Feather name="more-vertical" size={30} color="#CB9CF2" />
                            </TouchableOpacity>
                        }

                    </View>
                    <Text style={[styles.defaultWhiteText, { fontFamily: 'Inter_200ExtraLight', fontSize: 20, paddingBottom: 30 }]}>
                        {info}
                    </Text>
                    
                    {screenContent}
                    
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default CustomScreen