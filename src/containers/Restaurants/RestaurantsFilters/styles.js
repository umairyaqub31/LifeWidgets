import { StyleSheet } from 'react-native';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white,
    },
    scrolledview:{
      flex:1,
      paddingLeft:15,
      paddingRight:15,
    },
    heading:{
      fontFamily:FontFamily.Medium,
      fontSize:20,
      color:colors.black
    },
    textBold:{
      color:colors.black,
      fontFamily:FontFamily.Medium,
      fontSize:16,
    },
    text: {
      color:colors.black,
      fontSize: 16,
      fontFamily: FontFamily.Regular,
    },
    graytext:{
      fontSize: 14,
      fontFamily: FontFamily.Regular,
      color:colors.gray
    },
    separator:{
      marginTop:13,
      marginBottom:13
    },
    btnPrimary:{
      backgroundColor:colors.primary,
      padding:10,
      borderRadius:6,
      margin:15
    },
    btnPrimaryText:{
      fontSize:16,
      fontFamily:FontFamily.Medium,
      color:colors.white,
      textAlign:'center'
    },
    textinputrounded:{
      borderRadius:6,
      backgroundColor:colors.lightGray,
      height: 50,
      marginTop:10,
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
    headRightOpacity: {
      width: 60,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    headRightText: {
      fontFamily: FontFamily.Medium,
      color: colors.primary,
      fontSize: 15,
    },
  });
  
export default styles;