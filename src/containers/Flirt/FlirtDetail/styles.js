import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height/2;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white,
    },
    scrolledview:{
      flex:1,
    },
    separator:{
      marginTop:13,
      marginBottom:13,
    },
    spacing:{
      height:8,
    },
    text:{
      color:colors.black,
      fontFamily:FontFamily.Regular,
      fontSize:15,
    },
    textGray:{
      color:colors.gray,
      fontFamily:FontFamily.Regular,
      fontSize:15,
    },
    textBold:{
      color:colors.black,
      fontFamily:FontFamily.Medium,
      fontSize:16,
    },
    heading:{
      color:colors.black,
      fontFamily:FontFamily.Medium,
      fontSize:20,
    },
    candidateContainer:{
      marginBottom:25,
    },
    ImagesGrid: {
      flexDirection:'row',
      justifyContent:'space-between',
      flexWrap:'wrap',
      marginBottom:5,
    },
    arrayImagesGrid:{
      flex:1,
      minWidth:'49%',
      paddingRight:2,
      paddingBottom:2,
    },
    ImagesGridphoto:{
        flex:1,
        width:"100%",
        aspectRatio:2/2,
        borderRadius:4,
        resizeMode:'cover',
        borderWidth:1
    },
    close:{
      position:'absolute',
      top:25,
      left:10,
      zIndex:1,
      padding:10
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
    userBtnGrid:{
      flexDirection:"row",
    },
    primaryBtn:{
      backgroundColor:colors.primary,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      padding:10,
      flex:1,
      borderRadius:6,
      marginTop:5,
    },
    primaryBtnText:{
      fontSize:16,
      color:colors.white,
      fontFamily:FontFamily.Medium,
      marginLeft:6
    },
    headRightOpacity:{
      width:60,
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    headRightText:{
      fontFamily:FontFamily.Medium,
      color:colors.primary,
      fontSize:15
    },
    ageOverlay:{
      flexDirection:'row',
      alignItems:'center',
      position:'absolute',
      zIndex:11,
      padding:5,
      backgroundColor:'rgba(0,0,0,.3)',
      borderRadius:6
    },
    ageImage:{
      width:25,
      height:25,
      resizeMode:'contain',
    },
    dot:{
      width:3,
      height:3,
      borderRadius:30,
      backgroundColor:colors.white,
      marginHorizontal:4
    },



    headerGray:{
      backgroundColor:colors.lightGray,
      paddingHorizontal:15,
      height:50,
      borderTopLeftRadius:20,
      borderTopRightRadius:20
    },
    list:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
    },
    listInline:{
      flexDirection:'row',
      alignItems:'center',
    },
    separator:{
      height:1,
      backgroundColor:colors.lightGray,
      marginTop:10,
      marginBottom:10
    },
    profileImages:{
      height:height,
      borderTopLeftRadius:12,
      borderTopRightRadius:12,
      resizeMode:'cover'
    },
    candidateAge:{
      backgroundColor:colors.primary,
      paddingVertical:4,
      paddingHorizontal:15,
      marginTop:-60,
      marginRight:15,
      borderRadius:30,
      alignItems:'center',
      height:27
    },
    candidateAgeText:{
      fontSize:14,
      color:colors.white,
      fontFamily:FontFamily.Regular
    },
    underLine:{
      borderBottomWidth:2,
      borderColor:colors.primary,
      paddingBottom:5
    },
    spacing:{
      height:13
    },
    wspacing:{
      width:10
    },
    spacingXS:{
      height:5
    },
    arrowOuter:{
      backgroundColor:colors.lightGray,
      width:30,
      height:30,
      borderRadius:30,
      alignItems:'center',
      justifyContent:'center'
    },
    footer:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      marginBottom:15
    },
    footerItems:{
      width:50,
      height:50,
      backgroundColor:colors.white,
      alignItems:'center',
      justifyContent:'center',
      margin:3,
      borderRadius:40
    },
    boxShadow:{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    scrolledOverlay:{
      marginTop:-30,
      backgroundColor:colors.white,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
    },
    chipOpcity: {
      borderRadius: 30,
      width: 35,
      height: 35,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  
export default styles;