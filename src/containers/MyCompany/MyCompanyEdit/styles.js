import { StyleSheet } from 'react-native';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:15,
      backgroundColor:colors.white,
    },
    scrollView:{
      flex:1,
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
    separator:{
      marginTop:6,
      marginBottom:6,
    },
    textinputrounded:{
      borderRadius:6,
      backgroundColor:colors.lightGray,
      height: 50,
      marginTop:10,
    },
    pickerItem:{
      color:'red',
    },
    postTextarea:{
      backgroundColor:colors.white,
      borderWidth:1,
      borderColor:colors.lightGray,
      borderRadius:6,
      fontFamily:FontFamily.Regular,
      fontSize:16,
      marginVertical:10,
      textAlignVertical:'top',
    },
    primaryBtn:{
      backgroundColor:colors.primary,
      padding:10,
      borderRadius:6,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      width:'100%',
    },
    primaryBtnText:{
      color:colors.white,
      textAlign:'center',
      fontFamily:FontFamily.Medium,
      fontSize:16,
    },
  });
  
export default styles;