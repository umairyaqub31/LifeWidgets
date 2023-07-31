import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    groupInvitefriendscontainer:{
      marginBottom:13,
      paddingBottom:13,
      borderBottomWidth:1,
      borderColor:colors.lightGray
    },
    profileimage: {
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#fff',
      marginBottom:15
    },
    username: {
      color:colors.black,
      fontSize: 18,
      fontFamily: FontFamily.Medium,
    },
    avatarimage:{
      marginRight:10,
      backgroundColor:colors.white,
      width:42,
      height:42,
      borderRadius:8
    },
    graytext:{
      fontSize: 14,
      fontFamily: FontFamily.Regular,
      color:colors.gray
    },
    primarybtn:{
      width:80,
      backgroundColor:colors.primary,
      padding:6,
      borderRadius:6,
      marginRight:5,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    primarybtntext:{
      color:colors.white,
      fontSize:15,
      textAlign:'center',
      fontFamily:FontFamily.Regular
    },
    graybtn:{
      width:80,
      backgroundColor:colors.lightGray,
      padding:6,
      borderRadius:6,
      marginRight:5,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    graybtntext:{
      color:colors.black,
      fontSize:15,
      textAlign:'center',
      fontFamily:FontFamily.Regular
    }
  });
  
export default styles;