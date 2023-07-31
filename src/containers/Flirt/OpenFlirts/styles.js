import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";
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
    text:{
      color:colors.black,
      fontFamily:FontFamily.Regular,
      fontSize:16,
    },
    textBold:{
      color:colors.black,
      fontFamily:FontFamily.Medium,
      fontSize:16,
    },
    avatarImg:{
      backgroundColor:'transparent',
      width:142,
      height:142,
      borderRadius:6,
      resizeMode:'cover',
      marginBottom:20
    },
    coverImage:{
      resizeMode: "cover",
      height:172,
      alignItems:'flex-end',
      padding:5
    },
    alignCenter:{
      textAlign:'center'
    },
    noMargin:{
      marginBottom:0
    },
    noMarginTop:{
      marginTop:0
    },
    primaryBtn:{
      backgroundColor:colors.primary,
      padding:10,
      borderRadius:30,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      width:'100%',
    },
    primaryBtnText:{
      color:colors.white,
      textAlign:'center',
      fontFamily:FontFamily.Medium,
      fontSize:16,
    },
    primaryBtnOutline:{
      borderColor:colors.primary,
      borderWidth:2,
      padding:10,
      borderRadius:30,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      flex:1
    },
    primaryBtnTextOutline:{
      color:colors.primary,
      textAlign:'center',
      fontFamily:FontFamily.Medium,
      fontSize:16,
    },
    dangerBtn:{
      borderColor:'#f32013',
      borderWidth:2,
      backgroundColor:'#f32013',
      padding:10,
      borderRadius:30,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      flex:1
    },
    dangerBtnText:{
      color:colors.white,
      textAlign:'center',
      fontFamily:FontFamily.Medium,
      fontSize:16,
    },
    separator:{
      width:10
    },
    candidateContainer:{
      flex:1,
    },
    candidateContainerGrid:{
      flex:1,
    },
    candidateContainerBody:{
      alignItems:'center',
      justifyContent:'center',
      paddingBottom:10,
    },
    onlineStatusDot:{
      position:'absolute',
      backgroundColor:'#31a24c',
      padding:6,
      borderRadius:30,
      top:-5,
      right:5,
      marginRight:50,
      zIndex:11,
      borderWidth:1.5,
      borderColor:colors.white
    },
    acceptRejectBtns:{
      flexDirection:'row',
      justifyContent:'space-around',
      width:'100%',
    },
    acceptRejectBtn:{
      width:'auto',
      flex:1/2.1,
    },
    postTextarea:{
      borderWidth:1,
      borderColor:colors.lightGray,
      borderRadius:6,
      padding:10,
      fontFamily:FontFamily.Regular,
      fontSize:16,
      marginVertical:10,
      textAlignVertical:'top',
      flex:1,
    },
    flirtList:{
      flexDirection:'row',
      alignItems:'center'
    },
    Footter:{
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'flex-end'
    }
  });
  
export default styles;