import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  avataroverlyicon:{
    backgroundColor:colors.primary,
    width:25,
    height:25,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:30,
  },
  dislike:{
    backgroundColor:colors.gray
  },
  favorite:{
      backgroundColor:'red'
  }
});
  
export default styles;