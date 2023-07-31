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
      paddingLeft:15,
      paddingRight:15,
    },
    heading:{
      fontFamily:FontFamily.Medium,
      fontSize:20,
      color:colors.black,
      textAlign:'center',
      marginBottom:15
    },
    text:{
      fontSize: 16,
      fontFamily: FontFamily.Regular,
      color:colors.black
    },
    textInput:{
      borderWidth:1,
      borderColor:colors.gray,
      borderRadius:6,
      minHeight:200,
      textAlignVertical:'top',
      padding:10,
      fontSize:16,
      fontFamily:FontFamily.Regular,
      color:colors.black
    },
    topWidget:{
      flex:1,
    },
    fillBtn:{
      marginTop:10,
      backgroundColor:colors.primary,
      padding:10,
      borderRadius:6,
      alignItems:'center'
    },
    fillBtnText:{
      fontSize: 16,
      fontFamily: FontFamily.Regular,
      color:colors.white
    },
    primaryBtn:{
      marginTop:10,
      backgroundColor:colors.primary,
      padding:10,
      borderRadius:6,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      width:'100%',
    },
    primaryBtnText:{
      color:colors.white,
      textAlign:'center',
      fontFamily:FontFamily.Medium,
      fontSize:16,
    },
  });
  
export default styles;