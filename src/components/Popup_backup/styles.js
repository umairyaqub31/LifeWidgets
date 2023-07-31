import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
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
    animatedview:{
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      paddingLeft:10,
      paddingRight:10,
      paddingTop:10,
      borderTopWidth:1,
      zIndex:11,
      borderColor:colors.lightGray,
      position:'absolute',
      bottom:0,
      backgroundColor:colors.white,
      width:'100%',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 11,
    },
    
    pendinginvitescontainer: {
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#fff',
      justifyContent:'flex-start',
      marginTop:13
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
  });
  
export default styles;