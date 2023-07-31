import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
  scrolledView:{
      paddingLeft:15,
      paddingRight:15,
      marginBottom:20
  },
    modallistcontainer:{
      flexDirection:'row',
      alignItems:'center',
      paddingTop:10,
      paddingBottom:10,
    },
    modallist:{
      fontSize:17,
      fontFamily:FontFamily.Medium,
    },
    popUpHead:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingLeft:5,
      paddingRight:5,
      marginTop:10
    },
    touchOpacity:{
      padding:5
    },
    textPrimary:{
      fontSize:16,
      fontFamily:FontFamily.Medium,
      color:colors.primary
    },
    heading:{
      fontFamily:FontFamily.Medium,
      fontSize:18
    },
    pendinginvitescontainer: {
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#fff',
      justifyContent:'flex-start',
      marginTop:13,
      marginBottom:13,
    },
    pendinginvitesnamecontainer:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
    },
    username: {
      color:colors.black,
      fontSize: 20,
      fontFamily: FontFamily.Medium,
    },
    avatarimage:{
      marginRight:10,
      backgroundColor:colors.white
    },
    graytext:{
      fontSize: 14,
      fontFamily: FontFamily.Regular,
      color:colors.gray
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
  });
  
export default styles;