import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from '../Screens/Login';
import { Register } from '../Screens/Register';
import { ForgotPassword } from '../Screens/ForgotPassword';
import { Main } from '../Screens/Main';
import { ChangePassword } from '../Screens/ChangePassword';
import { History } from '../Screens/History';


const Stack = createNativeStackNavigator();


export function Routes() {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                    animation: 'none',
                }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="History" component={History} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
