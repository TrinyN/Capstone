import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native';
import styles from '../styles';
import { router } from 'expo-router';
import CustomButton2 from './CustomButton2';

const CustomAuthButton = ({
    authType
}) => {
    let buttonTitle;
    let routerPush;

    if (authType == 'Log In') {
        buttonTitle = "Sign Up"
        switchAuthType = '/sign-up'
        routerPush = '/home' // need to authorize first, google button needs to be changed too

    }
    else {
        buttonTitle = "Log In"
        switchAuthType = '/sign-in'
        routerPush = '/sign-up-2'
    }
    return (

        // {/* View to hold the buttons at the bottom */}
        <View style={{ justifyContent: 'flex-end', paddingBottom: 10, flex: 1 }}>
            <CustomButton2 type='normal'
                text={authType}
                onPress={() => { router.push(routerPush) }}>
            </CustomButton2>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#CB9CF2' }} />
                {/* Divider between buttons */}
                <Text style={[styles.smallText, { color: '#CB9CF2', paddingHorizontal: 10 }]}>
                    or continue with
                </Text>
                <View style={{ flex: 1, height: 1, backgroundColor: '#CB9CF2' }} />
            </View>

            <CustomButton2 type='google'
                onPress={() => { router.push(routerPush) }}> 
            </CustomButton2>

            {/* Disclaimers, policies */}
            <Text style={[styles.smallText, { fontSize: 12, color: '#828282' }]}>
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

            {/* Reroute to Sign Up */}
            <Text style={[styles.smallText, {}]}>
                Don't have an account?{' '}

                <TouchableOpacity onPress={() => router.push(switchAuthType)} style={{height: 15}}>
                    <Text style={{ color: '#CB9CF2', textDecorationLine: "underline" }}>
                        {buttonTitle}
                    </Text>
                </TouchableOpacity>
            </Text>
        </View>
    )
}

export default CustomAuthButton          