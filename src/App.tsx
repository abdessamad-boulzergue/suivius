import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './navigation/RootStack';
import {StoreProvider} from './stores/context';
import {NativeBaseProvider} from 'native-base';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ThemeProvider from './theming/ThemeProvider';
import 'react-native-gesture-handler';
const App = () => {

  return (
    <StoreProvider>
        <NativeBaseProvider>
        <ThemeProvider>
                <NavigationContainer>
                    <GestureHandlerRootView style={{flex: 1}}>
                        <RootStack />
                    </GestureHandlerRootView>
                </NavigationContainer>
          </ThemeProvider>
        </NativeBaseProvider>
    </StoreProvider>
  );
};

export default App;