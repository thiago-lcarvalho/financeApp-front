import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from '../Screens/Login';
import { Register } from '../Screens/Register';
import { ForgotPassword } from '../Screens/ForgotPassword';
import { Main } from '../Screens/Main';


const Stack = createNativeStackNavigator();


export function Routes() {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
