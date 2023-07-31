import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    postcontainer:{
      marginTop:13,
      paddingLeft:15,
      paddingRight:15,
      borderBottomWidth:1,
      borderColor:colors.lightGray,
      width:windowWidth
    },
    profileimagewithoption:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'flex-start',
      marginBottom:13,
    },
    option:{
      width:22,
      height:18,
      resizeMode:'contain',
    },
    optionopacity:{
      padding:10,
    },
    profileimage: {
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#fff',
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
      marginLeft:3
    },
    timeagoearth:{
      width:12,
      height:12,
      marginLeft:3
    },
    grouppostshareoutline:{
      borderWidth:1,
      borderColor:colors.lightGray,
      marginLeft:-5,
      marginRight:-5,
      padding:5,
      paddingBottom:0,
      borderBottomWidth:0
    },
    grouppostsharespaceing:{
    }
    
  });
  
export default styles;