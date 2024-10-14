import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'


// Function to handled the routing of the various (auth) screens of CaloNavo, including the Welcome screen
// *** Ensure all new (auth) screens have their own places in the stack***
const AuthLayout = () => {
  return (
    <>
      {/* Stack to hold all possible screens */}
      <Stack>
        {/* Sign In Screen */}
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false
          }}
        />
        {/* Sign Up Screen */}
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false
          }}
        />
        {/* Sign Up 2 Screen : General Profile Questions */}
        <Stack.Screen
          name="sign-up-2"
          options={{
            headerShown: false
          }}
        />
        {/* Sign Up 3 Screen : Diet-Specific Questions */}
        <Stack.Screen
          name="sign-up-3"
          options={{
            headerShown: false
          }}
        />
      </Stack>
      {/* Handling the Status Bar of the App */}
      <StatusBar backgroundColor='#0E1116'
        style='light'
      />
    </>
  )
}

export default AuthLayout