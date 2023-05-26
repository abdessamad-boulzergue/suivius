import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../navigation/DrawerContent';

import { TouchableOpacity ,Image} from 'react-native';
import { drawerOpen } from '../assets';
import HomeScreen from '../screens/HomeScreen';
import ProjectScreen from '../screens/ProjectsScreen';
import { ROUTES } from '../constants/routes';
import InfoProjectScreen from '../screens/InfoProjectScreen';
import ActivityReportScreen from '../screens/ActivityReportScreen';
import StaffMemberScreen from '../screens/StaffMemberScreen';
import LocalisationProjectScreen from '../screens/LocalisationProjectScreen';
import EtudeReportScreen from '../screens/EtudeReportScreen';

const Stack = createStackNavigator();


function HomeDrawer() {
    const Drawer = createDrawerNavigator();
   
    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Projects"  
        options={{ headerShown: false }}
        component={HomeStack} />
        {/* Add more Drawer.Screen components as needed for additional screens */}
      </Drawer.Navigator>
    );
}

const HomeStack = ({ navigation }:any) => {
  return (
    <Stack.Navigator   initialRouteName={ROUTES.PROJECTS}
    screenOptions={{
        headerStyle: { backgroundColor: '#326972' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >

    <Stack.Screen
      name={ROUTES.HOME}
      component={HomeScreen}
      options={{
        title: 'Home',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image  source={drawerOpen.imageSource}
                                style={{width: 30, height: 30, marginLeft: 10, marginTop:'10%' }}
                        />
          </TouchableOpacity>
        ),
      }}
    />

<Stack.Screen
      name={ROUTES.PROJECTS}
      component={ProjectScreen}
      initialParams={{next:ROUTES.PROJECTINFO}}
      options={{
        title: 'Home',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image  source={drawerOpen.imageSource}
                                style={{ width: 30, height: 30, marginLeft: 10, marginTop:'10%' }}
                        />
          </TouchableOpacity>
        ),
      }}
    />

<Stack.Screen
      name={ROUTES.PROJECT_LOCALISATION}
      component={LocalisationProjectScreen}
      options={{
        title: 'Localisation de projet'
      }}
    />
<Stack.Screen
      name={ROUTES.PROJECTINFO}
      component={InfoProjectScreen}
      options={{
        title: 'Project Info'
      }}
    />
    <Stack.Screen
      name={ROUTES.ETUDE_REPORT_SCREEN}
      component={EtudeReportScreen}
      options={{
        title: 'Rapport d\'etude'
      }}
    />
    <Stack.Screen
      name={ROUTES.StaffMemberScreen}
      component={StaffMemberScreen}
      options={{
        title: 'StaffMemberScreen '
      }}
    />
    <Stack.Screen
      name={ROUTES.ACTIVITY_REPORT}
      component={ActivityReportScreen}
      options={{
        title: "rapport d'activité"
      }}
    />
  </Stack.Navigator>

  );
};

export default HomeDrawer;
