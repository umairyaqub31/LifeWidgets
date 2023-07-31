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
      padding:15,
      paddingBottom:13,
      paddingTop:13,
    },
    heading:{
        fontFamily:FontFamily.Medium,
        fontSize:18,
        color:colors.black,
    },
    textBold:{
        fontFamily:FontFamily.Medium,
        fontSize:15,
        color:colors.black,
    },
    textGray:{
        fontFamily:FontFamily.Regular,
        fontSize:14,
        color:colors.gray,
    },
    userName:{
        fontFamily:FontFamily.Regular,
        fontSize:18,
        color:colors.black,
    },
    listContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:13,
        marginBottom:13,
    },
    listRight:{
        marginLeft:10,
        flex:1
    },
    reportChipsContainer:{
        marginTop:13,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    customChipOpacity:{
        backgroundColor:colors.lightGray,
        padding:8,
        paddingLeft:15,
        paddingRight:15,
        borderRadius:20,
        marginRight:8,
        marginBottom:8
    },
    customChipOpacityText:{
        fontFamily:FontFamily.Medium,
        fontSize:15,
        color:colors.black
    },
    separator:{
        marginTop:13,
        marginBottom:13
    },
    primaryBtn:{
        backgroundColor:colors.primary,
        padding:8,
        borderRadius:6
    },
    primaryBtnText:{
        fontFamily:FontFamily.Medium,
        fontSize:16,
        color:colors.white,
        textAlign:'center'
    }
  });
  
export default styles;