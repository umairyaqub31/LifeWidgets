import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width-50;

const styles = StyleSheet.create({
    container: {
      padding:15,
      backgroundColor:colors.white,
      height:height
    },
    text:{
      fontSize:15,
      fontFamily:FontFamily.Regular,
      color:colors.black,
    },
    textGray:{
      fontSize:14,
      fontFamily:FontFamily.Regular,
      color:colors.gray,
    },
    logo:{
      width:width,
      height:100,
      resizeMode:'contain'
    },
    registrationtext:{
      fontSize: 24,
      fontFamily: FontFamily.Medium,
      textAlign:'center',
      color:colors.black,
    },
    widgetsText:{
      flex:.4,
      justifyContent:'center',
      alignItems:'center',
    },
    widgetsForm:{
      flex:1,
      borderTopLeftRadius:40,
      borderTopRightRadius:40,
    },
    textinputrounded:{
      borderTopLeftRadius:6,
      borderTopRightRadius:6,
      borderBottomLeftRadius:6,
      borderBottomRightRadius:6,
      height: 50,
      overflow: 'hidden',
      backgroundColor:colors.lightGray,
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
    spacingXS:{
      height:4
    },
    spacing:{
      height:10
    },
    checkboxtext:{
      flexDirection:'row',
      textAlign:"center"
    },
    filledbtn:{
        marginTop:20,
        marginBottom:10,
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
    hyperlinkStyle: {
      textDecorationLine: 'underline',
      fontSize:14,
      color:colors.primary,
      fontFamily:FontFamily.Regular
    },
    divider:{
      height:1.5,
      backgroundColor:colors.lightGray,
      flex:1
    },
    horizontalDivider:{
      flexDirection:'row',
      alignItems:'center'
    },
    listInline:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    signUpBtn:{
      backgroundColor:'rgba(22, 139, 252, .1)',
      height:45,
      borderRadius:6,
      alignItems:'center',
      justifyContent:'center'
    }
  });

export default styles;
