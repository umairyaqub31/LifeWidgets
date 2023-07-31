import * as React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import Swiper from "react-native-web-swiper";
import { AntDesign , Foundation } from '@expo/vector-icons';
import colors from "../../config/color/color";


export default function Slider(props) {
  return (
        <Swiper
        vertical={true}
        loop={true}
        timeout={10}
        from={0}
        minDistanceForAction={0.1}
        controlsProps={{
            dotActiveStyle: { backgroundColor:colors.white, },
            dotsTouchable: true,
            prevPos: false,
            nextPos: false,
            nextTitle: ">",
            nextTitleStyle: { color: "red", fontSize: 24, fontWeight: "500" },
        }}
        >
        <View style={{ flex: 1, justifyContent: "center",alignItems:'center' }}>
            <View style={styles.CrousalVector}>
                <AntDesign name="antdesign" size={48} color={colors.primary}/>
            </View>
            <Text style={styles.Text}>
                Togetherness is a hugely important aspect of life.
                It unites us, gives us security, much-needed support and a sense of belonging, 
                and encourages us to love one another. 
            </Text>
        </View>

        <View style={{ flex: 1, justifyContent: "center" , alignItems:'center'}}>
            <View style={styles.CrousalVector}>
                 <Foundation name="social-500px" size={48} color={colors.primary} />
            </View>
            <Text style={styles.Text}>
                Togetherness is a hugely important aspect of life.
                It unites us, gives us security, much-needed support and a sense of belonging, 
                and encourages us to love one another. 
            </Text>
        </View>

</Swiper>
);
}

