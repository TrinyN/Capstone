// // 
// // Custom Component for Log In and Sign Up (1) pages.
// // Header, 
// // 

// import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import React, { useState } from 'react';
// import Feather from "react-native-vector-icons/Feather";
// import QuestionAnswer from "./QuestionAnswer";
// import CustomButton2 from "./CustomButton2";

// // Is props needed? May not because of end of file styling
// const AccessPage = (props) => {

//     // functions, vars?

//     // Return the generic component
//     return (
//         <SafeAreaView style={apStyle.container}>

//             <View style={apStyle.backButtonView}>
//                 <TouchableOpacity style={apStyle.backButton}onPress={() => router.push('')}>
//                    <Feather name="chevron-left" size={35} color="#F2F4F3"/>
//                 </TouchableOpacity>
//             </View>

//             <View style={apStyle.bodyView}>

//                 <View style={apStyle.headerView}>
//                     {/* Change greeting depending on login or sign up */}
//                     <Text>{props.title}</Text>
//                     <Text>{props.greeting}</Text>
//                 </View>

//                 {/* email and password; conditional for password to get eye icon?*/}

//                 <View style={apStyle.buttonContainer}>
                    
//                     <CustomButton2 isGoogle={false}
//                         text='Signup' 
//                         onPress={ () => { router.push('/home') }}
//                     />

//                     <View style={apStyle.dividerView}>
//                         <View style={apStyle.hrzLine}></View>
//                         <Text style={apStyle.smallText}></Text>
//                         <View style={apStyle.hrzLine}></View>
//                     </View>

//                     <CustomButton2 isGoogle={true} 
//                         onPress={ () => { router.push('/home') }}
//                     />

//                     {/* STOPPED HERE */}
//                     <Text style={[styles.smallText, { fontSize: 12, color: '#828282' }]}>
//                         By clicking continue, you agree to our{' '}
//                         <Text style={{ color: '#F2F4F3' }}>
//                             Terms of Service{' '}
//                         </Text>
//                         <Text>
//                             and{' '}
//                         </Text>
//                         <Text style={{ color: '#F2F4F3' }}>
//                             Privacy Policy
//                         </Text>
//                     </Text>

//                     <Text style={[styles.smallText, {}]}>
//                         Don't have an account?{' '}

//                         <Text onPress={ () => { router.push('/sign-up') } }>

//                             <Text style={{ color: '#CB9CF2', textDecorationLine: "underline" }}>
//                                 Sign Up
//                             </Text>
//                         </Text>
//                     </Text>

//                     {/* END OF STOPPING POINT */}

//                 </View>
//             </View>
//         </SafeAreaView>
//     )

// }

// // Access Page Styles
// const apStyle = StyleSheet.create({
//     container: {
//         height: '100%',
//         flexGrow: 1,
//         backgroundColor: '#0E1116'
//     },
//     backButtonView: {
//         marginTop: 40,
//         paddingLeft: 25
//     },
//     bodyView: {
//         height: '100%',
//         backgroundColor: '#0E1116',
//         paddingHorizontal: 35,
//         flex: 1
//     },
//     headerView: {
//         marginTop: 30,
//         flex: 1
//     },
//     backButton: {
//         width: 35
//     },
//     buttonContainer: {

//     },
//     dividerView: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     hrzLine: {
//         flex: 1,
//         height: 1,
//         backgroundColor: '#CB9CF2'
//     },
//     smallText:{
//         color: '#CB9CF2',
//         fontSize: 14,
//         fontFamily: 'Inter_400Regular',
//         textAlign: 'center',
//         paddingVertical: 5,
//         paddingHorizontal: 10
//     }

    


// })