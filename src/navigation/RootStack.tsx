import React, {useEffect,useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useStores} from '../stores/context';
import HomeStack from './HomeStack';
import {ROUTES} from '../constants';
import AuthStack from './AuthStack';
import { SafeAreaView ,View} from 'react-native';
import {observer} from 'mobx-react-lite';
import LoadingScreen from '../screens/LoadingScreen';
import { loadUserProjects } from '../services';
import { projectObjectStore } from '../stores/objectsStore';

const Stack = createNativeStackNavigator();

const RootStack = observer(() => {
    const [isLoading, setIsLoading] = useState(true);
    const {loginStore ,rightsStore,isLoadingData,startLoadingData} = useStores();
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
        }, 1000); // Change the duration (3000ms = 3s) as needed

        return () => clearTimeout(timer);
    }, []);
   

  return (
    <>
      {isLoading ? (
        <View>
          <LoadingScreen></LoadingScreen>
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