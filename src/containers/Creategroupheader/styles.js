import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    option:{
        width:22,
        height:20,
        resizeMode:'contain'
    },
    creategroupheadercontainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10
    },
    heading:{
        fontFamily:FontFamily.Medium,
        fontSize:20,
        color:colors.black
    },
    customchipicons:{
        backgroundColor:colors.lightGray,
        padding:8,
        paddingLeft:8,
        paddingRight:8,
        borderRadius:20,
      },
  });
  
export default styles;