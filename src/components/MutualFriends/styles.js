import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    mutualimagescontainer:{
      flexDirection:'row',
      marginRight:5,
    },
    mutualimages:{
      borderRadius:30,
      borderLeftWidth:1,
      borderColor:colors.white,
      backgroundColor:colors.white
    },
    mutualtextimagescontainer:{
      flexDirection:'row',
      alignItems:'center',
    },
    graytext:{
      fontSize: 14,
      fontFamily: FontFamily.Regular,
      color:colors.gray
    },
  });
  
export default styles;