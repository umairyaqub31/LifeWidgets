import { StyleSheet, Dimensions } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
const width = Dimensions.get("screen").width - 80;
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrolledView:{
        flex:1,
        backgroundColor:colors.white,
        padding:15,
        justifyContent:'center',
        justifyContent:'space-evenly'
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
      fontSize:16,
      fontFamily:FontFamily.Regular,
      color:colors.black,
    },
    textBold:{
        fontSize:18,
        fontFamily:FontFamily.Medium,
      },
    textinputrounded:{
      borderRadius:6,
      backgroundColor:colors.lightGray,
      height: 65,
      padding:10,
      justifyContent:'center',
      alignItems:'center'
    },
    heading:{
      fontSize:20,
      fontFamily:FontFamily.Medium,
      color:colors.black,
      marginBottom:10,
    },
    logo:{
      aspectRatio:2/2,
      resizeMode:'contain'
    },
    banner:{
      aspectRatio:3/2,
      resizeMode:'contain'
    },
    photos:{
      width:width/2,
      height:150,
      resizeMode:'contain'
    },
    list:{
      borderWidth:1,
      borderColor:colors.lightGray,
      padding:10
    },
    separator:{
      backgroundColor:colors.white,
      marginTop:13,
      marginBottom:13,
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