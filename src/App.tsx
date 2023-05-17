import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './navigation/RootStack';
import {StoreProvider} from './stores/context';
import {NativeBaseProvider} from 'native-base';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ThemeProvider from './theming/ThemeProvider';
import 'react-native-gesture-handler';
import DatabaseProvider from './database/DatabaseProvider';
const App = () => {
    /*
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
    SplashScreen.hide();
    return function cleanup() {
      unsubscribe();
    };
  }, []);*/
  return (
    <StoreProvider>
        <NativeBaseProvider>
        <ThemeProvider>
            <DatabaseProvider>
                <NavigationContainer>
                    <GestureHandlerRootView style={{flex: 1}}>
                        <RootStack />
                    </GestureHandlerRootView>
                </NavigationContainer>
          </DatabaseProvider>
          </ThemeProvider>
        </NativeBaseProvider>
    
    </StoreProvider>
  );
};

export default App;