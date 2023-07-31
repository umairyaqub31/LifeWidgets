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
      flex:1,
      padding:15
    },
    postcontainer:{
      paddingLeft:15,
      paddingRight:15,
      borderBottomWidth:1,
      borderColor:colors.lightGray,
      width:windowWidth,
      marginTop:13
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
    heading:{
      fontSize:20,
      fontFamily:FontFamily.Medium,
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
    setFeedTime:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    },
    spacing:{
      height:15
    },
    primaryBtn:{
      backgroundColor:colors.primary,
      height:40,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:4,
  },
  primaryBtnText:{
      color:colors.white,
      fontFamily:FontFamily.Medium,
      fontSize:16,
      textTransform:'uppercase',
  },
  DatePicker:{
    backgroundColor:colors.lightGray,
    borderRadius:6,
    marginLeft:15
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
  list:{
    marginTop:10,
    flexDirection:'row',
    alignItems:'center'
  },
  pickerContainer:{
    flexDirection:"row"
  }
});
  
export default styles;