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
        paddingLeft:15,
        paddingRight:15,
    },
    heading:{
        fontFamily:FontFamily.Medium,
        fontSize:18,
        color:colors.black
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
    chipOpcity: {
      backgroundColor: colors.lightGray,
      borderRadius: 30,
      width: 35,
      height: 35,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
    barSearchChips:{
      marginTop:13,
    },
    activecustomchip:{
      backgroundColor:colors.primary,
      flexDirection:'row',
      padding:10,
      paddingLeft:15,
      paddingRight:15,
      borderRadius:20,
      marginRight:8
    },
    activecustomchiptext:{
      color:colors.white,
      fontFamily:FontFamily.Medium,
    },
    customchip:{
      flexDirection:'row',
      backgroundColor:colors.lightGray,
      padding:10,
      paddingLeft:15,
      paddingRight:15,
      borderRadius:20,
      marginRight:8
    },
    customchiptext:{
      fontFamily:FontFamily.Medium,
    },
    customchipIcon:{
      marginRight:6
    },
    separator:{
      marginTop:13,
    },
    roundedtextinputcontainer:{
        backgroundColor:colors.lightGray,
        borderRadius:6,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10,
        height: 40,
        flex:1,
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
        flex:1,
        height:"100%",
        paddingLeft:5,
    },
    roundedfilterinputcontainer:{
         marginTop:13,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    filterIcon:{
      backgroundColor:colors.lightGray,
      borderRadius:6,
      flexDirection:'row',
      alignItems:'center',
      paddingLeft:10,
      paddingRight:10,
      height: 40,
      marginLeft:10
    },
    restaurantsContainer:{
      marginTop:15
    },
    barImage:{
      resizeMode: "cover",
      minHeight:200,
      maxHeight:200,
      paddingTop:8,
      paddingBottom:8,
      flexDirection:'column',
      justifyContent:'space-between',
    },
    labelFavList:{
      flexDirection:'row',
      justifyContent:'space-between',
    },
    iconOpacity:{
      padding:10,
      paddingTop:5
    },
    startLabelContainer:{
      alignItems:'flex-start'
    },
    primaryLabel:{
      backgroundColor: colors.primary,
      borderTopRightRadius:6,
      borderBottomRightRadius:6,
      marginBottom:6,
      paddingLeft:10,
      paddingRight:10,
      paddingTop:3,
      paddingBottom:3,
    },
    primaryLabelText:{
      fontFamily:FontFamily.Medium,
      fontSize:14,
      color:colors.white,
    },
    whiteLabel:{
      backgroundColor:colors.white,
      borderRadius:20,
      marginLeft:6,
      paddingLeft:10,
      paddingRight:10,
      paddingTop:5,
      paddingBottom:5,
    },
    whiteLabelText:{
      fontFamily:FontFamily.Medium,
      fontSize:14,
      color:colors.black
    },
    barTitleRatingContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:10,
    },
    barTitleList:{
      flexDirection:'row',
      alignItems:'center',
      flex:1
    },
    barTitle:{
      fontFamily:FontFamily.Medium,
      fontSize:16,
      color:colors.black,
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
      fontSize:16,
      color:colors.gray
    },
    barTitleDash:{
      marginLeft:5,
      marginRight:5,
    },
    barRatingComment:{
      flexDirection:'row',
      alignItems:'center'
    },
    flavourContainer:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
    },
    flavourAvailable:{
      flexDirection:'row',
      alignItems:'center',
    },
    dot:{
      width:3,
      borderRadius:20,
      height:3,
      backgroundColor:colors.gray,
      marginLeft:5,
      marginRight:5,
    },
    priceRangeContainer:{
      marginTop:5,
      flexDirection:'row',
      alignItems:'center'
    },
    genderRatio:{
      flexDirection:'row',
      alignItems:'center',
      marginLeft:5,
    },
    ratioLine:{
      marginLeft:5,
      marginRight:5,
      width:2,
      height:2,
      borderRadius:30,
      backgroundColor:colors.gray
    },
    verticalLine:{
      margin:3,
      marginLeft:5,
      marginRight:5,
      width:1.6,
      borderRadius:30,
      backgroundColor:colors.gray
    },
    genderRatioContainer:{
      flexDirection:'row',
      alignItems:'stretch',
    },
    noMargin:{
      marginTop:0
    },
    barWelcomePrimaryBtn:{
      backgroundColor:colors.primary,
      padding:10,
      borderRadius:6
    },
    barWelcomePrimaryBtnText:{
      color:colors.white,
      textAlign:'center',
      fontFamily:FontFamily.Medium,
      fontSize:16,
    },
    textp10: {
      paddingBottom: 10,
    },
    messageShow:{
      flexDirection:'row',
      marginTop:10,
    },
  });

export default styles;
