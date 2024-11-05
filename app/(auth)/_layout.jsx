import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'expo-dev-client';
import 'expo-dev-client';
import { useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { View, ActivityIndicator } from 'react-native';

// Function to handled the routing of the various (auth) screens of CaloNavo, including the Welcome screen
// *** Ensure all new (auth) screens have their own places in the stack***
const AuthLayout = () => {
  const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState(null);
	const router = useRouter();
	const segments = useSegments();

	const onAuthStateChanged = (user) => {
		setUser(user);
		if (initializing) setInitializing(false);
	};

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	useEffect(() => {
		if (initializing) return;

		if (user) {
			router.replace('/(tabs)/home');
		}
	}, [user, initializing]);

	if (initializing)
		return (
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1
				}}
			>
				<ActivityIndicator size="large" />
			</View>
		);

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