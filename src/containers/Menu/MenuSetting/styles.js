import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white,
    },
    scrolledview:{
      flex:1,
      padding:15,
    },
    boxShadow:{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
    },
    text:{
      color:colors.black,
      fontFamily:FontFamily.Regular,
      fontSize:16,
    },
    textBold:{
      color:colors.black,
      fontFamily:FontFamily.Medium,
      fontSize:16,
    },
    textGray:{
      color:colors.gray,
      fontFamily:FontFamily.Regular,
      fontSize:14,
    },
    alignCenter:{
      textAlign:'center'
    },
    flirtList:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      marginBottom:20
    },
    list:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:"center",
      marginBottom:10,
    },
    noMargin:{
      marginBottom:0
    },
    noMarginTop:{
      marginTop:0
    },
    RadioButton:{
      flexDirection:'row',
      justifyContent:'space-between',
      width:100
    },
    separator:{
      marginTop:13,
      marginBottom:13,
    },
  });
  
export default styles;