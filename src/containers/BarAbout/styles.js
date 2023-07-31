import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
    },
    scrolledview:{
        flex:1,
        paddingTop:13,
        paddingBottom:13,
        paddingLeft:15,
        paddingRight:15,
    },
    close: {
      position: "absolute",
      top: 25,
      left: 10,
      zIndex: 1,
      padding: 10,
    },
    heading:{
        fontFamily:FontFamily.Medium,
        fontSize:20,
        color:colors.black
    },
    barTitle:{
        fontFamily:FontFamily.Medium,
        fontSize:20,
        color:colors.white,
        marginBottom:10,
    },
    separator:{
      marginTop:13,
      marginBottom:13,
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
    barCoverImage:{
      resizeMode: "cover",
      minHeight:200,
      maxHeight:200,
    },
    barCoverImageBody:{
      padding:10,
      alignItems:'center',
    },
    barInfo:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      width:'100%',
      marginBottom:30
    },
    overLay:{
      backgroundColor:'rgba(0,0,0,.5)',
      position:'absolute',
      height:'100%',
      width:'100%',
    },
    changeImage:{
      padding:10,
    },
    textBold:{
      fontFamily:FontFamily.Medium,
      fontSize:14,
      color:colors.black
    },
    textGray:{
      fontFamily:FontFamily.Regular,
      fontSize:14,
      color:colors.gray
    },
    text:{
      fontFamily:FontFamily.Regular,
      fontSize:15,
      color:colors.black
    },
    textWhite:{
      fontFamily:FontFamily.Medium,
      fontSize:14,
      color:colors.white,
      opacity:0.7
    },
    primaryText:{
      fontFamily:FontFamily.Regular,
      fontSize:15,
      color:colors.primary
    },
    headList:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginRight:8
    },
    servicesAvailableContainer:{
      flexDirection:'row',
      flexWrap:'wrap',
    },
    serviceName:{
      flexDirection:'column',
    },
    serviceAvailable:{
      marginTop:13,
      flexDirection:'row',
      width:'20%',
      justifyContent:'center',
      alignItems:'center',
    },
    address:{
      flex:1,
    },
    barIcon:{
      marginBottom:8,
      textAlign:'center',
    },
    list:{
      flexDirection:'row',
      marginTop:10,
    },
    firstList:{
      marginTop:13
    },
    listIcon:{
      marginRight:10
    },
    dayNtime:{
      flexDirection:'row',
      marginBottom:5
    },
    profileimage: {
      flexDirection:'row',
      alignItems:'center',
    },
    username: {
      color:colors.black,
      fontSize: 16,
      fontFamily: FontFamily.Medium,
    },
    avatarimage:{
      marginRight:10,
      backgroundColor:colors.white,
      width:'100%',
      height:120,
      borderTopLeftRadius:8,
      borderTopRightRadius:8,
    },
    timeAccordion:{
      marginLeft:-6,
      marginRight:-6,
    },
    noMarginTop:{
      marginTop:0
    },
    noMarginBottom:{
      marginBottom:0
    },
    friendsContainer:{
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'space-between'
    },
    friendsGrid:{
      backgroundColor:colors.white,
      width:'49%',
      marginTop:8,
      borderRadius:8
    },
    friendsGridBody:{
      padding:8
    },
    OpenText:{
      color:'green'
    },
    CloseText:{
      color:'red'
    },
    barClaim:{
      marginTop:10
    },
    fillBtn:{
      flex:1,
      backgroundColor:colors.primary,
      padding:10,
      margin:10,
      borderRadius:8,
      alignItems:'center'
    },
    fillBtnText:{
      color:colors.white,
      fontFamily:FontFamily.Medium
    },
    headertitle:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    headertitleText:{
      color:colors.black,
      fontSize: 20,
      fontFamily: FontFamily.Medium,
      textAlign:'center'
    },
    headRightOpacity:{
      width:60,
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
  });
  
export default styles;