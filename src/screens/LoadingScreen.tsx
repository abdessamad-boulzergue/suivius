import { StyleSheet ,Animated,View, Image} from "react-native";
import {Center} from 'native-base';
import { useEffect, useState } from "react";
import { position } from "native-base/lib/typescript/theme/styled-system";
import { imgLogo } from "../assets";


export default function LoadingScreen(){
    const [rotateValue, setRotateValue] = useState(new Animated.Value(0));

    useEffect(() => {
        startRotation();
      }, []);
    
      const startRotation = () => {
        rotateValue.setValue(0);
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }).start(() => startRotation());
      };

      const rotateData = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      });
    

    return(
        <View style={styles.container}>
            <Image style = {{margin:0,alignSelf:'center', marginTop:'35%',}}
                           source={imgLogo.imageSource}
                       />
            <View style={styles.spiner}>
                    <Animated.View style={{ transform: [{rotate: rotateData}] }}>
                        <View style={styles.dot1} />
                        <View style={styles.dot2} />
                        <View style={styles.dot3} />
                        <View style={styles.dot4} />
                        <View style={styles.dot5} />
                    </Animated.View>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        background: 'linear-gradient(179.15deg, #528C95 -5.13%, #2D666F 89.38%)',
        flex: 1,
        alignItems: 'center',
        flexDirection:"column",
        paddingBottom: 20, // padding from the bottom of the screen
        width:'100%',
        height:'100%',
      },
      spiner:{
        marginTop:'100%'
      },
      dot1: {
        position: 'absolute',
        width: 7.68,
        height: 7.68,
        borderRadius: 5,
        backgroundColor: 'white',
        top: -19,
      },
      dot2: {
        position: 'absolute',
        width: 7,
        height: 7,
        borderRadius: 5,
        backgroundColor: 'white',
        top: -16,
        left:-15,
      },
      dot3: {
        position: 'absolute',
        width: 6.4,
        height: 6.4,
        borderRadius: 5,
        backgroundColor: 'white',
        top: -5,
        left:-23,
      },
      dot4: {
        position: 'absolute',
        width: 5.7,
        height: 5.7,
        borderRadius: 5,
        backgroundColor: 'white',
        top: 8,
        left:-22,
      },
      dot5: {
        position: 'absolute',
        width: 5.1,
        height: 5.1,
        borderRadius: 5,
        backgroundColor: 'white',
        top: 17,
        left:-13,
      },
});