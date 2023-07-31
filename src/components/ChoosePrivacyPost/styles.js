import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
    },
    scrolledview:{
        flex:1,
        padding:15,
        paddingTop:0,
        paddingBottom:0,
    },
    choosePrivacy:{
        backgroundColor:colors.primary,
        alignItems:'center',
        padding:10,
        borderRadius:6,
        marginBottom:13
    },
    choosePrivacyText:{
        fontSize: 15,
        fontFamily: FontFamily.Medium,
        color:colors.white,
    },
    heading:{
        fontFamily:FontFamily.Medium,
        fontSize:18,
    },
    primarytext:{
        fontSize: 15,
        fontFamily: FontFamily.Regular,
        color:colors.primary,
        padding:10,
        paddingLeft:0
    },
    graytext:{
        fontSize: 15,
        fontFamily: FontFamily.Regular,
        color:colors.gray
    },
    separator:{
        marginTop:13,
        marginBottom:13
    },
    noMargin:{
        marginTop:0
    },
    modallistcontainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:13
    },
    modallistcontainerRight:{
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between',
        flex:1,
        borderBottomWidth:1,
        borderColor:colors.lightGray,
        marginLeft:10,
        paddingBottom:13,
    },
    modallist:{
        fontSize:16,
        fontFamily:FontFamily.Regular,
    },
    customchipicons:{
        backgroundColor:colors.lightGray,
        width:40,
        height:40,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    },
    primaryfilledbtn:{
        backgroundColor:colors.primary,
        padding:10,
        borderRadius:6,
    },
    primaryfilledbtntext:{
        color:colors.white,
        fontFamily:FontFamily.Medium,
        textAlign:'center',
        fontSize:17
    },
    privacyHead:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:15,
        paddingRight:15,
        marginTop:5
      },
    textPrimary:{
        fontSize:16,
        fontFamily:FontFamily.Medium,
        color:colors.primary
      },
    touchOpacity:{
        padding:5
      },
  });
  
export default styles;