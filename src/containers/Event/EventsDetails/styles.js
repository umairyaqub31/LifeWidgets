import { StyleSheet, Dimensions } from 'react-native';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";


const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrolledView:{
      flex:1,
      backgroundColor:colors.white,
      paddingLeft:15,
      paddingRight:15,
    },
    boxShadow:{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      },
    text:{
      fontSize:16,
      fontFamily:FontFamily.Regular,
      color:colors.black,
    },
    textGray:{
      fontSize:16,
      fontFamily:FontFamily.Regular,
      color:colors.gray,
    },
    primaryText:{
      fontSize:14,
      fontFamily:FontFamily.Medium,
      color:colors.primary,
    },
    heading:{
        fontSize:22,
        fontFamily:FontFamily.Medium,
    },
    textBold:{
      fontSize:16,
      fontFamily:FontFamily.Medium,
      color:colors.black
  },
    userName:{
      fontSize:16,
      fontFamily:FontFamily.Medium,
    },
    coverImage:{
      height:300,
      resizeMode: "cover",
    },
    overlay:{
      flex:1,
      backgroundColor:'rgba(0, 0, 0, .2)',
      paddingVertical:20,
      paddingTop:50
    },
    list:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingHorizontal:10
    },
    listInline:{
        flexDirection:'row',
    },
    listIcon:{
      width:40,
    },
    spacing:{
      height:15
    },
    spacingXS:{
      height:5
    },
    separator:{
      height:1.8,
      backgroundColor:colors.lightGray,
      marginTop:13,
      marginBottom:13
    },
    eventsDescription:{
      flex:1,
      backgroundColor:colors.white,
      marginTop:-60,
      borderTopLeftRadius:35,
      borderTopRightRadius:35,
      paddingTop:30
    },
    imageGridOverlay:{
      flexDirection:'row',
      alignItems:'center',
      marginLeft:5
    },
    imageOverlay:{
      height:30,
      width:30,
      borderRadius:30,
      marginLeft:-5,
    },
    map:{
      height:200,
      width:width,
      borderRadius:6
    },
    moreImages:{
      width:30,
      height:30,
      backgroundColor:colors.lightGray,
      borderRadius:40,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    moreImageText:{
      fontFamily:FontFamily.Regular,
      fontSize:10
    },
    touchOpcity:{
      backgroundColor:colors.white,
      width:40,
      height:40,
      borderRadius:40,
      alignItems:'center',
      justifyContent:'center'
    }
  });
  
export default styles;