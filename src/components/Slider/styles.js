import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#fff',
    },
    title: {
      color:colors.primary,
      fontSize: 20,
      fontFamily: FontFamily.Medium,
    },
    Text:{
      fontSize: 16,
      fontFamily: FontFamily.Regular,
      textAlign:'justify',
      color:colors.white
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        opacity:0.1
    },
    SwiperContainer:{
        flex:2
    },  
    CrousalVector:{
        backgroundColor:colors.white,
        width:140,
        height:140,
        borderRadius:80,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20
    }
  });
  
export default styles;