import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white,
    },
    scrolledview:{
      flex:1,
      padding:15,
      backgroundColor:colors.white,
    },
    heading:{
      fontFamily:FontFamily.Medium,
      fontSize:20,
      color:colors.black,
      textAlign:'center',
      marginBottom:15
    },
    text:{
      fontSize: 14,
      fontFamily: FontFamily.Regular,
      color:colors.black
    },
    textInput:{
      borderWidth:1,
      borderColor:colors.gray,
      borderRadius:6,
      minHeight:150,
      textAlignVertical:'top',
      padding:10,
      fontSize:16,
      fontFamily:FontFamily.Regular,
      color:colors.black
    },
    topWidget:{
      flex:1,
    },
    fillBtn:{
      backgroundColor:colors.primary,
      padding:10,
      borderRadius:6,
      alignItems:'center'
    },
    fillBtnText:{
      fontSize: 16,
      fontFamily: FontFamily.Regular,
      color:colors.white
    }
  });

export default styles;
