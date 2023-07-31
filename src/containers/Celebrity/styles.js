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
    textBold:{
        fontFamily:FontFamily.Medium,
        fontSize:15,
        color:colors.black,
    },
    text:{
        fontFamily:FontFamily.Regular,
        fontSize:15,
        color:colors.black,
    },
    filterToggle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:15,
    },
    list:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
    },
    separator:{
        marginTop:13,
        marginBottom:13
    },
    spacing:{
        marginTop:5,
        marginBottom:5
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
    },
    textinputrounded:{
        borderRadius:6,
        backgroundColor:colors.lightGray,
        height: 50,
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
  });
  
export default styles;