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
    text:{
      color:colors.black,
      fontFamily:FontFamily.Regular,
      fontSize:16,
      marginBottom:20
    },
    grayText:{
      color:colors.gray,
      fontFamily:FontFamily.Regular,
      fontSize:14,
      flex:1
    },
    primaryBtn:{
      backgroundColor:colors.primary,
      padding:10,
      borderRadius:6
    },
    primaryBtnText:{
      color:colors.white,
      textAlign:'center',
      fontFamily:FontFamily.Medium,
      fontSize:16,
    },
    messageShow:{
      flexDirection:'row',
      marginTop:10
    }
  });
  
export default styles;