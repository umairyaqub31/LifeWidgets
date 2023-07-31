import { StyleSheet, Dimensions } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const height = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:colors.white,
      height:height
    },
    text:{
      fontSize:16,
      fontFamily:FontFamily.Regular,
      color:colors.white,
      textAlign:'center'
    },
    forgotpswdtext:{
      fontSize: 30,
      fontFamily: FontFamily.Medium,
      textAlign:'center',
      color:colors.primary,
    },
    widgetsText:{
      flex:.8,
      justifyContent:'center',
    },
    widgetsForm:{
      flex:3,
      justifyContent:'center',
      backgroundColor:colors.primary,
      padding:15,
      borderTopLeftRadius:40,
      borderTopRightRadius:40,
    },
    textinputrounded:{
      borderTopLeftRadius:6,
      borderTopRightRadius:6,
      borderBottomLeftRadius:6,
      borderBottomRightRadius:6,
      backgroundColor:colors.white,
      height: 50,
      overflow: 'hidden',
      marginTop:20
    },
    filledbtn:{
        flexDirection:'row',
        marginTop:20,
        marginBottom:20,
        backgroundColor:colors.white,
        borderRadius:6,
        height:45,
        alignItems:'center',
        justifyContent:'center',
    },
    filledbtnText:{
        fontSize: 16,
        fontFamily: FontFamily.Medium,
        color:colors.primary,
        marginRight:5
    }
  });
  
export default styles;