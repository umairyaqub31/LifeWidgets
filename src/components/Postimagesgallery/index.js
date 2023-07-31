import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import styles from './styles';
import Swiper from "react-native-web-swiper";
import { AntDesign , Foundation } from '@expo/vector-icons';
import colors from "../../config/color/color";


export default function Postimagesgallery(props) {
  return (
    <View style={styles.gallerycontainer}>
        <Swiper
            from={0}
            minDistanceForAction={0.1}
            controlsProps={{
                dotActiveStyle: { backgroundColor:colors.white },
                dotsTouchable: true,
                prevPos: false,
                nextPos: false,
                nextTitle: ">",
                nextTitleStyle: { color: "red", fontSize: 24, fontWeight: "500" },
            }}
        >
            <View>
                <Image style={styles.imagesgallery} style source={require('../../../assets/images/login.jpg')} />
            </View>

            <View>
                <Image style={styles.imagesgallery} source={require('../../../assets/images/login.jpg')} />
            </View>
        </Swiper>
        </View>
    );
}

