// src/navigation/DrawerContent.js
import {useContext} from 'react';

import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import ThemeContext from '../theming/ThemeContext';
import { ROUTES } from '../constants/routes';
export default function DrawerContent(props:any) {
      const { theme, toggleTheme } = useContext(ThemeContext);

      console.log(theme);
      const styles = createStyles(theme);

    return (
        <View style={styles.container}>
      <DrawerContentScrollView {...props} style={[styles.drawerContent]}>
            {/* Header */}
            <View style={styles.header}>
                <Image style={styles.logo} source={require('../assets/images/logo_primary.png')} />
                <Text style={styles.headerText}>Header Text</Text>
            </View>

            {/* List */}
            <DrawerItem labelStyle={styles.labelStyle} 
                icon={({ color, size }) => <Icon name="home" color={color} size={size} />}
                label="Projet"
                onPress={() => props.navigation.navigate(ROUTES.PROJECTS,{next:ROUTES.PROJECTINFO})}
            />
             <DrawerItem labelStyle={styles.labelStyle} 
                icon={({ color, size }) => <Icon name="home-outline" color={color} size={size} />}
                label="Rapport d'activité"
                onPress={() => props.navigation.navigate('InfoProject')}
            />
             <DrawerItem labelStyle={styles.labelStyle} 
                icon={({ color, size }) => <Icon name="cube" color={color} size={size} />}
                label="Collborateurs"
                onPress={() => props.navigation.navigate('Home')}
            />
             <DrawerItem labelStyle={styles.labelStyle} 
                icon={({ color, size }) => <Icon name="home-outline" color={color} size={size} />}
                label="Equipements"
                onPress={() => props.navigation.navigate('Home')}
            />
             <DrawerItem labelStyle={styles.labelStyle} 
                icon={({ color, size }) => <Icon name="home-outline" color={color} size={size} />}
                label="Taux d'activité"
                onPress={() => props.navigation.navigate('Home')}
            />
             <DrawerItem labelStyle={styles.labelStyle} 
                icon={({ color, size }) => <Icon name="calendar" color={color} size={size} />}
                label="Suivie de projets"
                onPress={() => props.navigation.navigate('Home')}
            />
             <DrawerItem labelStyle={styles.labelStyle} 
                icon={({ color, size }) => <Icon name="home-outline" color={color} size={size} />}
                label="Reporting"
                onPress={() => props.navigation.navigate(ROUTES.PROJECTS,{next:ROUTES.ACTIVITY_REPORT})}
            />

             <DrawerItem labelStyle={styles.labelStyle} 
                icon={({ color, size }) => <Icon name="home" color={color} size={size} />}
                label="Notification"
                onPress={() => props.navigation.navigate('Home')}
            />
             <DrawerItem  labelStyle={styles.labelStyle} 
                icon={({ color, size }) => <Icon name="cog" color={color} size={size} />}
                label="Paramètre"
                onPress={() => props.navigation.navigate('Home')}
            />
              <DrawerItem  labelStyle={styles.labelStyle} 
                icon={({ color, size }) => <Icon name="home-outline" color={color} size={size} />}
                label="Déconnexion"
                onPress={() => props.navigation.navigate('Login')}
            />
            {/* Add more DrawerItems as needed */}

            {/* Bottom */}
            <View style={styles.bottom}>
                <Image style={styles.userImage} source={require('../assets/images/logo_primary.png')} />
                <Text style={styles.userName}>Username</Text>
                <Text style={styles.userEmail}>user@example.com</Text>
            </View>
            
        </DrawerContentScrollView>
        </View>
    );
}

function createStyles(theme : any){
return  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#8c9494'
    },
    drawerContent: {
      flex: 1,
      backgroundColor:theme.colors.background,
      color:theme.colors.text
    },
    labelStyle:{
        color: theme.colors.text, 
        fontWeight: 'bold' 
    },
    header: {
      alignItems: 'center',
      paddingTop: 20,
    },
    logo: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
    },
    bottom: {
      alignItems: 'center',
      paddingBottom:20
    },
    userImage: {
      width: 50,
      height: 50,
      resizeMode: 'cover',
      borderRadius: 25,
    },
    userName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
    },
    userEmail: {
      fontSize: 14,
      color: 'gray',
    },
  });
}