import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white,
    },
    scrolledview:{
      flex:1,
      padding:15
    },
    heading:{
      fontFamily:FontFamily.Medium,
      fontSize:20,
      color:colors.black,
      textAlign:'center',
      marginBottom:15
    },
    text:{
      fontSize: 16,
      fontFamily: FontFamily.Regular,
      color:colors.black
    },
    list:{
      flexDirection:'row',
      marginBottom:10
    },
    rulesText:{
      marginLeft:5,
      flex:1
    },
    listContainer:{
      marginBottom:15
    },
    descriptionStyle:{
      marginTop:-5,
      fontSize: 16,
      fontFamily: FontFamily.Regular,
      color:colors.black,
      flex:1
    }
  });
  
export default styles;