import React, { useState } from 'react';
import { ScrollView, Image, Dimensions, View,Text, StyleSheet } from 'react-native';
import { inwi, liked } from '../assets';
import { VendorDto } from '../services/types';


const windowWidth = Dimensions.get('window').width;

const images = [
    inwi.imageSource,
    liked.imageSource
];

const PrestataireSlider = ({vendors}:{vendors:VendorDto[]}) => {
    const [active, setActive] = useState(0);

    const change = ({ nativeEvent }:any) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if(slide !== active) {
            setActive(slide);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView 
                pagingEnabled 
                horizontal
                onScroll={change}
                showsHorizontalScrollIndicator={false}
                style={styles.scroll}
            >
                {vendors.map((vendor, index) => (
                     <View style={{width:windowWidth}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', width:'80%',alignItems:'center'}}>
                            <Image
                                key={index}
                                source={{uri:vendor?.iconContent}}
                                style={{width: 50, height: 50}}
                            />
                            <Text style={{color:'black'}}>{vendor.title}</Text>
                    </View>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.pagination}>
                {images.map((i, k) => (
                    <View key={k} style={k==active ? styles.pagingActive : styles.paging} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginTop: 50, width: windowWidth },
    scroll: { width: windowWidth, height: 300 },
    image: { width: windowWidth, height: 300 },
    pagination: { flexDirection: 'row', position:'absolute', bottom:0, alignSelf:'center' },
    paging: { borderRadius: 5, margin:3, width:10, height:10, backgroundColor:'gray' },
    pagingActive: { borderRadius: 5, margin:3, width:10, height:10, backgroundColor:'blue' },
});

export default PrestataireSlider;
