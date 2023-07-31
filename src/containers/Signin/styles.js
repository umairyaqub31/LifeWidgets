import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width-50;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:colors.white,
      height:height,
      padding:15,
    },
    text:{
      fontSize:16,
      fontFamily:FontFamily.Medium,
      color:colors.primary,
      textAlign:'center'
    },
    textBlack:{
      fontSize:16,
      fontFamily:FontFamily.Regular,
      color:'white',
      textAlign:'center'
    },
    textGray:{
      fontSize:16,
      fontFamily:FontFamily.Regular,
      color:colors.gray,
      marginHorizontal:10
    },
    spacing:{
      height:15
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
    logo:{
      width:width,
      height:100,
      resizeMode:'contain'
    },
    textCurrentMembers:{
      fontSize:24,
      fontFamily:FontFamily.Regular,
      color:colors.black,
      textAlign:'center'
    },
    textBlueSignupHere:{
      fontSize:28,
      fontFamily:FontFamily.Regular,
      color:'#2ecc71',
      textShadowColor: 'rgba(44, 62, 80,1.0)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
      marginTop:5,
      textAlign:'center'
    },
    welcometext:{
      fontSize: 24,
      fontFamily: FontFamily.Medium,
      textAlign:'center',
      color:colors.black,
    },
    signintext:{
      fontSize: 30,
      fontFamily: FontFamily.Medium,
      textAlign:'center',
      color:colors.primary,
    },
    widgetsText:{
      flex:.4,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:colors.white,
    },
    widgetsForm:{
      flex:1,
    },
    textinputrounded:{
      borderTopLeftRadius:6,
      borderTopRightRadius:6,
      borderBottomLeftRadius:6,
      borderBottomRightRadius:6,
      height: 50,
      overflow: 'hidden',
      marginTop:20,
      backgroundColor:colors.lightGray,
    },
    checkboxtext:{
      flexDirection:'row',
      alignItems:'center'
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
        marginRight:5
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
      justifyContent:'center',
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
