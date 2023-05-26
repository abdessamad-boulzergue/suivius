import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from '../constants/routes';
import LoginScreen from '../screens/auth/LoginScreen';
import RegularLoginScreen from '../screens/auth/RegularLoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false, headerTitle: 'LoginScreen'}}
        component={LoginScreen}
        name={ROUTES.LOGIN}
      />
      <Stack.Screen
        options={{headerShown: true, headerTitle: 'LoginScreen'}}
        component={LoginScreen}
        name={ROUTES.REGULARLOGIN}
      />
      <Stack.Screen
        options={{headerShown: false, headerTitle: 'RegisterScreen'}}
        component={RegisterScreen}
        name={ROUTES.REGISTER}
      />
      <Stack.Screen
        options={{headerShown: false, headerTitle: ''}}
        component={ResetPasswordScreen}
        name={ROUTES.RESETPASSWORD}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;