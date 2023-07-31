import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    scrollView:{
      padding:15,
      paddingRight:15,
      paddingBottom:15,
    },
    modallistcontainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
      },
      modallist:{
        fontSize:16,
        fontFamily:FontFamily.Medium,
      },
      customchipicons:{
        backgroundColor:colors.lightGray,
        width:40,
        height:40,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
      },
      graytext:{
        fontSize:14,
        fontFamily:FontFamily.Regular,
        color:colors.gray
      }
  });
  
export default styles;