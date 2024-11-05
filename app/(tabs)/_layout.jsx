import React from 'react'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Feather from "react-native-vector-icons/Feather";
import 'expo-dev-client';

// Function to handle the styling of the tab bar's labels
const tabBarLabelStyle = {
    paddingBottom: 2,
    fontSize: 10
};

// Function to handle the styling of the tab bar's icons
const tabBarIconStyle = {
    paddingTop: 4
};

// Function to handle the styling of the tab bar's colors
const tabBarColorStyle = {
    tabBarActiveTintColor: '#CB9CF2',
    tabBarInactiveTintColor: '#F2F4F3'
};

// Function to handled the routing of the various (tabs) screens of CaloNavo
// *** Ensure all new (tabs) screens have their own places in the stack***
const TabsLayout = () => {
    return (
        <>
            {/* Tabs for each of CaloNavo's tabs */}
            <Tabs screenOptions={{
                tabBarActiveTintColor: '#CB9CF2',
                tabBarInactiveTintColor: '#F2F4F3',
                tabBarLabelPosition: 'below-icon',
                tabBarStyle: {
                    backgroundColor: '#0E1116',
                    borderTopWidth: 1,
                    borderTopColor: '#F2F4F3',
                    height: 60,
                }
            }}>
                {/* Home tab of the main screens */}
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <Feather name="home" size={28} color={color} />
                        ),
                        tabBarColorStyle,
                        tabBarLabelStyle,
                        tabBarIconStyle
                    }}
                />
                {/* Tracker tab of the main screens */}
                <Tabs.Screen
                    name="tracker"
                    options={{
                        title: "Tracker",
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <Feather name="file-plus" size={28} color={color} />
                        ),
                        tabBarColorStyle,
                        tabBarLabelStyle,
                        tabBarIconStyle
                    }}
                />
                {/* Tracker Week tab branched from the Tracker screen. Not shown on tab bar. */}
                <Tabs.Screen
                    name="tracker-week"
                    options={{
                        title: "Tracker Week",
                        headerShown: false,
                        href: null,                 // Include as tab, but do not show in tab bar
                    }}
                />
                {/* Tracker Month tab branched from the Tracker screen. Not shown on tab bar. */}
                <Tabs.Screen
                    name="tracker-month"
                    options={{
                        title: "Tracker Month",
                        headerShown: false,
                        href: null,                 // Include as tab, but do not show in tab bar
                    }}
                />
                {/* Report tab of the main screens */}
                <Tabs.Screen
                    name="report"
                    options={{
                        title: "Report",
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <Feather name="bar-chart" size={34} color={color} />
                        ),
                        tabBarColorStyle,
                        tabBarLabelStyle,
                        tabBarIconStyle
                    }}
                />
                {/* Shopping List tab of the main screens */}
                <Tabs.Screen
                    name="shoppingList"
                    options={{
                        title: "Shopping List",
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <Feather name="shopping-cart" size={27} color={color} />
                        ),
                        tabBarColorStyle,
                        tabBarLabelStyle,
                        tabBarIconStyle
                    }}
                />
                {/* Shopping List Generation Page identical to Tracker page, but different functionality */}
                <Tabs.Screen
                    name="shoppingGenDay"
                    options={{
                        title: "Shopping Generation - Day",
                        headerShown: false,
                        href: null,                 // Include as tab, but do not show in tab bar
                    }}
                />
                {/* Profile tab of the main screens*/}
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <Feather name="user" size={28} color={color} />
                        ),
                        tabBarColorStyle,
                        tabBarLabelStyle,
                        tabBarIconStyle
                    }}
                />
            </Tabs>
            {/* Handling the Status Bar of the app */}
            <StatusBar backgroundColor='#0E1116'
                style='light'
            />
        </>
    )
}
export default TabsLayout