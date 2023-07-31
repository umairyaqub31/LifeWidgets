import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white,
    },
    scrolledview:{
      flex:1,
      padding:15,
    },
    heading:{
      fontFamily:FontFamily.Medium,
      fontSize:20,
      color:colors.black
    },
    noPadding:{
      paddingTop:0
    },
    filterList: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingTop:10,
      paddingBottom:10
    },
    list:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom:20,
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
    }
  });
  
export default styles;