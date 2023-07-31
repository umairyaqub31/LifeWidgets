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
    },
    horizontalscrollview:{
      paddingBottom:13,
      borderBottomWidth:1,
      borderColor:colors.lightGray,
      flex:1,
      marginHorizontal:15
    },
    customchip:{
      backgroundColor:colors.lightGray,
      padding:10,
      paddingLeft:15,
      paddingRight:15,
      borderRadius:20,
      marginRight:8
    },
    customchiptext:{
      fontFamily:FontFamily.Medium
    },
    heading:{
      fontFamily:FontFamily.Medium,
      fontSize:20,
      color:colors.black
    },
    seealltext:{
      fontFamily:FontFamily.Regular,
      fontSize:15,
      color:colors.primary
    },
  });
  
export default styles;