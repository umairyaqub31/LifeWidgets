import { StyleSheet, Dimensions} from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
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
    RecentCommentQuickReplyText:{
        flexDirection:'row',
        alignItems:'center',
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
  });
  
export default styles;