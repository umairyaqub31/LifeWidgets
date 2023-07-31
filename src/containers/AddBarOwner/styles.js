import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrolledView:{
        flex:1,
        backgroundColor:colors.white,
        paddingLeft:15,
        paddingRight:15,
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
      height: 50,
      marginTop:10,
    },
    customTextInput:{
      borderRadius:6,
      backgroundColor:colors.lightGray,
      color:colors.gray,
      height: 50,
      marginTop:10,
      paddingLeft:15,
      justifyContent:'center',
    },
    customTextInputText:{
      fontSize:16,
      fontFamily:FontFamily.Regular,
      color:'rgba(0, 0, 0, 0.54)',
      paddingVertical:5
    },
    VipStatus:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      marginTop:10,
      paddingBottom:10,
      borderBottomWidth:1,
      borderColor:colors.black
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