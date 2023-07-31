import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    profileimage: {
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#fff',
    },
    profileimagewithoption:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'flex-start',
      marginBottom:13,
    },
    username: {
      color:colors.black,
      fontSize: 16,
      fontFamily: FontFamily.Medium,
    },
    option:{
      width:22,
      height:18,
      resizeMode:'contain',
    },
    optionopacity:{
      padding:10,
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
      marginLeft:3
    },
    timeagoearth:{
      width:12,
      height:12,
      marginLeft:3
    },
  });
  
export default styles;