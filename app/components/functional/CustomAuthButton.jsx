import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import CustomButton2 from './CustomButton2';

const CustomAuthButton = ({
    authType
}) => {
    let linkTitle;
    let routerPush;

    if (authType == 'Log In') {
        linkTitle = "Sign Up"
        switchAuthType = '/sign-up'
        routerPush = '/home' // need to authorize first, google button needs to be changed too
    }
    else {
        linkTitle = "Log In"
        switchAuthType = '/sign-in'
        routerPush = '/sign-up-2'
    }
    return (
        // {/* View to hold the buttons at the bottom */}
        <View style={authStyle.container}>
            <CustomButton2 type='normal'
                text={authType}
                onPress={() => { router.push(routerPush) }}>
            </CustomButton2>

            <View style={authStyle.subContainer}>
                <View style={authStyle.dividerLine} />
                {/* Divider between buttons */}
                <Text style={[authStyle.smallText, { color: '#CB9CF2' }]}>
                    or continue with
                </Text>
                <View style={authStyle.dividerLine} />
            </View>

            <CustomButton2 type='google'
                onPress={() => { router.push(routerPush) }}>
            </CustomButton2>

            {/* Disclaimers, policies */}
            <Text style={[authStyle.smallText, { color: '#828282' }]}>
                By clicking continue, you agree to our{' '}
                <Text style={{ color: '#F2F4F3' }}>
                    Terms of Service{' '}
                </Text>
                <Text>
                    and{' '}
                </Text>
                <Text style={{ color: '#F2F4F3' }}>
                    Privacy Policy
                </Text>
            </Text>
            <View style={authStyle.subContainer}>

                {/* Reroute to Sign Up */}
                <Text style={authStyle.smallText}>
                    Don't have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => router.push(switchAuthType)}>
                    <Text style={[authStyle.smallText, { color: '#CB9CF2', 
                        textDecorationLine: "underline", 
                        paddingHorizontal:0}]}
                    >
                        {linkTitle}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default CustomAuthButton          

const authStyle = StyleSheet.create({
    container:{
        justifyContent: 'flex-end', 
        paddingBottom: 10,
        flex: 1
    },
    subContainer:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    dividerLine:{
        flex: 1, 
        height: 1, 
        backgroundColor: '#CB9CF2'
    },
    smallText: {
        color: '#F2F4F3',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5
    },

})