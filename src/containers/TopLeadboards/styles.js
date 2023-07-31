import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../config/color/color";
import fontfamily from '../../config/fonts/fontfamily';
import FontFamily from "../../config/fonts/fontfamily";
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white,
    },
    scrolledview:{
      padding:15,
      paddingBottom:0,
      flex:1
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
    roundedtextinputcontainer:{
      backgroundColor:colors.lightGray,
      borderRadius:6,
      flexDirection:'row',
      alignItems:'center',
      paddingLeft:10,
      paddingRight:10,
      height: 40
    },
    roundedtextinput:{
      flex:1,
      height:"100%",
      paddingLeft:5,
    },
    heading:{
      fontFamily:FontFamily.Medium,
      fontSize:20,
      color:colors.black
    },
    text:{
      fontFamily:FontFamily.Regular,
      fontSize:15,
      color:colors.black
    },
    textBold:{
      fontFamily:FontFamily.Medium,
      fontSize:15,
      color:colors.black
    },
    pendinginvitescontainer: {
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#fff',
      justifyContent:'space-between',
      paddingVertical:13,
      paddingHorizontal:8,
      borderRadius:6,
      backgroundColor:'#F9F9F9',
      marginBottom:6
    },
    pendinginvitesnamecontainer:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
    },
    username: {
      color:colors.black,
      fontSize: 18,
      fontFamily: FontFamily.Medium,
    },
    avatarimage:{
      marginRight:10,
      backgroundColor:colors.white
    },
    graytext:{
      fontSize: 14,
      fontFamily: FontFamily.Regular,
      color:colors.gray
    },
    multibtns:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      marginTop:5
    },
    primarybtn:{
      backgroundColor:colors.primary,
      padding:6,
      borderRadius:8,
      marginRight:5
    },
    primarybtntext:{
      color:colors.white,
      fontSize:14,
      textAlign:'center',
      fontFamily:FontFamily.Medium
    },
    graybtn:{
      backgroundColor:colors.lightGray,
      padding:6,
      borderRadius:8,
      marginLeft:5
    },
    graybtntext:{
      color:colors.black,
      fontSize:14,
      textAlign:'center',
      fontFamily:FontFamily.Medium
    },
    profileImage:{
      flexDirection:'row',
      flex:1,
      alignItems:'center'
    },
    separator:{
      backgroundColor:colors.lightGray,
      height:1,
      marginTop:13
    },
    counter:{
      borderRadius:20,
      width:18,
      height:18,
      backgroundColor:colors.primary,
      alignItems:'center',
      justifyContent:'center',
      position:'absolute',
      top:-5,
      zIndex:11
    },
    countText:{
      fontFamily:FontFamily.Medium,
      color:colors.white,
      fontSize:10
    },
    listInline:{
      flexDirection:'row',
      alignItems:'center'
    },
    listColumn:{
      flexDirection:'column',
      alignItems:'center'
    },
    flags:{
      width:40,
      height:25,
      resizeMode:'contain',
      borderRadius:10,
      marginRight:10,
      marginVertical:5
    },
    spacing:{
      height:13
    },
    spacingXS:{
      height:5
    },
    LinearGradient:{
      height:150,
      borderRadius:6,
    },
    coinsTotal:{
      flexDirection:'row',
      alignItems:'center',
    },
    headRightText:{
      fontFamily:FontFamily.Medium,
      color:colors.primary,
      fontSize:15
    },
    headertitle: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    headertitleText: {
      color: colors.black,
      fontSize: 20,
      fontFamily: FontFamily.Medium,
      textAlign: "center",
    },
    chipOpcity: {
      backgroundColor: colors.lightGray,
      borderRadius: 30,
      width: 35,
      height: 35,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
    modalBody:{
      marginTop:-18,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      backgroundColor:colors.lightGray
    },
    winnerBanner:{
      height:200,
      padding:15
    },
    modalBodyHeader:{
      backgroundColor:colors.lightGray,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      height:50,
      justifyContent:'center',
      alignItems:'center'
    },
    modalContent:{
      backgroundColor:colors.white,
      padding:20,
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
    }
  });
  
export default styles;