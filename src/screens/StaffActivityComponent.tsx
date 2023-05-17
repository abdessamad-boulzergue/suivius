import React, {useState} from 'react';
import {
    Text,  StyleSheet,  SectionList,Dimensions,SafeAreaView,ActivityIndicator, View,ScrollView
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { Image } from 'native-base';
import { loved } from '../assets';
import SuiviInputText from '../components/InputText';
import SuiviInputDate from '../components/InputDate';
import InputSearch from '../components/InputSearch';


interface ListOverViewState {
    pages:Array<{title:string,data:Array<any>}>,
    selectedOption:string,
    selectData:Array<any>
  }

const StaffActivityComponent = ({route,navigation}:any) => {
    
    const selectedOption="";
    const {interact ,pages} = route.params;
    const selectData=[
          { id: 1, title: 'Item 1', date: '2023-05-01', description: 'Description 1' },
          { id: 2, title: 'Item 2', date: '2023-05-02', description: 'Description 2' },
          { id: 3, title: 'Item 3', date: '2023-05-03', description: 'Description 3' },
          // Add more data as needed
    ];
    const [state, setState] = useState<ListOverViewState>({
        pages:pages,
        selectedOption:"",
        selectData :selectData
    });


    
  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };


        return (
            <View style={{flex: 1,}}>
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>rechercher collaborateur :</Text>
                        <InputSearch placeholder="recherher un collaborateur"></InputSearch>
                </View>
                <SectionList sections={pages}
                 renderItem={({item}) =>{ 
                    return(
                        <View style ={styles.listItem}>
                            <View style={{width:"25%"}}>
                                <Text style ={styles.listItemTitle}>{(item.title)}</Text>
                            </View>
                            <View style={{width:"30%"}}>
                                 <SuiviInputDate mode="time" ></SuiviInputDate>
                             </View>
                             <View style={{width:"30%"}}>
                                <SuiviInputDate mode="time" ></SuiviInputDate>
                             </View>
                             <Text style={{color:"black"}}>6h30</Text>
                        </View>
                    )
                }}
                 renderSectionHeader={({section}) => {
                                return(section.title?  (<Text style ={styles.sectionTitle}></Text>) : null)
                            }}
                keyExtractor={(item, index) => index.toString()}
               
                ItemSeparatorComponent={renderSeparator}

                 />
            </View>
        );
    
}
const window = Dimensions.get('window')
const styles = StyleSheet.create({
    dropdown: {
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 4,
        color:'black'
      },
      separator: {
        height: 1,
        backgroundColor: '#ccc',
      },
      dropdownContainer: {
        margin: 20,
        marginBottom:0
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color:"black"
      },
      pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 4,
      },
      picker: {
        flex: 1,
        height: 40,
        color: '#000',
      },
      pickerItem: {
        color: 'black', // Replace with the desired color
      },
      arrowIcon: {
        marginRight: 8,
      },
      SectionStyle: {
        flexDirection: 'column',
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 15,
    },
    sectionTitle:{
        fontSize:30
    },
    listItemTitle:{
        color:"#4a545a",
        fontSize:15,
    },
    listItem:{
        flex:1,
     flexDirection:'row',
      marginLeft:3,
      marginBottom:10,
     alignItems: 'center',
     borderBottomWidth:1,
     borderBottomColor:"#4a545a"
    },
    listItemImage:{
        width:'98%',
        alignSelf: 'center',
        height:window.height/2,
        resizeMode: 'stretch',
    },
    listItemDescription:{
        marginLeft:5,
        marginBottom:5,
        fontSize:15,
        width:'85%'
    }
});

export default StaffActivityComponent;
