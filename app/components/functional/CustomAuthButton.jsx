import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import CustomButton2 from './CustomButton2';
import styles from '../../styles';
import auth from '@react-native-firebase/auth';
// import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

const CustomAuthButton = ({ authType, handleAuth, email, password }) => {

    // GoogleSignin.configure({
    //     webClientId: "888939824219-u4cesn1jemia72a04fjsqofc8qniiou3.apps.googleusercontent.com",
    // });

    let linkTitle;
    let routerPush;
    // async function googleLogIn() {
    //     // Check if your device supports Google Play
    //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    //     // Get the users ID token
    //     const signInResult = await GoogleSignin.signIn();

    //     // Try the new style of google-sign in result, from v13+ of that module
    //     idToken = signInResult.data?.idToken;
    //     if (!idToken) {
    //         // if you are using older versions of google-signin, try old style result
    //         idToken = signInResult.idToken;
    //     }
    //     if (!idToken) {
    //         throw new Error('No ID token found');
    //     }

    //     // Create a Google credential with the token
    //     const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data.token);

    //     // Sign-in the user with the credential
    //     return auth().signInWithCredential(googleCredential);
    // }

    // const googleSignOut = async () => {
    //     try {
    //         await GoogleSignin.signOut();
    //         // setState({ user: null }); // Remember to remove the user from your app's state as well
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    if (authType == 'Log In') {
        linkTitle = "Sign Up"
        switchAuthType = '/sign-up'
        handlePress = () => { handleAuth() }
        // handleGoogle = () => googleLogIn()

        routerPush = '/home' // need to authorize first, google button needs to be changed too
    }
    else {
        linkTitle = "Log In"
        switchAuthType = '/sign-in'
        handlePress = () => {
            router.push({
                pathname: '/sign-up-2',
                params: { email: email, password: password },
            });
        }
        // handleGoogle = () => { googleSignOut() }
    }
    return (
        // {/* View to hold the buttons at the bottom */}
        <View style={localStyle.container}>
            <CustomButton2 type='normal'
                text={authType}
                onPress={handlePress}
            >
            </CustomButton2>

            <View style={localStyle.subContainer}>
                <View style={localStyle.dividerLine} />
                {/* Divider between buttons */}
                <Text style={[styles.smallText, { color: '#CB9CF2', paddingHorizontal: 5 }]}>
                    or continue with
                </Text>
                <View style={localStyle.dividerLine} />
            </View>

            <CustomButton2 type='google'
                onPress={() => { router.push(routerPush) }}>
            </CustomButton2>

            {/* <GoogleSigninButton
                // onPress={() => handleGoogle
                //     .then(() => {
                //         console.log('User signed in using Google');
                //         nagivation.nagivate("Home");
                //     })
                //     .catch(error => {
                //         console.log(error)
                //     })
                // }
                // size={GoogleSigninButton.Size.Wide}
style={{width: 380, borderRadius: 100000}}

            /> */}

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
            <View style={localStyle.subContainer}>

                {/* Reroute to Sign Up */}
                <Text style={[styles.smallText]}>
                    Don't have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => router.push(switchAuthType)}>
                    <Text style={[styles.smallText, {
                        color: '#CB9CF2',
                        textDecorationLine: "underline"
                    }]}
                    >
                        {linkTitle}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default CustomAuthButton

const localStyle = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        paddingBottom: 10,
        flex: 1
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#CB9CF2'
    },
})