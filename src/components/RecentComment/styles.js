import { StyleSheet, Dimensions} from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    profileimage: {
      flexDirection:'row',
      flexWrap:'wrap',
      backgroundColor:'#fff',
      justifyContent:'flex-start',
    },
    username: {
      color:colors.black,
      fontSize: 15,
      fontFamily: FontFamily.Medium,
    },
    avatarimage:{
      marginRight:5,
      backgroundColor:colors.white
    },
    text:{
      color:colors.black,
      fontSize: 14,
      fontFamily: FontFamily.Regular,
    },
    Medium:{
        fontFamily:FontFamily.Medium,
        opacity:0.7
    },
    graytext:{
      color:colors.gray,
      fontSize: 14,
      fontFamily: FontFamily.Regular,
    },
    RecentComment:{
        paddingLeft:15,
        paddingRight:15,
        paddingTop:13,
        paddingBottom:13,
        borderBottomWidth:1,
        borderColor:colors.lightGray,
        width:windowWidth
    },
    RecentCommentBox:{
        backgroundColor:colors.lightGray,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:15,
        paddingRight:15,
        borderRadius:16,
    },
    RecentCommentQuickReplyText:{
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15,
        paddingTop:3,
        paddingBottom:5
    },
    dot:{
        width:3,
        height:3,
        backgroundColor:colors.gray,
        borderRadius:20,
        marginLeft:5,
        marginRight:5
    },
    userMentionedBox:{
        flexDirection:'row',
        alignItems:'center'
    },
    RecentCommentContent:{
        flex:1,
        alignItems:'flex-start'
    },
    writeCommentTextarea:{
        flexDirection:'row',
        flex:1
    },
    timeago: {
      fontSize: 14,
      fontFamily: FontFamily.Regular,
      color: colors.gray,
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
        color:colors.gray,
        fontFamily:FontFamily.Regular
    },
    roundedTextareaIcons:{
        padding:3
    }
  });
  
export default styles;