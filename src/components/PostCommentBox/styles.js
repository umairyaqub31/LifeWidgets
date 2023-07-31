import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({

    writeCommentTextarea:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      paddingLeft:15,
      paddingRight:15,
      height:70,
      borderTopWidth:1,
      borderColor:colors.lightGray,
      backgroundColor:colors.white,
      zIndex:11,

    },
    roundedTextareaContainer:{
        backgroundColor:colors.lightGray,
        minHeight:36,
        justifyContent:'center',
        borderRadius:30,
        paddingLeft:10,
        paddingRight:10,
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    roundedTextarea:{
        flex:1,
        paddingTop:8,
        paddingBottom:8,
        fontSize:14,
        color:colors.black,
        fontFamily:FontFamily.Regular
    },
    sendIcon:{
      backgroundColor:colors.primary,
      height:36,
      width:36,
      borderRadius:40,
      alignItems:'center',
      justifyContent:'center',
      marginLeft:5
    },
    roundedTextareaIcons:{
        padding:3
    },
    footerstats:{
      flexDirection:'row',
      justifyContent:'space-between',
      flex:1,
      paddingTop:10,
      paddingBottom:13,
    },
    foottotallikes:{
        flexDirection:'row',
        alignItems:'center',
        flex:1
    },
    dot:{
      width:2,
      height:2,
      backgroundColor:colors.gray,
      marginLeft:4,
      borderRadius:20
    },
    footstatsopacity:{
      flexDirection:'row',
      alignItems:'center'
    },
    footerStatslikeIconChip:{
      backgroundColor:colors.primary,
      width:20,
      height:20,
      borderRadius:30,
      alignItems:'center',
      justifyContent:'center'
    },
    profileimage: {
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#fff',
      marginBottom:10,
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
    timeslotstatus:{
      flexDirection:'row',
      alignItems:'center'
    },
    timeago:{
      fontSize: 14,
      fontFamily: FontFamily.Regular,
      color:colors.gray
    },
    timeagodot:{
      backgroundColor:colors.gray,
      width:3,
      height:3,
      borderRadius:20,
      marginLeft:3,
      marginRight:5
    },
    timeagoearth:{
      width:12,
      height:12,
      marginLeft:3
    },
    postdescription:{
      marginBottom:13,
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