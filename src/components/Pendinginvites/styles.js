import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    textopacity:{
      padding:5
    },
    pendinginvitescontainer: {
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#fff',
      justifyContent:'flex-start',
      marginBottom:15
    },
    pendinginvitesnamecontainer:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
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
    graytext:{
      fontSize: 14,
      fontFamily: FontFamily.Regular,
      color:colors.gray
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
    optionsopacity:{
      paddingLeft:10,
      paddingTop:10,
      paddingBottom:10,
    },
    optionsimage:{
      width:20,
      height:20,
      resizeMode:'contain'
    }
  });
  
export default styles;