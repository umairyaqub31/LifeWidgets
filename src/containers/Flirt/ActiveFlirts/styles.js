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
    userName:{
      color:colors.black,
      fontFamily:FontFamily.Medium,
      fontSize:16,
    },
    avatarImg:{
      backgroundColor:'transparent',
      width:52,
      height:52,
      borderRadius:6,
      resizeMode:'cover',
      marginBottom:5
    },
    coverImage:{
      resizeMode: "cover",
      height:72,
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
      marginTop:10,
      backgroundColor:colors.primary,
      padding:10,
      borderRadius:6,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    primaryBtnText:{
      color:colors.white,
      textAlign:'center',
      fontFamily:FontFamily.Medium,
      fontSize:16,
    },
    primaryBtnOutline:{
      marginTop:10,
      borderWidth:2,
      borderColor:colors.primary,
      height:32,
      width:'100%',
      borderRadius:16,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    primaryBtnTextOutline:{
      color:colors.primary,
      textAlign:'center',
      fontFamily:FontFamily.Medium,
      fontSize:14,
    },
    grayBtnOutline:{
      marginTop:10,
      borderWidth:2,
      borderColor:colors.gray,
      height:32,
      width:'100%',
      borderRadius:16,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    grayBtnTextOutline:{
      color:colors.gray,
      textAlign:'center',
      fontFamily:FontFamily.Medium,
      fontSize:14,
    },
    separator:{
      marginTop:13,
      marginBottom:13,
    },
    candidateContainer:{
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'space-between',
      margin:-5
    },
    candidateContainerGrid:{
      width:'46%',
      margin:'2%',
      borderRadius:6,
      backgroundColor:colors.white,
      borderWidth:1,
      borderColor:colors.lightGray,
    },
    candidateContainerBody:{
      position:'relative',
      alignItems:'center',
      marginTop:-25,
      paddingLeft:10,
      paddingRight:10,
      paddingBottom:10,
    },
    onlineStatusDot:{
      position:'absolute',
      backgroundColor:'#31a24c',
      padding:6,
      borderRadius:30,
      top:60,
      left:5,

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
    }
  });

export default styles;
