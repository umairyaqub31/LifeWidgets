import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white,
    },
    scrolledview:{
      padding:15,
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
      height: 40
    },
    roundedtextinput:{
      flex:1,
      height:"100%",
      paddingLeft:5,
    },
    heading:{
      fontFamily:FontFamily.Medium,
      fontSize:20,
      color:colors.black
    },
    sorttext:{
      fontFamily:FontFamily.Regular,
      fontSize:15,
      color:colors.primary
    },
    pendinginvitescontainer: {
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#fff',
      justifyContent:'flex-start',
      marginTop:13
    },
    pendinginvitesnamecontainer:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
    },
    username: {
      color:colors.black,
      fontSize: 20,
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
    optionsopacity:{
      paddingLeft:10,
      paddingTop:10,
      paddingBottom:10,
    },
    optionsimage:{
      width:20,
      height:20,
      resizeMode:'contain'
    },
    customchip:{
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:colors.primary,
      padding:8,
      paddingLeft:15,
      paddingRight:15,
      borderRadius:20,
      marginRight:8
    },
    customchiptext:{
      fontFamily:FontFamily.Medium,
      marginLeft:8,
      color:colors.white
    },
  });
  
export default styles;