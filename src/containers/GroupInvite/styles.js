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
    roundedtextinputcontainer:{
      backgroundColor:colors.lightGray,
      borderRadius:6,
      flexDirection:'row',
      alignItems:'center',
      paddingLeft:10,
      paddingRight:10,
      height: 40,
    },
    roundedtextinput:{
      flex:1,
      height:"100%",
      paddingLeft:5,
    },
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
    separator:{
      marginTop:13,
      marginBottom:13
    }
  });
  
export default styles;