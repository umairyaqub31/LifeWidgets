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
    },
    customchip:{
      flexDirection:'row',
      backgroundColor:colors.lightGray,
      padding:10,
      paddingLeft:15,
      paddingRight:15,
      borderRadius:20,
      marginRight:8,
    },
    customchiptext:{
      fontFamily:FontFamily.Medium,
    },
    customchipIcon:{
      marginRight:6
    },
    separator:{
      marginTop:0,
      marginBottom:0,
      height:0
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
      backgroundColor:colors.white,
      width:'100%',
      height:120,
      resizeMode:'cover',
      borderTopLeftRadius:8,
      borderTopRightRadius:8,
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
    separator:{
      marginTop:13,
      marginBottom:13,
    },
    candidateContainer:{
      flexDirection:'row',
      padding:10,
      paddingTop:0,
    },
    candidateContainerGrid:{
      width:'48%',
      marginTop:'2%',
      marginHorizontal:'1%',
      borderRadius:8,
      backgroundColor:colors.white,
      borderWidth:1, 
      borderColor:colors.lightGray,
      position:'relative',
    },
    candidateGridBody:{
      alignItems:"center",
      padding:8,
    },
    onlineStatusDot:{
      position:'absolute',
      backgroundColor:'#31a24c',
      padding:6,
      borderRadius:30,
      top:6,
      right:5,
      zIndex:11,
      borderWidth:1.5,
      borderColor:colors.white
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
    
  });
  
export default styles;