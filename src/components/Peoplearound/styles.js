import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:15,
        backgroundColor:colors.white
    },
    textopacity:{
      padding:5
    },
    graytext:{
      fontSize: 14,
      fontFamily: FontFamily.Regular,
      color:colors.gray
    },
    pendinginvitescontainer: {
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#fff',
      justifyContent:'flex-start',
      marginBottom:15
    },
    pendinginvitesnamecontainer:{
      flex:1,
    },
    username: {
      color:colors.black,
      fontSize: 18,
      fontFamily: FontFamily.Medium,
    },
    avatarimage:{
      marginRight:10,
      backgroundColor:colors.white
    },
    multibtns:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      marginTop:5
    },
    primarybtn:{
      flex:1,
      backgroundColor:colors.primary,
      padding:6,
      borderRadius:8,
      marginRight:5
    },
    primarybtntext:{
      color:colors.white,
      fontSize:14,
      textAlign:'center',
      fontFamily:FontFamily.Medium
    },
    filledbtntext:{
      color:colors.white,
      fontSize:14,
      textAlign:'center',
      fontFamily:FontFamily.Medium
    },
    graybtn:{
      flex:1,
      backgroundColor:colors.lightGray,
      padding:6,
      borderRadius:8,
      marginLeft:5
    },
    graybtntext:{
      color:colors.black,
      fontSize:14,
      textAlign:'center',
      fontFamily:FontFamily.Medium
    }
  });
  
export default styles;