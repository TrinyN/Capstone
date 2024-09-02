import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'



const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false
          }}
        />
        
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="sign-up-2"
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="sign-up-3"
          options={{
            headerShown: false
          }}
        />

      </Stack>
      <StatusBar backgroundColor='#0E1116'
        style='light'
      />
    </>
  )
}

export default AuthLayout