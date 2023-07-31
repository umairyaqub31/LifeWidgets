import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";
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
      height: 40,
    },
    separator:{
      backgroundColor:colors.lightGray,
      height:1,
    },
    spacing:{
      height:13,
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
    textgray:{
      fontFamily:FontFamily.Regular,
      fontSize:14,
      color:colors.gray
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
      marginTop:5,
      flex:1
    },
    primarybtn:{
      flex:1,
      backgroundColor:colors.primary,
      padding:7,
      borderRadius:6,
      marginRight:5 
    },
    primarybtntext:{
      color:colors.white,
      fontSize:12,
      textAlign:'center',
      fontFamily:FontFamily.Medium
    },
    graybtn:{
      flex:1,
      backgroundColor:colors.lightGray,
      padding:7,
      borderRadius:6,
      marginLeft:5
    },
    graybtntext:{
      color:colors.black,
      fontSize:12,
      textAlign:'center',
      fontFamily:FontFamily.Medium
    }
  });

export default styles;
