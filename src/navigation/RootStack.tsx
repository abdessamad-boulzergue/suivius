import React, {useEffect,useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useStores} from '../stores/context';
import HomeStack from './HomeStack';
import {ROUTES} from '../constants/routes';
import AuthStack from './AuthStack';
import {Center, Spinner, View} from 'native-base';
import { SafeAreaView } from 'react-native';
import {observer} from 'mobx-react-lite';

const Stack = createNativeStackNavigator();

const RootStack = observer(() => {
    const [isLoading, setIsLoading] = useState(true);
    const {loginStore} = useStores();
    const { 
            userToken,
         setInitialDetailsFromAsyncStorage,
         setTokenFromAsyncStorage,
    } = loginStore;
    // Simulate an initialization process
    useEffect(() => {

        setInitialDetailsFromAsyncStorage();
       setTokenFromAsyncStorage();

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // Change the duration (3000ms = 3s) as needed

        return () => clearTimeout(timer);
    }, []);

   

  return (
    <>
      {isLoading ? (
        <View flex={1}>
          <Center>
            <Spinner />
          </Center>
        </View>
      ) : (
        <SafeAreaView style={{flex:1}}>
        <Stack.Navigator>
          {userToken ? (
            <Stack.Screen
              options={{headerShown: false}}
              name={ROUTES.HOMESTACK}
              component={HomeStack}
            />
          ) : (
            <Stack.Screen
              options={{headerShown: false}}
              name={ROUTES.AUTHSTACK}
              component={AuthStack}
            />
          )}
        </Stack.Navigator>
        </SafeAreaView>
      )}
    </>
  );
});

export default RootStack;