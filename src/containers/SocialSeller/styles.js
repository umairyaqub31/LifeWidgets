import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:15,
      backgroundColor:colors.white,
    },
    scrollView:{
      flex:1,
    },
    menuImage:{
      resizeMode:'cover',
      width:'100%',
      height:200
    },
    text:{
      fontSize:16,
      fontFamily:FontFamily.Regular
    },
    textBold:{
      fontSize:16,
      fontFamily:FontFamily.Medium
    },
    separator:{
      height:13
    },
    postTextarea:{
      backgroundColor:colors.white,
      borderWidth:1,
      borderColor:colors.lightGray,
      borderRadius:6,
      fontFamily:FontFamily.Regular,
      fontSize:16,
      marginVertical:10,
      textAlignVertical:'top',
    },
    primaryBtn:{
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