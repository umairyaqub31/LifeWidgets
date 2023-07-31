import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  windowWidth:{
    width:windowWidth
  },
  textBold:{
    fontSize:16,
    fontFamily:FontFamily.Medium,
    color:colors.black
  },
  list:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:15
  }
});
  
export default styles;