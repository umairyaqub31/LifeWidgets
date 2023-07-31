import { StyleSheet } from 'react-native';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
    },
    scrolledview:{
      flex:1,
      padding:15,
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
    listContainerRight:{
      flex:1,
      flexDirection:'row',
      borderBottomWidth:1,
      borderColor:colors.lightGray,
      paddingBottom:13
    },
    noPadding:{
      paddingBottom:0
    }
  });
  
export default styles;