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
        paddingLeft:15,
        paddingRight:15,
    },
    heading:{
        fontFamily:FontFamily.Medium,
        fontSize:20,
        color:colors.black
    },
    separator:{
      marginTop:13,
      marginBottom:13,
    },
    roundedtextinputcontainer:{
        backgroundColor:colors.lightGray,
        borderRadius:6,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10,
        height: 40,
        flex:1,
    },
    boxShadow:{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
    },
    roundedtextinput:{
        flex:1,
        height:"100%",
        paddingLeft:5,
    },
    
  });
  
export default styles;