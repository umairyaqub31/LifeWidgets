import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'white',
    },
    scrolledView:{
    },
    postcontainer:{
      paddingLeft:15,
      paddingRight:15,
      borderColor:colors.lightGray,
      width:windowWidth,
      marginTop:1,
      paddingTop:10,
      paddingBottom:10,
    },
    profileimagewithoption:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'flex-start',
    },
    option:{
      width:22,
      height:18,
      resizeMode:'contain',
    },
    optionopacity:{
      padding:10,
    },
    dialogContentView: {
      paddingLeft: 18,
      paddingRight: 18,
    },
    navigationBar: {
      borderBottomColor: '#b5b5b5',
      borderBottomWidth: 0.5,
      backgroundColor: '#ffffff',
    },
    navigationTitle: {
      padding: 10,
    },
    navigationButton: {
      padding: 10,
    },
    navigationLeftButton: {
      paddingLeft: 20,
      paddingRight: 40,
    },
    navigator: {
      flex: 1,
      // backgroundColor: '#000000',
    },
    customBackgroundModal: {
      opacity: 0.5,
      backgroundColor: '#000',
    },

    footerstats:{
      flexDirection:'row',
      justifyContent:'space-between',
      flex:1,
      paddingTop:8,
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
    textgray:{
      fontSize: 13,
      fontFamily: FontFamily.Regular,
      color:colors.gray
    },
    withText:{
      marginLeft:3,
      marginRight:3
    },
    graytext:{
      fontSize:13,
      fontFamily:FontFamily.Regular,
      color:colors.gray,
      marginLeft:5
    },
    profileimage: {
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#fff',
      marginBottom:10,
      flex:1
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
    text:{
      fontSize:15,
      fontFamily:FontFamily.Regular,
      color:colors.black,
    },
    postdescription:{
        marginBottom:13,
    },
    ImagesGrid: {
      flexDirection:'row',
      height:200,
      marginLeft:-10,
      marginRight:-15,
      justifyContent:'space-between',
      flexWrap:'wrap',
    },
    arrayImagesGrid:{
      flex:1,
      minWidth:'49%',
      paddingRight:5,
      paddingBottom:5
    },
    ImagesGridphoto:{
        flex:1,
        width:"100%",
        borderRadius:4,
        resizeMode:'cover',
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
    sherecontainer:{
      borderWidth:1,
      borderColor:colors.lightGray,
      padding:10
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




    // top tabs shows styleing

    animtedTabsWrapper:{
      height:50,
      width:'100%',
      backgroundColor:colors.white,
      position:'absolute',
      top:0,
      zIndex:1,
      borderWidth:1,
      borderColor:colors.lightGray,
    },
    list:{
      flexDirection:'row',
      justifyContent:'space-between'
    },
  });

export default styles;
