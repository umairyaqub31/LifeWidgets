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
    textGray:{
      fontSize:16,
      fontFamily:FontFamily.Regular,
      color:'rgba(0, 0, 0, 0.54)',
      paddingVertical:5
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
    BusinessConsider:{
        marginTop:10,
        marginBottom:5,
        paddingBottom:10,
        borderBottomWidth:1,
        borderColor:colors.gray
    },
    list:{
        flexDirection:'row',
        justifyContent:'space-between',
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
    }
  });
  
export default styles;