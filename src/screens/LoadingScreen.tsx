import { StyleSheet ,Animated,View, Image,Dimensions} from "react-native";
 
import { useEffect, useState } from "react";
import { position } from "native-base/lib/typescript/theme/styled-system";
import { imgLogo } from "../assets";
import { useStores } from "../stores/context";
import LinearGradient from 'react-native-linear-gradient';
const window = Dimensions.get('window')


export default function LoadingScreen(){
    const [rotateValue, setRotateValue] = useState(new Animated.Value(0));
    const store = useStores();
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
    
    

    return(<LinearGradient 
      end={{x: 1.0, y: 0.5}}
      locations={[0, 0.2, 10.0]} // Spread the colors along the gradient
      colors={['#5C969F','#5C969F', '#29626B']} style={styles.container}>
            <Image style = {{margin:0,alignSelf:'center', marginTop:'55%',}}
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
        
        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    container:{
         resizeMode:'cover',
        alignItems: 'center',
        flexDirection:"column", 
        width:window.width,
        height:window.height,
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