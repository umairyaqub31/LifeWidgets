import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { Dimensions } from 'react-native';


const windowWidth = Dimensions.get('window').width;



const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white,
    },
    scrolledview:{
      flex:1,
      margin:15,
    },
    username:{
      fontFamily:FontFamily.Medium,
      fontSize:28,
      color:colors.black,
    },
    userBtnGrid:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      marginTop:13,
    },
    primaryBtn:{
      backgroundColor:colors.primary,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      padding:10,
      flex:1,
      borderRadius:6,
    },
    primaryBtnText:{
      fontSize:16,
      color:colors.white,
      fontFamily:FontFamily.Medium,
      marginLeft:5
    },
    dottedBtn:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      padding:10,
      paddingLeft:15,
      paddingRight:15,
      backgroundColor:colors.lightGray,
      borderRadius:6,
      marginLeft:5
    },
    separator:{
      marginTop:13,
      marginBottom:13
    },
    text:{
      fontSize:16,
      fontFamily:FontFamily.Regular,
      color:colors.black
    },
    graytext:{
      color:colors.gray,
      fontSize:16,
      fontFamily:FontFamily.Regular,
    },
    primarytext:{
      color:colors.primary,
      fontSize:16,
      fontFamily:FontFamily.Regular,
    },
    textBold:{
      fontSize:16,
      fontFamily:FontFamily.Medium,
      color:colors.black
    },
    firstList:{
      paddingTop:0
    },
    lastList:{
      paddingBottom:0
    },
    list:{
      flexDirection:'row',
      alignItems:'center',
      paddingTop:10,
      paddingBottom:10
    },
    listText:{
      marginLeft:5
    },
    listIcon:{
      width:30
    },
    lightPrimaryBtn:{
      backgroundColor:colors.lightPrimary,
      padding:10,
      borderRadius:6,
      alignItems:'center',
      marginTop:15
    },
    lightPrimaryBtnText:{
      fontFamily:FontFamily.Medium,
      fontSize:16,
      color:colors.primary
    },
    heading:{
      fontFamily:FontFamily.Medium,
      fontSize:24
    },
    findFriends:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    },
    friendsGridContainer:{
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'space-between'
    },
    friendsGrid:{
      width:'49%',
      marginTop:13,
      borderRadius:6,
      backgroundColor:colors.white,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      paddingVertical:10
    },
    friendsGridPhoto:{
      height:150,
      width:'100%',
      resizeMode:'cover',
      borderTopLeftRadius:6,
      borderTopRightRadius:6,
      marginBottom:3
    },
    friendsGridName:{
      padding:6,
    },
    grayBtn:{
      backgroundColor:colors.lightGray,
      padding:10,
      marginTop:13,
      borderRadius:6
    },
    grayBtnText:{
      fontFamily:FontFamily.Medium,
      fontSize:16,
      color:colors.black,
      textAlign:'center'
    },
    profilePosts:{
      marginLeft:-15,
      marginRight:-15
    },
    postcontainer:{
      paddingLeft:15,
      paddingRight:15,
      borderBottomWidth:1,
      borderColor:colors.lightGray,
      marginTop:13
    },
    profileimagewithoption:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'flex-start',
      marginBottom:13,
    },
    option:{
      width:22,
      height:18,
      resizeMode:'contain',
    },
    optionopacity:{
      padding:10,
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
  });
  
export default styles;