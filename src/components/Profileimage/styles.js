import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    profileimage: {
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#fff',
      marginBottom:10,
    },
    username: {
      color:colors.black,
      fontSize: 16,
      fontFamily: FontFamily.Medium,
    },
    avatarimage:{
      marginRight:10,
      backgroundColor:colors.white
    },
    timeslotstatus:{
      flexDirection:'row',
      alignItems:'center'
    },
    timeago:{
      fontSize: 14,
      fontFamily: FontFamily.Regular,
      color:colors.gray
    },
    timeagodot:{
      backgroundColor:colors.gray,
      width:3,
      height:3,
      borderRadius:20,
      marginLeft:3,
      marginRight:5
    },
    timeagoearth:{
      width:12,
      height:12,
      marginLeft:3
    },
    withText:{
      marginTop:1,
      marginRight:5
    },
    textgray:{
      fontSize: 14,
      fontFamily: FontFamily.Regular,
      color:colors.gray
    },
    mentions:{
      fontSize: 14,
      fontFamily: FontFamily.Regular,
      color:colors.primary,
    }
  });
  
export default styles;