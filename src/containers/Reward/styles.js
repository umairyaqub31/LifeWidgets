import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white,
    },
    scrolledview:{
      padding:15,
      flex:1,
      justifyContent:'space-between'
    },
    text: {
      color:colors.black,
      fontSize: 16,
      fontFamily: FontFamily.Regular,
    },
    primarybtn:{
      backgroundColor:colors.primary,
      padding:10,
      borderRadius:8,
      marginRight:5
    },
    primarybtntext:{
      color:colors.white,
      fontSize:15,
      textAlign:'center',
      fontFamily:FontFamily.Medium
    },
    messageShow:{
      flexDirection:'row',
      marginTop:10,
    },
    textp10: {
      paddingBottom: 10,
    },
  });

export default styles;
