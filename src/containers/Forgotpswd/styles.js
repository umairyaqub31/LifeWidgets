import { StyleSheet, Dimensions } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:colors.white,
      height:height,
      padding:15,
    },
    text:{
      fontSize:16,
      fontFamily:FontFamily.Regular,
      color:colors.white,
      textAlign:'center'
    },
    forgotpswdtext:{
      fontSize: 24,
      fontFamily: FontFamily.Medium,
      textAlign:'center',
      color:colors.black,
    },
    spacing:{
      height:10
    },
    logo:{
      width:width,
      height:100,
      resizeMode:'contain'
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
    widgetsText:{
      flex:0.25,
      justifyContent:'flex-end',
      alignItems:'center',
    },
    widgetsForm:{
      flex:1,
      justifyContent:'center',
      borderTopLeftRadius:40,
      borderTopRightRadius:40,
    },
    textinputrounded:{
      borderTopLeftRadius:6,
      borderTopRightRadius:6,
      borderBottomLeftRadius:6,
      borderBottomRightRadius:6,
      backgroundColor:colors.lightGray,
      height: 50,
      overflow: 'hidden',
    },
    filledbtn:{
        flexDirection:'row',
        marginTop:20,
        marginBottom:20,
        backgroundColor:colors.primary,
        borderRadius:6,
        height:45,
        alignItems:'center',
        justifyContent:'center',
    },
    filledbtnText:{
        fontSize: 16,
        fontFamily: FontFamily.Medium,
        color:colors.white,
    },
    listInline:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
    },
  });
  
export default styles;