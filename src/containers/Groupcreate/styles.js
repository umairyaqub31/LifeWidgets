import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white,
    },
    scrolledview:{
      flex:1,
      padding:15,
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
      backgroundColor:colors.lightGray,
      borderRadius:8,
      paddingLeft:10,
      paddingRight:10,
      height: 50,
      paddingLeft:5,
      fontSize:16
    },
    choosePrivacytextinput:{
        backgroundColor:colors.lightGray,
        borderRadius:8,
        paddingLeft:10,
        paddingRight:10,
        height: 50,
        paddingLeft:5,
        fontSize:16,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    labeltext:{
      fontFamily:FontFamily.Medium,
      fontSize:22,
      color:colors.black,
      paddingBottom:5
    },
    primarytext:{
      fontSize: 15,
      fontFamily: FontFamily.Regular,
      color:colors.primary,
      padding:10,
      paddingLeft:0
    },
    graytext:{
      fontSize: 15,
      fontFamily: FontFamily.Regular,
      color:colors.gray
    },
    separator:{
        marginTop:13,
        marginBottom:13
    },
    animatedview:{
        padding:10,
        borderTopWidth:1,
        borderColor:colors.lightGray,
        position:'absolute',
        bottom:0,
        zIndex:111,
        backgroundColor:colors.white,
        width:'100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
      },
      modallistcontainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingTop:10,
        paddingBottom:10,
        
      },
      modallistcontainerleft:{
        flexDirection:'row',
        alignItems:'flex-start',
        flex:1,
      },
      animatedviewheader:{
        alignSelf: "center",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:windowWidth,
        paddingTop:5,
        paddingBottom:5,
      },
      modallist:{
        fontSize:17,
        fontFamily:FontFamily.Regular,
      },
      customchipicons:{
        backgroundColor:colors.lightGray,
        width:40,
        height:40,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
      },
      iphoneradiobtnoutline:{
        borderWidth:1,
        borderRadius:40,
        width:38,
        height:38,
        borderColor:colors.primary,
      },
      primaryfilledbtn:{
        backgroundColor:colors.primary,
        padding:10,
        borderRadius:6,
      },
      primaryfilledbtntext:{
        color:colors.white,
        fontFamily:FontFamily.Medium,
        textAlign:'center',
        fontSize:17
      },
      list:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:"center",
      },
      textBold:{
        color:colors.black,
        fontFamily:FontFamily.Medium,
        fontSize:16,
      },
  });
  
export default styles;