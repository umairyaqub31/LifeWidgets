import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    ImagesGrid: {
      flexDirection:'row',
      justifyContent:'space-between',
      flexWrap:'wrap',
      marginLeft:-3,
      marginRight:-3,
    },
    arrayImagesGrid:{
      minWidth:'50%',
      flex:1,
      justifyContent:'space-between',
      paddingRight:3,
      paddingLeft:3
    },
    ImagesGridphoto:{
        flex:1,
        width:'100%',
        height:150,
        borderRadius:4,
        resizeMode:'cover',
        marginTop:6,
    },
    
  });
  
export default styles;