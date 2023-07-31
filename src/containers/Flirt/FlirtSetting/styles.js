import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white,
    },
    scrolledview:{
      flex:1,
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
    text:{
      color:colors.black,
      fontFamily:FontFamily.Regular,
      fontSize:16,
    },
    textBold:{
      color:colors.black,
      fontFamily:FontFamily.Medium,
      fontSize:16,
    },
    textGray:{
      color:colors.gray,
      fontFamily:FontFamily.Regular,
      fontSize:14,
    },
    alignCenter:{
      textAlign:'center'
    },
    flirtList:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      marginBottom:20
    },
    list:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginBottom:10,
    },
    noMargin:{
      marginBottom:0
    },
    noMarginTop:{
      marginTop:0
    },
    RadioButton:{
      flexDirection:'row',
      justifyContent:'space-between',
      width:80
    },
    roundedtextinput:{
      backgroundColor:colors.lightGray,
      flex:1/1.5,
      padding:5,
      borderRadius:6
    },
    roundedtextArea:{
      padding:5,
      borderWidth:1,
      borderColor:colors.gray,
      borderRadius:6,
      marginBottom:13,
      textAlignVertical:'top'
    },
    primaryBtn:{
      backgroundColor:colors.primary,
      padding:10,
      borderRadius:6,
      marginBottom:20
    },
    primaryBtnText:{
      color:colors.white,
      textAlign:'center',
      fontFamily:FontFamily.Medium,
      fontSize:16,
    },
    separator:{
      marginTop:13,
      marginBottom:13,
    },
    addImage:{
      backgroundColor:colors.lightGray,
      height:36,
      width:36,
      borderRadius:6,
      justifyContent:'center',
      alignItems:'center',
      marginLeft:5
    },
    addImageGrid:{
      flexDirection:'row'
    },
    uploadedImage:{
      flexDirection:"row"
    },
    close:{
      position:'absolute',
      right:-4,
      top:-4,
      zIndex:1,
      padding:2,
      backgroundColor:'rgba(0,0,0,.2)',
      borderRadius:30
    },
    genderSelect:{
      flexDirection:'row',
      alignItems:'center'
    },
    genderSelectText:{
      fontFamily:FontFamily.Medium,
      fontSize:11
    },
    headRightOpacity:{
      width:60,
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    headRightText:{
      fontFamily:FontFamily.Medium,
      color:colors.primary,
      fontSize:15
    },
  });
  
export default styles;