import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    replyleftspaceing:{
        marginLeft:52
    },
    replyfooter:{
      flexDirection:'row',
    },
    graytext:{
      color:colors.gray,
      fontFamily:FontFamily.Medium
    },
    replyfooticonopacityleft:{
      paddingLeft:0
    },
    replyfooticonopacity:{
      paddingTop:2,
      padding:13,
    },
  });
  
export default styles;