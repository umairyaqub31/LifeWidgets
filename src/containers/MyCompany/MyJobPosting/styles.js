import { StyleSheet } from 'react-native';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
    },
    scrolledview:{
        flex:1,
        paddingTop:13,
        paddingBottom:13,
        paddingLeft:15,
        paddingRight:15,
        justifyContent:'center',
        alignItems:'center'
    },
    heading:{
        fontFamily:FontFamily.Medium,
        fontSize:20,
        color:colors.black
    },
  });
  
export default styles;