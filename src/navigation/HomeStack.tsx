import React ,{useState,useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../navigation/DrawerContent';

import { TouchableOpacity ,Image} from 'react-native';
import { drawerOpen } from '../assets';
import HomeScreen from '../screens/HomeScreen';
import ProjectScreen from '../screens/ProjectsScreen';
import { ROUTES } from '../constants';
import InfoProjectScreen from '../screens/InfoProjectScreen';
import EtudeAPDScreen from '../screens/EtudeAPDScreen';
import StaffMemberScreen from '../screens/StaffMemberScreen';
import LocalisationProjectScreen from '../screens/LocalisationProjectScreen';
import EtudeReportScreen from '../screens/EtudeReportScreen';
import BlocageComponent  from '../components/BlocageModal';
import { useStores } from '../stores/context';
import { loadArticles, loadProjectsDocumentForUser, loadReferences, loadUserPermissions, loadUserProjects, loadVendors, loadWorkInfos } from '../services';
import { projectObjectStore } from '../stores/objectsStore';
import LoadingScreen from '../screens/LoadingScreen';
import { dtosToSuiviePermission } from '../services/mappers';
import RejectModal from '../components/RejectModal';
import StaffActivityComponent from '../screens/StaffActivityComponent';
import LoginScreen from '../screens/auth/LoginScreen';
import AuthorizationScreen from '../screens/WorkAndAuthorizationScreen';
import ReportsTabNavigator from '../screens/ReportsTabNavigator';
import WorkScreen from '../screens/WorkScreen';
import ConsultationScreen from '../screens/ConsultationScreen';

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

  const [isLoading, setIsLoading] = useState(true);
  const [isReferencesLoad, setReferencesLoad] = useState(false);
  const [isProjectLoad, setProjectLoad] = useState(false);
  const [isWorkInfoLoad, setWorkInfoLoad] = useState(false);
  const [isPermissionLoad, setPermissionLoad] = useState(false);
  const {loginStore ,rightsStore,isLoadingData,startLoadingData} = useStores();
  const {  userToken} = loginStore;
  useEffect(() => {
    const fetchData = async () => {
      try {
             const projectsResponse=  loadUserProjects(rightsStore.currentUser.id);
             const referencesResponse  = loadReferences()
             const infosResponse=  loadWorkInfos()
             const docContentResponse=loadProjectsDocumentForUser(rightsStore.currentUser.id)
             const permissionsResponse=loadUserPermissions(rightsStore.currentUser.id)
             const articleResponse = loadArticles();
             const vendorsResponse = loadVendors();
             const [projects,references,infos,permissions,docContent,articles,
                    vendors
            ] = await Promise.all([
                    projectsResponse,referencesResponse,
                     infosResponse,permissionsResponse,docContentResponse,
                      articleResponse,
                      vendorsResponse
                    ]);
              
             projectObjectStore.setProjectsDto(projects || []) 
              if (references) projectObjectStore.setReferences(references)
              console.log("infos " , infos)
              projectObjectStore.dtoToWorkInfo(infos||[]) 
              rightsStore.setPermissions(dtosToSuiviePermission(permissions||[]))
              projectObjectStore.setProjectsDocumentForUser(docContent||[])
              projectObjectStore.setArticles(articles||[]);
              projectObjectStore.setVendors(vendors || [])
              setIsLoading(false);
            } catch (error) {
              console.log('Error:', error);
              setIsLoading(false); // Handle error and set isLoading to false
            }
          }
          fetchData();
        }, []);

  const allDataLoading =()=>{
    console.log(!isWorkInfoLoad , !isPermissionLoad , !isReferencesLoad , !isProjectLoad)
    return false && !isWorkInfoLoad && !isPermissionLoad && !isReferencesLoad && !isProjectLoad
  }

return (
  <>
  {isLoading ? (
 
      <LoadingScreen></LoadingScreen>
  
  ) : 
  (

    <Stack.Navigator   initialRouteName={ROUTES.PROJECTS}
    screenOptions={{
        headerStyle: { backgroundColor: '#326972' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
     <Stack.Screen
        options={{headerShown: false, headerTitle: 'LoginScreen'}}
        component={LoginScreen}
        name={ROUTES.LOGIN}
      />
     <Stack.Screen
        options={{ headerTitle: 'Activités'}}
        component={AuthorizationScreen}
        name={ROUTES.AUTHORIZATION}
      />

      <Stack.Screen
        options={{ headerTitle: "Rapports d'activités"}}
        component={ReportsTabNavigator}
        name={ROUTES.WORK_REPPORTS}
      />
      <Stack.Screen
        options={{ headerTitle: "Consultation"}}
        component={ConsultationScreen}
        name={ROUTES.CONSULTATION}
      />
      <Stack.Screen
        options={{ headerTitle: "Rapports d'activités"}}
        component={WorkScreen}
        name={ROUTES.WORK_EDIT}
      />

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
      name={ROUTES.BLOCAGE}
      component={BlocageComponent}
      options={{
        title: 'details blocage'
      }}
    />
    <Stack.Screen
      name={ROUTES.REJECT}
      component={RejectModal}
      options={{
        title: 'motifs de rejet'
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
      name={ROUTES.STAFF_ACTIVITY_SCREEN}
      component={StaffActivityComponent}
      options={{
        title: 'staff'
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
      component={EtudeAPDScreen}
      options={{
        title: "rapport d'activité"
      }}
    />
  </Stack.Navigator>
  )}
  </>
  );
};

export default HomeDrawer;
