import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white,
    },
    scrolledview:{
      padding:15,
      height:windowHeight
    },
    heading:{
      fontFamily:FontFamily.Medium,
      fontSize:20,
      color:colors.black
    },
    titleBold:{
      fontFamily:FontFamily.Medium,
      fontSize:16
    },
    textGray:{
      fontFamily:FontFamily.Regular,
      fontSize:14,
      color:colors.gray
    },
    primarytext:{
      fontFamily:FontFamily.Regular,
      fontSize:16,
      color:colors.primary
    },
    editHeading:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
    },
    noBorder:{
      borderBottomWidth:0
    },
    separator:{
      marginTop:13,
      marginBottom:13
    },
    listContainer:{
      flexDirection:'row',
      justifyContent:'center',
      marginTop:13
    },
    listtitleContainer:{
      flex:1,
    },
    avatarImage:{
      marginRight:10
    },
    editOpacity:{
      padding:8,
      justifyContent:'center'
    },
    listContainerRight:{
      flex:1,
      flexDirection:'row',
      borderBottomWidth:1,
      borderColor:colors.lightGray,
      paddingBottom:13
    },
    noPadding:{
      paddingBottom:0
    },
    chipOpacity:{
      backgroundColor:colors.lightGray,
      width:40,
      height:40,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:30,
      marginRight:10
    },
    reslationShipStatus:{
      flexDirection:'row',
      alignItems:'center'
    },
    statusIcon:{
      marginRight:5
    }
  });
  
export default styles;