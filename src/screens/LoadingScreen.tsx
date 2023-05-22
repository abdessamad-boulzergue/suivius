import { StyleSheet ,Animated,View} from "react-native";
import {Center} from 'native-base';
import { useEffect, useState } from "react";
import { position } from "native-base/lib/typescript/theme/styled-system";


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
            <View style={styles.spiner}>
                    <Animated.View style={{ transform: [{rotate: rotateData}] }}>
                        <View style={styles.dot1} />
                        <View style={styles.dot2} />
                        <View style={styles.dot3} />
                        <View style={styles.dot4} />
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
        top: -20,
      },
      dot2: {
        position: 'absolute',
        width: 7,
        height: 7,
        borderRadius: 5,
        backgroundColor: 'white',
        top: -18,
        left:-18,
      },
      dot3: {
        position: 'absolute',
        width: 7,
        height: 7,
        borderRadius: 5,
        backgroundColor: 'white',
        top: -0,
        left:-25,
      },
      dot4: {
        position: 'absolute',
        width: 7,
        height: 7,
        borderRadius: 5,
        backgroundColor: 'white',
        top: 18,
        left:-18,
      },
});