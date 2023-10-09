import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Login } from '../Screens/Login';
import { Register } from '../Screens/Register';
import { ForgotPassword } from '../Screens/ForgotPassword';
import { Main } from '../Screens/Main';
import AuthContext from '../Contexts/auth';


const Stack = createNativeStackNavigator();


export function Routes() {
    const { auth } = useContext(AuthContext)

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={auth.id ? 'Main' : 'Login'}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
