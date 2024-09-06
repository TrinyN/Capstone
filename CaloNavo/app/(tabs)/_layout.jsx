import React from 'react'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Feather from "react-native-vector-icons/Feather";

const tabBarLabelStyle = {
    paddingBottom: 2,
    fontSize: 12
};

const tabBarIconStyle = {
    paddingTop: 4
};

const tabBarColorStyle = {
    tabBarActiveTintColor: '#CB9CF2',
    tabBarInactiveTintColor: '#F2F4F3'
};

const TabsLayout = () => {
    return (
        <>
            <Tabs screenOptions={{
                tabBarActiveTintColor: '#CB9CF2',
                tabBarInactiveTintColor: '#F2F4F3',
                tabBarStyle: {
                    backgroundColor: '#0E1116',
                    borderTopWidth: 1,
                    borderTopColor: '#F2F4F3',
                    height: 60,
                }
            }}>
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
            <StatusBar backgroundColor='#0E1116'
                style='light'
            />
        </>
    )
}

export default TabsLayout