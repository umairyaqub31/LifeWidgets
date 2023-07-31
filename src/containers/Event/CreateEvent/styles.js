import { StyleSheet } from 'react-native';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrolledView:{
        flex:1,
        backgroundColor:colors.white,
        paddingLeft:10,
        paddingRight:10,
    },
    boxShadow:{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      },
    text:{
      fontSize:16,
      fontFamily:FontFamily.Regular,
      color:colors.black,
    },
    textGray:{
      fontSize:16,
      fontFamily:FontFamily.Regular,
      color:colors.lightGray,
    },
    primaryText:{
      fontSize:14,
      fontFamily:FontFamily.Medium,
      color:colors.primary,
    },
    textBold:{
        fontSize:18,
        fontFamily:FontFamily.Medium,
    },
    userName:{
      fontSize:16,
      fontFamily:FontFamily.Medium,
    },
    textinputrounded:{
      borderRadius:6,
      backgroundColor:colors.lightGray,
      height: 50,
      fontSize:16,
      margin:5,
      fontFamily:FontFamily.Regular,
    },
    customTextInput:{
      borderRadius:6,
      backgroundColor:colors.lightGray,
      color:colors.gray,
      height: 50,
      paddingLeft:10,
      justifyContent:'center',
      margin:5,
    },
    customTextInputText:{
      fontSize:16,
      fontFamily:FontFamily.Regular,
      color:'rgba(0, 0, 0, 0.54)',
      paddingVertical:5
    },
    textarea:{
      borderRadius:6,
      backgroundColor:colors.lightGray,
      minHeight: 100,
      fontSize:16,
      margin:5,
      fontFamily:FontFamily.Regular,
    },
    list:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    listInline:{
        flexDirection:'row',
        alignItems:'center'
    },
    barSearchChips:{
      marginTop:13,
      flexDirection:'row',
      flexWrap:'wrap'
    },
    activecustomchip:{
      backgroundColor:colors.primary,
    },
    activecustomchiptext:{
      color:colors.white
    },
    customchip:{
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:colors.lightGray,
      padding:10,
      borderRadius:20,
      marginRight:8,
      marginRight:5,
      marginBottom:5
    },
    customchiptext:{
      fontFamily:FontFamily.Medium,
      fontSize: 14,
      color:colors.black
    },
    activecustomchip: {
      backgroundColor: colors.primary,
      flexDirection:'row',
      alignItems:'center',
      padding:10,
      borderRadius:20,
      marginRight:8,
      marginRight:5,
      marginBottom:5
    },
    activecustomchiptext:{
      fontFamily:FontFamily.Medium,
      fontSize: 14,
      color:colors.white
    },
    logo:{
      width:'100%',
      height:60,
      resizeMode:'contain'
    },
    uploadImagesContainer:{
      padding:20,
      borderRadius:6,
      backgroundColor:colors.lightGray,
      marginTop:10,
      alignItems:'center',
      justifyContent:'center',
      margin:5,
    },
    spacing:{
      height:15
    },
    profileImageContainer:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
    },
    userNameContainer:{
      flexDirection:'row',
      alignItems:'center'
    },
    avatar:{
      marginRight:10
    },
    separator:{
      height:1.8,
      backgroundColor:colors.lightGray,
      marginTop:10,
      marginBottom:10
    },
    dotsOpacity:{
      paddingVertical:10,
      paddingLeft:10
    }
  });
  
export default styles;