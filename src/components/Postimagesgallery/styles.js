import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  gallerycontainer:{
      height:300,
      marginBottom:13,
      marginLeft:-15,
      marginRight:-15
    },
    imagesgallery:{
      width:'100%',
      height:'100%',
      resizeMode:'contain'
    }
  });
  
export default styles;