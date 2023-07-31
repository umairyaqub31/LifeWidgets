import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white,
    },
    scrolledview:{

    },
    horizontalscrollview:{
      padding:15,
      borderBottomWidth:1,
      borderColor:colors.lightGray,
    },
    customchip:{
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:colors.lightGray,
      padding:10,
      paddingLeft:15,
      paddingRight:15,
      borderRadius:20,
      marginRight:8
    },
    customchiptext:{
      fontFamily:FontFamily.Medium,
      marginLeft:8
    },
    heading:{
      fontFamily:FontFamily.Medium,
      fontSize:20,
      color:colors.black
    },
    seealltext:{
      fontFamily:FontFamily.Regular,
      fontSize:15,
      color:colors.primary
    },
    peoplearoundmescroll:{
      marginBottom:30
    },
    animatedview:{
      padding:10,
      borderTopWidth:1,
      borderColor:colors.lightGray,
      position:'absolute',
      bottom:0,
      zIndex:111,
      backgroundColor:colors.white,
      width:'100%',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 11,
    },
    modallistcontainer:{
      flexDirection:'row',
      alignItems:'center',
      paddingTop:10,
      paddingBottom:10,
    },
    modallist:{
      fontSize:17,
      fontFamily:FontFamily.Regular,
    },
    seealllistcontainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginBottom:13
    },
    textopacity:{
      padding:5
    },
    primarytext:{
     fontFamily:FontFamily.Regular,
     color:colors.primary,
     fontSize:15 
    },
    graytext:{
      fontSize: 14,
      fontFamily: FontFamily.Regular,
      color:colors.gray
    },
    customchipicons:{
      backgroundColor:colors.lightGray,
      padding:8,
      paddingLeft:8,
      paddingRight:8,
      borderRadius:20,
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
    headertitle: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    headertitleText: {
      color: colors.black,
      fontSize: 20,
      fontFamily: FontFamily.Medium,
      textAlign: "center",
    },
  });
  
export default styles;