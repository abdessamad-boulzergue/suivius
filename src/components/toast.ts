

import { Alert } from 'react-native';
import Toast from 'react-native-simple-toast';


export const showToast = (
  title: string,
) => {
  Toast.show(title,Toast.SHORT);
};
export const   showAlert = (title:string, description:string , action: ()=>void) => {
  Alert.alert(
    title,
    description,
    [
      { text: 'OK', onPress: action }
    ]
  );
};
export const  showError = (
  title: string,
  description:string
) => {
  Toast.showWithGravity(title + ":"+ description,Toast.LONG,
    Toast.TOP,{
    backgroundColor: 'blue',
    textColor:'red',
    
  });
};