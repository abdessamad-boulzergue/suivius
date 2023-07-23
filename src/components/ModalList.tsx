import { View,TouchableOpacity,Modal,Text ,StyleSheet} from 'react-native';
import {useState} from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { CardSection, Input } from '../components/common';
import SButton from './common/SButton';

export interface ModalListItem{
    id:number,
    title:string
}

export const ModalList =({data,visible, onClose}:{data:ModalListItem[],visible:boolean,onClose:(items:ModalListItem[])=>void})=> {
    const [selectedItem, setSelectedItem] = useState<Array<ModalListItem>>([]);
    onClose = onClose || (()=>{});

    const closeModal=()=>{
        onClose([...selectedItem]);
        setSelectedItem([]);
    }
    const onLongPress = (item:any) => {
        setSelectedItem((prevSelected) => {
            const index =prevSelected.findIndex(it=>it.id==item.id);
            if(index!==-1) {
                return [
                    ...prevSelected.slice(0,index),
                    ...prevSelected.slice(index+1)
                ]
            } 
            return [...prevSelected, item];
        });
      };
      const isItemSelected = (item:any) => {
        return selectedItem.some(member => member === item);
      };
    
        return (
                <Modal
                    style={{margin: 30}}
                    animationType="slide"
                    transparent={false}
                    visible={visible}
                    onRequestClose={() => { }}>
                    <View style={{margin: 22}}>
                        <FlatList data={data}
                            renderItem={({item}) =>{ 
                                
                                return(
                                    <TouchableOpacity onPress={() => onLongPress(item)}>
                                        <CardSection style={{backgroundColor: isItemSelected(item) ? "#aeaebe" : "#ffffff"}}>
                                        <Input  value={ item.title } editable={false} />
                                        </CardSection>
                                    </TouchableOpacity>
                                    
                                )
                            }}
                            ItemSeparatorComponent={()=> <View style={styles.separator} />}
                            keyExtractor={(item, index) => index.toString()}
                        />
                            

                    </View>
                    <View style={{flexDirection:"row", justifyContent:"space-evenly"}}>
                    <SButton  style={{ color:"#E55959",height:50,alignSelf:"center", backgroundColor:"transparent", width:"40%", }} title="fermer" 
                        onPress={()=>onClose([])}></SButton>
                        <SButton  style={{ alignSelf:"center", height:50,  width:"50%", }} title="Ajouter" 
                        onPress={closeModal}></SButton>
                    </View>
                </Modal>
        );
    
}
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
      }
    })